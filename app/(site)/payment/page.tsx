import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { formatKRW, PRICING } from "@/lib/pricing";
import { PaymentForm } from "./PaymentForm";
import styles from "./payment.module.css";

export const metadata: Metadata = {
  title: "결제하기 | 명월재",
};

export default function PaymentPage() {
  return (
    <section>
      <div className="page_head">
        <p className="eyebrow">STEP 2 · 결제</p>
        <h1>주문 확인 및 결제</h1>
        <p className="sub">
          결제가 확인되면 24시간 이내에
          <br />
          전체 해설서를 보내드립니다.
        </p>
      </div>

      <Reveal className={styles.order}>
        <div className={styles.order_top}>
          <h2>명월재 심층사주 해설서</h2>
          <p>10개 파트 · 50개 이상 세부 항목 · PDF 제공</p>
        </div>
        <div className={styles.order_body}>
          <div className={styles.pay_row}>
            <span>정가</span>
            <span>{formatKRW(PRICING.listPrice)}</span>
          </div>
          <div className={`${styles.pay_row} ${styles.disc}`}>
            <span>오픈 할인 ({PRICING.discountRate}%)</span>
            <span>-{formatKRW(PRICING.discountAmount)}</span>
          </div>
          <div className={styles.pay_row}>
            <span>추가 금액</span>
            <span>없음</span>
          </div>
          <div className={styles.pay_total}>
            <span>최종 결제금액</span>
            <b>{formatKRW(PRICING.finalPrice)}</b>
          </div>
        </div>
      </Reveal>

      <PaymentForm />

      <p className={styles.pay_note}>
        · 결제 완료 후 해설서 작성이 시작되며, 작성 착수 이후에는 환불이 제한됩니다.
        <br />· 결제 오류나 입금 확인이 필요하시면 카카오톡 채널로 문의해주세요.
      </p>
    </section>
  );
}
