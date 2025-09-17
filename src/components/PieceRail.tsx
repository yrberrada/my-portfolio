"use client";

import { goTo } from "@/utils/scroll";

const items = [
    { icon: "♛", label: "Projects", to: "projects" },
    { icon: "♜", label: "Skills",   to: "skills" },
    { icon: "♚", label: "About",    to: "about" },
    { icon: "♝", label: "Education",to: "education" },
    { icon: "♟", label: "Contact",  to: "contact" },
];

export default function PieceRail() {
    return (
        <div className="hidden md:flex flex-col gap-2 pr-4">
            {items.map((it) => (
                <button
                    key={it.to}
                    onClick={() => goTo(it.to)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-panel border border-panel hover:bg-white/10"
                    title={it.label}
                >
                    <span className="text-lg">{it.icon}</span>
                    <span className="text-sm">{it.label}</span>
                </button>
            ))}
        </div>
    );
}
