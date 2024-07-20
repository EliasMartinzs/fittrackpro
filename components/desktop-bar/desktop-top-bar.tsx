import { Search } from "./search";
import { UsuarioTopBar } from "./usuario-top-bar";

export const DesktopTopBar = () => {
  return (
    <header className="w-full h-full">
      <nav className="h-full w-full flex items-center justify-between">
        <Search />
        <UsuarioTopBar />
      </nav>
    </header>
  );
};
