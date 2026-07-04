import { useSyncExternalStore } from "react";

export type AdminSessionStatus = "loading" | "authenticated" | "unauthenticated";

function subscribe() {
  return () => {};
}

function getSnapshot(): AdminSessionStatus {
  return localStorage.getItem("adminAuth") === "true"
    ? "authenticated"
    : "unauthenticated";
}

function getServerSnapshot(): AdminSessionStatus {
  return "loading";
}

export function useAdminSession(): AdminSessionStatus {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
