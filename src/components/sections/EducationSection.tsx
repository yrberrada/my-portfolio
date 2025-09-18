// src/components/sections/EducationSection.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";
import { textVariant, fadeIn } from "@/lib/motion";
import dynamic from "next/dynamic";

const ChessPiece = dynamic(() => import("@/components/ChessPiece"), { ssr: false });

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
            <div className="grid lg:grid-cols-[96px_1fr_96px] items-start gap-4 mb-6">
                <div className="hidden lg:flex justify-center">
                    <ChessPiece piece="bishop" className="w-24 h-24" scale={1.05} ariaLabel="Bishop" />
                </div>

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

                <div className="hidden lg:flex justify-center">
                    <ChessPiece piece="bishop" className="w-24 h-24" scale={1.05} ariaLabel="Bishop" />
                </div>
            </div>

            <motion.div
                variants={fadeIn("", "tween", 0.2, 0.8)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 rounded-xl border border-panel bg-panel p-4"
            >
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
                        B.S., Computer Science <span className="text-muted">(Minor: Mathematics)</span>
                    </div>
                    <div className="text-sm text-muted">
                        University of Minnesota Duluth • 2019 – 2025 • Duluth, MN
                    </div>

                    <div className="mt-2 flex flex-wrap gap-2">
                        {COURSEWORK.map((c) => (
                            <span key={c} className="badge">{c}</span>
                        ))}
                    </div>
                </div>
            </motion.div>
        </SectionWrapper>
    );
}
