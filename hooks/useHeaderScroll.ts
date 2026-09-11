"use client";

import { useEffect, useState } from "react";

/** scrollY > 30 이면 헤더에 .scroll 클래스를 붙이던 기존 동작. */
export function useHeaderScroll(threshold = 30) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}
