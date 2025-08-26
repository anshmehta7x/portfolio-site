"use client";

import { X, MousePointerClick, Move, Keyboard } from "lucide-react";

const controls = [
    {
        title: "Keyboard",
        Icon: Keyboard,
        keys: [
            { key: "W / ↑", action: "Move Forward" },
            { key: "A / ←", action: "Turn Left" },
            { key: "S / ↓", action: "Turn Back" },
            { key: "D / →", action: "Turn Right" },
            { key: "E / Enter", action: "Interact" },
        ],
    },
    {
        title: "On-Screen / Mouse",
        Icon: MousePointerClick,
        keys: [
            { key: "D-Pad", action: "Move / Turn" },
            { key: "A Button", action: "Interact" },
            { key: "Click Object", action: "Interact" },
            { key: "B Button", action: "Close Modals" },
        ],
    },
];

const interactables = [
    { object: "Computer", section: "My Resume" },
    { object: "TV", section: "My Projects" },
    { object: "Bookshelf", section: "My Skills" },
    { object: "Wall Certificate", section: "My Achievements" },
];

export default function HelpModal({
    visibility,
    onClose,
    isConstrained = false,
}) {
    const sectionClasses = isConstrained
        ? "absolute inset-0 w-full h-full flex justify-center items-center bg-black bg-opacity-60 z-50"
        : "fixed inset-0 flex justify-center items-center bg-black bg-opacity-60 z-[9999] p-4";

    const contentContainerClasses = isConstrained
        ? "w-full h-full flex flex-col border-4 border-[#2A2B3F] rounded-[1rem] shadow-lg"
        : "w-full max-w-4xl h-auto max-h-[90vh] flex flex-col border-4 border-[#2A2B3F] rounded-[1rem] shadow-lg";

    return (
        <section
            className={`${visibility ? "flex" : "hidden"} ${sectionClasses}`}
        >
            <div className={contentContainerClasses}>
                <div className="w-full h-full p-2 bg-[#2A2B3F] rounded-[0.8rem]">
                    <div className="w-full h-full p-2 bg-[#E8A87C] rounded-[0.6rem]">
                        <div className="w-full h-full bg-[#F7F7F7] rounded-[0.4rem] flex flex-col relative">
                            {/* Header */}
                            <div className="p-3 border-b-4 border-dashed border-[#E8A87C] flex-shrink-0">
                                <button
                                    onClick={onClose}
                                    className="absolute top-3 right-3 text-[#2A2B3F] hover:text-[#E8A87C] focus:outline-none transition-all duration-300 hover:scale-110 hover:rotate-90 z-10"
                                    aria-label="Close modal"
                                >
                                    <X className="h-6 w-6 sm:h-7 sm:w-7" />
                                </button>
                                <h1 className="text-[#2A2B3F] text-2xl sm:text-3xl font-pixeboy text-center tracking-wide">
                                    GUIDE
                                </h1>
                            </div>

                            <div className="flex-grow overflow-y-auto p-2 sm:p-4 scrollbar-hide">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-4">
                                    <div className="space-y-2 sm:space-y-4">
                                        {controls.map((control) => {
                                            const Icon = control.Icon;
                                            return (
                                                <div
                                                    key={control.title}
                                                    className="bg-[#F2E8C6] p-2 sm:p-3 rounded-lg border-2 border-[#E8A87C]"
                                                >
                                                    <div className="text-center text-[#2A2B3F]">
                                                        <Icon className="w-7 h-7 sm:w-8 sm:h-8 mx-auto mb-1" />
                                                        <h2 className="font-arcade text-base sm:text-lg md:text-xl mb-2">
                                                            {control.title}
                                                        </h2>
                                                    </div>
                                                    <ul className="space-y-1">
                                                        {control.keys.map(
                                                            (item) => (
                                                                <li
                                                                    key={
                                                                        item.key
                                                                    }
                                                                    className="flex justify-between items-center bg-white/50 p-1.5 rounded"
                                                                >
                                                                    <span className="font-pixeboy text-sm sm:text-base text-[#4A4A4A]">
                                                                        {
                                                                            item.action
                                                                        }
                                                                    </span>
                                                                    <span className="font-arcade text-xs sm:text-sm text-[#2A2B3F] bg-[#E8A87C] px-2 py-1 rounded">
                                                                        {
                                                                            item.key
                                                                        }
                                                                    </span>
                                                                </li>
                                                            ),
                                                        )}
                                                    </ul>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* Interactables Section */}
                                    <div className="bg-[#F2E8C6] p-2 sm:p-3 rounded-lg border-2 border-[#E8A87C]">
                                        <div className="text-center text-[#2A2B3F]">
                                            <Move className="w-7 h-7 sm:w-8 sm:h-8 mx-auto mb-1" />
                                            <h2 className="font-arcade text-base sm:text-lg md:text-xl mb-2">
                                                INTERACTABLES
                                            </h2>
                                        </div>
                                        <p className="font-arcade text-center text-xs text-[#4A4A4A] mb-3">
                                            Approach glowing objects and press
                                            &apos;A&apos; or Click to discover
                                            more!
                                        </p>
                                        <ul className="space-y-2">
                                            {interactables.map((item) => (
                                                <li
                                                    key={item.object}
                                                    className="flex items-center bg-white/50 p-2 sm:p-3 rounded text-sm sm:text-base"
                                                >
                                                    <span className="font-pixeboy text-[#2A2B3F] w-1/2">
                                                        {item.object}:
                                                    </span>
                                                    <span className="font-arcade text-[#4A4A4A] w-1/2">
                                                        {item.section}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
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
                .font-pixeboy {
                    font-family: var(--pixeboy);
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
