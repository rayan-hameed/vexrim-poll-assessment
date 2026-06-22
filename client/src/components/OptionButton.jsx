export default function OptionButton({ option, selected, onSelect }) {
  return (
    <div className="group flex flex-col items-center gap-3">
      <button
        type="button"
        onClick={onSelect}
        aria-pressed={selected}
        aria-label={option.label}
        className={[
          "flex h-16 w-16 items-center justify-center rounded-full text-3xl",
          "transition-all duration-300 ease-out",
          "ring-2 ring-offset-2 ring-offset-white focus-visible:outline-none focus-visible:ring-brand-orange",
          selected
            ? "scale-110 bg-brand-orange/10 ring-brand-orange shadow-lg"
            : "bg-neutral-50 ring-transparent hover:ring-brand-orange/40 hover:scale-105",
        ].join(" ")}
      >
        <span aria-hidden="true">{option.icon}</span>
      </button>

      <span
        className={[
          "text-sm font-medium transition-all duration-300 ease-out",
          selected
            ? "translate-y-0 text-brand-orange-dark opacity-100"
            : "-translate-y-1 text-ink opacity-0 group-hover:translate-y-0 group-hover:opacity-100",
        ].join(" ")}
      >
        {option.label}
      </span>
    </div>
  );
}
