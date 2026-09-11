import type { ColoredValue, LabeledValue, RadarAxis, TurningPoint } from "@/types/saju";
import styles from "./paid.module.css";

/** 기존 result_paid.html 이 브라우저에서 innerHTML 로 그리던 SVG 차트들을
 *  서버 컴포넌트로 옮긴 것. 인터랙션이 없어 클라이언트 JS 를 전혀 보내지 않는다. */

const GOLD = "#c0944d";
const GOLD_D = "#aa7529";
const GOLD_S = "#dec183";
const NAVY = "#0D253B";
const SOFT = "#8c8375";
const TRACK = "#efe6d5";

export function DonutChart({ segments }: { segments: ColoredValue[] }) {
  const size = 150;
  const stroke = 17;
  const r = (size - stroke) / 2;
  const c = size / 2;
  const C = 2 * Math.PI * r;
  const total = segments.reduce((s, d) => s + d.value, 0) || 1;

  let offset = 0;
  const arcs = segments.map((s) => {
    const dash = (s.value / total) * C;
    const rot = (offset / total) * 360 - 90;
    offset += s.value;
    return { key: s.label, color: s.color, dash, rot };
  });

  return (
    <>
      <svg viewBox={`0 0 ${size} ${size}`}>
        <circle cx={c} cy={c} r={r} fill="none" stroke={TRACK} strokeWidth={stroke} />
        {arcs.map((a) => (
          <circle
            key={a.key}
            cx={c}
            cy={c}
            r={r}
            fill="none"
            stroke={a.color}
            strokeWidth={stroke}
            strokeDasharray={`${a.dash} ${C - a.dash}`}
            transform={`rotate(${a.rot} ${c} ${c})`}
          />
        ))}
      </svg>
      <div className={styles.legend}>
        {segments.map((s) => (
          <div key={s.label} className={styles.it}>
            <span className={styles.dot} style={{ background: s.color }} />
            {s.label} · {s.value}%
          </div>
        ))}
      </div>
    </>
  );
}

export function GaugeChart({ value, size = 128 }: { value: number; size?: number }) {
  const stroke = size * 0.1;
  const r = (size - stroke) / 2;
  const c = size / 2;
  const C = 2 * Math.PI * r;
  const dash = (value / 100) * C;
  const id = `gauge-${value}-${size}`;

  return (
    <svg viewBox={`0 0 ${size} ${size}`}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={GOLD_S} />
          <stop offset="100%" stopColor={GOLD_D} />
        </linearGradient>
      </defs>
      <circle cx={c} cy={c} r={r} fill="none" stroke={TRACK} strokeWidth={stroke} />
      <circle
        cx={c}
        cy={c}
        r={r}
        fill="none"
        stroke={`url(#${id})`}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={`${dash} ${C}`}
        transform={`rotate(-90 ${c} ${c})`}
      />
      <text
        x={c}
        y={c - 2}
        textAnchor="middle"
        fontFamily="MaruBuri, serif"
        fontWeight="700"
        fontSize={size * 0.26}
        fill={NAVY}
      >
        {value}
      </text>
      <text
        x={c}
        y={c + size * 0.16}
        textAnchor="middle"
        fontFamily="Pretendard Variable, sans-serif"
        fontSize={size * 0.09}
        fill={SOFT}
      >
        / 100
      </text>
    </svg>
  );
}

export function HBarChart({
  data,
  max,
  stacked = false,
}: {
  data: LabeledValue[];
  max: number;
  stacked?: boolean;
}) {
  return (
    <>
      {data.map((d) => {
        const pct = Math.round((d.value / max) * 100);
        if (stacked) {
          return (
            <div key={d.label} className={`${styles.hbar} ${styles.stack}`}>
              <span className={styles.hl}>{d.label}</span>
              <span className={styles.line}>
                <span className={styles.ht}>
                  <span className={styles.hf} style={{ width: `${pct}%` }} />
                </span>
                <span className={styles.hv}>{d.value}</span>
              </span>
            </div>
          );
        }
        return (
          <div key={d.label} className={styles.hbar}>
            <span className={styles.hl}>{d.label}</span>
            <span className={styles.ht}>
              <span className={styles.hf} style={{ width: `${pct}%` }} />
            </span>
            <span className={styles.hv}>{d.value}</span>
          </div>
        );
      })}
    </>
  );
}

