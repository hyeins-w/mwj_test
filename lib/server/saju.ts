import type { IntakeInput } from "@/types/forms";

/** 사주 신청/분석 도메인 로직.
 *
 *  실제 구현이 들어올 자리:
 *   1) 생년월일시 → 사주 원국 계산 (만세력)
 *   2) 원국 + 질문 → Claude API 로 해설 생성
 *   3) 결과를 DB 에 저장하고 id 반환
 *  Server Action(app/actions/intake.ts)과 향후 Route Handler 양쪽에서 이 함수를 부른다. */

/** TODO: 실제 사주 계산 + Claude API + DB 저장 연동 위치 */
export async function createSajuRequest(
  input: IntakeInput,
): Promise<{ requestId: string }> {
  console.info("[saju] 신청 접수", {
    name: input.name,
    birthDate: input.birthDate,
    birthTime: input.birthTime,
  });
  return { requestId: `SAJU-${Date.now()}` };
}
