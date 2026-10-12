"use server";

import { site } from "@/content/site";

export type Fields = { name: string; email: string; message: string };

export type ContactState =
  | { status: "idle" | "success" }
  | { status: "invalid" | "error"; fields: Fields };

export async function sendMessage(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const text = (key: keyof Fields) => {
    const value = formData.get(key);
    return typeof value === "string" ? value : "";
  };
  // Form submission sends line breaks as CRLF, but the textarea's maxLength
  // counts each as one character, so the message is measured with LF.
  const fields: Fields = {
    name: text("name").replace(/\s+/g, " ").trim(),
    email: text("email").trim(),
    message: text("message").replace(/\r\n/g, "\n").trim(),
  };

  const { maxLength } = site.contact;
  // Whitespace runs in the name collapse to a space, so a pasted tab isn't
  // rejected. The browser's type="email" check is stricter; these stop a
  // hand-built request putting control characters into the template's
  // from_name or from_email, or whitespace, an extra @ or an address list into
  // from_email.
  const valid =
    (Object.keys(fields) as (keyof Fields)[]).every(
      (key) => fields[key] && fields[key].length <= maxLength[key],
    ) &&
    !/\p{Cc}/u.test(fields.name) &&
    /^[^\s@,;<>\p{Cc}]+@[^\s@,;<>\p{Cc}]+$/u.test(fields.email);
  if (!valid) return { status: "invalid", fields };

  const {
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID,
    EMAILJS_PUBLIC_KEY,
    EMAILJS_PRIVATE_KEY,
  } = process.env;
  if (
    !EMAILJS_SERVICE_ID ||
    !EMAILJS_TEMPLATE_ID ||
    !EMAILJS_PUBLIC_KEY ||
    !EMAILJS_PRIVATE_KEY
  ) {
    console.error("EmailJS send skipped: EMAILJS_* env vars are not all set");
    return { status: "error", fields };
  }

  // Not rate limited. EmailJS accepts one send per second, so a script calling
  // this can use up the account's monthly quota, after which EmailJS drops
  // every send until the quota resets.
  try {
    const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: EMAILJS_SERVICE_ID,
        template_id: EMAILJS_TEMPLATE_ID,
        user_id: EMAILJS_PUBLIC_KEY,
        accessToken: EMAILJS_PRIVATE_KEY,
        template_params: {
          from_name: fields.name,
          from_email: fields.email,
          message: fields.message,
        },
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      console.error(`EmailJS send failed: ${res.status} ${await res.text()}`);
      return { status: "error", fields };
    }
  } catch (err) {
    console.error("EmailJS send failed:", err);
    return { status: "error", fields };
  }
  return { status: "success" };
}
