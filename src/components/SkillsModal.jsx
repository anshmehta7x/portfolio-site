import React from "react";
import {
    CodeXml,
    FileCode2,
    Binary,
    Coffee,
    Gem,
    Atom,
    Box,
    Wind,
    AppWindow,
    ServerCog,
    Camera,
    Database,
    GitMerge,
    Container,
    Send,
    Flame,
    Cloud,
    Link as LinkIcon,
    HardHat,
    Hammer,
    SheetIcon,
} from "lucide-react";

const skillsData = [
    {
        category: "Languages",
        color: "#61DAFB",
        skills: [
            { name: "Python", icon: <CodeXml size={22} /> },
            { name: "JavaScript", icon: <FileCode2 size={22} /> },
            { name: "TypeScript", icon: <FileCode2 size={22} /> },
            { name: "C/C++", icon: <Binary size={22} /> },
            { name: "Java", icon: <Coffee size={22} /> },
            { name: "Solidity", icon: <Gem size={22} /> },
        ],
    },
    {
        category: "Frameworks & Libraries",
        color: "#339933",
        skills: [
            { name: "React/Next.js", icon: <Atom size={22} /> },
            { name: "Node.js", icon: <Box size={22} /> },
            { name: "TailwindCSS", icon: <Wind size={22} /> },
            { name: "FastAPI/Flask", icon: <ServerCog size={22} /> },
            { name: "Three.js", icon: <AppWindow size={22} /> },
            { name: "OpenCV", icon: <Camera size={22} /> },
        ],
    },
    {
        category: "Databases & Tools",
        color: "#F26B21",
        skills: [
            { name: "SQL", icon: <Database size={22} /> },
            { name: "MongoDB", icon: <Database size={22} /> },
            { name: "DynamoDB", icon: <Database size={22} /> },
            { name: "Git", icon: <GitMerge size={22} /> },
            { name: "Docker", icon: <Container size={22} /> },
            { name: "AWS", icon: <Cloud size={22} /> },
            { name: "Firebase", icon: <Flame size={22} /> },
            { name: "Postman", icon: <Send size={22} /> },
        ],
    },
    {
        category: "Blockchain",
        color: "#FFD700",
        skills: [
            { name: "Ethereum", icon: <LinkIcon size={22} /> },
            { name: "Hardhat", icon: <HardHat size={22} /> },
            { name: "Foundry", icon: <Hammer size={22} /> },
            { name: "Smart Contracts", icon: <SheetIcon size={22} /> },
        ],
    },
];

const SkillCard = ({ category, color, skills }) => (
    <div className="bg-slate-800/50 rounded-lg p-5 border border-slate-700 flex flex-col h-full break-inside-avoid mb-6">
        <h3
            className="text-xl font-bold mb-4 text-center font-bigpixel tracking-wider"
            style={{ color: color, textShadow: `0 0 8px ${color}40` }}
        >
            {category}
        </h3>
        <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 gap-3">
            {skills.map((skill) => (
                <div
                    key={skill.name}
                    className="bg-slate-900/70 rounded-lg p-3 flex items-center space-x-3 hover:bg-slate-800 transition-colors"
                >
                    <div style={{ color: color }}>{skill.icon}</div>
                    <p className="text-sm font-medium text-slate-200">
                        {skill.name}
                    </p>
                </div>
            ))}
        </div>
    </div>
);

export default function SkillsModal({
    visibility,
    onClose,
    isConstrained = false,
}) {
    const sectionClasses = isConstrained
        ? "absolute inset-0 w-full h-full flex justify-center items-center bg-black bg-opacity-60 z-50"
        : "fixed inset-0 flex justify-center items-center bg-black bg-opacity-60 z-[9999]";

    const contentContainerClasses = isConstrained
        ? "bg-slate-900 h-full w-full border-2 border-slate-700 rounded-lg flex flex-col overflow-hidden"
        : "bg-slate-900 h-auto max-h-[90vh] w-[95vw] md:w-[90vw] lg:w-[80vw] max-w-6xl fixed z-100 border-2 border-slate-700 rounded-lg flex flex-col shadow-2xl";

    return (
        <section
            className={`${visibility ? "flex" : "hidden"} ${sectionClasses}`}
        >
            <div className={contentContainerClasses}>
                <div className="p-4 relative bg-slate-800 border-b border-slate-700">
                    <button
                        onClick={onClose}
                        className="absolute top-3.5 right-4 text-slate-400 hover:text-white focus:outline-none transition-colors duration-200 z-10"
                        aria-label="Close modal"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-7 w-7"
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
                    <h1 className="text-white text-2xl md:text-3xl font-arcade text-center glow-text">
                        Skills
                    </h1>
                </div>

                <div className="flex-grow overflow-y-auto p-5 md:p-8">
                    <div className="md:columns-2 gap-6">
                        {skillsData.map(({ category, color, skills }) => (
                            <SkillCard
                                key={category}
                                category={category}
                                color={color}
                                skills={skills}
                            />
                        ))}
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
                .glow-text {
                    text-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
                }
                .break-inside-avoid {
                    break-inside: avoid;
                }
            `}</style>
        </section>
    );
}
