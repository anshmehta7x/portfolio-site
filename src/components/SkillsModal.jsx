import React from "react";
import { ResponsiveHoneycomb, Hexagon } from "react-honeycomb";

const skills = [
  { name: "React", icon: "⚛️", color: "#61DAFB" },
  { name: "JavaScript", icon: "JS", color: "#F7DF1E" },
  { name: "Python", icon: "🐍", color: "#3776AB" },
  { name: "CSS", icon: "🎨", color: "#1572B6" },
  { name: "Node.js", icon: "🟢", color: "#339933" },
  { name: "Git", icon: "🔀", color: "#F05032" },
  { name: "C", icon: "©️", color: "#A8B9CC" },
  { name: "C++", icon: "➕", color: "#00599C" },
  { name: "Java", icon: "☕", color: "#007396" },
  { name: "HTML", icon: "🌐", color: "#E34F26" },
  { name: "Solidity", icon: "💎", color: "#363636" },
  { name: "Docker", icon: "🐳", color: "#2496ED" },
  { name: "Postman", icon: "📮", color: "#FF6C37" },
  { name: "Kaggle", icon: "📊", color: "#20BEFF" },
  { name: "Remix IDE", icon: "🔧", color: "#5A5A5A" },
  { name: "NextJS", icon: "▲", color: "#000000" },
  { name: "TailwindCSS", icon: "🌬️", color: "#38B2AC" },
  { name: "Flask", icon: "🌶️", color: "#000000" },
  { name: "Foundry", icon: "🏭", color: "#1C1C1C" },
  { name: "AWS", icon: "☁️", color: "#232F3E" },
  { name: "Azure", icon: "☁️", color: "#0089D6" },
  { name: "Firebase", icon: "🔥", color: "#FFCA28" },
  { name: "NumPy", icon: "🔢", color: "#013243" },
  { name: "TensorFlow", icon: "📊", color: "#FF6F00" },
  { name: "Matplotlib", icon: "📉", color: "#11557C" },
  { name: "Linux", icon: "🐧", color: "#FCC624" },
  { name: "Blockchain", icon: "🔗", color: "#121D33" },
  { name: "OpenCV", icon: "👁️", color: "#5C3EE8" },
];

export default function SkillsModal({
  visibility,
  onClose,
  isConstrained = false,
}) {
  const sectionClasses = isConstrained
    ? "absolute inset-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50"
    : "fixed h-screen w-screen flex justify-center items-center bg-black bg-opacity-50";

  const contentContainerClasses = isConstrained
    ? "bg-slate-800 h-full w-full pixel-border rounded-lg flex flex-col overflow-hidden"
    : "bg-slate-800 h-[85vh] w-[85vw] fixed z-100 pixel-border rounded-lg flex flex-col overflow-hidden";

  return (
    <section className={`${visibility ? "flex" : "hidden"} ${sectionClasses}`}>
      <div className={contentContainerClasses}>
        <div className="p-4 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-300 focus:outline-none transition-colors duration-200"
            aria-label="Close modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <h1 className="text-white text-4xl font-arcade text-center mt-8 mb-12 glow-text">
            Skills
          </h1>
        </div>
        <div className="flex-grow overflow-auto px-4 md:px-[5vw] pb-8 scrollbar-hide">
          <div className="block md:hidden">
            <ResponsiveHoneycomb
              defaultWidth={1000}
              size={60}
              items={skills}
              renderItem={(item, index) => (
                <Hexagon
                  key={index}
                  style={{
                    backgroundColor: item.color,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "10px",
                    cursor: "pointer",
                    transition: "transform 0.3s ease",
                  }}
                  className="hover:scale-110"
                >
                  <span className="text-4xl mb-2">{item.icon}</span>
                  <span className="text-white text-center font-bold text-sm">
                    {item.name}
                  </span>
                </Hexagon>
              )}
            />
          </div>
          <div className="hidden md:block">
            <ResponsiveHoneycomb
              defaultWidth={1000}
              size={75}
              items={skills}
              renderItem={(item, index) => (
                <Hexagon
                  key={index}
                  style={{
                    backgroundColor: item.color,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "10px",
                    cursor: "pointer",
                    transition: "transform 0.3s ease",
                  }}
                  className="hover:scale-110"
                >
                  <span className="text-4xl mb-2">{item.icon}</span>
                  <span className="text-white text-center font-bold text-sm">
                    {item.name}
                  </span>
                </Hexagon>
              )}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
