// All poll steps are driven from this single config array.
// Each step needs only a `title` and a list of `options` — nothing else
// in the app is hardcoded to a specific question, so adding/removing/
// reordering steps (or changing how many options a step has) only
// requires editing this file.

export const pollSteps = [
  {
    id: "week-overall",
    title: "How was your week overall?",
    options: [
      { id: "good", icon: "👍", label: "Good" },
      { id: "okay", icon: "🤔", label: "Okay" },
      { id: "bad", icon: "👎", label: "Bad" },
    ],
  },
  {
    id: "service-satisfaction",
    title: "How satisfied are you with our service?",
    options: [
      { id: "very-satisfied", icon: "😍", label: "Very satisfied" },
      { id: "satisfied", icon: "🙂", label: "Satisfied" },
      { id: "neutral", icon: "😐", label: "Neutral" },
      { id: "unsatisfied", icon: "🙁", label: "Unsatisfied" },
    ],
  },
  {
    id: "recommend",
    title: "Would you recommend us to a friend?",
    options: [
      { id: "yes", icon: "✅", label: "Yes" },
      { id: "maybe", icon: "🤷", label: "Maybe" },
      { id: "no", icon: "❌", label: "No" },
    ],
  },
  {
    id: "return-likelihood",
    title: "How likely are you to use this again?",
    options: [
      { id: "very-likely", icon: "🔥", label: "Very likely" },
      { id: "somewhat", icon: "👌", label: "Somewhat" },
      { id: "not-likely", icon: "🚫", label: "Not likely" },
    ],
  },
];
