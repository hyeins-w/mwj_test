/** 기존에는 7개 HTML 파일에 `var KAKAO_CHANNEL_URL = ''` 로 각각 복사돼 있던 값.
 *  .env.local 에 NEXT_PUBLIC_KAKAO_CHANNEL_URL 을 넣으면 전 페이지에 한 번에 반영된다.
 *  비어 있으면 기존과 동일하게 "준비 중" 안내를 띄운다. */
export const KAKAO_CHANNEL_URL = process.env.NEXT_PUBLIC_KAKAO_CHANNEL_URL ?? "";

/** 푸터 정책 링크가 열리는 팝업 창 크기 (기존 window.open 파라미터와 동일). */
export const POLICY_POPUP_FEATURES = "width=720,height=860,scrollbars=yes";
