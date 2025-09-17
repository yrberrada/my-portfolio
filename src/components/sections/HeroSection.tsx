// src/components/sections/HeroSection.tsx
"use client";

import { motion } from "framer-motion";
import { textVariant, fadeIn } from "@/lib/motion";
import MinimalChessCanvas from "@/components/canvas/MinimalChessCanvas"; // direct import

export default function HeroSection() {
    return (
        <section id="hero" className="container py-16 sm:py-24">
            <div className="grid md:grid-cols-12 gap-10 items-center">
                {/* LEFT copy */}
                <div className="md:col-span-6 space-y-6">
                    <motion.h1
                        variants={textVariant(0.1)}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.25 }}
                        className="text-4xl sm:text-5xl font-bold leading-tight"
                    >
                        Hi, I’m <span style={{ color: "var(--accent)" }}>Your Name</span>
                        <br />
                        <span className="opacity-90">Software Developer</span>
                    </motion.h1>

                    <motion.p
                        variants={fadeIn("", "tween", 0.2, 0.8)}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.25 }}
                        className="text-lg text-muted"
                    >
                        I build clear, reliable software with an eye for strategy — just like chess.
                    </motion.p>
                </div>

                {/* RIGHT canvas container with animation */}
                <motion.div
                    variants={fadeIn("up", "spring", 0.25, 1)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    className="md:col-span-6"
                >
                    <div className="relative w-full h-[420px] sm:h-[480px] rounded-2xl overflow-hidden border border-panel bg-panel">
                        <MinimalChessCanvas />
                    </div>
                    <p className="mt-3 text-sm text-muted text-center">
                        Explore the 3D chessboard — scroll or orbit.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
