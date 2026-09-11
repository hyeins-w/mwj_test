"use client";

import Image from "next/image";
import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import styles from "./paid.module.css";

const AGES = ["10대", "20대", "30대", "40대", "50대", "60대 이상"];

export function ReviewForm() {
  const [open, setOpen] = useState(false);
  const [score, setScore] = useState(5);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: 실제 후기 등록 API 연동 위치
    alert(`${score}점 후기가 등록되었습니다. 소중한 의견 감사합니다.`);
    e.currentTarget.reset();
    setScore(5);
  };

  return (
    <Reveal className={styles.rev_wrap}>
      <button
        type="button"
        className={`btn_line ${styles.rev_toggle}`}
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
      >
        후기 남기기
      </button>
      <form className={styles.rev_form} hidden={!open} onSubmit={onSubmit}>
        <h3>후기를 남겨주세요</h3>
        <p>남겨주신 후기는 다른 분들의 선택에 큰 도움이 됩니다.</p>
        <div className={styles.stars}>
          {[1, 2, 3, 4, 5].map((v) => (
            <button
              key={v}
              type="button"
              className={v <= score ? styles.on : undefined}
              onClick={() => setScore(v)}
            >
              <Image src="/img/main/star1.webp" alt={`${v}점`} width={28} height={27} />
            </button>
          ))}
        </div>
        <textarea name="review" placeholder="해설서를 읽고 느낀 점을 자유롭게 남겨주세요." required />
        <div className={styles.rev_meta}>
          <input type="text" name="nick" placeholder="표시될 이름 (예: 김0준)" required />
          <select name="age" required defaultValue="">
            <option value="">연령대 선택</option>
            {AGES.map((age) => (
              <option key={age}>{age}</option>
            ))}
          </select>
        </div>
        <button type="submit" className={`btn_navy ${styles.rev_submit}`}>
          후기 등록하기
        </button>
      </form>
    </Reveal>
  );
}
