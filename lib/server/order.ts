import type { PaymentInput, ResultLookupInput } from "@/types/forms";

/** 주문/결제 도메인 로직.
 *
 *  결제는 특성상 두 방향의 진입점이 필요하다:
 *   - 사용자가 폼을 제출하는 흐름 → Server Action (app/actions/payment.ts)
 *   - PG사가 서버로 직접 호출하는 흐름(웹훅/콜백) → Route Handler (app/api/payment/...)
 *  둘 다 아래 함수를 호출하면 되도록 로직을 여기에 모아둔다. 지금은 목업이다. */

/** TODO: 실제 조회 API 연동 위치 — 본인 확인 성공 시 주문번호 반환 */
export async function lookupOrder(
  input: ResultLookupInput,
): Promise<{ orderNo: string } | null> {
  console.info("[order] 결과 조회", input);
  return { orderNo: input.mode === "order" ? input.orderNo : "MWJ-MOCK" };
}

/** TODO: 실제 PG 연동 위치 — 주문 생성 후 PG 결제창 URL 반환 */
export async function createPaymentOrder(
  input: PaymentInput,
): Promise<{ orderNo: string; payUrl: string | null }> {
  console.info("[order] 결제 요청", { name: input.name, method: input.method });
  return { orderNo: `MWJ-${Date.now()}`, payUrl: null };
}

/** TODO: PG 웹훅에서 결제 완료 통보를 받았을 때 호출할 위치
 *  (Route Handler 를 추가하면 그 안에서 이 함수를 부르면 된다) */
export async function markOrderPaid(orderNo: string): Promise<void> {
  console.info("[order] 결제 완료 처리", { orderNo });
}
