"use server";

import { getSupabase } from "@/lib/supabase";

export type ContactState = {
  status: "idle" | "success" | "error";
};

export async function submitLead(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const locale = String(formData.get("locale") ?? "tr");

  if (!name || !email || !message) return { status: "error" };

  const supabase = getSupabase();
  if (!supabase) return { status: "error" };

  const { error } = await supabase.from("leads").insert({
    name,
    email,
    message,
    locale: locale === "en" ? "en" : "tr",
  });

  return { status: error ? "error" : "success" };
}
