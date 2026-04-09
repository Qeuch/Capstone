import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Components/LoginPage";
import RegisterPage from "./Components/RegisterPage";
import PageNotFound from "./Components/PageNotFound";
import NotAuthorized from "./Components/NotAuthorized";
import AppContainer from "./Components/AppContainer";

// routes for navbar
import Roster from "./Components/Roster";
import Schedule from "./Components/Schedule";
import TeamStats from "./Components/TeamStats";
import PlayerStats from "./Components/PlayerStats";
import AddStats from "./Components/AddStats";
import LandingPage from "./Components/LandingPage";
// import all containers here

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Path to the login page, will take you to /main if good login, /create-user if register is clicked*/}

          <Route path="/" element={<LoginPage />} />

          {/* this path will loop back to login maybe, we'll see. */}
          <Route path="/create-user" element={<RegisterPage />} />

          {/* This bad boy is all the routes for the navbar. roster, schedule, etc are CHILD ROUTES to /main */}
          <Route path="/main" element={<AppContainer />}>
            <Route index element={<LandingPage />} /> {/* 👈 default page */}
            <Route path="roster" element={<Roster />} />
            <Route path="playerstats" element={<PlayerStats />} /> {/* This won't stay, just want to test the display page */}
            <Route path="schedule" element={<Schedule />} />
            <Route path="teamstats" element={<TeamStats />} />
            <Route path="addstats" element={<AddStats />} />
          </Route>

          {/* This if you try to bypass login. Somewhere further in, we'll have this route accessed 
            by trying to get to admin views without admin privilege */}
          <Route path="/not-authorized" element={<NotAuthorized />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
