"use client";

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
      } h-screen w-screen justify-center top-0 fixed items-center bg-black bg-opacity-50`}
    >
      {/* Retro-styled modal with nested borders */}
      <div className="fixed z-20 w-[95vw] md:w-[85vw] h-[90vh] md:h-[85vh] flex flex-col">
        {/* Outer border - Dark Navy/Purple */}
        <div className="w-full h-full p-4 md:p-6 bg-[#2A2B3F]">
          {/* Middle border - Peach/Orange */}
          <div className="w-full h-full p-4 md:p-5 bg-[#E8A87C]">
            {/* Inner content area - Light Cream */}
            <div className="w-full h-full p-4 md:p-5 bg-[#F7F7F7] flex flex-col">
              <div className="relative">
                <button
                  onClick={onClose}
                  className="absolute top-0 right-0 text-[#2A2B3F] hover:text-[#E8A87C] focus:outline-none transition-colors duration-200"
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
                <h1 className="text-[#2A2B3F] text-3xl md:text-5xl font-arcade text-center my-6 md:my-8">
                  Achievements
                  <br />
                  and
                  <br />
                  Certificates
                </h1>
              </div>

              {/* Scrollable content area */}
              <div className="flex-grow overflow-auto px-2 md:px-[5vw] pb-6 md:pb-10 scrollbar-hide">
                <Accordion variant="splitted" showDivider={false} hideIndicator>
                  {achievements.map((achievement, index) => (
                    <AccordionItem
                      key={index}
                      aria-label={achievement.title}
                      title={
                        <span className="text-xl md:text-2xl text-[#2A2B3F] font-bigpixel flex flex-row items-center">
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
                      className="bg-[#F7F7F7] hover:bg-[#F2E8C6] transition-colors duration-200 mb-8 md:mb-12 border-[#E8A87C] border-2"
                      onClick={() => handleToggle(index)}
                    >
                      <p className="text-[#2A2B3F] p-4 md:p-6 font-bigpixel text-lg md:text-xl leading-relaxed">
                        {achievement.description}
                      </p>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
