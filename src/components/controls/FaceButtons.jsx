"use client";

import { usePressable } from "@/hooks/useGameInput";

function FaceButton({ button, className }) {
    const { pressed, pressableProps } = usePressable(button);
    return (
        <div className={`flex flex-col items-center gap-1 ${className}`}>
            <div
                {...pressableProps}
                className={`h-14 w-14 rounded-full cursor-pointer border-[3px] border-black flex items-center justify-center transition-all duration-75 ${
                    pressed
                        ? "bg-neutral-800 translate-y-[2px] shadow-[inset_0_3px_6px_rgba(0,0,0,0.8)]"
                        : "bg-neutral-700 shadow-[inset_0_2px_0_rgba(255,255,255,0.2),0_3px_0_rgba(0,0,0,0.45)]"
                }`}
            >
                <span className="font-pixeboy text-2xl text-neutral-200 pointer-events-none">
                    {button.toUpperCase()}
                </span>
            </div>
        </div>
    );
}

// GBA-style tilted A/B pair: B sits lower-left of A.
export default function FaceButtons({ className = "" }) {
    return (
        <div className={`relative flex items-end gap-3 ${className}`}>
            <FaceButton button="b" className="translate-y-4" />
            <FaceButton button="a" className="-translate-y-1" />
        </div>
    );
}
