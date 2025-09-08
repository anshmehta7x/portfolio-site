// ScreenArea.jsx
import React from "react";
import GameCanvas from "@/components/GameCanvas";

export default function ScreenArea({ setAchievementsVisibility, setResumeVisibility, setSkillsVisibility, setProjectsVisibility, setContactVisibility, gbaPress, setGbaPress, renderConstrainedModal }) {
    return (
        <div className="flex-1 h-full flex flex-col items-center justify-center mx-8">
            <div className="w-full h-full bg-gradient-to-r from-black to-neutral-800 rounded-2xl p-8 shadow-[inset_1px_1px_0_0_rgba(255,255,255,0.15),inset_-1px_0_0_0_rgba(255,255,255,0.15)] border-4 border-slate-800">
                <div className="w-full h-full bg-black rounded-lg border-8 border-black border-opacity-90 overflow-hidden relative">
                    <GameCanvas
                        setAchievementsVisibility={setAchievementsVisibility}
                        setResumeVisibility={setResumeVisibility}
                        setSkillsVisibility={setSkillsVisibility}
                        setProjectsVisibility={setProjectsVisibility}
                        setContactVisibility={setContactVisibility}
                        gbaPress={gbaPress}
                        setGbaPress={setGbaPress}
                    />
                    {renderConstrainedModal()}
                </div>
            </div>
            <div className="flex space-x-3 mt-6">
                {[...Array(8)].map((_, i) => (
                    <div
                        key={i}
                        className="w-1.5 h-10 bg-neutral-700 rounded-full shadow-[inset_1px_1px_2px_0_rgba(0,0,0,0.8)]"
                    ></div>
                ))}
            </div>
        </div>
    );
}

