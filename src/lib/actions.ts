"use server";

export type SubmitState = {
  status: "idle" | "success" | "error";
  message?: string;
};

/**
 * Manuscript submission handler for the Begin Your Book form.
 *
 * Validates on the server and acknowledges. In production this would enqueue the
 * submission for an editor to read; we intentionally do not email or persist
 * personal data here.
 */
export async function submitManuscript(
  _prev: SubmitState,
  formData: FormData,
): Promise<SubmitState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const pitch = String(formData.get("pitch") ?? "").trim();

  if (!name || !email || !pitch) {
    return { status: "error", message: "Please complete every field before sending." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "That email doesn't look right — mind checking it?" };
  }
  if (pitch.length < 20) {
    return {
      status: "error",
      message: "Tell us a little more about the book — a sentence or two at least.",
    };
  }

  return { status: "success" };
}

/**
 * General contact-form handler for the Contact page.
 *
 * Validates on the server and acknowledges. As with manuscript submissions, we
 * intentionally do not email or persist personal data here.
 */
export async function submitContactMessage(
  _prev: SubmitState,
  formData: FormData,
): Promise<SubmitState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return { status: "error", message: "Please add your name, email, and a message." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "That email doesn't look right — mind checking it?" };
  }
  if (message.length < 10) {
    return { status: "error", message: "Tell us a little more — a sentence or two at least." };
  }

  return { status: "success" };
}
