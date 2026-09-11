import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { MOCK_PILLARS, MOCK_PROFILE } from "@/lib/mockSaju";
import { formatKRW, PRICING } from "@/lib/pricing";
import { OhaengBars } from "./OhaengBars";
import styles from "./free.module.css";

export const metadata: Metadata = {
  title: "무료 사주 결과 | 명월재",
};

const LOCKED_PARTS = [
  { title: "01. 타고난 명(命)", desc: "나의 본질과 기질, 강점과 약점" },
  { title: "02. 지금, 나의 운", desc: "현재 내가 지나고 있는 운의 위치와 흐름" },
  { title: "03. 2026년 운세", desc: "올해의 전체 흐름과 월별 길흉" },
  { title: "04. 앞으로의 5년", desc: "해마다 달라지는 운의 흐름과 중요한 시기" },
  { title: "05. 돈이 들어오는 때", desc: "재물운과 돈이 모이는 시기, 손재를 경계할 때" },
  { title: "06. 일과 성공의 운", desc: "직장·사업·이직·승진 그리고 나에게 맞는 성공의 방향" },
  { title: "07. 인생이 바뀌는 때", desc: "대운과 세운으로 살펴보는 인생의 주요 전환점" },
  { title: "08. 인연과 사람복", desc: "연애·배우자·가족·귀인 그리고 멀리해야 할 인연" },
  { title: "09. 몸과 마음의 흐름", desc: "평생 건강운과 특히 조심해야 할 시기" },
  { title: "10. 명월재의 마지막 당부", desc: "반드시 붙잡아야 할 세 가지, 반드시 경계해야 할 세 가지" },
];

export default function ResultFreePage() {
  const { name, birthDate, calendarAndTime, gender } = MOCK_PROFILE;

  return (
    <section>
      <div className="page_head">
        <Image className="deco" src="/img/main/star2.webp" alt="" width={36} height={36} />
        <p className="eyebrow">명월재 무료 사주 풀이</p>
        <h1>
          {name} 님의
          <br />
          사주 원국이 세워졌습니다
        </h1>
        <div className={styles.chipRow}>
          <span className={styles.chip}>{birthDate}</span>
          <span className={styles.chip}>{calendarAndTime}</span>
          <span className={styles.chip}>{gender}</span>
        </div>
      </div>

      <Reveal className="card">
        <div className="card_tit">사주 원국 (四柱八字)</div>
        <div className={styles.pillars}>
          {MOCK_PILLARS.map((p) => (
            <div
              key={p.name}
              className={p.isSelf ? `${styles.pillar} ${styles.me}` : styles.pillar}
            >
              <div className={styles.p_name}>
                {p.name}
                <span>{p.role}</span>
              </div>
              <div className={styles.p_god}>{p.topGod}</div>
              <div className={styles.p_tile} style={{ background: p.heaven.color }}>
                {p.heaven.char}
              </div>
              <div className={styles.p_tile} style={{ background: p.earth.color }}>
                {p.earth.char}
              </div>
              <div className={styles.p_god}>{p.bottomGod}</div>
            </div>
          ))}
        </div>
        <p className={styles.wg_note}>
          일간(日干)은 <b>병화(丙火)</b>. 한여름 태양처럼 밝고 드러나는 기운을 타고났습니다.
        </p>
      </Reveal>

      <Reveal className="card">
        <div className="card_tit">오행 분포</div>
        <OhaengBars />
        <p className={styles.wg_note}>
          목·토·금이 고르게 자리했고 <b>화(火)와 수(水)가 다소 약합니다.</b> 추진력은 충분하나 열기를
          이어가는 힘과 마음을 식히는 힘을 함께 챙겨야 합니다.
        </p>
      </Reveal>

      <Reveal className="card">
        <div className="card_tit">타고난 성격과 기질</div>
        <p className={styles.body_txt}>
          감추는 법을 모르는 사람입니다. 생각한 것을 곧바로 말하고 움직이며, 그{" "}
          <b>솔직함이 주변 사람을 끌어당기는 가장 큰 힘</b>입니다. 일을 벌이는 데 재능이 있고, 새로운
          판을 짜는 자리에서 능력이 가장 잘 드러납니다.
        </p>
        <p className={styles.body_txt}>
          다만 관심이 빠르게 옮겨가는 편이라 마무리에서 아쉬움이 남습니다. <b>끝까지 남는 사람이 되는 것</b>
          , 그것이 이 사주가 평생 안고 가야 할 과제입니다.
        </p>
      </Reveal>

      <Reveal className="card">
        <div className="card_tit">2026년 한 줄 요약</div>
        <div className={styles.year_line}>
          <div className={styles.yl_kw}>파(破)하고 다시 세우는 해</div>
          <p>
            묵혀두었던 일이 정리되며 자리가 바뀝니다.
            <br />
            <b>상반기의 손실이 하반기의 기회</b>로 돌아옵니다.
          </p>
        </div>
      </Reveal>

      <Reveal className={styles.lock_wrap}>
        <div className={styles.lock_head}>
          <h2>이어지는 10가지 해설</h2>
          <p>아래 항목은 심층사주 결제 후 전부 확인하실 수 있습니다.</p>
        </div>
        <div className={styles.lock_list}>
          {LOCKED_PARTS.map((part, i) => (
            <div
              key={part.title}
              className={i === 0 ? styles.lock_item : `${styles.lock_item} ${styles.blur}`}
            >
              <div />
              <div>
                <h3>{part.title}</h3>
                <p>{part.desc}</p>
              </div>
            </div>
          ))}
          <div className={styles.lock_veil}>
            <div className={styles.lock_badge}>잠금 해제 필요</div>
            <p>
              9개 항목 · 50개 이상의 세부 해설이
              <br />
              아직 열리지 않았습니다
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal className={styles.cta}>
        <div className={styles.cta_deco}>
          <Image src="/img/main/deco_obj1.webp" alt="" width={902} height={151} />
        </div>
        <div className={styles.cta_kw}>심층사주 전체 해설 열기</div>
        <p className={styles.cta_sub}>
          21인의 역술가가 함께 정리한 10개 파트 전문을
          <br />
          PDF로 소장하실 수 있습니다.
        </p>
        <div className={styles.price}>
          <span className={styles.off}>{PRICING.discountRate}%</span>
          <span className={styles.was}>{formatKRW(PRICING.listPrice)}</span>
          <span className={styles.now}>{formatKRW(PRICING.finalPrice)}</span>
        </div>
        <Link href="/payment" className="btn_navy">
          나의 운명해설서 펼쳐보기 &gt;
        </Link>
      </Reveal>
    </section>
  );
}
