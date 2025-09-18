"use client";

import { motion } from "framer-motion";
import MinimalChessCanvas from "@/components/canvas/MinimalChessCanvas";
import { fadeIn, textVariant } from "@/lib/motion";

export default function ChessIntro() {
    return (
        <section
            id="chess-intro"
            className="relative w-full flex flex-col items-center justify-center py-16 sm:py-24"
        >
            {/* 3D Chessboard */}
            <div className="w-full max-w-5xl h-[60vh] min-h-[400px] rounded-2xl overflow-hidden border border-panel bg-panel">
                <MinimalChessCanvas />
            </div>


            {/* Tagline under the board */}
            <motion.p
                variants={fadeIn("", "tween", 0.2, 0.9)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                className="mt-8 max-w-2xl text-center text-lg text-muted"
            >
        <span className="font-medium text-white">
          Like chess, software development is about strategy and foresight —
        </span>{" "}
                every line of code is a move toward clarity, elegance, and impact.
            </motion.p>
        </section>
    );
}
