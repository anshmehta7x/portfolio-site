"use client";

import { useState } from "react";
import Image from "next/image";
import ScreenFrame from "@/components/screens/ScreenFrame";
import useListCursor from "@/components/screens/useListCursor";
import Cursor from "@/components/ui/Cursor";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import { projectsData } from "@/data/projects";

const ACCENT = "#d83828";

function splitTitle(title) {
    const [name, ...rest] = title.split(" - ");
    return { name, species: rest.join(" - ") };
}

function entryNumber(index) {
    return `No.${String(index + 1).padStart(3, "0")}`;
}

function PokedexMedia({ project }) {
    const reducedMotion = usePrefersReducedMotion();
    const fit = project.mediaFit === "contain" ? "object-contain" : "object-cover";
    if (project.mediaType === "video") {
        return (
            <video
                key={project.media}
                src={project.media}
                autoPlay={!reducedMotion}
                controls={reducedMotion}
                loop
                muted
                playsInline
                preload="metadata"
                className={`h-full w-full ${fit}`}
            />
        );
    }
    return <Image src={project.media} alt={`${project.title} screenshot`} fill className={fit} sizes="(min-width: 768px) 50vw, 100vw" />;
}

function PokedexEntry({ project, index }) {
    const { name, species } = splitTitle(project.title);
    return (
        <article className="flex h-full flex-col gap-3">
            <div className="relative aspect-video w-full overflow-hidden rounded-md border-4 border-[#484848] bg-black">
                <PokedexMedia project={project} />
            </div>
            <div className="fr-box rounded-lg px-3 py-2">
                <p className="text-sm opacity-70">{entryNumber(index)}</p>
                <h3 className="text-2xl leading-tight sm:text-3xl">{name}</h3>
                {species && <p className="text-base text-[#d83828] sm:text-lg">{species}</p>}
            </div>
            <ul className="flex flex-wrap gap-1.5" aria-label="Tech stack">
                {project.techStack.map((tech) => (
                    <li key={tech} className="rounded border-2 border-black/40 bg-[#f8d030] px-2 text-sm uppercase text-[#383020]">
                        {tech}
                    </li>
                ))}
            </ul>
            <div className="fr-box rounded-lg px-3 py-2">
                <p className="font-sans text-sm leading-relaxed [text-shadow:none] sm:text-base">{project.description}</p>
            </div>
            <div className="flex flex-wrap gap-2">
                {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="fr-box flex min-h-[44px] items-center rounded-md px-3 text-lg">
                        {(project.liveUrlText || "Live demo").toUpperCase()}
                    </a>
                )}
                {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="fr-box flex min-h-[44px] items-center rounded-md px-3 text-lg">
                        SOURCE
                    </a>
                )}
            </div>
        </article>
    );
}

// Projects as Pokédex entries. Desktop: list + entry side by side.
// Phones: list first; A/tap opens the entry, B goes back to the list.
export default function PokedexScreen({ onClose, isConstrained = false }) {
    const split = isConstrained;
    const [openEntry, setOpenEntry] = useState(null);

    const [cursor, setCursor] = useListCursor(projectsData.length, {
        onButton: (button, current) => {
            if (!split && openEntry === null && button === "a") {
                setOpenEntry(current);
                return true;
            }
            if (!split && openEntry !== null && button === "b") {
                setOpenEntry(null);
                return true;
            }
            return false;
        },
    });

    const list = (
        <ol className="fr-box rounded-lg py-1">
            {projectsData.map((project, index) => (
                <li key={project.title}>
                    <button
                        type="button"
                        onClick={() => {
                            setCursor(index);
                            if (!split) {
                                setOpenEntry(index);
                            }
                        }}
                        onMouseEnter={() => split && setCursor(index)}
                        aria-current={cursor === index}
                        className={`flex min-h-[44px] w-full items-center gap-2 px-2 text-left text-lg ${
                            cursor === index ? "bg-[#f8e8b0]" : ""
                        }`}
                    >
                        <Cursor visible={cursor === index} />
                        <span className="w-14 shrink-0 text-sm opacity-70">{entryNumber(index)}</span>
                        <span className="truncate">{splitTitle(project.title).name.toUpperCase()}</span>
                    </button>
                </li>
            ))}
        </ol>
    );

    return (
        <ScreenFrame
            title="POKEDEX"
            accent={ACCENT}
            isConstrained={isConstrained}
            onClose={!split && openEntry !== null ? () => setOpenEntry(null) : onClose}
            footer={split ? "CHOOSE AN ENTRY   B BACK" : openEntry === null ? "CHOOSE AN ENTRY   B BACK" : "B BACK TO LIST"}
        >
            {split ? (
                <div className="grid h-full grid-cols-[minmax(14rem,18rem)_1fr] gap-4">
                    <div>{list}</div>
                    <PokedexEntry project={projectsData[cursor]} index={cursor} />
                </div>
            ) : openEntry === null ? (
                list
            ) : (
                <PokedexEntry project={projectsData[cursor]} index={cursor} />
            )}
        </ScreenFrame>
    );
}
