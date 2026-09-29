import Image from "next/image";
import Link from "next/link";
import logo from "../../public/main-logo.png";
import { site } from "@/lib/site";

type Props = { className?: string; preload?: boolean };

export function Logo({ className = "h-12 w-auto", preload = false }: Props) {
  return (
    <Link href="/" aria-label={`${site.name} home`} className="inline-flex shrink-0 items-center">
      <Image
        src={logo}
        alt={`${site.name} logo`}
        className={className}
        sizes="(min-width: 640px) 128px, 112px"
        preload={preload}
        placeholder="empty"
      />
    </Link>
  );
}
