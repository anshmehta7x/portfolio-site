import { OrbitControls } from "@react-three/drei";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { RoomModel } from "@/assets/RoomModel";
import { PlayerModel } from "@/assets/PlayerModel";
import { Suspense, useEffect, useState, useCallback, useRef } from "react";
import { useSpring, animated } from "@react-spring/three";
import * as THREE from "three";
import useSound from "use-sound";

const collisionsound = "/sounds/collisionsound.mp3";

// Cinematic camera component that follows the player
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

    // Calculate camera position based on player's position and orientation
    const playerPos = new THREE.Vector3(
      playerPosition[0],
      0,
      playerPosition[2]
    );

    // Extract player's orientation (rotation)
    const [_, rotY] = playerRotation;

    // Dynamic camera settings based on movement
    const baseDistance = 4.5;
    const baseHeight = 3.8;

    // Add slight camera bob when moving (like breathing or walking rhythm)
    let bobAmount = 0;
    if (isMoving) {
      bobAmount = Math.sin(time * 6) * 0.08; // Subtle bob when moving
    }

    // Calculate offset based on player rotation (camera should be behind and slightly offset)
    const distance = baseDistance + (isMoving ? 0.3 : 0); // Pull back slightly when moving
    const height = baseHeight + bobAmount;

    // Add slight side offset for more dynamic angle
    const sideOffset = Math.sin(rotY) * 0.5;

    const cameraOffset = new THREE.Vector3(
      -Math.sin(rotY) * distance + sideOffset,
      height,
      -Math.cos(rotY) * distance
    );

    // Calculate target camera position
    const targetCameraPos = playerPos.clone().add(cameraOffset);

    // Smooth interpolation for camera position with different speeds for different scenarios
    const lerpSpeed = isMoving ? 0.04 : 0.02; // Slower when stationary for more cinematic feel
    cameraRef.current.position.lerp(targetCameraPos, lerpSpeed);

    // Set camera position
    camera.position.copy(cameraRef.current.position);

    // Look at point slightly ahead of player when moving for more cinematic feel
    const lookAtTarget = playerPos.clone();
    if (isMoving) {
      const forwardOffset = new THREE.Vector3(
        Math.sin(rotY) * 1.5,
        0.2, // Look slightly up when moving
        Math.cos(rotY) * 1.5
      );
      lookAtTarget.add(forwardOffset);
    }

    // Smooth camera rotation
    const currentLookAt = cameraRef.current.target;
    currentLookAt.lerp(lookAtTarget, 0.05);
    camera.lookAt(currentLookAt);

    // Add subtle camera shake when moving for more immersion
    if (isMoving) {
      const shakeIntensity = 0.02;
      camera.position.x += (Math.random() - 0.5) * shakeIntensity;
      camera.position.y += (Math.random() - 0.5) * shakeIntensity * 0.5;
      camera.position.z += (Math.random() - 0.5) * shakeIntensity;
    }
  });

  return null;
}

