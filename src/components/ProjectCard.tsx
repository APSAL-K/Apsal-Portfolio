"use client";

import {
  Carousel,
  Column,
  Flex,
  Heading,
  SmartLink,
  Text,
  Badge,
  Row,
  Tag,
} from "@once-ui-system/core";

interface ProjectCardProps {
  href: string;
  priority?: boolean;
  images: string[];
  title: string;
  content: string;
  description: string;
  avatars: { src: string }[];
  link: string;
  frameworks?: string[];
  languages?: string[];
  category?: string;
  year?: string;
  badge?: string;
  duration?: string;
  type?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  href,
  images = [],
  title,
  description,
  link,
  frameworks = [],
  languages = [],
  category,
  year,
  badge,
  duration,
  type,
}) => {
  return (
    <Column
      fillWidth
      radius="l"
      border="neutral-alpha-weak"
      background="surface"
      padding="16"
      gap="m"
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Carousel
        sizes="(max-width: 960px) 100vw, 960px"
        aspectRatio="16 / 9"
        radius="m"
        items={images.map((image) => ({
          slide: image,
          alt: title,
        }))}
      />
      <Column fillWidth gap="12" paddingX="4" flex={1}>
        <Column gap="8" fillWidth>
          <Row fillWidth horizontal="between" vertical="center">
            {title && (
              <Heading as="h2" wrap="balance" variant="heading-strong-l">
                {title}
              </Heading>
            )}
            {badge && (
              <Badge background="success-alpha-weak" onBackground="success-strong">
                {badge}
              </Badge>
            )}
          </Row>
          {(category || year) && (
            <Text variant="body-default-xs" onBackground="neutral-weak">
              {category} {category && year && "•"} {year}
            </Text>
          )}
          {description?.trim() && (
            <Text wrap="balance" variant="body-default-s" onBackground="neutral-weak">
              {description}
            </Text>
          )}
        </Column>

        {(frameworks.length > 0 || languages.length > 0) && (
          <Flex gap="8" wrap marginTop="8">
            {languages.map((lang) => (
              <Tag key={lang} size="s">
                {lang}
              </Tag>
            ))}
            {frameworks.map((fw) => (
              <Tag key={fw} size="s">
                {fw}
              </Tag>
            ))}
          </Flex>
        )}
      </Column>

      <Row fillWidth horizontal="between" vertical="end" paddingX="4" paddingTop="m">
        <Column gap="4">
          {type && (
            <Text variant="body-default-xs" onBackground="neutral-weak">
              {type}
            </Text>
          )}
          {duration && (
            <Text variant="body-default-xs" onBackground="neutral-weak">
              Duration: {duration}
            </Text>
          )}
        </Column>
        <Row gap="16" vertical="center">
          {href && (
            <SmartLink
              href={href}
              target="_blank"
              style={{
                background: 'var(--neutral-on-background-strong)',
                color: 'var(--neutral-background-strong)',
                padding: '8px 16px',
                borderRadius: 'var(--radius-s)',
                textDecoration: 'none'
              }}
            >
              <Text variant="body-strong-xs">Live Site</Text>
            </SmartLink>
          )}
          {link && (
            <SmartLink
              href={link}
              target="_blank"
              prefixIcon="github"
              style={{
                color: 'var(--neutral-on-background-strong)',
                textDecoration: 'none'
              }}
            >
              <Text variant="body-strong-xs">View Code</Text>
            </SmartLink>
          )}
        </Row>
      </Row>
    </Column>
  );
};
