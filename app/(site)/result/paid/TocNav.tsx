"use client";

import { useEffect, useState } from "react";
import styles from "./paid.module.css";

export type TocEntry = { id: string; mark: string; label: string };

/** 하단 고정 목차 버튼 + 바텀시트. 스크롤에 따라 현재 섹션 라벨이 바뀐다. */
export function TocNav({ entries }: { entries: TocEntry[] }) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(entries[0]?.id ?? "");

  useEffect(() => {
    document.body.classList.toggle("toc_open", open);
    return () => document.body.classList.remove("toc_open");
  }, [open]);

  useEffect(() => {
    const sections = entries
      .map((e) => document.getElementById(e.id))
      .filter((el): el is HTMLElement => el !== null);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (obsEntries) => {
        obsEntries.forEach((entry) => {
          if (entry.isIntersecting) setCurrent(entry.target.id);
        });
      },
      { rootMargin: "-25% 0px -65% 0px" },
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [entries]);

  const jump = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setOpen(false);
    // 시트가 닫히는 동안 기다렸다가 이동 (기존 180ms 지연과 동일)
    setTimeout(() => {
      const target = document.getElementById(id);
      if (!target) return;
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - 70,
        behavior: "smooth",
      });
    }, 180);
  };

  const currentLabel = entries.find((e) => e.id === current)?.label ?? entries[0]?.label ?? "";

  return (
    <>
      <button
        type="button"
        className={styles.tocFab}
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        <span className={styles.ic}>
          <i />
          <i />
          <i />
        </span>
        목차 <span className={styles.now}>{currentLabel}</span>
      </button>

      <div
        className={open ? `${styles.tocDim} ${styles.open}` : styles.tocDim}
        onClick={() => setOpen(false)}
      />
      <div
        className={open ? `${styles.tocSheet} ${styles.open}` : styles.tocSheet}
        role="dialog"
        aria-label="목차"
        aria-hidden={!open}
      >
        <div className={styles.grip} />
        <h3>목차</h3>
        <nav>
          {entries.map((entry) => (
            <a
              key={entry.id}
              href={`#${entry.id}`}
              className={entry.id === current ? styles.on : undefined}
              onClick={(e) => jump(e, entry.id)}
            >
              <b>{entry.mark}</b> {entry.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
