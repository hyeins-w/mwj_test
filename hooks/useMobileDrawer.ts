"use client";

import { useCallback, useEffect, useState } from "react";

/** 모바일 메뉴 드로어 상태. 기존과 동일하게 열려 있는 동안 body 스크롤을 잠그고,
 *  Escape 키로 닫힌다. (딤/닫기 버튼 클릭은 호출하는 쪽에서 close 를 연결) */
export function useMobileDrawer() {
  const [open, setOpen] = useState(false);

  const openDrawer = useCallback(() => setOpen(true), []);
  const closeDrawer = useCallback(() => setOpen(false), []);

  useEffect(() => {
    document.body.classList.toggle("menu_open", open);
    return () => document.body.classList.remove("menu_open");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return { open, openDrawer, closeDrawer };
}
