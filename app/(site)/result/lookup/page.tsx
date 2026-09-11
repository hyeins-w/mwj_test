import type { Metadata } from "next";
import Image from "next/image";
import { LookupForm } from "./LookupForm";

export const metadata: Metadata = {
  title: "내 사주 결과 다시보기 | 명월재",
};

export default function ResultLookupPage() {
  return (
    <section>
      <div className="page_head">
        <Image className="deco" src="/img/main/star2.webp" alt="" width={36} height={36} />
        <p className="eyebrow">본인 확인</p>
        <h1>내 사주 결과 다시보기</h1>
        <p className="sub">
          결제 시 입력했던 연락처로
          <br />
          분석 결과를 다시 확인하실 수 있습니다.
        </p>
      </div>

      <LookupForm />
    </section>
  );
}
