"use client";

import { motion } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";
import { textVariant, fadeIn } from "@/lib/motion";
import ProjectCard from "@/components/ProjectCard";
import projects from "@/content/projects.json";
import dynamic from "next/dynamic";

const StaticPiece = dynamic(() => import("@/components/canvas/StaticPiece"), {
    ssr: false,
});

export default function ProjectsSection() {
    const data = projects as any[];

    return (
        <SectionWrapper id="projects">
            <div className="mx-auto max-w-6xl px-4 md:px-6">
                {/* ---- heading ---- */}
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
                    className="text-muted max-w-3xl mb-6"
                >
                    The Queen embodies <span className="text-white font-semibold">versatility</span>
                    and <span className="text-white font-semibold">creativity</span> — this section
                    showcases breadth, problem-solving, and clear execution across software engineering.
                </motion.p>


                {/* ---- full-width piece band ---- */}
                <div className="w-full h-64 sm:h-72 rounded-xl border border-panel bg-panel mb-8 flex items-center justify-center">
                    <StaticPiece
                        modelPath="/models/Queen_white.glb"
                        className="w-full h-[300px]"
                        orientation="horizontal"
                        fit="width"
                        // movement
                        autoRotate
                        localAutoRotateSpeed={0.2}   // if controls=false
                        // controls (like the board)
                        controls
                        controlsZoom={false}
                        controlsPan={false}
                        autoRotateSpeed={0.6}        // OrbitControls speed
                    />



                </div>

                {/* ---- cards grid: 1 / 2 / 3 columns ---- */}
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
            </div>
        </SectionWrapper>
    );
}
