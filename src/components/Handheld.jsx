"use client";

import ScreenArea from "@/components/HandheldParts/ScreenArea";
import DPad from "@/components/controls/DPad";
import FaceButtons from "@/components/controls/FaceButtons";
import PillButton from "@/components/controls/PillButton";

// Landscape GBA-style shell used on desktop. Screens open inside the console screen.
export default function Handheld({ screen, openScreen, closeScreen }) {
    return (
        <div className="w-full h-full bg-shell rounded-[2.5rem] flex items-center justify-between px-6 py-6 border-4 border-shell-dark relative shadow-[inset_0_4px_0_rgba(255,255,255,0.18),inset_0_-8px_0_rgba(0,0,0,0.18)]">
            <div className="flex flex-col items-center justify-center gap-16 w-40 shrink-0">
                <PillButton button="select" label="HELP" />
                <DPad />
            </div>
            <ScreenArea screen={screen} openScreen={openScreen} closeScreen={closeScreen} />
            <div className="flex flex-col items-center justify-center gap-16 w-40 shrink-0">
                <PillButton button="start" label="CONTACT" />
                <FaceButtons />
            </div>
        </div>
    );
}
