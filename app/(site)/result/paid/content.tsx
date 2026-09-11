/** 해설서 본문(서술 콘텐츠). 지금은 데모 텍스트지만, 실제로는 사주 계산 + Claude API 가
 *  생성해 DB 에 저장한 뒤 이 모양으로 내려주게 될 부분이다. */

export const MONTHLY_NOTES: { month: string; text: string }[] = [
  { month: "1월", text: "생활 리듬과 우선순위를 정리하는 달. 감정이 앞선 즉답을 피하십시오." },
  { month: "2월", text: "사람 사이의 말이 많아집니다. 짧고 분명하게 정리하는 편이 유리합니다." },
  { month: "3월", text: "몸과 일정이 함께 바빠집니다. 한꺼번에 많은 책임을 떠안지 마십시오." },
  { month: "4월", text: "관계에서 작은 균열이 드러납니다. 애매한 호의를 거두고 선을 정하십시오." },
  { month: "5월", text: "방향을 다시 잡기 좋은 달. 하나씩 시험하는 방식이 안전합니다." },
  { month: "6월", text: "체력과 집중력이 흔들립니다. 더 하기보다 덜어내는 편이 이익입니다." },
  { month: "7월", text: "올해 가장 중요한 제안이 옵니다. 조건을 반드시 문장으로 확인하십시오." },
  { month: "8월", text: "성과보다 기반을 다지는 달. 넓히는 때가 아니라 단단하게 만드는 때입니다." },
  { month: "9월", text: "사람을 통해 정보가 들어옵니다. 한 번 더 확인한 뒤 답하십시오." },
  { month: "10월", text: "재정 흐름을 다시 볼 때. 작은 새는 구멍을 먼저 막으십시오." },
  { month: "11월", text: "마무리의 질이 중요합니다. 끝을 흐리면 다음 해로 부담이 넘어갑니다." },
  { month: "12월", text: "한 해를 돌아보며 무엇을 이어갈지 고르는 데 힘을 쓰십시오." },
];

export const YEAR_NOTES: {
  year: string;
  score: number;
  color: string;
  tag: string;
  title: string;
  text: string;
}[] = [
  {
    year: "2026",
    score: 78,
    color: "#c0944d",
    tag: "전환",
    title: "흐름을 다시 세우는 해",
    text: "묵혀두었던 일이 정리되며 자리가 바뀝니다. 크게 벌리기보다 남길 것과 버릴 것을 가르는 데 힘을 쓰십시오.",
  },
  {
    year: "2027",
    score: 82,
    color: "#7b5cc4",
    tag: "상승",
    title: "움직인 만큼 답이 오는 해",
    text: "제안과 연결이 늘어납니다. 좋아 보이는 자리일수록 조건을 문장으로 확인하십시오.",
  },
  {
    year: "2028",
    score: 70,
    color: "#8b8b8b",
    tag: "정체",
    title: "속도를 줄여 다지는 해",
    text: "밖으로 넓히기보다 안을 채워야 하는 해입니다. 이 해를 잘 넘기면 다음 2년이 가볍습니다.",
  },
  {
    year: "2029",
    score: 88,
    color: "#7b5cc4",
    tag: "도약",
    title: "판이 커지는 해",
    text: "준비한 것이 형태를 갖춥니다. 사람을 늘리되 기준은 줄이지 마십시오.",
  },
  {
    year: "2030",
    score: 95,
    color: "#aa7529",
    tag: "결실",
    title: "자리를 확정하는 해",
    text: "지난 4년의 선택이 한 방향으로 모입니다. 이 해의 위치가 이후 10년의 기준이 됩니다.",
  },
];

export const SINSAL = [
  { label: "천을귀인", title: "결정적 순간 귀인의 도움을 받는 별" },
  { label: "역마살", title: "이동·변화가 잦고 활동 반경이 넓어지는 별" },
  { label: "문창귀인", title: "글과 배움으로 이름을 얻는 별" },
  { label: "화개살", title: "예술적 감성과 철학적 기운이 강한 별" },
  { label: "공망(空亡)", title: "子丑이 공망 — 급하게 서두르면 헛도는 시기" },
];

export const TOC_ENTRIES = [
  { id: "sec-summary", mark: "評", label: "종합 총평" },
  { id: "sec-00", mark: "命", label: "사주 원국" },
  { id: "sec-01", mark: "01", label: "타고난 명(命)" },
  { id: "sec-02", mark: "02", label: "지금, 나의 운" },
  { id: "sec-03", mark: "03", label: "2026년 운세" },
  { id: "sec-04", mark: "04", label: "앞으로의 5년" },
  { id: "sec-05", mark: "05", label: "돈이 들어오는 때" },
  { id: "sec-06", mark: "06", label: "일과 성공의 운" },
  { id: "sec-07", mark: "07", label: "인생이 바뀌는 때" },
  { id: "sec-08", mark: "08", label: "인연과 사람복" },
  { id: "sec-09", mark: "09", label: "몸과 마음의 흐름" },
  { id: "sec-10", mark: "10", label: "명월재의 마지막 당부" },
];
