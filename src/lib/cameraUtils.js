import {useRef} from "react";
import {useFrame, useThree} from "@react-three/fiber";
import * as THREE from "three";

function FollowCamera({ playerPosition, playerRotation, isMoving }) {
    const { camera } = useThree();
    const cameraRef = useRef({
        position: new THREE.Vector3(5, 5, 8),
        target: new THREE.Vector3(5.5, 0, 3.5),
        shake: { x: 0, y: 0, z: 0 },
        bobOffset: 0,
    });

    useFrame((state) => {
        if (!playerPosition) return;

        const time = state.clock.elapsedTime;

        const playerPos = new THREE.Vector3(
            playerPosition[0],
            0,
            playerPosition[2],
        );

        const [_, rotY] = playerRotation;

        const baseDistance = 4.5;
        const baseHeight = 3.8;

        let bobAmount = 0;
        if (isMoving) {
            bobAmount = Math.sin(time * 6) * 0.08;
        }

        const distance = baseDistance + (isMoving ? 0.3 : 0);
        const height = baseHeight + bobAmount;

        const sideOffset = Math.sin(rotY) * 0.5;

        const cameraOffset = new THREE.Vector3(
            -Math.sin(rotY) * distance + sideOffset,
            height,
            -Math.cos(rotY) * distance,
        );

        const targetCameraPos = playerPos.clone().add(cameraOffset);

        const lerpSpeed = isMoving ? 0.04 : 0.02;
        cameraRef.current.position.lerp(targetCameraPos, lerpSpeed);

        camera.position.copy(cameraRef.current.position);

        const lookAtTarget = playerPos.clone();
        if (isMoving) {
            const forwardOffset = new THREE.Vector3(
                Math.sin(rotY) * 1.5,
                0.2,
                Math.cos(rotY) * 1.5,
            );
            lookAtTarget.add(forwardOffset);
        }

        const currentLookAt = cameraRef.current.target;
        currentLookAt.lerp(lookAtTarget, 0.05);
        camera.lookAt(currentLookAt);

        if (isMoving) {
            const shakeIntensity = 0.02;
            camera.position.x += (Math.random() - 0.5) * shakeIntensity;
            camera.position.y += (Math.random() - 0.5) * shakeIntensity * 0.5;
            camera.position.z += (Math.random() - 0.5) * shakeIntensity;
        }
    });

    return null;
}

function getShortestRotation (currentRot, targetRot) {
    let diff = targetRot - currentRot;

    while (diff > Math.PI) diff -= 2 * Math.PI;
    while (diff < -Math.PI) diff += 2 * Math.PI;

    return currentRot + diff;
}


function getRelativeDirection(input, currentFacing){
    const directionMap = {
        2: { front: 2, back: 1, left: 3, right: 4 },
        1: { front: 1, back: 2, left: 4, right: 3 },
        3: { front: 3, back: 4, left: 1, right: 2 },
        4: { front: 4, back: 3, left: 2, right: 1 },
    };

    return directionMap[currentFacing][input];
}

function getOrientationFromDirection(direction){
    switch (direction) {
        case 1: // Down
            return [0, 0, 0];
        case 2: // Up
            return [0, Math.PI, 0];
        case 3: // Left
            return [0, -Math.PI / 2, 0];
        case 4: // Right
            return [0, Math.PI / 2, 0];
        default:
            return [0, 0, 0];
    }
}

export {FollowCamera, getShortestRotation, getRelativeDirection, getOrientationFromDirection};