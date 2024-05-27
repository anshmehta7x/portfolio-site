import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { RoomModel } from "@/assets/RoomModel";
import { PlayerModel } from "@/assets/PlayerModel";
import { Suspense } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useCallback } from "react";

export default function GameCanvas() {
  const [currX, setCurrX] = useState(5.5); //spawn player at 5.5 , 3.5
  const [currY, setCurrY] = useState(3.5);

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
    //return the type of interaction if the player is in a position where an interaction is possible
    return interactions.find((interaction) =>
      interaction.positions.some(
        (position) => position[0] === x && position[1] === y
      )
    );
  };

  const [orientation, setOrientation] = useState([0, Math.PI, 0]); // 0 = [0,1], 1 = [1,0], 2 = [0,-1], 3 = [-1,0
  const handleMove = useCallback(
    (direction) => {
      console.log("Move", direction);
      setOrientation(changeOrientation(direction));
      let newX = currX;
      let newY = currY;

      switch (direction) {
        case 1:
          if (currY === limits.y[1]) return;
          newY = currY + 1;
          break;
        case 2:
          if (currY === limits.y[0]) return;
          newY = currY - 1;
          break;
        case 3:
          if (currX === limits.x[0]) return;
          newX = currX - 1;
          break;
        case 4:
          if (currX === limits.x[1]) return;
          newX = currX + 1;
          break;
        default:
          break;
      }

      // Check if the new coordinates are in the collisions array
      const isCollision = collisions.some(([x, y]) => x === newX && y === newY);

      if (!isCollision) {
        setCurrX(newX);
        setCurrY(newY);
        const interaction = checkInteractions(newX, newY);
        if (interaction) {
          console.log(`You can interact with the ${interaction.type}`);
        }

        console.log(`New coordinates: [${newX}, ${newY}]`);
      } else {
        console.log("Cannot move to that position due to collision.");
      }
    },
    [currX, currY, limits.x, limits.y, collisions]
  );

  const handleInteract = useCallback(() => {
    console.log("Interact");
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
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
  }, [handleMove, handleInteract]);

  return (
    <section className="flex h-auto w-full  ">
      <div className="w-4 border-red-500">
        <Canvas camera={{ position: [5, 5, 8] }}>
          <OrbitControls enabled={true} />
          <Suspense fallback={null}>
            <RoomModel />
            <PlayerModel position={[currX, 0, currY]} rotation={orientation} />
          </Suspense>
        </Canvas>
      </div>
      <div className="w-6">
        <button
          className="w-full h-12 bg-blue-500 text-white"
          onClick={() => {
            handleMove(1);
          }}
        >
          Move Backward
        </button>
        <button
          className="w-full h-12 bg-blue-500 text-white"
          onClick={() => {
            handleMove(2);
          }}
        >
          Move Forward
        </button>
        <button
          className="w-full h-12 bg-blue-500 text-white
        "
          onClick={() => {
            handleMove(3);
          }}
        >
          Move Left
        </button>
        <button
          className="w-full h-12 bg-blue-500 text-white"
          onClick={() => {
            handleMove(4);
          }}
        >
          Move Right
        </button>
        <button
          className="w-full h-12 bg-blue-500 text-white"
          onClick={handleInteract}
        >
          Interact
        </button>
      </div>
    </section>
  );
}
// Path: src/components/PlayerModel.jsx
