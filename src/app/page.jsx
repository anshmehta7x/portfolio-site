"use client";

import GameCanvas from "@/components/GameCanvas";
import React, { useState, useEffect } from "react";
import isMobile from "is-mobile";
import dynamic from "next/dynamic";

const modals = {
  AchievementsModal: () => import("@/components/AchievementsModal"),
  ResumeModal: () => import("@/components/ResumeModal"),
  SkillsModal: () => import("@/components/SkillsModal"),
};

const GameBoy = dynamic(() => import("@/components/GameBoy"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

export default function Home() {
  const [activeModal, setActiveModal] = useState(null);
  const [isClientMobile, setIsClientMobile] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setIsClientMobile(isMobile());
    setHasMounted(true);
  }, []);

  const closeModal = () => setActiveModal(null);

  const renderModal = () => {
    if (!activeModal) return null;
    const ModalComponent = modals[activeModal];
    const LazyModal = React.lazy(ModalComponent);

    return (
      <React.Suspense fallback={<div>Loading...</div>}>
        <LazyModal visibility={!!activeModal} onClose={closeModal} />
      </React.Suspense>
    );
  };

  if (!hasMounted) return null; // Avoid mismatch during hydration

  return (
    <main className="w-screen h-screen flex flex-col bg-black overflow-hidden">
      {isClientMobile ? (
        <>
          <GameBoy
            setAchievementsVisibility={(b) =>
              b ? setActiveModal("AchievementsModal") : setActiveModal(null)
            }
            setResumeVisibility={(b) =>
              b ? setActiveModal("ResumeModal") : setActiveModal(null)
            }
            setSkillsVisibility={(b) =>
              b ? setActiveModal("SkillsModal") : setActiveModal(null)
            }
          />
          {renderModal()}
        </>
      ) : (
        <>
          <GameCanvas
            setAchievementsVisibility={(b) =>
              b ? setActiveModal("AchievementsModal") : setActiveModal(null)
            }
            setResumeVisibility={(b) =>
              b ? setActiveModal("ResumeModal") : setActiveModal(null)
            }
            setSkillsVisibility={(b) =>
              b ? setActiveModal("SkillsModal") : setActiveModal(null)
            }
          />
          {renderModal()}
        </>
      )}
    </main>
  );
}
