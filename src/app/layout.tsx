// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

const NAME = "Yassine Berrada Rekhami";
const SITE_URL = "https://example.com"; // <- update if you have a real domain

export const metadata: Metadata = {
    title: `${NAME} — Software Developer`,
    description: `Portfolio of ${NAME}: projects, skills, and contact info.`,
    openGraph: {
        title: `${NAME} — Software Developer`,
        description: "Projects, skills, and contact.",
        url: SITE_URL,
        siteName: `${NAME} — Portfolio`,
        images: ["/og.png"],
        type: "website",
    },
    icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body suppressHydrationWarning>
        {/* NAV */}
        <header className="border-b border-panel">
            <nav className="container py-4 flex items-center justify-between">
                {/* Brand now scrolls to hero (#home) */}
                <a
                    href="#home"
                    className="font-semibold tracking-tight hover:opacity-80 transition"
                >
                    Yassine <span style={{ color: "var(--accent)" }}>Berrada Rekhami</span>
                </a>

                <div className="hidden sm:flex gap-6 text-sm text-muted">
                    <a href="#projects" className="hover:underline">Projects</a>
                    <a href="#skills" className="hover:underline">Skills</a>
                    <a href="#education" className="hover:underline">Education</a>
                    <a href="#contact" className="hover:underline">Contact</a>
                </div>
            </nav>
            <div className="header-underline" /> {/* optional subtle line */}
        </header>

        <main>{children}</main>

        {/* FOOTER + attribution */}
        <footer className="mt-24 border-t border-panel">
            <div className="container py-8 text-sm text-muted space-y-2">
                <div>© {new Date().getFullYear()} {NAME}.</div>
                <div>
                    Wooden Chess Set model by{" "}
                    <a
                        href="AUTHOR_PROFILE_URL"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:no-underline"
                    >
                        AUTHOR_NAME
                    </a>{" "}
                    on{" "}
                    <a
                        href="https://sketchfab.com/3d-models/wooden-chess-set-90151fb0fb294e56b45e52b001a884db"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:no-underline"
                    >
                        Sketchfab
                    </a>{" "}
                    — Licensed under{" "}
                    <a
                        href="https://creativecommons.org/licenses/by/4.0/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:no-underline"
                    >
                        CC BY 4.0
                    </a>.
                </div>
            </div>
        </footer>
        </body>
        </html>
    );
}
