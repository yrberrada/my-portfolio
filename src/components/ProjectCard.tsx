type Project = {
    title: string;
    tagline: string;
    tech: string[];
    links: { github?: string; live?: string };
    image?: string;
};

export default function ProjectCard({ p }: { p: Project }) {
    return (
        <article className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
            {p.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.image} alt={p.title} className="w-full h-44 object-cover" />
            ) : null}
            <div className="p-4 space-y-2">
                <h3 className="text-lg font-semibold">{p.title}</h3>
                <p className="text-sm text-neutral-400">{p.tagline}</p>
                <div className="flex flex-wrap gap-2 pt-2">
                    {p.tech.map((t) => (
                        <span key={t} className="text-xs px-2 py-1 rounded bg-white/10 border border-white/10">
              {t}
            </span>
                    ))}
                </div>
                <div className="flex gap-3 pt-2">
                    {p.links.github && (
                        <a className="text-sm underline hover:text-white" href={p.links.github} target="_blank">GitHub</a>
                    )}
                    {p.links.live && (
                        <a className="text-sm underline hover:text-white" href={p.links.live} target="_blank">Live</a>
                    )}
                </div>
            </div>
        </article>
    );
}
