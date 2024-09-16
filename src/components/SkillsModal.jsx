import React from "react";
import { ResponsiveHoneycomb, Hexagon } from "react-honeycomb";

const skills = [
  { name: "React", icon: "⚛️", color: "#61DAFB" },
  { name: "JavaScript", icon: "JS", color: "#F7DF1E" },
  { name: "Python", icon: "🐍", color: "#3776AB" },
  { name: "CSS", icon: "🎨", color: "#1572B6" },
  { name: "Node.js", icon: "🟢", color: "#339933" },
  { name: "Git", icon: "🔀", color: "#F05032" },
  { name: "React", icon: "⚛️", color: "#61DAFB" },
  { name: "JavaScript", icon: "JS", color: "#F7DF1E" },
  { name: "Python", icon: "🐍", color: "#3776AB" },
  { name: "CSS", icon: "🎨", color: "#1572B6" },
  { name: "Node.js", icon: "🟢", color: "#339933" },
  { name: "Git", icon: "🔀", color: "#F05032" },
  { name: "React", icon: "⚛️", color: "#61DAFB" },
  { name: "JavaScript", icon: "JS", color: "#F7DF1E" },
  { name: "Python", icon: "🐍", color: "#3776AB" },
  { name: "CSS", icon: "🎨", color: "#1572B6" },
  { name: "Node.js", icon: "🟢", color: "#339933" },
  { name: "Git", icon: "🔀", color: "#F05032" },
  { name: "React", icon: "⚛️", color: "#61DAFB" },
  { name: "JavaScript", icon: "JS", color: "#F7DF1E" },
  { name: "Python", icon: "🐍", color: "#3776AB" },
  { name: "CSS", icon: "🎨", color: "#1572B6" },
  { name: "Node.js", icon: "🟢", color: "#339933" },
  { name: "Git", icon: "🔀", color: "#F05032" },
];

export default function SkillsModal({ visibility, onClose }) {
  return (
    <section
      className={`${
        visibility ? "flex" : "hidden"
      } h-screen w-screen justify-center fixed items-center bg-black bg-opacity-50`}
    >
      <div className="bg-slate-800 h-[85vh] w-[85vw] fixed z-20 pixel-border rounded-lg flex flex-col overflow-hidden">
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
        <div className="flex-grow overflow-auto px-4 md:px-[5vw] pb-8">
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
    </section>
  );
}
