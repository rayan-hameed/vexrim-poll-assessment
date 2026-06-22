import OptionButton from "./OptionButton";

export default function PollStep({ step, selectedOptionId, onSelect, progress }) {
  return (
    <div className="flex h-full w-full items-center justify-center p-4 md:p-8">
      <div className="flex w-full max-w-3xl flex-col overflow-hidden rounded-3xl shadow-2xl md:flex-row md:h-[360px]">
        {/* Left panel — title, driven entirely by step.title */}
        <div className="relative flex flex-col justify-center gap-6 bg-gradient-to-br from-brand-orange to-brand-red px-8 py-10 md:w-2/5 md:px-10">
          {/* progress: absolute left-center on md+, inline centered below the small bars on mobile */}
          {progress && (
            <>
              <div className="hidden md:block absolute md:left-4 md:top-1/2 md:-translate-y-1/2">
                {progress}
              </div>
              <div className="md:hidden w-full flex justify-center mb-2">
                {progress}
              </div>
            </>
          )}

          <div className="flex items-end gap-1.5">
            <span className="h-9 w-[3px] rounded-full bg-white/95" />
            <span className="h-6 w-[3px] rounded-full bg-white/55" />
            <span className="h-4 w-[3px] rounded-full bg-white/30" />
          </div>
          <h2 className="font-display text-2xl font-bold leading-snug text-white md:text-3xl">
            {step.title}
          </h2>
        </div>

        {/* Right panel — options, driven entirely by step.options */}
        <div className="flex flex-1 items-center justify-center bg-white px-8 py-10">
          <div className="flex flex-wrap items-start justify-center gap-8 md:gap-10">
            {step.options.map((option) => (
              <OptionButton
                key={option.id}
                option={option}
                selected={selectedOptionId === option.id}
                onSelect={() => onSelect(option.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
