"use client";

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

  useEffect(() => {
    setIsClientMobile(isMobile());
    setHasMounted(true);
  }, []);

  const closeModal = () => setActiveModal(null);

  useEffect(() => {
    if (gbaPress === "b" && activeModal) {
      closeModal();
      setGbaPress(""); // Reset the button press
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
    <main className="w-screen h-screen flex items-center justify-center bg-black overflow-hidden p-2 sm:p-4">
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
            setGbaPress={setGbaPress}
            gbaPress={gbaPress}
          />
          {renderFullScreenModal()}
        </>
      ) : (
        <>
          <Handheld
            setAchievementsVisibility={(b) =>
              b ? setActiveModal("AchievementsModal") : setActiveModal(null)
            }
            setResumeVisibility={(b) =>
              b ? setActiveModal("ResumeModal") : setActiveModal(null)
            }
            setSkillsVisibility={(b) =>
              b ? setActiveModal("SkillsModal") : setActiveModal(null)
            }
            setGbaPress={setGbaPress}
            gbaPress={gbaPress}
            activeModal={activeModal}
            closeModal={closeModal}
          />
        </>
      )}
    </main>
  );
}
