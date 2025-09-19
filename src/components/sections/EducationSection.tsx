// src/components/sections/EducationSection.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";
import { textVariant, fadeIn } from "@/lib/motion";
import dynamic from "next/dynamic";

const StaticPiece = dynamic(() => import("@/components/canvas/StaticPiece"), { ssr: false });

const COURSEWORK = [
    "Operating Systems",
    "DBMS",
    "Artificial Intelligence",
    "Computer Architecture",
    "Security",
];

export default function EducationSection() {
    return (
        <SectionWrapper id="education">
            {/* Header */}
            <div className="mb-6">
                <motion.h2
                    variants={textVariant(0.1)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    className="text-2xl font-semibold"
                    style={{ color: "var(--accent)" }}
                >
                    Education
                </motion.h2>
            </div>

            {/* Two-column: left content, right bishop */}
            <div className="grid gap-6 lg:grid-cols-[1fr,40%] items-start">
                {/* LEFT: your original card + perspective bridge */}
                <motion.div
                    variants={fadeIn("", "tween", 0.15, 0.85)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.25 }}
                    className="space-y-4"
                >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 rounded-xl border border-panel bg-panel p-4">
                        <div className="shrink-0 rounded-lg overflow-hidden border border-panel p-1 bg-black/10">
                            <Image
                                src="/images/logos/UMN-Duluth-Wordmark-Stacked-Maroon.svg"
                                alt="University of Minnesota Duluth"
                                width={56}
                                height={56}
                                className="object-contain"
                            />
                        </div>

                        <div className="space-y-1">
                            <div className="font-medium">
                                B.S., Computer Science{" "}
                                <span className="text-muted">(Minor: Mathematics)</span>
                            </div>
                            <div className="text-sm text-muted">
                                University of Minnesota Duluth • 2019 – 2025 • Duluth, MN
                            </div>

                            <div className="mt-2 flex flex-wrap gap-2">
                                {COURSEWORK.map((c) => (
                                    <span key={c} className="badge">
                    {c}
                  </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Perspective line linking the piece & studies */}
                    <p className="text-sm text-muted">
                        Like a bishop cutting diagonally across the board, my education gave me{" "}
                        <span className="text-white">perspective</span>—seeing across layers and connecting
                        ideas from different angles to move with intent.
                    </p>
                </motion.div>

                {/* RIGHT: horizontal bishop, fills width */}
                <motion.div
                    variants={fadeIn("", "tween", 0.15, 0.85)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.25 }}
                    className="rounded-2xl border border-panel bg-panel p-4"
                >
                    <StaticPiece
                        modelPath="/models/Bishop_white.glb"
                        className="w-full h-[260px] sm:h-[320px] md:h-[380px]"
                        orientation="horizontal"     // laid on its side
                        fit="width"                   // fills the width, clamps by height
                        controls={false}              // no manual controls here
                        autoRotate={true}             // subtle idle motion
                        localAutoRotateSpeed={0.16}
                    />
                </motion.div>
            </div>
        </SectionWrapper>
    );
}
