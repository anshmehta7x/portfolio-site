"use client";

import { X } from "lucide-react";

export default function WelcomePopup({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-[9999] p-4">
            <div className="w-full max-w-lg flex flex-col border-4 border-[#2A2B3F] rounded-[1rem] shadow-lg bg-[#2A2B3F]">
                <div className="w-full h-full p-2 bg-[#E8A87C] rounded-[0.8rem]">
                    <div className="w-full h-full p-4 bg-[#F7F7F7] rounded-[0.4rem] flex flex-col relative">
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-2 right-2 text-[#2A2B3F] hover:text-[#E8A87C] focus:outline-none transition-all duration-300 hover:scale-110 hover:rotate-90"
                            aria-label="Close modal"
                        >
                            <X className="h-7 w-7 md:h-8 md:w-8" />
                        </button>

                        {/* Content */}
                        <div className="text-center py-8 px-4">
                            <h1 className="text-[#2A2B3F] text-2xl md:text-4xl font-pixeboy mb-6 tracking-wide">
                                HI, I&apos;M ANSH
                            </h1>
                            <p className="text-[#4A4A4A] font-arcade text-base md:text-lg leading-relaxed mb-8">
                                Welcome to my interactive portfolio! Use your
                                arrow keys (or the on-screen controls) to move
                                around. Press &apos;A&apos; or click on glowing
                                objects to interact. Check out the HELP button
                                for more info. Enjoy your stay!
                            </p>
                            <button
                                onClick={onClose}
                                className="bg-[#E8A87C] text-[#2A2B3F] font-pixeboy text-xl md:text-2xl px-8 py-3 border-2 border-[#2A2B3F] rounded-md transition-all duration-200 hover:bg-[#d9986c] hover:scale-105"
                            >
                                LET&apos;S GO!
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* These styles ensure the custom fonts are available if not globally defined */}
            <style jsx>{`
                .font-arcade {
                    font-family: "Courier New", monospace;
                    font-weight: bold;
                }
                .font-pixeboy {
                    font-family: var(--pixeboy);
                }
            `}</style>
        </div>
    );
}
