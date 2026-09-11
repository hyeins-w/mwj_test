"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { submitPaymentAction } from "@/app/actions/payment";
import { FootLinkPopup } from "@/components/shell/FootLinkPopup";
import { Reveal } from "@/components/Reveal";
import { usePhoneInput } from "@/hooks/usePhoneInput";
import { isValidPhone } from "@/lib/phone";
import { formatKRW, PRICING } from "@/lib/pricing";
import type { PaymentMethod } from "@/types/forms";
import styles from "./payment.module.css";

const AGREEMENTS = [
  { label: "구매조건 및 결제진행에 동의", href: "/terms", popup: "이용약관" },
  { label: "개인정보 수집 및 이용 동의", href: "/privacy", popup: "개인정보 처리방침" },
  { label: "디지털 콘텐츠 특성상 발송 후 환불 제한", href: "/refund", popup: "환불정책" },
];

const METHODS: {
  value: PaymentMethod;
  mark: string;
  markStyle: React.CSSProperties;
  sub: string;
}[] = [
  {
    value: "카카오페이",
    mark: "pay",
    markStyle: { background: "#ffec02", color: "#3c1e1e" },
    sub: "카카오톡으로 간편하게 결제",
  },
  {
    value: "토스페이",
    mark: "toss",
    markStyle: { background: "#0064ff", color: "#fff" },
    sub: "토스 앱에서 바로 결제",
  },
];

export function PaymentForm() {
  const router = useRouter();
  const [name, setName] = useState("김민준");
  const [email, setEmail] = useState("");
  const [method, setMethod] = useState<PaymentMethod>("카카오페이");
  const [agreed, setAgreed] = useState([false, false, false]);
  const phone = usePhoneInput();

  const allAgreed = agreed.every(Boolean);

  const toggleAll = (checked: boolean) => setAgreed([checked, checked, checked]);
  const toggleOne = (index: number, checked: boolean) =>
    setAgreed((prev) => prev.map((v, i) => (i === index ? checked : v)));

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValidPhone(phone.value)) {
      alert("휴대폰 번호를 정확히 입력해 주세요.");
      return;
    }

    const result = await submitPaymentAction({
      name: name.trim(),
      phone: phone.value,
      email: email.trim(),
      method,
    });

    if (!result.ok) {
      alert(result.message);
      return;
    }
    if (result.redirectTo) router.push(result.redirectTo);
  };

  return (
    <form onSubmit={onSubmit}>
      <Reveal className="card">
        <div className="card_tit">결과를 받으실 곳</div>
        <div className={styles.fld}>
          <p>성함</p>
          <input
            type="text"
            name="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={styles.fld}>
          <p>
            휴대폰 번호 <span style={{ color: "#b8503c" }}>*</span>
          </p>
          <input
            type="tel"
            name="phone"
            placeholder="010-0000-0000"
            inputMode="numeric"
            required
            value={phone.value}
            onChange={phone.onChange}
          />
          <p className={styles.hint}>카카오톡 알림톡으로 해설서 링크를 보내드립니다.</p>
        </div>
        <div className={styles.fld} style={{ marginBottom: 0 }}>
          <p>
            이메일{" "}
            <span style={{ fontSize: "3.2cqw", opacity: 0.6, fontWeight: 500 }}>(선택)</span>
          </p>
          <input
            type="email"
            name="email"
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className={styles.hint}>입력하시면 PDF 파일도 함께 보내드립니다.</p>
        </div>
      </Reveal>

      <Reveal className="card">
        <div className="card_tit">결제 수단</div>
        <div className={styles.paylist}>
          {METHODS.map((m) => (
            <label key={m.value}>
              <input
                type="radio"
                name="paymethod"
                value={m.value}
                required
                checked={method === m.value}
                onChange={() => setMethod(m.value)}
              />
              <span className={styles.pm_mark} style={m.markStyle}>
                {m.mark}
              </span>
              <span>
                <span className={styles.pm_name}>{m.value}</span>
                <span className={styles.pm_sub} style={{ display: "block" }}>
                  {m.sub}
                </span>
              </span>
              <span className={styles.pm_check} />
            </label>
          ))}
        </div>
      </Reveal>

      <Reveal className="card">
        <div className="card_tit">약관 동의</div>
        <label className={styles.agree_all}>
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={allAgreed}
            onChange={(e) => toggleAll(e.target.checked)}
          />{" "}
          전체 동의합니다
        </label>
        {AGREEMENTS.map((item, i) => (
          <label key={item.href} className={styles.agree_item}>
            <input
              type="checkbox"
              className={styles.checkbox}
              required
              checked={agreed[i]}
              onChange={(e) => toggleOne(i, e.target.checked)}
            />{" "}
            <span className={styles.req}>[필수]</span> {item.label}{" "}
            <FootLinkPopup
              href={item.href}
              label={item.popup}
              text="보기"
              className={styles.view}
            />
          </label>
        ))}
      </Reveal>

      <Reveal className={styles.pay_submit}>
        <button type="submit" className="btn_navy">
          {formatKRW(PRICING.finalPrice)} 결제하기
        </button>
      </Reveal>
    </form>
  );
}
