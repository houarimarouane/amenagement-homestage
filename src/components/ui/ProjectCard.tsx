import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/types/project";

interface ProjectCardProps {
  project: Project;
  locale: string;
  translations: {
    type_airbnb: string;
    type_renovation: string;
    type_decoration: string;
  };
}

export default function ProjectCard({ project, locale, translations }: ProjectCardProps) {
  const href =
    locale === "fr"
      ? `/projets/${project.slug}`
      : `/en/projects/${project.slug}`;

  const title = locale === "fr" ? project.title : project.titleEn;

  const typeLabel =
    project.type === "airbnb"
      ? translations.type_airbnb
      : project.type === "renovation"
      ? translations.type_renovation
      : translations.type_decoration;

  return (
    <Link href={href} className="group block overflow-hidden">
      <div className="relative h-64 overflow-hidden">
        <Image
          src={project.coverImage}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-[#7A0D0A] text-white text-xs font-medium px-3 py-1 uppercase tracking-wide">
            {typeLabel}
          </span>
        </div>
      </div>
      <div className="py-4">
        <h3 className="font-serif text-xl text-[#1A1714] group-hover:text-[#7A0D0A] transition-colors mb-1">
          {title}
        </h3>
        <p className="text-[#6B6560] text-sm">
          {project.location} · {project.surface}m²
        </p>
      </div>
    </Link>
  );
}
