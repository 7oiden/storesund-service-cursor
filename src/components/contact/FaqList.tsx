"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { FaqItem } from "@/lib/data";
import { cn } from "@/lib/utils";

export function FaqList({ items }: { items: FaqItem[] }) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className="divide-y divide-line rounded-3xl border border-line bg-cream">
      {items.map((item) => {
        const open = openId === item.id;
        return (
          <div key={item.id}>
            <button
              type="button"
              className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left"
              onClick={() => setOpenId(open ? null : item.id)}
              aria-expanded={open}
            >
              <span className="font-semibold text-ink">{item.question}</span>
              <ChevronDown
                size={18}
                className={cn(
                  "shrink-0 text-forest transition",
                  open && "rotate-180",
                )}
              />
            </button>
            {open ? (
              <p className="px-6 pb-5 text-sm leading-7 text-ink-soft">
                {item.answer}
              </p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
