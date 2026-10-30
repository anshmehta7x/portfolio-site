"use client";

import { createContext, useCallback, useEffect, useMemo, useRef } from "react";
import { getButtonForKey } from "@/lib/input";

export const GameInputContext = createContext(null);

// Single source of truth for input. Keyboard and on-screen buttons both call
// press/release; registered layers receive { type: "press" | "release", button }.
export default function GameInputProvider({ children }) {
    const layersRef = useRef([]);
    const heldRef = useRef(new Set());
    const heldListenersRef = useRef(new Set());
    const orderRef = useRef(0);

    const notifyHeld = useCallback(() => {
        heldListenersRef.current.forEach((listener) => listener(heldRef.current));
    }, []);

    const dispatch = useCallback((event) => {
        const layers = [...layersRef.current]
            .filter((layer) => layer.enabledRef.current)
            .sort((x, y) => y.priority - x.priority || y.order - x.order);
        for (const layer of layers) {
            const handled = layer.handlerRef.current?.(event) === true;
            if (handled || layer.blocking) {
                return;
            }
        }
    }, []);

    const press = useCallback(
        (button) => {
            if (heldRef.current.has(button)) {
                return;
            }
            heldRef.current = new Set([...heldRef.current, button]);
            notifyHeld();
            dispatch({ type: "press", button });
        },
        [dispatch, notifyHeld],
    );

    const release = useCallback(
        (button) => {
            if (!heldRef.current.has(button)) {
                return;
            }
            heldRef.current = new Set([...heldRef.current].filter((b) => b !== button));
            notifyHeld();
            dispatch({ type: "release", button });
        },
        [dispatch, notifyHeld],
    );

    const releaseAll = useCallback(() => {
        [...heldRef.current].forEach(release);
    }, [release]);

    const isHeld = useCallback((button) => heldRef.current.has(button), []);

    const register = useCallback((layer) => {
        const entry = { ...layer, order: orderRef.current++ };
        layersRef.current = [...layersRef.current, entry];
        return () => {
            layersRef.current = layersRef.current.filter((l) => l !== entry);
        };
    }, []);

    const subscribeHeld = useCallback((listener) => {
        heldListenersRef.current.add(listener);
        return () => heldListenersRef.current.delete(listener);
    }, []);

    useEffect(() => {
        const onKeyDown = (event) => {
            const button = getButtonForKey(event);
            if (!button) {
                return;
            }
            event.preventDefault();
            if (!event.repeat) {
                press(button);
            }
        };
        const onKeyUp = (event) => {
            const button = getButtonForKey(event);
            if (button) {
                release(button);
            }
        };
        window.addEventListener("keydown", onKeyDown);
        window.addEventListener("keyup", onKeyUp);
        window.addEventListener("blur", releaseAll);
        return () => {
            window.removeEventListener("keydown", onKeyDown);
            window.removeEventListener("keyup", onKeyUp);
            window.removeEventListener("blur", releaseAll);
        };
    }, [press, release, releaseAll]);

    const value = useMemo(
        () => ({ press, release, isHeld, register, subscribeHeld }),
        [press, release, isHeld, register, subscribeHeld],
    );

    return <GameInputContext.Provider value={value}>{children}</GameInputContext.Provider>;
}
