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
    <div className="min-h-screen w-full bg-zinc-500 text-white p-6">
      
        {/* Header Section */}
        <div className="mb-10 rounded-2xl border-4 border-zinc-800 bg-zinc-300 px-6 py-4 shadow-[0_6px_0_rgba(0,0,0,0.35)]">
          <h1 className="text-4xl font-extrabold text-zinc-900 tracking-tight">
            Team Stats
          </h1>
          <p className="text-zinc-600 mt-1">
            View all Team Statistics
          </p>
        </div>

      {/* 🔥 Top Section */}
      <div className="bg-zinc-800/90 rounded-2xl p-6 shadow-lg border border-zinc-700">
        
        {/* 🔥 Navigation Buttons */}
        <div className="flex gap-4 mb-6">
          <NavLink
            to="offense"
            className={({ isActive }) =>
              `px-5 py-2 rounded-lg font-semibold transition-all duration-200 ${
                isActive
                  ? "bg-blue-500 text-white shadow-md"
                  : "bg-zinc-700 hover:bg-zinc-600"
              }`
            }
          >
            Offense
          </NavLink>

          <NavLink
            to="defense"
            className={({ isActive }) =>
              `px-5 py-2 rounded-lg font-semibold transition-all duration-200 ${
                isActive
                  ? "bg-red-500 text-white shadow-md"
                  : "bg-zinc-700 hover:bg-zinc-600"
              }`
            }
          >
            Defense
          </NavLink>
        </div>

        {/* 🔥 Stats Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          <div className="bg-zinc-700 rounded-xl p-4 shadow-md border border-zinc-600">
            <p className="text-sm text-zinc-300">Games Played</p>
            <p className="text-2xl font-bold">
              {stats?.gamesPlayed ?? "Loading..."}
            </p>
          </div>

          <div className="bg-zinc-700 rounded-xl p-4 shadow-md border border-zinc-600">
            <p className="text-sm text-zinc-300">Games Won</p>
            <p className="text-2xl font-bold">
              {stats?.gamesWon ?? "Loading..."}
            </p>
          </div>

        </div>
      </div>

      {/* 🔥 Outlet Section (Offense / Defense Content) */}
      <div className="mt-6 bg-zinc-800/90 rounded-2xl p-6 shadow-lg border border-zinc-700">
        <Outlet context={{ stats }} />
      </div>
    </div>
  );
}