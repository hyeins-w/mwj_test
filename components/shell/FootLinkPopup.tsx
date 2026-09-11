"use client";

import { POLICY_POPUP_FEATURES } from "@/lib/constants";

type Props = {
  href: string;
  /** 팝업 창 이름으로도 쓰인다 (기존 data-popup 값). */
  label: string;
  /** 링크에 표시할 문구. 기본값은 label (결제 페이지의 "보기" 링크처럼 다를 수 있음). */
  text?: string;
  className?: string;
};

/** 기존 .foot_link 동작: 기본 이동을 막고 지정 크기의 팝업 창으로 연다. */
export function FootLinkPopup({ href, label, text, className }: Props) {
  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.open(href, label, POLICY_POPUP_FEATURES);
  };

  return (
    <a href={href} className={className} onClick={onClick}>
      {text ?? label}
    </a>
  );
}
