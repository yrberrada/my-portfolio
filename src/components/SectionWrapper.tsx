"use client";

import { motion } from "framer-motion";
import { staggerContainer } from "@/lib/motion";

export default function SectionWrapper({
                                           id,
                                           className = "",
                                           children,
                                       }: {
    id: string;
    className?: string;
    children: React.ReactNode;
}) {
    return (
        <section id={id} className={`container py-20 ${className}`}>
            <motion.div
                variants={staggerContainer(0.12, 0)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
            >
                {children}
            </motion.div>
        </section>
    );
}
