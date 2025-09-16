// src/app/page.tsx
import ProjectCard from "@/components/ProjectCard";
import projects from "@/content/projects.json";
import skills from "@/content/skills.json";

// ✅ Use the client wrapper (it does the dynamic import with ssr:false)
import ChessScene from "@/components/ChessSceneWrapper";

// --- Minimal local types for the JSON data ---
type Project = {
    title: string;
    tagline: string;
    tech: string[];
    links: { github?: string; live?: string };
    image?: string;
};
type SkillGroup = { group: string; items: string[] };

const projectsData = projects as unknown as Project[];
const skillsData = skills as unknown as SkillGroup[];

export default function HomePage() {
    return (
        <>
            {/* HERO */}
            <section id="hero" className="container py-16 sm:py-24">
                <div className="grid md:grid-cols-2 gap-10 items-center">
                    {/* LEFT: headline + CTAs */}
                    <div className="space-y-6">
                        <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
                            Hi, I’m <span style={{ color: "var(--accent)" }}>Your Name</span>
                            <br />
                            <span className="opacity-90">Software Developer</span>
                        </h1>

                        <p className="text-lg text-muted">
                            I build clear, reliable software with an eye for strategy — just like chess.
                            Explore my projects, skills, and background.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <a
                                href="/resume.pdf"
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
                        </div>

                        <p className="text-sm text-muted">
                            *Chess mirrors how I code: strategy, foresight, and creative moves.*
                        </p>
                    </div>

                    {/* RIGHT: React Three Fiber scene */}
                    <div className="relative">
                        <ChessScene />
                        <p className="mt-3 text-sm text-muted text-center">
                            Click a label to jump to a section.
                        </p>
                    </div>
                </div>
            </section>

            {/* PROJECTS */}
            <section id="projects" className="container py-20">
                <h2 className="text-2xl font-semibold mb-2">Projects</h2>
                <p className="text-muted mb-6">
                    Selected work. Each card links to code and/or a live demo.
                </p>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projectsData.map((p, i) => (
                        <ProjectCard key={i} p={p} />
                    ))}
                </div>
            </section>

            {/* SKILLS */}
            <section id="skills" className="container py-20">
                <h2 className="text-2xl font-semibold mb-2">Skills</h2>
                <p className="text-muted mb-6">
                    Grouped by category. Ask me how I’ve used them in projects.
                </p>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skillsData.map((g, idx) => (
                        <div key={idx} className="rounded-xl border border-panel bg-panel p-4">
                            <h3 className="font-semibold mb-3">{g.group}</h3>
                            <div className="flex flex-wrap gap-2">
                                {g.items.map((name) => (
                                    <span
                                        key={name}
                                        className="text-xs px-2 py-1 rounded bg-white/10 border border-panel"
                                    >
                    {name}
                  </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ABOUT */}
            <section id="about" className="container py-20">
                <h2 className="text-2xl font-semibold mb-3">About Me</h2>
                <p className="text-muted">
                    Short story about who you are, what you like building, and what you’re looking for.
                    Tie chess to your dev style: evaluate, plan, execute; trade complexity for clarity.
                </p>
            </section>

            {/* EDUCATION */}
            <section id="education" className="container py-20">
                <h2 className="text-2xl font-semibold mb-6">Education</h2>
                <ul className="space-y-2">
                    <li>
                        <span className="font-medium">BS in Computer Science</span> — Your University
                    </li>
                </ul>
            </section>

            {/* CONTACT */}
            <section id="contact" className="container py-20">
                <h2 className="text-2xl font-semibold mb-3">Contact</h2>
                <p className="text-muted mb-6">
                    Prefer email or LinkedIn? Use the form or reach me directly.
                </p>

                <form
                    action="https://formspree.io/f/YOUR_FORM_ID"
                    method="POST"
                    className="max-w-xl space-y-4"
                >
                    {/* Honeypot anti-spam */}
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
                </form>

                <div className="flex gap-4 mt-6">
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
                </div>
            </section>
        </>
    );
}
