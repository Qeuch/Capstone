import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function AddStats() {
  const [players, setPlayers] = useState([]);
  const [games, setGames] = useState([]);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    gameId: "",
    primary: "",
    secondary: "",
    playType: "pass",
    yards: 0,
  });

  // ======================
  // LOAD PLAYERS + GAMES
  // ======================
  useEffect(() => {
    const token = Cookies.get("jwt-authorization");

    // players
    axios
      .get("http://localhost:3000/api/players", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setPlayers(res.data))
      .catch(console.error);

    // games
    axios
      .get("http://localhost:3000/api/games", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setGames(res.data))
      .catch(console.error);
  }, []);

  // ======================
  // HANDLE INPUTS
  // ======================
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ======================
  // SUBMIT PLAY
  // ======================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = Cookies.get("jwt-authorization");

      await axios.post(
        "http://localhost:3000/api/plays",
        {
          gameId: form.gameId,
          players: {
            primary: form.primary,
            secondary: form.secondary || null,
          },
          playType: form.playType,
          yards: Number(form.yards),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessage("Play added + stats updated!");

      setForm({
        gameId: "",
        primary: "",
        secondary: "",
        playType: "pass",
        yards: 0,
      });
    } catch (err) {
      console.error(err);
      setMessage("Error adding play");
    }
  };

  // ======================
  // UI
  // ======================
  return (
    <div className="min-h-screen bg-zinc-900 text-white p-6">
      <h1 className="text-3xl mb-6">Add Play</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">

        {/* GAME SELECT */}
        <select
          name="gameId"
          value={form.gameId}
          onChange={handleChange}
          required
          className="text-black p-2 rounded"
        >
          <option value="">
            {games.length ? "Select Game" : "Loading games..."}
          </option>

          {games.map((game) => (
            <option key={game._id} value={game._id}>
              {game.homeTeam || "Home"} vs {game.awayTeam || "Away"}
            </option>
          ))}
        </select>

        {/* PRIMARY PLAYER */}
        <select
          name="primary"
          value={form.primary}
          onChange={handleChange}
          required
          className="text-black p-2 rounded"
        >
          <option value="">Primary Player</option>
          {players.map((p) => (
            <option key={p._id} value={p._id}>
              {p.firstName} {p.lastName}
            </option>
          ))}
        </select>

        {/* SECONDARY PLAYER */}
        <select
          name="secondary"
          value={form.secondary}
          onChange={handleChange}
          className="text-black p-2 rounded"
        >
          <option value="">Secondary Player (optional)</option>
          {players.map((p) => (
            <option key={p._id} value={p._id}>
              {p.firstName} {p.lastName}
            </option>
          ))}
        </select>

        {/* PLAY TYPE */}
        <select
          name="playType"
          value={form.playType}
          onChange={handleChange}
          className="text-black p-2 rounded"
        >
          <option value="pass">Pass</option>
          <option value="run">Run</option>
          <option value="tackle">Tackle</option>
        </select>

        {/* YARDS */}
        <input
          type="number"
          name="yards"
          value={form.yards}
          onChange={handleChange}
          className="text-black p-2 rounded"
          placeholder="Yards"
        />

        {/* SUBMIT */}
        <button className="bg-blue-600 hover:bg-blue-700 p-2 rounded">
          Submit Play
        </button>

        {/* MESSAGE */}
        {message && <p className="text-green-400">{message}</p>}
      </form>
    </div>
  );
}