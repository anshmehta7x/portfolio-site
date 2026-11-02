"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { isWalkable, stepFrom } from "@/lib/grid";
import { playerSpawn } from "@/lib/constants";

export const STEP_MS = 240;
// A tap shorter than this only turns Red (FireRed behaviour); holding walks.
export const TURN_MS = 110;

// FireRed-style grid movement in absolute screen directions.
// Directions are pushed/released as the player holds keys; the most recent
// held direction wins. Red takes one tile per STEP_MS while a direction is held.
export default function usePlayerMovement({ onBump, onStep }) {
    const [tile, setTile] = useState({ x: playerSpawn[0], y: playerSpawn[1] });
    const [facing, setFacing] = useState("up");
    const [isWalking, setIsWalking] = useState(false);

    const stateRef = useRef({ tile, facing, busy: false, held: [] });
    const timerRef = useRef(null);
    const callbacksRef = useRef({ onBump, onStep });
    callbacksRef.current = { onBump, onStep };

    useEffect(() => () => clearTimeout(timerRef.current), []);

    const wait = (ms, next) => {
        stateRef.current.busy = true;
        timerRef.current = setTimeout(() => {
            stateRef.current.busy = false;
            next();
        }, ms);
    };

    const advance = useCallback(() => {
        const state = stateRef.current;
        if (state.busy) {
            return;
        }
        const direction = state.held[state.held.length - 1];
        if (!direction) {
            setIsWalking(false);
            return;
        }

        if (state.facing !== direction) {
            state.facing = direction;
            setFacing(direction);
            setIsWalking(false);
            wait(TURN_MS, advance);
            return;
        }

        const next = stepFrom(state.tile, direction);
        if (!isWalkable(next)) {
            setIsWalking(false);
            callbacksRef.current.onBump?.();
            wait(STEP_MS * 1.5, advance);
            return;
        }

        state.tile = next;
        setTile(next);
        setIsWalking(true);
        wait(STEP_MS, () => {
            callbacksRef.current.onStep?.(next);
            advance();
        });
    }, []);

    const pressDirection = useCallback(
        (direction) => {
            const state = stateRef.current;
            state.held = [...state.held.filter((d) => d !== direction), direction];
            advance();
        },
        [advance],
    );

    const releaseDirection = useCallback((direction) => {
        const state = stateRef.current;
        state.held = state.held.filter((d) => d !== direction);
    }, []);

    const releaseAll = useCallback(() => {
        stateRef.current.held = [];
    }, []);

    return { tile, facing, isWalking, pressDirection, releaseDirection, releaseAll };
}
