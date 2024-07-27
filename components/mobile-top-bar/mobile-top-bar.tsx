import { AbrirMobileSheet } from "./abrir-mobile-sheet";
import { IoNotificationsOutline } from "react-icons/io5";
import { TrocarTema } from "../global/trocar-tema";
import { currentUser } from "@clerk/nextjs/server";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const MobileTopBar = async () => {
  const user = await currentUser();

  return (
    <header className="w-full lg:hidden p-4">
      <nav className="w-full flex items-center justify-between">
        <AbrirMobileSheet />

        <div className="flex items-center gap-2">
          <div className="rounded-lg border size-10 grid place-items-center">
            <TrocarTema />
          </div>
          <div className="rounded-lg border size-10 grid place-items-center">
            <IoNotificationsOutline />
          </div>
          <div>
            <Avatar className="size-9">
              <AvatarImage src={user?.imageUrl} />
              <AvatarFallback>
                {user?.firstName?.charAt(0)}
                {user?.firstName?.charAt(1)}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </nav>
    </header>
  );
};
