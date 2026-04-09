// PlayerStats.jsx
import { useEffect, useState } from "react";

// Helper: maps shortcodes to proper labels
const positionMap = {
  quarterback: "Quarterback",
  wideReceiver1: "Wide Receiver",
  wideReceiver2: "Wide Receiver",
  runningBack1: "Running Back",
  runningBack2: "Running Back",
  linebacker1: "Linebacker",
  // add more mappings as needed
};

// Helper: checks if a value is meaningful
const isValid = (val) => val !== null && val !== undefined && val !== "";

export default function PlayerStats() {
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("You are not logged in");
      return;
    }

    fetch("http://localhost:3000/api/players", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
        return res.json();
      })
      .then((data) => setPlayers(data))
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-start bg-gray-900 text-white p-6">
        <h1 className="text-3xl font-bold mb-4">Player Stats</h1>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <h1 className="text-3xl font-bold text-white mb-6">Player Stats</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 overflow-auto max-h-[80vh] pr-2">
        {players
            .filter(
                (player) =>
                    isValid(player.firstName) || isValid(player.lastName)
            )
            .map((player) => (
          <div
            key={player._id}
            className="bg-gray-800 text-white shadow-lg rounded-lg p-4 flex flex-col"
          >
            {isValid(player.photo) && (
              <img
                src={player.photo || "/images/default-player.png"}
                alt={`${player.firstName} ${player.lastName}`}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
            )}
            <h2 className="text-xl font-semibold mb-2 text-white">
              {player.firstName} {player.lastName}
            </h2>
            {isValid(player.position) && (
              <p className="text-gray-300 mb-1">
                <strong>Position:</strong> {positionMap[player.position] || player.position}
              </p>
            )}
            {isValid(player.age) && (
              <p className="text-gray-300 mb-1">
                <strong>Age:</strong> {player.age}
              </p>
            )}

            <hr className="my-2 border-gray-600" />

            {isValid(player.stats?.gamesPlayed) && (
              <p className="text-gray-300 mb-1">
                <strong>Games:</strong> {player.stats.gamesPlayed}
              </p>
            )}
            {isValid(player.stats?.gamesWon) && (
              <p className="text-gray-300 mb-1">
                <strong>Wins:</strong> {player.stats.gamesWon}
              </p>
            )}

            {player.stats?.offense && (
              <>
                <h3 className="font-semibold mt-3 mb-1 text-white">Offense</h3>
                {isValid(player.stats.offense.passYard) && (
                  <p className="text-gray-300 mb-1">
                    <strong>Pass Yards:</strong> {player.stats.offense.passYard}
                  </p>
                )}
                {isValid(player.stats.offense.passTD) && (
                  <p className="text-gray-300 mb-1">
                    <strong>Pass TD:</strong> {player.stats.offense.passTD}
                  </p>
                )}
                {isValid(player.stats.offense.runYard) && (
                  <p className="text-gray-300 mb-1">
                    <strong>Run Yards:</strong> {player.stats.offense.runYard}
                  </p>
                )}
                {isValid(player.stats.offense.runTD) && (
                  <p className="text-gray-300 mb-1">
                    <strong>Run TD:</strong> {player.stats.offense.runTD}
                  </p>
                )}
              </>
            )}

            {player.stats?.defense && (
              <>
                <h3 className="font-semibold mt-3 mb-1 text-white">Defense</h3>
                {isValid(player.stats.defense.tackles) && (
                  <p className="text-gray-300 mb-1">
                    <strong>Tackles:</strong> {player.stats.defense.tackles}
                  </p>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}