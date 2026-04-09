import PlayerCard from "./PlayerCard";

export default function Roster() {
  // Logic here to pull from DB, iterate through playercards with mongo's _id
  return (
    <div className="min-h-screen w-full bg-zinc-900">
      {/* Main Roster Container */}
      <div>
        {/* Iterate through all players here through PlayerCard component */}
        <PlayerCard />
      </div>
    </div>
  );
}
