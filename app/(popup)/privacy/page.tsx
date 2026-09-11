import type { Metadata } from "next";
import { PopupHeader } from "@/components/popup/PopupHeader";

export const metadata: Metadata = {
  title: "개인정보 처리방침 | 명월재",
};

export default function PrivacyPage() {
  return (
    <>
      <PopupHeader
        eyebrow="Privacy Policy"
        title="개인정보 처리방침"
        description="명월재는 이용자의 개인정보를 소중히 다루며, 관련 법령을 준수합니다."
      />

      <section className="con_wrap">
        <p className="effective">시행일 2026년 6월 16일</p>

        <div className="con_box">
          <p className="con_tit">1. 수집하는 개인정보 항목</p>
          <div className="con_box_inner">
            <p>회사는 사주 분석 및 주문 처리를 위해 다음의 정보를 수집합니다.</p>
            <ul>
              <li>필수 : 성함, 생년월일(양력/음력), 연락처(휴대전화번호)</li>
              <li>선택 : 출생시각, 이메일 주소</li>
              <li>
                결제 시 : 결제(주문)내역, 주문번호 — 결제는 PG사(카카오페이 등)를 통해 처리되며
                카드·계좌 정보는 회사가 직접 저장하지 않습니다
              </li>
              <li>문의 시 : 문의 내용 및 답변을 위한 연락처</li>
            </ul>
          </div>
        </div>

        <div className="con_box">
          <p className="con_tit">2. 개인정보의 수집 및 이용 목적</p>
          <div className="con_box_inner">
            <ul>
              <li>사주 원국 계산 및 분석 결과 생성</li>
              <li>주문 확인, 결과 발송 및 재조회(내 사주 결과 다시보기)</li>
              <li>결제 및 환불 처리</li>
              <li>1:1 문의 및 고객 상담 응대</li>
              <li>서비스 품질 개선 및 부정 이용 방지</li>
            </ul>
          </div>
        </div>

        <div className="con_box">
          <p className="con_tit">3. 개인정보의 보유 및 이용 기간</p>
          <div className="con_box_inner">
            <p>
              개인정보는 수집·이용 목적이 달성된 후에는 지체 없이 파기합니다. 다만 관련 법령에 따라
              다음과 같이 보관할 수 있습니다.
            </p>
            <ul className="num_list">
              <li>계약 또는 결제 기록 : 5년(전자상거래 등에서의 소비자보호에 관한 법률)</li>
              <li>소비자 불만 또는 분쟁 처리에 관한 기록 : 3년</li>
            </ul>
          </div>
        </div>

        <div className="con_box">
          <p className="con_tit">4. 개인정보의 파기 절차 및 방법</p>
          <div className="con_box_inner">
            <p>
              보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 된 경우 지체 없이 해당 정보를
              파기합니다.
            </p>
            <p>
              전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법으로 삭제하며, 종이에 출력된
              정보는 분쇄 또는 소각을 통해 파기합니다.
            </p>
          </div>
        </div>

        <div className="con_box">
          <p className="con_tit">5. 개인정보 보호를 위한 기술적·관리적 대책</p>
          <div className="con_box_inner">
            <ul>
              <li>결제·연락처 등 중요 정보의 암호화 저장</li>
              <li>외부 침입 차단 및 백신 프로그램을 통한 해킹 대비</li>
              <li>개인정보 취급 담당자의 최소화 및 정기 교육</li>
              <li>개인정보 보호 책임자 지정 및 처리방침 준수 여부 점검</li>
            </ul>
          </div>
        </div>

        <div className="con_box">
          <p className="con_tit">6. 광고성 정보 수신 동의(선택)</p>
          <div className="con_box_inner">
            <p>
              회사는 이벤트, 할인 혜택, 신규 서비스 안내를 위해 별도 동의를 받은 이용자에 한해
              카카오톡·문자·이메일로 광고성 정보를 발송할 수 있습니다.
            </p>
            <p>
              이용자는 언제든지 수신 동의를 거부하거나 철회할 수 있으며, 거부하더라도 무료·유료 서비스
              이용에는 제한이 없습니다.
            </p>
          </div>
        </div>

        <div className="con_box">
          <p className="con_tit">7. 개인정보 보호책임자 및 문의</p>
          <div className="con_box_inner">
            <table>
              <tbody>
                <tr>
                  <th>담당</th>
                  <td>(주)위드어스 고객센터</td>
                </tr>
                <tr>
                  <th>이메일</th>
                  <td>withusmkt@daum.net</td>
                </tr>
                <tr>
                  <th>전화</th>
                  <td>0507-1356-1719</td>
                </tr>
              </tbody>
            </table>
            <p style={{ marginTop: 10 }}>
              개인정보 관련 문의는 1:1 문의 또는 카카오톡 채널을 통해서도 접수하실 수 있습니다.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
