// src/components/sections/EducationSection.tsx
"use client";

import { motion } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";
import { textVariant, fadeIn } from "@/lib/motion";

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

            <motion.ul
                variants={fadeIn("", "tween", 0.2, 0.8)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="space-y-4"
            >
                <li>
                    <span className="font-medium">B.Sc. in Computer Science</span> — University of Minnesota Duluth
                    <br />
                    <span className="text-muted text-sm">Graduated May 2025, Minor in Mathematics</span>
                </li>
            </motion.ul>
        </SectionWrapper>
    );
}
