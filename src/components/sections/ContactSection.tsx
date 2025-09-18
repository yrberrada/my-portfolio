// src/components/sections/ContactSection.tsx
"use client";

import { motion } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";
import { textVariant, fadeIn } from "@/lib/motion";
import dynamic from "next/dynamic";

const ChessPiece = dynamic(() => import("@/components/ChessPiece"), { ssr: false });

export default function ContactSection() {
    return (
        <SectionWrapper id="contact">
            <div className="grid lg:grid-cols-[96px_1fr_96px] items-start gap-4 mb-6">
                <div className="hidden lg:flex justify-center">
                    <ChessPiece piece="knight" className="w-24 h-24" scale={1.1} ariaLabel="Knight" />
                </div>

                <div>
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
                        The Knight moves across the board in unexpected ways — let’s connect and explore new paths.
                    </motion.p>
                </div>

                <div className="hidden lg:flex justify-center">
                    <ChessPiece piece="knight" className="w-24 h-24" scale={1.1} ariaLabel="Knight" />
                </div>
            </div>

            <motion.form
                variants={fadeIn("", "tween", 0.3, 0.8)}
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
                variants={fadeIn("", "tween", 0.4, 0.8)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="flex gap-4 mt-6"
            >
                <a href="mailto:yrberrada@gmail.com" className="px-4 py-2 rounded-lg bg-panel border border-panel">
                    Email me
                </a>
                <a href="https://www.linkedin.com/in/yrberrada" target="_blank" className="px-4 py-2 rounded-lg bg-panel border border-panel">
                    LinkedIn
                </a>
                <a href="https://github.com/yrberrada" target="_blank" className="px-4 py-2 rounded-lg bg-panel border border-panel">
                    GitHub
                </a>
            </motion.div>
        </SectionWrapper>
    );
}
