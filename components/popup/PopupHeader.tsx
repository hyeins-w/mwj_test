import Image from "next/image";

type Props = {
  /** 제목 위 영문 라벨 (예: Privacy Policy) */
  eyebrow: string;
  title: string;
  description: string;
};

export function PopupHeader({ eyebrow, title, description }: Props) {
  return (
    <header className="pop_head">
      <Image className="logo" src="/img/main/logo.webp" alt="명월재" width={275} height={83} priority />
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p className="desc">{description}</p>
    </header>
  );
}
