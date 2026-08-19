"use client";

import { useState, useTransition } from "react";
import { updateAvailability } from "@/app/admin/actions";
import { Toggle } from "@/components/admin/Toggle";
import { availabilityStatusText } from "@/lib/site";

export function AvailabilityCard({ available }: { available: boolean }) {
  const [isAvailable, setIsAvailable] = useState(available);
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  function onToggle(next: boolean) {
    const previous = isAvailable;
    setIsAvailable(next);
    setError("");
    startTransition(async () => {
      const result = await updateAvailability(next);
      if (result.error) {
        setIsAvailable(previous);
        setError(result.error);
      }
    });
  }

  const label = isAvailable
    ? `${availabilityStatusText.available} (slå av når du er offshore)`
    : availabilityStatusText.unavailable;

  return (
    <section className="mt-8 rounded-3xl border border-line bg-cream p-6">
      <div className="rounded-2xl bg-field px-4 py-3 text-sm">
        <Toggle
          label={label}
          checked={isAvailable}
          onChange={onToggle}
          disabled={pending}
        />
      </div>
      {error ? (
        <p className="mt-3 rounded-2xl bg-danger/20 px-4 py-3 text-sm">{error}</p>
      ) : null}
    </section>
  );
}
