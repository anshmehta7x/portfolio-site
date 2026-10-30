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
