"use client";

import React, { useState, useEffect, lazy, Suspense } from "react";
import isMobile from "is-mobile";
import dynamic from "next/dynamic";
import Head from "next/head";
import WelcomePopup from "@/components/WelcomePopup";
import { MODAL_COMPONENTS, INTERACTION_MODAL_MAP } from "@/lib/modalRegistry";

const GameBoy = dynamic(() => import("@/components/GameBoy"), {
    ssr: false,
    loading: () => <div className="text-white">Loading Console...</div>,
});

const Handheld = dynamic(() => import("@/components/Handheld"), {
    ssr: false,
    loading: () => <div className="text-white">Loading Console...</div>,
});

export default function Home() {
    const [activeModal, setActiveModal] = useState(null);
    const [isClientMobile, setIsClientMobile] = useState(false);
    const [hasMounted, setHasMounted] = useState(false);
    const [gbaPress, setGbaPress] = useState("");
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

    const closeModal = () => setActiveModal(null);

    // Handle B button to close modal
    useEffect(() => {
        if (gbaPress === "b" && activeModal) {
            closeModal();
            setGbaPress("");
        }

        // Handle help button
        if (gbaPress === "help") {
            setActiveModal("HelpModal");
            setGbaPress("");
        }
    }, [gbaPress, activeModal]);

    const renderFullScreenModal = () => {
        if (!activeModal) return null;
        
        const ModalLoader = MODAL_COMPONENTS[activeModal];
        if (!ModalLoader) return null;

        const LazyModal = lazy(ModalLoader);

        return (
            <Suspense fallback={<div>Loading...</div>}>
                <LazyModal visibility={!!activeModal} onClose={closeModal} />
            </Suspense>
        );
    };

    // Map interaction types to modals
    const handleInteraction = (interactionType) => {
        const modalName = INTERACTION_MODAL_MAP[interactionType];
        if (modalName) {
            setActiveModal(modalName);
        }
    };

    // Props for console components
    const consoleProps = {
        setAchievementsVisibility: (b) => setActiveModal(b ? "AchievementsModal" : null),
        setResumeVisibility: (b) => setActiveModal(b ? "ResumeModal" : null),
        setSkillsVisibility: (b) => setActiveModal(b ? "SkillsModal" : null),
        setProjectsVisibility: (b) => setActiveModal(b ? "ProjectsModal" : null),
        setContactVisibility: (b) => setActiveModal(b ? "ContactModal" : null),
        setGbaPress,
        gbaPress,
    };

    if (!hasMounted) {
        return (
            <main className="w-screen h-screen flex items-center justify-center bg-black overflow-hidden">
                <div className="text-white">Loading...</div>
            </main>
        );
    }

    return (
        <>
            <Head>
                <link
                    rel="preload"
                    href="/demo-videos/scriptsync.mp4"
                    as="video"
                    type="video/mp4"
                />
                <link
                    rel="preload"
                    href="/demo-videos/yantrahack.mp4"
                    as="video"
                    type="video/mp4"
                />
            </Head>
            <main className="w-screen h-screen flex items-center justify-center bg-black overflow-hidden p-2 sm:p-4">
                <WelcomePopup
                    isOpen={isWelcomePopupOpen}
                    onClose={() => setIsWelcomePopupOpen(false)}
                />
                {isClientMobile ? (
                    <>
                        <GameBoy {...consoleProps} />
                        {renderFullScreenModal()}
                    </>
                ) : (
                    <>
                        <Handheld
                            {...consoleProps}
                            activeModal={activeModal}
                            closeModal={closeModal}
                        />
                    </>
                )}
            </main>
        </>
    );
}
