// The big component, all (or most of) the logic should live here,
// and all (or most of) the routes should originate from here (other than the ones in app.jsx)
import NavBar from "./NavBar";
// TODO: currentUser set to admin by default for debugging purposes -- needs to be changed eventually
export default function AppContainer({ currentUser = "admin" }) {
  return (
    <>
      <NavBar />
      <div className="flex flex-col items-center justify-center min-h-screen gap-6">
        <h1 className="text-4xl font-bold">Welcome {currentUser}</h1>

        <button
          // onClick={handleLogout}
          className="px-6 py-3 bg-red-600 text-white rounded-lg"
        >
          Logout
        </button>
      </div>
    </>
  );
}
