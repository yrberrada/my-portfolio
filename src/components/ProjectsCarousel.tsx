"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard, A11y } from "swiper/modules";
import ProjectCard from "@/components/ProjectCard";
import projects from "@/content/projects.json";

const breakpoints = {
    640:  { slidesPerView: 1.2, spaceBetween: 16 },
    768:  { slidesPerView: 2,   spaceBetween: 18 },
    1024: { slidesPerView: 3,   spaceBetween: 20 },
};

export default function ProjectsCarousel() {
    const data = projects as any[];

    return (
        <Swiper
            modules={[Navigation, Pagination, Keyboard, A11y]}
            navigation
            pagination={{ clickable: true }}
            keyboard={{ enabled: true }}
            spaceBetween={14}
            slidesPerView={1.05}
            breakpoints={breakpoints}
            style={
                { ["--swiper-theme-color" as any]: "var(--accent)" } // bullets/arrows in your accent color
            }
        >
            {data.map((p, idx) => (
                <SwiperSlide key={idx}>
                    <ProjectCard p={p} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
