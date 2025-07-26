"use client";

import { useState } from "react";
import GameCanvas from "@/components/GameCanvas";

export default function HandheldConsole({
  setAchievementsVisibility,
  setResumeVisibility,
  setSkillsVisibility,
  setGbaPress,
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
    if (event && event.type === "mouseup" && now - lastTouchTime < 500) return;
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
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
      {/* Game Boy Console Body */}
      <div className="w-full h-full bg-gradient-to-br from-slate-300 via-slate-200 to-slate-400 rounded-3xl flex items-center justify-between p-12 shadow-2xl border-4 border-slate-500 relative">
        {/* Left Side - D-Pad and HELP */}
        <div className="flex flex-col items-center justify-center space-y-12 w-48">
          {/* HELP Button */}
          <div className="flex flex-col items-center space-y-2">
            <div
              className={`${
                pressedButton === "help"
                  ? "bg-gradient-to-b from-slate-600 to-slate-700 shadow-[inset_0_3px_8px_0_rgba(0,0,0,0.6)]"
                  : "bg-gradient-to-b from-slate-400 to-slate-500 shadow-[0_3px_6px_0_rgba(0,0,0,0.3)]"
              } w-16 h-6 rounded-full cursor-pointer transition-all duration-100 border-2 border-slate-600`}
              onMouseDown={(e) => handleMouseDown("help", e)}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={(e) => handleTouchStart("help", e)}
              onTouchEnd={handleTouchEnd}
            />
            <div className="text-slate-700 text-sm font-bold tracking-wider">
              HELP
            </div>
          </div>

          {/* D-Pad */}
          <div className="relative w-28 h-28">
            {/* D-Pad Base */}
            <div className="bg-slate-800 rounded-lg w-12 h-full absolute left-1/2 transform -translate-x-1/2"></div>
            <div className="bg-slate-800 rounded-lg h-12 w-full absolute top-1/2 transform -translate-y-1/2"></div>

            {/* D-Pad Arms */}
            <div className="bg-gradient-to-b from-indigo-500 to-indigo-600 rounded-md w-10 h-full absolute left-1/2 transform -translate-x-1/2 border-2 border-indigo-700 shadow-[0_2px_4px_0_rgba(0,0,0,0.3)]"></div>
            <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-md h-10 w-full absolute top-1/2 transform -translate-y-1/2 border-2 border-indigo-700 shadow-[0_2px_4px_0_rgba(0,0,0,0.3)]"></div>

            {/* Center Circle */}
            <div className="bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-full w-6 h-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-indigo-700 shadow-[inset_1px_1px_2px_0_rgba(255,255,255,0.3)] z-10"></div>

            {/* D-Pad Buttons */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-[calc(50%-12px)] cursor-pointer z-20 rounded-t-lg"
              onMouseDown={(e) => handleMouseDown("up", e)}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={(e) => handleTouchStart("up", e)}
              onTouchEnd={handleTouchEnd}
            />
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-[calc(50%-12px)] cursor-pointer z-20 rounded-b-lg"
              onMouseDown={(e) => handleMouseDown("down", e)}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={(e) => handleTouchStart("down", e)}
              onTouchEnd={handleTouchEnd}
            />
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 h-12 w-[calc(50%-12px)] cursor-pointer z-20 rounded-l-lg"
              onMouseDown={(e) => handleMouseDown("left", e)}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={(e) => handleTouchStart("left", e)}
              onTouchEnd={handleTouchEnd}
            />
            <div
              className="absolute right-0 top-1/2 -translate-y-1/2 h-12 w-[calc(50%-12px)] cursor-pointer z-20 rounded-r-lg"
              onMouseDown={(e) => handleMouseDown("right", e)}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={(e) => handleTouchStart("right", e)}
              onTouchEnd={handleTouchEnd}
            />
          </div>
        </div>

        {/* Center - Screen */}
        <div className="flex-1 h-full flex flex-col items-center justify-center mx-16">
          {/* Screen Container */}
          <div className="w-full h-full bg-gradient-to-br from-slate-600 to-slate-800 rounded-2xl p-8 shadow-[inset_0_4px_12px_0_rgba(0,0,0,0.6)] border-4 border-slate-700">
            {/* Screen Bezel */}
            <div className="w-full h-full bg-black rounded-lg border-2 border-slate-900 overflow-hidden relative">
              <GameCanvas
                setAchievementsVisibility={setAchievementsVisibility}
                setResumeVisibility={setResumeVisibility}
                setSkillsVisibility={setSkillsVisibility}
                gbaPress={gbaPress}
                setGbaPress={setGbaPress}
              />
            </div>
          </div>

          {/* Speaker Grilles */}
          <div className="flex space-x-3 mt-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="w-1.5 h-10 bg-slate-600 rounded-full"
              ></div>
            ))}
          </div>
        </div>

        {/* Right Side - A/B Buttons and START */}
        <div className="flex flex-col items-center justify-center space-y-12 w-48">
          {/* START Button */}
          <div className="flex flex-col items-center space-y-2">
            <div
              className={`${
                pressedButton === "start"
                  ? "bg-gradient-to-b from-slate-600 to-slate-700 shadow-[inset_0_3px_8px_0_rgba(0,0,0,0.6)]"
                  : "bg-gradient-to-b from-slate-400 to-slate-500 shadow-[0_3px_6px_0_rgba(0,0,0,0.3)]"
              } w-16 h-6 rounded-full cursor-pointer transition-all duration-100 border-2 border-slate-600`}
              onMouseDown={(e) => handleMouseDown("start", e)}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={(e) => handleTouchStart("start", e)}
              onTouchEnd={handleTouchEnd}
            />
            <div className="text-slate-700 text-sm font-bold tracking-wider">
              START
            </div>
          </div>

          {/* A and B Buttons */}
          <div className="relative w-32 h-16">
            {/* B Button (Left) */}
            <div
              className={`${
                pressedButton === "b"
                  ? "bg-gradient-to-br from-indigo-600 to-indigo-700 shadow-[inset_2px_4px_8px_0_rgba(0,0,0,0.6)]"
                  : "bg-gradient-to-br from-indigo-500 to-indigo-600 shadow-[2px_2px_6px_0_rgba(0,0,0,0.3)]"
              } absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full cursor-pointer transition-all duration-100 border-3 border-indigo-700 flex items-center justify-center`}
              onMouseDown={(e) => handleMouseDown("b", e)}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={(e) => handleTouchStart("b", e)}
              onTouchEnd={handleTouchEnd}
            >
              <span className="text-white text-lg font-bold">B</span>
            </div>

            {/* A Button (Right) */}
            <div
              className={`${
                pressedButton === "a"
                  ? "bg-gradient-to-br from-indigo-600 to-indigo-700 shadow-[inset_2px_4px_8px_0_rgba(0,0,0,0.6)]"
                  : "bg-gradient-to-br from-indigo-500 to-indigo-600 shadow-[2px_2px_6px_0_rgba(0,0,0,0.3)]"
              } absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full cursor-pointer transition-all duration-100 border-3 border-indigo-700 flex items-center justify-center`}
              onMouseDown={(e) => handleMouseDown("a", e)}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={(e) => handleTouchStart("a", e)}
              onTouchEnd={handleTouchEnd}
            >
              <span className="text-white text-lg font-bold">A</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
