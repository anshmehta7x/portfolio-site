"use client";

import { lazy, Suspense } from "react";
import { useGameInput } from "@/hooks/useGameInput";
import { INPUT_PRIORITY } from "@/lib/input";
import { useGameUI } from "@/hooks/GameUIProvider";

// Created once at module scope so a screen keeps its state across re-renders.
const SCREENS = {
    achievements: lazy(() => import("@/components/modals/AchievementsModal")),
    resume: lazy(() => import("@/components/modals/ResumeModal")),
    skills: lazy(() => import("@/components/modals/SkillsModal")),
    projects: lazy(() => import("@/components/modals/ProjectsModal")),
    contact: lazy(() => import("@/components/modals/ContactModal")),
    help: lazy(() => import("@/components/modals/HelpModal")),
    // Contact + resume until the full Trainer Card screen lands.
    trainer: lazy(() => import("@/components/modals/ContactModal")),
};

// Map of room objects to the screen they open.
export const INTERACTION_SCREENS = {
    computer: "resume",
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
            <Screen visibility onClose={onClose} isConstrained={isConstrained} />
        </Suspense>
    );
}
