"use client";

import { useEffect, useState } from "react";
import { useProgress } from "@react-three/drei";
import { useGameInput } from "@/hooks/useGameInput";
import { INPUT_PRIORITY } from "@/lib/input";

// Give up waiting on the loader after this long so nobody gets stuck.
const LOAD_TIMEOUT_MS = 12000;

// GBA-style title screen. Doubles as the asset loader: PRESS START appears
// once the room and Red have finished loading.
export default function TitleScreen({ onStart }) {
    const { progress, active } = useProgress();
    const [timedOut, setTimedOut] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setTimedOut(true), LOAD_TIMEOUT_MS);
        return () => clearTimeout(timer);
    }, []);

    const ready = (progress >= 100 && !active) || timedOut;
    const percent = Math.round(progress);

    useGameInput(
        (event) => {
            if (ready && event.type === "press" && (event.button === "a" || event.button === "start")) {
                onStart();
            }
            return true;
        },
        { priority: INPUT_PRIORITY.INTRO },
    );

    return (
        <button
            type="button"
            onClick={() => ready && onStart()}
            aria-label={ready ? "Press start" : `Loading ${percent}%`}
            className="fr-title absolute inset-0 z-40 flex flex-col items-center justify-center gap-6 px-4 text-center cursor-default"
        >
            <div>
                <p className="font-arcade text-5xl leading-none text-[#f8f8f8] sm:text-7xl [text-shadow:4px_4px_0_#e03828]">
                    ANSH
                </p>
                <p className="font-arcade text-3xl leading-none text-[#f8f8f8] sm:text-5xl [text-shadow:3px_3px_0_#e03828]">
                    MEHTA
                </p>
                <p className="mt-3 font-pixeboy text-base tracking-[0.3em] text-[#f8c040] sm:text-2xl">
                    PORTFOLIO VERSION
                </p>
            </div>
            {ready ? (
                <p className="fr-blink font-pixeboy text-xl text-[#f8f8f8] sm:text-3xl">PRESS START</p>
            ) : (
                <div className="w-40 sm:w-64" role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}>
                    <div className="h-3 w-full rounded-sm border-2 border-[#f8f8f8] p-[2px]">
                        <div className="h-full bg-[#f8c040]" style={{ width: `${percent}%` }} />
                    </div>
                    <p className="mt-2 font-pixeboy text-sm text-[#f8f8f8] sm:text-lg">LOADING {percent}</p>
                </div>
            )}
            <p className="absolute bottom-3 font-pixeboy text-xs text-[#a0a0a8] sm:text-sm">
                A FAN-MADE PORTFOLIO
            </p>
        </button>
    );
}
