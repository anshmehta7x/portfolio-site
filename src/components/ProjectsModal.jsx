import React, { useState, useEffect, useCallback } from "react";
import { ExternalLink, Github } from "lucide-react";

// Updated project data to include the 'techStack' array for each project.
// Tech stack for ScriptSync is from the resume. Others are based on their descriptions.
const projectsData = [
    {
        title: "ScriptSync - 1st Place @ VIT Hack",
        description:
            "Real-time, multithreaded video translation using GPU-accelerated OCR and intelligent caching.",
        media: "/demo-videos/scriptsync.mp4",
        mediaType: "video",
        liveUrl:
            "https://drive.google.com/file/d/1DiPiyneFtrvlLd5R-TVA0FxvNkwjTB2F/view",
        liveUrlText: "Watch Demo",
        githubUrl: "https://github.com/anshmehta7x/scriptsync",
        techStack: ["Python", "OpenCV", "EasyOCR", "Threading", "FFmpeg"],
    },
    {
        title: "Yantra Hackathon Portal - VIT's Biggest Hackathon",
        description:
            "A stunning hackathon management system with information, team management, and project submissions",
        media: "/demo-videos/yantrahack.mp4",
        liveUrl: "https://yantra-main-hack-frontend.vercel.app/",
        githubUrl: "https://github.com/anshmehta7x/yantra-main-hack-frontend",
        techStack: ["Next.js", "TailwindCSS", "Vercel", "Firebase"],
        mediaType: "video",
    },
    {
        title: "ForReal AI - 2nd Place @ Code4Change",
        description:
            "An AI-powered deepfake detector for both audio and image inputs.",
        media: "/images/forreal-demo.jpg",
        mediaType: "image",
        liveUrl: "https://devfolio.co/projects/forreal-4f73",
        githubUrl: "https://github.com/anshmehta7x/ForReal",
        techStack: ["Python", "PyTorch", "FastAPI", "React.js", "AI/ML"],
    },
    {
        title: "StoryScape - 3rd Place @ DevJams",
        description:
            "A Generative AI tool that converts stories into rich, audio-visual scenes.",
        media: "/videos/storyscape-demo.mp4",
        mediaType: "video",
        liveUrl: "https://devfolio.co/projects/storyscape-34dd",
        githubUrl: "https://github.com/anshmehta7x/StoryScape",
        techStack: ["Hugging Face", "ElevenLabs API", "Next.js", "GenAI"],
    },
];

