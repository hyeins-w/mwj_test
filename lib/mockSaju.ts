import type { SajuMetrics, SajuPillar, SajuProfile } from "@/types/saju";

/** 기존 result_free.html / result_paid.html 에 하드코딩돼 있던 데모 데이터.
 *  실제 분석 결과가 붙으면 이 파일 대신 DB/API 조회로 교체하면 되고,
 *  페이지 컴포넌트는 그대로 두어도 된다. */

export const MOCK_PROFILE: SajuProfile = {
  name: "김민준",
  birthDate: "1994.03.21",
  calendarAndTime: "양력 · 진시",
  gender: "남성",
  issuedAt: "2026.09.10",
};

const ELEMENT_COLOR = {
  wood: "#4a7c59",
  fire: "#b8503c",
  earth: "#a37c3c",
  metal: "#8b8b8b",
  water: "#3f4f7a",
} as const;

export const MOCK_PILLARS: SajuPillar[] = [
  {
    name: "시주(時柱)",
    role: "말년운",
    topGod: "+금편재",
    heaven: { char: "庚", color: ELEMENT_COLOR.metal },
    earth: { char: "辰", color: ELEMENT_COLOR.earth },
    bottomGod: "+토식신",
    lifeStage: "관대(冠帶)",
  },
  {
    name: "일주(日柱)",
    role: "나(본원)",
    topGod: "-화일元",
    heaven: { char: "丙", color: ELEMENT_COLOR.fire },
    earth: { char: "寅", color: ELEMENT_COLOR.wood },
    bottomGod: "+목편인",
    lifeStage: "장생(長生)",
    isSelf: true,
  },
  {
    name: "월주(月柱)",
    role: "사회운",
    topGod: "-수편관",
    heaven: { char: "壬", color: ELEMENT_COLOR.water },
    earth: { char: "申", color: ELEMENT_COLOR.metal },
    bottomGod: "-금편재",
    lifeStage: "병(病)",
  },
  {
    name: "년주(年柱)",
    role: "선천운",
    topGod: "+목편인",
    heaven: { char: "甲", color: ELEMENT_COLOR.wood },
    earth: { char: "戌", color: ELEMENT_COLOR.earth },
    bottomGod: "+토식신",
    lifeStage: "묘(墓)",
  },
];

/** 지장간 (유료 결과지) */
export const MOCK_HIDDEN_STEMS: { label: string; chars: string[] }[] = [
  { label: "시주", chars: ["乙", "癸", "戊"] },
  { label: "일주", chars: ["戊", "丙", "甲"] },
  { label: "월주", chars: ["戊", "壬", "庚"] },
  { label: "년주", chars: ["辛", "丁", "戊"] },
];

/** 무료 결과지의 오행 분포 (개수 + 막대 폭) */
export const MOCK_FREE_ELEMENTS: { label: string; count: number; width: number; color: string }[] = [
  { label: "목(木)", count: 2, width: 60, color: ELEMENT_COLOR.wood },
  { label: "화(火)", count: 1, width: 30, color: ELEMENT_COLOR.fire },
  { label: "토(土)", count: 2, width: 60, color: ELEMENT_COLOR.earth },
  { label: "금(金)", count: 2, width: 60, color: ELEMENT_COLOR.metal },
  { label: "수(水)", count: 1, width: 30, color: ELEMENT_COLOR.water },
];

export const MOCK_METRICS: SajuMetrics = {
  fiveElements: [
    { label: "목(木)", value: 25, color: ELEMENT_COLOR.wood },
    { label: "화(火)", value: 13, color: ELEMENT_COLOR.fire },
    { label: "토(土)", value: 25, color: ELEMENT_COLOR.earth },
    { label: "금(金)", value: 25, color: ELEMENT_COLOR.metal },
    { label: "수(水)", value: 12, color: ELEMENT_COLOR.water },
  ],
  tenGods: [
    { label: "비견", value: 6 },
    { label: "겁재", value: 4 },
    { label: "식신", value: 14 },
    { label: "상관", value: 8 },
    { label: "편재", value: 15 },
    { label: "정재", value: 9 },
    { label: "편관", value: 13 },
    { label: "정관", value: 7 },
    { label: "편인", value: 13 },
    { label: "정인", value: 6 },
  ],
  monthly: [62, 68, 74, 71, 78, 85, 90, 88, 80, 76, 83, 92],
  trend: [78, 82, 70, 88, 95],
  trendYears: ["2026", "2027", "2028", "2029", "2030"],
  money: [
    { label: "20대", value: 45 },
    { label: "30대", value: 68 },
    { label: "40대", value: 90 },
    { label: "50대", value: 82 },
    { label: "60대+", value: 70 },
  ],
  aptitude: [
    { label: "실무·창작형 (식신)", value: 78 },
    { label: "관리·리더형 (편관)", value: 71 },
  ],
  turning: [
    { age: 32, text: "첫 도약의 대운 진입" },
    { age: 36, text: "재물운 정점, 확장의 시기" },
    { age: 42, text: "관계의 전환, 새로운 인연" },
    { age: 49, text: "명예운 상승, 결실의 시기" },
    { age: 56, text: "제2의 인생, 방향 전환" },
  ],
  wellbeing: [
    { axis: "체력", value: 70 },
    { axis: "정신력", value: 85 },
    { axis: "수면", value: 60 },
    { axis: "활력", value: 78 },
    { axis: "스트레스관리", value: 55 },
  ],
  overallScore: 82,
  relationScore: 74,
  daewoonProgress: 28,
};

export const MONTH_LABELS = [
  "1월", "2월", "3월", "4월", "5월", "6월",
  "7월", "8월", "9월", "10월", "11월", "12월",
];
