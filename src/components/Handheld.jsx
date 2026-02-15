"use client";

import React, { useState, Suspense, lazy } from "react";
import LeftControls from "@/components/HandheldParts/LeftControls";
import ScreenArea from "@/components/HandheldParts/ScreenArea";
import RightControls from "@/components/HandheldParts/RightControls";
import { MODAL_COMPONENTS } from "@/lib/modalRegistry";

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
        
        const ModalLoader = MODAL_COMPONENTS[activeModal];
        if (!ModalLoader) return null;

        const ModalComponent = lazy(ModalLoader);

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
