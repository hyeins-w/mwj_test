import { AppShell } from "@/components/shell/AppShell";
import { Footer } from "@/components/shell/Footer";
import "./site-shell.css";

/** 헤더/드로어/푸터를 공유하는 본 사이트 영역.
 *  `.site_root` 는 body 스타일 스코프(`body:has(> .site_root)`)의 기준점이기도 하므로
 *  반드시 body 의 직계 자식으로 유지해야 한다. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="site_root">
      <AppShell />
      {children}
      <Footer />
    </div>
  );
}
