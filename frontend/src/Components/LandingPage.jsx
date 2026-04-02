import NavBar from "./NavBar";

export default function LandingPage({ currentUser }) {
  return (
    <div className="min-h-screen w-full bg-zinc-900 p-3">
      <div className="w-full h-[95vh] rounded-md bg-zinc-950 shadow-2xl overflow-hidden">
        <div
          className="relative flex min-h-[95vh] bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/2514318.jpg')" }}
        >
          <div className="absolute inset-0 bg-black/35" />

          <div className="relative z-10 flex w-full">
            <main className="flex-1 px-8 py-6 text-white">
              <h1 className="text-center text-5xl font-bold drop-shadow-lg">
                Welcome {currentUser}
              </h1>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
