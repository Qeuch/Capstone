// PAGE NOT FOUND
// Any random crap put in as a url should lead here

import { Link } from "react-router-dom";

export default function NotAuthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center relative text-center">
      
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/behang-met-een-voetbalstadion_6.jpg')" }}
      />
      <div className="absolute inset-0 bg-black/70" />

      {/* Content */}
      <div className="relative z-10 text-white">
        
        <h1 className="text-7xl font-bold text-red-500 drop-shadow-lg mb-4">
          Error: Page Not Found
        </h1>

        <p className="text-2xl mb-6 drop-shadow-md">
            🧐🧐
        </p>

        <Link
          to="/"
          className="inline-block px-6 py-3 bg-red-600 hover:bg-red-700 transition rounded-lg text-white font-semibold shadow-lg no-underline"
        >
          Go Back to Login
        </Link>

      </div>
    </div>
  );
}
