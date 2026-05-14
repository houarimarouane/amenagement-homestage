"use client";

import { useState } from "react";
import type { Project, ProjectType } from "@/types/project";
import ProjectCard from "@/components/ui/ProjectCard";

interface ProjectsGridProps {
  projects: Project[];
  locale: string;
  translations: {
    filter_all: string;
    filter_airbnb: string;
    filter_renovation: string;
    filter_decoration: string;
  };
}

type FilterType = ProjectType | "all";

export default function ProjectsGrid({
  projects,
  locale,
  translations,
}: ProjectsGridProps) {
  const [filter, setFilter] = useState<FilterType>("all");

  const filtered =
    filter === "all" ? projects : projects.filter((p) => p.type === filter);

  const filters: { key: FilterType; label: string }[] = [
    { key: "all", label: translations.filter_all },
    { key: "airbnb", label: translations.filter_airbnb },
    { key: "renovation", label: translations.filter_renovation },
    { key: "decoration", label: translations.filter_decoration },
  ];

  return (
    <>
      <div className="flex gap-3 justify-center mb-10 flex-wrap">
        {filters.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`px-5 py-2 text-sm font-medium transition-colors cursor-pointer ${
              filter === key
                ? "bg-[#7A0D0A] text-white"
                : "border border-foreground/15 text-[#6B6560] hover:border-[#7A0D0A] hover:text-[#7A0D0A]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((project) => (
          <ProjectCard
            key={project.slug}
            project={project}
            locale={locale}
          />
        ))}
      </div>
    </>
  );
}
