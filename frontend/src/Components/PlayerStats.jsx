import { useEffect, useState } from "react";
import Cookies from "js-cookie";

// Helper: maps shortcodes to proper labels
const positionMap = {
  quarterback: "Quarterback",
  wideReceiver1: "Wide Receiver",
  wideReceiver2: "Wide Receiver",
  runningBack: "Running Back",
  linebacker1: "Linebacker",
  leftTackle: "Left Tackle",
};

// Helper: checks if a value is meaningful
const isValid = (val) => val !== null && val !== undefined && val !== "";

export default function PlayerStats() {
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = Cookies.get("jwt-authorization");

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
      <div className="min-h-screen bg-gray-900 text-white p-6">
        <h1 className="text-3xl font-bold mb-4">Player Stats</h1>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <h1 className="text-3xl font-bold text-white mb-6">Player Stats</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
              {/* Image */}
              {isValid(player.player_picture) && (
                <img
                  src={player.player_picture || "/images/default-player.png"}
                  alt={`${player.firstName} ${player.lastName}`}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
              )}

              {/* Basic Info */}
              <h2 className="text-xl font-semibold mb-2">
                {player.firstName} {player.lastName}
              </h2>

              {isValid(player.position) && (
                <p className="text-gray-300">
                  <strong>Position:</strong>{" "}
                  {positionMap[player.position] || player.position}
                </p>
              )}

              {isValid(player.age) && (
                <p className="text-gray-300">
                  <strong>Age:</strong> {player.age}
                </p>
              )}

              <hr className="my-2 border-gray-600" />

              {/* General Stats */}
              {isValid(player.stats?.gamesPlayed) && (
                <p className="text-gray-300">
                  <strong>Games:</strong> {player.stats.gamesPlayed}
                </p>
              )}

              {isValid(player.stats?.gamesWon) && (
                <p className="text-gray-300">
                  <strong>Wins:</strong> {player.stats.gamesWon}
                </p>
              )}

              {/* Offense */}
              {player.stats?.offense && (
                <>
                  <h3 className="font-semibold mt-3">Offense</h3>

                  {isValid(player.stats.offense.passYard) && (
                    <p className="text-gray-300">
                      <strong>Pass Yards:</strong> {player.stats.offense.passYard}
                    </p>
                  )}

                  {isValid(player.stats.offense.passTD) && (
                    <p className="text-gray-300">
                      <strong>Pass TD:</strong> {player.stats.offense.passTD}
                    </p>
                  )}

                  {isValid(player.stats.offense.passAtt) && (
                    <p className="text-gray-300">
                      <strong>Pass Attempts:</strong> {player.stats.offense.passAtt}
                    </p>
                  )}

                  {isValid(player.stats.offense.passComp) && (
                    <p className="text-gray-300">
                      <strong>Pass Completions:</strong> {player.stats.offense.passComp}
                    </p>
                  )}

                  {isValid(player.stats.offense.runYard) && (
                    <p className="text-gray-300">
                      <strong>Run Yards:</strong> {player.stats.offense.runYard}
                    </p>
                  )}

                  {isValid(player.stats.offense.runTD) && (
                    <p className="text-gray-300">
                      <strong>Run TD:</strong> {player.stats.offense.runTD}
                    </p>
                  )}

                  {isValid(player.stats.offense.fumble) && (
                    <p className="text-gray-300">
                      <strong>Fumbles:</strong> {player.stats.offense.fumble}
                    </p>
                  )}

                  {isValid(player.stats.offense.penYard) && (
                    <p className="text-gray-300">
                      <strong>Penalty Yards:</strong> {player.stats.offense.penYard}
                    </p>
                  )}
                </>
              )}

              {/* Defense */}
              {player.stats?.defense && (
                <>
                  <h3 className="font-semibold mt-3">Defense</h3>

                  {isValid(player.stats.defense.tackles) && (
                    <p className="text-gray-300">
                      <strong>Tackles:</strong> {player.stats.defense.tackles}
                    </p>
                  )}

                  {isValid(player.stats.defense.inter) && (
                    <p className="text-gray-300">
                      <strong>Interceptions:</strong> {player.stats.defense.inter}
                    </p>
                  )}

                  {isValid(player.stats.defense.forFum) && (
                    <p className="text-gray-300">
                      <strong>Forced Fumbles:</strong> {player.stats.defense.forFum}
                    </p>
                  )}

                  {isValid(player.stats.defense.block) && (
                    <p className="text-gray-300">
                      <strong>Blocks:</strong> {player.stats.defense.block}
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