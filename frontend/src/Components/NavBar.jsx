import { useNavigate, useLocation } from "react-router-dom";
import { IoPersonCircle } from "react-icons/io5";
import SideButton from "./SideButton";

export default function NavBar({ currentUser, handleLogout }) {
  const navigate = useNavigate();
  const location = useLocation();

  const links = [
    { label: "Home", path: "" },
    { label: "Roster", path: "roster" },
    { label: "Schedule", path: "schedule" },
    { label: "Team Stats", path: "teamstats" },
  ];

  return (
    <aside className="w-40 bg-zinc-800/90 p-3 flex flex-col text-white">

      {/* USER */}
      <div className="flex items-center gap-2 mb-6 px-2 border-b border-zinc-700 pb-4">
        <IoPersonCircle className="text-blue-400 text-lg" />
        <div className="flex flex-col leading-tight">
          <span className="text-xs text-zinc-400">Welcome</span>
          <span className="text-sm font-semibold">
            {currentUser.username}
          </span>
        </div>
      </div>

      {/* NAV */}
      <div className="flex flex-col gap-3">

        {links.map((link) => (
          <SideButton
            key={link.path}
            label={link.label}
            active={
              link.path === ""
                ? location.pathname === "/main"
                : location.pathname.includes(link.path)
            }
            onClick={() => navigate(link.path)}
          />
        ))}

        {/* 🔥 PLAY NOW BUTTON (MAIN ACTION) */}
        <SideButton
          label="Play Now"
          active={location.pathname.includes("addstats")}
          onClick={() => navigate("addstats")}
        />

      </div>

      {/* LOGOUT */}
      <div className="mt-auto pt-4">
        <SideButton
          label="Logout"
          danger
          onClick={() => {
            if (window.confirm("Are you sure?")) handleLogout();
          }}
        />
      </div>
    </aside>
  );
}