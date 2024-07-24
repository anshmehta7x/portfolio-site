"use client";

import GameCanvas from "@/components/GameCanvas";
import AnimatedHeading from "@/components/AnimatedHeading";
import AchievementsModal from "@/components/AchievementsModal";
import ResumeModal from "@/components/ResumeModal";

import { useState } from "react";

export default function Home() {
  const [achievementsVisibility, setAchievementsVisibility] = useState(false);
  const [resumeVisibility, setResumeVisibility] = useState(false);

  return (
    <main className="w-screen h-screen flex flex-col bg-cyan-400">
      <AnimatedHeading text={"Hi I'm Ansh, and this is my portfolio"} />
      <GameCanvas
        setAchievementsVisibility={setAchievementsVisibility}
        setResumeVisibility={setResumeVisibility}
      />
      <AchievementsModal
        visibility={achievementsVisibility}
        onClose={() => {
          setAchievementsVisibility(false);
        }}
      />
      <ResumeModal
        visibility={resumeVisibility}
        onClose={() => {
          setResumeVisibility(false);
        }}
      />
    </main>
  );
}
