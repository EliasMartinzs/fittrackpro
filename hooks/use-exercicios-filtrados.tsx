import { TreinosResponse } from "@/features/treinos/api/pegar-treinos";
import { obterDiaDaSemana } from "@/lib/utils";
import { useMemo } from "react";

type Props = {
  data: TreinosResponse | undefined;
  dia: string | null;
  hora: string | null;
};

export const useExerciciosFiltrados = ({ data, dia, hora }: Props) => {
  return useMemo(() => {
    if (!data || !data.data) return [];

    let exerciciosFiltrados = data.data;

    if (dia) {
      exerciciosFiltrados = exerciciosFiltrados.filter(
        (exercicio) => exercicio.diaDaSemana === dia
      );
    } else {
      const diaAtual = obterDiaDaSemana();
      exerciciosFiltrados = exerciciosFiltrados.filter(
        (exercicio) => exercicio.diaDaSemana === diaAtual
      );
    }

    if (hora) {
      exerciciosFiltrados = exerciciosFiltrados.filter(
        (exercicio) =>
          exercicio.horarioTreino?.toLowerCase() === hora.toLowerCase()
      );
    } else {
      exerciciosFiltrados = exerciciosFiltrados.filter(
        (exercicio) => exercicio.horarioTreino?.toLowerCase() === "manha"
      );
    }

    return exerciciosFiltrados;
  }, [data, dia, hora]);
};
