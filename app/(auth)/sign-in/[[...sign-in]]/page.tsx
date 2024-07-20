import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <main className="w-full h-svh grid place-items-center">
      <SignIn />
    </main>
  );
}
