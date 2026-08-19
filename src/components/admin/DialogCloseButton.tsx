"use client";

import { X } from "lucide-react";

export function DialogCloseButton({ onClose }: { onClose: () => void }) {
  return (
    <button
      type="button"
      onClick={onClose}
      aria-label="Lukk"
      className="inline-flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full text-ink-soft transition hover:bg-paper hover:text-ink"
    >
      <X size={18} />
    </button>
  );
}
