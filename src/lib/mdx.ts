import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Project, ProjectFrontmatter } from "@/types/project";

const PROJECTS_DIR = path.join(process.cwd(), "content", "projets");

export function getAllProjects(): Project[] {
  const files = fs.readdirSync(PROJECTS_DIR).filter((f) => f.endsWith(".mdx"));

  return files
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, "");
      const filePath = path.join(PROJECTS_DIR, filename);
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(raw);

      return {
        slug,
        ...(data as ProjectFrontmatter),
        content,
      };
    })
    .sort((a, b) => b.year - a.year);
}

export function getProjectBySlug(slug: string): Project | null {
  const filePath = path.join(PROJECTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    ...(data as ProjectFrontmatter),
    content,
  };
}

export function getAllProjectSlugs(): string[] {
  return fs
    .readdirSync(PROJECTS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}
