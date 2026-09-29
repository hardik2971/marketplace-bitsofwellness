import type { Metadata } from "next";
import { Logo } from "@/components/Logo";
import { LoginForm } from "@/components/LoginForm";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to your BitesOfWellness account to buy products and download your purchases, licences and invoices.",
  alternates: { canonical: "/login" },
  robots: { index: true, follow: true },
};

export default function LoginPage() {
  return (
    <section className="bg-soft py-12 lg:py-20">
      <div className="container-x flex justify-center">
        <div className="w-full max-w-md rounded-2xl border border-line bg-white p-6 shadow-card sm:p-8">
          <div className="flex justify-center">
            <Logo className="h-14 w-auto" />
          </div>
          <h1 className="mt-6 text-center text-2xl font-semibold text-ink">Welcome back</h1>
          <p className="mt-2 text-center text-base text-body">Log in to buy products and access your downloads.</p>
          <LoginForm />
        </div>
      </div>
    </section>
  );
}
