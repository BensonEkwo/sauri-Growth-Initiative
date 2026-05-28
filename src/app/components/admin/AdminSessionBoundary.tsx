"use client";

import { useEffect } from "react";

type AdminSessionBoundaryProps = {
  children: React.ReactNode;
};

export function AdminSessionBoundary({ children }: AdminSessionBoundaryProps) {
  useEffect(() => {
    let endingSession = false;

    function endSession() {
      if (endingSession) {
        return;
      }

      endingSession = true;
      void fetch("/api/admin/logout", {
        method: "POST",
        credentials: "same-origin",
        keepalive: true,
      });
    }

    window.addEventListener("beforeunload", endSession);
    window.addEventListener("pagehide", endSession);

    return () => {
      window.removeEventListener("beforeunload", endSession);
      window.removeEventListener("pagehide", endSession);
    };
  }, []);

  return children;
}
