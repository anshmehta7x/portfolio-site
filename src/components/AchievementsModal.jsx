"use client";

import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { useState } from "react";

const achievements = [
  {
    title: "Education - Vellore Institute of Technology",
    description: `B.Tech in Computer Science and Engineering (2022 - 2026)\nGPA: 9,10/10\nTechnical Head at IEEE-Computer Society`,
  },
  {
    title: "Internship - XDC Network, Dubai",
    description: `Software Developer Intern (June 2024 - July 2024)\n• Built Solidity smart contract dApps\n• Developed secure test protocols with Hardhat + Foundry\n• Analyzed DeFi protocols: yield farming + liquidity pools`,
  },
  {
    title: "1st Place - VIT Central Hackathon",
    description: `Created ScriptSync: real-time video translation with GPU OCR and OpenCV,\n60% faster processing with intelligent caching + text replacement`,
  },
  {
    title: "2nd Place - Code4Change Hackathon",
    description: `Developed ForReal: AI-based deepfake detector for audio + image inputs`,
  },
  {
    title: "3rd Place - DevJams",
    description: `Built StoryScape: GenAI tool converting stories into audio-visual scenes`,
  },
  {
    title: "Organizer - HackBattle",
    description: `Organized HackBattle with 600+ participants and multiple sponsor partners`,
  },
];

export default function AchievementsModal({
  visibility,
  onClose,
  isConstrained = false,
}) {
  const [openItems, setOpenItems] = useState({});

  const handleToggle = (index) => {
    setOpenItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const sectionClasses = isConstrained
    ? "absolute inset-0 w-full h-full justify-center items-center bg-black bg-opacity-50 z-50"
    : "fixed h-screen w-screen justify-center items-center top-0 bg-black bg-opacity-50 z-[9999]";

  const contentContainerClasses = isConstrained
    ? "w-full h-full flex flex-col border-4 border-[#2A2B3F] rounded-[1rem] shadow-lg"
    : "fixed z-[100] w-[95vw] md:w-[85vw] h-[90vh] md:h-[85vh] flex flex-col border-4 border-[#2A2B3F] rounded-[1rem] shadow-lg";

  return (
    <section className={`${visibility ? "flex" : "hidden"} ${sectionClasses}`}>
      <div className={contentContainerClasses}>
        <div className="w-full h-full p-2 md:p-4 bg-[#2A2B3F] rounded-[0.8rem]">
          <div className="w-full h-full p-2 md:p-4 bg-[#E8A87C] rounded-[0.6rem]">
            <div className="w-full h-full p-2 md:p-4 bg-[#F7F7F7] rounded-[0.4rem] flex flex-col">
              <div className="relative">
                <button
                  onClick={onClose}
                  className="absolute top-0 right-0 text-[#2A2B3F] hover:text-[#E8A87C] focus:outline-none transition-colors duration-200"
                  aria-label="Close modal"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7 md:h-8 md:w-8"
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
              </div>

              <h1 className="text-[#2A2B3F] text-2xl md:text-4xl font-arcade text-center mt-8 md:mt-10 mb-4 tracking-wide">
                Achievements
                <br />
                and
                <br />
                Certificates
              </h1>

              <div className="flex-grow overflow-auto px-2 md:px-[5vw] pb-6 md:pb-10 scrollbar-hide">
                <Accordion variant="splitted" showDivider={false} hideIndicator>
                  {achievements.map((achievement, index) => (
                    <AccordionItem
                      key={index}
                      aria-label={achievement.title}
                      title={
                        <span className="text-lg md:text-xl text-[#2A2B3F] font-bigpixel flex flex-row items-center">
                          <span
                            className="mr-4 text-xl md:text-2xl transition-transform duration-300 transform"
                            style={{
                              transform: openItems[index]
                                ? "rotate(90deg)"
                                : "rotate(0deg)",
                            }}
                          >
                            ▶
                          </span>
                          {achievement.title}
                        </span>
                      }
                      className="bg-[#F7F7F7] hover:bg-[#F2E8C6] transition-colors duration-200 mb-5 md:mb-7 border-[#E8A87C] border-2 rounded-xl"
                      onClick={() => handleToggle(index)}
                    >
                      <p className="text-[#2A2B3F] p-3 md:p-4 font-bigpixel text-base md:text-lg leading-relaxed whitespace-pre-line">
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
