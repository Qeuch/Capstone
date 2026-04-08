import ScheduleCard from "./ScheduleCard";

export default function Schedule() {
  return (
    <div className="min-h-screen w-full bg-zinc-900">
      {/* Main Schedule Container */}
      <div>
        {/* This will have a loop of some sort to show all the upcoming games in the form of a ScheduleCard component */}
        <ScheduleCard />
      </div>
      {/* Button that should navigate to GameEntryForm */}
      <button>Add Game</button>
    </div>
  );
}
