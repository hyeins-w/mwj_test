import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "명월재",
  description: "상위 1% 정통 역술가 21인이 함께한 명월재(命月齋) 심층사주",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
