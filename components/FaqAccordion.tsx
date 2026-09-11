"use client";

import { useAccordion } from "@/hooks/useAccordion";
import { useRevealObserver } from "@/hooks/useRevealObserver";

/** FAQ 아코디언의 동작(한 번에 하나만 열림 + aria 처리)만 공통화하고,
 *  비주얼은 페이지마다 달라서(예: support 는 "Q." 마크가 있고 index 는 없음)
 *  클래스는 각 페이지의 CSS Module 에서 주입받는다. */
export type FaqClasses = {
  list: string;
  item: string;
  active: string;
  question: string;
  /** "Q." 마크. 넘기지 않으면 마크 없이 렌더된다. */
  mark?: string;
  title: string;
  icon: string;
  panel: string;
  panelInner: string;
  text: string;
};

export type FaqItem = {
  question: React.ReactNode;
  answer: React.ReactNode;
};

type Props = {
  items: FaqItem[];
  classes: FaqClasses;
  defaultOpenIndex?: number | null;
  /** true 면 리스트 컨테이너 자체가 스크롤 리빌 대상이 된다 (기존 `class="faq_list reveal"`). */
  reveal?: boolean;
};

export function FaqAccordion({
  items,
  classes,
  defaultOpenIndex = null,
  reveal = false,
}: Props) {
  const { openIndex, toggle } = useAccordion(defaultOpenIndex);
  const { ref, visible } = useRevealObserver<HTMLDivElement>();

  const listClasses = [
    classes.list,
    reveal ? "reveal" : null,
    reveal && visible ? "is-visible" : null,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={listClasses} ref={reveal ? ref : undefined}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className={isOpen ? `${classes.item} ${classes.active}` : classes.item}
          >
            <button
              type="button"
              className={classes.question}
              aria-expanded={isOpen}
              onClick={() => toggle(index)}
            >
              {classes.mark && <span className={classes.mark}>Q.</span>}
              <span className={classes.title}>{item.question}</span>
              <span className={classes.icon} />
            </button>
            <div className={classes.panel}>
              <div className={classes.panelInner}>
                <div className={classes.text}>{item.answer}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
