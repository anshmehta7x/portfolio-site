"use client";

import GameCanvas from "@/components/GameCanvas";
// import GameBoy from "@/components/GameBoy";
import React, { useState } from "react";
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
    <>
      {isMobile() ? (
        <main className="w-screen h-screen flex flex-col bg-black overflow-hidden">
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
        </main>
      ) : (
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
      )}
    </>
  );
}
