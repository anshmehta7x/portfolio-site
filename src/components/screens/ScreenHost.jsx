"use client";

import { lazy, Suspense } from "react";
import { useGameInput } from "@/hooks/useGameInput";
import { INPUT_PRIORITY } from "@/lib/input";
import { useGameUI } from "@/hooks/GameUIProvider";

// Created once at module scope so a screen keeps its state across re-renders.
const SCREENS = {
    achievements: lazy(() => import("@/components/screens/BadgeCaseScreen")),
    skills: lazy(() => import("@/components/screens/MovesScreen")),
    projects: lazy(() => import("@/components/screens/PokedexScreen")),
    trainer: lazy(() => import("@/components/screens/TrainerCardScreen")),
    help: lazy(() => import("@/components/screens/OptionsScreen")),
};

// Map of room objects to the screen they open.
export const INTERACTION_SCREENS = {
    computer: "trainer",
    bookshelf: "skills",
    television: "projects",
    certificate: "achievements",
};

export default function ScreenHost({ isConstrained = false }) {
    const { screen, closeScreen: onClose } = useGameUI();
    // Blocks the room while a screen is open; B closes it.
    useGameInput(
        (event) => {
            if (event.type === "press" && event.button === "b") {
                onClose();
            }
            return true;
        },
        { priority: INPUT_PRIORITY.SCREEN, enabled: !!screen },
    );

    if (!screen) {
        return null;
    }
    const Screen = SCREENS[screen];

    return (
        <Suspense fallback={<div className="text-white font-pixeboy p-4">Loading...</div>}>
            <Screen onClose={onClose} isConstrained={isConstrained} />
        </Suspense>
    );
}
