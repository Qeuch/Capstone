import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import NavBar from "./NavBar";
import { jwtDecode } from "jwt-decode";

export default function AppContainer() {
  const navigate = useNavigate();

  // =========================
  // USER STATE
  // =========================
  const [currentUser, setCurrentUser] = useState({
    username: "",
    role: "",
  });

  // =========================
  // CURRENT GAME (GLOBAL)
  // =========================
  const [currentGame, setCurrentGame] = useState("");

  const setCurrent = (jwtToken) => {
    try {
      const decoded = jwtDecode(jwtToken);

      setCurrentUser({
        username: decoded.username,
        role: decoded.role,
      });
    } catch (err) {
      console.error("Invalid token:", err);
      navigate("/not-authorized");
    }
  };

  // =========================
  // AUTH CHECK
  // =========================
  useEffect(() => {
    const token = Cookies.get("jwt-authorization");

    if (!token) {
      navigate("/not-authorized");
      return;
    }

    setCurrent(token);
  }, []);

  // =========================
  // LOGOUT
  // =========================
  const handleLogout = () => {
    Cookies.remove("jwt-authorization");

    setCurrentUser({ username: "", role: "" });
    setCurrentGame("");

    navigate("/");
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <NavBar
        currentUser={currentUser}
        handleLogout={handleLogout}
        setCurrentGame={setCurrentGame}
        currentGame={currentGame}
      />

      <div className="flex-1 overflow-auto">
        <Outlet context={{ currentGame, setCurrentGame }} />
      </div>
    </div>
  );
}