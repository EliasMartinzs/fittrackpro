import { create } from "zustand";

type Props = {
  estaAberto: boolean;
  dietaId?: string;
  abrir: (dietaId?: string) => void;
  fechar: () => void;
};

export const usarNovoPesoAtual = create<Props>((set) => ({
  estaAberto: false,
  dietaId: undefined,
  abrir: (dietaId?: string) => set({ estaAberto: true, dietaId }),
  fechar: () => set({ estaAberto: false, dietaId: undefined }),
}));
