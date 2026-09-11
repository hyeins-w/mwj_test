"use client";

import { useCallback, useState } from "react";

/** 한 번에 하나만 열리는 아코디언. 열려 있는 항목을 다시 누르면 닫힌다. */
export function useAccordion(defaultOpenIndex: number | null = null) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);

  const toggle = useCallback((index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  }, []);

  return { openIndex, toggle };
}
