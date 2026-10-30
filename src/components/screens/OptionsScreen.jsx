"use client";

import ScreenFrame from "@/components/screens/ScreenFrame";
import { useGameUI } from "@/hooks/GameUIProvider";
import useCoarsePointer from "@/hooks/useCoarsePointer";
import { KEYBOARD_CONTROLS, ROOM_GUIDE, TOUCH_CONTROLS } from "@/data/help";

const ACCENT = "#586878";

// OPTIONS: controls reference, room guide and intro replay.
export default function OptionsScreen({ onClose, isConstrained = false }) {
    const { replayIntro } = useGameUI();
    const coarse = useCoarsePointer();
    const controls = coarse ? TOUCH_CONTROLS : KEYBOARD_CONTROLS;

    return (
        <ScreenFrame title="OPTIONS" accent={ACCENT} isConstrained={isConstrained} onClose={onClose} footer="B BACK">
            <div className="mx-auto grid max-w-3xl gap-3 md:grid-cols-2">
                <section className="fr-box rounded-lg p-3">
                    <h3 className="mb-2 text-xl">CONTROLS</h3>
                    <ul className="space-y-1">
                        {controls.map(({ key, action }) => (
                            <li key={key} className="flex items-center justify-between gap-2">
                                <kbd className="fr-key">{key}</kbd>
                                <span className="text-right text-base">{action.toUpperCase()}</span>
                            </li>
                        ))}
                    </ul>
                </section>
                <section className="fr-box rounded-lg p-3">
                    <h3 className="mb-2 text-xl">IN THE ROOM</h3>
                    <ul className="space-y-1">
                        {ROOM_GUIDE.map(({ object, section }) => (
                            <li key={object} className="flex justify-between gap-2 text-base">
                                <span>{object.toUpperCase()}</span>
                                <span className="text-right opacity-80">{section.toUpperCase()}</span>
                            </li>
                        ))}
                    </ul>
                    <p className="mt-2 text-sm opacity-70">LOOK FOR THE ! MARKERS</p>
                </section>
                <div className="flex flex-wrap gap-2 md:col-span-2">
                    <button type="button" onClick={replayIntro} className="fr-box min-h-[44px] rounded-md px-4 text-lg">
                        REPLAY INTRO
                    </button>
                </div>
            </div>
        </ScreenFrame>
    );
}
