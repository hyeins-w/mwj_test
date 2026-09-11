import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { MOCK_HIDDEN_STEMS, MOCK_METRICS, MOCK_PILLARS, MOCK_PROFILE, MONTH_LABELS } from "@/lib/mockSaju";
import { DonutChart, GaugeChart, HBarChart, LineChart, RadarChart, TimelineChart } from "./charts";
import { MONTHLY_NOTES, SINSAL, TOC_ENTRIES, YEAR_NOTES } from "./content";
import { ReportActions } from "./ReportActions";
import { ReviewForm } from "./ReviewForm";
import { TocNav } from "./TocNav";
import styles from "./paid.module.css";

export const metadata: Metadata = {
  title: "나의 운명 해설서 | 명월재",
};

function SectionHead({ mark, title }: { mark: string; title: string }) {
  return (
    <div className={styles.sec_hd}>
      <span className={styles.sec_num}>{mark}</span>
      <span className={styles.sec_tit}>{title}</span>
    </div>
  );
}

export default function ResultPaidPage() {
  const m = MOCK_METRICS;
  const bestIndex = m.monthly.indexOf(Math.max(...m.monthly));
  const worstIndex = m.monthly.indexOf(Math.min(...m.monthly));

  return (
    <section className="print_report">
      <div className="page_head">
        <Image className="deco" src="/img/main/star2.webp" alt="" width={36} height={36} />
        <p className="eyebrow">상위 1% 정통 역술가 21인이 함께한 심층사주</p>
        <h1>
          {MOCK_PROFILE.name} 님의
          <br />
          운명 해설서
        </h1>
        <div className={styles.stamp}>
          <span>
            {MOCK_PROFILE.birthDate} · {MOCK_PROFILE.calendarAndTime.replace(" · ", " ")}
          </span>
          <span>발행 {MOCK_PROFILE.issuedAt}</span>
        </div>
      </div>

      <Reveal className={styles.hero_score}>
        <div className={styles.gauge}>
          <GaugeChart value={m.overallScore} size={128} />
        </div>
        <div className={styles.side}>
          <div className={styles.lb}>2026년 종합운 지수</div>
          <div className={styles.kw}>
            <span>전환의 해</span>
            <span>재물 상승기</span>
            <span>인연 확장</span>
          </div>
        </div>
      </Reveal>

      <p className={styles.notice}>
        ※ 본 해설서는 생년월일시에 기반한 전통 명리 해석을 바탕으로 한 참고용 조언입니다. 중대한
        의학·법률·재정 결정을 대신하지 않으며 결과를 보장하지 않습니다.
      </p>

      {/* 종합 총평 */}
      <Reveal className={styles.sec} id="sec-summary">
        <SectionHead mark="評" title="명월재 종합 총평" />
        <div className={styles.summary}>
          <div className={styles.st}>21인의 역술가가 함께 본 {MOCK_PROFILE.name} 님의 사주</div>
          <p>
            병화(丙火) 일간이 인목(寅木)의 자양을 받아 스스로 타오르는 사주로, 겉으로는 밝고 거침없어
            보여도 안쪽에는 한번 정하면 좀처럼 꺾이지 않는 뚝심이 자리하고 있습니다. 월지 신금(申金)에서
            편재가 투출한 구조라, 판을 넓히고 사람을 모아 실제 성과로 바꾸어내는 힘이 이 사주의 가장 큰
            자산입니다.
          </p>
          <p>
            2026년은 병오(丙午) 세운이 원국의 화 기운을 한 번 더 밝히는 해입니다. 존재감이 크게 드러나는
            만큼 조급함은 경계해야 하며, 7~9월의 상승 흐름을 어떻게 준비하느냐에 따라 앞으로 5년의 궤적이
            크게 달라집니다.
          </p>
          <p>
            이 사주를 읽을 때 가장 먼저 기억하실 것은 <b>‘속도를 조절하는 판단’</b>입니다. 결심이 부족한
            사주가 아니라, 결심이 너무 빨라 조건을 놓치는 사주입니다. 기회는 대부분 사람을 통해 들어오지만,
            그 자리에서 바로 답을 주면 뒤에 번복이 따라옵니다. 판단은 빠르게 하되 결정은 한 박자 늦게 — 이
            한 줄만 지켜도 앞으로 10년의 손실 대부분이 줄어듭니다.
          </p>
          <p>
            반대로 이 사주가 가장 크게 힘을 내는 순간은 <b>맡은 자리에서 끝까지 남았을 때</b>입니다. 시작은
            누구보다 잘하지만 마무리에서 공백이 생기기 쉬운 구조라, 벌인 일의 절반만 끝내도 주변의 평가가
            완전히 달라집니다. 21인의 역술가가 공통으로 짚은 지점 역시 재능이나 운의 크기가 아니라, 그
            재능을 끝까지 붙들고 있는 시간의 길이였습니다.
          </p>
        </div>
      </Reveal>

      {/* 사주 원국 */}
      <Reveal className={styles.sec} id="sec-00">
        <SectionHead mark="命" title="사주 원국(四柱原局)" />
        <div className={styles.cardbox}>
          <div className={styles.pillars}>
            {MOCK_PILLARS.map((p) => (
              <div key={p.name} className={p.isSelf ? `${styles.pillar} ${styles.me}` : styles.pillar}>
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
                <div className={styles.p_un}>{p.lifeStage}</div>
              </div>
            ))}
          </div>
          <p className={styles.pillar_note}>
            일간(日干)은 <b>병화(丙火)</b>. 한낮의 태양처럼 밝고 드러나는 기운을 타고났습니다.
          </p>
        </div>

        <div className={styles.cardbox}>
          <div className={styles.cardbox_tit}>지장간(支藏干) · 원국 안에 숨은 기운</div>
          <div className={styles.jj}>
            {MOCK_HIDDEN_STEMS.map((col) => (
              <div key={col.label} className={styles.jc}>
                <div className={styles.jl}>{col.label}</div>
                <div className={styles.jv}>
                  {col.chars.map((ch, i) => (
                    <span key={`${col.label}-${i}`}>{ch}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.two}>
          <div className={styles.cardbox}>
            <div className={styles.cardbox_tit}>오행(五行) 분포</div>
            <div className={styles.donutRow}>
              <DonutChart segments={m.fiveElements} />
            </div>
          </div>
          <div className={styles.cardbox}>
            <div className={styles.cardbox_tit}>십성(十星) 분포</div>
            <HBarChart data={m.tenGods} max={16} />
          </div>
        </div>

        <div className={`${styles.two} ${styles.twoGap}`}>
          <div className={styles.cardbox}>
            <div className={styles.cardbox_tit}>격국(格局) · 용신(用神)</div>
            <div className={`${styles.stats} ${styles.statsSingle}`}>
              <div>
                <div className={styles.sl}>격국</div>
                <div className={styles.sv}>편재격(偏財格)</div>
              </div>
              <div>
                <div className={styles.sl}>용신 · 희신 · 기신</div>
                <div className={styles.sv}>목(木) · 화(火) · 수(水)</div>
              </div>
            </div>
          </div>
          <div className={styles.cardbox}>
            <div className={styles.cardbox_tit}>신살(神殺)</div>
            <div className={styles.chips}>
              {SINSAL.map((s) => (
                <span key={s.label} title={s.title}>
                  {s.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      {/* 01 */}
      <Reveal className={styles.sec} id="sec-01">
        <SectionHead mark="一" title="01. 타고난 명(命)" />
        <p className={styles.lead}>
          <span className={styles.oracle}>
            병화(丙火)가 인목(寅木)에 뿌리내려, 스스로 타오르며 주변을 밝히는 사주입니다.
          </span>
          <span className={styles.bridge}>
            {" "}
            쉽게 말해 감추는 법을 모르는 사람이라는 뜻입니다. 솔직함이 사람을 끌어당기는 가장 큰 힘이고,
            같은 이유로 가장 자주 손해를 보는 지점이기도 합니다.
          </span>
          <span className={styles.bridge}>
            {" "}
            또한 식신이 재성으로 흘러가는 <b>식신생재(食神生財)</b>의 구조를 이루고 있어, 스스로 만들어낸
            것을 실제 결실로 바꾸는 힘이 유독 강한 명(命)입니다. 아이디어에서 멈추지 않고 사람과 돈이 붙는
            형태까지 밀고 가는 힘, 이것이 이 사주의 본질입니다.
          </span>
        </p>
        <div className={styles.tbox}>
          <h4>생활 양식</h4>
          <p>
            손이 비어 있는 시간을 오래 견디지 못합니다. 한가하게 흘러가는 생활보다, 해야 할 일을 정해두고 그
            안에서 움직일 때 컨디션이 맞습니다. 다만 월주의 수(水) 기운이 제동을 걸어 무작정 달리지는
            않으므로, 겉으로 보이는 바쁨에 비해 실제로는 계산이 서 있는 편입니다.
          </p>
          <p>
            생활을 안정시키는 가장 확실한 방법은 <b>일정한 리듬</b>입니다. 잠자는 시간, 식사 시간, 일을
            처리하는 순서를 고정해두면 산만함이 눈에 띄게 줄어듭니다. 반대로 리듬이 흐트러지면 능력과
            무관하게 결과가 흔들립니다.
          </p>
        </div>
        <div className={`${styles.tbox} ${styles.t2}`}>
          <h4>행동 성향</h4>
          <p>
            생각보다 말이 먼저 나가는 편입니다. 다만 월주의 편관이 있어 한번 정한 기준은 쉽게 바뀌지
            않습니다. 초반에 흔들려도 방향만 맞으면 뒤로 갈수록 속도가 붙습니다.
          </p>
          <p>
            관계에서 문제가 되는 지점은 감정이 올라왔을 때의 즉답입니다. 옳은 말이라도 타이밍이 이르면
            상대에게는 통보로 들립니다. <b>한 박자 늦게 말하는 습관</b> 하나만으로도 이 사주가 겪는 갈등의
            상당 부분이 사라집니다.
          </p>
        </div>
        <div className={`${styles.tbox} ${styles.t3}`}>
          <h4>장점과 단점</h4>
          <p>
            장점은 결정의 속도와 사람을 모으는 힘입니다. 막힌 자리에서 대안을 먼저 꺼내는 재능이 있고, 그
            덕분에 어느 조직에서도 초반에 빠르게 자리를 잡습니다.
          </p>
          <p>
            약점은 관심이 빠르게 옮겨가 마무리에서 공백이 생긴다는 점입니다. 완벽한 확신이 설 때까지
            망설이다 타이밍을 놓치는 일도 반복됩니다. <b>시작한 일 중 절반만 끝내도</b> 이 사주는 충분히 큰
            성취를 이룹니다. 완벽한 확신보다 실행 기준을 먼저 세우는 쪽이 맞습니다.
          </p>
        </div>
      </Reveal>

      {/* 02 */}
      <Reveal className={styles.sec} id="sec-02">
        <SectionHead mark="二" title="02. 지금, 나의 운" />
        <p className={styles.lead}>
          <span className={styles.oracle}>
            지금은 관성(官星)이 들어오는 대운 한가운데, 책임과 자리가 함께 늘어나는 구간입니다.
          </span>
          <span className={styles.bridge}>
            {" "}
            다시 말해 부담이 커지는 만큼 인정도 따라온다는 뜻입니다. 지금 맡은 자리에서 쌓은 신뢰가 다음
            10년의 기반이 됩니다.
          </span>
          <span className={styles.bridge}>
            {" "}
            여기에 2026년 병오 세운이 원국의 화 기운과 겹쳐, 대운의 큰 흐름 위에 올해만의 기회가 하나 더
            얹힌 형태입니다.
          </span>
        </p>
        <div className={styles.tbox}>
          <h4>이 구간을 어떻게 쓸 것인가</h4>
          <p>
            임신(壬申) 대운은 편관과 편재가 함께 작동하는 구간입니다. 책임이 늘고 돈이 도는 자리가 동시에
            열리기 때문에, 잘 쓰면 기반을 만드는 10년이 되고 잘못 쓰면 일만 많고 남는 것이 없는 10년이
            됩니다. 두 결과를 가르는 것은 <b>기록</b>입니다. 맡은 일의 조건과 약속을 문장으로 남겨두십시오.
          </p>
          <p>
            이 구간에 쌓은 신뢰는 다음 대운에서 그대로 자산이 됩니다. 반대로 지금 흐리게 넘긴 약속은 대운이
            바뀔 무렵 한꺼번에 청구서로 돌아옵니다. 지금의 자리를 가볍게 여기지 않는 것이 이 10년의
            전부입니다.
          </p>
        </div>
        <div className={styles.cardbox}>
          <div className={styles.prog_t1}>현재 대운 · 임신(壬申) 대운</div>
          <div className={styles.prog_t2}>2024 – 2033 · 대운 진행률 {m.daewoonProgress}%</div>
          <div className={styles.prog}>
            <i style={{ width: `${m.daewoonProgress}%` }} />
          </div>
          <div className={styles.stats}>
            <div>
              <div className={styles.sl}>2026년 세운(歲運)</div>
              <div className={styles.sv}>병오(丙午)</div>
            </div>
            <div>
              <div className={styles.sl}>세운 십성</div>
              <div className={styles.sv}>비견(比肩)</div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* 03 */}
      <Reveal className={styles.sec} id="sec-03">
        <SectionHead mark="三" title="03. 2026년 운세" />
        <p className={styles.lead}>
          <span className={styles.oracle}>
            2026년 하반기, 특히 7~9월에 운의 물살이 가장 세게 밀려옵니다.
          </span>
          <span className={styles.bridge}> 즉, 올해 후반의 결정이 내년의 방향을 크게 바꿔놓을 가능성이 큽니다.</span>
          <span className={styles.bridge}>
            {" "}
            반면 1월과 4월은 기운이 잠시 가라앉는 시기이니, 새 일을 벌이기보다 준비하고 다지는 데 쓰는 편이
            유리합니다.
          </span>
        </p>
        <div className={`${styles.tbox} ${styles.t2}`}>
          <h4>2026년 전체 흐름</h4>
          <p>
            병오(丙午)년은 일간과 같은 기운이 겹치는 해입니다. 자기 색이 강하게 드러나 좋게 쓰면 존재감이
            되고, 잘못 쓰면 충돌이 됩니다. 크게 보면 1~4월은 정리, 5~8월은 확장, 9~12월은 결실의 세 구간으로
            나뉩니다.
          </p>
          <p>
            올해의 성패를 가르는 것은 7월의 제안입니다. 겉으로는 평범해 보이지만 조건을 따져보면 규모가
            다릅니다. <b>이 달의 결정 하나가 2027년 전체의 방향을 정합니다.</b>
          </p>
        </div>
        <div className={styles.cardbox}>
          <div className={styles.cardbox_tit}>월별 운세 지수</div>
          <div className={styles.chart}>
            <LineChart values={m.monthly} labels={MONTH_LABELS} />
          </div>
          <div className={styles.stats}>
            <div>
              <div className={styles.sl}>최고의 달</div>
              <div className={styles.sv}>
                {MONTH_LABELS[bestIndex]} · {m.monthly[bestIndex]}점
              </div>
            </div>
            <div className={styles.warn}>
              <div className={styles.sl}>주의할 달</div>
              <div className={styles.sv}>
                {MONTH_LABELS[worstIndex]} · {m.monthly[worstIndex]}점
              </div>
            </div>
          </div>
          <div className={styles.month}>
            {MONTHLY_NOTES.map((n) => (
              <div key={n.month}>
                <b>{n.month}</b>
                <p>{n.text}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* 04 */}
      <Reveal className={styles.sec} id="sec-04">
        <SectionHead mark="四" title="04. 앞으로의 5년" />
        <p className={styles.lead}>
          <span className={styles.oracle}>
            앞으로 5년, 오르내림 속에서도 결국 우상향하는 곡선을 그리게 됩니다.
          </span>
          <span className={styles.bridge}>
            {" "}
            쉽게 말해 2028년의 정체기만 잘 넘기면 2030년에는 지금과 전혀 다른 위치에 서 있을 것입니다.
          </span>
          <span className={styles.bridge}>
            {" "}
            2028년의 정체는 후퇴가 아니라 다음 도약을 위한 숨 고르기에 가깝습니다. 이 시기에 내실을 다지면
            2029~2030년의 상승폭이 훨씬 커집니다.
          </span>
        </p>
        <div className={`${styles.tbox} ${styles.t3}`}>
          <h4>5년을 관통하는 원칙</h4>
          <p>
            이 5년은 ‘벌이는 해’와 ‘지키는 해’가 번갈아 옵니다. 2026·2029년은 새로 벌여도 좋은 해이고,
            2027·2028년은 이미 벌인 것을 다듬어야 하는 해입니다. 이 리듬을 거스르면 같은 노력으로도 결과가
            절반이 됩니다.
          </p>
          <p>
            2030년에 도달하는 위치는 결국 <b>2028년을 어떻게 견뎠는가</b>로 결정됩니다. 성과가 보이지 않는
            해일수록 기록과 관리에 힘을 쓰십시오. 이 해에 정리해둔 것이 다음 두 해의 속도를 만듭니다.
          </p>
        </div>
        <div className={styles.cardbox}>
          <div className={styles.cardbox_tit}>5개년 운세 흐름</div>
          <div className={styles.chart}>
            <LineChart values={m.trend} labels={m.trendYears} />
          </div>
          <div className={styles.chips} style={{ marginTop: "0.55lh" }}>
            <span>2026 전환기</span>
            <span>2027 상승기</span>
            <span>2028 정체기</span>
            <span>2029 도약기</span>
            <span>2030 결실기</span>
          </div>
        </div>
        <div className={styles.cardbox}>
          {YEAR_NOTES.map((y) => (
            <div key={y.year} className={styles.yr}>
              <div className={styles.yr_sc}>
                <div className={styles.y}>{y.year}</div>
                <div className={styles.n} style={{ color: y.color }}>
                  {y.score}
                </div>
                <div className={styles.t}>{y.tag}</div>
              </div>
              <div className={styles.yr_tx}>
                <h4>{y.title}</h4>
                <p>{y.text}</p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      {/* 05 */}
      <Reveal className={styles.sec} id="sec-05">
        <SectionHead mark="五" title="05. 돈이 들어오는 때" />
        <p className={styles.lead}>
          <span className={styles.oracle}>재물의 문은 40대에 가장 크게 열립니다.</span>
          <span className={styles.bridge}>
            {" "}
            즉, 지금의 절약보다 이 시기를 준비하는 투자와 공부가 더 큰 의미를 가진다는 뜻입니다.
          </span>
          <span className={styles.bridge}>
            {" "}
            정재와 편재가 함께 자리해 꾸준한 수입과 기회성 수입을 모두 가질 수 있는 구조입니다. 다만 편재
            특유의 씀씀이가 커지는 시기가 있어 지출 관리가 관건입니다.
          </span>
        </p>
        <div className={styles.cardbox}>
          <div className={styles.cardbox_tit}>연령대별 재물운</div>
          <HBarChart data={m.money} max={100} />
          <div className={styles.stats}>
            <div>
              <div className={styles.sl}>투자·확장 적기</div>
              <div className={styles.sv}>40대 초반 ~ 중반</div>
            </div>
            <div className={styles.warn}>
              <div className={styles.sl}>지출 주의 시기</div>
              <div className={styles.sv}>35세, 47세 전후</div>
            </div>
          </div>
        </div>
        <div className={`${styles.tbox} ${styles.t4}`}>
          <h4>손재를 경계할 때</h4>
          <p>
            재성이 지지에 뿌리를 두고 있어 일한 만큼 돌아오는 구조입니다. 큰 한 번을 노리기보다 여러 갈래의
            수입을 만드는 방식이 이 사주에 맞습니다. 한 곳에서 크게 벌겠다는 계획은 대체로 어긋나고, 작게
            여러 번 도는 구조는 오래갑니다.
          </p>
          <p>
            조심할 시기는 <b>2028년 봄과 가을</b>입니다. 이때는 보증·공동투자·지인 대여를 피하십시오. 이
            사주에서 큰 손실은 한 번의 실패가 아니라 누적에서 나오며, 돈이 나가는 일은 거의 예외 없이 사람을
            통해 옵니다.
          </p>
          <p>
            반대로 돈이 붙는 방식은 분명합니다. 이미 신뢰가 쌓인 사람에게서 반복해서 들어오는 구조, 즉{" "}
            <b>재구매와 소개</b>입니다. 새 고객을 늘리는 데 쓰는 힘의 절반만 기존 관계에 쓰면 수익의 안정도가
            크게 달라집니다.
          </p>
        </div>
      </Reveal>

      {/* 06 */}
      <Reveal className={styles.sec} id="sec-06">
        <SectionHead mark="六" title="06. 일과 성공의 운" />
        <p className={styles.lead}>
          <span className={styles.oracle}>
            식신(食神)과 편관(偏官)이 고르게 자리해, 만드는 일과 관리하는 일 모두에 소질이 있습니다.
          </span>
          <span className={styles.bridge}>
            {" "}
            다시 말해 혼자 만드는 힘과 조직을 이끄는 힘을 함께 가진 드문 사주입니다.
          </span>
          <span className={styles.bridge}>
            {" "}
            다만 완전한 프리랜서보다는 작은 조직을 직접 꾸리거나 이끄는 자리에서 더 크게 성공합니다.
          </span>
        </p>
        <div className={styles.cardbox}>
          <div className={styles.cardbox_tit}>직업 적성 지수</div>
          <HBarChart data={m.aptitude} max={100} stacked />
          <div className={styles.chips} style={{ marginTop: "0.4lh" }}>
            <span>브랜드 기획</span>
            <span>영업·제휴</span>
            <span>교육·강의</span>
            <span>소규모 창업</span>
          </div>
        </div>
        <div className={styles.tbox}>
          <h4>나와 맞는 일</h4>
          <p>
            사람을 모으고 방향을 제시하는 일이 맞습니다. 기획, 영업, 교육, 브랜딩처럼 말과 판단을 함께 쓰는
            방식이 잘 맞습니다. 특히 결과가 눈에 보이고, 그 결과에 내 이름이 남는 구조에서 능력이 가장 크게
            발휘됩니다.
          </p>
        </div>
        <div className={`${styles.tbox} ${styles.t2}`}>
          <h4>나와 맞지 않는 일</h4>
          <p>
            판단 여지가 없는 반복 업무, 권한은 없는데 책임만 무거운 자리는 소모가 큽니다. 숨 돌릴 틈이 없는
            구조에서는 성과보다 피로가 먼저 쌓이고, 결국 실력과 무관하게 오래 버티지 못합니다.
          </p>
        </div>
        <div className={`${styles.tbox} ${styles.t3}`}>
          <h4>사업을 한다면</h4>
          <p>
            완전한 독립보다 <b>기반을 두고 뻗어나가는 방식</b>이 맞습니다. 단발성 판매보다 재방문과 소개가
            이어지는 관계형 구조가 유리하며, 사람을 많이 모으는 장사보다 적은 수라도 깊게 붙드는 형태가
            오래갑니다. 말로만 설득하는 사업은 피하십시오. 실제 만족도와 후기가 쌓이지 않으면 금세
            흔들립니다.
          </p>
        </div>
      </Reveal>

      {/* 07 */}
      <Reveal className={styles.sec} id="sec-07">
        <SectionHead mark="七" title="07. 인생이 바뀌는 때" />
        <p className={styles.lead}>
          <span className={styles.oracle}>
            32세, 36세, 42세, 49세, 그리고 56세 — 이 다섯 번의 갈림길이 인생의 방향을 크게 틀어놓습니다.
          </span>
          <span className={styles.bridge}> 즉, 이 시기마다 내리는 선택을 특히 신중하게 대해야 한다는 뜻입니다.</span>
          <span className={styles.bridge}>
            {" "}
            그중에서도 36세와 49세는 대운이 바뀌는 시점과 맞물려 있어 체감하는 변화의 폭이 가장 큽니다.
          </span>
        </p>
        <div className={styles.cardbox}>
          <div className={styles.cardbox_tit}>인생 전환점</div>
          <div className={styles.chart}>
            <TimelineChart items={m.turning} />
          </div>
        </div>
        <div className={`${styles.tbox} ${styles.t4}`}>
          <p>
            전환점은 늘 <b>예상하지 못한 제안</b>의 형태로 옵니다. 큰 결단의 순간처럼 극적으로 오지 않고,
            대개는 평범한 자리에서 건네받는 한마디로 시작됩니다. 준비가 되어 있지 않으면 기회인지도 모르고
            지나갑니다.
          </p>
          <p>
            대비하는 방법은 단순합니다. 매년 겨울, 다음 해에 하고 싶은 일과 하지 않을 일을 문장으로
            적어두십시오. 기준이 적혀 있으면 제안이 왔을 때 판단이 빨라지고, 기준이 없으면 좋아 보이는
            것부터 잡게 됩니다. 36세와 49세는 대운이 바뀌는 시점과 겹쳐 변화의 폭이 가장 크니, 그 전 해
            겨울에는 특히 시간을 들여 정리하시길 권합니다.
          </p>
        </div>
      </Reveal>

      {/* 08 */}
      <Reveal className={styles.sec} id="sec-08">
        <SectionHead mark="八" title="08. 인연과 사람복" />
        <p className={styles.lead}>
          <span className={styles.oracle}>
            사람으로 인해 울고 웃는 일이 유독 많은 사주지만, 결국 남는 인연이 큰 힘이 되어줍니다.
          </span>
          <span className={styles.bridge}>
            {" "}
            쉽게 말해 관계를 넓히기보다 좁고 깊게 만드는 편이 더 유리하다는 뜻입니다.
          </span>
          <span className={styles.bridge}>
            {" "}
            도화의 기운이 있어 사람이 자연스럽게 모이는 편이지만, 얕은 인연에 마음을 다 쓰지 않도록 거리를
            조율하는 지혜가 필요합니다.
          </span>
        </p>
        <div className={styles.cardbox}>
          <div className={styles.gaugeRow}>
            <GaugeChart value={m.relationScore} size={96} />
            <div className={styles.gi}>
              <div className={styles.t1}>인연운 지수</div>
              <div className={styles.t2}>깊고 오래가는 인연 중심의 흐름</div>
            </div>
          </div>
          <div className={styles.chips_lb}>잘 맞는 기운</div>
          <div className={styles.chips}>
            <span>목(木) 기운의 상대</span>
            <span>토(土) 기운의 상대</span>
            <span>범띠</span>
            <span>개띠</span>
          </div>
          <div className={styles.chips_lb}>한 박자 조심할 상대</div>
          <div className={`${styles.chips} ${styles.muted}`}>
            <span>편재를 다투는 상대</span>
            <span>원숭이띠</span>
          </div>
        </div>
        <div className={styles.tbox}>
          <p>
            인연은 일을 통해 옵니다. 소개나 우연보다 함께 무언가를 만드는 자리에서 깊은 관계가 시작됩니다.
            짧은 만남에서 승부를 보려 하면 오래가지 않고, 시간을 두고 같은 일을 겪은 사람과의 관계가 결국
            남습니다.
          </p>
          <p>
            귀인은 나보다 조용하고 신중한 사람입니다. 말수가 적고 약속을 지키며, 감정을 몰아붙이지 않는
            사람이 이 사주를 오래 지켜줍니다. 반대로 처음부터 크게 약속하고 빠르게 가까워지려는 사람은
            멀리하십시오. 이 사주가 겪은 손해의 대부분은 그런 관계에서 나왔습니다.
          </p>
          <p>
            배우자운은 <b>2027년과 2030년</b>에 두텁게 들어옵니다. 가족 관계에서는 애정이 없어서가 아니라
            표현 방식이 달라 서운함이 쌓이기 쉬우니, 감정을 묵히지 말고 짧게라도 그때그때 풀어내는 편이
            낫습니다.
          </p>
        </div>
      </Reveal>

      {/* 09 */}
      <Reveal className={styles.sec} id="sec-09">
        <SectionHead mark="九" title="09. 몸과 마음의 흐름" />
        <p className={styles.lead}>
          <span className={styles.oracle}>
            정신적인 힘은 강하지만 몸이 그 속도를 따라가지 못할 때가 많습니다.
          </span>
          <span className={styles.bridge}>
            {" "}
            즉, 마음이 먼저 지치기 전에 몸을 먼저 쉬게 하는 습관이 필요하다는 뜻입니다.
          </span>
          <span className={styles.bridge}>
            {" "}
            특히 수면의 질이 전체 컨디션을 좌우하는 열쇠이니, 잠자리에 드는 시간을 일정하게 지키는 것만으로도
            체력과 스트레스 지수가 함께 개선됩니다.
          </span>
        </p>
        <div className={styles.cardbox}>
          <div className={styles.cardbox_tit}>심신 밸런스</div>
          <div className={styles.chart}>
            <RadarChart axes={m.wellbeing} />
          </div>
        </div>
        <div className={`${styles.tbox} ${styles.t2}`}>
          <p>
            화가 강하고 수가 약해 열이 위로 오르는 체질입니다. 수면 부족과 과로가 곧바로 몸에 나타나며,
            피로가 쌓이면 판단보다 감정이 먼저 반응합니다. 심혈관과 눈, 그리고 위장을 특히 살피십시오.
          </p>
          <p>
            이 사주에서 컨디션을 좌우하는 가장 큰 변수는 <b>수면의 질</b>입니다. 잠자리에 드는 시간을
            일정하게 지키는 것만으로 체력과 스트레스 지수가 함께 올라갑니다. 반대로 밤 시간에 일을 몰아
            처리하는 습관은 며칠 만에 전체 리듬을 무너뜨립니다.
          </p>
          <p>
            <b>40대 초반과 50대 중반</b>에 한 번씩 크게 쉬어가야 할 시기가 옵니다. 미리 쉬면 크게 앓지 않고,
            버티면 반드시 한 번은 멈추게 됩니다. 이 사주에게 휴식은 게으름이 아니라 관리입니다.
          </p>
        </div>
      </Reveal>

      {/* 10 */}
      <Reveal className={styles.sec} id="sec-10">
        <SectionHead mark="十" title="10. 명월재의 마지막 당부" />
        <p className={styles.lead}>
          <span className={styles.oracle}>사주는 정해진 길이 아니라, 바람이 부는 방향입니다.</span>
          <span className={styles.bridge}>
            {" "}
            그 방향을 알고 걷는 사람과 모르고 걷는 사람의 걸음은 다릅니다. 같은 바람 속에서도 어디로 가려는지
            아는 사람은 돌아가지 않습니다.
          </span>
        </p>
        <div className={`${styles.tbox} ${styles.t4}`}>
          <p>
            지금까지의 풀이를 한 문장으로 줄이면 이렇습니다. <b>사람은 열어두되, 결정은 늦게 하십시오.</b> 이
            사주가 가진 재능과 운의 크기는 이미 충분합니다. 남은 것은 그 재능을 어디까지 붙들고 있느냐입니다.
          </p>
          <p>
            전부 기억하지 않으셔도 좋습니다. 가장 마음에 남은 경고 하나와 실천 포인트 하나만 현실에 옮기셔도,
            이 해설서는 충분히 값어치를 합니다.
          </p>
        </div>
        <div className={styles.keeps}>
          <div className={styles.hold}>
            <h4>붙잡아야 할 세 가지</h4>
            <ol>
              <li>끝까지 남는 습관</li>
              <li>조용하고 신중한 귀인</li>
              <li>매년 겨울의 기록</li>
            </ol>
          </div>
          <div className={styles.ward}>
            <h4>경계해야 할 세 가지</h4>
            <ol>
              <li>급하게 정한 동업</li>
              <li>사람을 통해 나가는 돈</li>
              <li>쉬지 않는 자신</li>
            </ol>
          </div>
        </div>
      </Reveal>

      <Reveal className={styles.outro}>
        <span className={styles.spark}>✦</span>
        <p>
          명월재가 비춘 이 달빛이,
          <br />
          당신의 다음 걸음에 작은 등불이 되기를 바랍니다.
        </p>
        <div className={styles.sign}>명 월 재</div>
      </Reveal>

      <ReportActions />
      <ReviewForm />
      <TocNav entries={TOC_ENTRIES} />
    </section>
  );
}
