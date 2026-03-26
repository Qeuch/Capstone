import { useNavigate, useLocation } from "react-router-dom";
import SideButton from "./SideButton";

export default function NavBar() {
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
    <aside className="w-56 bg-zinc-800/90 p-4 flex flex-col gap-4 text-white">
      {links.map((link) => (
        <SideButton
          key={link.path}
          label={link.label}
          active={location.pathname.includes(link.path)}
          onClick={() => navigate(link.path)}
        />
      ))}

      <div className="mt-auto">
        <SideButton label="Logout" danger onClick={() => navigate("/")} />
      </div>
    </aside>
  );
}
