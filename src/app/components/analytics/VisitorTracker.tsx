"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

function makeId(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2)}_${Date.now()}`;
}

export function VisitorTracker() {
  const pathname = usePathname();
  const startedAt = useRef(Date.now());

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (pathname.startsWith("/admin")) {
      return;
    }

    const visitorId = localStorage.getItem("sgi_visitor_id") || makeId("visitor");
    const sessionId = sessionStorage.getItem("sgi_session_id") || makeId("session");
    localStorage.setItem("sgi_visitor_id", visitorId);
    sessionStorage.setItem("sgi_session_id", sessionId);

    const sendEvent = (type: string, payload: Record<string, unknown> = {}) => {
      const body = JSON.stringify({
        visitorId,
        sessionId,
        type,
        path: window.location.pathname,
        ...payload,
      });

      if (type === "session_end" && navigator.sendBeacon) {
        navigator.sendBeacon("/api/analytics/event", new Blob([body], { type: "application/json" }));
        return;
      }

      fetch("/api/analytics/event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        keepalive: true,
      });
    };

    sendEvent("page_view");

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const interactive = target?.closest("a,button");

      if (!interactive) {
        return;
      }

      sendEvent("interaction", {
        label: interactive.textContent?.trim().slice(0, 80) || interactive.getAttribute("aria-label") || "Interaction",
      });
    };

    const handleEnd = () => {
      sendEvent("session_end", {
        durationSeconds: Math.max(1, Math.round((Date.now() - startedAt.current) / 1000)),
      });
    };

    document.addEventListener("click", handleClick);
    window.addEventListener("pagehide", handleEnd);

    return () => {
      document.removeEventListener("click", handleClick);
      window.removeEventListener("pagehide", handleEnd);
    };
  }, [pathname]);

  return null;
}
