"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const INTRO_SEEN_KEY = "pf.introSeen";

const GameUIContext = createContext(null);

// Which screen is open and whether the START menu has focus. Screens opened
// from the menu return to it on B, because the menu stays focused underneath.
export default function GameUIProvider({ children }) {
    const [screen, setScreen] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    // "title" -> "dialog" -> null. First visit only; replayable from OPTIONS.
    const [intro, setIntro] = useState(null);

    useEffect(() => {
        let seen = false;
        try {
            seen = localStorage.getItem(INTRO_SEEN_KEY) === "1";
        } catch {
            // Storage blocked: show the intro every visit.
        }
        if (!seen) {
            setIntro("title");
        }
    }, []);

    const replayIntro = useCallback(() => {
        setScreen(null);
        setMenuOpen(false);
        setIntro("title");
    }, []);

    const finishIntro = useCallback(() => {
        setIntro(null);
        try {
            localStorage.setItem(INTRO_SEEN_KEY, "1");
        } catch {
            // Ignore: worst case the intro shows again next visit.
        }
    }, []);

    const openScreen = useCallback((name) => setScreen(name), []);
    const closeScreen = useCallback(() => setScreen(null), []);
    const openMenu = useCallback(() => setMenuOpen(true), []);
    const closeMenu = useCallback(() => setMenuOpen(false), []);

    const value = useMemo(
        () => ({
            screen,
            openScreen,
            closeScreen,
            menuOpen,
            openMenu,
            closeMenu,
            intro,
            setIntro,
            replayIntro,
            finishIntro,
        }),
        [screen, openScreen, closeScreen, menuOpen, openMenu, closeMenu, intro, replayIntro, finishIntro],
    );

    return <GameUIContext.Provider value={value}>{children}</GameUIContext.Provider>;
}

export function useGameUI() {
    const context = useContext(GameUIContext);
    if (!context) {
        throw new Error("useGameUI must be used inside <GameUIProvider>");
    }
    return context;
}
