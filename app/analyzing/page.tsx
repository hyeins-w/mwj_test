import type { Metadata } from "next";
import { AnalyzingScreen } from "./AnalyzingScreen";
import "./analyzing-body.css";

export const metadata: Metadata = {
  title: "명월재 심층사주 - 결과 준비 중",
};

/** 분석 진행 화면. `?next=` 로 완료 후 이동할 경로를 받는다. */
export default async function AnalyzingPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  // 외부 사이트로 튕기지 않도록 내부 경로만 허용한다.
  const target = next && next.startsWith("/") && !next.startsWith("//") ? next : "/result/free";

  // `.analyzing_root` 는 body 스타일 스코프 기준점이라 body 직계 자식으로 유지한다.
  return (
    <div className="analyzing_root">
      <AnalyzingScreen next={target} />
    </div>
  );
}
