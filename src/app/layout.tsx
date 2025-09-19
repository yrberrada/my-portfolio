// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Your Name — Software Developer",
    description: "Portfolio of Your Name: projects, skills, and contact info.",
    openGraph: {
        title: "Your Name — Software Developer",
        description: "Projects, skills, and contact.",
        url: "https://example.com",
        siteName: "Your Name — Portfolio",
        images: ["/og.png"],
        type: "website",
    },
    icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        {/* Only ONE body. Put suppressHydrationWarning on it */}
        <body suppressHydrationWarning>
        {/* NAV */}
        <header className="border-b border-panel">
            <nav className="container py-4 flex items-center justify-between">
                <a href="#hero" className="font-semibold tracking-tight">
                    Your<span style={{ color: "var(--accent)" }}>Name</span>
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
                <div>© {new Date().getFullYear()} Your Name.</div>
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
