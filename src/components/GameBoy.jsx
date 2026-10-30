"use client";

import Image from "next/image";
import GameCanvas from "@/components/GameCanvas";
import CurvedBottom from "@/components/GameBoyParts/CurvedBottom";
import DPad from "@/components/controls/DPad";
import FaceButtons from "@/components/controls/FaceButtons";
import PillButton from "@/components/controls/PillButton";
import ScreenHost from "@/components/screens/ScreenHost";

// Portrait handheld used on phones. Screens open full-viewport on top of it.
export default function GameBoy({ screen, openScreen, closeScreen }) {
    return (
        <>
        <div className="relative w-full h-full max-w-full max-h-full aspect-[11/17] flex flex-col drop-shadow-2xl">
            <div className="bg-shell w-full flex-grow rounded-t-2xl flex flex-col items-center relative border-4 border-b-0 border-shell-dark shadow-[inset_0_3px_0_rgba(255,255,255,0.18)]">
                <div className="bg-bezel w-[92%] h-[52%] rounded-t-lg mt-4 flex items-center justify-center relative border-4 border-b-0 border-bezel-light">
                    <div className="relative bg-black w-[88%] h-[88%] rounded-sm overflow-hidden">
                        <GameCanvas openScreen={openScreen} />
                    </div>
                </div>

                <div className="bg-bezel w-[92%] h-[2rem] rounded-b-[100%] relative z-10 border-4 border-t-0 border-bezel-light flex items-center justify-center">
                    <Image
                        src="/gameboy-images/gameboy-bottom.svg"
                        alt=""
                        className="-mt-10"
                        width="161"
                        height="19"
                        loading="lazy"
                    />
                </div>

                <div className="absolute left-[5%] bottom-[17%]">
                    <DPad />
                </div>
                <div className="absolute right-[5%] bottom-[22%]">
                    <FaceButtons />
                </div>
                <div className="absolute bottom-[3%] flex gap-2">
                    <PillButton button="select" label="HELP" />
                    <PillButton button="start" label="CONTACT" />
                </div>
            </div>
            <CurvedBottom />
        </div>
        {/* Outside the shell: its drop-shadow filter would trap position:fixed screens. */}
        <ScreenHost screen={screen} onClose={closeScreen} />
        </>
    );
}
