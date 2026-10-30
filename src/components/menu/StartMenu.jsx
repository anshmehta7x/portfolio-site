"use client";

import { useState } from "react";
import { useGameInput } from "@/hooks/useGameInput";
import { INPUT_PRIORITY } from "@/lib/input";
import { MENU_ENTRIES } from "@/data/menu";
import TextBox from "@/components/ui/TextBox";
import { useGameUI } from "@/hooks/GameUIProvider";

function MenuLabel({ label, accent }) {
    if (accent === undefined) {
        return label;
    }
    return (
        <>
            {label.slice(0, accent)}
            <span className="fr-acute">{label[accent]}</span>
            {label.slice(accent + 1)}
        </>
    );
}

// FireRed START menu. `focused` means it owns the D-pad (cursor shown).
// variant "panel": always-visible desktop column beside the room; it stays
// visible but unfocused so the room keeps the arrows.
// variant "overlay": mobile, shown only while open, over the room.
export default function StartMenu({ variant = "overlay" }) {
    const { menuOpen: focused, openMenu, closeMenu, openScreen } = useGameUI();
    const [cursor, setCursor] = useState(0);
    const isPanel = variant === "panel";

    const onSelect = (entry) => {
        if (entry.href) {
            window.location.assign(entry.href);
        } else if (entry.screen) {
            openMenu();
            openScreen(entry.screen);
        } else {
            closeMenu();
        }
    };

    useGameInput(
        (event) => {
            if (event.type !== "press") {
                return true;
            }
            const { button } = event;
            if (button === "up" || button === "down") {
                const step = button === "up" ? -1 : 1;
                setCursor((current) => (current + step + MENU_ENTRIES.length) % MENU_ENTRIES.length);
            } else if (button === "a") {
                onSelect(MENU_ENTRIES[cursor]);
            } else if (button === "b" || button === "start") {
                closeMenu();
            }
            return true;
        },
        { priority: INPUT_PRIORITY.MENU, enabled: focused },
    );

    if (!focused && !isPanel) {
        return null;
    }

    const description = (
        <TextBox lines={[MENU_ENTRIES[cursor].description]} showMoreArrow={false} />
    );

    return (
        <>
            <nav
                aria-label="Start menu"
                className={`fr-box z-30 rounded-lg py-2 ${
                    isPanel ? "w-full" : "absolute right-2 top-2 w-44 max-h-[calc(100%-1rem)] overflow-y-auto"
                }`}
            >
                {isPanel && (
                    <p className="px-3 pb-1 text-sm opacity-70 [@media(max-height:780px)]:hidden">
                        {focused ? "B to close" : "START or M"}
                    </p>
                )}
                <ul>
                    {MENU_ENTRIES.map((entry, index) => (
                        <li key={entry.id}>
                            <button
                                type="button"
                                onMouseEnter={() => setCursor(index)}
                                onFocus={() => setCursor(index)}
                                onClick={() => onSelect(entry)}
                                className="relative flex min-h-[44px] w-full items-center pl-7 pr-2 text-left text-lg sm:text-2xl focus:outline-none focus-visible:bg-[#e8e8e0]"
                            >
                                {(focused || isPanel) && cursor === index && (
                                    <span aria-hidden="true" className="absolute left-2 top-1/2 -translate-y-1/2">
                                        <svg viewBox="0 0 6 10" className="h-3 w-2 fill-current">
                                            <polygon points="0,0 6,5 0,10" />
                                        </svg>
                                    </span>
                                )}
                                <MenuLabel label={entry.label} accent={entry.accent} />
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
            {/* Phones have no room for the description under six 44px rows. */}
            {isPanel && <div className="mt-3 [@media(max-height:780px)]:hidden">{description}</div>}
        </>
    );
}
