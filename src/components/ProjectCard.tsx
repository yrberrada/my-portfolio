// Define the shape of a project object
type Project = {
    title: string; // Project title
    tagline: string; // Short description
    tech: string[]; // Array of technologies (used for badges)
    links: { github?: string; live?: string; pdf?: string }; // Optional links (GitHub, live demo, PDF)
    image?: string; // Optional image path
};

export default function ProjectCard({ p }: { p: Project }) {
    return (
        <article className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
            {/* Thumbnail image (if provided) */}
            {p.image ? (
                // ⚠️ Using plain <img> here; Next.js recommends <Image> but this works too.
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-44 object-cover"
                />
            ) : null}

            {/* Main content */}
            <div className="p-4 space-y-2">
                {/* Title */}
                <h3 className="text-lg font-semibold">{p.title}</h3>

                {/* Tagline / description */}
                <p className="text-sm text-neutral-400">{p.tagline}</p>

                {/* Tech stack badges */}
                <div className="flex flex-wrap gap-2 pt-2">
                    {p.tech.map((t) => (
                        <span
                            key={t}
                            className="text-xs px-2 py-1 rounded bg-white/10 border border-white/10"
                        >
              {t}
            </span>
                    ))}
                </div>

                {/* Links row (conditionally rendered) */}
                <div className="flex gap-3 pt-2">
                    {/* GitHub link */}
                    {p.links.github && (
                        <a
                            className="text-sm underline hover:text-white"
                            href={p.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            GitHub
                        </a>
                    )}

                    {/* Live demo link */}
                    {p.links.live && (
                        <a
                            className="text-sm underline hover:text-white"
                            href={p.links.live}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Live
                        </a>
                    )}

                    {/* PDF link (NEW) */}
                    {p.links.pdf && (
                        <a
                            className="text-sm underline hover:text-white"
                            href={p.links.pdf}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            PDF
                        </a>
                    )}
                </div>
            </div>
        </article>
    );
}
