export default function SideButton({ label, active, danger, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full rounded-xl px-4 py-4 text-left text-lg
        transition-all duration-300 ease-in-out
        transform origin-left

        ${danger
          ? "bg-red-600 text-white hover:bg-red-700"
          : active
          ? "bg-zinc-500 text-white"
          : "bg-zinc-600 text-white hover:bg-zinc-500"}

        hover:scale-x-110 hover:shadow-lg
      `}
    >
      {label}
    </button>
  );
}