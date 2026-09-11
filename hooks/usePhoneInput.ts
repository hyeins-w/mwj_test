"use client";

import { useState } from "react";
import { formatPhone } from "@/lib/phone";

/** 입력할 때마다 010-0000-0000 형태로 자동 하이픈 처리되는 제어 입력값. */
export function usePhoneInput(initialValue = "") {
  const [value, setValue] = useState(formatPhone(initialValue));

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(formatPhone(e.target.value));
  };

  return { value, onChange, setValue };
}
