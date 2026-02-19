import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Components/LoginPage";
import RegisterPage from "./Components/RegisterPage";
import PageNotFound from "./Components/PageNotFound";
import NotAuthorized from "./Components/NotAuthorized";
import AppContainer from "./Components/AppContainer";

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

          {/* Right now this is /main/* like we had in our web programming thing, i'm guessing it'll have child routes */}
          <Route path="/main/*" element={<AppContainer />} />

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
