"use client";

import TextBox from "@/components/ui/TextBox";
import useTypewriter from "@/hooks/useTypewriter";
import { INTRO_LINES } from "@/data/intro";
import { useGameInput } from "@/hooks/useGameInput";
import { INPUT_PRIORITY } from "@/lib/input";

// Professor-style welcome with typewriter text. A advances (or finishes the
// current line), SKIP/B ends it.
export default function IntroDialog({ index, coarse, reducedMotion, onAdvance, onSkip }) {
    const line = INTRO_LINES[index];
    const text = coarse && line.touch ? line.touch : line.text;
    const [shown, done, complete] = useTypewriter(text, reducedMotion);

    const advance = () => (done ? onAdvance() : complete());

    useGameInput(
        (event) => {
            if (event.type === "press") {
                if (event.button === "a") {
                    advance();
                } else if (event.button === "b" || event.button === "start") {
                    onSkip();
                }
            }
            return true;
        },
        { priority: INPUT_PRIORITY.INTRO },
    );

    return (
        <div className="absolute inset-0 z-40 flex flex-col justify-end bg-black/50 p-2 sm:p-4">
            <button
                type="button"
                onClick={onSkip}
                className="fr-box absolute right-2 top-2 flex min-h-[44px] items-center rounded-md px-3 text-lg sm:right-4 sm:top-4"
            >
                SKIP
            </button>
            <TextBox lines={[shown || " "]} showMoreArrow={done} onActivate={advance} />
        </div>
    );
}

