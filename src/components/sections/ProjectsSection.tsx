// src/components/sections/ProjectsSection.tsx
"use client";

import { motion } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";
import { textVariant, fadeIn } from "@/lib/motion";
import ProjectCard from "@/components/ProjectCard";
import projects from "@/content/projects.json";
import dynamic from "next/dynamic";

const ChessPiece = dynamic(() => import("@/components/ChessPiece"), { ssr: false });

export default function ProjectsSection() {
    const data = projects as any[];

    return (
        <SectionWrapper id="projects">
            {/* Header band: left piece | copy | right piece */}
            <div className="grid lg:grid-cols-[96px_1fr_96px] items-start gap-4 mb-6">
                {/* left */}
                <div className="hidden lg:flex justify-center">
                    <ChessPiece piece="queen" className="w-24 h-24" scale={1.05} ariaLabel="Queen" />
                </div>

                {/* center copy */}
                <div>
                    <motion.h2
                        variants={textVariant(0.1)}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.2 }}
                        className="text-2xl font-semibold mb-2"
                        style={{ color: "var(--accent)" }}
                    >
                        Projects
                    </motion.h2>
                    <motion.p
                        variants={fadeIn("", "tween", 0.15, 0.75)}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.2 }}
                        className="text-muted max-w-3xl"
                    >
                        The Queen embodies versatility and power — this section showcases breadth,
                        problem-solving, and creative execution across software engineering.
                    </motion.p>
                </div>

                {/* right */}
                <div className="hidden lg:flex justify-center">
                    <ChessPiece piece="queen" className="w-24 h-24" scale={1.05} ariaLabel="Queen" />
                </div>
            </div>

            {/* Grid of cards */}
            <motion.div
                variants={fadeIn("", "tween", 0.2, 0.8)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
                {data.map((p, idx) => (
                    <ProjectCard key={idx} p={p} />
                ))}
            </motion.div>
        </SectionWrapper>
    );
}
