import { useEffect, useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import axios from "axios";

export default function TeamStats() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/teamstats/Wildcats")
      .then((res) => setStats(res.data));
  }, []);

  return (
    <div className="min-h-screen w-full bg-zinc-900 text-white">
      <div className="flex gap-4 bg-zinc-800 p-3 rounded-md">
        <NavLink to="offense">Offense</NavLink>
        <NavLink to="defense">Defense</NavLink>

        <div>
          <p>Games Played: {stats?.gamesPlayed ?? "Loading..."}</p>
          <p>Games Won: {stats?.gamesWon ?? "Loading..."}</p>
        </div>
      </div>

      <div className="p-6">
        <Outlet context={{ stats }} />
      </div>
    </div>
  );
}
