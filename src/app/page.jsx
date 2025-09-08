"use client";

import React, { useState, useEffect } from "react";
import isMobile from "is-mobile";
import dynamic from "next/dynamic";
import Head from "next/head";
import WelcomePopup from "@/components/WelcomePopup";

const modals = {
    AchievementsModal: () => import("@/components/modals/AchievementsModal"),
    ResumeModal: () => import("@/components/modals/ResumeModal"),
    SkillsModal: () => import("@/components/modals/SkillsModal"),
    ProjectsModal: () => import("@/components/modals/ProjectsModal"),
    ContactModal: () => import("@/components/modals/ContactModal"),
    HelpModal: () => import("@/components/modals/HelpModal"),
};

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

    useEffect(() => {
        if (gbaPress === "b" && activeModal) {
            closeModal();
            setGbaPress("");
        }

        // Updated to open HelpModal instead of WelcomePopup
        if (gbaPress === "help") {
            setActiveModal("HelpModal");
            setGbaPress("");
        }
    }, [gbaPress, activeModal]);

    const renderFullScreenModal = () => {
        if (!activeModal) return null;
        const ModalComponent = modals[activeModal];
        const LazyModal = React.lazy(ModalComponent);

        return (
            <React.Suspense fallback={<div>Loading...</div>}>
                <LazyModal visibility={!!activeModal} onClose={closeModal} />
            </React.Suspense>
        );
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
                        <GameBoy
                            setAchievementsVisibility={(b) =>
                                b
                                    ? setActiveModal("AchievementsModal")
                                    : setActiveModal(null)
                            }
                            setResumeVisibility={(b) =>
                                b
                                    ? setActiveModal("ResumeModal")
                                    : setActiveModal(null)
                            }
                            setSkillsVisibility={(b) =>
                                b
                                    ? setActiveModal("SkillsModal")
                                    : setActiveModal(null)
                            }
                            setProjectsVisibility={(b) =>
                                b
                                    ? setActiveModal("ProjectsModal")
                                    : setActiveModal(null)
                            }
                            setContactVisibility={(b) =>
                                b
                                    ? setActiveModal("ContactModal")
                                    : setActiveModal(null)
                            }
                            setGbaPress={setGbaPress}
                            gbaPress={gbaPress}
                        />
                        {renderFullScreenModal()}
                    </>
                ) : (
                    <>
                        <Handheld
                            setAchievementsVisibility={(b) =>
                                b
                                    ? setActiveModal("AchievementsModal")
                                    : setActiveModal(null)
                            }
                            setResumeVisibility={(b) =>
                                b
                                    ? setActiveModal("ResumeModal")
                                    : setActiveModal(null)
                            }
                            setSkillsVisibility={(b) =>
                                b
                                    ? setActiveModal("SkillsModal")
                                    : setActiveModal(null)
                            }
                            setProjectsVisibility={(b) =>
                                b
                                    ? setActiveModal("ProjectsModal")
                                    : setActiveModal(null)
                            }
                            setContactVisibility={(b) =>
                                b
                                    ? setActiveModal("ContactModal")
                                    : setActiveModal(null)
                            }
                            setGbaPress={setGbaPress}
                            gbaPress={gbaPress}
                            activeModal={activeModal}
                            closeModal={closeModal}
                        />
                    </>
                )}
            </main>
        </>
    );
}
