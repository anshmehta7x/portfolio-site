"use client";

import { usePressable } from "@/hooks/useGameInput";

// START / SELECT style pill. The visible pill is small like real hardware, but
// the hit area is padded out to at least 44px.
export default function PillButton({ button, label }) {
    const { pressed, pressableProps } = usePressable(button);
    return (
        <div
            {...pressableProps}
            aria-label={label}
            className="flex flex-col items-center justify-center gap-1 min-h-[44px] min-w-[64px] px-2 cursor-pointer"
        >
            <span
                aria-hidden="true"
                className={`block h-4 w-12 rounded-full border-2 border-shell-ink transition-all duration-75 ${
                    pressed
                        ? "bg-neutral-900 shadow-[inset_0_2px_4px_rgba(0,0,0,0.9)]"
                        : "bg-neutral-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_2px_0_rgba(0,0,0,0.35)]"
                }`}
            />
            <span className="font-pixeboy text-sm leading-none tracking-wide text-shell-label/90">{label}</span>
        </div>
    );
}
