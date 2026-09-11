import { Fragment } from "react";
import { companyInfoRows } from "@/lib/companyInfo";
import { POLICY_LINKS } from "@/lib/navigation";
import { FootLinkPopup } from "./FootLinkPopup";

export function Footer() {
  return (
    <footer>
      <div className="footTxt">
        <div className="footL">
          {companyInfoRows.map(([label]) => (
            <p key={label}>{label}</p>
          ))}
        </div>
        <div className="footR">
          {companyInfoRows.map(([label, value]) => (
            <p key={label}>{value}</p>
          ))}
        </div>
      </div>
      <div className="foot_movPage">
        {POLICY_LINKS.map((link, i) => (
          <Fragment key={link.href}>
            {i > 0 && " | "}
            <FootLinkPopup href={link.href} label={link.label} className="foot_link" />
          </Fragment>
        ))}
      </div>
    </footer>
  );
}
