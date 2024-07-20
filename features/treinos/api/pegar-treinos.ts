import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export interface TreinoDiario {
  id: string;
  usuarioId: string;
  diaDaSemana: string;
  nomeExercisio: string;
  categoria: string;
  tipoExercicio: any | null;
  horarioTreino: string | null;
  notas: string | null;
  series: string | null;
  repeticoes: string | null;
  intensidade: string | null;
  criadoEm: string | null;
}

export type TreinosResponse = {
  error?: string;
  data?: TreinoDiario[];
};

export const pegarTreinos = () => {
  const query = useQuery<TreinosResponse>({
    queryKey: ["treinos"],
    queryFn: async () => {
      const response = await client.api.treinos.$get();

      if (!response.ok) {
        throw new Error("Failed to fetch treinos");
      }

      const data = await response.json();

      return data as TreinosResponse;
    },
  });

  return query;
};
