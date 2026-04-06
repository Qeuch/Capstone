import { useNavigate, useLocation } from "react-router-dom";
import { IoPersonCircle } from "react-icons/io5";
import SideButton from "./SideButton";

export default function NavBar({ currentUser }) {
  const navigate = useNavigate();
  const location = useLocation();

  const links = [
    { label: "Home", path: "" },
    { label: "Roster", path: "roster" },
    { label: "Schedule", path: "schedule" },
    { label: "Team Stats", path: "teamstats" },
    { label: "Add Stats", path: "addstats" },
  ];

  return (
    <aside className="w-40 bg-zinc-800/90 p-3 flex flex-col text-white">
      
      <div className="flex items-center gap-2 mb-6 px-2 border-b border-zinc-700 pb-4">
        <IoPersonCircle className="text-blue-400 text-lg" />
        <div className="flex flex-col leading-tight">
          <span className="text-xs text-zinc-400">Welcome</span>
          <span className="text-sm font-semibold">
            {currentUser || "Admin"}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {links.map((link) => (
          <SideButton
            key={link.path}
            label={link.label}
            active={
              link.path === ""
                ? location.pathname === "/main"
                : location.pathname.includes(`/${link.path}`)
            }
            onClick={() => navigate(`/main/${link.path}`)}
          />
        ))}
      </div>

      <div className="mt-auto pt-4">
        <SideButton
          label="Logout"
          danger
          onClick={() => {
            if (window.confirm("Are you sure you want to log out?")) {
              navigate("/");
            }
          }}
        />
      </div>
    </aside>
  );
}