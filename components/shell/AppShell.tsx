"use client";

import { usePathname } from "next/navigation";
import { useHeaderScroll } from "@/hooks/useHeaderScroll";
import { useMobileDrawer } from "@/hooks/useMobileDrawer";
import { Header } from "./Header";
import { MobileDrawer } from "./MobileDrawer";

/** 헤더와 모바일 드로어는 position:fixed 형제 요소라 본문을 감싸지 않는다.
 *  덕분에 페이지 본문/푸터는 서버 컴포넌트로 남는다. */
export function AppShell() {
  const scrolled = useHeaderScroll();
  const { open, openDrawer, closeDrawer } = useMobileDrawer();
  const pathname = usePathname();

  return (
    <>
      <Header scrolled={scrolled} pathname={pathname} onMenuOpen={openDrawer} />
      <MobileDrawer open={open} pathname={pathname} onClose={closeDrawer} />
    </>
  );
}
