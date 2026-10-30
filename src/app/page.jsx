"use client";

import { useEffect, useState } from "react";
import isMobile from "is-mobile";
import dynamic from "next/dynamic";
import WelcomePopup from "@/components/WelcomePopup";
import GameInputProvider from "@/hooks/GameInputProvider";
import GameUIProvider from "@/hooks/GameUIProvider";

const GameBoy = dynamic(() => import("@/components/GameBoy"), {
    ssr: false,
    loading: () => <div className="text-white">Loading Console...</div>,
});

const Handheld = dynamic(() => import("@/components/Handheld"), {
    ssr: false,
    loading: () => <div className="text-white">Loading Console...</div>,
});

export default function Home() {
    const [isClientMobile, setIsClientMobile] = useState(false);
    const [hasMounted, setHasMounted] = useState(false);
    const [isWelcomePopupOpen, setIsWelcomePopupOpen] = useState(false);

    useEffect(() => {
        setIsClientMobile(isMobile());
        setHasMounted(true);

        const lastVisited = localStorage.getItem("lastVisited");
        const currentTime = new Date().getTime();
        const oneDay = 24 * 60 * 60 * 1000;

        if (!lastVisited || currentTime - Number(lastVisited) > oneDay) {
            setIsWelcomePopupOpen(true);
            localStorage.setItem("lastVisited", String(currentTime));
        }
    }, []);

    if (!hasMounted) {
        return (
                <main className="w-screen h-screen flex items-center justify-center bg-black overflow-hidden">
                <div className="text-white">Loading...</div>
            </main>
        );
    }

    const Console = isClientMobile ? GameBoy : Handheld;

    return (
        <GameInputProvider>
            <GameUIProvider>
                <main className="w-screen h-[100dvh] flex items-center justify-center bg-neutral-950 overflow-hidden p-2 sm:p-4">
                    <WelcomePopup
                        isOpen={isWelcomePopupOpen}
                        onClose={() => setIsWelcomePopupOpen(false)}
                    />
                    <Console />
                </main>
            </GameUIProvider>
        </GameInputProvider>
    );
}
