import { useEffect, useState } from "react";
import axios from "axios";

export default function LandingPage() {
  const [game, setGame] = useState(null);
  const [loadingGame, setLoadingGame] = useState(true);

  const [topPlayers, setTopPlayers] = useState({
    interceptions: null,
    rushing: null,
    receiving: null,
  });

  const safe = (val) => val ?? 0;

  useEffect(() => {
    fetchGame();
    fetchTopPlayers();
  }, []);

  // =========================
  // FETCH UPCOMING GAME
  // =========================
  const fetchGame = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/games/upcoming");
      setGame(res.data?.[0] || null);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingGame(false);
    }
  };

  // =========================
  // FETCH + CALCULATE TOP PLAYERS
  // =========================
  const fetchTopPlayers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/players");
      const players = res.data || [];

      if (!players.length) return;

      const topInterceptions = players.reduce((best, current) =>
        safe(current.stats?.defense?.inter) >
        safe(best?.stats?.defense?.inter)
          ? current
          : best
      , null);

      const topRushing = players.reduce((best, current) =>
        safe(current.stats?.offense?.runYard) >
        safe(best?.stats?.offense?.runYard)
          ? current
          : best
      , null);

      const topReceiving = players.reduce((best, current) =>
        safe(current.stats?.offense?.recYard) >
        safe(best?.stats?.offense?.recYard)
          ? current
          : best
      , null);

      setTopPlayers({
        interceptions: topInterceptions,
        rushing: topRushing,
        receiving: topReceiving,
      });

    } catch (err) {
      console.error(err);
    }
  };

  // =========================
  // PLAYER CARD
  // =========================
  const PlayerCard = ({ title, player, statValue }) => {
    return (
      <div className="bg-zinc-800 rounded-lg p-4 w-64 text-center shadow-lg">
        <h3 className="text-lg font-bold mb-2">{title}</h3>

        {player ? (
          <>
            <img
              src={player.player_picture || "/images/default-player.png"}
              alt=""
              className="w-full h-40 object-cover rounded mb-3"
            />

            <h2 className="text-xl font-semibold">
              {player.firstName} {player.lastName}
            </h2>

            <p className="text-gray-300 mt-2">{statValue}</p>
          </>
        ) : (
          <p className="text-gray-400 mt-10">No data</p>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full bg-zinc-900">
      <div className="flex h-screen w-full">
        <div className="flex-1 overflow-hidden bg-zinc-950 shadow-2xl">
          <div className="relative h-full">

            {/* BACKGROUND */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: "url('/images/2514318.jpg')" }}
            />
            <div className="absolute inset-0 bg-black/30" />

            <main className="relative z-10 h-full px-8 py-6 text-white flex flex-col">

              {/* =========================
                  TOP PLAYERS
              ========================= */}
              <h1 className="text-5xl font-semibold text-center mb-6">
                Stars of the Game
              </h1>

              <div className="flex justify-center gap-8 mb-10 flex-wrap">
                <PlayerCard
                  title="Most Interceptions"
                  player={topPlayers.interceptions}
                  statValue={`INT: ${
                    safe(topPlayers.interceptions?.stats?.defense?.inter)
                  }`}
                />

                <PlayerCard
                  title="Most Rushing Yards"
                  player={topPlayers.rushing}
                  statValue={`Yards: ${
                    safe(topPlayers.rushing?.stats?.offense?.runYard)
                  }`}
                />

                <PlayerCard
                  title="Most Receiving Yards"
                  player={topPlayers.receiving}
                  statValue={`Yards: ${
                    safe(topPlayers.receiving?.stats?.offense?.recYard)
                  }`}
                />
              </div>

              <div className="flex-1" />

              {/* =========================
                  UPCOMING GAME
              ========================= */}
              <h2 className="text-5xl font-semibold text-center mb-6">
                Upcoming Game
              </h2>

              <div className="flex items-center justify-center gap-6 w-full">
                {loadingGame ? (
                  <p>Loading...</p>
                ) : game ? (
                  <>
                    <div className="flex flex-col items-center">
                      <img
                        src={`/images/${game.home_team?.toLowerCase()}.png`}
                        alt=""
                        width={100}
                      />
                      <p className="text-xl">{game.home_team}</p>
                    </div>

                    <div className="text-center">
                      <h1 className="text-2xl font-bold">VS</h1>
                      <h2>
                        {new Date(game.game_date).toLocaleString()}
                      </h2>
                      <h2>{game.location || "TBD"}</h2>
                    </div>

                    <div className="flex flex-col items-center">
                      <img
                        src={`/images/${game.away_team?.toLowerCase()}.png`}
                        alt=""
                        width={100}
                      />
                      <p className="text-xl">{game.away_team}</p>
                    </div>
                  </>
                ) : (
                  <p>No upcoming games</p>
                )}
              </div>

            </main>
          </div>
        </div>
      </div>
    </div>
  );
}