import { useEffect, useState } from "react";
import axios from "axios";

export default function AddStats() {
  const [players, setPlayers] = useState([]);
  const [selectedPlayerId, setSelectedPlayerId] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const positionMap = {
    quarterback: "Quarterback",
    wideReceiver1: "Wide Receiver",
    wideReceiver2: "Wide Receiver",
    runningBack: "Running Back",
    linebacker1: "Linebacker",
    leftTackle: "Left Tackle",
    defensiveBack: "Defensive Back",
  };
  // Offense actions
  const offenseActions = [
    { label: "+10 Pass Yards", statType: "stats.offense.passYard", value: 10 },
    { label: "+10 Rush Yards", statType: "stats.offense.runYard", value: 10 },
    { label: "+5 Rec Yards", statType: "stats.offense.recYard", value: 5 },

    { label: "+1 Pass TD", statType: "stats.offense.passTD", value: 1 },
    { label: "+1 Rush TD", statType: "stats.offense.runTD", value: 1 },

    { label: "+1 Pass Attempt", statType: "stats.offense.passAtt", value: 1 },
    {
      label: "+1 Pass Completion",
      statType: "stats.offense.passComp",
      value: 1,
    },

    { label: "+1 Fumble", statType: "stats.offense.fumble", value: 1 },
    { label: "+5 Penalty Yards", statType: "stats.offense.penYard", value: 5 },

    {
      label: "+1 Offensive Tackle",
      statType: "stats.offense.tackles",
      value: 1,
    },
  ];

  // defense actions
  const defenseActions = [
    { label: "+1 Tackle", statType: "stats.defense.tackles", value: 1 },
    { label: "+1 Interception", statType: "stats.defense.inter", value: 1 },
    { label: "+1 Forced Fumble", statType: "stats.defense.forFum", value: 1 },
    { label: "+1 Block", statType: "stats.defense.block", value: 1 },

    {
      label: "+10 Run Yards Allowed",
      statType: "stats.defense.runYard",
      value: 10,
    },
    {
      label: "+10 Pass Yards Allowed",
      statType: "stats.defense.passYard",
      value: 10,
    },

    {
      label: "+1 Pass Attempt Against",
      statType: "stats.defense.passAtt",
      value: 1,
    },
    {
      label: "+1 Completion Against",
      statType: "stats.defense.passComp",
      value: 1,
    },
  ];

  // fetch players
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/players");
        setPlayers(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPlayers();
  }, []);

  // fetch SELECTED player
  useEffect(() => {
    if (!selectedPlayerId) return;

    const fetchPlayer = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/players/${selectedPlayerId}`,
        );
        setSelectedPlayer(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPlayer();
  }, [selectedPlayerId]);

  // handle update
  const handleUpdate = async (statType, value) => {
    if (!selectedPlayerId) return;

    try {
      await axios.patch(
        `http://localhost:3000/api/players/${selectedPlayerId}/stats`,
        { statType, value },
      );

      const res = await axios.get(
        `http://localhost:3000/api/players/${selectedPlayerId}`,
      );

      setSelectedPlayer(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen w-full bg-zinc-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Add Stats</h1>

      {/* PLAYER SELECT */}
      <select
        className="text-black p-2 mb-6"
        value={selectedPlayerId}
        onChange={(e) => setSelectedPlayerId(e.target.value)}
      >
        <option value="">Select Player</option>
        {players.map((p) => (
          <option key={p._id} value={p._id}>
            {p.firstName} {p.lastName} #{p.jersey_number}
          </option>
        ))}
      </select>

      {/* PLAYER INFO */}
      {selectedPlayer && (
        <div className="mb-6 bg-zinc-800 p-4 rounded">
          <h2 className="text-xl font-bold">
            {selectedPlayer.firstName} {selectedPlayer.lastName} #
            {selectedPlayer.jersey_number}
          </h2>
          <p>
            Position:{" "}
            {positionMap[selectedPlayer.position] ?? selectedPlayer.position}
          </p>
        </div>
      )}

      {/* OFFENSE */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-3">Offense</h2>
        <div className="grid grid-cols-2 gap-4 max-w-3xl">
          {offenseActions.map((action) => (
            <button
              key={action.label}
              onClick={() => handleUpdate(action.statType, action.value)}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-3 rounded"
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>

      {/* DEFENSE */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-3">Defense</h2>
        <div className="grid grid-cols-2 gap-4 max-w-3xl">
          {defenseActions.map((action) => (
            <button
              key={action.label}
              onClick={() => handleUpdate(action.statType, action.value)}
              className="bg-red-600 hover:bg-red-700 px-4 py-3 rounded"
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>

      {/* LIVE STATS */}
      {selectedPlayer && (
        <div className="mt-10 bg-zinc-800 p-4 rounded max-w-md">
          <h3 className="text-lg font-bold mb-2">Live Stats</h3>

          <h4 className="font-bold">Offense</h4>
          <p>Pass Yards: {selectedPlayer.stats?.offense?.passYard ?? 0}</p>
          <p>Rush Yards: {selectedPlayer.stats?.offense?.runYard ?? 0}</p>
          <p>Rec Yards: {selectedPlayer.stats?.offense?.recYard ?? 0}</p>
          <p>Pass TD: {selectedPlayer.stats?.offense?.passTD ?? 0}</p>
          <p>Rush TD: {selectedPlayer.stats?.offense?.runTD ?? 0}</p>
          <p>Pass Attempts: {selectedPlayer.stats?.offense?.passAtt ?? 0}</p>
          <p>Completions: {selectedPlayer.stats?.offense?.passComp ?? 0}</p>
          <p>Fumbles: {selectedPlayer.stats?.offense?.fumble ?? 0}</p>
          <p>Penalty Yards: {selectedPlayer.stats?.offense?.penYard ?? 0}</p>
          <p>Tackles (Off): {selectedPlayer.stats?.offense?.tackles ?? 0}</p>

          <h4 className="font-bold mt-3">Defense</h4>
          <p>Tackles: {selectedPlayer.stats?.defense?.tackles ?? 0}</p>
          <p>Interceptions: {selectedPlayer.stats?.defense?.inter ?? 0}</p>
          <p>Forced Fumbles: {selectedPlayer.stats?.defense?.forFum ?? 0}</p>
          <p>Blocks: {selectedPlayer.stats?.defense?.block ?? 0}</p>
          <p>
            Run Yards Allowed: {selectedPlayer.stats?.defense?.runYard ?? 0}
          </p>
          <p>
            Pass Yards Allowed: {selectedPlayer.stats?.defense?.passYard ?? 0}
          </p>
          <p>
            Pass Attempts Against: {selectedPlayer.stats?.defense?.passAtt ?? 0}
          </p>
          <p>
            Completions Against: {selectedPlayer.stats?.defense?.passComp ?? 0}
          </p>
        </div>
      )}
    </div>
  );
}
