"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { REVIEW_ROWS, type Review } from "@/lib/reviews";
import styles from "@/app/(site)/home.module.css";
import "@splidejs/splide/css/core";

/** 기존 index.html 의 두 줄 자동 스크롤 후기 슬라이더.
 *  Splide 는 초기 번들에서 빼기 위해 마운트 후 동적 import 한다. */
export function ReviewCarousel() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visible, setVisible] = useState(false);

  // 기존과 동일: 뷰포트에 들어오면 영역 전체가 페이드 인 (threshold 0.1)
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let instances: { destroy: () => void }[] = [];
    let cancelled = false;

    (async () => {
      const [{ Splide }, { AutoScroll }] = await Promise.all([
        import("@splidejs/splide"),
        import("@splidejs/splide-extension-auto-scroll"),
      ]);
      if (cancelled) return;

      instances = rowRefs.current.filter(Boolean).map((el, i) => {
        const splide = new Splide(el as HTMLElement, {
          type: "loop",
          drag: false,
          focus: "center",
          perPage: 1.5,
          autoHeight: true,
          autoScroll: { speed: i === 0 ? 0.5 : -0.5 },
          arrows: false,
          pagination: false,
          gap: "0.5em",
        });
        splide.mount({ AutoScroll });
        return splide;
      });
    })();

    return () => {
      cancelled = true;
      instances.forEach((s) => s.destroy());
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className={`${styles.main_sec4_loopslide}${visible ? " is-visible" : ""}`}
    >
      {REVIEW_ROWS.map((row, rowIndex) => (
        <div
          key={rowIndex}
          ref={(el) => {
            rowRefs.current[rowIndex] = el;
          }}
          className={`splide${rowIndex === 0 ? ` ${styles.splide1}` : ""}`}
          aria-label="명월재 심층사주 후기"
        >
          <div className="splide__track">
            <ul className="splide__list">
              {row.map((review) => (
                <ReviewCard key={review.name} review={review} />
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <li className="splide__slide">
      <div className={styles.rev_star}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Image key={i} src="/img/main/star1.webp" alt="" width={28} height={27} />
        ))}
      </div>
      <div className={styles.rev_txt}>
        <p>{review.text}</p>
      </div>
      <div className={styles.rev_user}>
        <div>
          <Image src="/img/main/rev_user.webp" alt="" width={122} height={122} />
        </div>
        <b>{review.name}</b>
        <span> · {review.age}</span>
      </div>
    </li>
  );
}
