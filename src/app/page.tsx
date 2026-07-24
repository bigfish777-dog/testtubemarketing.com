import { redirect } from "next/navigation";

// This isolated project serves only the AI Strategy Session page.
// Root sends visitors straight to it.
export default function Home() {
  redirect("/ai-audit");
}
