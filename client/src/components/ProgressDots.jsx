export default function ProgressDots({ total, current }) {
  return (
    <div className="flex items-center justify-center gap-2" role="tablist" aria-label="Poll progress">
      {Array.from({ length: total }).map((_, index) => (
        <span
          key={index}
          role="tab"
          aria-selected={index === current}
          className={[
            "h-2 rounded-full transition-all duration-300",
            index === current
              ? "w-6 bg-brand-orange"
              : index < current
                ? "w-2 bg-brand-orange/50"
                : "w-2 bg-neutral-300",
          ].join(" ")}
        />
      ))}
    </div>
  );
}
