"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "pf.controlsLegendDismissed";

function readDismissed() {
    try {
        return localStorage.getItem(STORAGE_KEY) === "1";
    } catch {
        return false;
    }
}

// Small first-session reminder of the controls. Dismissing it is remembered.
export default function ControlsLegend({ coarse, hidden = false }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(!readDismissed());
    }, []);

    if (!visible || hidden) {
        return null;
    }

    const dismiss = () => {
        setVisible(false);
        try {
            localStorage.setItem(STORAGE_KEY, "1");
        } catch {
            // Storage blocked: the legend just shows again next visit.
        }
    };

    const move = coarse ? "✚/tap" : "←↑↓→/click";

    return (
        <div className="fr-box absolute inset-x-2 bottom-2 z-20 flex items-center gap-2 rounded-md py-1 pl-3 pr-1 text-sm sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 sm:bottom-4 sm:whitespace-nowrap sm:text-xl">
            <p className="flex-1">
                {move} Move · A Check · B Back · START Contact
            </p>
            <button
                type="button"
                onClick={dismiss}
                aria-label="Hide controls"
                className="flex h-11 w-11 shrink-0 items-center justify-center text-xl"
            >
                ✕
            </button>
        </div>
    );
}
