import { getPosts } from "@/utils/utils";
import { Column } from "@once-ui-system/core";
import { ProjectCard } from "@/components";

interface ProjectsProps {
  range?: [number, number?];
  exclude?: string[];
  featuredSlugs?: string[];
}

export function Projects({ range, exclude, featuredSlugs }: ProjectsProps) {
  let allProjects = getPosts(["src", "app", "work", "projects"]);

  // Filter by featured slugs if provided
  if (featuredSlugs && featuredSlugs.length > 0) {
    allProjects = allProjects.filter((post) => featuredSlugs.includes(post.slug));
    // Sort by featuredSlugs order
    allProjects.sort((a, b) => {
      const indexA = featuredSlugs.indexOf(a.slug);
      const indexB = featuredSlugs.indexOf(b.slug);
      return indexA - indexB;
    });
  }

  // Exclude by slug (exact match)
  if (exclude && exclude.length > 0) {
    allProjects = allProjects.filter((post) => !exclude.includes(post.slug));
  }

  const sortedProjects = featuredSlugs && featuredSlugs.length > 0
    ? allProjects
    : allProjects.sort((a, b) => {
        return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
      });

  const displayedProjects = range
    ? sortedProjects.slice(range[0] - 1, range[1] ?? sortedProjects.length)
    : sortedProjects;

  return (
    <Column fillWidth gap="xl" marginBottom="40" paddingX="l">
      {displayedProjects.map((post, index) => (
        <ProjectCard
          priority={index < 2}
          key={post.slug}
          href={`/work/${post.slug}`}
          images={post.metadata.images}
          title={post.metadata.title}
          description={post.metadata.summary}
          content={post.content}
          avatars={post.metadata.team?.map((member) => ({ src: member.avatar })) || []}
          link={post.metadata.link || ""}
        />
      ))}
    </Column>
  );
}
