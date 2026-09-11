"use server";

import { createInquiry, findInquiryAnswers } from "@/lib/server/inquiry";
import { isValidPhone } from "@/lib/phone";
import type {
  ActionResult,
  InquiryAnswer,
  InquiryInput,
  InquiryLookupInput,
} from "@/types/forms";

export async function submitInquiryAction(
  input: InquiryInput,
): Promise<ActionResult> {
  if (!input.name.trim() || !input.title.trim() || !input.body.trim()) {
    return { ok: false, message: "필수 항목을 모두 입력해 주세요." };
  }
  if (!isValidPhone(input.phone)) {
    return { ok: false, message: "휴대폰번호를 정확히 입력해 주세요." };
  }

  await createInquiry(input);
  return { ok: true, data: undefined };
}

export async function checkInquiryAction(
  input: InquiryLookupInput,
): Promise<ActionResult<InquiryAnswer[]>> {
  if (!input.key.trim() || !isValidPhone(input.phone)) {
    return { ok: false, message: "입력하신 정보를 다시 확인해 주세요." };
  }

  const answers = await findInquiryAnswers(input);
  return { ok: true, data: answers };
}
