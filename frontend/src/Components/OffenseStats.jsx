import { useOutletContext } from "react-router-dom";

export default function OffenseStats() {
  const { stats } = useOutletContext();

  if (!stats) return <p>Loading...</p>;

  return (
    <div className="text-white">
      <h1 className="text-2xl font-bold text-green-400 mb-4">Offense Stats</h1>

      <p>Passing Yards: {stats.off_passYard}</p>
      <p>Rushing Yards: {stats.off_runYard}</p>
      <p>Offensive Tackles: {stats.off_tackles}</p>

      <p>Passing TD: {stats.off_passTD}</p>
      <p>Rushing TD: {stats.off_runTD}</p>

      <p>Pass Attempts: {stats.off_passAtt}</p>
      <p>Pass Completions: {stats.off_passComp}</p>

      <p>Fumbles: {stats.off_fumble}</p>
      <p>Penalty Yards: {stats.off_penYard}</p>
    </div>
  );
}
