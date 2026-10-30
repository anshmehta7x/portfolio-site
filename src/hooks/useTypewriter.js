"use client";

import { useEffect, useState } from "react";

const CHAR_MS = 28;

// Reveals `text` one character at a time. Returns [shown, done, complete()].
export default function useTypewriter(text, instant) {
    const [count, setCount] = useState(instant ? text.length : 0);

    useEffect(() => {
        setCount(instant ? text.length : 0);
    }, [text, instant]);

    useEffect(() => {
        if (count >= text.length) {
            return undefined;
        }
        const timer = setTimeout(() => setCount((c) => c + 1), CHAR_MS);
        return () => clearTimeout(timer);
    }, [count, text]);

    return [text.slice(0, count), count >= text.length, () => setCount(text.length)];
}
