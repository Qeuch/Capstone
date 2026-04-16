export default function ScheduleCard({ game }) {
  return (
    <div>
      <h2>
        {game.home_team} vs {game.away_team}
      </h2>
      <p>{new Date(game.game_date).toLocaleDateString()}</p>
    </div>
  );
}
