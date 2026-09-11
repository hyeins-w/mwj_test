"use client";

import { useEffect, useRef, useState } from "react";
import { MOCK_FREE_ELEMENTS } from "@/lib/mockSaju";
import styles from "./free.module.css";

/** 화면에 들어오면 막대가 0 → 지정 폭으로 차오른다 (기존 threshold .35 동작 그대로). */
export function OhaengBars() {
  const ref = useRef<HTMLDivElement>(null);
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setFilled(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setFilled(true);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.ohaeng} ref={ref}>
      {MOCK_FREE_ELEMENTS.map((el) => (
        <div key={el.label} className={styles.oh_row}>
          <div className={styles.oh_name}>{el.label}</div>
          <div className={styles.oh_track}>
            <div
              className={styles.oh_bar}
              style={{ background: el.color, width: filled ? `${el.width}%` : 0 }}
            />
          </div>
          <div className={styles.oh_val}>{el.count}</div>
        </div>
      ))}
    </div>
  );
}
