export default function ScheduleCard({ game, homeTeam, awayTeam }) {
  const formattedDate = game.game_date
    ? new Date(game.game_date).toLocaleString([], {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      })
    : "Time TBA";

  return (
    <div className="w-full rounded-2xl border-4 border-zinc-800 bg-zinc-300 p-8 shadow-[0_8px_0_rgba(0,0,0,0.35)]">
      <div className="flex items-center justify-between gap-6">
        <div className="flex flex-col items-center">
          <div className="flex h-28 w-28 items-center justify-center rounded-xl bg-white shadow">
            {homeTeam?.image ? (
              <img
                src={home_team.image}
                alt={home_team.team_name}
                className="h-24 w-24 object-contain"
              />
            ) : (
              <span className="text-sm text-zinc-500">No Logo</span>
            )}
          </div>
          <p className="mt-2 text-xl font-semibold text-zinc-800">
            {homeTeam?.team_name || "Home"}
          </p>
        </div>

        <div className="flex flex-col items-center text-center">
          <div className="text-5xl font-bold text-black">VS</div>
          <p className="mt-2 text-xl text-zinc-800">{formattedDate}</p>
          <p className="text-xl text-zinc-800">{game.location || "Location TBA"}</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="flex h-28 w-28 items-center justify-center rounded-xl bg-white shadow">
            {awayTeam?.image ? (
              <img
                src={away_team.image}
                alt={away_team.team_name}
                className="h-24 w-24 object-contain"
              />
            ) : (
              <span className="text-sm text-zinc-500">No Logo</span>
            )}
          </div>
          <p className="mt-2 text-xl font-semibold text-zinc-800">
            {awayTeam?.team_name || "Away"}
          </p>
        </div>
      </div>
    </div>
  );
}