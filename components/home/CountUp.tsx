"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  target: number;
  /** 천 단위 콤마 표기 여부 (기존 data-comma) */
  comma?: boolean;
};

const DURATION = 1300;

/** 화면에 들어오면 0 → target 으로 카운트업 (easeOutCubic, 1.3초). */
export function CountUp({ target, comma = false }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const format = (v: number) => (comma ? v.toLocaleString("ko-KR") : String(v));
  const [display, setDisplay] = useState(() => format(target));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setDisplay("0");

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          obs.unobserve(entry.target);

          const startTime = performance.now();
          const step = (now: number) => {
            const p = Math.min((now - startTime) / DURATION, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setDisplay(format(Math.floor(eased * target)));
            if (p < 1) requestAnimationFrame(step);
            else setDisplay(format(target));
          };
          requestAnimationFrame(step);
        });
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, comma]);

  return <span ref={ref}>{display}</span>;
}
