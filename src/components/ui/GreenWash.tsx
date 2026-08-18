export function GreenWash() {
  return (
    <>
      <div aria-hidden className="hero-wash pointer-events-none absolute inset-0" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -left-24 top-[42%] size-[18rem] rounded-full border border-moss/25" />
        <div className="absolute -right-16 -bottom-20 size-[26rem] rounded-full border border-moss/20" />
        <div className="absolute right-[18%] top-[-8rem] size-[14rem] rounded-full border border-white/10" />
      </div>
    </>
  );
}
