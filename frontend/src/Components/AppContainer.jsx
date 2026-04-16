// The big component, all (or most of) the logic should live here,
// and all (or most of) the routes should originate from here (other than the ones in app.jsx)
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
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

  const setCurrent = async (jwtToken) => {
    const decoded = jwtDecode(jwtToken);
    setCurrentUser({
      username: decoded.username,
      role: decoded.role,
    });
  };

  // I KNOW THERE'S AN ERROR HERE JUST IGNORE IT I SWEAR ITS OKAY
  useEffect(() => {
    const token = Cookies.get("jwt-authorization");
    if (!token) {
      navigate("/not-authorized");
    } else {
      setCurrent(token);
    }
  }, []);

  // Handlers //
  const handleLogout = () => {
    Cookies.remove("jwt-authorization");
    setCurrentUser("");
    navigate("/");
  };
  return (
    <div className="flex h-screen overflow-hidden">
      <NavBar currentUser={currentUser} handleLogout={handleLogout} />
      <div className="flex-1 overflow-auto">
        {" "}
        {/* allows for the container to be scrollable */}
        <Outlet context={{ currentUser }} /> {/* THIS is where pages appear */}
      </div>
    </div>
  );
}
