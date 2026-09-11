/** 사주 결과 데이터 계약.
 *  지금은 lib/mockSaju.ts 의 데모 데이터가 이 타입을 채우고 있고,
 *  실제 사주 계산 / Claude API / DB 가 붙으면 같은 모양으로 응답하면 된다. */

export type SajuProfile = {
  name: string;
  birthDate: string;
  /** 예: "양력 · 진시" */
  calendarAndTime: string;
  gender: string;
  /** 해설서 발행일 (유료 결과지에만 표기) */
  issuedAt?: string;
};

/** 사주 원국의 기둥 하나 (시/일/월/년주) */
export type SajuPillar = {
  /** 예: "시주(時柱)" */
  name: string;
  /** 예: "말년운" */
  role: string;
  /** 천간 위에 표기되는 십성 */
  topGod: string;
  /** 천간 */
  heaven: { char: string; color: string };
  /** 지지 */
  earth: { char: string; color: string };
  /** 지지 아래 표기되는 십성 */
  bottomGod: string;
  /** 십이운성 (유료 결과지에만 표기) */
  lifeStage?: string;
  /** 일주(본원) 여부 */
  isSelf?: boolean;
};

export type LabeledValue = { label: string; value: number };
export type ColoredValue = LabeledValue & { color: string };

export type TurningPoint = { age: number; text: string };
export type RadarAxis = { axis: string; value: number };

/** 유료 해설서의 수치 데이터 일체 (기존 result_paid.html 의 SAJU 객체) */
export type SajuMetrics = {
  fiveElements: ColoredValue[];
  tenGods: LabeledValue[];
  /** 1~12월 운세 지수 */
  monthly: number[];
  trend: number[];
  trendYears: string[];
  money: LabeledValue[];
  aptitude: LabeledValue[];
  turning: TurningPoint[];
  wellbeing: RadarAxis[];
  /** 2026년 종합운 지수 */
  overallScore: number;
  /** 인연운 지수 */
  relationScore: number;
  /** 현재 대운 진행률 (%) */
  daewoonProgress: number;
};
