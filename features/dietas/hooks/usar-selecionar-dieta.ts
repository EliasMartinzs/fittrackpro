import { create } from "zustand";

type Props = {
  dietaId: string | undefined;
  setDietaId: (dietaId: string) => void;
};

export const usarSelecionarDieta = create<Props>((set) => ({
  dietaId: undefined,
  setDietaId: (dietaId: string) => set({ dietaId }),
}));
