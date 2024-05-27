"use client";

import GameCanvas from "@/components/GameCanvas";
import AnimatedHeading from "@/components/AnimatedHeading";

export default function Home() {
  return (
    <main className="w-screen h-screen flex flex-col bg-lime-400">
      <AnimatedHeading text={"Hi I'm Ansh, and this is my portfolio"} />
      <GameCanvas />
    </main>
  );
}
