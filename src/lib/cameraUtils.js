import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Point the camera frames by default: floor centre nudged toward the back wall
// so the PC, bookshelf and certificate stay in view.
const ROOM_CENTER = new THREE.Vector3(0.5, 0, -0.4);
// Fixed 3/4 top-down view, looking north into the room like FireRed.
const VIEW_DIRECTION = new THREE.Vector3(0, 1, 0.7).normalize();
const SMOOTHING = 4;

// Distance needed to frame the room; narrow (portrait) screens zoom in and
// follow Red more closely because the whole room can't fit.
function getFraming(aspect) {
    if (aspect >= 1.2) {
        return { distance: 12, follow: 0.15 };
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
        const { distance, follow } = getFraming(size.width / size.height);
        const [px, , pz] = playerPosition.get();
        const { desired, player } = scratch.current;
        player.set(px, 0, pz);
        desired.copy(ROOM_CENTER).lerp(player, follow);

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
