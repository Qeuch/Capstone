import PlayerCard from "./PlayerCard";

export default function Roster() {
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
