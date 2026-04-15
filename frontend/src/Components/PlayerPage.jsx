import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";

export default function PlayerPage() {
  const { id } = useParams();
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    const token = Cookies.get("jwt-authorization");

    fetch(`http://localhost:3000/api/players/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setPlayer(data))
      .catch((err) => console.log(err));
  }, [id]);
  console.log("ID:", id);
  return (
    <div style={{ color: "white", padding: "20px" }}>
      {/* bro this shit will NOT work without the ternary */}
      {player ? (
        <>
          <p>Jersey Num: 69</p> {/*  this wasn't added to mongo yet */}
          <h2>
            {player.firstName} {player.lastName}
          </h2>
          <h3>{player.position}</h3>
          {/* Stats and shit here idk, you got this big */}
        </>
      ) : (
        <p>Loading player...</p>
      )}
    </div>
  );
}
