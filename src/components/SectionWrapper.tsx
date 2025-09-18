// src/components/SectionWrapper.tsx
"use client";

export default function SectionWrapper({
                                           id,
                                           children,
                                       }: {
    id: string;
    children: React.ReactNode;
}) {
    return (
        <section
            id={id}
            className="container py-20 relative overflow-visible"  // ✅ key bits
        >
            {children}
        </section>
    );
}
