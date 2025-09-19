// src/components/sections/SkillsSection.tsx
"use client";

import { motion } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";
import { textVariant, fadeIn } from "@/lib/motion";
import skills from "@/content/skills.json";
import dynamic from "next/dynamic";

const StaticPiece = dynamic(() => import("@/components/canvas/StaticPiece"), {
    ssr: false,
});

type SkillGroup = { group: string; items: string[] };
const data = skills as unknown as SkillGroup[];

export default function SkillsSection() {
    return (
        <SectionWrapper id="skills">
            <div className="mx-auto max-w-6xl px-4 md:px-6">
                <motion.h2
                    variants={textVariant(0.1)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    className="text-2xl font-semibold mb-2"
                    style={{ color: "var(--accent)" }}
                >
                    Skills
                </motion.h2>

                <motion.p
                    variants={fadeIn("", "tween", 0.15, 0.75)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    className="text-muted max-w-3xl mb-6"
                >
                    The Rook represents <span className="text-white font-semibold">structure</span> and{" "}
                    <span className="text-white font-semibold">defense</span> — a solid foundation of technical expertise and collaborative
                    experience across software engineering and computer science.
                </motion.p>



                {/* --- full-width rook band on TOP --- */}
                <div className="w-full h-64 sm:h-72 md:h-80 rounded-xl border border-panel bg-panel mb-8 flex items-center justify-center">
                    <StaticPiece
                        modelPath="/models/Rook_white.glb"
                        className="w-full h-full"
                        orientation="horizontal"
                        fit="width"
                        /* movement + manual rotate; no zoom/pan */
                        controls
                        controlsZoom={false}
                        controlsPan={false}
                        autoRotate
                        autoRotateSpeed={0.6}
                    />
                </div>

                {/* --- skills grid from JSON --- */}
                <motion.div
                    variants={fadeIn("", "tween", 0.25, 0.8)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {data.map((g, idx) => (
                        <div key={idx} className="rounded-xl border border-panel bg-panel p-4">
                            <h3 className="font-semibold mb-3">{g.group}</h3>
                            <div className="flex flex-wrap gap-2">
                                {g.items.map((name) => (
                                    <span
                                        key={name}
                                        className="text-xs px-2 py-1 rounded bg-white/10 border border-panel"
                                    >
                    {name}
                  </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </SectionWrapper>
    );
}
