"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { FaqItem } from "@/lib/data";
import { cn } from "@/lib/utils";

export function FaqList({ items }: { items: FaqItem[] }) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className="divide-y divide-line overflow-hidden rounded-3xl border border-line bg-cream">
      {items.map((item) => {
        const open = openId === item.id;
        const panelId = `faq-${item.id}`;
        return (
          <div
            key={item.id}
            className={cn(
              "border-l-2 transition-colors",
              open ? "border-forest bg-field" : "border-transparent",
            )}
          >
            <button
              type="button"
              className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left"
              onClick={() => setOpenId(open ? null : item.id)}
              aria-expanded={open}
              aria-controls={panelId}
            >
              <span className="font-semibold text-ink">{item.question}</span>
              <span
                className={cn(
                  "inline-flex size-7 shrink-0 items-center justify-center rounded-full transition",
                  open ? "rotate-180 bg-forest text-cream" : "bg-forest/10 text-forest",
                )}
              >
                <ChevronDown size={16} />
              </span>
            </button>
            <div
              id={panelId}
              inert={!open}
              className={cn(
                "grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none",
                open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-5 text-sm leading-7 text-ink-soft">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
