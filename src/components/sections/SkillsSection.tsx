// src/components/sections/SkillsSection.tsx
"use client";

import { motion } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";
import { textVariant, fadeIn } from "@/lib/motion";
import skills from "@/content/skills.json";
import dynamic from "next/dynamic";

const ChessPiece = dynamic(() => import("@/components/ChessPiece"), { ssr: false });

type SkillGroup = { group: string; items: string[] };
const data = skills as unknown as SkillGroup[];

export default function SkillsSection() {
    return (
        <SectionWrapper id="skills">
            <div className="grid lg:grid-cols-[96px_1fr_96px] items-start gap-4 mb-6">
                <div className="hidden lg:flex justify-center">
                    <ChessPiece piece="rook" className="w-24 h-24" scale={1.1} ariaLabel="Rook" />
                </div>

                <div>
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
                        variants={fadeIn("", "tween", 0.2, 0.8)}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.2 }}
                        className="text-muted mb-2 max-w-3xl"
                    >
                        A mix of technical expertise and collaborative experience across software
                        engineering and computer science.
                    </motion.p>
                </div>

                <div className="hidden lg:flex justify-center">
                    <ChessPiece piece="rook" className="w-24 h-24" scale={1.1} ariaLabel="Rook" />
                </div>
            </div>

            <motion.div
                variants={fadeIn("", "tween", 0.3, 0.8)}
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
        </SectionWrapper>
    );
}
