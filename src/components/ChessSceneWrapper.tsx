"use client";

import dynamic from "next/dynamic";

const ChessScene = dynamic(() => import("./ChessScene"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-[420px] sm:h-[480px] rounded-2xl bg-panel border border-panel" />
    ),
});

export default ChessScene;
