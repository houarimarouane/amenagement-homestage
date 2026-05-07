import { getProjectBySlug, getAllProjectSlugs } from "@/lib/mdx";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";

interface ProjectDetailProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllProjectSlugs();
  return slugs.flatMap((slug) => [
    { locale: "fr", slug },
    { locale: "en", slug },
  ]);
}

export default async function ProjectDetail({ params }: ProjectDetailProps) {
  const { locale, slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const t = await getTranslations("project_detail");
  const tp = await getTranslations("projects_preview");

  const title = locale === "fr" ? project.title : project.titleEn;
  const description = locale === "fr" ? project.description : project.descriptionEn;
  const backHref = locale === "fr" ? "/projets" : "/en/projects";
  const contactHref = locale === "fr" ? "/#contact" : "/en/#contact";

  const typeLabel =
    project.type === "airbnb"
      ? tp("type_airbnb")
      : project.type === "renovation"
      ? tp("type_renovation")
      : tp("type_decoration");

  return (
    <div className="pt-20 pb-24 bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 pt-8 mb-8">
        <Link
          href={backHref}
          className="text-sm text-[#6B6560] hover:text-[#7A0D0A] transition-colors"
        >
          ← {t("back")}
        </Link>
      </div>

      {/* Hero image */}
      <div className="relative h-[60vh] mb-12">
        <Image
          src={project.coverImage}
          alt={title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-8 left-0 right-0 max-w-7xl mx-auto px-6 text-white">
          <span className="bg-[#7A0D0A] text-white text-xs font-medium px-3 py-1 uppercase tracking-wide">
            {typeLabel}
          </span>
          <h1 className="font-serif text-4xl md:text-6xl mt-4">{title}</h1>
          <p className="text-white/80 mt-2">
            {project.location} · {project.surface}m² · {project.year}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="lg:col-span-2">
            <p className="text-[#6B6560] text-lg leading-relaxed mb-8">
              {description}
            </p>
            <div className="prose max-w-none">
              <MDXRemote source={project.content} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-[#FAF8F5] border border-[#E5E0DC] p-6 space-y-5 sticky top-28">
              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-[#7A0D0A] mb-1">
                  Type
                </p>
                <p className="text-[#1A1714]">{typeLabel}</p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-[#7A0D0A] mb-1">
                  Surface
                </p>
                <p className="text-[#1A1714]">{project.surface} m²</p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-[#7A0D0A] mb-1">
                  Localisation
                </p>
                <p className="text-[#1A1714]">{project.location}</p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-[#7A0D0A] mb-1">
                  Année
                </p>
                <p className="text-[#1A1714]">{project.year}</p>
              </div>
              <div className="pt-4 border-t border-[#E5E0DC]">
                <Link
                  href={contactHref}
                  className="block w-full text-center bg-[#7A0D0A] text-white py-3 text-sm font-medium hover:bg-[#5A0A07] transition-colors"
                >
                  {t("cta_button")}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Photo gallery */}
        {project.images.length > 1 && (
          <div className="mt-14">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.images.slice(1).map((src, i) => (
                <div key={i} className="relative h-72 overflow-hidden">
                  <Image
                    src={src}
                    alt={`${title} — photo ${i + 2}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA block */}
        <div className="mt-16 text-center bg-[#1A1714] text-white py-14 px-6">
          <h3 className="font-serif text-3xl mb-3">{t("cta_title")}</h3>
          <p className="text-white/60 mb-6">{t("cta_desc")}</p>
          <Link
            href={contactHref}
            className="bg-[#7A0D0A] text-white px-8 py-4 font-medium hover:bg-[#5A0A07] transition-colors inline-block"
          >
            {t("cta_button")}
          </Link>
        </div>
      </div>
    </div>
  );
}
