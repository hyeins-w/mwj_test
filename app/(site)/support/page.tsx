import type { Metadata } from "next";
import Link from "next/link";
import { FaqAccordion, type FaqItem } from "@/components/FaqAccordion";
import { KakaoChannelButton } from "@/components/shell/KakaoChannelButton";
import { Reveal } from "@/components/Reveal";
import styles from "./support.module.css";

export const metadata: Metadata = {
  title: "고객센터 | 명월재",
};

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "*문의 전 필독* 결제를 했는데 풀이결과가 안왔어요.",
    answer: (
      <>
        <p>결제 후에 1시간이 지나도 풀이결과를 받지 못하신 경우는 아래 두 가지 경우입니다.</p>
        <p>
          <b>1. 핸드폰번호를 잘못 입력하신 경우</b>
          <br />
          <Link href="/result/lookup">내 사주결과 다시보기</Link> 메뉴에서 &lt;주문번호 + 성함&gt;으로
          조회해주시거나, 1:1 문의 게시판 혹은 카카오톡 채팅 문의로 연락주시면 처리해드리겠습니다.
          주문번호를 모르실 경우 <Link href="/result/lookup">내 사주결과 다시보기</Link> 메뉴에서
          주문번호 찾기를 하실 수 있습니다.
        </p>
        <p>
          <b>2. 카카오페이로 결제했는데, 충전만 된 경우</b>
          <br />
          카카오페이에 충전만 되시고 저희쪽으로 결제가 되지 않은 경우입니다. 고객님 계좌 →
          카카오페이 → 명월재 이렇게 금액이 옮겨가야 하는데, 이 경우는 고객님 계좌 → 카카오페이
          여기까지만 진행된 경우입니다.
          <br />이 경우에는 계좌에서 돈이 빠져나갔지만 카카오페이에 충전만 되고 저희쪽으로 결제는
          되지 않은 경우로, 카카오페이에 가보시면 충전하신 금액이 그대로 남아있을 것입니다. 이
          상태에서 다시 주문해주시면 결제가 정상적으로 처리됩니다.
        </p>
        <p>감사합니다.</p>
      </>
    ),
  },
  {
    question: "풀이를 다시 보려면 어떻게 하나요?",
    answer: (
      <>
        <p>
          명월재 홈페이지 우측 상단에서 <Link href="/result/lookup">내 사주 결과 다시보기</Link>를
          클릭하신 후 주문번호와 핸드폰번호를 입력하시면 결과를 다시 확인하실 수 있습니다.
        </p>
        <p>
          혹시 주문번호를 모르시거나 확인이 어렵다면 카카오톡 문의 혹은 1:1 문의하기를 통해 문의
          주시면 감사하겠습니다.
        </p>
      </>
    ),
  },
  {
    question: "결제 했는데 풀이는 어디서 보나요?",
    answer: (
      <>
        <p>풀이 결과는 주문하실 때 입력하신 번호의 카카오톡 메시지로 보내드립니다.</p>
        <p>풀이까지는 약 30분~1시간 정도 소요됩니다.</p>
      </>
    ),
  },
  {
    question: "태어난 시간을 정확히 몰라요.",
    answer: (
      <p>
        시간 없이 년/월/일 기둥 기반으로 분석은 가능합니다. 다만 시주와 일부 해석의 정밀도가
        낮아지니, 가능하면 신청서에 출생시각을 함께 알려주세요.
      </p>
    ),
  },
  {
    question: "음력 생일이어도 되나요?",
    answer: (
      <p>
        네, 양력·음력(윤달 포함) 모두 신청 시 구분만 알려주시면 자동으로 변환해 정확히 계산합니다.
      </p>
    ),
  },
  {
    question: "결과를 꼭 믿어야 하나요?",
    answer: (
      <p>
        본 서비스는 명리학 이론에 기반한 참고용 콘텐츠입니다. 결과는 확정된 미래가 아니라 삶의 참고
        자료이며, 의료·법률·투자·결혼 등 중요한 결정의 근거로 삼지 마세요. 운명은 정해진 것이 아니라
        노력으로 만들어 갑니다.
      </p>
    ),
  },
];

export default function SupportPage() {
  return (
    <section>
      <div className="page_head">
        <h1>고객센터</h1>
        <p className="sub">
          이용 중 궁금한 점이 있으신가요?
          <br />
          자주 묻는 질문을 확인해보세요.
        </p>
      </div>

      <Reveal className={styles.help_row}>
        <div className={styles.help_card}>
          <div className={styles.help_ic} style={{ background: "#fff4bf", color: "#8a6421" }}>
            톡
          </div>
          <div>
            <b>카카오톡 상담</b>
            <span>평일 10:00 – 18:00</span>
          </div>
          <KakaoChannelButton className={styles.help_hit} aria-label="카카오톡 상담" />
        </div>
        <Link href="/inquiry" className={styles.help_card}>
          <div className={styles.help_ic} style={{ background: "#e6ecf6", color: "#0D253B" }}>
            문
          </div>
          <div>
            <b>1:1 문의 남기기</b>
            <span>주문번호를 입력해 문의할 수 있어요</span>
          </div>
        </Link>
      </Reveal>

      <Reveal className={styles.check_row}>
        <Link href="/inquiry?mode=check" className={styles.check_btn}>
          내 문의 답변 확인하기
        </Link>
      </Reveal>

      <FaqAccordion
        items={FAQ_ITEMS}
        defaultOpenIndex={0}
        reveal
        classes={{
          list: styles.faq_list,
          item: styles.faq_item,
          active: styles.active,
          question: styles.faq_q,
          mark: styles.faq_q_mark,
          title: styles.faq_tit,
          icon: styles.faq_ic,
          panel: styles.faq_panel,
          panelInner: styles.faq_panel_inner,
          text: styles.faq_txt,
        }}
      />
    </section>
  );
}
