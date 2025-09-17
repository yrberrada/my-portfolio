// src/lib/motion.ts
import { Variants } from "framer-motion";

export const textVariant = (delay = 0): Variants => ({
    hidden: { y: -50, opacity: 0 },
    show: {
        y: 0, opacity: 1,
        transition: { type: "spring", duration: 1.25, delay }
    }
});

export const fadeIn = (
    direction: "left"|"right"|"up"|"down"|"" = "",
    type: "spring"|"tween" = "tween",
    delay = 0, duration = 0.6
): Variants => {
    const x = direction === "left" ? 100 : direction === "right" ? -100 : 0;
    const y = direction === "up" ? 100 : direction === "down" ? -100 : 0;
    return {
        hidden: { x, y, opacity: 0 },
        show: {
            x: 0, y: 0, opacity: 1,
            transition: { type, delay, duration, ease: "easeOut" }
        }
    };
};

export const zoomIn = (delay = 0, duration = 0.6): Variants => ({
    hidden: { scale: 0, opacity: 0 },
    show: {
        scale: 1, opacity: 1,
        transition: { type: "tween", delay, duration, ease: "easeOut" }
    }
});

export const slideIn = (
    direction: "left"|"right"|"up"|"down"|"",
    type: "spring"|"tween" = "tween",
    delay = 0, duration = 0.6
): Variants => {
    const x = direction === "left" ? "-100%" : direction === "right" ? "100%" : 0;
    const y = direction === "up" ? "100%" : direction === "down" ? "100%" : 0;
    return {
        hidden: { x, y },
        show: {
            x: 0, y: 0,
            transition: { type, delay, duration, ease: "easeOut" }
        }
    };
};

export const staggerContainer = (staggerChildren = 0.15, delayChildren = 0) => ({
    hidden: {},
    show: { transition: { staggerChildren, delayChildren } }
});
