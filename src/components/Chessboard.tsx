"use client";

import { goTo } from "@/utils/scroll";
import { useEffect, useState } from "react";

/**
 * MVP chess: Sketchfab iframe + overlay buttons (hotspots).
 * Later you can replace this with React Three Fiber for real piece clicks.
 */
export default function Chessboard() {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setReady(true), 300);
        return () => clearTimeout(t);
    }, []);

    return (
        <div className="relative w-full h-[420px] sm:h-[480px] rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black/40">
            <iframe
                title="Wooden Chess Set"
                className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${ready ? "opacity-100" : "opacity-0"}`}
                src="https://sketchfab.com/models/90151fb0fb294e56b45e52b001a884db/embed?autostart=1&autospin=1&ui_infos=0&ui_watermark=0&ui_watermark_link=0&ui_hint=0"
                allow="autoplay; fullscreen; xr-spatial-tracking"
            />

            {/* Hotspots — tweak top/left % to sit nicely over the board */}
            <button
                aria-label="Go to Projects"
                onClick={() => goTo("projects")}
                className="absolute top-[46%] left-[60%] -translate-x-1/2 -translate-y-1/2
                   px-3 py-1.5 text-xs sm:text-sm rounded-md
                   bg-white/15 hover:bg-white/25 text-white backdrop-blur
                   border border-white/10 shadow"
            >
                ♛ Projects
            </button>

            <button
                aria-label="Go to Skills"
                onClick={() => goTo("skills")}
                className="absolute top-[65%] left-[72%] -translate-x-1/2 -translate-y-1/2
                   px-3 py-1.5 text-xs sm:text-sm rounded-md
                   bg-white/15 hover:bg-white/25 text-white backdrop-blur
                   border border-white/10 shadow"
            >
                ♜ Skills
            </button>

            <button
                aria-label="Go to About"
                onClick={() => goTo("about")}
                className="absolute top-[52%] left-[44%] -translate-x-1/2 -translate-y-1/2
                   px-3 py-1.5 text-xs sm:text-sm rounded-md
                   bg-white/15 hover:bg-white/25 text-white backdrop-blur
                   border border-white/10 shadow"
            >
                ♚ About
            </button>

            <button
                aria-label="Go to Education"
                onClick={() => goTo("education")}
                className="absolute top-[35%] left-[32%] -translate-x-1/2 -translate-y-1/2
                   px-3 py-1.5 text-xs sm:text-sm rounded-md
                   bg-white/15 hover:bg-white/25 text-white backdrop-blur
                   border border-white/10 shadow"
            >
                ♝ Education
            </button>

            <button
                aria-label="Go to Contact"
                onClick={() => goTo("contact")}
                className="absolute top-[75%] left-[50%] -translate-x-1/2 -translate-y-1/2
                   px-3 py-1.5 text-xs sm:text-sm rounded-md
                   bg-white/15 hover:bg-white/25 text-white backdrop-blur
                   border border-white/10 shadow"
            >
                ♟ Contact
            </button>
        </div>
    );
}
