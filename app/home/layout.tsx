import { DesktopSideBar } from "@/components/desktop-bar/desktop-side-bar";
import { DesktopTopBar } from "@/components/desktop-bar/desktop-top-bar";
import { MobileTopBar } from "@/components/mobile-top-bar/mobile-top-bar";

type Props = {
  children: React.ReactNode;
};

export default function LayoutHome({ children }: Props) {
  return (
    <div className="flex">
      {/* Mobile Layout (max-lg) */}
      <div className="lg:hidden w-full">
        <MobileTopBar />

        {/* Conteúdo principal para mobile */}
        <div className="mt-5">
          <div className="p-4">{children}</div>
        </div>
      </div>

      {/* Desktop Layout (lg e acima) */}
      <div className="hidden lg:flex h-screen w-screen">
        {/* Sidebar */}
        <div className="w-20 px-4">
          <DesktopSideBar />
        </div>

        {/* Conteúdo principal para desktop */}
        <div className="flex-1 p-4">
          {/* Top Bar para desktop */}
          <div className="h-20">
            <DesktopTopBar />
          </div>

          {/* Conteúdo principal para desktop */}
          <div className="mr-10">
            <div className="p-4">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
