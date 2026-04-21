import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function AddGame() {
  const [teams, setTeams] = useState([]);
  const [homeTeamId, setHomeTeamId] = useState("");
  const [awayTeamId, setAwayTeamId] = useState("");
  const [location, setLocation] = useState("");
  const [dateTime, setDateTime] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get("http://localhost:3000/teams");
        console.log("TEAMS RESPONSE:", response.data);
        setTeams(response.data);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    fetchTeams();
  }, []);

  /*   useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get("http://localhost:3000/teams");
        setTeams(response.data);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    fetchTeams();
  }, []); */

  const handleSubmit = async () => {
  if (!homeTeamId || !awayTeamId || !dateTime) {
    console.log("Missing required fields");
    return;
  }

  const token = Cookies.get("jwt-authorization");

  try {
    await axios.post(
      "http://localhost:3000/games",
      {
        game_date: dateTime,
        home_team: homeTeam?.team_name,
        away_team: awayTeam?.team_name,
        home_score: 0,
        away_score: 0,
        location: location,
        weather_conditions: "",
        upcoming: true,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    navigate("/main/schedule");
  } catch (error) {
    console.error("Error saving game:", error.response?.data || error);
  }
};

  const homeTeam = teams.find((team) => team._id === homeTeamId);
  const awayTeam = teams.find((team) => team._id === awayTeamId);

  return (
    <div className="min-h-screen w-full bg-zinc-500 p-6">
      <div className="min-h-[85vh] rounded-3xl border-4 border-zinc-800 bg-zinc-300 p-6">
        <div className="mb-6 rounded-xl border-4 border-zinc-700 bg-zinc-600 px-4 py-3">
          <h1 className="text-4xl font-bold text-white">Game Entry Form</h1>
        </div>

        <div className="rounded-xl border-4 border-zinc-700 bg-zinc-600 p-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            {/* Left side form */}
            <div className="w-full max-w-sm rounded-2xl border-4 border-zinc-800 bg-zinc-300 p-4">
              <div className="mb-4">
                <label className="mb-2 block text-2xl font-medium text-zinc-800">
                  Home Team
                </label>
                <select
                  value={homeTeamId}
                  onChange={(e) => setHomeTeamId(e.target.value)}
                  className="w-full rounded-xl bg-zinc-100 px-4 py-3 text-xl text-black outline-none"
                >
                  <option value="">Select Home Team</option>
                  {teams
                    .filter((team) => team._id !== awayTeamId)
                    .map((team) => (
                      <option key={team._id} value={team._id}>
                        {team.team_name}
                      </option>
                    ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="mb-2 block text-2xl font-medium text-zinc-800">
                  Away Team
                </label>
                <select
                  value={awayTeamId}
                  onChange={(e) => setAwayTeamId(e.target.value)}
                  className="w-full rounded-xl bg-zinc-100 px-4 py-3 text-xl text-black outline-none"
                >
                  <option value="">Select Away Team</option>
                  {teams
                    .filter((team) => team._id !== homeTeamId)
                    .map((team) => (
                      <option key={team._id} value={team._id}>
                        {team.team_name}
                      </option>
                    ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="mb-2 block text-2xl font-medium text-zinc-800">
                  Location
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter Location"
                  className="w-full rounded-xl bg-zinc-100 px-4 py-3 text-xl text-black placeholder:text-zinc-500 outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-2xl font-medium text-zinc-800">
                  Date/Time
                </label>
                <input
                  type="datetime-local"
                  value={dateTime}
                  onChange={(e) => setDateTime(e.target.value)}
                  className="w-full rounded-xl bg-zinc-100 px-4 py-3 text-xl text-black placeholder:text-zinc-500 outline-none"
                />
              </div>
            </div>

            {/* Right side preview */}
            <div className="flex w-full flex-col items-start">
              <div className="rounded-t-xl border-4 border-b-0 border-zinc-700 bg-zinc-200 px-4 py-1">
                <h2 className="text-2xl font-medium text-zinc-800">Preview</h2>
              </div>

              <div className="w-full max-w-3xl rounded-2xl border-4 border-zinc-800 bg-zinc-300 p-8">
                <div className="flex items-center justify-between gap-6">
                  <div className="flex flex-col items-center">
                    <div className="flex h-28 w-28 items-center justify-center rounded-xl bg-white shadow">
                      {homeTeam?.image ? (
                        <img
                          src={homeTeam.image}
                          alt={homeTeam.team_name}
                          className="h-24 w-24 object-contain"
                        />
                      ) : (
                        <span className="text-sm text-zinc-500">No Logo</span>
                      )}
                    </div>
                    <p className="mt-2 text-xl text-zinc-800">
                      {homeTeam?.team_name || "Home"}
                    </p>
                  </div>

                  <div className="flex flex-col items-center text-center">
                    <div className="text-5xl font-bold text-black">VS</div>
                    <p className="mt-2 text-xl text-zinc-800">
                      {dateTime || "Enter Date/Time"}
                    </p>
                    <p className="text-xl text-zinc-800">
                      {location || "Enter Location"}
                    </p>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="flex h-28 w-28 items-center justify-center rounded-xl bg-white shadow">
                      {awayTeam?.image ? (
                        <img
                          src={awayTeam.image}
                          alt={awayTeam.team_name}
                          className="h-24 w-24 object-contain"
                        />
                      ) : (
                        <span className="text-sm text-zinc-500">No Logo</span>
                      )}
                    </div>
                    <p className="mt-2 text-xl text-zinc-800">
                      {awayTeam?.team_name || "Away"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex w-full max-w-3xl justify-end">
                <button
                  onClick={handleSubmit}
                  className="rounded-xl bg-gradient-to-r from-zinc-700 to-zinc-600 px-8 py-3 text-xl font-semibold text-white shadow-[4px_4px_0px_rgba(0,0,0,0.4)] transition hover:translate-y-[2px] hover:shadow-[2px_2px_0px_rgba(0,0,0,0.4)] active:translate-y-[4px] active:shadow-none"
                >
                  Submit Game
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
