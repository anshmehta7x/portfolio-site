"use client";

import ScreenFrame from "@/components/screens/ScreenFrame";
import useListCursor from "@/components/screens/useListCursor";
import { DataIcon } from "@/components/screens/DataIcon";
import TextBox from "@/components/ui/TextBox";
import { achievements } from "@/data/achievements";

const ACCENT = "#a87830";
const COLUMNS = 4;

// Badge face colour by achievement category.
const BADGE_COLORS = {
    Professional: "#e05838",
    Education: "#58a0d0",
    Achievement: "#f8c030",
    Leadership: "#70b858",
};

// Achievements as a badge case: a grid of badges; the selected one's details
// show in a text box underneath. D-pad moves around the grid.
export default function BadgeCaseScreen({ onClose, isConstrained = false }) {
    const [cursor, setCursor] = useListCursor(achievements.length, { columns: COLUMNS });
    const badge = achievements[cursor];

    return (
        <ScreenFrame title="BADGES" accent={ACCENT} isConstrained={isConstrained} onClose={onClose} footer="CHOOSE A BADGE   B BACK">
            <div className="flex flex-col gap-3">
                <ul className="grid grid-cols-4 gap-2 rounded-xl border-4 border-[#704818] bg-[#c89858] p-3 shadow-[inset_0_4px_0_rgba(0,0,0,0.2)]">
                    {achievements.map((item, index) => (
                        <li key={item.id} className="flex justify-center">
                            <button
                                type="button"
                                onClick={() => setCursor(index)}
                                aria-label={item.title}
                                aria-current={cursor === index}
                                className={`flex h-14 w-14 items-center justify-center rounded-full border-4 sm:h-20 sm:w-20 ${
                                    cursor === index ? "border-white ring-4 ring-[#383020]" : "border-[#383020]"
                                }`}
                                style={{
                                    backgroundColor: BADGE_COLORS[item.category] || "#d0d0c8",
                                    boxShadow: "inset -4px -4px 0 rgba(0,0,0,0.25), inset 4px 4px 0 rgba(255,255,255,0.35)",
                                }}
                            >
                                <DataIcon name={item.icon} size={26} className="text-[#383020]" />
                            </button>
                        </li>
                    ))}
                </ul>
                <div>
                    <TextBox lines={[badge.title.toUpperCase()]} showMoreArrow={false} />
                    <div className="fr-box mt-2 rounded-lg px-4 py-3">
                        <p className="text-sm opacity-70">{badge.category.toUpperCase()}</p>
                        {badge.description.split("\n").map((line) => (
                            <p key={line} className="font-sans text-sm leading-relaxed [text-shadow:none] sm:text-base">
                                {line}
                            </p>
                        ))}
                        <ul className="mt-2 flex flex-wrap gap-1.5">
                            {badge.highlights.map((highlight) => (
                                <li key={highlight} className="rounded border-2 border-black/30 bg-[#f8e8b0] px-2 text-sm uppercase">
                                    {highlight}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </ScreenFrame>
    );
}
