import { Link } from "react-router-dom";

export default function PlayerCard({ player }) {
  if (!player) return null;

  const positionMap = {
    quarterback: "Quarterback",
    wideReceiver1: "Wide Receiver",
    wideReceiver2: "Wide Receiver",
    runningBack: "Running Back",
    linebacker1: "Linebacker",
    leftTackle: "Left Tackle",
    defensiveBack: "Defensive Back",
  };
  const {
    _id,
    firstName,
    lastName,
    player_picture,
    position,
    jersey_number,
    team,
    age,
    hometown,
  } = player;

  const formattedPosition = positionMap[position] ?? position ?? "N/A";
  return (
    <div className="bg-zinc-800 text-white p-4 rounded-xl shadow-md w-64">
      <img
        src={player_picture || "/images/defaultPlayer.png"}
        alt={`${firstName} ${lastName}`}
        className="w-full h-40 object-cover rounded-md mb-3"
      />

      <h2 className="text-xl font-bold">
        {firstName} {lastName}
      </h2>

      <p className="text-sm text-gray-400">
        #{jersey_number} • {formattedPosition}
      </p>

      <p className="text-sm mt-1">{team}</p>
      <p className="text-sm">Age: {age}</p>
      <p className="text-sm">From: {hometown}</p>

      {/* 🔥 Link to player page */}
      <Link to={`/main/roster/${_id}`}>
        <button className="mt-3 bg-blue-600 px-3 py-1 rounded">
          View Player
        </button>
      </Link>
    </div>
  );
}
