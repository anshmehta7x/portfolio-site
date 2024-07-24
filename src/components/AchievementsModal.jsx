export default function AchievementsModal({ visibility, onClose }) {
  return (
    <section
      className={`${
        visibility ? "flex" : "hidden"
      } h-screen w-screen justify-center fixed items-center`}
    >
      <div className="bg-slate-500 h-[75vh] w-[75vw] fixed z-20 pixel-border overflow-auto ">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white hover:text-gray-300 focus:outline-none"
          aria-label="Close modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h1 className="text-white text-4xl font-arcade text-center mt-8">
          Achievements
        </h1>
      </div>
    </section>
  );
}
