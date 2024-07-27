import { AlimentosType, DietaType, RefeicoesType } from "@/db/schema";
import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

type Response = {
  error: string;
  data: {
    id: string;
    nome: string;
    descricao: string | null;
    pesoDieta: number | null;
    pesoAtual: number | null;
    consumoAgua: number | null;
    refeicoes: {
      id: string;
      nome: string;
      horario: string;
      alimentos: {
        id: string;
        nome: string;
        quantidade: number;
        calorias: number | null;
      }[];
    }[];
  }[];
};

export const pegarDietas = () => {
  const query = useQuery<Response>({
    queryKey: ["dietas"],
    queryFn: async () => {
      const response = await client.api.dietas.$get();

      const data = await response.json();

      return data as Response;
    },
  });

  return query;
};
