"use client";

import { useRevealObserver } from "@/hooks/useRevealObserver";

type Props = {
  children: React.ReactNode;
  /** 리빌 대상 요소에 함께 붙일 클래스 (기존 마크업의 `class="help_row reveal"` 형태 유지) */
  className?: string;
  /** fade = .reveal, scale = .reveal-scale, group = .reveal-group (자식에 .reveal-item) */
  variant?: "fade" | "scale" | "group";
  id?: string;
};

const VARIANT_CLASS = {
  fade: "reveal",
  scale: "reveal-scale",
  group: "reveal-group",
} as const;

/** 별도 래퍼 div 를 추가하지 않고, 기존처럼 해당 요소 자체에 리빌 클래스를 붙인다. */
export function Reveal({ children, className, variant = "fade", id }: Props) {
  const { ref, visible } = useRevealObserver<HTMLDivElement>();
  const classes = [className, VARIANT_CLASS[variant], visible ? "is-visible" : null]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={ref} id={id} className={classes}>
      {children}
    </div>
  );
}
