import { collisions, interactions, limits } from "@/lib/constants";

// Grid helpers. Tiles sit on half-unit centres (e.g. 2.5, -1.5), matching the room model.

export const DIRECTION_DELTAS = {
    up: [0, -1],
    down: [0, 1],
    left: [-1, 0],
    right: [1, 0],
};

const FACING_ROTATION = {
    down: 0,
    up: Math.PI,
    left: -Math.PI / 2,
    right: Math.PI / 2,
};

export function getFacingRotation(direction) {
    return FACING_ROTATION[direction] ?? 0;
}

export function getShortestRotation(currentRot, targetRot) {
    let diff = targetRot - currentRot;
    while (diff > Math.PI) diff -= 2 * Math.PI;
    while (diff < -Math.PI) diff += 2 * Math.PI;
    return currentRot + diff;
}

export function stepFrom(tile, direction) {
    const [dx, dy] = DIRECTION_DELTAS[direction];
    return { x: tile.x + dx, y: tile.y + dy };
}

export function isInBounds({ x, y }) {
    return x >= limits.x[0] && x <= limits.x[1] && y >= limits.y[0] && y <= limits.y[1];
}

export function isWalkable(tile) {
    return isInBounds(tile) && !collisions.some(([cx, cy]) => cx === tile.x && cy === tile.y);
}

export function getInteractionAt({ x, y }) {
    const interaction = interactions.find(({ positions }) =>
        positions.some(([px, py]) => px === x && py === y),
    );
    return interaction ? interaction.type : null;
}

const tileKey = ({ x, y }) => `${x},${y}`;

// Snap a floor point (world x/z) to the centre of the tile it falls in.
export function snapToTile(worldX, worldZ) {
    return { x: Math.floor(worldX) + 0.5, y: Math.floor(worldZ) + 0.5 };
}

// Breadth-first search over walkable tiles. Returns the shortest list of
// tiles to step through (excluding `start`) to reach any of `goals`, or
// null if none is reachable. An empty list means Red is already there.
export function findPath(start, goals) {
    const goalKeys = new Set(goals.filter(isWalkable).map(tileKey));
    if (goalKeys.size === 0) {
        return null;
    }
    const cameFrom = new Map([[tileKey(start), null]]);
    const queue = [start];
    while (queue.length > 0) {
        const current = queue.shift();
        if (goalKeys.has(tileKey(current))) {
            const path = [];
            let node = current;
            while (tileKey(node) !== tileKey(start)) {
                path.unshift(node);
                node = cameFrom.get(tileKey(node));
            }
            return path;
        }
        Object.keys(DIRECTION_DELTAS).forEach((direction) => {
            const next = stepFrom(current, direction);
            if (isWalkable(next) && !cameFrom.has(tileKey(next))) {
                cameFrom.set(tileKey(next), current);
                queue.push(next);
            }
        });
    }
    return null;
}

export function getDirectionBetween(from, to) {
    const entry = Object.entries(DIRECTION_DELTAS).find(
        ([, [dx, dy]]) => from.x + dx === to.x && from.y + dy === to.y,
    );
    return entry ? entry[0] : null;
}

export function getInteraction(type) {
    return interactions.find((interaction) => interaction.type === type) || null;
}
