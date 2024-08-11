import { Accordion, AccordionItem } from "@nextui-org/accordion";

const achievements = [
  {
    title: "VIT Yantra Central Hack Winner",
    description: "Example description for the first achievement",
  },
  {
    title: "VIT Code4Change Runner-Up",
    description: "Example description for the second achievement",
  },
];

export default function AchievementsModal({ visibility, onClose }) {
  return (
    <section
      className={`${
        visibility ? "flex" : "hidden"
      } h-screen w-screen justify-center fixed items-center bg-black bg-opacity-50`}
    >
      <div className="bg-slate-800 h-[75vh] w-[75vw] fixed z-20 pixel-border overflow-auto rounded-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300 focus:outline-none transition-colors duration-200"
          aria-label="Close modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
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
        <h1 className="text-white text-5xl font-arcade text-center my-12 glow-text">
          Achievements
        </h1>
        <div className="mx-[10vw] font-bigpixel">
          <Accordion variant="light" className="space-y-4">
            {achievements.map((achievement, index) => (
              <AccordionItem
                key={index}
                aria-label={achievement.title}
                title={
                  <span className="text-xl text-white font-semibold">
                    {achievement.title}
                  </span>
                }
                className="bg-slate-700 hover:bg-slate-600 transition-colors duration-200"
              >
                <p className="text-gray-300 p-4">{achievement.description}</p>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
