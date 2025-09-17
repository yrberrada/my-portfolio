// src/components/sections/AboutSection.tsx
"use client";

import { motion } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";
import { textVariant, fadeIn } from "@/lib/motion";

export default function AboutSection() {
    return (
        <SectionWrapper id="about">
            <motion.h2
                variants={textVariant(0.1)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="text-2xl font-semibold mb-3"
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
                I’m a Computer Science graduate with a strong background in both theory and
                practice. My journey includes building applications in Flutter and Firebase,
                developing Android apps in Java, exploring AI and data analysis, and writing
                research papers on cutting-edge topics like brain implants and augmented
                reality for accessibility.
                <br />
                <br />
                Beyond coding, I approach problem-solving like a game of chess: evaluating
                options, planning ahead, and making creative yet pragmatic moves.
            </motion.p>
        </SectionWrapper>
    );
}
