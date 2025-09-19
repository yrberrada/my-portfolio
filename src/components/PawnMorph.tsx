"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

// Use the same stable, filmic renderer we used elsewhere
const StaticPiece = dynamic(() => import("@/components/canvas/StaticPiece"), { ssr: false });

type PieceName = "pawn" | "queen" | "rook" | "bishop" | "knight";

const PIECE_PATH: Record<PieceName, string> = {
    pawn: "/models/Pawn_white.glb",
    queen: "/models/Queen_white.glb",
    rook: "/models/Rook_white.glb",
    bishop: "/models/Bishop_white.glb",
    knight: "/models/Knight_white.glb",
};

const CYCLE: PieceName[] = ["pawn", "queen", "rook", "bishop", "knight"];

export default function PawnMorph({
                                      intervalMs = 3000,
                                      className = "w-[280px] h-[280px] sm:w-[320px] sm:h-[320px]",
                                      orientation = "upright",   // keep them standing in the hero
                                      fit = "height",            // fill the height of the box nicely
                                  }: {
    intervalMs?: number;
    className?: string;
    orientation?: "upright" | "horizontal";
    fit?: "width" | "height";
}) {
    // We keep two layers and fade between them to avoid flashes.
    const [frontIsA, setFrontIsA] = useState(true);
    const [indexA, setIndexA] = useState(0);
    const [indexB, setIndexB] = useState(1);

    // simple guard so the interval updates the "back" layer before the fade
    const ticking = useRef(false);

    useEffect(() => {
        const id = setInterval(() => {
            if (ticking.current) return;
            ticking.current = true;

            // prepare the back layer with the next index
            const next = (frontIsA ? indexB : indexA) + 1;
            const nextIdx = next % CYCLE.length;

            if (frontIsA) setIndexB(nextIdx);
            else setIndexA(nextIdx);

            // allow the DOM to commit the new back model before we flip opacity
            requestAnimationFrame(() => {
                setFrontIsA((v) => !v);
                // unlock on the next frame to keep the rhythm stable
                requestAnimationFrame(() => (ticking.current = false));
            });
        }, intervalMs);

        return () => clearInterval(id);
    }, [frontIsA, indexA, indexB, intervalMs]);

    const pieceA = CYCLE[indexA];
    const pieceB = CYCLE[indexB];

    return (
        <div className={`relative ${className}`}>
            {/* Layer A */}
            <div
                className={`absolute inset-0 transition-opacity duration-600 ease-out ${
                    frontIsA ? "opacity-100" : "opacity-0"
                }`}
            >
                <StaticPiece
                    modelPath={PIECE_PATH[pieceA]}
                    className="w-full h-full"
                    orientation={orientation}
                    fit={fit}
                    controls={false}
                    autoRotate={false}
                />
            </div>

            {/* Layer B */}
            <div
                className={`absolute inset-0 transition-opacity duration-600 ease-out ${
                    frontIsA ? "opacity-0" : "opacity-100"
                }`}
            >
                <StaticPiece
                    modelPath={PIECE_PATH[pieceB]}
                    className="w-full h-full"
                    orientation={orientation}
                    fit={fit}
                    controls={false}
                    autoRotate={false}
                />
            </div>
        </div>
    );
}
