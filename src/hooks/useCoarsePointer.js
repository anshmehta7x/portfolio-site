"use client";

import { useEffect, useState } from "react";

// True on touch-first devices; used to say "Tap A" instead of "Press A".
export default function useCoarsePointer() {
    const [coarse, setCoarse] = useState(false);
    useEffect(() => {
        const media = window.matchMedia("(pointer: coarse)");
        const update = () => setCoarse(media.matches);
        update();
        media.addEventListener("change", update);
        return () => media.removeEventListener("change", update);
    }, []);
    return coarse;
}
