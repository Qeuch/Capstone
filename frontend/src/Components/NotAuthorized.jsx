import { Link } from "react-router-dom";
import { getUser } from "./auth";

export default function NotAuthorized() {
  const user = getUser();

  return (
    <div className="min-h-screen flex items-center justify-center relative text-center">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/behang-met-een-voetbalstadion_6.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative z-10 text-white">
        <h1 className="text-7xl font-bold text-red-500 drop-shadow-lg mb-4">
          Error: 403
        </h1>

        <p className="text-2xl mb-6 drop-shadow-md">
          You are not authorized to view this page. GET TF OUTTA HERE
        </p>

        <Link
          to={user ? "/main" : "/"}
          className="inline-block px-6 py-3 bg-red-600 hover:bg-red-700 transition rounded-lg text-white font-semibold shadow-lg no-underline"
        >
          {user ? "Go Back to Main" : "Go Back to Login"}
        </Link>
      </div>
    </div>
  );
}