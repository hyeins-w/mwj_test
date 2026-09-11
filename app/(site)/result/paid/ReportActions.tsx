"use client";

import styles from "./paid.module.css";

/** PDF 저장(인쇄) / 공유 버튼. 공유는 Web Share → 클립보드 복사 순으로 폴백한다. */
export function ReportActions() {
  const onShare = async () => {
    const url = location.href;
    // TODO: 카카오 JS SDK 연동 위치 — Kakao.Share.sendDefault(...)
    if (navigator.share) {
      try {
        await navigator.share({ title: "명월재 심층사주 해설서", url });
      } catch {
        // 사용자가 공유를 취소한 경우
      }
      return;
    }
    await navigator.clipboard.writeText(url);
    alert("링크가 복사되었습니다.");
  };

  return (
    <div className={styles.acts}>
      <button type="button" className="btn_line" onClick={() => window.print()}>
        PDF로 저장하기
      </button>
      <button type="button" className={styles.act_kakao} onClick={onShare}>
        카카오톡 공유
      </button>
    </div>
  );
}
