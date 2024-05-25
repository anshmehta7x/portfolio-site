"use client";

import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect } from "react";
import { AmbientLight, Scene } from "three";
import { RoomModel } from "@/assets/RoomModel";
import { useState } from "react";
import { PlayerModel } from "@/assets/PlayerModel";
import { useCallback } from "react";

export default function Home() {
  const [currX, setCurrX] = useState(5.5); //spawn player at 5.5 , 3.5
  const [currY, setCurrY] = useState(3.5);

  const limits = {
    x: [-4.5, 5.5],
    y: [-2.5, 3.5],
  };

  const gridX = 11;
  const gridY = 7;

  // const collisions = [
  //   [-3.5,-2.5],
  //   [-4.5,-2.5],

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

  const [orientation, setOrientation] = useState([0, Math.PI, 0]); // 0 = [0,1], 1 = [1,0], 2 = [0,-1], 3 = [-1,0
  const handleMove = useCallback(
    (direction) => {
      console.log("Move", direction);
      setOrientation(changeOrientation(direction));
      switch (direction) {
        case 1:
          if (currY === limits.y[1]) return;
          setCurrY(currY + 1);
          break;
        case 2:
          if (currY === limits.y[0]) return;
          setCurrY(currY - 1);
          break;
        case 3:
          if (currX === limits.x[0]) return;
          setCurrX(currX - 1);
          break;
        case 4:
          if (currX === limits.x[1]) return;
          setCurrX(currX + 1);
          break;
        default:
          break;
      }
    },
    [currX, currY, limits.x, limits.y]
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
    <main className="w-screen h-screen flex">
      <div className="w-[80vw] h-auto">
        <Canvas camera={{ position: [5, 5, 8] }}>
          <OrbitControls enabled={true} />
          <Suspense fallback={null}>
            <RoomModel />
            <PlayerModel position={[currX, 0, currY]} rotation={orientation} />
          </Suspense>
        </Canvas>
      </div>
      <div className="buttons w-[20vw] ">
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
    </main>
  );
}
