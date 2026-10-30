"use client";

import { usePressable } from "@/hooks/useGameInput";

const ARMS = [
    { button: "up", area: "col-start-2 row-start-1 rounded-t-md", rotate: 0 },
    { button: "left", area: "col-start-1 row-start-2 rounded-l-md", rotate: -90 },
    { button: "right", area: "col-start-3 row-start-2 rounded-r-md", rotate: 90 },
    { button: "down", area: "col-start-2 row-start-3 rounded-b-md", rotate: 180 },
];

function DPadArm({ button, area, rotate }) {
    const { pressed, pressableProps } = usePressable(button);
    return (
        <div
            {...pressableProps}
            className={`${area} flex items-center justify-center cursor-pointer bg-neutral-800 transition-colors duration-75 ${
                pressed ? "bg-neutral-900 shadow-[inset_0_2px_6px_rgba(0,0,0,0.9)]" : "shadow-[inset_0_2px_0_rgba(255,255,255,0.12)]"
            }`}
        >
            <svg
                aria-hidden="true"
                viewBox="0 0 16 14"
                className={`h-3.5 w-4 pointer-events-none ${pressed ? "fill-neutral-500" : "fill-neutral-950"}`}
                style={{ transform: `rotate(${rotate}deg)` }}
            >
                <polygon points="8,0 16,14 0,14" />
            </svg>
        </div>
    );
}

// 3x3 grid cross. Each arm is a third of the pad (48px at the default 144px size).
export default function DPad({ className = "" }) {
    return (
        <div className={`relative grid grid-cols-3 grid-rows-3 h-36 w-36 drop-shadow-[0_3px_0_rgba(0,0,0,0.45)] ${className}`}>
            {ARMS.map((arm) => (
                <DPadArm key={arm.button} {...arm} />
            ))}
            <div aria-hidden="true" className="col-start-2 row-start-2 bg-neutral-800 flex items-center justify-center">
                <div className="h-5 w-5 rounded-full bg-neutral-900/70 shadow-[inset_1px_1px_3px_rgba(0,0,0,0.8)]" />
            </div>
        </div>
    );
}
