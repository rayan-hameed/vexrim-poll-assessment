import { useState } from "react";
import { pollSteps } from "../config/pollSteps";
import { usePoll } from "../context/PollContext";
import { submitPoll } from "../api/pollApi";
import VerticalCarousel from "./VerticalCarousel";
import PollStep from "./PollStep";
import SummaryStep from "./SummaryStep";
import ProgressDots from "./ProgressDots";

export default function PollContainer() {
  const {
    stepIndex,
    answers,
    isSummary,
    currentStep,
    hasAnsweredCurrent,
    totalSteps,
    status,
    error,
    selectOption,
    goNext,
    goPrev,
    reset,
    dispatch,
  } = usePoll();

  const [localError, setLocalError] = useState(null);

  const progressEl = <ProgressDots total={totalSteps} current={stepIndex} />;

  const slides = pollSteps.map((step) => (
    <PollStep
      key={step.id}
      step={step}
      selectedOptionId={answers[step.id]}
      onSelect={(optionId) => selectOption(step.id, optionId)}
      progress={progressEl}
    />
  ));

  const handleSubmit = async () => {
    setLocalError(null);
    dispatch({ type: "SUBMIT_START" });
    try {
      await submitPoll(answers);
      dispatch({ type: "SUBMIT_SUCCESS" });
    } catch (err) {
      setLocalError(err.message);
      dispatch({ type: "SUBMIT_ERROR", error: err.message });
    }
  };

  return (
    <div className="flex h-full w-full flex-col gap-6">
      <div className="flex-1">
        <div className="h-[480px] sm:h-[420px]">
          {isSummary ? (
            <SummaryStep
              answers={answers}
              status={status}
              error={localError || error}
              onSubmit={handleSubmit}
              onReset={reset}
            />
          ) : (
            <VerticalCarousel activeIndex={stepIndex} slides={slides} />
          )}
        </div>

        {!isSummary && (
          <div className="flex items-center justify-between px-2 pb-2 md:px-8">
            <button
              type="button"
              onClick={goPrev}
              disabled={stepIndex === 0}
              className="rounded-full px-5 py-2.5 font-medium text-ink/70 transition hover:text-ink disabled:cursor-not-allowed disabled:opacity-0"
            >
              Back
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={!hasAnsweredCurrent}
              className="rounded-full bg-brand-orange px-6 py-2.5 font-semibold text-white transition hover:bg-brand-orange-dark disabled:cursor-not-allowed disabled:opacity-40"
            >
              {stepIndex === totalSteps - 1 ? "Review answers" : "Next"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
