import { createClient } from "@supabase/supabase-js";
export const supabase = createClient(
  "https://agpaujrwgdhzvcqhlcey.supabase.co",
  "sb_publishable_RPcPEkjfHRqKjgI2oSkdxA_CVvea7o_",
);
const keys = [
  "pcmg-progresso",
  "pcmg-erros",
  "pcmg-favorites",
  "pcmg-simulado-history",
  "pcmg-user-name",
  "pcmg-cargo",
  "pcmg-daily-goal",
  "pcmg-study",
  "pcmg-notes",
  "pcmg-events",
  "pcmg-theme",
  "pcmg-simulado-draft",
];
let ready = false;
let timer: ReturnType<typeof setTimeout>;
let listener: (() => void) | null = null;
export async function startCloud() {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) return false;
  const { data, error } = await supabase
    .from("student_workspaces")
    .select("data")
    .eq("user_id", session.user.id)
    .maybeSingle();
  if (error) throw error;
  // Cloud account data replaces this browser cache. A new account starts clean.
  const pending =
    localStorage.getItem("pcmg-cloud-user") === session.user.id &&
    localStorage.getItem("pcmg-cloud-dirty") === "true";
  if (!pending)
    for (const key of keys) {
      localStorage.removeItem(key);
      if (data?.data?.[key] !== undefined)
        localStorage.setItem(key, data.data[key]);
    }
  Object.keys(localStorage).filter(k=>k.startsWith("ibgp-")).forEach(k=>localStorage.removeItem(k));
  localStorage.setItem("pcmg-cloud-user", session.user.id);
  if (listener) window.removeEventListener("pcmg-change", listener);
  ready = true;
  localStorage.setItem(
    "pcmg-user-name",
    localStorage.getItem("pcmg-user-name") ||
      session.user.user_metadata.display_name ||
      "Aluno",
  );
  listener = () => {
    localStorage.setItem("pcmg-cloud-dirty", "true");
    clearTimeout(timer);
    timer = setTimeout(() => {
      void syncCloud().catch(() => {});
    }, 800);
  };
  window.addEventListener("pcmg-change", listener);
  if (pending) await syncCloud();
  return true;
}
export async function syncCloud() {
  if (!ready) return;
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) return;
  const data = Object.fromEntries(
    keys
      .filter((k) => localStorage.getItem(k) !== null)
      .map((k) => [k, localStorage.getItem(k)]),
  );
  const { error } = await supabase
    .from("student_workspaces")
    .upsert({
      user_id: session.user.id,
      data,
      updated_at: new Date().toISOString(),
    });
  window.dispatchEvent(
    new CustomEvent("pcmg-sync", {
      detail: error
        ? "Não sincronizado. Seus dados continuam neste navegador."
        : "Sincronizado na nuvem",
    }),
  );
  if (error) throw error;
  localStorage.removeItem("pcmg-cloud-dirty");
}
export function notifyChange() {
  window.dispatchEvent(new Event("pcmg-change"));
}
export async function logoutCloud() {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  await syncCloud();
  ready = false;
  if (listener) window.removeEventListener("pcmg-change", listener);
  clearTimeout(timer);
  await supabase.auth.signOut();
  if (session) {
    for (const key of keys) localStorage.removeItem(key);
    localStorage.removeItem("pcmg-cloud-user");
    localStorage.removeItem("pcmg-cloud-dirty");
  }
  Object.keys(localStorage)
    .filter((k) => k.startsWith("ibgp-"))
    .forEach((k) => localStorage.removeItem(k));
  localStorage.removeItem("pcmg-login");
  localStorage.removeItem("ibgp-login");
  localStorage.removeItem("pcmg-guest");
}
export function readJSON<T>(key: string, fallback: T): T {
  try {
    return JSON.parse(localStorage.getItem(key) ?? "null") ?? fallback;
  } catch {
    return fallback;
  }
}
