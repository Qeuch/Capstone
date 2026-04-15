import ScheduleCard from "./ScheduleCard";
import { useNavigate } from "react-router-dom";

export default function Schedule() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-zinc-900">
      
      {/* Grey content area */}
      <div className="min-h-screen bg-zinc-500 px-8 py-8">

        {/* Title */}
        <h1 className="text-4xl font-semibold text-black mb-8">
          Schedule
        </h1>

        {/* Cards */}
        <div className="flex flex-col gap-8 max-w-5xl mx-auto">
          <ScheduleCard />
          <ScheduleCard />
          <ScheduleCard />
        </div>

        {/* Button */}
        <div className="mt-10 flex justify-center">
          <button onClick={() => navigate("/main/addgame")}
          className="bg-slate-600 text-white px-6 py-3 rounded-lg hover:bg-slate-500 transition">
            Add Game
          </button>
        </div>

      </div>
    </div>
  );
}
