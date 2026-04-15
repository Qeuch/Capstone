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
        if (!res.ok) throw new Error("Failed to fetch");
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
      <div className="min-h-screen bg-zinc-700 px-6 py-8">
        <h1 className="mb-8 text-4xl font-bold text-black">Roster</h1>

        {error && (
          <p className="mb-6 rounded-lg bg-red-200 px-4 py-3 text-red-700">
            {error}
          </p>
        )}

        <div className="mx-auto max-w-7xl grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {sortedPlayers.map((player) => (
            <PlayerCard key={player._id} player={player} />
          ))}
        </div>
      </div>
    </div>
  );
}