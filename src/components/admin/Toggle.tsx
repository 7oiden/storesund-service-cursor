export function Toggle({
  name,
  label,
  defaultChecked,
}: {
  name: string;
  label: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-2">
      <input
        name={name}
        type="checkbox"
        defaultChecked={defaultChecked}
        className="peer sr-only"
      />
      <span
        aria-hidden
        className="relative h-6 w-11 shrink-0 rounded-full bg-line transition peer-checked:bg-forest peer-focus-visible:ring-2 peer-focus-visible:ring-forest/50 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-cream after:absolute after:top-0.5 after:left-0.5 after:size-5 after:rounded-full after:bg-cream after:shadow-sm after:transition after:content-[''] peer-checked:after:translate-x-5"
      />
      {label}
    </label>
  );
}
