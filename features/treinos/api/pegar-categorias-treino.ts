import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export type CategoriaTreino = {
  categoria: string;
  count: number;
};

export type PegarCategoriasTreinoResponse =
  | { error: string }
  | { data: CategoriaTreino[] };

export const pegarCategoriasTreinos = () => {
  return useQuery<PegarCategoriasTreinoResponse, Error>({
    queryKey: ["treino"],
    queryFn: async () => {
      const response = await client.api.treinos["categorias"].$get();

      if (!response.ok) {
        throw new Error("Falha ao pegar treino");
      }

      const result: PegarCategoriasTreinoResponse = await response.json();
      return result;
    },
  });
};
