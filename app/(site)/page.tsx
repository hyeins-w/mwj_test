import Image from "next/image";
import dynamic from "next/dynamic";
import { CountUp } from "@/components/home/CountUp";
import { IntakeForm } from "@/components/home/IntakeForm";
import { ReviewWriteButton } from "@/components/home/ReviewWriteButton";
import { ScrollToFormButton } from "@/components/home/ScrollToFormButton";
import { FaqAccordion, type FaqItem } from "@/components/FaqAccordion";
import { KakaoChannelButton } from "@/components/shell/KakaoChannelButton";
import { Reveal } from "@/components/Reveal";
import { formatKRW, PRICING } from "@/lib/pricing";
import styles from "./home.module.css";

/** 후기 캐러셀은 화면 아래쪽 장식 요소라 Splide 를 초기 번들에서 제외한다. */
const ReviewCarousel = dynamic(() =>
  import("@/components/home/ReviewCarousel").then((m) => m.ReviewCarousel),
);

const PARTS = [
  { color: "#e5caa3", title: "01. 타고난 명(命)", desc: "나의 본질과 기질, 강점과 약점" },
  { color: "#debf92", title: "02. 지금, 나의 운", desc: "현재 내가 지나고 있는 운의 위치와 흐름" },
  { color: "#d6b481", title: "03. 2026년 운세", desc: "올해의 전체 흐름과 월별 길흉" },
  { color: "#cfaa6f", title: "04. 앞으로의 5년", desc: "해마다 달라지는 운의 흐름과 중요한 시기" },
  { color: "#cea666", title: "05. 돈이 들어오는 때", desc: "재물운과 돈이 모이는 시기, 손재를 경계할 때" },
  {
    color: "#cca058",
    tall: true,
    title: "06. 일과 성공의 운",
    desc: (
      <>
        직장·사업·이직·승진 그리고
        <br />
        나에게 맞는 성공의 방향
      </>
    ),
  },
  { color: "#c5984f", title: "07. 인생이 바뀌는 때", desc: "대운과 세운으로 살펴보는 인생의 주요 전환점" },
  { color: "#bd8a3f", title: "08. 인연과 사람복", desc: "연애·배우자·가족·귀인 그리고 멀리해야 할 인연" },
  { color: "#ae7b30", title: "09. 몸과 마음의 흐름", desc: "평생 건강운과 특히 조심해야 할 시기" },
  {
    color: "#96631c",
    tall: true,
    title: "10. 명월재의 마지막 당부",
    desc: (
      <>
        당신이 반드시 붙잡아야 할 세 가지
        <br />
        당신이 반드시 경계해야 할 세 가지
      </>
    ),
  },
];

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "태어난 시간을 정확히 몰라요",
    answer: (
      <>
        시간 없이 년/월/일 기둥 기반으로 분석은 가능합니다.
        <br />
        다만 시주와 일부 해석의 정밀도가 낮아지니, 가능하면 신청서에 출생시각을 함께 알려주세요.
      </>
    ),
  },
  {
    question: "음력 생일이어도 되나요?",
    answer: "네, 양력·음력(윤달 포함) 모두 신청 시 구분만 알려주시면 자동으로 변환해 정확히 계산합니다.",
  },
  {
    question: "리포트는 어떻게 받나요?",
    answer: "완성된 분석을 PDF로 정리해 이메리 또는 카카오톡으로 보내드립니다.",
  },
  {
    question: "얼마나 걸리나요?",
    answer: "결제가 확인되면 24시간 이내에 보내드립니다. 정확한 안내는 신청 후 연락 채널에서 다시 드립니다.",
  },
  {
    question: "결과를 꼭 믿어야 하나요?",
    answer:
      "본 서비스는 명리학 이론에 기반한 참고용 엔터테인먼트 콘텐츠입니다. 결과는 확정된 미래가 아니라 삶의 참고 자료 이며, 의료·법률·투자·결혼 등 중요한 결정의 근거로 삼지 마세요. 운명은 정해진 것이 아니라 노력으로 만들어 갑니다.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className={styles.main_sec1}>
        <Reveal variant="group" className={styles.main_sec1_top}>
          <div className="reveal-item">
            <Image src="/img/main/star2.webp" alt="" width={36} height={36} />
            <p>상위 1% 정통 역술가 21인이 함께한</p>
          </div>
          <h2 className="reveal-item">명월재(命月齋) 심층사주</h2>
          <p className="reveal-item">“당신의 운명을 미리 알고 설계하세요”</p>
        </Reveal>

        <Reveal className={styles.main_sec1_mid}>
          <div className={styles.main_decoStr}>
            <Image src="/img/main/deco_str.webp" alt="" width={649} height={44} />
          </div>
          <p>
            <b>단순 운세와는 다릅니다.</b>
            <br />
            사주 원국·오행·십성·대운·세운을 종합한
            <br />
            심층적인 명월재만의 사주해설을 제공합니다
            <br />
          </p>
          <p>
            <b>
              [21인의 정통 역술가 참여]<span></span>
            </b>
            <br />
            하나의 사주를 더 깊이 읽기 위해
            <br />
            명월재만의 해석 체계를 완성했습니다.
          </p>
          <p>
            듣기 좋은 이야기보다,
            <br />
            당신에게 필요한 이야기를
            <br />
            전해드릴것을 약속합니다
          </p>
        </Reveal>

        <div className={styles.main_sec1_bot}>
          <Reveal variant="group">
            <div className={`${styles.main_sec1_bCard} reveal-item`}>
              <div style={{ backgroundColor: "white", border: "1px solid #c0944d" }} />
              <div>
                <h3>
                  <CountUp target={21} />
                  <span>人</span>
                </h3>
                <p>역술가 참여</p>
              </div>
            </div>
            <div className={`${styles.main_sec1_bCard} reveal-item`}>
              <div style={{ backgroundColor: "#f2d4a7", border: "1px solid #f2d4a7" }} />
              <div>
                <h3>
                  <CountUp target={10} />
                  <span>大</span>
                </h3>
                <p>운명 영역 분석</p>
              </div>
            </div>
            <div className={`${styles.main_sec1_bCard} reveal-item`}>
              <div style={{ backgroundColor: "#c0944d", border: "1px solid #c0944d" }} />
              <div>
                <h3>
                  <CountUp target={50} />+
                </h3>
                <p>세부 항목 해설</p>
              </div>
            </div>
          </Reveal>

          <Reveal variant="scale" className={styles.main_sec1_bR}>
            <div className={styles.main_sec1_bR_str}>
              <div />
              <div />
            </div>
            <p>심층 풀이 건</p>
            <h3>
              <CountUp target={14399} comma />
              <span>+</span>
            </h3>
          </Reveal>
        </div>
      </section>

      <section className={styles.main_sec2} id="apply">
        <IntakeForm />
      </section>

      <section className={styles.main_sec3}>
        <div className={styles.main_sec3_deco}>
          <Image src="/img/main/deco_obj2.webp" alt="" width={44} height={366} />
        </div>
        <Reveal className={styles.main_sec3_top}>
          <h2>
            명월재가 풀어낸
            <br />
            <b>10가지 운명 해설</b>
          </h2>
          <p>
            당신의 사주, 겉만 보고 풀이하지 않습니다.
            <br />
            타고난 명(命)부터 앞으로의 운(運)까지 깊이 살펴드립니다.
          </p>
        </Reveal>
        <Reveal variant="group">
          {PARTS.map((part) => (
            <div key={part.title} className={`${styles.main_sec3_Card} reveal-item`}>
              <div style={{ backgroundColor: part.color, ...(part.tall ? { height: "4lh" } : {}) }} />
              <div>
                <h3>{part.title}</h3>
                <p>{part.desc}</p>
              </div>
            </div>
          ))}
        </Reveal>
      </section>

      <section className={styles.main_sec4}>
        <div className={styles.main_sec4_str} />
        <Reveal className={styles.main_sec4_top}>
          <h2>
            명월재
            <br />
            심층사주 실제후기
          </h2>
          <ReviewWriteButton />
        </Reveal>

        <ReviewCarousel />

        <div className={styles.main_sec4_bot}>
          <Reveal variant="scale" className={styles.main_sec4_starTxt}>
            <Image src="/img/main/star2.webp" alt="" width={36} height={36} />
            <p>
              꽃 피는 시기가 <b>모두 같을 수는 없습니다.</b>
              <br />
              당신의 운에도 <b>가장 찬란하게 피어나는 때</b>가 있습니다.
            </p>
          </Reveal>
          <Reveal variant="group" className={styles.main_sec4_bList}>
            <div className="reveal-item">
              <h2>10개</h2>
              <p>
                명월재 심층사주 파트
                <br />
                타고난 명부터 마지막 당부까지
              </p>
            </div>
            <div className="reveal-item">
              <h2>{formatKRW(PRICING.finalPrice)}</h2>
              <p>추가금액 없음</p>
            </div>
          </Reveal>
          <ScrollToFormButton />
        </div>
      </section>

      <section className={styles.main_sec5}>
        <div className={styles.main_sec5_str}>
          <Image src="/img/main/deco_str.webp" alt="" width={649} height={44} />
        </div>
        <div className={styles.main_sec5_tit}>
          <h2>자주 묻는 질문</h2>
        </div>
        <FaqAccordion
          items={FAQ_ITEMS}
          defaultOpenIndex={0}
          classes={{
            list: styles.main_sec5_list,
            item: styles.faq_item,
            active: styles.active,
            question: styles.faq_q,
            title: styles.faq_tit,
            icon: styles.faq_ic,
            panel: styles.faq_panel,
            panelInner: styles.faq_panel_inner,
            text: styles.faq_txt,
          }}
        />

        <div className={styles.main_sec5_tit}>
          <h2>담당자 문의하기</h2>
        </div>
        <Reveal variant="scale" className={styles.main_sec5_box}>
          <div className={styles.main_sec5_box_deco}>
            <Image src="/img/main/deco_obj1.webp" alt="" width={902} height={151} />
          </div>
          <p>
            궁금한 점이나 신청·입금 확인은 카카오톡 채널로
            <br />
            편하게 문의주세요. 입금 후 채널로 메시지를 남겨주시면
            <br />더 빠르게 처리해드립니다
          </p>
          <KakaoChannelButton className={styles.main_sec5_kakao}>
            카카오톡 채널 문의하기
          </KakaoChannelButton>
        </Reveal>
      </section>
    </>
  );
}
