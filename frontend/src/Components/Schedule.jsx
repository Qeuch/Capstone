import ScheduleCard from "./ScheduleCard";

export default function Schedule() {
  return (
    <div>
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
