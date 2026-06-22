const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";

/**
 * Submits the final poll answers to the Express API.
 * @param {Record<string, string>} answers - map of stepId -> optionId
 * @returns {Promise<{id: number, createdAt: string}>}
 */
export async function submitPoll(answers) {
  const res = await fetch(`${API_BASE}/poll/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ answers }),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || `Request failed with status ${res.status}`);
  }

  return res.json();
}
