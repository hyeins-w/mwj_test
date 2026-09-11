"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import styles from "./analyzing.module.css";

const ZODIAC = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];

const STEPS = [
  "사주 원국을 세우는 중입니다",
  "오행의 균형을 살피는 중입니다",
  "대운과 세운의 흐름을 읽는 중입니다",
  "21인의 해석을 대조하는 중입니다",
  "해설서를 정리하는 중입니다",
];

const DURATION = 6000;

/** 실제 분석 API 가 붙기 전까지는 시간 기반으로 100% 까지 채우고 자동 이동한다.
 *  API 를 붙일 때는 autoComplete 를 false 로 두고(92% 에서 대기),
 *  응답이 도착하면 complete() 를 호출하는 형태로 바꾸면 된다. */
export function AnalyzingScreen({
  next,
  autoComplete = true,
}: {
  next: string;
  autoComplete?: boolean;
}) {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const finishedRef = useRef(false);

  // 모바일 주소창 높이 보정 (기존 --vh 처리와 동일)
  useEffect(() => {
    const setVh = () =>
      document.documentElement.style.setProperty("--vh", `${window.innerHeight * 0.01}px`);
    setVh();
    window.addEventListener("resize", setVh);
    window.addEventListener("orientationchange", setVh);
    return () => {
      window.removeEventListener("resize", setVh);
      window.removeEventListener("orientationchange", setVh);
    };
  }, []);

  useEffect(() => {
    let rafId = 0;
    let start: number | null = null;
    const ceiling = autoComplete ? 100 : 92;

    const frame = (ts: number) => {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / DURATION, 1);
      setProgress((1 - Math.pow(1 - p, 2.2)) * ceiling);

      if (p < 1) {
        rafId = requestAnimationFrame(frame);
      } else if (autoComplete && !finishedRef.current) {
        finishedRef.current = true;
        setProgress(100);
        setTimeout(() => setDone(true), 400);
        setTimeout(() => router.push(next), 920);
      }
    };

    rafId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafId);
  }, [autoComplete, next, router]);

  const value = Math.max(0, Math.min(100, Math.round(progress)));
  const stepIndex = Math.min(Math.floor((value / 100) * STEPS.length), STEPS.length - 1);

  return (
    <div className={done ? `${styles.load} ${styles.done}` : styles.load}>
      <Image className={styles.load_logo} src="/img/main/logo.webp" alt="명월재" width={275} height={83} priority />

      <div className={styles.ring}>
        <div className={styles.ring_line}>
          {ZODIAC.map((ch, i) => (
            <span key={ch} style={{ "--i": i } as React.CSSProperties}>
              {ch}
            </span>
          ))}
        </div>
        <div className={styles.ring_core} />
      </div>

      <h1 className={styles.load_tit}>
        당신의 사주를
        <br />
        풀이하고 있습니다
      </h1>

      <div className={styles.load_step}>
        {STEPS.map((step, i) => (
          <p key={step} className={i === stepIndex ? styles.on : undefined}>
            {step}
          </p>
        ))}
      </div>

      <div
        className={styles.bar}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={value}
        aria-label="사주 분석 진행률"
      >
        <div className={styles.bar_track}>
          <div className={styles.bar_fill} style={{ width: `${value}%` }} />
        </div>
        <span className={styles.bar_pct}>{value}%</span>
      </div>

      <p className={styles.load_note}>완료되면 자동으로 넘어갑니다</p>
    </div>
  );
}
