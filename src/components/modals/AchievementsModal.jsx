"use client";

import { useState } from "react";
import {
    GraduationCap,
    Briefcase,
    Trophy,
    Award,
    Users,
    ChevronDown,
    X,
    Star,
} from "lucide-react";

const achievements = [
    {
        id: "education",
        title: "Education - Vellore Institute of Technology",
        category: "Education",
        icon: GraduationCap,
        color: "from-blue-500 to-indigo-600",
        bgGradient: "from-blue-50 to-indigo-50",
        description: `B.Tech in Computer Science and Engineering (2022 - 2026)\nGPA: 9.10/10\nTechnical Head at IEEE-Computer Society`,
        highlights: ["9.10/10 GPA", "Technical Head", "CSE Major"],
    },
    {
        id: "internship",
        title: "Internship - XDC Network, Dubai",
        category: "Professional",
        icon: Briefcase,
        color: "from-emerald-500 to-teal-600",
        bgGradient: "from-emerald-50 to-teal-50",
        description: `Software Developer Intern (June 2024 - July 2024)\n• Built Solidity smart contract dApps\n• Developed secure test protocols with Hardhat + Foundry\n• Analyzed DeFi protocols: yield farming + liquidity pools`,
        highlights: [
            "Smart Contracts",
            "Blockchain and dApps",
            "Software Development",
        ],
    },
    {
        id: "hackathon1",
        title: "1st Place - VIT Central Hackathon",
        category: "Achievement",
        icon: Trophy,
        color: "from-yellow-500 to-orange-600",
        bgGradient: "from-yellow-50 to-orange-50",
        description: `Created ScriptSync: real-time video translation with GPU OCR and OpenCV,\n60% faster processing with intelligent caching + text replacement`,
        highlights: [
            "1st Place",
            "60% Performance Boost",
            "Real-time Translation",
        ],
    },
    {
        id: "hackathon2",
        title: "2nd Place - Code4Change Hackathon",
        category: "Achievement",
        icon: Award,
        color: "from-purple-500 to-violet-600",
        bgGradient: "from-purple-50 to-violet-50",
        description: `Developed ForReal: AI-based deepfake detector for audio + image inputs`,
        highlights: ["2nd Place", "AI/ML", "Deepfake Detection"],
    },
    {
        id: "hackathon3",
        title: "3rd Place - DevJams",
        category: "Achievement",
        icon: Star,
        color: "from-pink-500 to-rose-600",
        bgGradient: "from-pink-50 to-rose-50",
        description: `Built StoryScape: GenAI tool converting stories into audio-visual scenes`,
        highlights: ["3rd Place", "GenAI", "Audio-Visual"],
    },
    {
        id: "organizer",
        title: "Organizer - HackBattle",
        category: "Leadership",
        icon: Users,
        color: "from-cyan-500 to-blue-600",
        bgGradient: "from-cyan-50 to-blue-50",
        description: `Organized HackBattle with 600+ participants and multiple sponsor partners`,
        highlights: [
            "600+ Participants",
            "Multiple Sponsors",
            "Event Leadership",
        ],
    },
];

