"use client";

import Image from "next/image";
import Link from "next/link";
import { NAV_LINKS } from "@/lib/navigation";
import { HamburgerIcon } from "./HamburgerIcon";

type Props = {
  scrolled: boolean;
  pathname: string;
  onMenuOpen: () => void;
};

/** 데스크탑 헤더는 드로어와 반대 순서로 노출된다 (기존 마크업과 동일). */
const HEADER_LINKS = [...NAV_LINKS].reverse();

export function Header({ scrolled, pathname, onMenuOpen }: Props) {
  return (
    <header className={scrolled ? "scroll" : undefined}>
      <div>
        <Link href="/" className="logo">
          <Image src="/img/main/logo.webp" alt="명월재" width={275} height={83} priority />
        </Link>
        <div
          className="menu_btn"
          role="button"
          tabIndex={0}
          aria-label="메뉴 열기"
          aria-controls="menuDrawer"
          aria-expanded={false}
          onClick={onMenuOpen}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onMenuOpen();
            }
          }}
        >
          <HamburgerIcon />
        </div>
        <nav className="menu_List">
          {HEADER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={pathname === link.href ? "active" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
