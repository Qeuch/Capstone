import { useEffect, useMemo, useState } from "react";
import Cookies from "js-cookie";
import PlayerCard from "./PlayerCard";

export default function Roster() {
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = Cookies.get("jwt-authorization");

    if (!token) {
      setError("Not logged in");
      return;
    }

    fetch("http://localhost:3000/api/players", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch players");
        return res.json();
      })
      .then((data) => setPlayers(data))
      .catch((err) => setError(err.message));
  }, []);

  const sortedPlayers = useMemo(() => {
    return [...players].sort((a, b) => {
      const aNumber = Number(a.number ?? a.jerseyNumber ?? 9999);
      const bNumber = Number(b.number ?? b.jerseyNumber ?? 9999);
      return aNumber - bNumber;
    });
  }, [players]);

  return (
    <div className="min-h-screen w-full bg-zinc-900">
      
      {/* Main Content */}
      <div className="min-h-screen bg-zinc-500 px-6 py-8">

        {/* Header Section */}
        <div className="mb-10 rounded-2xl border-4 border-zinc-800 bg-zinc-300 px-6 py-4 shadow-[0_6px_0_rgba(0,0,0,0.35)]">
          <h1 className="text-4xl font-extrabold text-zinc-900 tracking-tight">
            Team Roster
          </h1>
          <p className="text-zinc-600 mt-1">
            View all players and their information
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-8 rounded-xl border-2 border-red-400 bg-red-100 px-5 py-4 shadow">
            <p className="text-red-700 font-medium">{error}</p>
          </div>
        )}

        {/* Player Grid */}
        <div className="mx-auto max-w-7xl grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {sortedPlayers.map((player) => (
            <PlayerCard key={player._id} player={player} />
          ))}
        </div>

        {/* Empty State */}
        {sortedPlayers.length === 0 && !error && (
          <div className="mt-12 text-center text-zinc-300 text-lg">
            No players found.
          </div>
        )}

      </div>
    </div>
  );
}