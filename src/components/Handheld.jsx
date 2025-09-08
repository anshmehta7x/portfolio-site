"use client";

import React, { useState, Suspense } from "react";
import LeftControls from "@/components/HandheldParts/LeftControls";
import ScreenArea from "@/components/HandheldParts/ScreenArea";
import RightControls from "@/components/HandheldParts/RightControls";

const AchievementsModal = React.lazy(
    () => import("@/components/modals/AchievementsModal"),
);
const ResumeModal = React.lazy(() => import("@/components/modals/ResumeModal"));
const ProjectsModal = React.lazy(() => import("@/components/modals/ProjectsModal"));
const ContactModal = React.lazy(() => import("@/components/modals/ContactModal"));

const SkillsModal = React.lazy(() => import("@/components/modals/SkillsModal"));
const HelpModal = React.lazy(() => import("@/components/modals/HelpModal"));

const modals = {
    AchievementsModal,
    ResumeModal,
    SkillsModal,
    ContactModal,
    ProjectsModal,
    HelpModal,
};

export default function HandheldConsole({
    setAchievementsVisibility,
    setResumeVisibility,
    setSkillsVisibility,
    setGbaPress,
    gbaPress,
    activeModal,
    closeModal,
    setProjectsVisibility,
    setContactVisibility,
}) {
    const [pressedButton, setPressedButton] = useState(null);
    const [lastTouchTime, setLastTouchTime] = useState(0);

    function buttonHandler(pressed) {
        setGbaPress(pressed);
    }

    function handleMouseDown(button, event) {
        event.preventDefault();
        const now = Date.now();
        if (event.type === "mousedown" && now - lastTouchTime < 500) return;
        if (
            event.type === "mousedown" &&
            event.sourceCapabilities?.firesTouchEvents
        )
            return;
        setPressedButton(button);
        buttonHandler(button);
    }

    function handleMouseUp(event) {
        const now = Date.now();
        if (event && event.type === "mouseup" && now - lastTouchTime < 500)
            return;
        if (
            event &&
            event.type === "mouseup" &&
            event.sourceCapabilities?.firesTouchEvents
        )
            return;
        setPressedButton(null);
    }

    function handleTouchStart(button, event) {
        event.preventDefault();
        setLastTouchTime(Date.now());
        setPressedButton(button);
        buttonHandler(button);
    }

    function handleTouchEnd(event) {
        event.preventDefault();
        setPressedButton(null);
    }

    const renderConstrainedModal = () => {
        if (!activeModal) return null;
        const ModalComponent = modals[activeModal];

        return (
            <Suspense
                fallback={<div className="text-white">Loading Modal...</div>}
            >
                <ModalComponent
                    visibility={!!activeModal}
                    onClose={closeModal}
                    isConstrained={true}
                />
            </Suspense>
        );
    };

    return (
        <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
            <div className="w-full h-full bg-gradient-to-r from-violet-700 to-indigo-900 rounded-3xl flex items-center justify-between p-6 shadow-2xl border-4 border-slate-900 relative">
                <LeftControls
                    pressedButton={pressedButton}
                    handleMouseDown={handleMouseDown}
                    handleMouseUp={handleMouseUp}
                    handleTouchStart={handleTouchStart}
                    handleTouchEnd={handleTouchEnd}
                />
                <ScreenArea
                    setAchievementsVisibility={setAchievementsVisibility}
                    setResumeVisibility={setResumeVisibility}
                    setSkillsVisibility={setSkillsVisibility}
                    setProjectsVisibility={setProjectsVisibility}
                    setContactVisibility={setContactVisibility}
                    gbaPress={gbaPress}
                    setGbaPress={setGbaPress}
                    renderConstrainedModal={renderConstrainedModal}
                />
                <RightControls
                    pressedButton={pressedButton}
                    handleMouseDown={handleMouseDown}
                    handleMouseUp={handleMouseUp}
                    handleTouchStart={handleTouchStart}
                    handleTouchEnd={handleTouchEnd}
                />
            </div>
        </div>
    );
}
