import type { Project } from "@/types/project";
import ProjectCard from "@/components/ui/ProjectCard";

interface ProjectsGridProps {
  projects: Project[];
  locale: string;
}

export default function ProjectsGrid({ projects, locale }: ProjectsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} locale={locale} />
      ))}
    </div>
  );
}
