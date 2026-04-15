import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";

export default function PlayerPage() {
  const { id } = useParams();
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    const token = Cookies.get("jwt-authorization");

    fetch(`http://localhost:3000/api/players/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setPlayer(data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!player) {
    return (
      <div className="min-h-screen w-full bg-zinc-900 flex items-center justify-center">
        <p className="text-2xl text-white">Loading player...</p>
      </div>
    );
  }

  const fullName =
    `${player.firstName || ""} ${player.lastName || ""}`.trim() ||
    player.playerName ||
    "Unknown Player";

  const stats = [
    { label: "Jersey Number", value: player.jerseyNumber ?? "N/A" },
    { label: "Position", value: player.position ?? player.role ?? "N/A" },
    { label: "Age", value: player.age ?? "N/A" },
    { label: "Height", value: player.height ?? "N/A" },
    { label: "Weight", value: player.weight ?? "N/A" },
    { label: "Hometown", value: player.from ?? player.hometown ?? "N/A" },
    { label: "Team", value: player.team ?? "N/A" },
    { label: "Games Played", value: player.gamesPlayed ?? "N/A" },
    { label: "Touchdowns", value: player.touchdowns ?? "N/A" },
    { label: "Passing Yards", value: player.passingYards ?? "N/A" },
    { label: "Rushing Yards", value: player.rushingYards ?? "N/A" },
    { label: "Receiving Yards", value: player.receivingYards ?? "N/A" },
    { label: "Tackles", value: player.tackles ?? "N/A" },
    { label: "Interceptions", value: player.interceptions ?? "N/A" },
  ];

return (
  <div className="min-h-screen w-full bg-zinc-500 text-black">

    {/* Top Section */}
    <div className="w-full bg-zinc-600 py-10 px-6 flex flex-col items-center shadow-md">

      {/* Image */}
      <div className="w-full max-w-md overflow-hidden rounded-2xl border-4 border-zinc-800 shadow-[6px_6px_0px_rgba(0,0,0,0.35)]">
        {player.image ? (
          <img
            src={player.image}
            alt={fullName}
            className="h-80 w-full object-cover"
          />
        ) : (
          <div className="flex h-80 items-center justify-center text-zinc-300">
            <img src="/images\defaultPlayer.png" alt="" />
          </div>
        )}
      </div>

      {/* Name + Info */}
      <h1 className="mt-6 text-4xl font-bold text-white">{fullName}</h1>
      <p className="text-2xl text-zinc-200">
        {player.position || player.role || "No Position"}
      </p>

      <div className="mt-3 rounded-full bg-zinc-300 px-5 py-2 text-lg font-bold text-zinc-800 border-2 border-zinc-700">
        #{player.jerseyNumber ?? "N/A"}
      </div>
    </div>

    {/* Stats Section */}
    <div className="px-6 py-10 max-w-6xl mx-auto">

      <h2 className="text-3xl font-bold mb-6 text-black">Player Stats</h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border-4 border-zinc-800 bg-zinc-300 p-4 shadow-[6px_6px_0px_rgba(0,0,0,0.35)]"
          >
            <p className="text-sm font-semibold uppercase tracking-wide text-zinc-600">
              {stat.label}
            </p>
            <p className="mt-2 text-2xl font-bold text-zinc-900">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

    </div>

    {/* Bio Section */}
    <div className="px-6 pb-12 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-black">Player Bio</h2>

      <div className="rounded-2xl border-4 border-zinc-800 bg-zinc-300 p-5 shadow-[6px_6px_0px_rgba(0,0,0,0.35)]">
        <p className="text-lg text-zinc-800">
          {player.bio || "No player bio available."}
        </p>
      </div>
    </div>

  </div>
);
}