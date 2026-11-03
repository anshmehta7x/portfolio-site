"use client";

import ScreenFrame from "@/components/screens/ScreenFrame";
import { DataIcon } from "@/components/screens/DataIcon";
import { contactLinks, resume } from "@/data/contact";
import { trainer } from "@/data/trainer";
import { achievements } from "@/data/achievements";
import { projectsData } from "@/data/projects";

const ACCENT = "#c83828";

function CardStat({ label, value }) {
    return (
        <div className="flex items-baseline justify-between border-b-2 border-dashed border-black/15 py-1">
            <dt className="text-base opacity-70">{label}</dt>
            <dd className="text-xl">{value}</dd>
        </div>
    );
}

// Resume + contact as a FireRed Trainer Card.
export default function TrainerCardScreen({ onClose, isConstrained = false }) {
    return (
        <ScreenFrame title="TRAINER CARD" accent={ACCENT} isConstrained={isConstrained} onClose={onClose} footer="B BACK">
            <div className="mx-auto flex max-w-3xl flex-col gap-3">
                <div className="rounded-2xl border-4 border-[#704818] bg-[linear-gradient(180deg,#f8e0a0_0%,#f0c868_100%)] p-3 shadow-[0_4px_0_rgba(0,0,0,0.3)] sm:p-5">
                    <div className="flex items-center justify-between border-b-4 border-[#a87830] pb-2">
                        <p className="text-lg">IDNo. {trainer.idNo}</p>
                        <p className="text-lg">TRAINER CARD</p>
                    </div>
                    <div className="mt-3 grid gap-4 sm:grid-cols-[1fr_auto]">
                        <dl>
                            <CardStat label="NAME" value={trainer.name} />
                            <CardStat label="CLASS" value={trainer.title.toUpperCase()} />
                            <CardStat label="POKEDEX" value={projectsData.length} />
                            <CardStat label="BADGES" value={achievements.length} />
                        </dl>
                        <a
                            href={resume.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="fr-box flex min-h-[44px] flex-col items-center justify-center gap-1 self-center rounded-lg px-4 py-3 text-xl"
                        >
                            <DataIcon name="FileText" size={28} />
                            RESUME PDF
                        </a>
                    </div>
                    <ul className="mt-3 space-y-0.5 font-sans text-sm [text-shadow:none] sm:text-base">
                        {trainer.lines.map((line) => (
                            <li key={line}>{line}</li>
                        ))}
                    </ul>
                </div>
                <ul className="grid gap-2 sm:grid-cols-3" aria-label="Contact">
                    {contactLinks.map((link) => (
                        <li key={link.label}>
                            <a
                                href={link.href}
                                target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                                rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                                className="fr-box flex min-h-[44px] items-center gap-3 rounded-lg px-3 py-2"
                            >
                                <DataIcon name={link.icon} size={22} />
                                <span className="min-w-0">
                                    <span className="block text-lg">{link.label.toUpperCase()}</span>
                                    <span className="block break-all font-sans text-xs [text-shadow:none] sm:text-sm">{link.display}</span>
                                </span>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </ScreenFrame>
    );
}
