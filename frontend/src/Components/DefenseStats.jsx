import { useOutletContext } from "react-router-dom";

export default function DefenseStats() {
  const { stats } = useOutletContext();

  if (!stats) return <p>Loading...</p>;

  return (
    <div className="text-white">
      <h1 className="text-2xl font-bold text-blue-400 mb-4">Defense Stats</h1>

      <p>Tackles: {stats.def_tackles}</p>
      <p>Interceptions: {stats.def_inter}</p>
      <p>Forced Fumbles: {stats.def_forFum}</p>
      <p>Blocks: {stats.def_block}</p>

      <hr className="my-3 opacity-30" />

      <p>Run Yards Allowed: {stats.def_runYard}</p>
      <p>Pass Yards Allowed: {stats.def_passYard}</p>

      <p>Pass Attempts Faced: {stats.def_passAtt}</p>
      <p>Pass Completions Allowed: {stats.def_passComp}</p>
    </div>
  );
}
