"use client";

import GameCanvas from "@/components/GameCanvas";
import AnimatedHeading from "@/components/AnimatedHeading";
import AchievementsModal from "@/components/AchievementsModal";

import { useState } from "react";

export default function Home() {
  const [achievementsVisibility, setAchievementsVisibility] = useState(false);

  return (
    <main className="w-screen h-screen flex flex-col bg-cyan-400">
      <AnimatedHeading text={"Hi I'm Ansh, and this is my portfolio"} />
      <GameCanvas setAchievementsVisibility={setAchievementsVisibility} />
      <AchievementsModal
        visibility={achievementsVisibility}
        onClose={() => {
          setAchievementsVisibility(false);
        }}
      />
    </main>
  );
}
