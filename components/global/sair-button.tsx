"use client";

import { useClerk } from "@clerk/nextjs";

type Props = {
  label: React.ReactNode;
};

export const SairButton = ({ label }: Props) => {
  const { signOut } = useClerk();

  return <button onClick={() => signOut({ redirectUrl: "/" })}>{label}</button>;
};
