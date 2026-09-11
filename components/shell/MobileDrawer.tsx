"use client";

import Image from "next/image";
import Link from "next/link";
import { NAV_LINKS } from "@/lib/navigation";
import { KakaoChannelButton } from "./KakaoChannelButton";

type Props = {
  open: boolean;
  pathname: string;
  onClose: () => void;
};

export function MobileDrawer({ open, pathname, onClose }: Props) {
  return (
    <>
      <div className={`menu_dim${open ? " open" : ""}`} onClick={onClose} />
      <aside
        className={`menu_drawer${open ? " open" : ""}`}
        id="menuDrawer"
        aria-hidden={!open}
      >
        <div className="menu_drawer_top">
          <Image src="/img/main/logo.webp" alt="명월재" width={275} height={83} />
          <button type="button" className="menu_close" aria-label="메뉴 닫기" onClick={onClose} />
        </div>
        <nav className="menu_nav">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={pathname === link.href ? "active" : undefined}
              onClick={onClose}
            >
              {link.label}
              <span>{link.badge}</span>
            </Link>
          ))}
        </nav>
        <div className="menu_drawer_bot">
          <p>
            신청·입금 확인 등 궁금한 점은
            <br />
            카카오톡 채널로 문의해주세요.
          </p>
          <KakaoChannelButton className="menu_kakao">카카오톡 채널 문의하기</KakaoChannelButton>
        </div>
      </aside>
    </>
  );
}
