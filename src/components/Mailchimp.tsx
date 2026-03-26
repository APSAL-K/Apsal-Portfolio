"use client";

import { mailchimp } from "@/resources";
import { Button, Heading, Input, Text, Background, Column, Row } from "@once-ui-system/core";
import type { opacity, SpacingToken } from "@once-ui-system/core";
import { useState } from "react";
import emailjs from "@emailjs/browser";

function debounce<T extends (...args: unknown[]) => void>(func: T, delay: number): T {
  let timeout: ReturnType<typeof setTimeout>;
  return ((...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  }) as T;
}

export const Mailchimp: React.FC<React.ComponentProps<typeof Column>> = ({ ...flex }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);

  // EmailJS configuration - Replace these with your actual EmailJS credentials
  // Get these from: https://www.emailjs.com/
  const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "your_service_id";
  const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "your_template_id";
  const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "your_public_key";
  const RECIPIENT_EMAIL = "apsal.k2004@gmail.com";

  const validateEmail = (email: string): boolean => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "name":
        return value.trim() === "" ? "Name is required" : "";
      case "email":
        if (value.trim() === "") return "Email is required";
        if (!validateEmail(value)) return "Please enter a valid email address";
        return "";
      case "message":
        return value.trim() === "" ? "Message is required" : "";
      default:
        return "";
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors: Record<string, string> = {};
    for (const key of Object.keys(formData)) {
      if (key === "company" || key === "role") continue; // Optional fields
      const error = validateField(key, formData[key as keyof typeof formData]);
      if (error) newErrors[key] = error;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Prepare template parameters for EmailJS
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        company: formData.company || "Not provided",
        role: formData.role || "Not provided",
        message: formData.message,
        to_email: RECIPIENT_EMAIL,
        reply_to: formData.email,
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        company: "",
        role: "",
        message: "",
      });
      
      // Clear success message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      console.error("EmailJS error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Column
      overflow="hidden"
      fillWidth
      padding="xl"
      radius="l"
      marginBottom="m"
      horizontal="center"
      align="center"
      background="surface"
      border="neutral-alpha-weak"
      {...flex}
    >
      <Background
        top="0"
        position="absolute"
        mask={{
          x: mailchimp.effects.mask.x,
          y: mailchimp.effects.mask.y,
          radius: mailchimp.effects.mask.radius,
          cursor: mailchimp.effects.mask.cursor,
        }}
        gradient={{
          display: mailchimp.effects.gradient.display,
          opacity: mailchimp.effects.gradient.opacity as opacity,
          x: mailchimp.effects.gradient.x,
          y: mailchimp.effects.gradient.y,
          width: mailchimp.effects.gradient.width,
          height: mailchimp.effects.gradient.height,
          tilt: mailchimp.effects.gradient.tilt,
          colorStart: mailchimp.effects.gradient.colorStart,
          colorEnd: mailchimp.effects.gradient.colorEnd,
        }}
        dots={{
          display: mailchimp.effects.dots.display,
          opacity: mailchimp.effects.dots.opacity as opacity,
          size: mailchimp.effects.dots.size as SpacingToken,
          color: mailchimp.effects.dots.color,
        }}
        grid={{
          display: mailchimp.effects.grid.display,
          opacity: mailchimp.effects.grid.opacity as opacity,
          color: mailchimp.effects.grid.color,
          width: mailchimp.effects.grid.width,
          height: mailchimp.effects.grid.height,
        }}
        lines={{
          display: mailchimp.effects.lines.display,
          opacity: mailchimp.effects.lines.opacity as opacity,
          size: mailchimp.effects.lines.size as SpacingToken,
          thickness: mailchimp.effects.lines.thickness,
          angle: mailchimp.effects.lines.angle,
          color: mailchimp.effects.lines.color,
        }}
      />
      <Column maxWidth="xs" horizontal="center">
        <Heading marginBottom="s" variant="display-strong-xs">
          Get in Touch
        </Heading>
        <Text wrap="balance" marginBottom="l" variant="body-default-l" onBackground="neutral-weak">
          Have a project in mind or want to collaborate? Feel free to reach out. I'd love to hear from you!
        </Text>
      </Column>
      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Column
          fillWidth
          maxWidth={32}
          gap="m"
          s={{ direction: "column" }}
        >
          <Row fillWidth gap="m" s={{ direction: "column" }}>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Your Name *"
              required
              value={formData.name}
              onChange={handleChange}
              errorMessage={errors.name}
            />
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Your Email *"
              required
              value={formData.email}
              onChange={handleChange}
              errorMessage={errors.email}
            />
          </Row>
          <Row fillWidth gap="m" s={{ direction: "column" }}>
            <Input
              id="company"
              name="company"
              type="text"
              placeholder="Company (Optional)"
              value={formData.company}
              onChange={handleChange}
            />
            <Input
              id="role"
              name="role"
              type="text"
              placeholder="Your Role/Title (Optional)"
              value={formData.role}
              onChange={handleChange}
            />
          </Row>
          <Column fillWidth gap="4">
            <textarea
              id="message"
              name="message"
              placeholder="Your Message *"
              required
              value={formData.message}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, message: e.target.value }));
                if (errors.message) {
                  setErrors((prev) => ({ ...prev, message: "" }));
                }
              }}
              style={{
                minHeight: "120px",
                padding: "12px",
                resize: "vertical",
                fontFamily: "var(--font-body)",
                fontSize: "var(--font-size-body-default-m)",
                lineHeight: "var(--line-height-body-default-m)",
                borderRadius: "var(--radius-m)",
                border: "1px solid var(--neutral-alpha-medium)",
                background: "var(--page-background)",
                color: "var(--neutral-on-background-strong)",
              }}
            />
            {errors.message && (
              <Text variant="label-default-s" style={{ color: "var(--error-strong)" }}>
                {errors.message}
              </Text>
            )}
          </Column>
          
          {submitStatus === "success" && (
            <Text variant="body-default-m" style={{ color: "var(--success-strong)" }}>
              Thank you! Your message has been sent successfully. I'll get back to you soon.
            </Text>
          )}
          {submitStatus === "error" && (
            <Text variant="body-default-m" style={{ color: "var(--error-strong)" }}>
              Sorry, there was an error sending your message. Please try again or contact me directly at apsal.k2004@gmail.com
            </Text>
          )}

          <Button
            type="submit"
            size="m"
            fillWidth
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </Column>
      </form>
    </Column>
  );
};
