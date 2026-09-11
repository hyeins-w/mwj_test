"use client";

import { KAKAO_CHANNEL_URL } from "@/lib/constants";

type Props = {
  className?: string;
  children?: React.ReactNode;
  "aria-label"?: string;
};

/** 기존 7개 파일에 중복돼 있던 .js-kakao 핸들러.
 *  채널 주소가 비어 있으면 기존과 동일하게 준비 중 안내를 띄운다. */
export function KakaoChannelButton({ className, children, ...rest }: Props) {
  const onClick = () => {
    if (KAKAO_CHANNEL_URL) {
      window.open(KAKAO_CHANNEL_URL, "_blank");
    } else {
      alert("카카오톡 채널 링크 준비 중입니다.");
    }
  };

  return (
    <button type="button" className={className} onClick={onClick} {...rest}>
      {children}
    </button>
  );
}
