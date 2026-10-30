import React from "react";
import {
    AppWindow,
    Atom,
    Binary,
    Box,
    Camera,
    Cloud,
    CodeXml,
    Coffee,
    Container,
    Database,
    FileCode2,
    Flame,
    Gem,
    GitMerge,
    Hammer,
    HardHat,
    LinkIcon,
    Monitor,
    Send,
    ServerCog,
    SheetIcon,
    Terminal,
    Wind,
} from "lucide-react";
import { skillsData } from "@/data/skills";

const ICONS = {
    AppWindow,
    Atom,
    Binary,
    Box,
    Camera,
    Cloud,
    CodeXml,
    Coffee,
    Container,
    Database,
    FileCode2,
    Flame,
    Gem,
    GitMerge,
    Hammer,
    HardHat,
    LinkIcon,
    Monitor,
    Send,
    ServerCog,
    SheetIcon,
    Terminal,
    Wind,
};


function renderSkillIcon(name) {
    const Icon = ICONS[name];
    return Icon ? <Icon size={22} /> : null;
}

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
                    <div style={{ color: color }}>{renderSkillIcon(skill.icon)}</div>
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
