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
    <div className="min-h-screen bg-zinc-950 text-white px-6 py-10">
  <div className="mx-auto w-full max-w-lg rounded-2xl border border-zinc-800 bg-zinc-900 shadow-xl">
    <div className="border-b border-zinc-800 px-6 py-5">
      <h1 className="text-3xl font-bold tracking-tight text-white">
        Manual Stat Entry
      </h1>
      <p className="mt-1 text-sm text-zinc-400">
        Select a player, choose a stat, and enter the value.
      </p>
    </div>

    <form onSubmit={handleSubmit} className="flex flex-col gap-5 px-6 py-6">
      {/* PLAYER */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-zinc-300">Player</label>
        <select
          name="playerId"
          value={form.playerId}
          onChange={handleChange}
          required
          className="rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
        >
          <option value="" className="text-zinc-400">
            Select Player
          </option>
          {players.map((p) => (
            <option key={p._id} value={p._id}>
              {p.firstName} {p.lastName}
            </option>
          ))}
        </select>
      </div>

      {/* STAT TYPE */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-zinc-300">Stat Type</label>
        <select
          name="statType"
          value={form.statType}
          onChange={handleChange}
          required
          className="rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
        >
          <option value="" className="text-zinc-400">
            Select Stat
          </option>
          {statOptions.map((stat) => (
            <option key={stat.value} value={stat.value}>
              {stat.label}
            </option>
          ))}
        </select>
      </div>

      {/* VALUE */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-zinc-300">Value</label>
        <input
          type="number"
          name="value"
          value={form.value}
          onChange={handleChange}
          className="rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white placeholder:text-zinc-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
          placeholder="Enter stat value"
        />
      </div>

      <button
        type="submit"
        className="mt-2 rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white shadow-md transition hover:bg-blue-700 active:scale-[0.98]"
      >
        Update Stat
      </button>

      {message && (
        <p className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">
          {message}
        </p>
      )}
    </form>
  </div>
</div>
  );
}