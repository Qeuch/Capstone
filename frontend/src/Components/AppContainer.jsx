// The big component, all (or most of) the logic should live here,
// and all (or most of) the routes should originate from here (other than the ones in app.jsx)
import { Outlet } from "react-router-dom";
import LandingPage from "./LandingPage";
import NavBar from "./NavBar";
// TODO: currentUser set to admin by default for debugging purposes -- needs to be changed eventually
export default function AppContainer() {
  return (
    <div className="flex">
      <NavBar />
      <Outlet /> {/* THIS is where pages appear */}
    </div>
  );
}
