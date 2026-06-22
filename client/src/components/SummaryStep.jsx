import { pollSteps } from "../config/pollSteps";

export default function SummaryStep({ answers, onSubmit, status, error, onReset }) {
  const findOption = (step, optionId) =>
    step.options.find((opt) => opt.id === optionId);

  if (status === "submitted") {
    return (
      <div className="flex h-full w-full items-center justify-center p-4 md:p-8">
        <div className="animate-reveal-left w-full max-w-xl rounded-3xl bg-white p-10 text-center shadow-2xl">
          <div className="mb-4 text-5xl">🎉</div>
          <h2 className="font-display text-2xl font-bold text-ink">Thanks for your answers!</h2>
          <p className="mt-2 text-muted">Your responses have been saved.</p>
          <button
            type="button"
            onClick={onReset}
            className="mt-6 rounded-full bg-brand-orange px-6 py-2.5 font-medium text-white transition hover:bg-brand-orange-dark"
          >
            Take it again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-xl rounded-3xl bg-white p-8 shadow-2xl md:p-10">
        <h2 className="font-display mb-6 text-2xl font-bold text-ink">Here's what you told us</h2>

        <ul className="flex flex-col gap-4">
          {pollSteps.map((step, index) => {
            const option = findOption(step, answers[step.id]);
            return (
              <li
                key={step.id}
                className="animate-reveal-left flex items-center justify-between gap-4 rounded-2xl bg-paper px-5 py-4"
                style={{ animationDelay: `${index * 90}ms` }}
              >
                <span className="text-sm font-medium text-ink/80">{step.title}</span>
                <span className="flex items-center gap-2 whitespace-nowrap rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-brand-orange-dark shadow-sm">
                  <span aria-hidden="true">{option?.icon}</span>
                  {option?.label ?? "Not answered"}
                </span>
              </li>
            );
          })}
        </ul>

        {status === "error" && (
          <p className="mt-4 text-sm font-medium text-red-600">
            {error || "Something went wrong while submitting. Please try again."}
          </p>
        )}

        <button
          type="button"
          onClick={onSubmit}
          disabled={status === "submitting"}
          className="mt-8 w-full rounded-full bg-brand-orange py-3 font-semibold text-white transition hover:bg-brand-orange-dark disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? "Submitting…" : "Submit poll"}
        </button>
      </div>
    </div>
  );
}
