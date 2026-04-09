import NavBar from "./NavBar";

export default function LandingPage() {
  return (
    <div className="min-h-screen w-full bg-zinc-900">
      <div className="flex h-screen w-full">
        <div className="flex-1 overflow-hidden bg-zinc-950 shadow-2xl">
          <div className="relative h-full">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: "url('/images/2514318.jpg')" }}
            />
            <div className="absolute inset-0 bg-black/15" />

            <main className="relative z-10 h-full px-8 py-6 text-white flex flex-col">
              {/* Players of the Week title */}
              <h1 className="text-5xl font-semibold text-center text-outline-black tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mt-2">
                Stars of the Game
              </h1>

              {/* Space where player cards will go later */}
              <div className="flex-1" />

              <div>
                {/* Upcoming Games title */}
                <h2 className="text-5xl font-semibold text-center text-outline-black tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mb-6">
                  Upcoming Games
                </h2>
                <div className="flex items-center justify-center gap-6 w-full">
                  {/* Upcoming Game Card 1 */}
                  <img src="/public/images/wildcats.png" alt="" width={200} />
                  <div>
                    {/* VS, Time, Place */}
                    <h1>vs</h1>
                    <h2>8:00pm</h2>
                    <h2>Carleton Place</h2>
                  </div>
                  <img src="/public/images/ravens.png" alt="" width={200} />
                </div>
                <div>{/* Upcoming Game Card 2 */}</div>
              </div>
            </main>

            <main className="relative z-10 h-full px-8 py-6 text-white"></main>
          </div>
        </div>
      </div>
    </div>
  );
}
