export type ProjectType = "airbnb" | "renovation" | "decoration";

export interface ProjectFrontmatter {
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  type: ProjectType;
  surface: number;
  location: string;
  year: number;
  coverImage: string;
  images: string[];
}

export interface Project extends ProjectFrontmatter {
  slug: string;
  content: string;
}
