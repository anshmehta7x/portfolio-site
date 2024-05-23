"use client";

import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { AmbientLight, Scene } from "three";
import { RoomModel } from "@/assets/RoomModel";
import { useState } from "react";
import { PlayerModel } from "@/assets/PlayerModel";
import { Box3 } from "three";

export default function Home() {
  const [currX, setCurrX] = useState(0);
  const [currY, setCurrY] = useState(0);

  const handleMove = (direction) => {
    console.log("Move", direction);
    //check for collision before move

    switch (direction) {
      case 1:
        setCurrY(currY + 1);
        break;
      case 2:
        setCurrY(currY - 1);
        break;
      case 3:
        setCurrX(currX + 1);
        break;
      case 4:
        setCurrX(currX - 1);
        break;
      default:
        break;
    }
  };

  const handleInteract = () => {
    console.log("Interact");
  };

  return (
    <main className="w-screen h-screen flex">
      <div className="w-[80vw] h-auto">
        <Canvas camera={{ position: [5, 5, 8] }}>
          <OrbitControls enabled={true} />
          <Suspense fallback={null}>
            <RoomModel />
            <PlayerModel position={[currX, 0, currY]} />
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
          Move Forward
        </button>
        <button
          className="w-full h-12 bg-blue-500 text-white"
          onClick={() => {
            handleMove(2);
          }}
        >
          Move Backward
        </button>
        <button
          className="w-full h-12 bg-blue-500 text-white
        "
          onClick={() => {
            handleMove(3);
          }}
        >
          Move Right
        </button>
        <button
          className="w-full h-12 bg-blue-500 text-white"
          onClick={() => {
            handleMove(4);
          }}
        >
          Move Left
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
