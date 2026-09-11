"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import { submitIntakeAction } from "@/app/actions/intake";
import { FootLinkPopup } from "@/components/shell/FootLinkPopup";
import type { IntakeInput } from "@/types/forms";
import styles from "@/app/(site)/home.module.css";

const BIRTH_TIMES = [
  "자시 [23:30~01:29]",
  "축시 [01:30~03:29]",
  "인시 [03:30~05:29]",
  "묘시 [05:30~07:29]",
  "진시 [07:30~09:29]",
  "사시 [09:30~11:29]",
  "오시 [11:30~13:29]",
  "미시 [13:30~15:29]",
  "신시 [15:30~17:29]",
  "유시 [17:30~19:29]",
  "술시 [19:30~21:29]",
  "해시 [21:30~23:29]",
];

/** 기존 radioInput 마크업(감춘 radio + label) 그대로 유지 */
function RadioRow({
  name,
  options,
  value,
  onChange,
  className,
}: {
  name: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
  className?: string;
}) {
  return (
    <div className={className ? `${styles.radioInput} ${className}` : styles.radioInput}>
      {options.map((opt) => {
        const id = `${name}_${opt.value}`;
        return (
          <Fragment key={opt.value}>
            <input
              type="radio"
              name={name}
              id={id}
              value={opt.value}
              required
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
            />
            <label htmlFor={id}>{opt.label}</label>
          </Fragment>
        );
      })}
    </div>
  );
}

export function IntakeForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [calendar, setCalendar] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [birthTime, setBirthTime] = useState("");
  const [timeUnknown, setTimeUnknown] = useState(false);
  const [marital, setMarital] = useState("");
  const [children, setChildren] = useState("");
  const [concern, setConcern] = useState("");
  const [agreed, setAgreed] = useState(true);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const input = {
      name: name.trim(),
      gender,
      calendar,
      birthDate: birthDate.trim(),
      birthTime: timeUnknown ? "모름" : birthTime,
      marital,
      children,
      concern: concern.trim(),
    } as IntakeInput;

    const result = await submitIntakeAction(input);
    if (!result.ok) {
      alert(result.message);
      return;
    }
    if (result.redirectTo) router.push(result.redirectTo);
  };

  return (
    <form onSubmit={onSubmit}>
      <div className={styles.form_deco}>
        <Image src="/img/main/deco_obj1.webp" alt="" width={902} height={151} />
      </div>

      <div className={styles.main_formInputBox}>
        <p>성함</p>
        <input
          type="text"
          name="name"
          placeholder="성함을 입력해주세요"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className={styles.main_formInputBox}>
        <p>성별</p>
        <RadioRow
          name="gender"
          value={gender}
          onChange={setGender}
          options={[
            { value: "남성", label: "남성" },
            { value: "여성", label: "여성" },
          ]}
        />
      </div>

      <div className={styles.main_formInputBox}>
        <p>양력/음력</p>
        <RadioRow
          name="bir1"
          value={calendar}
          onChange={setCalendar}
          options={[
            { value: "양력", label: "양력" },
            { value: "음력", label: "음력" },
          ]}
        />
      </div>

      <div className={styles.main_formInputBox}>
        <p>생년월일</p>
        <input
          type="text"
          name="bir2"
          placeholder="생년월일을 입력해주세요."
          required
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
        />
      </div>

      <div className={styles.main_formInputBox}>
        <p>태어난 시간</p>
        <div className={`${styles.radioInput} ${styles.birt}`}>
          <select
            name="bir3"
            required={!timeUnknown}
            disabled={timeUnknown}
            value={birthTime}
            onChange={(e) => setBirthTime(e.target.value)}
          >
            <option value="">태어난 시간을 선택해주세요</option>
            {BIRTH_TIMES.map((t) => (
              <option key={t} value={t.split(" ")[0]}>
                {t}
              </option>
            ))}
            <option value="모름">태어난 시간을 모름</option>
          </select>
        </div>
        <label className={styles.check_input}>
          <input
            type="checkbox"
            checked={timeUnknown}
            onChange={(e) => {
              setTimeUnknown(e.target.checked);
              if (e.target.checked) setBirthTime("");
            }}
          />{" "}
          시간 모름
        </label>
      </div>

      <div className={`${styles.main_formInputBox} ${styles.main_form_str}`}>
        <p>결혼/자녀</p>

        <b>결혼 유무</b>
        <RadioRow
          name="marr"
          className={styles.radioInput_3}
          value={marital}
          onChange={setMarital}
          options={[
            { value: "기혼", label: "기혼" },
            { value: "연애", label: "연애" },
            { value: "싱글", label: "싱글" },
          ]}
        />

        <b>자녀 유무</b>
        <RadioRow
          name="sons"
          value={children}
          onChange={setChildren}
          options={[
            { value: "자녀있음", label: "있음" },
            { value: "자녀없음", label: "없음" },
          ]}
        />
      </div>

      <div className={styles.main_formInputBox}>
        <p>
          현재 가장 고민되는 부분{" "}
          <span style={{ fontSize: "4cqw", opacity: 0.6, fontWeight: 500 }}>(선택)</span>
        </p>
        <textarea
          name="point"
          placeholder="예) 올해 이직을 해도 괜찮을지 궁금합니다"
          value={concern}
          onChange={(e) => setConcern(e.target.value)}
        />
      </div>

      <div className={styles.main_formAgree}>
        <label className={styles.check_input}>
          <input
            type="checkbox"
            name="agree1"
            value="Y"
            required
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
          />
          &nbsp; <p>개인정보 수집 및 이용에 동의합니다.</p> &nbsp;
        </label>
        <FootLinkPopup href="/privacy" label="개인정보 처리방침" text="[약관보기]" />
      </div>

      <div className={styles.main_formSubmitBox}>
        <div>
          <Image src="/img/main/tellBox.webp" alt="" width={432} height={61} />
          <p>지금 결제시 40% 할인!</p>
        </div>
        <button type="submit" className={styles.submit_button}>
          나의 운명해설서 펼쳐보기 &gt;
        </button>
      </div>
    </form>
  );
}
