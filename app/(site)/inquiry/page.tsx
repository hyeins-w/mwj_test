import type { Metadata } from "next";
import { InquirySection } from "./InquirySection";

export const metadata: Metadata = {
  title: "1:1 문의 | 명월재",
};

/** 기존 `inquiry.html?mode=check` 진입(고객센터의 "내 문의 답변 확인하기")을 그대로 지원한다. */
export default async function InquiryPage({
  searchParams,
}: {
  searchParams: Promise<{ mode?: string }>;
}) {
  const { mode } = await searchParams;

  return (
    <section>
      <InquirySection initialMode={mode === "check" ? "check" : "write"} />
    </section>
  );
}
