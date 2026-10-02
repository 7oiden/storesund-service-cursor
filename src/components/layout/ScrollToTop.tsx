"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

const SHOW_AFTER_PX = 240;

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > SHOW_AFTER_PX);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollToTop() {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Til toppen"
      className={cn(
        "fixed right-5 z-30 inline-flex size-10 cursor-pointer items-center justify-center rounded-full border border-forest-deep/30 bg-forest text-cream shadow-sm transition-[opacity,visibility,background-color] duration-300 hover:bg-forest-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest print:hidden",
        "bottom-[max(1.25rem,env(safe-area-inset-bottom))]",
        // `invisible` drops the button from the tab order and a11y tree
        // without aria-hidden on a (possibly still focused) element.
        visible ? "opacity-100" : "invisible opacity-0",
      )}
    >
      <ArrowUp size={16} strokeWidth={2} />
    </button>
  );
}
