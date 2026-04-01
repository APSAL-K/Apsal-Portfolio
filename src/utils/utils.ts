import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

type Team = {
  name: string;
  role: string;
  avatar: string;
  linkedIn: string;
};

type Metadata = {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
  images: string[];
  tags: string[];
  team: Team[];
  link?: string;
  live?: string;
  github?: string;
  frameworks?: string[];
  languages?: string[];
  category?: string;
  year?: string;
  badge?: string;
  duration?: string;
  type?: string;
};

import { notFound } from "next/navigation";

function getMDXFiles(dir: string) {
  if (!fs.existsSync(dir)) {
    // If the directory does not exist and the current path is root ("/"), don't call notFound, just return empty array
    if (dir.endsWith(path.join("blog", "posts")) || dir.endsWith(path.join("work", "projects"))) {
      // For blog and work directories, missing dir means no posts/projects, not 404
      return [];
    }
    // Otherwise, log and return not found
    console.log(`Directory does not exist: ${dir}`);
    notFound();
  }

  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath: string) {
  if (!fs.existsSync(filePath)) {
    console.log(filePath);  
    notFound();
  }

  const rawContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(rawContent);

  const metadata: Metadata = {
    title: data.title || "",
    publishedAt: data.publishedAt,
    summary: data.summary || "",
    image: data.image || "",
    images: data.images || [],
    tags: data.tags || (data.tag ? [data.tag] : []),
    team: data.team || [],
    link: data.link || "",
    live: data.live || "",
    github: data.github || "",
    frameworks: data.frameworks || [],
    languages: data.languages || [],
    category: data.category || "",
    year: data.year || "",
    badge: data.badge || "",
    duration: data.duration || "",
    type: data.type || "",
  };

  return { metadata, content };
}

function getMDXData(dir: string) {
  const mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    const { metadata, content } = readMDXFile(path.join(dir, file));
    const slug = path.basename(file, path.extname(file));

    return {
      metadata,
      slug,
      content,
    };
  });
}

export function getPosts(customPath = ["", "", "", ""]) {
  const postsDir = path.join(process.cwd(), ...customPath);
  return getMDXData(postsDir);
}
