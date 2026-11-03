"use client";

import { useState } from "react";
import { useGameUI } from "@/hooks/GameUIProvider";
import useCoarsePointer from "@/hooks/useCoarsePointer";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import { INTRO_LINES } from "@/data/intro";
import TitleScreen from "@/components/intro/TitleScreen";
import IntroDialog from "@/components/intro/IntroDialog";

// First-visit flow inside the console screen: title/loader, then the welcome.
export default function IntroOverlay() {
    const { intro, setIntro, finishIntro } = useGameUI();
    const coarse = useCoarsePointer();
    const reducedMotion = usePrefersReducedMotion();
    const [index, setIndex] = useState(0);

    if (intro === "title") {
        return (
            <TitleScreen
                onStart={() => {
                    setIndex(0);
                    setIntro("dialog");
                }}
            />
        );
    }
    if (intro === "dialog") {
        return (
            <IntroDialog
                index={index}
                coarse={coarse}
                reducedMotion={reducedMotion}
                onAdvance={() => (index + 1 < INTRO_LINES.length ? setIndex(index + 1) : finishIntro())}
                onSkip={finishIntro}
            />
        );
    }
    return null;
}
