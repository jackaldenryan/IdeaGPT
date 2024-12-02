import { redirect } from "next/navigation";

export default function Home() {
  // Redirect to /sign-in
  redirect("/sign-in");
}
