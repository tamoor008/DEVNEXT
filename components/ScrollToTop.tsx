"use client";

import { useEffect } from "react";

export default function ScrollToTop() {
  useEffect(() => {
    // Force scroll to top on page reload or mount
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
      
      // Prevent browser from restoring scroll position on reload
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
    }
  }, []);

  return null;
}
