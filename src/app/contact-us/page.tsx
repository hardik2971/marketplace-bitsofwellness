import type { Metadata } from "next";
import { Clock, Mail, MessageCircle } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { CenterHeading } from "@/components/SectionHeading";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Support – Talk to Our App Experts",
  description:
    "Questions about a health, food or wellness app script, customization, installation or server setup? Contact the BitesOfWellness experts – we reply within 1-2 business days.",
  alternates: { canonical: "/contact-us" },
  openGraph: { url: "/contact-us" },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/contact-us", label: "Contact Us" },
        ]}
        title="Contact Support"
        description="Have a question or need assistance? Reach out to our dedicated support team."
      />

      <section aria-labelledby="experts-title" className="container-x py-16 lg:py-20">
        <CenterHeading
          id="experts-title"
          title="Contact Our Experts"
          description="Whether it is about a script package, customization request, or server setup, drop us your details, and we will get back to you within 1-2 Business Days"
        />
        <ContactForm />

        <ul className="mt-10 grid gap-4 sm:grid-cols-3">
          <li className="flex items-center gap-4 rounded-xl border border-line p-5">
            <span className="inline-flex size-11 items-center justify-center rounded-full bg-brand-50 text-brand-600">
              <Mail aria-hidden="true" className="size-5" />
            </span>
            <p className="flex flex-col text-sm">
              <span className="text-muted">Email us</span>
              <a href={`mailto:${site.email}`} className="font-semibold break-all text-ink hover:text-brand-600">
                {site.email}
              </a>
            </p>
          </li>
          <li className="flex items-center gap-4 rounded-xl border border-line p-5">
            <span className="inline-flex size-11 items-center justify-center rounded-full bg-brand-50 text-brand-600">
              <MessageCircle aria-hidden="true" className="size-5" />
            </span>
            <p className="flex flex-col text-sm">
              <span className="text-muted">WhatsApp</span>
              <a
                href={`https://wa.me/${site.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-ink hover:text-brand-600"
              >
                {site.phone}
              </a>
            </p>
          </li>
          <li className="flex items-center gap-4 rounded-xl border border-line p-5">
            <span className="inline-flex size-11 items-center justify-center rounded-full bg-brand-50 text-brand-600">
              <Clock aria-hidden="true" className="size-5" />
            </span>
            <p className="flex flex-col text-sm">
              <span className="text-muted">Support hours</span>
              <span className="font-semibold text-ink">Mon – Sat, 10:00 – 19:00 IST</span>
            </p>
          </li>
        </ul>
      </section>
    </>
  );
}
