// The big component, all (or most of) the logic should live here,
// and all (or most of) the routes should originate from here (other than the ones in app.jsx)
import LandingPage from "./LandingPage";
export default function AppContainer({ currentUser = "admin" }) {
  return (
      <LandingPage currentUser ={currentUser}/>

  );
}
