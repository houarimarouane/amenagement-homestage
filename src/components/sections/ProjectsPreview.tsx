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

  const seeAllButtonClass =
    "inline-flex items-center justify-center gap-2 rounded-md bg-[#7A0D0A] text-white px-8 py-4 md:px-10 md:py-4 text-base md:text-lg font-semibold tracking-wide shadow-lg shadow-[#7A0D0A]/45 border-2 border-[#5A0A07] hover:bg-[#5A0A07] hover:shadow-xl hover:shadow-black/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7A0D0A] transition-all";

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
          <div className="flex flex-col justify-end gap-5">
            <p className="text-[#6B6560] text-lg leading-relaxed">{t("subtitle")}</p>
            <Link href={projectsHref} className={`${seeAllButtonClass} w-full sm:w-auto self-start`}>
              {t("see_all")}
              <span aria-hidden>→</span>
            </Link>
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

        <div className="mt-16 flex justify-center">
          <Link href={projectsHref} className={seeAllButtonClass}>
            {t("see_all")}
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
