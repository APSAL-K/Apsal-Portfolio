import { Column, Heading, Meta, Schema, Row, Text } from "@once-ui-system/core";
import { baseURL, about, person, work } from "@/resources";
import { Projects } from "@/components/work/Projects";
import { getPosts } from "@/utils/utils";

export async function generateMetadata() {
  return Meta.generate({
    title: work.title,
    description: work.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(work.title)}`,
    path: work.path,
  });
}

export default function Work() {
  const allProjects = getPosts(["src", "app", "work", "projects"]);
  return (
    <Column maxWidth="m" paddingTop="24">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={work.path}
        title={work.title}
        description={work.description}
        image={`/api/og/generate?title=${encodeURIComponent(work.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Column fillWidth gap="m" marginBottom="xl">
        <Heading variant="display-strong-xs" align="center">
          {work.title}
        </Heading>
        <Text variant="body-default-l" onBackground="neutral-weak" align="center" style={{ maxWidth: '800px', margin: '0 auto' }}>
          {work.description}
        </Text>
        <Row horizontal="center" vertical="center" gap="12" marginTop="m" wrap>
          <Text variant="body-default-s" onBackground="neutral-strong">15+ Projects Completed</Text>
          <Text variant="body-default-s" onBackground="neutral-weak">|</Text>
          <Text variant="body-default-s" onBackground="neutral-strong">Multiple Industries</Text>
          <Text variant="body-default-s" onBackground="neutral-weak">|</Text>
          <Text variant="body-default-s" onBackground="neutral-strong">AI/ML Specialist</Text>
        </Row>
      </Column>
      <Projects allProjects={allProjects} />
    </Column>
  );
}
