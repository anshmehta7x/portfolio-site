"use client";
import { useState } from "react";
import GameCanvas from "@/components/GameCanvas";
import Image from "next/image";
import CurvedBottom from "@/components/GameBoyParts/CurvedBottom";
import StartSelect from "@/components/GameBoyParts/StartSelect";
import ABbuttons from "@/components/GameBoyParts/ABbuttons";
import Dpad from "@/components/GameBoyParts/Dpad";

export default function GameBoy({
    setAchievementsVisibility,
    setResumeVisibility,
    setSkillsVisibility,
    setGbaPress,
    setProjectsVisibility,
    setContactVisibility,
    gbaPress,
}) {
    const [pressedButton, setPressedButton] = useState(null);
    const [lastTouchTime, setLastTouchTime] = useState(0);

    function buttonHandler(pressed) {
        setGbaPress(pressed);
    }

    function handleMouseDown(button, event) {
        event.preventDefault();
        const now = Date.now();
        if (event.type === "mousedown" && now - lastTouchTime < 500) return;
        if (
            event.type === "mousedown" &&
            event.sourceCapabilities?.firesTouchEvents
        )
            return;
        setPressedButton(button);
        buttonHandler(button);
    }

    function handleMouseUp(event) {
        const now = Date.now();
        if (event && event.type === "mouseup" && now - lastTouchTime < 500)
            return;
        if (
            event &&
            event.type === "mouseup" &&
            event.sourceCapabilities?.firesTouchEvents
        )
            return;
        setPressedButton(null);
    }

    function handleTouchStart(button, event) {
        event.preventDefault();
        setLastTouchTime(Date.now());
        setPressedButton(button);
        buttonHandler(button);
    }

    function handleTouchEnd(event) {
        event.preventDefault();
        setPressedButton(null);
    }

    return (
        <div className="relative w-full h-full max-w-full max-h-full aspect-[11/17] flex flex-col shadow-2xl shadow-black/50">
            {/* Top part of the shell. `flex-grow` makes it take up the remaining space. */}
            <div className="bg-gradient-to-r from-violet-700 to-indigo-900 w-full flex-grow rounded-t-xl flex flex-col items-center relative border-4 border-solid border-b-0 border-slate-900">
                <div className="bg-gradient-to-r from-black to-neutral-800 w-[90%] h-[50%] rounded-t-lg mt-4 flex items-center justify-center relative border-4 border-solid border-b-0 border-slate-800 shadow-[inset_1px_1px_0_0_rgba(255,255,255,0.15),inset_-1px_0_0_0_rgba(255,255,255,0.15)]">
                    <div className="bg-[#000000] w-[80%] h-[80%] rounded-sm border-solid border-8 border-t-4 border-black border-opacity-90 flex items-center justify-center overflow-hidden">
                        <GameCanvas
                            setAchievementsVisibility={
                                setAchievementsVisibility
                            }
                            setResumeVisibility={setResumeVisibility}
                            setSkillsVisibility={setSkillsVisibility}
                            setProjectsVisibility={setProjectsVisibility}
                            setContactVisibility={setContactVisibility}
                            gbaPress={gbaPress}
                            setGbaPress={setGbaPress}
                        />
                    </div>
                </div>

                <div className="bg-gradient-to-r from-black to-neutral-800 w-[90%] h-[2rem] rounded-b-[100%] relative z-10 border-4 border-solid border-t-0 border-slate-800 flex items-center justify-center shadow-[inset_1px_-1px_0_0_rgba(255,255,255,0.15),inset_-1px_0_0_0_rgba(255,255,255,0.15)]">
                    <Image src="/gameboy-images/gameboy-bottom.svg" alt={"hi"}
                           className="-mt-10"
                           width="161"
                           height="19"
                           loading="lazy"
                    />
                </div>

                <Dpad handleMouseDown={handleMouseDown} handleMouseUp={handleMouseUp} handleTouchStart={handleTouchStart} handleTouchEnd={handleTouchEnd} pressedButton={pressedButton}/>

                {/* A and B buttons */}
                <ABbuttons handleMouseDown={handleMouseDown} handleMouseUp={handleMouseUp} handleTouchStart={handleTouchStart} handleTouchEnd={handleTouchEnd} pressedButton={pressedButton}/>

                {/* Start Select */}
                <StartSelect handleMouseDown={handleMouseDown} handleMouseUp={handleMouseUp} handleTouchStart={handleTouchStart} handleTouchEnd={handleTouchEnd} pressedButton={pressedButton}/>
            </div>
            <CurvedBottom/>
        </div>
    );
}
