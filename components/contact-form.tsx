"use client";

import { useActionState } from "react";
import { sendMessage, type ContactState, type Fields } from "@/app/actions";
import type { Site } from "@/content/site";

const field =
  "rounded-md border border-white/15 bg-white/5 px-3 py-2 text-white focus:border-[red] focus:outline-hidden read-only:opacity-60";
const label = "flex flex-col gap-1.5 text-sm text-white/70";

// Next throws here, rather than in sendMessage, when the action can't run at
// all: a redeploy since the page loaded, a 5xx, or a dropped connection. A
// throw would replace the page, so it becomes an error result instead. The
// cost: the form's action is now a client function, so with JavaScript off the
// form does nothing, and each submit made before hydration is replayed once it
// hydrates.
async function submit(
  prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  try {
    return await sendMessage(prev, formData);
  } catch (err) {
    console.error("Send failed:", err);
    return { status: "error", fields: Object.fromEntries(formData) as Fields };
  }
}

export function ContactForm({
  copy,
  email,
}: {
  copy: Site["contact"];
  email: string;
}) {
  const [state, action, pending] = useActionState<ContactState, FormData>(
    submit,
    { status: "idle" },
  );
  // React resets the form after every action; when a send is rejected the
  // submitted values come back in state so the reset doesn't wipe them.
  const fields = "fields" in state ? state.fields : undefined;

  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (pending) e.preventDefault();
      }}
      className="flex max-w-xl flex-col gap-4"
    >
      {/* Fields go readOnly and the button aria-disabled, not disabled, while
          sending: disabling the focused control drops focus to the page. The
          button still submits, so onSubmit cancels a second submit; React
          skips the action when the submit's default is prevented. */}
      <label className={label}>
        {copy.nameLabel}
        <input
          name="name"
          autoComplete="name"
          required
          maxLength={copy.maxLength.name}
          defaultValue={fields?.name}
          readOnly={pending}
          className={field}
        />
      </label>
      <label className={label}>
        {copy.emailLabel}
        <input
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={copy.maxLength.email}
          defaultValue={fields?.email}
          readOnly={pending}
          className={field}
        />
      </label>
      <label className={label}>
        {copy.messageLabel}
        <textarea
          name="message"
          required
          rows={6}
          maxLength={copy.maxLength.message}
          defaultValue={fields?.message}
          readOnly={pending}
          className={field}
        />
      </label>
      <button
        type="submit"
        aria-disabled={pending}
        className="self-start rounded-md bg-[red] px-5 py-2 font-semibold text-white not-aria-disabled:hover:bg-red-700 aria-disabled:opacity-60"
      >
        {pending ? copy.sendingLabel : copy.submitLabel}
      </button>
      {/* Always mounted: screen readers announce changes to a live region
          that already exists, not one that appears. Empty while sending so
          the last result doesn't sit beside the new attempt. */}
      <p role="status" className="text-sm text-white/80">
        {!pending && state.status === "success" && copy.successMessage}
        {!pending && state.status === "invalid" && copy.invalidMessage}
        {!pending && state.status === "error" && (
          <>
            {copy.errorMessage}{" "}
            <a
              href={`mailto:${email}`}
              className="break-all text-white underline"
            >
              {email}
            </a>
          </>
        )}
      </p>
    </form>
  );
}
