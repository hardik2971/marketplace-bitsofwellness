import type { Metadata } from "next";
import { BadgeCheck, Download, Headset } from "lucide-react";
import { Logo } from "@/components/Logo";
import { RegisterForm } from "@/components/RegisterForm";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create your free BitesOfWellness account to buy app source code, manage licences and download updates.",
  alternates: { canonical: "/register" },
  robots: { index: true, follow: true },
};

const perks = [
  { Icon: Download, text: "Instant access to downloads & lifetime updates" },
  { Icon: BadgeCheck, text: "Manage licences and invoices in one place" },
  { Icon: Headset, text: "Priority support from our product team" },
];

export default function RegisterPage() {
  return (
    <section className="bg-soft py-12 lg:py-20">
      <div className="container-x grid items-start gap-8 lg:grid-cols-[1fr_560px] lg:gap-12">
        <div className="hidden pt-10 lg:block">
          <Logo className="h-16 w-auto" />
          <p className="mt-8 text-3xl leading-tight font-semibold text-ink">Launch your health &amp; food business faster</p>
          <p className="mt-4 max-w-md text-base leading-7 text-body">
            Create an account to purchase ready-made apps, UI kits and installation plans.
          </p>
          <ul className="mt-8 space-y-4">
            {perks.map(({ Icon, text }) => (
              <li key={text} className="flex items-center gap-3 text-base text-ink">
                <span className="inline-flex size-10 items-center justify-center rounded-lg bg-brand-600 text-white">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                {text}
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full rounded-2xl border border-line bg-white p-6 shadow-card sm:p-8">
          <div className="flex justify-center lg:hidden">
            <Logo className="h-14 w-auto" />
          </div>
          <h1 className="mt-6 text-center text-2xl font-semibold text-ink lg:mt-0 lg:text-left">Create your account</h1>
          <p className="mt-2 text-center text-base text-body lg:text-left">It&apos;s free and takes less than a minute.</p>
          <RegisterForm />
        </div>
      </div>
    </section>
  );
}
