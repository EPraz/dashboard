import { createSeed } from "./seed";
import { validateSession } from "./validate-session";
import type { DemoState } from "./model";

export const sessionKey = "aster.demo.v1";
export type LoadedSession = {
  state: DemoState;
  warning: string;
  blocked: boolean;
};
export function loadSession(): LoadedSession {
  const fallback = createSeed();
  if (typeof window === "undefined")
    return { state: fallback, warning: "", blocked: false };
  let saved: string | null;
  try {
    saved = window.localStorage.getItem(sessionKey);
  } catch {
    return {
      state: fallback,
      warning:
        "Browser storage is unavailable. Changes will last for this session only.",
      blocked: false,
    };
  }
  if (saved === null) return { state: fallback, warning: "", blocked: false };
  try {
    return {
      state: validateSession(JSON.parse(saved)),
      warning: "",
      blocked: false,
    };
  } catch {
    return {
      state: fallback,
      warning:
        "Your saved demo could not be read. It has not been replaced. Reset the demo in Settings to save a fresh session.",
      blocked: true,
    };
  }
}

export function saveSession(state: DemoState) {
  window.localStorage.setItem(sessionKey, JSON.stringify(state));
}
