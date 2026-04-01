import { Column, Heading, Meta, Schema, Text, Row } from "@once-ui-system/core";
import { baseURL, person, contact } from "@/resources";
import { Contact } from "@/components/Contact";

export async function generateMetadata() {
  return Meta.generate({
    title: contact.title,
    description: contact.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(contact.title)}`,
    path: contact.path,
  });
}

export default function ContactPage() {
  return (
    <Column maxWidth="l" horizontal="center" gap="l">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={contact.title}
        description={contact.description}
        path={contact.path}
        image={`/api/og/generate?title=${encodeURIComponent(contact.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${contact.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Column maxWidth="m" horizontal="center" gap="m" paddingBottom="l">
        <Heading as="h2" variant="display-strong-xs" align="center">
          Junior Software Developer & AI Enthusiast
        </Heading>
        <Heading as="h3" variant="heading-strong-l" align="center" onBackground="brand-strong">
          From Academia to Application
        </Heading>
        <Text wrap="balance" variant="body-default-l" onBackground="neutral-weak" align="center">
          Junior Software Developer with a strong interest in AI, web privacy, and data protection. I’m passionate about building intelligent solutions and exploring generative AI, and I am open for research collaborations and freelance projects.
        </Text>

        <Row gap="l" wrap horizontal="center" paddingTop="s">
          <Row vertical="center" gap="8">
            <Text variant="body-default-m" onBackground="neutral-strong">✓ 24h Response Time</Text>
          </Row>
          <Row vertical="center" gap="8">
            <Text variant="body-default-m" onBackground="neutral-strong">✓ Open to Opportunities</Text>
          </Row>
          <Row vertical="center" gap="8">
            <Text variant="body-default-m" onBackground="neutral-strong">✓ Remote Available</Text>
          </Row>
        </Row>
      </Column>

      <Column  horizontal="center" >
        <Contact />
      </Column>

      <Column fillWidth maxWidth="m" gap="l" paddingTop="m" marginTop="m">
        <Column background="surface" padding="m" radius="m" border="neutral-alpha-weak">
          <Heading as="h3" variant="display-strong-xs" align="center" marginBottom="s">
            Frequently Asked Questions
          </Heading>
          <Column gap="s">
            <Column background="surface" padding="m" radius="m" border="neutral-alpha-weak">
              <Text variant="heading-strong-m" marginBottom="4">What services do you offer?</Text>
              <Text variant="body-default-m" onBackground="neutral-weak">I specialize in building modern web applications with a focus on AI integration and privacy. I can help build scalable solutions or enhance existing platforms using React and .NET.</Text>
            </Column>
            <Column background="surface" padding="m" radius="m" border="neutral-alpha-weak">
              <Text variant="heading-strong-m" marginBottom="4">Are you open for freelance projects?</Text>
              <Text variant="body-default-m" onBackground="neutral-weak">Yes, I am currently open to freelance opportunities and research collaborations. Feel free to send a message to discuss your project.</Text>
            </Column>
            <Column background="surface" padding="m" radius="m" border="neutral-alpha-weak">
              <Text variant="heading-strong-m" marginBottom="4">What is your response time?</Text>
              <Text variant="body-default-m" onBackground="neutral-weak">I typically aim to respond to all inquiries within 24 hours.</Text>
            </Column>
          </Column>
        </Column>
      </Column>
    </Column>
  );
}
