/** 모든 (site) 페이지의 헤더/드로어/푸터에 중복되어 있던 링크 목록. */

export type NavLink = {
  href: string;
  label: string;
  /** 모바일 드로어에서 라벨 오른쪽에 붙는 작은 설명 */
  badge: string;
};

/** 모바일 드로어 순서 기준. 데스크탑 헤더는 이 배열의 역순으로 노출한다. */
export const NAV_LINKS: NavLink[] = [
  { href: "/", label: "사주보기", badge: "신청하기" },
  { href: "/result/lookup", label: "내 사주 결과 다시보기", badge: "다시보기" },
  { href: "/support", label: "고객센터", badge: "문의" },
];

export type PolicyLink = {
  href: string;
  label: string;
};

/** 푸터 하단 팝업 링크. window.open 의 창 이름으로도 label 을 그대로 쓴다. */
export const POLICY_LINKS: PolicyLink[] = [
  { href: "/about", label: "회사소개" },
  { href: "/terms", label: "이용약관" },
  { href: "/privacy", label: "개인정보 처리방침" },
  { href: "/refund", label: "환불정책" },
];
