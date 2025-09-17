// src/components/sections/ContactSection.tsx
"use client";

import { motion } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";
import { textVariant, fadeIn } from "@/lib/motion";

export default function ContactSection() {
    return (
        <SectionWrapper id="contact">
            <motion.h2
                variants={textVariant(0.1)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="text-2xl font-semibold mb-3"
            >
                Contact
            </motion.h2>

            <motion.p
                variants={fadeIn("", "tween", 0.2, 0.8)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="text-muted mb-6"
            >
                Let’s connect! Whether you prefer email or LinkedIn, I’d love to hear from you.
            </motion.p>

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
                <a
                    href="mailto:you@example.com"
                    className="px-4 py-2 rounded-lg bg-panel border border-panel"
                >
                    Email me
                </a>
                <a
                    href="https://www.linkedin.com/in/your-handle/"
                    target="_blank"
                    className="px-4 py-2 rounded-lg bg-panel border border-panel"
                >
                    LinkedIn
                </a>
                <a
                    href="https://github.com/your-handle"
                    target="_blank"
                    className="px-4 py-2 rounded-lg bg-panel border border-panel"
                >
                    GitHub
                </a>
            </motion.div>
        </SectionWrapper>
    );
}
