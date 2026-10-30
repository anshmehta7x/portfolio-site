import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Point the camera frames by default: floor centre nudged toward the back wall
// so the PC, bookshelf and certificate stay in view.
const ROOM_CENTER = new THREE.Vector3(0.1, 0, -0.4);
// Fixed 3/4 top-down view, looking north into the room like FireRed.
const VIEW_DIRECTION = new THREE.Vector3(0, 1, 0.7).normalize();
const SMOOTHING = 4;
const FRONT_LIMIT_Z = 0.4;

const TAN_HALF_FOV = Math.tan((40 / 2) * (Math.PI / 180));
// Half the width of the room (plus a little margin) in world units.
const ROOM_HALF_WIDTH = 6;

// Large screens frame the whole room (distance from the canvas aspect);
// small/portrait screens zoom in and follow Red because the room can't fit.
function getFraming(width, height) {
    const aspect = width / height;
    if (width >= 560 && aspect >= 0.9) {
        const fitDistance = ROOM_HALF_WIDTH / (TAN_HALF_FOV * aspect);
        return { distance: Math.min(Math.max(fitDistance, 10), 14.5), follow: 0.15 };
    }
    if (aspect >= 0.9) {
        return { distance: 11, follow: 0.45 };
    }
    return { distance: 9, follow: 0.8 };
}

// Fixed-angle camera that eases toward Red. No shake, no rotation.
// With reduced motion it snaps instead of easing.
function RoomCamera({ playerPosition, reducedMotion }) {
    const { camera, size } = useThree();
    const targetRef = useRef(null);
    const scratch = useRef({ desired: new THREE.Vector3(), player: new THREE.Vector3() });

    useFrame((_, delta) => {
        const { distance, follow } = getFraming(size.width, size.height);
        const [px, , pz] = playerPosition.get();
        const { desired, player } = scratch.current;
        player.set(px, 0, pz);
        desired.copy(ROOM_CENTER).lerp(player, follow);
        // Don't drift past the room's front edge (only black void beyond it).
        desired.z = Math.min(desired.z, FRONT_LIMIT_Z);

        if (!targetRef.current) {
            targetRef.current = desired.clone();
        }
        const target = targetRef.current;
        if (reducedMotion) {
            target.copy(desired);
        } else {
            target.lerp(desired, 1 - Math.exp(-SMOOTHING * delta));
        }

        camera.position.copy(target).addScaledVector(VIEW_DIRECTION, distance);
        camera.lookAt(target);
    });

    return null;
}

export { RoomCamera };
