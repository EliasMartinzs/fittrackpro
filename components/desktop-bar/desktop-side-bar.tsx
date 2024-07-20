import { SignOutButton } from "@clerk/nextjs";
import { IoIosLogOut } from "react-icons/io";
import { IconesSideBar } from "../global/icones-side-bar";
import { TrocarTema } from "../global/trocar-tema";

export const DesktopSideBar = () => {
  return (
    <aside className="h-full flex items-center justify-between flex-col relative py-4">
      <div className="flex-1 flex flex-col items-center justify-center gap-y-7">
        <IconesSideBar />
        <TrocarTema />
      </div>

      <SignOutButton>
        <IoIosLogOut className="size-6" />
      </SignOutButton>
    </aside>
  );
};
