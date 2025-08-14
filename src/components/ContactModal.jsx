"use client";
import { useEffect } from "react";
import { Mail, Linkedin, Github } from "lucide-react";

export default function ContactModal({
    visibility,
    onClose,
    isConstrained = false,
}) {
    // Close modal on Escape key press
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === "Escape") onClose();
        };

        if (visibility) {
            document.addEventListener("keydown", handleEscape);
            document.body.style.overflow = "hidden"; // Prevent background scroll
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "unset";
        };
    }, [visibility, onClose]);

    const sectionClasses = isConstrained
        ? "absolute inset-0 w-full h-full flex justify-center items-center bg-black/70 backdrop-blur-sm z-50"
        : "fixed inset-0 flex justify-center items-center bg-black/70 backdrop-blur-sm z-[9999] p-4";

    const contentContainerClasses = isConstrained
        ? "bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 border border-slate-600/50 rounded-2xl shadow-2xl w-full h-full flex flex-col backdrop-blur-xl"
        : "bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 border border-slate-600/50 rounded-2xl shadow-2xl w-full max-w-md backdrop-blur-xl transform transition-all duration-300 ease-out";

    const contactLinks = [
        {
            label: "Email",
            href: "mailto:anshkapilmehta@gmail.com",
            display: "anshkapilmehta@gmail.com",
            icon: <Mail color="white" />,
        },
        {
            label: "LinkedIn",
            href: "https://linkedin.com/in/anshmehta",
            display: "linkedin.com/in/anshmehta",
            icon: <Linkedin color="white" />,
        },
        {
            label: "GitHub",
            href: "https://github.com/anshmehta7x",
            display: "github.com/anshmehta7x",
            icon: <Github color="white" />,
        },
    ];

    return (
        <section
            className={`${visibility ? "flex opacity-100" : "hidden opacity-0"} ${sectionClasses} transition-all duration-300 ease-out`}
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div
                className={`${contentContainerClasses} ${visibility ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
            >
                {/* Header */}
                <div className="relative p-6 border-b border-slate-700/50">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 via-purple-600/20 to-pink-600/20 rounded-t-2xl"></div>
                    <div className="relative flex justify-between items-center">
                        <div>
                            <h2 className="text-white font-arcade text-2xl mb-1 tracking-wider">
                                CONTACT
                            </h2>
                            <div className="w-16 h-1 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"></div>
                        </div>
                        <button
                            onClick={onClose}
                            className="group relative w-10 h-10 flex items-center justify-center rounded-full bg-slate-800/50 border border-slate-600/50 text-white hover:bg-red-600/20 hover:border-red-400/50 transition-all duration-200 ease-out"
                            aria-label="Close"
                        >
                            <span className="text-xl group-hover:scale-110 transition-transform duration-200">
                                ×
                            </span>
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-6 space-y-6">
                    {/* Greeting */}
                    <div className="text-center">
                        <p className="text-slate-200 font-bigpixel text-xl mb-2">
                            Let's connect!
                        </p>
                        <p className="text-slate-400 font-bigpixel text-sm">
                            Feel free to reach out through any of these channels
                        </p>
                    </div>

                    {/* Contact Links */}
                    <div className="space-y-4">
                        {contactLinks.map((link, index) => (
                            <div
                                key={link.label}
                                className="group relative"
                                style={{
                                    animationDelay: visibility
                                        ? `${index * 100}ms`
                                        : "0ms",
                                }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-purple-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="relative p-4 rounded-xl border border-slate-700/50 bg-slate-800/30 group-hover:border-slate-600/80 transition-all duration-300 group-hover:transform group-hover:scale-[1.02]">
                                    <div className="flex items-center space-x-3">
                                        <div className="text-2xl md:mr-6 md:ml-6">
                                            {link.icon}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-slate-300 font-arcade text-lg md:text-3xl mb-1">
                                                {link.label}
                                            </p>
                                            <a
                                                href={link.href}
                                                target={
                                                    link.href.startsWith(
                                                        "mailto:",
                                                    )
                                                        ? undefined
                                                        : "_blank"
                                                }
                                                rel={
                                                    link.href.startsWith(
                                                        "mailto:",
                                                    )
                                                        ? undefined
                                                        : "noopener noreferrer"
                                                }
                                                className="text-indigo-400 hover:text-indigo-300 font-mono text-sm md:text-xl break-all transition-colors duration-200 group-hover:underline"
                                            >
                                                {link.display}
                                            </a>
                                        </div>
                                        <div className="text-slate-500 group-hover:text-slate-400 transition-colors duration-200">
                                            →
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Footer Message */}
                </div>
            </div>
        </section>
    );
}
