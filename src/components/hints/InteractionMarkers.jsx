import { Html } from "@react-three/drei";
import { interactions } from "@/lib/constants";

// Bouncing pixel "!" above each object that opens something. Clicking a
// marker is the same as clicking its object.
export default function InteractionMarkers({ activeType, onSelect }) {
    return interactions.map(({ type, marker }) => (
        <Html key={type} position={marker} center zIndexRange={[20, 0]}>
            <button
                type="button"
                aria-label={`Check the ${type}`}
                onClick={() => onSelect(type)}
                className={`fr-bounce flex h-12 w-12 items-center justify-center ${
                    activeType === type ? "opacity-0" : ""
                }`}
            >
                <span className="fr-box flex h-10 w-9 items-center justify-center rounded-lg text-3xl leading-none text-[var(--fr-accent)] [text-shadow:none]">
                    !
                </span>
            </button>
        </Html>
    ));
}
