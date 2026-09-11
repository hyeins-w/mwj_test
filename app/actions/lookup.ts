"use server";

import { isValidPhone } from "@/lib/phone";
import { lookupOrder } from "@/lib/server/order";
import type { ActionResult, ResultLookupInput } from "@/types/forms";

export async function lookupResultAction(
  input: ResultLookupInput,
): Promise<ActionResult> {
  if (!isValidPhone(input.phone)) {
    return { ok: false, message: "연락처를 정확히 입력해 주세요." };
  }

  const order = await lookupOrder(input);
  if (!order) {
    return { ok: false, message: "일치하는 주문 내역을 찾을 수 없습니다." };
  }

  return { ok: true, data: undefined, redirectTo: "/analyzing?next=/result/paid" };
}
