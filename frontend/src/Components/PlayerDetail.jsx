import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function PlayerDetail() {
  const { id } = useParams();
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3000/api/players")
      .then((res) => {
        const found = res.data.find((p) => p._id === id);
        setPlayer(found);
      });
  }, [id]);

  if (!player) return <p className="text-white p-6">Loading...</p>;

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-6">

      <h1 className="text-3xl mb-4">
        {player.firstName} {player.lastName}
      </h1>

      <div className="bg-zinc-800 p-4 rounded">

        <p><strong>Position:</strong> {player.position}</p>
        <p><strong>Age:</strong> {player.age}</p>

        <hr className="my-4" />

        <h2 className="text-xl mb-2">Offense</h2>
        <p>Pass Yards: {player.stats?.offense?.passYard}</p>
        <p>Pass TD: {player.stats?.offense?.passTD}</p>
        <p>Run Yards: {player.stats?.offense?.runYard}</p>

        <h2 className="text-xl mt-4 mb-2">Defense</h2>
        <p>Tackles: {player.stats?.defense?.tackles}</p>
        <p>Interceptions: {player.stats?.defense?.inter}</p>

      </div>
    </div>
  );
}