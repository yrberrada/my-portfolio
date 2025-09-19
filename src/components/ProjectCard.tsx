// src/components/ProjectCard.tsx
"use client";
import Image from "next/image";

type Project = {
    title: string;
    tagline: string;
    tech: string[];
    links: { github?: string; live?: string; pdf?: string };
    image?: string;
};

export default function ProjectCard({ p }: { p: Project }) {
    const hasLinks = !!(p.links.github || p.links.live || p.links.pdf);

    return (
        <article
            className={[
                "group relative overflow-hidden rounded-2xl",
                // silver glass card
                "border border-white/20 bg-gradient-to-b from-[#2a2d32] to-[#1b1e22]",
                "backdrop-blur-sm",
                // hover feedback
                "transition-all duration-300 ease-out",
                "hover:-translate-y-1 hover:scale-[1.01] hover:border-white/40",
                "shadow-[0_8px_20px_-6px_rgba(0,0,0,0.55)] hover:shadow-[0_16px_32px_-10px_rgba(0,0,0,0.6)]",
                "focus-within:ring-2 focus-within:ring-[var(--accent)]/50"
            ].join(" ")}
        >
            {/* gentle shine sweep */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            >
                <div className="absolute -inset-x-10 -top-10 h-40 rotate-6 bg-[radial-gradient(60%_40%_at_30%_0%,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.03)_55%,transparent_70%)]" />
            </div>

            {/* Thumbnail */}
            <div className="relative aspect-[16/9] overflow-hidden">
                {p.image ? (
                    <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        sizes="(min-width:1024px) 33vw,(min-width:640px) 50vw,100vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                ) : (
                    <div className="w-full h-full bg-white/10" />
                )}

                {/* overlay if links */}
                {hasLinks && (
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                )}

                {/* Hover actions */}
                {hasLinks && (
                    <div className="absolute inset-x-3 bottom-3 flex flex-wrap gap-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        {p.links.github && (
                            <a
                                href={p.links.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="pointer-events-auto rounded-lg bg-white/90 px-3 py-1.5 text-xs font-medium text-black hover:bg-white"
                            >
                                GitHub
                            </a>
                        )}
                        {p.links.live && (
                            <a
                                href={p.links.live}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="pointer-events-auto rounded-lg bg-[var(--accent)]/90 px-3 py-1.5 text-xs font-semibold text-black hover:bg-[var(--accent)]"
                            >
                                Live
                            </a>
                        )}
                        {p.links.pdf && (
                            <a
                                href={p.links.pdf}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="pointer-events-auto rounded-lg bg-white/90 px-3 py-1.5 text-xs font-medium text-black hover:bg-white"
                            >
                                PDF
                            </a>
                        )}
                    </div>
                )}
            </div>

            {/* Body */}
            <div className="p-4 sm:p-5">
                <h3 className="text-[1.05rem] font-semibold tracking-tight text-white">
                    {p.title}
                </h3>
                <p className="mt-2 text-sm text-white/70">{p.tagline}</p>

                <div className="mt-3 flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                        <span
                            key={t}
                            className="text-[11px] px-2 py-1 rounded border border-white/20 bg-white/10 text-white/90"
                        >
              {t}
            </span>
                    ))}
                </div>
            </div>
        </article>
    );
}
