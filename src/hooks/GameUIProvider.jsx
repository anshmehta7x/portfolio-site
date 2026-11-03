"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

const GameUIContext = createContext(null);

// Which screen is open and whether the START menu has focus. Screens opened
// from the menu return to it on B, because the menu stays focused underneath.
export default function GameUIProvider({ children }) {
    const [screen, setScreen] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);

    const openScreen = useCallback((name) => setScreen(name), []);
    const closeScreen = useCallback(() => setScreen(null), []);
    const openMenu = useCallback(() => setMenuOpen(true), []);
    const closeMenu = useCallback(() => setMenuOpen(false), []);

    const value = useMemo(
        () => ({ screen, openScreen, closeScreen, menuOpen, openMenu, closeMenu }),
        [screen, openScreen, closeScreen, menuOpen, openMenu, closeMenu],
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
