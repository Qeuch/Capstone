import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate("")}>Home</button>
      <button onClick={() => navigate("roster")}>Roster</button>
      <button onClick={() => navigate("schedule")}>Schedule</button>
      <button onClick={() => navigate("teamstats")}>Team Stats</button>
      <button onClick={() => navigate("addstats")}>Add Stats</button>
    </div>
  );
}
