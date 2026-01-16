import { redirect } from "next/navigation";

export default function Home() {
  // Redirect to dashboard - in production, this would check auth status
  redirect("/dashboard");
}
