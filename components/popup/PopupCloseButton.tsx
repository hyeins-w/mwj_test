"use client";

/** 기존 4개 팝업 페이지에 중복돼 있던 pageClose(). 팝업으로 열렸으면 창을 닫고,
 *  아니면 이전 페이지로 돌아간다. */
export function PopupCloseButton() {
  const onClick = () => {
    if (window.opener) {
      window.close();
    } else {
      history.back();
    }
  };

  return (
    <button type="button" className="closeBtn" onClick={onClick}>
      닫기
    </button>
  );
}
