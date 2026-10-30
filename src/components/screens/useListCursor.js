"use client";

import { useState } from "react";
import { useGameInput } from "@/hooks/useGameInput";
import { INPUT_PRIORITY } from "@/lib/input";

// D-pad cursor over a list for content screens. `onButton` gets any other
// press first and returns true if it handled it. Unhandled B falls through to
// ScreenHost, which closes the screen.
export default function useListCursor(length, { columns = 1, onButton } = {}) {
    const [cursor, setCursor] = useState(0);

    const steps = { up: -columns, down: columns, left: -1, right: 1 };

    useGameInput(
        (event) => {
            if (event.type !== "press") {
                return false;
            }
            if (onButton?.(event.button, cursor)) {
                return true;
            }
            const step = steps[event.button];
            if (step === undefined) {
                return false;
            }
            if (columns === 1 && (event.button === "left" || event.button === "right")) {
                setCursor((c) => (c + step + length) % length);
                return true;
            }
            setCursor((c) => Math.min(Math.max(c + step, 0), length - 1));
            return true;
        },
        { priority: INPUT_PRIORITY.SCREEN_CONTENT, blocking: false },
    );

    return [cursor, setCursor];
}
