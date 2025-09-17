// src/app/page.tsx
import HeroSection from "@/components/sections/HeroSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
// Make these as you go:
import SkillsSection from "@/components/sections/SkillsSection";
import AboutSection from "@/components/sections/AboutSection";
import EducationSection from "@/components/sections/EducationSection";
import ContactSection from "@/components/sections/ContactSection";

export default function HomePage() {
    return (
        <>
            <HeroSection />
            <ProjectsSection />
            <SkillsSection />
            <AboutSection />
            <EducationSection />
            <ContactSection />
        </>
    );
}
