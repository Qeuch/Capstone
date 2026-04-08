// The big component, all (or most of) the logic should live here,
// and all (or most of) the routes should originate from here (other than the ones in app.jsx)
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
//import LandingPage from "./LandingPage";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
// TODO: currentUser set to admin by default for debugging purposes -- needs to be changed eventually
export default function AppContainer() {
  const navigate = useNavigate();
  // States //
  const [currentUser, setCurrentUser] = useState({
    username: "",
    role: "",
  });

  // I KNOW THERE'S AN ERROR HERE JUST IGNORE IT I SWEAR ITS OKAY
  useEffect(() => {
    const token = Cookies.get("jwt-authorization");
    if (!token) {
      navigate("/");
    } else {
      const decoded = jwtDecode(token);
      setCurrentUser({
        username: decoded.username,
        role: decoded.role,
      });
    }
  }, [navigate]);

  // Handlers //
  const handleLogout = () => {
    Cookies.remove("jwt-authorization");
    setCurrentUser("");
    navigate("/");
  };
  return (
    <div className="flex">
      <NavBar currentUser={currentUser} handleLogout={handleLogout} />
      <Outlet /> {/* THIS is where pages appear */}
    </div>
  );
}
