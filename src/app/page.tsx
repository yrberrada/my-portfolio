// src/app/page.tsx
import ChessIntro from "@/components/sections/ChessIntro";
import HeroSection from "@/components/sections/HeroSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SkillsSection from "@/components/sections/SkillsSection";
import AboutSection from "@/components/sections/AboutSection";
import EducationSection from "@/components/sections/EducationSection";
import ContactSection from "@/components/sections/ContactSection";

// 👇 add the new test section import
import PieceTestSection from "@/components/sections/PieceTestSection";

export default function HomePage() {
    return (
        <>
            <ChessIntro />
            <HeroSection />

            {/* 👇 render the test section so you can confirm pieces show correctly */}
            <PieceTestSection />

            <ProjectsSection />
            <SkillsSection />
            <AboutSection />
            <EducationSection />
            <ContactSection />
        </>
    );
}
