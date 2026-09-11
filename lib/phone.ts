/** 기존 inquiry / payment / result_lookup 3개 파일에 각각 복사돼 있던 하이픈 포맷 로직. */
export function formatPhone(value: string): string {
  const digits = value.replace(/[^0-9]/g, "").slice(0, 11);
  if (digits.length > 7) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
  }
  if (digits.length > 3) {
    return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  }
  return digits;
}

export const phoneDigits = (value: string) => value.replace(/[^0-9]/g, "");

/** 기존 검증 기준과 동일: 숫자 10자리 이상 */
export const isValidPhone = (value: string) => phoneDigits(value).length >= 10;
