import type { Metadata } from "next";
import PathStub from "../path-stub";

// STUB route. See src/app/path-stub.tsx.
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function Page() {
  return <PathStub title="/speaking" />;
}
