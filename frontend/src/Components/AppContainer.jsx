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
  const [currentUser, setCurrentUser] = useState(() => {
    const token = Cookies.get("jwt-authorization");

    if (!token) return { username: "", role: "" };

    const decoded = jwtDecode(token);

    return {
      username: decoded.username,
      role: decoded.role,
    };
  });

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
