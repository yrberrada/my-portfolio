// src/components/sections/EducationSection.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";
import { textVariant, fadeIn } from "@/lib/motion";

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
            <motion.h2
                variants={textVariant(0.1)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="text-2xl font-semibold mb-6"
            >
                Education
            </motion.h2>

            <motion.div
                variants={fadeIn("", "tween", 0.2, 0.8)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 rounded-xl border border-panel bg-panel p-4"
            >
                {/* Logo */}
                <div className="shrink-0 rounded-lg overflow-hidden border border-panel p-1 bg-black/10">
                    <Image
                        src="/images/logos/UMN-Duluth-Wordmark-Stacked-Maroon.svg"
                        alt="University of Minnesota Duluth"
                        width={56}
                        height={56}
                        className="object-contain"
                        priority={false}
                    />
                </div>

                {/* Text */}
                <div className="space-y-1">
                    <div className="font-medium">
                        B.S., Computer Science <span className="text-muted">(Minor: Mathematics)</span>
                    </div>
                    <div className="text-sm text-muted">
                        University of Minnesota Duluth • 2019 – 2025 • Duluth, MN
                    </div>

                    {/* Coursework badges */}
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
