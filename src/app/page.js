"use client";

import GameCanvas from "@/components/GameCanvas";
import React, { useState } from "react";

const modals = {
  AchievementsModal: () => import("@/components/AchievementsModal"),
  ResumeModal: () => import("@/components/ResumeModal"),
  SkillsModal: () => import("@/components/SkillsModal"),
};

export default function Home() {
  const [activeModal, setActiveModal] = useState(null);

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

  return (
    <main className="w-screen h-screen flex flex-col bg-black">
      <div>
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
      </div>
    </main>
  );
}
