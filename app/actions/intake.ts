"use server";

import { createSajuRequest } from "@/lib/server/saju";
import type { ActionResult, IntakeInput } from "@/types/forms";

export async function submitIntakeAction(
  input: IntakeInput,
): Promise<ActionResult> {
  if (!input.name.trim() || !input.birthDate.trim()) {
    return { ok: false, message: "필수 항목을 모두 입력해 주세요." };
  }

  await createSajuRequest(input);

  // 분석이 실제로 붙으면 requestId 를 함께 넘겨 결과 페이지에서 조회하게 된다.
  return { ok: true, data: undefined, redirectTo: "/analyzing?next=/result/free" };
}
