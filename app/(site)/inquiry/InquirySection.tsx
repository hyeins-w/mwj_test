"use client";

import Link from "next/link";
import { useState } from "react";
import { checkInquiryAction, submitInquiryAction } from "@/app/actions/inquiry";
import { usePhoneInput } from "@/hooks/usePhoneInput";
import { useRevealObserver } from "@/hooks/useRevealObserver";
import { isValidPhone } from "@/lib/phone";
import type { InquiryAnswer } from "@/types/forms";
import styles from "./inquiry.module.css";

type Mode = "write" | "check";

const HEAD_TEXT: Record<Mode, { title: string; sub: string }> = {
  write: { title: "1:1 문의", sub: "문의 내용을 남겨주시면 확인 후 답변드릴게요." },
  check: {
    title: "내 문의 답변 확인",
    sub: "문의 남기실 때 입력하신 정보로 답변을 확인하실 수 있어요.",
  },
};

/** 기존 `class="... reveal"` 를 form 같은 비-div 요소에도 그대로 붙이기 위한 헬퍼. */
function useRevealClass(base: string) {
  const { ref, visible } = useRevealObserver<HTMLFormElement>();
  return { ref, className: `${base} reveal${visible ? " is-visible" : ""}` };
}

export function InquirySection({ initialMode }: { initialMode: Mode }) {
  const [mode, setMode] = useState<Mode>(initialMode);
  const [answers, setAnswers] = useState<InquiryAnswer[] | null>(null);
  const [fileName, setFileName] = useState("선택된 파일 없음");
  const [writeInvalid, setWriteInvalid] = useState<Record<string, boolean>>({});
  const [checkInvalid, setCheckInvalid] = useState<Record<string, boolean>>({});

  const writePhone = usePhoneInput();
  const checkPhone = usePhoneInput();

  const writeReveal = useRevealClass(styles.form_wrap);
  const checkReveal = useRevealClass(styles.form_wrap);

  const switchMode = (next: Mode) => {
    setMode(next);
    setAnswers(null);
  };

  const fieldClass = (invalid: Record<string, boolean>, key: string) =>
    invalid[key] ? `${styles.fld} ${styles.invalid}` : styles.fld;

  const onWriteSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const values = {
      orderNo: String(data.get("orderNo") ?? "").trim(),
      name: String(data.get("name") ?? "").trim(),
      phone: writePhone.value,
      email: String(data.get("email") ?? "").trim(),
      title: String(data.get("title") ?? "").trim(),
      body: String(data.get("body") ?? "").trim(),
      fileName: fileName === "선택된 파일 없음" ? null : fileName,
    };

    const invalid = {
      name: !values.name,
      phone: !isValidPhone(values.phone),
      title: !values.title,
      body: !values.body,
    };
    setWriteInvalid(invalid);
    if (Object.values(invalid).some(Boolean)) return;

    const result = await submitInquiryAction(values);
    if (!result.ok) {
      alert(result.message);
      return;
    }
    alert("문의가 접수되었습니다. 확인 후 빠르게 답변드리겠습니다.");
    form.reset();
    writePhone.setValue("");
    setFileName("선택된 파일 없음");
  };

  const onCheckSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const values = {
      key: String(data.get("key") ?? "").trim(),
      phone: checkPhone.value,
    };

    const invalid = { key: !values.key, phone: !isValidPhone(values.phone) };
    setCheckInvalid(invalid);
    if (Object.values(invalid).some(Boolean)) return;

    const result = await checkInquiryAction(values);
    if (!result.ok) {
      alert(result.message);
      return;
    }
    setAnswers(result.data);
  };

  return (
    <>
      <div className="page_head">
        <p className="eyebrow">고객센터</p>
        <h1>{HEAD_TEXT[mode].title}</h1>
        <p className="sub">{HEAD_TEXT[mode].sub}</p>
      </div>

      <div className={`${styles.modeTab} reveal is-visible`}>
        <button
          type="button"
          className={mode === "write" ? styles.on : undefined}
          onClick={() => switchMode("write")}
        >
          문의 남기기
        </button>
        <button
          type="button"
          className={mode === "check" ? styles.on : undefined}
          onClick={() => switchMode("check")}
        >
          답변 확인하기
        </button>
      </div>

      <form
        ref={writeReveal.ref}
        className={writeReveal.className}
        noValidate
        hidden={mode !== "write"}
        onSubmit={onWriteSubmit}
      >
        <div className={styles.grid2}>
          <div className={styles.fld}>
            <p>주문번호</p>
            <input type="text" name="orderNo" placeholder="예) MWJ-20260910-0001" autoComplete="off" />
            <p className={styles.hint}>비회원 결제 시 주문번호로 확인해요. 없으면 비워도 됩니다.</p>
          </div>
          <div className={fieldClass(writeInvalid, "name")}>
            <p>
              이름 <em>*</em>
            </p>
            <input type="text" name="name" placeholder="이름" autoComplete="name" />
            <p className={styles.err}>이름을 입력해 주세요.</p>
          </div>
          <div className={fieldClass(writeInvalid, "phone")}>
            <p>
              휴대폰번호 <em>*</em>
            </p>
            <input
              type="tel"
              name="phone"
              placeholder="010-0000-0000"
              inputMode="numeric"
              autoComplete="tel"
              value={writePhone.value}
              onChange={writePhone.onChange}
            />
            <p className={styles.hint}>문의 조회 / 답변 확인에 사용됩니다.</p>
            <p className={styles.err}>휴대폰번호를 정확히 입력해 주세요.</p>
          </div>
          <div className={styles.fld}>
            <p>이메일</p>
            <input type="email" name="email" placeholder="답변 받을 이메일 (선택)" autoComplete="email" />
          </div>
        </div>

        <div className={fieldClass(writeInvalid, "title")}>
          <p>
            제목 <em>*</em>
          </p>
          <input type="text" name="title" placeholder="제목을 입력해주세요" />
          <p className={styles.err}>제목을 입력해 주세요.</p>
        </div>

        <div className={fieldClass(writeInvalid, "body")}>
          <p>
            내용 <em>*</em>
          </p>
          <textarea name="body" placeholder="문의 내용을 입력해주세요" />
          <p className={styles.err}>내용을 입력해 주세요.</p>
        </div>

        <div className={styles.fld} style={{ marginBottom: 0 }}>
          <p>첨부파일</p>
          <div className={styles.filerow}>
            <label htmlFor="fileInput">파일 선택</label>
            <input
              type="file"
              id="fileInput"
              name="file"
              onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "선택된 파일 없음")}
            />
            <span>{fileName}</span>
          </div>
        </div>

        <div className={styles.form_foot}>
          <Link href="/support" className={styles.btn_cancel}>
            작성취소
          </Link>
          <button type="submit" className={styles.btn_submit}>
            작성완료
          </button>
        </div>
      </form>

      <form
        ref={checkReveal.ref}
        className={checkReveal.className}
        noValidate
        hidden={mode !== "check"}
        onSubmit={onCheckSubmit}
      >
        <div className={fieldClass(checkInvalid, "key")}>
          <p>
            주문번호 또는 이름 <em>*</em>
          </p>
          <input type="text" name="key" placeholder="주문번호 또는 문의 시 입력한 이름" />
          <p className={styles.err}>주문번호 또는 이름을 입력해 주세요.</p>
        </div>
        <div className={fieldClass(checkInvalid, "phone")} style={{ marginBottom: 0 }}>
          <p>
            휴대폰번호 <em>*</em>
          </p>
          <input
            type="tel"
            name="phone"
            placeholder="010-0000-0000"
            inputMode="numeric"
            value={checkPhone.value}
            onChange={checkPhone.onChange}
          />
          <p className={styles.hint}>문의 남기실 때 입력하신 번호를 적어주세요.</p>
          <p className={styles.err}>휴대폰번호를 정확히 입력해 주세요.</p>
        </div>
        <div className={styles.form_foot}>
          <Link href="/support" className={styles.btn_cancel}>
            돌아가기
          </Link>
          <button type="submit" className={styles.btn_submit}>
            답변 확인하기
          </button>
        </div>
      </form>

      {answers !== null && answers.length === 0 && (
        <div className={styles.ansList}>
          <div className={styles.ansEmpty}>
            <p>
              등록된 문의 내역이 없습니다.
              <br />
              번호를 다시 확인해주시거나 카카오톡 채널로 문의해주세요.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
