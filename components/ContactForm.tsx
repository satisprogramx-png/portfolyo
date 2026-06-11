"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useLocale, useTranslations } from "next-intl";
import { submitLead, type ContactState } from "@/app/actions/contact";

const initialState: ContactState = { status: "idle" };

const inputClasses =
  "w-full rounded-xl border border-line bg-bg/60 px-4 py-3 outline-none backdrop-blur placeholder:text-muted/60 focus:border-accent focus:shadow-[0_0_24px_-10px_var(--accent)]";

function SubmitButton() {
  const t = useTranslations("contact");
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-xl bg-accent px-6 py-3.5 font-semibold text-accent-fg shadow-[0_0_32px_-10px_var(--accent)] hover:shadow-[0_0_44px_-8px_var(--accent)] disabled:opacity-60 sm:w-auto"
    >
      {pending ? t("sending") : t("send")}
    </button>
  );
}

export function ContactForm() {
  const t = useTranslations("contact");
  const locale = useLocale();
  const [state, formAction] = useActionState(submitLead, initialState);

  return (
    <form
      action={formAction}
      className="space-y-5 rounded-3xl border border-line bg-surface/70 p-6 backdrop-blur sm:p-8"
    >
      <input type="hidden" name="locale" value={locale} />
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm text-muted">
            {t("name")}
          </label>
          <input id="name" name="name" required className={inputClasses} />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm text-muted">
            {t("email")}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className={inputClasses}
          />
        </div>
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm text-muted">
          {t("message")}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={inputClasses}
        />
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <SubmitButton />
        <p aria-live="polite" className="text-sm">
          {state.status === "success" && (
            <span className="text-accent">{t("success")}</span>
          )}
          {state.status === "error" && (
            <span className="text-muted">{t("error")}</span>
          )}
        </p>
      </div>
    </form>
  );
}
