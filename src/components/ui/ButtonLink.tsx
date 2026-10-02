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
      "bg-copper text-white shadow-[0_1px_0_rgba(255,255,255,0.12)_inset] hover:-translate-y-0.5 hover:bg-[#a35520] hover:shadow-lg hover:shadow-black/25 [&_svg]:transition-transform [&_svg]:duration-300 hover:[&_svg]:translate-x-1",
    secondary:
      "bg-cream text-ink border border-line hover:-translate-y-0.5 hover:border-leaf hover:bg-leaf hover:text-forest-deep hover:shadow-lg hover:shadow-black/20",
    ghost: "text-cream underline-offset-4 hover:underline",
  } as const;

  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold tracking-wide transition duration-200 motion-reduce:transform-none motion-reduce:[&_svg]:transform-none",
        styles[variant],
        className,
      )}
    >
      {children}
    </Link>
  );
}
