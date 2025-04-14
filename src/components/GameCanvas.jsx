import { OrbitControls } from "@react-three/drei";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { RoomModel } from "@/assets/RoomModel";
import { PlayerModel } from "@/assets/PlayerModel";
import { Suspense, useEffect, useState, useCallback, useRef } from "react";
import { useSpring, animated } from "@react-spring/three";
import * as THREE from "three";
import useSound from "use-sound";

const collisionsound = "/sounds/collisionsound.mp3";

// Camera component that follows the player
function FollowCamera({ playerPosition, playerRotation }) {
  const { camera } = useThree();
  const cameraRef = useRef({
    position: new THREE.Vector3(5, 5, 8),
    target: new THREE.Vector3(5.5, 0, 3.5),
  });

  useFrame(() => {
    if (!playerPosition) return;

    // Calculate camera position based on player's position and orientation
    const playerPos = new THREE.Vector3(
      playerPosition[0],
      0,
      playerPosition[2]
    );

    // Extract player's orientation (rotation)
    const [_, rotY] = playerRotation;

    // Calculate offset based on player rotation (camera should be behind player)
    const distance = 4; // Distance from player
    const height = 3.5; // Height above player

    const cameraOffset = new THREE.Vector3(
      -Math.sin(rotY) * distance,
      height,
      -Math.cos(rotY) * distance
    );

    // Calculate target camera position
    const targetCameraPos = playerPos.clone().add(cameraOffset);

    // Smooth interpolation for camera position
    cameraRef.current.position.lerp(targetCameraPos, 0.05);

    // Set camera position
    camera.position.copy(cameraRef.current.position);

    // Make camera look at player
    camera.lookAt(playerPos);
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

  const changeOrientation = (direction) => {
    switch (direction) {
      case 1:
        return [0, 0, 0];
      case 2:
        return [0, Math.PI, 0];
      case 3:
        return [0, -Math.PI / 2, 0];
      case 4:
        return [0, Math.PI / 2, 0];
      default:
        return [0, 0, 0];
    }
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

  const [orientation, setOrientation] = useState([0, Math.PI, 0]); // 0 = [0,1], 1 = [1,0], 2 = [0,-1], 3 = [-1,0]

  const { pos, rot } = useSpring({
    pos: [currX, 0, currY],
    rot: orientation,
    config: { duration: 500 },
    loop: true,
    rotate: orientation,
  });

  const handleInteract = useCallback(() => {
    if (interactionType) {
      console.log(`Interacting with ${interactionType}`);
      if (interactionType === "certificate") {
        // Toggle achievements visibility
        setAchievementsVisibility((prevVisibility) => !prevVisibility);
      } else if (interactionType === "computer") {
        // Toggle resume visibility
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

  const handleMove = useCallback(
    (direction) => {
      setOrientation(changeOrientation(direction));
      let newX = currX;
      let newY = currY;

      switch (direction) {
        case 1:
          newY = currY + 1;
          break;
        case 2:
          newY = currY - 1;
          break;
        case 3:
          newX = currX - 1;
          break;
        case 4:
          newX = currX + 1;
          break;
        default:
          break;
      }

      if (
        newX < limits.x[0] ||
        newX > limits.x[1] ||
        newY < limits.y[0] ||
        newY > limits.y[1]
      ) {
        collisionSoundPlay();
        console.log("Cannot move outside the limits.");
        setIsMoving(false);
        return;
      }

      const isCollision = collisions.some(([x, y]) => x === newX && y === newY);

      if (!isCollision) {
        setIsMoving(true);
        setCurrX(newX);
        setCurrY(newY);
        const interaction = checkInteractions(newX, newY);
        if (interaction) {
          setInteractionType(interaction);
        } else {
          setInteractionType(null); // Reset interaction type when moving away from an interactable position
        }
        // Close achievements visibility when moving
        setAchievementsVisibility(false);
        setResumeVisibility(false);
        setSkillsVisibility(false);

        setTimeout(() => {
          setIsMoving(false);
        }, 400);
      } else {
        collisionSoundPlay();
        console.log("Cannot move to that position due to collision.");
        setIsMoving(false);
      }
    },
    [
      currX,
      currY,
      limits.x,
      limits.y,
      collisions,
      setAchievementsVisibility,
      setResumeVisibility,
      setSkillsVisibility,
      collisionSoundPlay,
    ]
  );

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (isMoving) return; // Prevent movement while already moving

      switch (event.key) {
        case "ArrowUp":
        case "w":
          handleMove(2);
          break;
        case "ArrowDown":
        case "s":
          handleMove(1);
          break;
        case "ArrowLeft":
        case "a":
          handleMove(3);
          break;
        case "ArrowRight":
        case "d":
          handleMove(4);
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
    if (!gbaPress) return;
    if (isMoving) return; // Prevent movement while already moving

    switch (gbaPress) {
      case "up":
        handleMove(2);
        break;
      case "down":
        handleMove(1);
        break;
      case "left":
        handleMove(3);
        break;
      case "right":
        handleMove(4);
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
      // Toggle achievements visibility
      setAchievementsVisibility((prevVisibility) => !prevVisibility);
    } else if (type === "computer") {
      // Toggle resume visibility
      setResumeVisibility((prevVisibility) => !prevVisibility);
    } else if (type === "bookshelf") {
      setSkillsVisibility((prevVisibility) => !prevVisibility);
    }
  }

  return (
    <section className="flex h-full w-full">
      <div className="p-2 w-full md:h-[80vh] border-red-500">
        <Canvas camera={{ position: [5, 5, 8], fov: 60 }}>
          {/* Disable OrbitControls as we're using a custom camera follower */}
          <OrbitControls enabled={false} />
          <Suspense fallback={null}>
            <RoomModel
              interactions={interactions}
              interactionType={interactionType}
              onInteraction={handleClickInteraction}
            />
            <PlayerModel isMoving={isMoving} position={pos} rotation={rot} />
            <FollowCamera
              playerPosition={pos.get()}
              playerRotation={rot.get()}
            />
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
}
