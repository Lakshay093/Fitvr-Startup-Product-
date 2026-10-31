import Link from "next/link";
import type { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
};

const variants = {
  primary: "bg-[#d9e6c7] text-black hover:bg-[#c8d8b3]",
  secondary:
    "border border-[#d1dbc6] bg-[#f7f9f2] text-[#292d26] hover:border-[#b4cbbd]",
  ghost: "text-[#46543a] hover:text-[#697f51]"
};

export function ButtonLink({
  href,
  children,
  variant = "primary"
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-[10px] px-4 py-2 text-sm font-semibold transition ${variants[variant]}`}
    >
      {children}
    </Link>
  );
}
