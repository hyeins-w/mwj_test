import type { InquiryAnswer, InquiryInput, InquiryLookupInput } from "@/types/forms";

/** 1:1 문의 도메인 로직.
 *
 *  Server Action(app/actions/inquiry.ts)과 향후 추가될 Route Handler(app/api/...)가
 *  모두 이 함수들을 호출하도록 해서, 서버 로직이 어느 한쪽에 묶이지 않게 한다.
 *  지금은 DB 가 없어 목업으로 동작한다. */

/** TODO: 실제 문의 등록 (DB insert + 담당자 알림) 연동 위치 */
export async function createInquiry(input: InquiryInput): Promise<{ id: string }> {
  console.info("[inquiry] 접수", { name: input.name, title: input.title });
  return { id: `INQ-${Date.now()}` };
}

/** TODO: 실제 문의 조회 (주문번호/이름 + 연락처로 본인 확인 후 답변 목록 반환) 연동 위치 */
export async function findInquiryAnswers(
  input: InquiryLookupInput,
): Promise<InquiryAnswer[]> {
  console.info("[inquiry] 조회", { key: input.key });
  return [];
}
