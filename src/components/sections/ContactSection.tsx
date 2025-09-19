// src/components/sections/ContactSection.tsx
"use client";

import { motion } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";
import { textVariant, fadeIn } from "@/lib/motion";
import dynamic from "next/dynamic";

const StaticPiece = dynamic(() => import("@/components/canvas/StaticPiece"), { ssr: false });

export default function ContactSection() {
    return (
        <SectionWrapper id="contact">
            {/* Header */}
            <motion.h2
                variants={textVariant(0.1)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="text-2xl font-semibold mb-2"
                style={{ color: "var(--accent)" }}
            >
                Contact
            </motion.h2>

            <motion.p
                variants={fadeIn("", "tween", 0.2, 0.8)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="text-muted mb-6 max-w-3xl"
            >
                The Knight moves in unexpected ways — let’s{" "}
                <span className="text-white font-semibold">connect</span> and explore new paths.
            </motion.p>

            {/* Split layout: LEFT = knight, RIGHT = form */}
            <div className="grid grid-cols-1 sm:grid-cols-[40%_1fr] items-start gap-8">
                {/* LEFT: Knight (auto-rotating, upright) */}
                <motion.div
                    variants={fadeIn("", "tween", 0.2, 0.8)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    className="rounded-2xl border border-panel bg-panel p-4 sm:sticky sm:top-6"
                >
                    <StaticPiece
                        modelPath="/models/Knight_white.glb"
                        className="w-full h-[260px] sm:h-[320px] md:h-[380px]"
                        orientation="upright"
                        fit="height"
                        controls               // allow manual rotation
                        controlsZoom={false}
                        controlsPan={false}
                        autoRotate             // gentle motion
                        autoRotateSpeed={0.6}
                    />
                </motion.div>

                {/* RIGHT: Form + quick links */}
                <div>
                    <motion.form
                        variants={fadeIn("", "tween", 0.25, 0.8)}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.2 }}
                        action="https://formspree.io/f/YOUR_FORM_ID"
                        method="POST"
                        className="max-w-xl space-y-4"
                    >
                        <input type="text" name="_gotcha" className="hidden" />
                        <input
                            type="email"
                            name="email"
                            required
                            placeholder="Your email"
                            className="w-full px-4 py-2 rounded-lg bg-panel border border-panel"
                        />
                        <textarea
                            name="message"
                            required
                            placeholder="Your message"
                            className="w-full px-4 py-2 rounded-lg bg-panel border border-panel h-32"
                        />
                        <button type="submit" className="px-5 py-2.5 rounded-xl btn-accent font-medium">
                            Send
                        </button>
                    </motion.form>

                    <motion.div
                        variants={fadeIn("", "tween", 0.35, 0.8)}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.2 }}
                        className="flex flex-wrap gap-4 mt-6"
                    >
                        <a href="mailto:yrberrada@gmail.com" className="px-4 py-2 rounded-lg bg-panel border border-panel">
                            Email me
                        </a>
                        <a
                            href="https://www.linkedin.com/in/yrberrada"
                            target="_blank"
                            className="px-4 py-2 rounded-lg bg-panel border border-panel"
                        >
                            LinkedIn
                        </a>
                        <a
                            href="https://github.com/yrberrada"
                            target="_blank"
                            className="px-4 py-2 rounded-lg bg-panel border border-panel"
                        >
                            GitHub
                        </a>
                    </motion.div>
                </div>
            </div>
        </SectionWrapper>
    );
}
