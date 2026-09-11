import type { Metadata } from "next";
import { PopupHeader } from "@/components/popup/PopupHeader";

export const metadata: Metadata = {
  title: "회사소개 | 명월재",
};

/** 푸터 companyInfo 와 항목/표기가 조금 달라(상호명 병기, 통신판매업신고번호 문구)
 *  공통 데이터로 합치지 않고 이 페이지 고유 내용으로 둔다. */
const INFO_ROWS: [string, string][] = [
  ["상호명", "(주)위드어스 · 명월재(命月齋)"],
  ["대표자", "이경식"],
  ["사업자등록번호", "332-88-03445"],
  ["통신판매업신고번호", "신고 예정 (등록 완료 시 고지)"],
  ["주소", "경기도 부천시 원미구 소향로 37번길 31-7"],
  ["이메일", "withusmkt@daum.net"],
  ["전화", "0507-1356-1719"],
];

export default function AboutPage() {
  return (
    <>
      <PopupHeader
        eyebrow="Company"
        title="회사소개"
        description="명월재(命月齋)를 운영하는 (주)위드어스를 소개합니다."
      />

      <section className="con_wrap">
        <div className="con_box">
          <div className="info_card">
            <table>
              <tbody>
                {INFO_ROWS.map(([label, value]) => (
                  <tr key={label}>
                    <th>{label}</th>
                    <td>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="con_box">
          <p className="con_tit">명월재 소개</p>
          <div className="con_box_inner">
            <p>
              명월재(命月齋)는 <b>(주)위드어스</b>가 운영하는 사주·명리 콘텐츠 서비스입니다.
            </p>
            <p>
              전통 명리학 이론과 데이터 기반 분석을 더해, 사주팔자·오행·십성·대운을 깊이 있게
              풀어내는 것을 목표로 하고 있습니다.
            </p>
            <p>문의사항은 카카오톡 채널 또는 1:1 문의를 통해 언제든 연락해 주세요.</p>
          </div>
        </div>
      </section>
    </>
  );
}
