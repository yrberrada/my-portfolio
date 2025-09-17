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
                Curious and adaptable problem-solver with a B.S. in Computer Science and a
                minor in Mathematics. Experienced in building mobile apps with Flutter and
                Firebase, exploring AI algorithms, and applying data analysis to create
                meaningful solutions. I thrive at the intersection of technology and people,
                combining analytical thinking with creativity to tackle challenges from
                multiple angles. Currently seeking a Software Developer role in an
                environment that values innovation, collaboration, and impact.
            </motion.p>

        </SectionWrapper>
    );
}
