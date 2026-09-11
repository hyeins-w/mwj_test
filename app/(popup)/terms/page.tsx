import type { Metadata } from "next";
import { PopupHeader } from "@/components/popup/PopupHeader";

export const metadata: Metadata = {
  title: "이용약관 | 명월재",
};

export default function TermsPage() {
  return (
    <>
      <PopupHeader
        eyebrow="Terms of Service"
        title="이용약관"
        description="명월재 서비스 이용에 관한 기본적인 사항을 안내합니다."
      />

      <section className="con_wrap">
        <p className="effective">시행일 2026년 6월 16일</p>

        <div className="con_box">
          <p className="con_tit">제1조 (서비스 내용)</p>
          <div className="con_box_inner">
            <p>회사는 다음과 같은 서비스를 제공합니다.</p>
            <ul>
              <li>무료 사주 및 운세 콘텐츠</li>
              <li>AI·명리학 기반 심층 사주 분석 서비스</li>
              <li>프리미엄 유료 콘텐츠(명월재 심층사주 해설서 등)</li>
              <li>기타 부가 서비스(1:1 문의, 결과 재조회 등)</li>
            </ul>
            <p style={{ marginTop: 10 }}>
              본 서비스는 별도의 회원가입 없이, 신청 시 입력한{" "}
              <span className="gold">성함·생년월일·연락처</span> 정보를 기준으로 주문번호가 발급되어
              이용할 수 있습니다.
            </p>
          </div>
        </div>

        <div className="con_box">
          <p className="con_tit">제2조 (유료 서비스 및 결제)</p>
          <div className="con_box_inner">
            <p>
              일부 서비스는 유료로 제공되며, 이용자는 결제 전 상품 내용과 가격을 충분히 확인한 후
              구매하여야 합니다.
            </p>
            <p>
              결제 완료 후 분석 결과는 신청 시 입력한 연락처(카카오톡 메시지 등)로 발송되며, 통상
              30분~1시간 정도 소요됩니다.
            </p>
          </div>
        </div>

        <div className="con_box">
          <p className="con_tit">제3조 (면책사항)</p>
          <div className="con_box_inner">
            <p>
              회사가 제공하는 사주, 운세, 궁합, 재물운, 연애운 및 분석 결과는 전통 명리학과 통계적
              분석을 기반으로 한 <b>참고용 정보</b>입니다.
            </p>
            <p>본 서비스는 미래를 확정적으로 예측하거나 보장하지 않습니다.</p>
            <p>
              투자, 재산, 건강, 사업, 취업, 결혼, 법률 등 중요한 의사결정에 대한 책임은 이용자
              본인에게 있으며, 회사는 이에 따른 직·간접적인 손해에 대해 책임을 지지 않습니다.
            </p>
          </div>
        </div>

        <div className="con_box">
          <p className="con_tit">제4조 (저작권)</p>
          <div className="con_box_inner">
            <p>
              서비스 내 모든 콘텐츠(사주 해설, 텍스트, 이미지, 디자인 등)의 저작권은 회사에 있으며,
              회사의 사전 승인 없이 복제, 배포 및 상업적 이용을 할 수 없습니다.
            </p>
          </div>
        </div>

        <div className="con_box">
          <p className="con_tit">제5조 (서비스 변경 및 중단)</p>
          <div className="con_box_inner">
            <p>
              회사는 운영상 필요에 따라 서비스의 일부 또는 전부를 변경하거나 중단할 수 있으며, 중요한
              변경 사항은 홈페이지 공지 등을 통해 사전에 안내합니다.
            </p>
          </div>
        </div>

        <div className="con_box">
          <p className="con_tit">제6조 (분쟁 해결)</p>
          <div className="con_box_inner">
            <p>
              본 약관은 대한민국 법률에 따르며, 관련 분쟁은 회사 소재지 관할 법원을 전속 관할 법원으로
              합니다.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
