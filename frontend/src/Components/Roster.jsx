import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Roster() {
  const [players, setPlayers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/players")
      .then((res) => setPlayers(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-6">

      <h1 className="text-3xl mb-6">Roster</h1>

      <div className="grid grid-cols-3 gap-4">
        {players.map((p) => (
          <div
            key={p._id}
            onClick={() => navigate(`/main/player/${p._id}`)}
            className="bg-zinc-800 p-4 rounded cursor-pointer hover:bg-zinc-700"
          >
            <h2>{p.firstName} {p.lastName}</h2>
            <p>{p.position}</p>
          </div>
        ))}
      </div>

    </div>
  );
}