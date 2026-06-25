import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import LandingClient from "./LandingClient";

export default async function LandingPage() {
  const session = await auth();

  if (session?.user) {
    redirect("/dashboard");
  }

  return <LandingClient />;
}
