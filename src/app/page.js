"use client";

import GameCanvas from "@/components/GameCanvas";
import AnimatedHeading from "@/components/AnimatedHeading";
import AchievementsModal from "@/components/AchievementsModal";
import ResumeModal from "@/components/ResumeModal";

import { useState } from "react";
import SkillsModal from "@/components/SkillsModal";

export default function Home() {
  const [achievementsVisibility, setAchievementsVisibility] = useState(false);
  const [resumeVisibility, setResumeVisibility] = useState(false);
  const [skillsVisibility, setSkillsVisibility] = useState(false);

  return (
    <main className="w-screen h-screen flex flex-col bg-black">
      {/* /* <AnimatedHeading text={"Hi I'm Ansh, and this is my portfolio"} /> */}
      <div className="h-1/2 md:h-full">
        {" "}
        <GameCanvas
          setAchievementsVisibility={setAchievementsVisibility}
          setResumeVisibility={setResumeVisibility}
          setSkillsVisibility={setSkillsVisibility}
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
        <SkillsModal
          visibility={skillsVisibility}
          onClose={() => {
            setSkillsVisibility(false);
          }}
        />
      </div>
    </main>
  );
}
