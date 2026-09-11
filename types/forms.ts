/** 각 폼이 서버로 넘기는 값의 타입. 실제 API/DB 가 붙을 때 이 타입이 계약 역할을 한다. */

/** 메인 페이지 사주 신청서 */
export type IntakeInput = {
  name: string;
  gender: "남성" | "여성";
  calendar: "양력" | "음력";
  birthDate: string;
  /** 12시진 중 하나 또는 "모름" */
  birthTime: string;
  marital: "기혼" | "연애" | "싱글";
  children: "자녀있음" | "자녀없음";
  /** 현재 가장 고민되는 부분 (선택) */
  concern: string;
};

export type InquiryInput = {
  orderNo: string;
  name: string;
  phone: string;
  email: string;
  title: string;
  body: string;
  /** 첨부파일은 아직 업로드 저장소가 없어 파일명만 참고용으로 전달한다. */
  fileName: string | null;
};

export type InquiryLookupInput = {
  /** 주문번호 또는 문의 시 입력한 이름 */
  key: string;
  phone: string;
};

export type InquiryAnswer = {
  id: string;
  title: string;
  askedAt: string;
  answeredAt: string | null;
  answer: string | null;
};

/** 결과 조회는 주문번호 또는 (이름 + 생년월일) 중 하나로 본인 확인한다. */
export type ResultLookupInput =
  | { mode: "order"; orderNo: string; phone: string }
  | { mode: "name"; userName: string; birth: string; phone: string };

export type PaymentMethod = "카카오페이" | "토스페이";

export type PaymentInput = {
  name: string;
  phone: string;
  email: string;
  method: PaymentMethod;
};

/** 서버 호출 결과 공통 형태. 성공 시 이동할 경로를 함께 돌려준다. */
export type ActionResult<T = undefined> =
  | { ok: true; data: T; redirectTo?: string }
  | { ok: false; message: string };
