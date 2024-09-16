import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { useState } from "react";

const achievements = [
  {
    title: "VIT Yantra Central Hack Winner",
    description: "Example description for the first achievement",
  },
  {
    title: "VIT Code4Change Runner-Up",
    description: "Example description for the second achievement",
  },
  {
    title: "VIT Code4Change Runner-Up",
    description: "Example description for the second achievement",
  },
  {
    title: "VIT Code4Change Runner-Up",
    description: "Example description for the second achievement",
  },
  {
    title: "VIT Code4Change Runner-Up",
    description: "Example description for the second achievement",
  },
];

export default function AchievementsModal({ visibility, onClose }) {
  const [openItems, setOpenItems] = useState({});

  const handleToggle = (index) => {
    setOpenItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <section
      className={`${
        visibility ? "flex" : "hidden"
      } h-screen w-screen justify-center fixed items-center bg-black bg-opacity-50`}
    >
      <div className="bg-slate-800 h-[90vh] w-[95vw] md:h-[85vh] md:w-[85vw] fixed z-20 pixel-border rounded-lg flex flex-col">
        <div className="p-4 md:p-6 relative">
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
          <h1 className="text-white text-3xl md:text-5xl font-arcade text-center my-6 md:my-8 glow-text">
            Achievements
            <br />
            and
            <br />
            Certificates
          </h1>
        </div>
        <div className="flex-grow overflow-auto px-4 md:px-[10vw] pb-6 md:pb-10 scrollbar-hide">
          <Accordion variant="splitted" showDivider={false} hideIndicator>
            {achievements.map((achievement, index) => (
              <AccordionItem
                key={index}
                aria-label={achievement.title}
                title={
                  <span className="text-xl md:text-2xl text-white font-bigpixel flex flex-row items-center">
                    <span
                      className="mr-4 transition-transform duration-300 transform"
                      style={{
                        transform: openItems[index]
                          ? "rotate(90deg)"
                          : "rotate(0deg)",
                      }}
                    >
                      {">"}
                    </span>
                    {achievement.title}
                  </span>
                }
                className="bg-slate-800 hover:bg-slate-700 transition-colors duration-200 mb-8 md:mb-12"
                onClick={() => handleToggle(index)}
              >
                <p className="text-gray-300 p-4 md:p-6 font-bigpixel text-lg md:text-xl leading-relaxed">
                  {achievement.description}
                </p>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
