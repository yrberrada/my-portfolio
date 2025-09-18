// src/components/sections/AboutSection.tsx
"use client";

import { motion } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";
import { textVariant, fadeIn } from "@/lib/motion";
import dynamic from "next/dynamic";

const PawnMorph = dynamic(() => import("@/components/PawnMorph"), { ssr: false });

export default function AboutSection() {
    return (
        <SectionWrapper id="about">
            <div className="grid lg:grid-cols-[96px_1fr_96px] items-start gap-4 mb-6">
                <div className="hidden lg:flex justify-center">
                    <PawnMorph className="w-24 h-24" />
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
                        About Me
                    </motion.h2>
                    <motion.p
                        variants={fadeIn("", "tween", 0.2, 0.8)}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.2 }}
                        className="text-muted max-w-3xl"
                    >
                        I start humble like a pawn — but with creativity and ambition, I transform into
                        whatever the problem needs. That mindset drives how I learn, build, and collaborate.
                    </motion.p>
                </div>

                <div className="hidden lg:flex justify-center">
                    <PawnMorph className="w-24 h-24" />
                </div>
            </div>

            <motion.p
                variants={fadeIn("", "tween", 0.25, 0.8)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="text-muted max-w-3xl"
            >
                Curious and adaptable problem-solver with a B.S. in Computer Science and a minor in Mathematics.
                Experienced in building mobile apps with Flutter & Firebase, exploring AI algorithms, and applying
                data analysis to create meaningful solutions. I thrive at the intersection of technology and people —
                combining analytical thinking with creativity to tackle challenges from multiple angles.
            </motion.p>
        </SectionWrapper>
    );
}
