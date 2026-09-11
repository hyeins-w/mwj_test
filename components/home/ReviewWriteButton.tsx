"use client";

import styles from "@/app/(site)/home.module.css";

/** 구매 전 상태에서 누르면 안내만 띄우는 기존 동작 그대로. */
export function ReviewWriteButton() {
  return (
    <div
      className={styles.main_review_writingBtn}
      onClick={() => alert("리뷰는 구매 후 결과화면에서 작성 가능합니다.")}
    >
      리뷰쓰기
    </div>
  );
}
