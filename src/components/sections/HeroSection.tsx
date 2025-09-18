// src/components/sections/HeroSection.tsx
"use client";

import { motion } from "framer-motion";
import { textVariant, fadeIn } from "@/lib/motion";

export default function HeroSection() {
    return (
        <section id="hero" className="relative w-full bg-panel">
            <div className="container py-20 sm:py-28">
                <div className="max-w-2xl space-y-6">
                    {/* Headline */}
                    <motion.h1
                        variants={textVariant(0.1)}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.25 }}
                        className="text-4xl sm:text-5xl font-bold leading-tight"
                    >
                        Hi, I’m{" "}
                        <span style={{ color: "var(--accent)" }}>
              Yassine Berrada Rekhami
            </span>
                        <br />
                        <span className="opacity-90">Software Developer</span>
                    </motion.h1>

                    {/* Optional accent underline */}
                    <div className="accent-underline" />

                    {/* Tagline */}
                    <motion.p
                        variants={fadeIn("", "tween", 0.15, 0.8)}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.25 }}
                        className="text-lg text-muted"
                    >
                        Computer Science graduate with hands-on experience in{" "}
                        <span className="font-medium">Flutter, Firebase, Python, and C++</span>.
                        I approach coding like chess: strategy, foresight, and creative problem-solving.
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        variants={fadeIn("", "tween", 0.25, 0.8)}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.25 }}
                        className="flex flex-wrap gap-4"
                    >
                        <a
                            href="/files/resume.pdf"
                            target="_blank"
                            className="px-5 py-2.5 rounded-xl btn-accent font-medium shadow"
                        >
                            📄 Resume
                        </a>
                        <a
                            href="#contact"
                            className="px-5 py-2.5 rounded-xl bg-panel border border-panel"
                        >
                            ✉️ Contact Me
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
