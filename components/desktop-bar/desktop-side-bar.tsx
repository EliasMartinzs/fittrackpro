import { IconesSideBar } from "../global/icones-side-bar";
import { TrocarTema } from "../global/trocar-tema";
import { SairButton } from "../global/sair-button";
import { LogOut } from "lucide-react";

export const DesktopSideBar = () => {
  return (
    <aside className="h-full flex items-center justify-between flex-col relative py-4">
      <div className="flex-1 flex flex-col items-center justify-center gap-y-7">
        <IconesSideBar />
        <TrocarTema />
      </div>

      <div>
        <SairButton label={<LogOut />} />
      </div>
    </aside>
  );
};
