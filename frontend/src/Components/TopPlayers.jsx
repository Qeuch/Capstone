import { useEffect, useState } from "react";
import axios from "axios";

export default function TopPlayers({ type }) {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    axios.get(`/api/stats/top?type=${type}`)
      .then(res => setPlayers(res.data));
  }, [type]);

  return (
    <div>
      <h2 className="text-2xl mb-4">Top 3 {type}</h2>

      <div className="grid grid-cols-3 gap-4">
        {players.map(p => (
          <div key={p._id} className="bg-zinc-700 p-4 rounded">
            <h3>{p.name}</h3>
            <p>{p.stat}</p>
          </div>
        ))}
      </div>
    </div>
  );
}