// src/components/sections/HeroSection.tsx
"use client";

import { motion } from "framer-motion";
import { textVariant, fadeIn } from "@/lib/motion";
import Link from "next/link";
import dynamic from "next/dynamic";

// morphing pawn/queen/rook… crossfade on the right
const PawnMorph = dynamic(() => import("@/components/PawnMorph"), { ssr: false });

export default function HeroSection() {
    return (
        <section id="home" className="relative w-full min-h-screen flex items-center">
            <div className="w-full grid grid-cols-1 lg:grid-cols-2">
                {/* LEFT: text */}
                <div className="px-6 lg:px-12 flex flex-col justify-center">
                    <motion.h1
                        variants={textVariant(0.05)}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.3 }}
                        className="text-5xl sm:text-6xl font-extrabold leading-[1.1] tracking-tight"
                    >
                        Hi, I’m{" "}
                        <span style={{ color: "var(--accent)" }}>
              Yassine Berrada Rekhami
            </span>
                        <br />
                        Software Developer
                    </motion.h1>

                    <motion.div
                        variants={fadeIn("", "tween", 0.15, 0.8)}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.3 }}
                        className="mt-6 h-1 w-28 rounded bg-white/10"
                    />

                    <motion.p
                        variants={fadeIn("", "tween", 0.2, 0.9)}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.35 }}
                        className="mt-6 max-w-2xl text-lg text-muted"
                    >
                        I’m a Computer Science graduate with hands-on experience in{" "}
                        <span className="text-white font-medium">
              Flutter, Firebase, Python, and C++
            </span>
                        . I approach building software like chess: every move is intentional,
                        guided by strategy, foresight, and clean execution. I love turning vague
                        ideas into elegant, pragmatic systems — shaping experiences that feel
                        simple on the surface and solid underneath.
                        <br />
                        <br />
                        My work spans product UI, backend data flows, and efficient infrastructure.
                        I care deeply about craft: readable code, resilient architecture, and
                        shipping with momentum. If you’re excited by thoughtful engineering and
                        clear results, we’ll get along.
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        variants={fadeIn("", "tween", 0.25, 0.8)}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.35 }}
                        className="mt-8 flex flex-wrap gap-4"
                    >
                        <Link
                            href="/resume.pdf"
                            target="_blank"
                            className="inline-flex items-center gap-3 rounded-xl bg-[var(--accent)] px-6 py-3 font-semibold text-black shadow hover:opacity-90 transition"
                        >
                            <span>📄</span> Resume
                        </Link>

                        <button
                            onClick={() => {
                                const el = document.getElementById("contact");
                                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                            }}
                            className="inline-flex items-center gap-3 rounded-xl border border-panel bg-panel px-6 py-3 text-white hover:bg-white/5 transition"
                        >
                            <span>✉️</span> Contact Me
                        </button>
                    </motion.div>
                </div>

                {/* RIGHT: morphing pawn */}
                <div className="flex items-center justify-center bg-panel border-l border-panel p-6">
                    <motion.div
                        variants={fadeIn("", "tween", 0.15, 0.8)}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.25 }}
                        className="w-full flex items-center justify-center"
                    >
                        <PawnMorph
                            intervalMs={3000}
                            className="w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] lg:w-[420px] lg:h-[420px]"
                            orientation="upright"
                            fit="height"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
