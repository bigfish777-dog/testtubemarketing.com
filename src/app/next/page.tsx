import type { Metadata } from "next";
import Chooser from "./chooser";

/*
 * Temporary route. The chooser is built here so the old homepage stays
 * browsable side by side for comparison. It moves to "/" once Fish approves
 * the direction and his copy lands.
 */

export const metadata: Metadata = {
  title: "Test Tube Marketing",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <Chooser />;
}
