"use client";

import { useGameUI } from "@/hooks/GameUIProvider";

// Always-visible way into the menu on phones, for people who won't find START.
export default function MenuChip() {
    const { menuOpen, openMenu } = useGameUI();
    if (menuOpen) {
        return null;
    }
    return (
        <button
            type="button"
            onClick={openMenu}
            className="fr-box absolute right-2 top-2 z-30 flex min-h-[44px] items-center rounded-md px-3 text-lg"
        >
            MENU
        </button>
    );
}
