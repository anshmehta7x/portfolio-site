"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "pf.controlsLegendDismissed";

// Desktop names the real keys: the letter A is WASD-left, so "press A" would mislead.
const KEYBOARD_LEGEND = [
    { key: "ARROWS", action: "Move" },
    { key: "CLICK", action: "Walk" },
    { key: "ENTER", action: "Check" },
    { key: "ESC", action: "Back" },
    { key: "M", action: "Contact" },
];

const TOUCH_LEGEND = [
    { key: "D-PAD", action: "Move" },
    { key: "TAP", action: "Walk" },
    { key: "A", action: "Check" },
    { key: "B", action: "Back" },
    { key: "START", action: "Contact" },
];

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

    const items = coarse ? TOUCH_LEGEND : KEYBOARD_LEGEND;

    return (
        <div className="fr-box absolute inset-x-2 bottom-2 z-20 flex items-center gap-2 rounded-md py-1 pl-3 pr-1 text-sm sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 sm:bottom-4 sm:text-xl">
            <ul className="flex flex-1 flex-wrap gap-x-4 gap-y-1">
                {items.map(({ key, action }) => (
                    <li key={key} className="whitespace-nowrap">
                        <kbd className="fr-key">{key}</kbd>
                        {action}
                    </li>
                ))}
            </ul>
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
