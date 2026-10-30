"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { GameInputContext } from "@/hooks/GameInputProvider";

function useInputContext() {
    const context = useContext(GameInputContext);
    if (!context) {
        throw new Error("Input hooks must be used inside <GameInputProvider>");
    }
    return context;
}

// Register an input layer. `handler` receives { type, button } and returns
// true when it consumed the event. Blocking layers stop lower layers either way.
export function useGameInput(handler, { priority = 0, enabled = true, blocking = true } = {}) {
    const { register } = useInputContext();
    const handlerRef = useRef(handler);
    const enabledRef = useRef(enabled);
    handlerRef.current = handler;
    enabledRef.current = enabled;

    useEffect(
        () => register({ priority, blocking, handlerRef, enabledRef }),
        [register, priority, blocking],
    );
}

export function useInputControls() {
    const { press, release, isHeld } = useInputContext();
    return { press, release, isHeld };
}

// Re-renders when `button` is pressed or released (keyboard or touch).
export function useButtonHeld(button) {
    const { subscribeHeld, isHeld } = useInputContext();
    const [held, setHeld] = useState(() => isHeld(button));
    useEffect(() => subscribeHeld((set) => setHeld(set.has(button))), [subscribeHeld, button]);
    return held;
}

const BUTTON_LABELS = {
    up: "Up",
    down: "Down",
    left: "Left",
    right: "Right",
    a: "A button",
    b: "B button",
    start: "Start",
    select: "Select",
};

// Pointer handlers for an on-screen button. Pointer events cover mouse, touch
// and pen, so no touch/mouse de-duplication is needed.
export function usePressable(button) {
    const { press, release } = useInputContext();
    const pressed = useButtonHeld(button);

    const end = (event) => {
        event.preventDefault();
        release(button);
    };

    return {
        pressed,
        pressableProps: {
            role: "button",
            "aria-label": BUTTON_LABELS[button],
            onPointerDown: (event) => {
                event.preventDefault();
                event.currentTarget.setPointerCapture?.(event.pointerId);
                press(button);
            },
            onPointerUp: end,
            onPointerCancel: end,
            onLostPointerCapture: () => release(button),
            onContextMenu: (event) => event.preventDefault(),
            style: { touchAction: "none", userSelect: "none", WebkitUserSelect: "none" },
        },
    };
}
