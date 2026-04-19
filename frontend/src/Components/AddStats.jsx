import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function AddStats() {
  const [players, setPlayers] = useState([]);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    playerId: "",
    statType: "",
    value: 0,
  });

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/players")
      .then((res) => setPlayers(res.data))
      .catch(console.error);
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = Cookies.get("jwt-authorization");

      await axios.patch(
        `http://localhost:3000/api/players/${form.playerId}/stats`,
        {
          statType: form.statType,
          value: Number(form.value),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessage("Stat updated successfully");

      setForm({
        playerId: "",
        statType: "",
        value: 0,
      });

    } catch (err) {
      console.error(err);
      setMessage("Error updating stat");
    }
  };

  const statOptions = [
    // GENERAL
    { label: "Games Played", value: "stats.gamesPlayed" },
    { label: "Games Won", value: "stats.gamesWon" },

    // OFFENSE
    { label: "Pass Yards", value: "stats.offense.passYard" },
    { label: "Receiving Yards", value: "stats.offense.recYard" }, // ✅ NEW
    { label: "Run Yards", value: "stats.offense.runYard" },
    { label: "Pass TD", value: "stats.offense.passTD" },
    { label: "Run TD", value: "stats.offense.runTD" },
    { label: "Pass Attempts", value: "stats.offense.passAtt" },
    { label: "Pass Completions", value: "stats.offense.passComp" },
    { label: "Fumbles", value: "stats.offense.fumble" },
    { label: "Penalty Yards", value: "stats.offense.penYard" },

    // DEFENSE
    { label: "Tackles", value: "stats.defense.tackles" },
    { label: "Interceptions", value: "stats.defense.inter" },
    { label: "Forced Fumbles", value: "stats.defense.forFum" },
    { label: "Blocks", value: "stats.defense.block" },
  ];

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-6">
      <h1 className="text-3xl mb-6">Manual Stat Entry</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">

        {/* PLAYER */}
        <select
          name="playerId"
          value={form.playerId}
          onChange={handleChange}
          required
          className="text-black p-2 rounded"
        >
          <option value="">Select Player</option>
          {players.map((p) => (
            <option key={p._id} value={p._id}>
              {p.firstName} {p.lastName}
            </option>
          ))}
        </select>

        {/* STAT TYPE */}
        <select
          name="statType"
          value={form.statType}
          onChange={handleChange}
          required
          className="text-black p-2 rounded"
        >
          <option value="">Select Stat</option>
          {statOptions.map((stat) => (
            <option key={stat.value} value={stat.value}>
              {stat.label}
            </option>
          ))}
        </select>

        {/* VALUE */}
        <input
          type="number"
          name="value"
          value={form.value}
          onChange={handleChange}
          className="text-black p-2 rounded"
        />

        <button className="bg-blue-600 hover:bg-blue-700 p-2 rounded">
          Update Stat
        </button>

        {message && <p className="text-green-400">{message}</p>}
      </form>
    </div>
  );
}