export default function AchievementsModal({
    visibility,
    onClose,
    isConstrained = false,
}) {
    const [expandedCard, setExpandedCard] = useState(null);
    const [hoveredCard, setHoveredCard] = useState(null);

    const handleCardClick = (id) => {
        setExpandedCard(expandedCard === id ? null : id);
    };

    const sectionClasses = isConstrained
        ? "absolute inset-0 w-full h-full justify-center items-center bg-black bg-opacity-50 z-50"
        : "fixed h-screen w-screen justify-center items-center top-0 bg-black bg-opacity-50 z-[9999]";

    const contentContainerClasses = isConstrained
        ? "w-full h-full flex flex-col border-4 border-[#2A2B3F] rounded-[1rem] shadow-lg"
        : "fixed z-[100] w-[95vw] md:w-[85vw] h-[90vh] md:h-[85vh] flex flex-col border-4 border-[#2A2B3F] rounded-[1rem] shadow-lg";

    return (
        <section
            className={`${visibility ? "flex" : "hidden"} ${sectionClasses}`}
        >
            <div className={contentContainerClasses}>
                <div className="w-full h-full p-2 md:p-4 bg-[#2A2B3F] rounded-[0.8rem]">
                    <div className="w-full h-full p-2 md:p-4 bg-[#E8A87C] rounded-[0.6rem]">
                        <div className="w-full h-full p-2 md:p-4 bg-[#F7F7F7] rounded-[0.4rem] flex flex-col">
                            {/* Header */}
                            <div className="relative">
                                <button
                                    onClick={onClose}
                                    className="absolute top-0 right-0 text-[#2A2B3F] hover:text-[#E8A87C] focus:outline-none transition-all duration-300 hover:scale-110 hover:rotate-90"
                                    aria-label="Close modal"
                                >
                                    <X className="h-7 w-7 md:h-8 md:w-8" />
                                </button>
                            </div>

                            <h1 className="text-[#2A2B3F] text-2xl md:text-4xl font-pixeboy text-center mt-8 md:mt-10 mb-6 tracking-wide">
                                Achievements and Certificates
                            </h1>

                            {/* Achievements Grid */}
                            <div className="flex-grow overflow-auto px-2 md:px-[5vw] pb-6 md:pb-10 scrollbar-hide space-y-5 md:space-y-7">
                                {achievements.map((achievement, index) => {
                                    const Icon = achievement.icon;
                                    const isExpanded =
                                        expandedCard === achievement.id;
                                    const isHovered =
                                        hoveredCard === achievement.id;

                                    return (
                                        <div
                                            key={achievement.id}
                                            className={`
                        relative overflow-hidden rounded-xl border-2 cursor-pointer
                        transition-all duration-500 ease-out transform
                        ${
                            isExpanded
                                ? "border-[#E8A87C] shadow-2xl scale-[1.02] bg-[#F2E8C6]"
                                : "border-[#E8A87C] hover:bg-[#F2E8C6] hover:shadow-lg bg-[#F7F7F7]"
                        }
                        ${isHovered ? "shadow-lg scale-[1.01]" : ""}
                      `}
                                            onClick={() =>
                                                handleCardClick(achievement.id)
                                            }
                                            onMouseEnter={() =>
                                                setHoveredCard(achievement.id)
                                            }
                                            onMouseLeave={() =>
                                                setHoveredCard(null)
                                            }
                                            style={{
                                                animationDelay: `${index * 100}ms`,
                                                animation: visibility
                                                    ? "slideInUp 0.6s ease-out forwards"
                                                    : "none",
                                            }}
                                        >
                                            {/* Gradient Background */}
                                            <div
                                                className={`absolute inset-0 bg-gradient-to-r ${achievement.bgGradient} opacity-20 transition-opacity duration-300 ${isExpanded ? "opacity-30" : ""}`}
                                            />

                                            {/* Card Header */}
                                            <div className="relative p-3 md:p-4">
                                                <div className="flex items-start justify-between">
                                                    <div className="flex items-center space-x-3 flex-1">
                                                        <div
                                                            className={`
                              p-2 md:p-3 rounded-xl bg-gradient-to-br ${achievement.color}
                              transform transition-all duration-300
                              ${isExpanded ? "scale-110 rotate-6" : isHovered ? "scale-105" : ""}
                            `}
                                                        >
                                                            <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <h3
                                                                className={`
                                font-arcade text-[#2A2B3F] text-lg md:text-xl
                                transition-colors duration-300
                                ${isExpanded ? "text-[#E8A87C]" : ""}
                              `}
                                                            >
                                                                {
                                                                    achievement.title
                                                                }
                                                            </h3>
                                                            <span
                                                                className={`
                                inline-block px-2 py-1 text-xs rounded-full mt-1 font-arcade
                                bg-gradient-to-r ${achievement.color} text-white
                                transform transition-all duration-300
                                ${isExpanded ? "scale-105" : ""}
                              `}
                                                            >
                                                                {
                                                                    achievement.category
                                                                }
                                                            </span>
                                                        </div>
                                                    </div>

                                                    {/* Retro Arrow Icon */}
                                                    <span
                                                        className={`
                              text-xl md:text-2xl transition-transform duration-300 transform text-[#2A2B3F]
                              ${isExpanded ? "rotate-90 text-[#E8A87C]" : ""}
                            `}
                                                    >
                                                        ▶
                                                    </span>
                                                </div>

                                                {/* Highlights (always visible) */}
                                                <div className="flex flex-wrap gap-1 mt-3">
                                                    {achievement.highlights.map(
                                                        (highlight, idx) => (
                                                            <span
                                                                key={idx}
                                                                className={`
                                text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-md font-arcade
                                transition-all duration-300 transform
                                ${isExpanded ? "bg-[#E8A87C] text-white scale-105" : ""}
                              `}
                                                                style={{
                                                                    animationDelay: `${idx * 50}ms`,
                                                                }}
                                                            >
                                                                {highlight}
                                                            </span>
                                                        ),
                                                    )}
                                                </div>
                                            </div>

                                            {/* Expandable Content */}
                                            <div
                                                className={`
                        overflow-hidden transition-all duration-500 ease-out
                        ${isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
                      `}
                                            >
                                                <div className="px-3 md:px-4 pb-3 md:pb-4">
                                                    <div
                                                        className={`
                              text-[#2A2B3F] p-3 md:p-4 font-arcade text-base md:text-lg leading-relaxed whitespace-pre-line
                              transform transition-all duration-500
                              ${isExpanded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}
                            `}
                                                    >
                                                        {
                                                            achievement.description
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .font-arcade {
                    font-family: "Courier New", monospace;
                    font-weight: bold;
                }
                .font-bigpixel {
                    font-family: "Arial", sans-serif;
                }

                @keyframes slideInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }

                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </section>
    );
}
