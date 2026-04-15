import { useEffect, useState } from "react";
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

  return (
    <div className="min-h-screen w-full bg-zinc-900">
      <div className="p-4">
        {error && <p className="text-red-500">{error}</p>}

        {players.map((player) => (
          <PlayerCard key={player._id} player={player} />
        ))}
      </div>

    </div>
  );
}