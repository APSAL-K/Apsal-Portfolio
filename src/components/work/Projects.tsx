"use client";

import { useState, useMemo } from "react";
import { Column, Row, Text, Flex } from "@once-ui-system/core";
import { ProjectCard } from "@/components";

interface Project {
  slug: string;
  metadata: {
    title: string;
    publishedAt: string;
    summary: string;
    image?: string;
    images: string[];
    tags: string[];
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    team: any[];
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
  content: string;
}

interface ProjectsProps {
  range?: [number, number?];
  exclude?: string[];
  featuredSlugs?: string[];
  allProjects: Project[];
}

export function Projects({ range, exclude, featuredSlugs, allProjects }: ProjectsProps) {
  const [activeFilter, setActiveFilter] = useState("All");
  
  const { categories } = useMemo(() => {
    let projects = allProjects;

    // Filter by featured slugs if provided
    if (featuredSlugs && featuredSlugs.length > 0) {
      projects = projects.filter((post) => featuredSlugs.includes(post.slug));
      projects.sort((a, b) => {
        const indexA = featuredSlugs.indexOf(a.slug);
        const indexB = featuredSlugs.indexOf(b.slug);
        return indexA - indexB;
      });
    }

    // Exclude by slug (exact match)
    if (exclude && exclude.length > 0) {
      projects = projects.filter((post) => !exclude.includes(post.slug));
    }

    const sorted = projects.sort((a, b) => {
      return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
    });

    const counts = {
      All: sorted.length,
      "Full Stack": sorted.filter(p => p.metadata.tags?.includes("Full Stack")).length,
      "AI/ML": sorted.filter(p => p.metadata.tags?.includes("AI/ML")).length,
    };

    return { 
      allProjects: sorted, 
      categories: Object.entries(counts) 
    };
  }, [exclude, featuredSlugs, allProjects]);

  const filteredProjects = useMemo(() => {
    const filtered = activeFilter === "All" 
      ? allProjects 
      : allProjects.filter(p => p.metadata.tags?.includes(activeFilter));
    
    return range
      ? filtered.slice(range[0] - 1, range[1] ?? filtered.length)
      : filtered;
  }, [allProjects, activeFilter, range]);

  return (
    <Column fillWidth gap="l">
      <Row horizontal="center" gap="16" wrap  marginBottom="s">
        {categories.map(([label, count]) => (
          <Flex
            key={label}
            paddingX="s"
            paddingY="8"
            radius="m"
            cursor="pointer"
            onClick={() => setActiveFilter(label)}
            transition="micro-medium"
            background={activeFilter === label ? "neutral-alpha-medium" : "transparent"}
            border={activeFilter === label ? "neutral-alpha-strong" : "neutral-alpha-weak"}
            style={{ 
              borderWidth: '1px',
              borderStyle: 'solid',
            }}
          >
            <Row gap="8" vertical="center">
              <Text 
                variant="body-strong-s" 
                onBackground={activeFilter === label ? "neutral-strong" : "neutral-weak"}
              >
                {label}
              </Text>
              <Text 
                variant="label-default-s" 
                onBackground={activeFilter === label ? "brand-strong" : "neutral-weak"}
                style={{ 
                  borderRadius: '12px',
                  padding: '2px 8px',
                  background: activeFilter === label ? 'var(--brand-alpha-medium)' : 'var(--neutral-alpha-weak)',
                }}
              >
                {count}
              </Text>
            </Row>
          </Flex>
        ))}
      </Row>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
        gap: '2rem', 
        width: '100%', 
        marginBottom: '40px', 
        padding: '0 2rem' 
      }}>
        {filteredProjects.map((post, index) => (
          <ProjectCard
            priority={index < 2}
            key={post.slug}
            href={post.metadata.live || "#"}
            images={post.metadata.images}
            title={post.metadata.title}
            description={post.metadata.summary}
            content={""}
            avatars={[]}
            link={post.metadata.github || "#"}
            frameworks={post.metadata.frameworks}
            languages={post.metadata.languages}
            category={post.metadata.category}
            year={post.metadata.year}
            badge={post.metadata.badge}
            duration={post.metadata.duration}
            type={post.metadata.type}
          />
        ))}
      </div>
    </Column>
  );
}
