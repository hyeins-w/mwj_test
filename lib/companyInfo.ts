/** 기존 7~8개 파일 푸터에 중복 하드코딩되어 있던 사업자 정보 단일 소스. */
export const companyInfo = {
  상호명: "(주)위드어스",
  대표자: "이경식",
  사업자등록번호: "332-88-03445",
  통신판매번호: "사업자등록번호 332-88-03445",
  주소: "경기도 부천시 원미구 소향로 37번길 31-7",
  이메일: "withusmkt@daum.net",
  전화: "0507-1356-1719",
} as const;

export type CompanyInfoKey = keyof typeof companyInfo;

export const companyInfoRows = Object.entries(companyInfo) as [
  CompanyInfoKey,
  string,
][];
