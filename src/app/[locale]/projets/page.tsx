import { getAllProjects } from "@/lib/mdx";
import { getTranslations } from "next-intl/server";
import ProjectsGrid from "@/components/sections/ProjectsGrid";

interface ProjectsPageProps {
  params: Promise<{ locale: string }>;
}

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { locale } = await params;
  const projects = getAllProjects();
  const t = await getTranslations("projects_page");

  return (
    <div className="pt-32 pb-24 px-6 bg-[#FAFAF8] min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-[#C9A96E] text-sm font-medium tracking-[0.3em] uppercase mb-3">
            Portfolio
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-[#1A1A1A] mb-4">
            {t("title")}
          </h1>
          <p className="text-[#6B6B6B] text-lg">{t("subtitle")}</p>
        </div>

        <ProjectsGrid
          projects={projects}
          locale={locale}
          translations={{
            filter_all: t("filter_all"),
            filter_airbnb: t("filter_airbnb"),
            filter_renovation: t("filter_renovation"),
            filter_decoration: t("filter_decoration"),
            type_airbnb: t("filter_airbnb"),
            type_renovation: t("filter_renovation"),
            type_decoration: t("filter_decoration"),
          }}
        />
      </div>
    </div>
  );
}
