import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "copper";
  className?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
}: ButtonProps) {
  const styles = {
    primary:
      "bg-forest text-cream hover:bg-forest-deep shadow-[0_1px_0_rgba(255,255,255,0.12)_inset]",
    copper:
      "bg-copper text-cream hover:bg-copper/90 shadow-[0_1px_0_rgba(255,255,255,0.12)_inset]",
    secondary:
      "bg-cream text-ink border border-line hover:border-ink/30",
    ghost: "text-cream underline-offset-4 hover:underline",
  } as const;

  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold tracking-wide transition",
        styles[variant],
        className,
      )}
    >
      {children}
    </Link>
  );
}
