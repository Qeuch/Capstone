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

            <main className="relative z-10 h-full px-8 py-6 text-white">
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
