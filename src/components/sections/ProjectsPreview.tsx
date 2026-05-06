import { useTranslations } from "next-intl";
import Link from "next/link";
import ProjectCard from "@/components/ui/ProjectCard";
import { getAllProjects } from "@/lib/mdx";

interface ProjectsPreviewProps {
  locale: string;
}

export default function ProjectsPreview({ locale }: ProjectsPreviewProps) {
  const t = useTranslations("projects_preview");
  const projects = getAllProjects().slice(0, 3);
  const projectsHref = locale === "fr" ? "/projets" : "/en/projects";

  const translations = {
    type_airbnb: t("type_airbnb"),
    type_renovation: t("type_renovation"),
    type_decoration: t("type_decoration"),
  };

  return (
    <section className="py-24 px-6 bg-[#FAFAF8]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <p className="text-[#C9A96E] text-sm font-medium tracking-[0.3em] uppercase mb-3">
              Portfolio
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-[#1A1A1A]">
              {t("title")}
            </h2>
            <p className="text-[#6B6B6B] mt-3">{t("subtitle")}</p>
          </div>
          <Link
            href={projectsHref}
            className="text-sm font-medium text-[#1A1A1A] border-b border-[#C9A96E] pb-1 hover:text-[#C9A96E] transition-colors whitespace-nowrap"
          >
            {t("see_all")} →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              locale={locale}
              translations={translations}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
