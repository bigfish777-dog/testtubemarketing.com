import styles from "@/styles/path.module.css";
import { whatsappHref } from "@/content/contact";

/*
 * The footer, including the legal block, shared by every path page.
 *
 * Everything here is carried from the live testtubemarketing.com footer at
 * Fish's instruction, 2026-09-02, and is his existing wording rather than
 * anything drafted here. Legal text is the last place to improvise.
 *
 * WHAT THE LIVE SITE ACTUALLY HAS, having read it rather than assumed:
 * company name and registered number, registered address, contact email, a
 * Privacy Policy link, a copyright line, and three numbered disclaimers.
 *
 * WHAT IT DOES NOT HAVE: terms and conditions. There is no /terms page and no
 * terms link anywhere on the live site, so there was nothing to carry over.
 * Flagged to Fish. Not drafted here, because inventing contract terms for a
 * real company is not a gap to fill on someone's behalf.
 *
 * The earnings disclaimer is not boilerplate on these pages: /track-record
 * puts real revenue figures next to named clients, which is exactly the claim
 * it qualifies.
 */

const YEAR = new Date().getFullYear();

export function SiteFooter() {
  return (
    <footer className={styles.night}>
      <div className={styles.container}>
        <div className={styles.foot}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={styles.footLogo}
            src="/assets/ttm-secondary-wht.png"
            alt="Test Tube Marketing"
            width={1600}
            height={467}
          />
          <span>
            Test Tube Marketing Ltd &nbsp;&middot;&nbsp; Reg no. 15388084
          </span>
        </div>

        <div className={styles.legal}>
          <p className={styles.legalRow}>
            <span>
              Holly Grange &middot; Holly Lane &middot; Balsall Common &middot;
              CV7 7EB
            </span>
            <span className={styles.legalLinks}>
              <a href="mailto:hello@testtubemarketing.com">
                hello@testtubemarketing.com
              </a>
              <a href={whatsappHref("the footer")}>WhatsApp</a>
              <a href="/privacy">Privacy Policy</a>
            </span>
          </p>

          <ol className={styles.disclaimers}>
            <li>
              This site is not a part of the Facebook website or Facebook Inc.
            </li>
            <li>FACEBOOK is a trademark of FACEBOOK, Inc.</li>
            <li>
              Earnings figures are based on the experiences of our own company
              or our best customers and do not constitute a guarantee.
            </li>
          </ol>

          <p className={styles.copyright}>
            &copy; {YEAR} Test Tube Marketing Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
