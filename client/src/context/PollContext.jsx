import { createContext, useContext, useMemo, useReducer } from "react";
import { pollSteps } from "../config/pollSteps";

const PollContext = createContext(null);

const initialState = {
  stepIndex: 0, // index into pollSteps; equals pollSteps.length once finished
  answers: {}, // { [stepId]: optionId }
  direction: "forward", // "forward" | "backward" — drives carousel slide direction
  status: "idle", // "idle" | "submitting" | "submitted" | "error"
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "SELECT_OPTION":
      return {
        ...state,
        answers: { ...state.answers, [action.stepId]: action.optionId },
      };
    case "NEXT_STEP":
      return {
        ...state,
        direction: "forward",
        stepIndex: Math.min(state.stepIndex + 1, pollSteps.length),
      };
    case "PREV_STEP":
      return {
        ...state,
        direction: "backward",
        stepIndex: Math.max(state.stepIndex - 1, 0),
      };
    case "SUBMIT_START":
      return { ...state, status: "submitting", error: null };
    case "SUBMIT_SUCCESS":
      return { ...state, status: "submitted" };
    case "SUBMIT_ERROR":
      return { ...state, status: "error", error: action.error };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

export function PollProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => {
    const totalSteps = pollSteps.length;
    const isSummary = state.stepIndex >= totalSteps;
    const currentStep = isSummary ? null : pollSteps[state.stepIndex];
    const hasAnsweredCurrent = currentStep
      ? Boolean(state.answers[currentStep.id])
      : true;

    return {
      ...state,
      totalSteps,
      isSummary,
      currentStep,
      hasAnsweredCurrent,
      selectOption: (stepId, optionId) =>
        dispatch({ type: "SELECT_OPTION", stepId, optionId }),
      goNext: () => dispatch({ type: "NEXT_STEP" }),
      goPrev: () => dispatch({ type: "PREV_STEP" }),
      reset: () => dispatch({ type: "RESET" }),
      dispatch,
    };
  }, [state]);

  return <PollContext.Provider value={value}>{children}</PollContext.Provider>;
}

export function usePoll() {
  const ctx = useContext(PollContext);
  if (!ctx) {
    throw new Error("usePoll must be used within a PollProvider");
  }
  return ctx;
}