export function LineChart({ values, labels }: { values: number[]; labels: string[] }) {
  const w = 640;
  const h = 190;
  const pad = 30;
  const stepX = (w - pad * 2) / (values.length - 1);
  const pts = values.map((v, i) => [pad + i * stepX, h - pad - (v / 100) * (h - pad * 2)]);
  const path = pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ");
  const area = `${path} L ${pts[pts.length - 1][0].toFixed(1)} ${h - pad} L ${pts[0][0].toFixed(1)} ${h - pad} Z`;
  const id = `line-${labels.join("")}`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={GOLD} stopOpacity="0.28" />
          <stop offset="100%" stopColor={GOLD} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${id})`} />
      <path
        d={path}
        fill="none"
        stroke={GOLD_D}
        strokeWidth="2.4"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {pts.map((p, i) => (
        <circle
          key={i}
          cx={p[0].toFixed(1)}
          cy={p[1].toFixed(1)}
          r="3.6"
          fill="#fffdf8"
          stroke={GOLD_D}
          strokeWidth="2"
        />
      ))}
      {labels.map((lb, i) => (
        <text
          key={lb}
          x={pts[i][0].toFixed(1)}
          y={h - 8}
          textAnchor="middle"
          fontSize="11"
          fill={SOFT}
          fontFamily="Pretendard Variable"
        >
          {lb}
        </text>
      ))}
    </svg>
  );
}

export function TimelineChart({ items }: { items: TurningPoint[] }) {
  const w = 640;
  const h = 150;
  const pad = 46;
  const mid = h / 2 + 4;
  const min = items[0].age - 4;
  const max = items[items.length - 1].age + 4;
  const sx = (a: number) => pad + ((a - min) / (max - min)) * (w - pad * 2);

  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="xMidYMid meet">
      <line x1={pad} y1={mid} x2={w - pad} y2={mid} stroke="#e7ddc3" strokeWidth="2" />
      {items.map((d, i) => {
        const x = sx(d.age);
        const up = i % 2 === 0;
        const y2 = up ? mid - 12 : mid + 12;
        const ageY = up ? mid - 20 : mid + 30;
        const txtY = up ? mid - 40 : mid + 50;
        return (
          <g key={d.age}>
            <line x1={x} y1={mid} x2={x} y2={y2} stroke={GOLD} strokeWidth="1.5" />
            <circle cx={x} cy={mid} r="5" fill={GOLD_D} />
            <text
              x={x}
              y={ageY}
              textAnchor="middle"
              fontFamily="MaruBuri, serif"
              fontWeight="700"
              fontSize="13"
              fill={NAVY}
            >
              {d.age}세
            </text>
            <text x={x} y={txtY} textAnchor="middle" fontSize="10.5" fill={SOFT} fontFamily="Pretendard Variable">
              {d.text}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function RadarChart({ axes }: { axes: RadarAxis[] }) {
  const size = 340;
  const c = size / 2;
  const r = size / 2 - 76;
  const n = axes.length;
  const ang = (i: number) => ((Math.PI * 2) / n) * i - Math.PI / 2;
  const pt = (i: number, f: number) =>
    [(c + Math.cos(ang(i)) * r * f).toFixed(1), (c + Math.sin(ang(i)) * r * f).toFixed(1)] as const;

  return (
    <svg viewBox={`0 0 ${size} ${size}`} preserveAspectRatio="xMidYMid meet">
      {[0.25, 0.5, 0.75, 1].map((f) => (
        <polygon
          key={f}
          points={axes.map((_, i) => pt(i, f).join(",")).join(" ")}
          fill="none"
          stroke="#e7ddc3"
        />
      ))}
      {axes.map((a, i) => {
        const p = pt(i, 1);
        return <line key={a.axis} x1={c} y1={c} x2={p[0]} y2={p[1]} stroke="#e7ddc3" />;
      })}
      <polygon
        points={axes.map((a, i) => pt(i, a.value / 100).join(",")).join(" ")}
        fill={GOLD}
        fillOpacity="0.28"
        stroke={GOLD_D}
        strokeWidth="2"
      />
      {axes.map((a, i) => {
        const p = pt(i, 1.2);
        return (
          <text
            key={a.axis}
            x={p[0]}
            y={p[1]}
            textAnchor="middle"
            fontSize="12"
            fill={SOFT}
            fontFamily="Pretendard Variable"
          >
            {a.axis}
          </text>
        );
      })}
    </svg>
  );
}
