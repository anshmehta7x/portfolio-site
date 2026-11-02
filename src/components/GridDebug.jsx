import { collisions, interactions, limits } from "@/lib/constants";

// Dev aid: visit /?debug=grid to see walkable tiles (green), collisions (red)
// and interaction tiles (yellow) drawn over the room.
export default function GridDebug() {
    const tiles = [];
    for (let x = limits.x[0]; x <= limits.x[1]; x += 1) {
        for (let y = limits.y[0]; y <= limits.y[1]; y += 1) {
            const blocked = collisions.some(([cx, cy]) => cx === x && cy === y);
            const interactive = interactions.some(({ positions }) =>
                positions.some(([px, py]) => px === x && py === y),
            );
            const color = blocked ? "#ff2a2a" : interactive ? "#ffd400" : "#22c55e";
            tiles.push(
                <mesh key={`${x},${y}`} position={[x, 0.05, y]} rotation={[-Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[0.9, 0.9]} />
                    <meshBasicMaterial color={color} transparent opacity={0.45} />
                </mesh>,
            );
        }
    }
    return <group>{tiles}</group>;
}
