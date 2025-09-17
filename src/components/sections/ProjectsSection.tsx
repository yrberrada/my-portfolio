"use client";

import { motion } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";
import { textVariant, fadeIn } from "@/lib/motion";
import ProjectCard from "@/components/ProjectCard";
import projects from "@/content/projects.json";

type Project = {
    title: string;
    tagline: string;
    tech: string[];
    links: { github?: string; live?: string };
    image?: string;
};

const data = projects as unknown as Project[];

export default function ProjectsSection() {
    return (
        <SectionWrapper id="projects">
            <motion.h2
                variants={textVariant(0.1)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="text-2xl font-semibold mb-2"
            >
                Projects
            </motion.h2>

            <motion.p
                variants={fadeIn("", "tween", 0.2, 0.8)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="text-muted mb-6"
            >
                Selected work. Each card links to code and/or a live demo.
            </motion.p>

            <motion.div
                variants={fadeIn("", "tween", 0.25, 0.8)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                {data.map((p, i) => <ProjectCard key={i} p={p} />)}
            </motion.div>
        </SectionWrapper>
    );
}
