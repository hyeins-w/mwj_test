"use client";

import { useEffect, useRef, useState } from "react";

/** 기존 6개 페이지에서 동일하게 쓰이던 스크롤 리빌 옵저버 설정. */
export const REVEAL_OBSERVER_OPTIONS: IntersectionObserverInit = {
  threshold: 0.12,
  rootMargin: "0px 0px -6% 0px",
};

/** 요소가 뷰포트에 들어오면 한 번만 visible 로 바꾼다.
 *  prefers-reduced-motion 이면 기존과 동일하게 처음부터 visible 로 둔다. */
export function useRevealObserver<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(entry.target);
        }
      });
    }, REVEAL_OBSERVER_OPTIONS);

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}
