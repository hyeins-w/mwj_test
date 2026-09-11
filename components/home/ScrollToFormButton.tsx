"use client";

import styles from "@/app/(site)/home.module.css";

/** 기존 .goForm 동작: 신청 폼 섹션으로 부드럽게 스크롤 (헤더 높이만큼 80px 여백). */
export function ScrollToFormButton() {
  const onClick = () => {
    const target = document.getElementById("apply");
    if (!target) return;
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - 80,
      behavior: "smooth",
    });
  };

  return (
    <div className={styles.main_sec4_btn} onClick={onClick}>
      나의 운명해설서 펼쳐보기 &gt;
    </div>
  );
}
