import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis } from "recharts";
import axios from "axios";

export default function PlayerPage() {
  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`/api/stats/player/${id}`)
      .then(res => setData(res.data));
  }, [id]);

  return (
    <div className="p-6 text-white">
      <h1>Player Performance</h1>

      <LineChart width={500} height={300} data={data}>
        <XAxis dataKey="game" />
        <YAxis />
        <Line dataKey="yards" />
      </LineChart>
    </div>
  );
}