export default function GameCanvas({
  setAchievementsVisibility,
  setResumeVisibility,
  setSkillsVisibility,
  gbaPress,
  setGbaPress,
}) {
  const [currX, setCurrX] = useState(5.5); // spawn player at 5.5, 3.5
  const [currY, setCurrY] = useState(3.5);
  const [isMoving, setIsMoving] = useState(false);
  const [computerTint, setComputerTint] = useState(false);
  const [interactionType, setInteractionType] = useState(null);
  const [currentDirection, setCurrentDirection] = useState(2); // Start facing up (2)

  const [collisionSoundPlay] = useSound(collisionsound);

  const limits = {
    x: [-4.5, 5.5],
    y: [-2.5, 3.5],
  };

  const collisions = [
    [-4.5, -2.5],
    [-3.5, -2.5],
    [-2.5, -2.5],
    [-1.5, -2.5],
    [-0.5, -2.5],
    [-4.5, 2.5],
    [-3.5, 2.5],
    [-4.5, 1.5],
    [-3.5, 1.5],
    [-3.5, 0.5],
    [-4.5, 0.5],
    [0.5, -0.5],
    [3.5, -2.5],
    [3.5, -1.5],
    [2.5, -1.5],
    [2.5, -2.5],
  ];

  const interactions = [
    {
      type: "computer",
      positions: [[-4.5, -1.5]],
    },
    {
      type: "bookshelf",
      positions: [
        [-0.5, -1.5],
        [-1.5, -1.5],
      ],
    },
    {
      type: "television",
      positions: [
        [0.5, 1.5],
        [0.5, 0.5],
      ],
    },
    {
      type: "certificate",
      positions: [
        [5.5, -1.5],
        [5.5, -2.5],
      ],
    },
  ];

  const getOrientationFromDirection = (direction) => {
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
  };

  // Helper function to get the shortest rotation path
  const getShortestRotation = (currentRot, targetRot) => {
    let diff = targetRot - currentRot;

    // Normalize the difference to [-π, π]
    while (diff > Math.PI) diff -= 2 * Math.PI;
    while (diff < -Math.PI) diff += 2 * Math.PI;

    return currentRot + diff;
  };

  const checkInteractions = (x, y) => {
    const interaction = interactions.find((interaction) =>
      interaction.positions.some(
        (position) => position[0] === x && position[1] === y
      )
    );
    console.log(interaction);
    return interaction ? interaction.type : null;
  };

  const [orientation, setOrientation] = useState([0, Math.PI, 0]);

  const { pos, rot } = useSpring({
    pos: [currX, 0, currY],
    rot: orientation,
    config: {
      tension: 120,
      friction: 25,
      duration: undefined, // Remove fixed duration for smoother movement
    },
  });

  const handleInteract = useCallback(() => {
    if (interactionType) {
      console.log(`Interacting with ${interactionType}`);
      if (interactionType === "certificate") {
        setAchievementsVisibility((prevVisibility) => !prevVisibility);
      } else if (interactionType === "computer") {
        setResumeVisibility((prevVisibility) => !prevVisibility);
      } else if (interactionType === "bookshelf") {
        setSkillsVisibility((prevVisibility) => !prevVisibility);
      }
      setInteractionType(null);
    }
  }, [
    interactionType,
    setAchievementsVisibility,
    setResumeVisibility,
    setSkillsVisibility,
  ]);

  // Get relative direction based on current facing direction
  const getRelativeDirection = (input, currentFacing) => {
    const directionMap = {
      // When facing up (2)
      2: { front: 2, back: 1, left: 3, right: 4 },
      // When facing down (1)
      1: { front: 1, back: 2, left: 4, right: 3 },
      // When facing left (3)
      3: { front: 3, back: 4, left: 1, right: 2 },
      // When facing right (4)
      4: { front: 4, back: 3, left: 2, right: 1 },
    };

    return directionMap[currentFacing][input];
  };

  const handleMove = useCallback(
    (inputDirection) => {
      if (isMoving) return;

      // Convert input to actual direction based on current facing
      const actualDirection = getRelativeDirection(
        inputDirection,
        currentDirection
      );

      let newX = currX;
      let newY = currY;

      switch (actualDirection) {
        case 1: // Down
          newY = currY + 1;
          break;
        case 2: // Up
          newY = currY - 1;
          break;
        case 3: // Left
          newX = currX - 1;
          break;
        case 4: // Right
          newX = currX + 1;
          break;
        default:
          break;
      }

      // Check boundaries
      if (
        newX < limits.x[0] ||
        newX > limits.x[1] ||
        newY < limits.y[0] ||
        newY > limits.y[1]
      ) {
        collisionSoundPlay();
        console.log("Cannot move outside the limits.");
        return;
      }

      // Check collisions
      const isCollision = collisions.some(([x, y]) => x === newX && y === newY);

      if (!isCollision) {
        setIsMoving(true);

        // Update facing direction only if it's different
        if (actualDirection !== currentDirection) {
          const currentOrientation =
            getOrientationFromDirection(currentDirection);
          const newOrientation = getOrientationFromDirection(actualDirection);

          // Calculate shortest rotation path
          const shortestY = getShortestRotation(
            currentOrientation[1],
            newOrientation[1]
          );
          setOrientation([0, shortestY, 0]);
          setCurrentDirection(actualDirection);
        }

        // Move to new position
        setCurrX(newX);
        setCurrY(newY);

        const interaction = checkInteractions(newX, newY);
        if (interaction) {
          setInteractionType(interaction);
        } else {
          setInteractionType(null);
        }

        setAchievementsVisibility(false);
        setResumeVisibility(false);
        setSkillsVisibility(false);

        // Reset moving state after animation
        setTimeout(() => {
          setIsMoving(false);
        }, 400); // Longer duration to match slower movement
      } else {
        collisionSoundPlay();
        console.log("Cannot move to that position due to collision.");
      }
    },
    [
      currX,
      currY,
      currentDirection,
      isMoving,
      limits.x,
      limits.y,
      collisions,
      setAchievementsVisibility,
      setResumeVisibility,
      setSkillsVisibility,
      collisionSoundPlay,
      checkInteractions,
    ]
  );

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (isMoving) return;

      switch (event.key) {
        case "ArrowUp":
        case "w":
          handleMove("front");
          break;
        case "ArrowDown":
        case "s":
          handleMove("back");
          break;
        case "ArrowLeft":
        case "a":
          handleMove("left");
          break;
        case "ArrowRight":
        case "d":
          handleMove("right");
          break;
        case "Enter":
        case "e":
          handleInteract();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleMove, handleInteract, isMoving]);

  useEffect(() => {
    if (!gbaPress || isMoving) return;

    switch (gbaPress) {
      case "up":
        handleMove("front");
        break;
      case "down":
        handleMove("back");
        break;
      case "left":
        handleMove("left");
        break;
      case "right":
        handleMove("right");
        break;
      case "a":
      case "start":
        handleInteract();
        break;
      default:
        break;
    }
    setGbaPress("");
  }, [gbaPress, handleMove, handleInteract, setGbaPress, isMoving]);

  function handleClickInteraction(type) {
    console.log("Clicked on interaction:", type);
    if (type === "certificate") {
      setAchievementsVisibility((prevVisibility) => !prevVisibility);
    } else if (type === "computer") {
      setResumeVisibility((prevVisibility) => !prevVisibility);
    } else if (type === "bookshelf") {
      setSkillsVisibility((prevVisibility) => !prevVisibility);
    }
  }

  return (
    <section className="flex h-full w-full">
      <div className="p-2 w-full md:h-[80vh] border-red-500">
        <Canvas camera={{ position: [5, 5, 8], fov: 60 }}>
          <OrbitControls enabled={false} />
          <Suspense fallback={null}>
            <RoomModel
              interactions={interactions}
              interactionType={interactionType}
              onInteraction={handleClickInteraction}
            />
            <animated.group position={pos} rotation={rot}>
              <PlayerModel isMoving={isMoving} />
            </animated.group>
            <FollowCamera
              playerPosition={pos.get()}
              playerRotation={rot.get()}
              isMoving={isMoving}
            />
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
}
