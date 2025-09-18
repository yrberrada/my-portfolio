// src/components/sections/PieceRail.tsx
"use client";

import dynamic from "next/dynamic";
import clsx from "clsx";

// lazy load Canvas on client only
const ChessPiece = dynamic(() => import("@/components/ChessPiece"), { ssr: false });

type Props = {
    piece: "pawn" | "rook" | "knight" | "bishop" | "queen" | "king";
    side?: "left" | "right";
    /** sticky = great if parents don't clip overflow; absolute = use if they do */
    mode?: "sticky" | "absolute";
    scale?: number;
    showOnMobile?: boolean;
    className?: string;
};

export default function PieceRail({
                                      piece,
                                      side = "right",
                                      mode = "sticky",
                                      scale = 1.1,
                                      showOnMobile = false,
                                      className,
                                  }: Props) {
    return (
        <div
            className={clsx(
                "shrink-0", // keep a stable width
                showOnMobile ? "block" : "hidden md:block",
                "w-24 h-fit",
                side === "right" ? "md:ml-6" : "md:mr-6",
                mode === "sticky" ? "sticky top-24 self-start" : "absolute top-6",
                side === "right" && mode === "absolute" && "right-0",
                side === "left" && mode === "absolute" && "left-0",
                "pointer-events-none select-none", // decorative
                className
            )}
        >
            <ChessPiece piece={piece} scale={scale} className="w-24 h-24" ariaLabel={`${piece} decoration`} />
        </div>
    );
}
