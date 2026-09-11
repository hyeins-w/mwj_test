"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { lookupResultAction } from "@/app/actions/lookup";
import { KakaoChannelButton } from "@/components/shell/KakaoChannelButton";
import { usePhoneInput } from "@/hooks/usePhoneInput";
import { useRevealObserver } from "@/hooks/useRevealObserver";
import { isValidPhone } from "@/lib/phone";
import type { ResultLookupInput } from "@/types/forms";
import styles from "./lookup.module.css";

export function LookupForm() {
  const router = useRouter();
  const { ref, visible } = useRevealObserver<HTMLFormElement>();
  const [byName, setByName] = useState(false);
  const [invalid, setInvalid] = useState<Record<string, boolean>>({});
  const [orderNo, setOrderNo] = useState("");
  const [userName, setUserName] = useState("");
  const [birth, setBirth] = useState("");
  const phone = usePhoneInput();

  const toggleMode = () => {
    setByName((prev) => !prev);
    setInvalid({});
  };

  const fieldClass = (key: string) =>
    invalid[key] ? `${styles.fld} ${styles.invalid}` : styles.fld;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const next: Record<string, boolean> = {
      phone: !isValidPhone(phone.value),
    };
    if (byName) {
      next.userName = !userName.trim();
      next.birth = birth.replace(/[^0-9]/g, "").length !== 8;
    } else {
      next.orderNo = !orderNo.trim();
    }
    setInvalid(next);
    if (Object.values(next).some(Boolean)) return;

    const input: ResultLookupInput = byName
      ? { mode: "name", userName: userName.trim(), birth, phone: phone.value }
      : { mode: "order", orderNo: orderNo.trim(), phone: phone.value };

    const result = await lookupResultAction(input);
    if (!result.ok) {
      alert(result.message);
      return;
    }
    if (result.redirectTo) router.push(result.redirectTo);
  };

  return (
    <form
      ref={ref}
      className={`${styles.lookup} reveal${visible ? " is-visible" : ""}`}
      noValidate
      onSubmit={onSubmit}
    >
      <div className={styles.lookup_deco}>
        <Image src="/img/main/deco_obj1.webp" alt="" width={902} height={151} />
      </div>

      <p className={styles.modeNote} hidden={!byName}>
        이름과 생년월일로 조회합니다. 결제 시 입력하신 정보와 동일해야 합니다.
      </p>

      <div className={fieldClass("orderNo")} hidden={byName}>
        <div className={styles.fld_top}>
          <p>주문번호</p>
        </div>
        <input
          type="text"
          name="orderNo"
          placeholder="예) MWJ-20260910-0001"
          autoComplete="off"
          value={orderNo}
          onChange={(e) => setOrderNo(e.target.value)}
        />
        <p className={styles.hint}>결제 완료 후 안내드린 주문번호를 입력해 주세요.</p>
        <p className={styles.err}>주문번호를 입력해 주세요.</p>
      </div>

      <div className={fieldClass("userName")} hidden={!byName}>
        <div className={styles.fld_top}>
          <p>성함</p>
        </div>
        <input
          type="text"
          name="userName"
          placeholder="결제 시 입력한 성함"
          autoComplete="name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <p className={styles.err}>성함을 입력해 주세요.</p>
      </div>

      <div className={fieldClass("birth")} hidden={!byName}>
        <div className={styles.fld_top}>
          <p>생년월일</p>
        </div>
        <input
          type="text"
          name="birth"
          placeholder="예) 19940321"
          inputMode="numeric"
          autoComplete="off"
          value={birth}
          onChange={(e) => setBirth(e.target.value)}
        />
        <p className={styles.err}>생년월일 8자리를 입력해 주세요.</p>
      </div>

      <div className={fieldClass("phone")}>
        <div className={styles.fld_top}>
          <p>연락처</p>
          <button type="button" onClick={toggleMode}>
            {byName ? "주문번호로 조회하기" : "이름으로 조회하기"}
          </button>
        </div>
        <input
          type="tel"
          name="phone"
          placeholder="010-0000-0000"
          inputMode="numeric"
          autoComplete="tel"
          value={phone.value}
          onChange={phone.onChange}
        />
        <p className={styles.err}>연락처를 정확히 입력해 주세요.</p>
      </div>

      <button type="submit" className={`btn_navy ${styles.submit}`}>
        결과 확인하기 &gt;
      </button>

      <div className={styles.lookup_hr} />
      <div className={styles.lookup_help}>
        <p>주문번호를 모르시나요?</p>
        <KakaoChannelButton className={styles.find}>주문번호 찾기</KakaoChannelButton>
        <Link href="/support" className={styles.ask}>
          결과 조회에 문제가 있으신가요? 고객센터로 문의하기
        </Link>
      </div>
    </form>
  );
}
