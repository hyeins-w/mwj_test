"use server";

import { isValidPhone } from "@/lib/phone";
import { createPaymentOrder } from "@/lib/server/order";
import type { ActionResult, PaymentInput } from "@/types/forms";

export async function submitPaymentAction(
  input: PaymentInput,
): Promise<ActionResult> {
  if (!isValidPhone(input.phone)) {
    return { ok: false, message: "휴대폰 번호를 정확히 입력해 주세요." };
  }

  const order = await createPaymentOrder(input);

  // PG 연동 후에는 결제창(order.payUrl)으로 보내고, 결제 완료 통보는
  // Route Handler(app/api/payment/...)에서 markOrderPaid 로 처리하게 된다.
  return {
    ok: true,
    data: undefined,
    redirectTo: order.payUrl ?? "/analyzing?next=/result/paid",
  };
}
