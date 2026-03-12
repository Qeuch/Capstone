export default function MainPage({ currentUser, handleLogout }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6">

      <h1 className="text-4xl font-bold">
        Welcome {currentUser}
      </h1>

      <button
        onClick={handleLogout}
        className="px-6 py-3 bg-red-600 text-white rounded-lg"
      >
        Logout
      </button>

    </div>
  );
}