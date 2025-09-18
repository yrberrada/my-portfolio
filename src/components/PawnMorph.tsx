"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Load lazily to keep SSR clean
const ChessPiece = dynamic(() => import("@/components/ChessPiece"), { ssr: false });

const cycle: Array<"pawn" | "queen" | "rook" | "bishop" | "knight"> = [
    "pawn",
    "queen",
    "rook",
    "bishop",
    "knight",
];

export default function PawnMorph({
                                      intervalMs = 3500,
                                  }: {
    intervalMs?: number;
}) {
    const [i, setI] = useState(0);

    useEffect(() => {
        const t = setInterval(() => setI((prev) => (prev + 1) % cycle.length), intervalMs);
        return () => clearInterval(t);
    }, [intervalMs]);

    return (
        <div className="relative">
            {/* simple crossfade */}
            <div className="transition-opacity duration-500 opacity-100">
                <ChessPiece piece={cycle[i]} className="w-28 h-28" ariaLabel="Transforming pawn" />
            </div>
        </div>
    );
}
