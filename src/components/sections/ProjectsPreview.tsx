import { useTranslations } from "next-intl";
import Link from "next/link";
import ProjectCard from "@/components/ui/ProjectCard";
import { getAllProjects } from "@/lib/mdx";

interface ProjectsPreviewProps {
  locale: string;
}

export default function ProjectsPreview({ locale }: ProjectsPreviewProps) {
  const t = useTranslations("projects_preview");
  const tNav = useTranslations("nav");
  const projects = getAllProjects().slice(0, 3);
  const projectsHref = locale === "fr" ? "/projets" : "/en/projets";

  const translations = {
    type_airbnb: t("type_airbnb"),
    type_renovation: t("type_renovation"),
    type_decoration: t("type_decoration"),
  };

  return (
    <section id="portfolio" className="scroll-mt-24 py-28 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end mb-16">
          <div>
            <p className="text-[#7A0D0A] text-[11px] font-medium tracking-[0.4em] uppercase mb-5">
              {tNav("portfolio")}
            </p>
            <h2 className="font-heading text-3xl md:text-4xl text-foreground leading-tight">
              {t("title")}
            </h2>
          </div>
          <div className="flex flex-col justify-end gap-4">
            <p className="text-[#6B6560] text-lg leading-relaxed">{t("subtitle")}</p>
            <div>
              <Link
                href={projectsHref}
                className="inline-flex items-center gap-2 text-sm font-medium text-foreground border-b border-[#7A0D0A] pb-1 hover:text-[#7A0D0A] transition-colors"
              >
                {t("see_all")}
                <span className="text-[#7A0D0A]">→</span>
              </Link>
            </div>
          </div>
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

        <div className="mt-14 text-center">
          <Link
            href={projectsHref}
            className="inline-block border border-foreground/30 text-foreground px-10 py-4 text-sm font-medium tracking-wide hover:bg-[#5A0A07] hover:text-white hover:border-[#7A0D0A] transition-colors"
          >
            {t("see_all")}
          </Link>
        </div>
      </div>
    </section>
  );
}
