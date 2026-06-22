export default function ProgressDots({ total, current }) {
  return (
    <div className="flex items-center justify-center gap-2 flex-row md:flex-col" role="tablist" aria-label="Poll progress">
      {Array.from({ length: total }).map((_, index) => (
        <span
          key={index}
          role="tab"
          aria-selected={index === current}
          className={[
            "rounded-full transition-all duration-300",
            // desktop: vertical dots (height varies); mobile: horizontal pills (width varies)
            index === current
              ? "md:h-6 md:w-2 h-2 w-6 bg-brand-orange"
              : index < current
                ? "md:h-3 md:w-2 h-2 w-2 bg-brand-orange/50"
                : "md:h-3 md:w-2 h-2 w-2 bg-neutral-300",
          ].join(" ")}
        />
      ))}
    </div>
  );
}
