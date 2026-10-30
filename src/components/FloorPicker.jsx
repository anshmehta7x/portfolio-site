import { useState } from "react";
import { limits } from "@/lib/constants";
import { isWalkable, snapToTile } from "@/lib/grid";

const WIDTH = limits.x[1] - limits.x[0] + 1;
const DEPTH = limits.y[1] - limits.y[0] + 1;
const CENTER_X = (limits.x[0] + limits.x[1]) / 2;
const CENTER_Z = (limits.y[0] + limits.y[1]) / 2;

// Invisible plane over the walkable grid. Clicking/tapping it reports the tile
// under the pointer; hovering (mouse only) outlines that tile.
export default function FloorPicker({ onPick }) {
    const [hoverTile, setHoverTile] = useState(null);

    const tileFromEvent = (event) => snapToTile(event.point.x, event.point.z);

    return (
        <group>
            <mesh
                position={[CENTER_X, 0.02, CENTER_Z]}
                rotation={[-Math.PI / 2, 0, 0]}
                onClick={(event) => {
                    event.stopPropagation();
                    onPick(tileFromEvent(event));
                }}
                onPointerMove={(event) => {
                    if (event.pointerType !== "mouse") {
                        return;
                    }
                    const tile = tileFromEvent(event);
                    setHoverTile(isWalkable(tile) ? tile : null);
                }}
                onPointerOut={() => setHoverTile(null)}
            >
                <planeGeometry args={[WIDTH, DEPTH]} />
                <meshBasicMaterial transparent opacity={0} depthWrite={false} />
            </mesh>
            {hoverTile && (
                <mesh position={[hoverTile.x, 0.03, hoverTile.y]} rotation={[-Math.PI / 2, 0, 0]}>
                    <ringGeometry args={[0.36, 0.46, 4, 1, Math.PI / 4]} />
                    <meshBasicMaterial color="#f8f8f8" transparent opacity={0.85} depthWrite={false} />
                </mesh>
            )}
        </group>
    );
}
