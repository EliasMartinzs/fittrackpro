import { AbrirMobileSheet } from "./abrir-mobile-sheet";
import { currentUser } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { IoNotificationsOutline } from "react-icons/io5";
import { TrocarTema } from "../global/trocar-tema";

export const MobileTopBar = async () => {
  const user = await currentUser();

  return (
    <header className="w-full lg:hidden p-4">
      <nav className="w-full flex items-center justify-between">
        <AbrirMobileSheet />

        <div className="flex items-center gap-2">
          <Button className="border rounded-lg">
            <TrocarTema />
          </Button>
          <Button className="border rounded-lg">
            <IoNotificationsOutline className="size-5" />
          </Button>
          <UserButton />
        </div>
      </nav>
    </header>
  );
};
