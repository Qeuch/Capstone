import { useEffect, useState } from "react";
import axios from "axios";

export default function AddStats() {
  const [players, setPlayers] = useState([]);
  const [selectedPlayerId, setSelectedPlayerId] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [history, setHistory] = useState([]);

  const positionMap = {
    quarterback: "Quarterback",
    wideReceiver1: "Wide Receiver",
    wideReceiver2: "Wide Receiver",
    runningBack: "Running Back",
    linebacker1: "Linebacker",
    leftTackle: "Left Tackle",
    defensiveBack: "Defensive Back",
  };

  const offenseActions = [
    { label: "+10 Pass Yards", statType: "stats.offense.passYard", value: 10 },
    { label: "+10 Rush Yards", statType: "stats.offense.runYard", value: 10 },
    { label: "+5 Rec Yards", statType: "stats.offense.recYard", value: 5 },
    { label: "+1 Pass TD", statType: "stats.offense.passTD", value: 1 },
    { label: "+1 Rush TD", statType: "stats.offense.runTD", value: 1 },
    { label: "+1 Pass Attempt", statType: "stats.offense.passAtt", value: 1 },
    { label: "+1 Pass Completion", statType: "stats.offense.passComp", value: 1 },
    { label: "+1 Fumble", statType: "stats.offense.fumble", value: 1 },
    { label: "+5 Penalty Yards", statType: "stats.offense.penYard", value: 5 },
    { label: "+1 Offensive Tackle", statType: "stats.offense.tackles", value: 1 },
  ];

  const defenseActions = [
    { label: "+1 Tackle", statType: "stats.defense.tackles", value: 1 },
    { label: "+1 Interception", statType: "stats.defense.inter", value: 1 },
    { label: "+1 Forced Fumble", statType: "stats.defense.forFum", value: 1 },
    { label: "+1 Block", statType: "stats.defense.block", value: 1 },
    { label: "+10 Run Yards Allowed", statType: "stats.defense.runYard", value: 10 },
    { label: "+10 Pass Yards Allowed", statType: "stats.defense.passYard", value: 10 },
    { label: "+1 Pass Attempt Against", statType: "stats.defense.passAtt", value: 1 },
    { label: "+1 Completion Against", statType: "stats.defense.passComp", value: 1 },
  ];

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

  useEffect(() => {
    if (!selectedPlayerId) return;

    const fetchPlayer = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/players/${selectedPlayerId}`
        );
        setSelectedPlayer(res.data);
        setHistory([]);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPlayer();
  }, [selectedPlayerId]);

  const refreshSelectedPlayer = async () => {
    if (!selectedPlayerId) return;

    try {
      const res = await axios.get(
        `http://localhost:3000/api/players/${selectedPlayerId}`
      );
      setSelectedPlayer(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async (statType, value) => {
    if (!selectedPlayerId) return;

    try {
      await axios.patch(
        `http://localhost:3000/api/players/${selectedPlayerId}/stats`,
        { statType, value }
      );

      setHistory((prev) => [...prev, { statType, value }]);
      await refreshSelectedPlayer();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUndo = async () => {
    if (!selectedPlayerId || history.length === 0) return;

    const lastAction = history[history.length - 1];

    try {
      await axios.patch(
        `http://localhost:3000/api/players/${selectedPlayerId}/stats`,
        {
          statType: lastAction.statType,
          value: -lastAction.value,
        }
      );

      setHistory((prev) => prev.slice(0, -1));
      await refreshSelectedPlayer();
    } catch (err) {
      console.error(err);
    }
  };

  const statRowClass =
    "flex items-center justify-between rounded-lg bg-zinc-700/70 px-4 py-2 border border-zinc-600";

  return (
    <div className="min-h-screen w-full bg-zinc-500 text-white p-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-2 text-4xl font-bold tracking-wide">Add Stats</h1>
        <p className="mb-6 text-zinc-400">
          Select a player and quickly update offensive and defensive stats.
        </p>

        <div className="rounded-2xl border border-zinc-700 bg-zinc-800/90 p-6 shadow-lg">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="w-full max-w-md">
              <label className="mb-2 block text-sm font-semibold text-zinc-300">
                Select Player
              </label>
              <select
                className="w-full rounded-xl border border-zinc-600 bg-zinc-700 px-4 py-3 text-white outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-500/30"
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
            </div>

            <button
              onClick={handleUndo}
              disabled={!selectedPlayerId || history.length === 0}
              className={`rounded-xl px-5 py-3 font-semibold transition-all duration-200 ${
                !selectedPlayerId || history.length === 0
                  ? "cursor-not-allowed bg-zinc-600 text-zinc-400"
                  : "bg-amber-500 text-black hover:scale-105 hover:bg-amber-400 shadow-md"
              }`}
            >
              Undo Last Stat
            </button>
          </div>

          {selectedPlayer && (
            <div className="mt-6 rounded-2xl border border-zinc-600 bg-zinc-700/70 p-5 shadow-md">
              <h2 className="text-2xl font-bold">
                {selectedPlayer.firstName} {selectedPlayer.lastName} #
                {selectedPlayer.jersey_number}
              </h2>
              <p className="mt-1 text-zinc-300">
                Position:{" "}
                {positionMap[selectedPlayer.position] ?? selectedPlayer.position}
              </p>
            </div>
          )}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2 space-y-6">
            <div className="rounded-2xl border border-zinc-700 bg-zinc-800/90 p-6 shadow-lg">
              <h2 className="mb-4 text-2xl font-bold text-green-400">
                Offense
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {offenseActions.map((action) => (
                  <button
                    key={action.label}
                    onClick={() => handleUpdate(action.statType, action.value)}
                    disabled={!selectedPlayerId}
                    className={`rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                      selectedPlayerId
                        ? "bg-green-600 hover:bg-green-500 hover:scale-[1.02] shadow-md"
                        : "cursor-not-allowed bg-zinc-700 text-zinc-400"
                    }`}
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-700 bg-zinc-800/90 p-6 shadow-lg">
              <h2 className="mb-4 text-2xl font-bold text-red-400">Defense</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {defenseActions.map((action) => (
                  <button
                    key={action.label}
                    onClick={() => handleUpdate(action.statType, action.value)}
                    disabled={!selectedPlayerId}
                    className={`rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                      selectedPlayerId
                        ? "bg-red-600 hover:bg-red-500 hover:scale-[1.02] shadow-md"
                        : "cursor-not-allowed bg-zinc-700 text-zinc-400"
                    }`}
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-700 bg-zinc-800/90 p-6 shadow-lg">
            <h3 className="mb-4 text-xl font-bold">Live Stats</h3>

            {selectedPlayer ? (
              <div className="space-y-6">
                <div>
                  <h4 className="mb-3 text-lg font-semibold text-green-400">
                    Offense
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className={statRowClass}>
                      <span>Pass Yards</span>
                      <span>{selectedPlayer.stats?.offense?.passYard ?? 0}</span>
                    </div>
                    <div className={statRowClass}>
                      <span>Rush Yards</span>
                      <span>{selectedPlayer.stats?.offense?.runYard ?? 0}</span>
                    </div>
                    <div className={statRowClass}>
                      <span>Rec Yards</span>
                      <span>{selectedPlayer.stats?.offense?.recYard ?? 0}</span>
                    </div>
                    <div className={statRowClass}>
                      <span>Pass TD</span>
                      <span>{selectedPlayer.stats?.offense?.passTD ?? 0}</span>
                    </div>
                    <div className={statRowClass}>
                      <span>Rush TD</span>
                      <span>{selectedPlayer.stats?.offense?.runTD ?? 0}</span>
                    </div>
                    <div className={statRowClass}>
                      <span>Pass Attempts</span>
                      <span>{selectedPlayer.stats?.offense?.passAtt ?? 0}</span>
                    </div>
                    <div className={statRowClass}>
                      <span>Completions</span>
                      <span>{selectedPlayer.stats?.offense?.passComp ?? 0}</span>
                    </div>
                    <div className={statRowClass}>
                      <span>Fumbles</span>
                      <span>{selectedPlayer.stats?.offense?.fumble ?? 0}</span>
                    </div>
                    <div className={statRowClass}>
                      <span>Penalty Yards</span>
                      <span>{selectedPlayer.stats?.offense?.penYard ?? 0}</span>
                    </div>
                    <div className={statRowClass}>
                      <span>Offensive Tackles</span>
                      <span>{selectedPlayer.stats?.offense?.tackles ?? 0}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="mb-3 text-lg font-semibold text-red-400">
                    Defense
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className={statRowClass}>
                      <span>Tackles</span>
                      <span>{selectedPlayer.stats?.defense?.tackles ?? 0}</span>
                    </div>
                    <div className={statRowClass}>
                      <span>Interceptions</span>
                      <span>{selectedPlayer.stats?.defense?.inter ?? 0}</span>
                    </div>
                    <div className={statRowClass}>
                      <span>Forced Fumbles</span>
                      <span>{selectedPlayer.stats?.defense?.forFum ?? 0}</span>
                    </div>
                    <div className={statRowClass}>
                      <span>Blocks</span>
                      <span>{selectedPlayer.stats?.defense?.block ?? 0}</span>
                    </div>
                    <div className={statRowClass}>
                      <span>Run Yards Allowed</span>
                      <span>{selectedPlayer.stats?.defense?.runYard ?? 0}</span>
                    </div>
                    <div className={statRowClass}>
                      <span>Pass Yards Allowed</span>
                      <span>{selectedPlayer.stats?.defense?.passYard ?? 0}</span>
                    </div>
                    <div className={statRowClass}>
                      <span>Pass Attempts Against</span>
                      <span>{selectedPlayer.stats?.defense?.passAtt ?? 0}</span>
                    </div>
                    <div className={statRowClass}>
                      <span>Completions Against</span>
                      <span>{selectedPlayer.stats?.defense?.passComp ?? 0}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-zinc-400">
                Select a player to view and update live stats.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}