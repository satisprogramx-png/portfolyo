"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useLocale, useTranslations } from "next-intl";
import { submitLead, type ContactState } from "@/app/actions/contact";

const initialState: ContactState = { status: "idle" };

function SubmitButton() {
  const t = useTranslations("contact");
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full bg-accent px-6 py-3 font-semibold text-accent-fg hover:opacity-90 disabled:opacity-60"
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
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="locale" value={locale} />
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm text-muted">
          {t("name")}
        </label>
        <input
          id="name"
          name="name"
          required
          className="w-full rounded-xl border border-line bg-surface px-4 py-3 outline-none focus:border-accent"
        />
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
          className="w-full rounded-xl border border-line bg-surface px-4 py-3 outline-none focus:border-accent"
        />
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
          className="w-full rounded-xl border border-line bg-surface px-4 py-3 outline-none focus:border-accent"
        />
      </div>
      <SubmitButton />
      <p aria-live="polite" className="min-h-6 text-sm">
        {state.status === "success" && (
          <span className="text-accent">{t("success")}</span>
        )}
        {state.status === "error" && (
          <span className="text-muted">{t("error")}</span>
        )}
      </p>
    </form>
  );
}
