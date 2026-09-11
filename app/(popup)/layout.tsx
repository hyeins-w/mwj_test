import { PopupCloseButton } from "@/components/popup/PopupCloseButton";
import "./popup-shell.css";

/** window.open 으로 열리는 정책 문서 영역. 헤더/드로어/푸터 없이 독립적으로 동작한다.
 *  `.popup_root` 는 body 스타일 스코프(`body:has(> .popup_root)`)의 기준점이므로
 *  반드시 body 의 직계 자식으로 유지해야 한다. */
export default function PopupLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="popup_root">
      {children}
      <div className="btm_wrap">
        <PopupCloseButton />
      </div>
      <p className="pop_foot">(주)위드어스 · 명월재(命月齋)</p>
    </div>
  );
}
