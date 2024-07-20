import { UserButton } from "@clerk/nextjs";
import React from "react";

export const UsuarioTopBar = () => {
  return (
    <div className="mr-10 flex items-center gap-x-20">
      <UserButton />
    </div>
  );
};