export default function ProjectsModal({
    visibility,
    onClose,
    isConstrained = false,
}) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isChanging, setIsChanging] = useState(false);

    const handleNext = useCallback(() => {
        if (isChanging) return;
        setIsChanging(true);
        setTimeout(() => {
            setCurrentIndex(
                (prevIndex) => (prevIndex + 1) % projectsData.length,
            );
            setIsChanging(false);
        }, 400); // Duration of the glitch animation
    }, [isChanging]);

    const handlePrev = useCallback(() => {
        if (isChanging) return;
        setIsChanging(true);
        setTimeout(() => {
            setCurrentIndex(
                (prevIndex) =>
                    (prevIndex - 1 + projectsData.length) % projectsData.length,
            );
            setIsChanging(false);
        }, 400);
    }, [isChanging]);

    // Allows keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!visibility) return;
            if (e.key === "ArrowRight") {
                handleNext();
            } else if (e.key === "ArrowLeft") {
                handlePrev();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [visibility, handleNext, handlePrev]);

    const currentProject = projectsData[currentIndex];

    // These base classes are unchanged
    const sectionClasses = isConstrained
        ? "absolute inset-0 w-full h-full flex justify-center items-center bg-black bg-opacity-60 z-50"
        : "fixed inset-0 flex justify-center items-center bg-black bg-opacity-60 z-[9999]";

    const contentContainerClasses = isConstrained
        ? "bg-slate-900 h-full w-full border-2 border-slate-700 rounded-lg flex flex-col overflow-hidden"
        : "bg-gradient-to-br from-[#211F2E] to-[#100F17] h-auto max-h-[90vh] w-[95vw] md:w-[90vw] lg:w-[80vw] max-w-6xl fixed z-100 border-4 border-slate-900/50 rounded-xl flex flex-col shadow-2xl shadow-black/50";

    return (
        <section
            className={`${visibility ? "flex" : "hidden"} ${sectionClasses} min-h-[50vh]`}
        >
            <div className={contentContainerClasses}>
                <div className="p-4 relative bg-black/30 border-b-2 border-slate-800/50 flex items-center justify-between">
                    {/* Navigation Buttons */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handlePrev}
                            className="nav-button"
                            aria-label="Previous Project"
                        >
                            &lt;
                        </button>
                        <span className="font-arcade text-slate-400 text-sm md:text-base">
                            CH
                        </span>
                        <button
                            onClick={handleNext}
                            className="nav-button"
                            aria-label="Next Project"
                        >
                            &gt;
                        </button>
                    </div>

                    <h1 className="text-white text-xl md:text-3xl font-arcade text-center glow-text tracking-widest absolute left-1/2 -translate-x-1/2">
                        PROJECTS
                    </h1>

                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-white focus:outline-none transition-colors duration-200 z-10"
                        aria-label="Close modal"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-7 w-7"
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
                </div>

                {/* Main Content Area */}
                <div className="crt-screen flex-grow flex flex-col p-4 md:p-6 overflow-hidden relative">
                    <div
                        key={currentIndex}
                        className={`w-full h-full flex flex-col transition-opacity duration-300 ${isChanging ? "opacity-0 a-glitch" : "opacity-100"}`}
                    >
                        <div className="flex-grow w-full rounded-md overflow-hidden border-2 border-slate-700/80 shadow-lg mb-4 relative bg-black">
                            {currentProject.mediaType === "video" ? (
                                <video
                                    src={currentProject.media}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    preload="auto"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <img
                                    src={currentProject.media}
                                    alt={`${currentProject.title} screenshot`}
                                    className="w-full h-full object-cover"
                                />
                            )}
                        </div>

                        <div className="flex flex-col text-center px-2">
                            <h3 className="text-lg md:text-2xl font-bold font-arcade text-cyan-300 tracking-wide glow-text-cyan mb-2 a-fade-in-up">
                                {currentProject.title}
                            </h3>
                            <p className="text-slate-300 font-bigpixel text-sm md:text-base flex-grow mb-3 a-fade-in-up a-delay-1">
                                {currentProject.description}
                            </p>

                            {/* TECH STACK SECTION -- NEW */}
                            <div className="flex flex-wrap gap-2 justify-center my-3 a-fade-in-up a-delay-2">
                                {currentProject.techStack.map((tech) => (
                                    <span key={tech} className="tech-tag">
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            <div className="flex items-center justify-center space-x-6 mt-auto a-fade-in-up a-delay-3">
                                {currentProject.liveUrl && (
                                    <a
                                        href={currentProject.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center space-x-2 text-slate-200 hover:text-cyan-400 transition-colors duration-200"
                                    >
                                        <ExternalLink size={20} />
                                        <span className="font-arcade text-base md:text-lg">
                                            Demo
                                        </span>
                                    </a>
                                )}
                                {currentProject.githubUrl && (
                                    <a
                                        href={currentProject.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center space-x-2 text-slate-200 hover:text-cyan-400 transition-colors duration-200"
                                    >
                                        <Github size={20} />
                                        <span className="font-arcade text-base md:text-lg">
                                            Code
                                        </span>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pagination Dots */}
                <div className="flex justify-center items-center p-2 space-x-3 bg-black/20">
                    {projectsData.map((_, index) => (
                        <div
                            key={index}
                            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${currentIndex === index ? "bg-cyan-400 shadow-cyan" : "bg-slate-600"}`}
                        />
                    ))}
                </div>
            </div>

            {/* All new styling and animations are defined here */}
            <style jsx>{`
                .font-arcade {
                    font-family:
                        "Press Start 2P", monospace; /* A more fitting pixel font */
                }
                .font-bigpixel {
                    font-family:
                        "VT323", monospace; /* A clean, larger pixel font */
                }
                .glow-text {
                    text-shadow: 0 0 8px rgba(255, 255, 255, 0.3);
                }
                .glow-text-cyan {
                    text-shadow: 0 0 12px rgba(56, 189, 248, 0.5);
                }
                .shadow-cyan {
                    box-shadow: 0 0 8px rgba(56, 189, 248, 0.7);
                }
                .nav-button {
                    font-family: "VT323", monospace;
                    font-size: 1.5rem;
                    line-height: 1;
                    padding: 0 0.5rem;
                    border: 1px solid #475569;
                    background: #1e293b;
                    color: #94a3b8;
                    border-radius: 4px;
                    transition: all 0.2s;
                }
                .nav-button:hover {
                    background: #334155;
                    color: #e2e8f0;
                    border-color: #64748b;
                }

                /* TECH TAG STYLING -- NEW */
                .tech-tag {
                    font-family: "VT323", monospace;
                    background-color: #334155;
                    color: #cbd5e1;
                    padding: 2px 8px;
                    border-radius: 3px;
                    font-size: 0.8rem;
                    border: 1px solid #475569;
                    text-transform: uppercase;
                }

                .crt-screen {
                    background: radial-gradient(
                        ellipse at center,
                        rgba(20, 20, 40, 0.85) 0%,
                        rgba(10, 10, 20, 0.95) 100%
                    );
                    position: relative;
                }
                /* Enhanced Scanline Effect */
                .crt-screen::before {
                    content: " ";
                    display: block;
                    position: absolute;
                    top: 0;
                    left: 0;
                    bottom: 0;
                    right: 0;
                    background:
                        linear-gradient(
                            rgba(18, 16, 16, 0) 50%,
                            rgba(0, 0, 0, 0.25) 50%
                        ),
                        linear-gradient(
                            90deg,
                            rgba(255, 0, 0, 0.06),
                            rgba(0, 255, 0, 0.02),
                            rgba(0, 0, 255, 0.06)
                        );
                    z-index: 0;
                    background-size:
                        100% 3px,
                        3px 100%;
                    pointer-events: none;
                    opacity: 0.4;
                    animation: flicker 0.15s infinite;
                }

                /* Animations */
                .a-fade-in-up {
                    animation: fadeInUp 0.5s ease-out forwards;
                    opacity: 0;
                }
                .a-delay-1 {
                    animation-delay: 0.1s;
                }
                .a-delay-2 {
                    animation-delay: 0.2s;
                }
                .a-delay-3 {
                    animation-delay: 0.3s;
                }

                @keyframes fadeInUp {
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                }

                @keyframes flicker {
                    0% {
                        opacity: 0.35;
                    }
                    5% {
                        opacity: 0.5;
                    }
                    10% {
                        opacity: 0.3;
                    }
                    15% {
                        opacity: 0.6;
                    }
                    25% {
                        opacity: 0.2;
                    }
                    30% {
                        opacity: 0.7;
                    }
                    35% {
                        opacity: 0.4;
                    }
                    40% {
                        opacity: 0.65;
                    }
                    45% {
                        opacity: 0.3;
                    }
                    100% {
                        opacity: 0.4;
                    }
                }

                .a-glitch {
                    animation: glitch 0.4s steps(2, end) forwards;
                }

                @keyframes glitch {
                    0% {
                        clip-path: inset(89% 0 1% 0);
                        transform: translate(-20px, -10px);
                    }
                    10% {
                        clip-path: inset(57% 0 35% 0);
                    }
                    20% {
                        clip-path: inset(10% 0 81% 0);
                        transform: translate(10px, 10px);
                    }
                    30% {
                        clip-path: inset(40% 0 40% 0);
                    }
                    40% {
                        clip-path: inset(54% 0 8% 0);
                        transform: translate(-10px, 5px);
                    }
                    50% {
                        clip-path: inset(93% 0 2% 0);
                    }
                    60% {
                        clip-path: inset(2% 0 91% 0);
                        transform: translate(10px, -10px);
                    }
                    70% {
                        clip-path: inset(77% 0 19% 0);
                    }
                    80% {
                        clip-path: inset(23% 0 45% 0);
                        transform: translate(-15px, 0);
                    }
                    90% {
                        clip-path: inset(69% 0 15% 0);
                    }
                    100% {
                        clip-path: inset(0 0 0 0);
                        transform: translate(0, 0);
                    }
                }
            `}</style>
        </section>
    );
}
