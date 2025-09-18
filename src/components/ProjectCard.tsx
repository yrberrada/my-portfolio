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
    return (
        <article className="group rounded-xl border border-panel bg-panel overflow-hidden transition-shadow hover:shadow-lg">
            {/* Thumbnail */}
            <div className="relative aspect-[16/9] overflow-hidden">
                {p.image ? (
                    <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        sizes="(min-width:1024px) 33vw,(min-width:640px) 50vw,100vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                ) : (
                    <div className="w-full h-full bg-black/20" />
                )}

                {/* Hover overlay only if links exist */}
                {(p.links.github || p.links.live || p.links.pdf) && (
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                )}

                {/* Hover buttons */}
                <div className="absolute inset-x-3 bottom-3 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
                            className="pointer-events-auto rounded-lg bg-white/90 px-3 py-1.5 text-xs font-medium text-black hover:bg-white"
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
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
                <h3 className="text-base font-semibold">{p.title}</h3>
                <p className="text-sm text-muted">{p.tagline}</p>

                <div className="flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                        <span
                            key={t}
                            className="text-xs px-2 py-1 rounded bg-white/10 border border-white/10"
                        >
              {t}
            </span>
                    ))}
                </div>
            </div>
        </article>
    );
}
