/*
 * How a visitor reaches us. One place, because it is the single most damaging
 * thing on the site to get wrong or to let drift: every other defect costs
 * polish, this one costs a lead.
 *
 * WhatsApp replaced "book a call" on 2026-09-02. Fish: there is no call
 * booking functionality. book.testtubemarketing.com still resolves and still
 * has a "Book Your Free Marketing Growth Call" title, but serves an empty
 * body, so every CTA pointing at it was sending people to a dead end.
 *
 * ┌───────────────────────────────────────────────────────────────────────┐
 * │ UNVERIFIED: the number below is the TTM WhatsApp number on file, which │
 * │ is the Whapi-bridged bot/agent line used for posting into groups. It   │
 * │ is NOT confirmed as the right destination for inbound enquiries from   │
 * │ the public site. Fish has been asked. Until he confirms, treat this as │
 * │ a placeholder that happens to be plausible, not a checked fact.        │
 * └───────────────────────────────────────────────────────────────────────┘
 */

/* International format, digits only: no +, no spaces. wa.me rejects anything else. */
const WHATSAPP_NUMBER = "447457411093";

export const CONTACT_LABEL = "Send us a WhatsApp";

/*
 * The prefill tells us which page someone came from before they have typed a
 * word, which on a site whose whole idea is routing by intent is worth having.
 * It is only ever a suggestion: WhatsApp lets the sender edit or delete it
 * before sending, so it must never carry anything we would mind them seeing.
 */
export function whatsappHref(context?: string) {
  const text = context
    ? `Hi Ad and Fish, I've just been reading your site (${context}).`
    : "Hi Ad and Fish, I've just been reading your site.";
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
