"use client";

import React, { useState, Suspense } from "react";
import GameCanvas from "@/components/GameCanvas";

const AchievementsModal = React.lazy(
    () => import("@/components/AchievementsModal"),
);
const ResumeModal = React.lazy(() => import("@/components/ResumeModal"));
const ProjectsModal = React.lazy(() => import("@/components/ProjectsModal"));
const ContactModal = React.lazy(() => import("@/components/ContactModal"));

const SkillsModal = React.lazy(() => import("@/components/SkillsModal"));

const modals = {
    AchievementsModal,
    ResumeModal,
    SkillsModal,
    ContactModal,
    ProjectsModal,
};

export default function HandheldConsole({
    setAchievementsVisibility,
    setResumeVisibility,
    setSkillsVisibility,
    setGbaPress,
    gbaPress,
    activeModal,
    closeModal,
    setProjectsVisibility,
    setContactVisibility,
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

    const renderConstrainedModal = () => {
        if (!activeModal) return null;
        const ModalComponent = modals[activeModal];

        return (
            <Suspense
                fallback={<div className="text-white">Loading Modal...</div>}
            >
                <ModalComponent
                    visibility={!!activeModal}
                    onClose={closeModal}
                    isConstrained={true}
                />
            </Suspense>
        );
    };

    return (
        <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
            <div className="w-full h-full bg-gradient-to-r from-violet-700 to-indigo-900 rounded-3xl flex items-center justify-between p-6 shadow-2xl border-4 border-slate-900 relative">
                <div className="flex flex-col items-center justify-center space-y-16 w-36">
                    <div className="flex flex-col items-center space-y-3">
                        <div
                            className={`${
                                pressedButton === "help"
                                    ? "bg-gradient-to-b from-slate-900 to-violet-800 shadow-[inset_0_2px_8px_0_rgba(0,0,0,0.8)]"
                                    : "bg-gradient-to-b from-slate-800 to-violet-700 shadow-[0_2px_4px_0_rgba(0,0,0,0.3)]"
                            } w-20 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all duration-100 border-2 border-black`}
                            onMouseDown={(e) => handleMouseDown("help", e)}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseUp}
                            onTouchStart={(e) => handleTouchStart("help", e)}
                            onTouchEnd={handleTouchEnd}
                        >
                            <div
                                className={`bg-gradient-to-b from-neutral-700 via-neutral-600 to-neutral-900 ${
                                    pressedButton === "help"
                                        ? "shadow-[inset_-1px_-1px_6px_0_rgba(0,0,0,1)]"
                                        : "shadow-[inset_-2px_-1px_10px_0_rgba(0,0,0,1)]"
                                } w-[90%] h-[70%] rounded-full transition-all duration-100`}
                            ></div>
                        </div>
                        <div className="text-violet-300 text-sm font-bold tracking-wider">
                            HELP
                        </div>
                    </div>

                    <div className="relative w-36 h-36">
                        <div className="bg-black rounded-md w-16 h-full absolute left-1/2 transform -translate-x-1/2"></div>
                        <div className="bg-black rounded-md h-16 w-full absolute top-1/2 transform -translate-y-1/2"></div>
                        <div className="bg-gradient-to-b from-neutral-800 to-neutral-700 rounded-sm w-14 h-full absolute left-1/2 transform -translate-x-1/2 border-t-4 border-b-4 border-solid border-black shadow-[inset_0_2px_4px_0_rgba(255,255,255,0.3),inset_0_-2px_4px_0_rgba(0,0,0,0.8)]"></div>
                        <div className="bg-gradient-to-r from-neutral-800 to-neutral-700 rounded-sm h-14 w-full absolute top-1/2 transform -translate-y-1/2 border-l-4 border-r-4 border-solid border-black shadow-[inset_2px_0_4px_0_rgba(255,255,255,0.3),inset_-2px_0_4px_0_rgba(0,0,0,0.8)]"></div>
                        <div className="bg-gradient-to-br from-neutral-800 to-neutral-700 rounded-full w-8 h-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-[inset_2px_2px_4px_0_rgba(0,0,0,0.75),2px_2px_4px_0_rgba(255,255,255,.2)] z-10"></div>
                        <div
                            className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-[calc(50%-16px)] cursor-pointer z-20 rounded-t-lg"
                            onMouseDown={(e) => handleMouseDown("up", e)}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseUp}
                            onTouchStart={(e) => handleTouchStart("up", e)}
                            onTouchEnd={handleTouchEnd}
                        >
                            <div
                                className={`absolute top-[12px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-solid border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[20px] ${
                                    pressedButton === "up"
                                        ? "border-b-neutral-600 shadow-none"
                                        : "border-b-neutral-900 shadow-[0_1px_0_0_rgba(255,255,255,.2)]"
                                } transition-all duration-75 pointer-events-none`}
                            ></div>
                        </div>
                        <div
                            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-[calc(50%-16px)] cursor-pointer z-20 rounded-b-lg"
                            onMouseDown={(e) => handleMouseDown("down", e)}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseUp}
                            onTouchStart={(e) => handleTouchStart("down", e)}
                            onTouchEnd={handleTouchEnd}
                        >
                            <div
                                className={`absolute bottom-[12px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-solid border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[20px] ${
                                    pressedButton === "down"
                                        ? "border-t-neutral-600 shadow-none"
                                        : "border-t-neutral-800 shadow-[0_-1px_0_0_rgba(255,255,255,.2)]"
                                } transition-all duration-75 pointer-events-none`}
                            ></div>
                        </div>
                        <div
                            className="absolute left-0 top-1/2 -translate-y-1/2 h-16 w-[calc(50%-16px)] cursor-pointer z-20 rounded-l-lg"
                            onMouseDown={(e) => handleMouseDown("left", e)}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseUp}
                            onTouchStart={(e) => handleTouchStart("left", e)}
                            onTouchEnd={handleTouchEnd}
                        >
                            <div
                                className={`absolute left-[12px] top-1/2 transform -translate-y-1/2 w-0 h-0 border-solid border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-r-[20px] ${
                                    pressedButton === "left"
                                        ? "border-r-neutral-600 shadow-none"
                                        : "border-r-neutral-900 shadow-[1px_0_0_0_rgba(255,255,255,.2)]"
                                } transition-all duration-75 pointer-events-none`}
                            ></div>
                        </div>
                        <div
                            className="absolute right-0 top-1/2 -translate-y-1/2 h-16 w-[calc(50%-16px)] cursor-pointer z-20 rounded-r-lg"
                            onMouseDown={(e) => handleMouseDown("right", e)}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseUp}
                            onTouchStart={(e) => handleTouchStart("right", e)}
                            onTouchEnd={handleTouchEnd}
                        >
                            <div
                                className={`absolute right-[12px] top-1/2 transform -translate-y-1/2 w-0 h-0 border-solid border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-l-[20px] ${
                                    pressedButton === "right"
                                        ? "border-l-neutral-600 shadow-none"
                                        : "border-l-neutral-800 shadow-[-1px_0_0_0_rgba(255,255,255,.2)]"
                                } transition-all duration-75 pointer-events-none`}
                            ></div>
                        </div>
                    </div>
                </div>

                <div className="flex-1 h-full flex flex-col items-center justify-center mx-8">
                    <div className="w-full h-full bg-gradient-to-r from-black to-neutral-800 rounded-2xl p-8 shadow-[inset_1px_1px_0_0_rgba(255,255,255,0.15),inset_-1px_0_0_0_rgba(255,255,255,0.15)] border-4 border-slate-800">
                        <div className="w-full h-full bg-black rounded-lg border-8 border-black border-opacity-90 overflow-hidden relative">
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

                <div className="flex flex-col items-center justify-center space-y-16 w-36">
                    <div className="flex flex-col items-center space-y-3">
                        <div
                            className={`${
                                pressedButton === "start"
                                    ? "bg-gradient-to-b from-slate-900 to-violet-800 shadow-[inset_0_2px_8px_0_rgba(0,0,0,0.8)]"
                                    : "bg-gradient-to-b from-slate-800 to-violet-700 shadow-[0_2px_4px_0_rgba(0,0,0,0.3)]"
                            } w-20 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all duration-100 border-2 border-black`}
                            onMouseDown={(e) => handleMouseDown("start", e)}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseUp}
                            onTouchStart={(e) => handleTouchStart("start", e)}
                            onTouchEnd={handleTouchEnd}
                        >
                            <div
                                className={`bg-gradient-to-b from-neutral-700 via-neutral-600 to-neutral-900 ${
                                    pressedButton === "start"
                                        ? "shadow-[inset_-1px_-1px_6px_0_rgba(0,0,0,1)]"
                                        : "shadow-[inset_-2px_-1px_10px_0_rgba(0,0,0,1)]"
                                } w-[90%] h-[70%] rounded-full transition-all duration-100`}
                            ></div>
                        </div>
                        <div className="text-violet-300 text-sm font-bold tracking-wider">
                            CONTACT
                        </div>
                    </div>

                    <div className="relative w-40 h-20">
                        <div
                            className={`${
                                pressedButton === "b"
                                    ? "bg-gradient-to-br from-neutral-800 to-neutral-900 shadow-[inset_2px_4px_8px_0_rgba(0,0,0,0.8),inset_1px_2px_1px_0_rgba(255,255,255,0.05)]"
                                    : "bg-gradient-to-br from-neutral-700 to-neutral-800 shadow-[inset_1px_2px_1px_0_rgba(255,255,255,0.15),2px_2px_1px_0_rgba(0,0,0,0.25)]"
                            } absolute left-0 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full cursor-pointer transition-all duration-100 border-4 border-black border-b-2 flex items-center justify-center select-none`}
                            onMouseDown={(e) => handleMouseDown("b", e)}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseUp}
                            onTouchStart={(e) => handleTouchStart("b", e)}
                            onTouchEnd={handleTouchEnd}
                        >
                            <span
                                className={`font-bold text-white absolute ${
                                    pressedButton === "b"
                                        ? "bottom-0"
                                        : "bottom-1"
                                } left-1/2 transform -translate-x-1/2 text-2xl transition-all duration-75`}
                            >
                                B
                            </span>
                        </div>

                        <div
                            className={`${
                                pressedButton === "a"
                                    ? "bg-gradient-to-br from-neutral-800 to-neutral-900 shadow-[inset_2px_4px_8px_0_rgba(0,0,0,0.8),inset_1px_2px_1px_0_rgba(255,255,255,0.05)]"
                                    : "bg-gradient-to-br from-neutral-700 to-neutral-800 shadow-[inset_1px_2px_1px_0_rgba(255,255,255,0.15),2px_2px_1px_0_rgba(0,0,0,0.25)]"
                            } absolute right-0 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full cursor-pointer transition-all duration-100 border-4 border-black border-b-2 flex items-center justify-center select-none`}
                            onMouseDown={(e) => handleMouseDown("a", e)}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseUp}
                            onTouchStart={(e) => handleTouchStart("a", e)}
                            onTouchEnd={handleTouchEnd}
                        >
                            <span
                                className={`font-bold text-white absolute ${
                                    pressedButton === "a"
                                        ? "bottom-0"
                                        : "bottom-1"
                                } left-1/2 transform -translate-x-1/2 text-2xl transition-all duration-75`}
                            >
                                A
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
