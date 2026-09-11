/** 기존에는 index/result_free/payment 3개 파일에 각각 하드코딩돼 있던 가격 정보. */
export const PRICING = {
  listPrice: 48000,
  discountAmount: 19000,
  discountRate: 40,
  finalPrice: 29000,
} as const;

export const formatKRW = (value: number) => `${value.toLocaleString("ko-KR")}원`;
