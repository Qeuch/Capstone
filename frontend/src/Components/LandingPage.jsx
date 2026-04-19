import NavBar from "./NavBar";
import { useEffect, useState } from "react";
import axios from "axios";
import PlayerCard from "./PlayerCard";
export default function LandingPage() {
  const [game, setGame] = useState(null);
  const [topPlayers, setTopPlayers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [gameRes, playerRes] = await Promise.all([
          axios.get("http://localhost:3000/api/games/upcoming"),
          axios.get("http://localhost:3000/api/players"),
        ]);

        // game
        setGame(gameRes.data[0]);

        // compute rating
        const calculatePlayerRating = (player) => {
          const offense = player.stats?.offense || {};

          return (
            (offense.passYard || 0) * 0.1 +
            (offense.runYard || 0) * 0.1 +
            (offense.passTD || 0) * 6 +
            (offense.runTD || 0) * 6 +
            (offense.passComp || 0) * 1
          );
        };

        // sorts top three players
        const topThree = playerRes.data
          .sort((a, b) => calculatePlayerRating(b) - calculatePlayerRating(a))
          .slice(0, 3);

        setTopPlayers(topThree);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen w-full bg-zinc-900">
      <div className="flex h-screen w-full">
        <div className="flex-1 overflow-hidden bg-zinc-950 shadow-2xl">
          <div className="relative h-full">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: "url('/images/2514318.jpg')" }}
            />
            <div className="absolute inset-0 bg-black/15" />

            <main className="relative z-10 h-full px-8 py-6 text-white flex flex-col">
              {/* Players of the Week title */}
              <h1 className="text-5xl font-semibold text-center text-outline-black tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mt-2">
                Star Players
              </h1>

              {/* Player Cards show up here*/}
              <div className="flex justify-center gap-6 flex-wrap">
                {topPlayers.length > 0 ? (
                  topPlayers.map((player) => (
                    <PlayerCard key={player._id} player={player} />
                  ))
                ) : (
                  <p className="text-white">Loading players...</p>
                )}
              </div>

              <div>
                {/* Upcoming Games title */}
                <h2 className="text-5xl font-semibold text-center text-outline-black tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mb-6">
                  Upcoming Games
                </h2>
                <div className="flex items-center justify-center gap-6 w-full">
                  {game ? (
                    <>
                      <div className="flex flex-col items-center">
                        <img
                          src={`/images/${game.home_team.toLowerCase()}.png`}
                          alt=""
                          width={100}
                        />
                        <p className="text-xl">{game.home_team}</p>
                      </div>

                      <div className="text-center">
                        <h1 className="text-2xl font-bold">VS</h1>
                        <h2>
                          {new Date(game.game_date).toLocaleString([], {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </h2>
                        <h2>{game.location || "TBD"}</h2>
                      </div>

                      <div className="flex flex-col items-center">
                        <img
                          src={`/images/${game.away_team.toLowerCase()}.png`}
                          alt=""
                          width={100}
                        />
                        <p className="text-xl">{game.away_team}</p>
                      </div>
                    </>
                  ) : (
                    <p>Loading...</p>
                  )}
                </div>
                <div>{/* Upcoming Game Card 2 */}</div>
              </div>
            </main>

            <main className="relative z-10 h-full px-8 py-6 text-white"></main>
          </div>
        </div>
      </div>
    </div>
  );
}
