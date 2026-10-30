"use client";

import ScreenFrame from "@/components/screens/ScreenFrame";
import useListCursor from "@/components/screens/useListCursor";
import { DataIcon } from "@/components/screens/DataIcon";
import Cursor from "@/components/ui/Cursor";
import { skillsData } from "@/data/skills";

const ACCENT = "#3878a8";

// Skills as a party/moves screen: each category is a party slot, its skills
// are that slot's moves. UP/DOWN (or tap) switches category.
export default function MovesScreen({ onClose, isConstrained = false }) {
    const [cursor, setCursor] = useListCursor(skillsData.length);
    const active = skillsData[cursor];

    return (
        <ScreenFrame title="MOVES" accent={ACCENT} isConstrained={isConstrained} onClose={onClose} footer="CHOOSE A GROUP   B BACK">
            <div className="grid gap-3 md:grid-cols-[minmax(13rem,16rem)_1fr]">
                <ul className="flex gap-2 overflow-x-auto pb-1 md:flex-col md:overflow-visible" aria-label="Skill groups">
                    {skillsData.map((group, index) => (
                        <li key={group.category} className="shrink-0">
                            <button
                                type="button"
                                onClick={() => setCursor(index)}
                                aria-current={cursor === index}
                                className={`flex min-h-[44px] w-full items-center gap-2 rounded-lg border-4 px-2 py-1 text-left text-lg ${
                                    cursor === index ? "border-[#f8d030] bg-[#58a0d0] text-white" : "border-[#486078] bg-[#88b8d8] text-[#203040]"
                                }`}
                            >
                                <Cursor visible={cursor === index} className="hidden md:block" />
                                <span className="h-3 w-3 shrink-0 rounded-full border-2 border-black/40" style={{ backgroundColor: group.color }} />
                                <span className="whitespace-nowrap">{group.category.toUpperCase()}</span>
                                <span className="ml-auto pl-2 text-sm opacity-80">x{group.skills.length}</span>
                            </button>
                        </li>
                    ))}
                </ul>
                <div className="fr-box rounded-lg p-2">
                    <p className="px-2 pb-2 text-base opacity-70">
                        {active.category.toUpperCase()} KNOWS {active.skills.length} MOVES
                    </p>
                    <ul className="grid gap-1 sm:grid-cols-2">
                        {active.skills.map((skill) => (
                            <li key={skill.name} className="flex min-h-[44px] items-center gap-3 rounded-md border-2 border-black/10 bg-white px-3">
                                <DataIcon name={skill.icon} size={20} style={{ color: active.color }} className="drop-shadow-[1px_1px_0_rgba(0,0,0,0.4)]" />
                                <span className="text-lg uppercase">{skill.name}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </ScreenFrame>
    );
}
