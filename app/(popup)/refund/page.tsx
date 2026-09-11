import type { Metadata } from "next";
import { PopupHeader } from "@/components/popup/PopupHeader";

export const metadata: Metadata = {
  title: "환불정책 | 명월재",
};

export default function RefundPage() {
  return (
    <>
      <PopupHeader
        eyebrow="Refund Policy"
        title="환불정책"
        description="디지털 콘텐츠 특성을 반영한 명월재의 환불 기준을 안내합니다."
      />

      <section className="con_wrap">
        <p className="effective">시행일 2026년 6월 16일</p>

        <div className="con_box">
          <p className="con_tit">환불 가능한 경우</p>
          <div className="con_box_inner">
            <ul className="num_list">
              <li>결제 후 분석 콘텐츠가 생성·제공되기 전 — 전액 환불 가능</li>
              <li>결제 오류, 중복 결제 또는 회사의 귀책사유가 있는 경우</li>
              <li>결제 금액이 고지된 상품 가격과 다르게 청구된 경우</li>
            </ul>
            <p style={{ marginTop: 10 }}>
              환불 문의는 <b>1:1 문의</b> 또는 <b>카카오톡 채널 상담</b>을 통해 접수해 주세요. 확인 후
              순차적으로 안내드립니다.
            </p>
          </div>
        </div>

        <div className="con_box">
          <p className="con_tit">환불이 제한되는 경우</p>
          <div className="con_box_inner">
            <ul className="num_list">
              <li>디지털 콘텐츠 특성상 분석 결과가 생성되어 열람 가능한 상태가 된 이후의 단순 변심</li>
              <li>
                결제 완료 후 이용자의 요청에 따라 콘텐츠 생성이 시작되어, 사주 해설이 생성·발송된 경우
              </li>
              <li>이용자가 입력한 생년월일·출생시각·주제 선택 오류로 결과가 기대와 다른 경우</li>
              <li>사주 해석 콘텐츠 특성상 주관적 만족도 차이에 따른 단순 변심</li>
              <li>서비스 고지 범위 밖의 의료·법률·투자·관계 결과 보장을 기대한 경우</li>
            </ul>
          </div>
        </div>

        <div className="con_box">
          <p className="con_tit">환불 처리 절차</p>
          <div className="con_box_inner">
            <p>
              1:1 문의 또는 카카오톡 채널로 <b>주문번호, 성함, 환불 사유</b>를 남겨 주시면 확인 후 결제
              수단으로 환불해 드립니다. 처리에는 영업일 기준 3~5일 정도 소요될 수 있습니다.
            </p>
          </div>
          <div className="note_bar">
            <b>Tip.</b> 주문번호를 모르실 경우, 결과 페이지 상단의 <b>&#39;내 사주 결과 다시보기&#39;</b>
            에서 성함과 연락처로 주문번호를 조회할 수 있습니다.
          </div>
        </div>
      </section>
    </>
  );
}
