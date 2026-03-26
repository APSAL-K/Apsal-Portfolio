import {
  Heading,
  Text,
  Button,
  Avatar,
  RevealFx,
  Column,
  Badge,
  Row,
  Schema,
  Meta,
  Line,
  Tag,
} from "@once-ui-system/core";
import { home, about, person, baseURL, routes } from "@/resources";
import { Contact } from "@/components";
import { Projects } from "@/components/work/Projects";
import { Posts } from "@/components/blog/Posts";
import { getPosts } from "@/utils/utils";

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
}

export default function Home() {
  return (
    <Column maxWidth="m" gap="xl" paddingY="12" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image={`/api/og/generate?title=${encodeURIComponent(home.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Column fillWidth horizontal="center" gap="m">
        <Column maxWidth="s" horizontal="center" align="center" fillWidth>
          {home.featured.display && (
            <RevealFx
              fillWidth
              horizontal="center"
              paddingTop="16"
              paddingBottom="32"
            >
              <Badge
                background="brand-alpha-weak"
                paddingX="12"
                paddingY="4"
                onBackground="neutral-strong"
                textVariant="label-default-s"
                arrow={false}
                href={home.featured.href}
              >
                <Row paddingY="2">{home.featured.title}</Row>
              </Badge>
            </RevealFx>
          )}
          <RevealFx translateY="4" fillWidth horizontal="center" paddingBottom="16">
            <Heading wrap="balance" variant="display-strong-l" align="center">
              {home.headline}
            </Heading>
          </RevealFx>
          <RevealFx translateY="8" delay={0.2} fillWidth horizontal="center" paddingBottom="32">
            <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl" align="center">
              {home.subline}
            </Text>
          </RevealFx>
          <RevealFx paddingTop="12" delay={0.4} horizontal="center" fillWidth>
            <Button
              id="about"
              data-border="rounded"
              href={about.path}
              variant="secondary"
              size="m"
              weight="default"
              arrowIcon
            >
              <Row gap="8" vertical="center" paddingRight="4">
                {about.avatar.display && (
                  <Avatar
                    marginRight="8"
                    style={{ marginLeft: "-0.75rem" }}
                    src={person.avatar}
                    size="m"
                  />
                )}
                {about.title}
              </Row>
            </Button>
          </RevealFx>
        </Column>
      </Column>

      
      {/* Featured Projects Section */}
      {home.featuredProjects?.display && home.featuredProjects.projectSlugs.length > 0 && (
        <RevealFx translateY="16" delay={0.8}>
          <Column fillWidth gap="l" paddingY="xl">
            <Heading as="h2" variant="display-strong-xs" align="center" marginBottom="l">
              {home.featuredProjects.title}
            </Heading>
            <Projects 
              featuredSlugs={home.featuredProjects.projectSlugs}
            />
          </Column>
        </RevealFx>
      )}
      

      {/* Divider */}
      <Row fillWidth paddingY="l" horizontal="center">
        <Line maxWidth={48} />
      </Row>

      {/* Regular Projects Section */}
      <RevealFx translateY="16" delay={0.9}>
        <Projects range={[1, 1]} />
      </RevealFx>

      {routes["/blog"] && (
        <Column fillWidth gap="24" marginBottom="l">
          <Row fillWidth paddingRight="64">
            <Line maxWidth={48} />
          </Row>
          <Row fillWidth gap="24" marginTop="40" s={{ direction: "column" }}>
            <Row flex={1} paddingLeft="l" paddingTop="24">
              <Heading as="h2" variant="display-strong-xs" wrap="balance">
                Latest from the blog
              </Heading>
            </Row>
            <Row flex={3} paddingX="20">
              <Posts range={[1, 2]} columns="2" />
            </Row>
          </Row>
          <Row fillWidth paddingLeft="64" horizontal="end">
            <Line maxWidth={48} />
          </Row>
        </Column>
      )}
      
      <Projects range={[2]} />
      {/* Professional Section */}
      {home.professional?.display && (
        <RevealFx translateY="16" delay={0.6}>
          <Column fillWidth gap="l" paddingY="xl">
            <Heading as="h2" variant="display-strong-xs" align="center" marginBottom="m">
              {home.professional.title}
            </Heading>
            <Column  gap="m" marginBottom="l">
              <Text variant="body-default-l" align="center" onBackground="neutral-weak">
                {home.professional.description}
              </Text>
            </Column>
            <Row fillWidth gap="l" wrap s={{ direction: "column" }}>
              {home.professional.highlights.map((highlight) => (
                <Column key={highlight.title} flex={1} gap="8" padding="m" >
                  <Heading as="h3" variant="heading-strong-m" marginBottom="4">
                    {highlight.title} 
                  </Heading>
                  <Text variant="body-default-m" onBackground="neutral-weak">
                    {highlight.description}
                  </Text>
                </Column>
              ))}
            </Row>
          </Column>
        </RevealFx>
      )}

      {/* Goals Section */}
      {home.goals?.display && (
        <RevealFx translateY="16" delay={0.7}>
          <Column fillWidth gap="l" paddingY="xl">
            <Heading as="h2" variant="display-strong-xs" align="center" marginBottom="m">
              {home.goals.title}
            </Heading>
            <Column maxWidth="m" gap="m">
              {home.goals.items.map((goal) => (
                <Row key={typeof goal === 'string' ? goal :"" } fillWidth gap="12" vertical="center" paddingY="8">
                  <Line background="brand-alpha-strong" vert height="20" />
                  <Text variant="body-default-m">
                    {typeof goal === 'string' ? goal : ""}
                  </Text>
                </Row>
              ))}
            </Column> 
          </Column>
        </RevealFx>
      )}

        <Contact />
      
    </Column>
  );
}
