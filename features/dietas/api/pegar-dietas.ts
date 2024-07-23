import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

type ResponseType = {
  error: string;
  data: {
    id: string;
    usuarioId: string;
    criadoEm: Date | null;
    tipo: string | null;
    nome: string;
    descricao: string | null;
  }[];
};

export const pegarDietas = () => {
  const query = useQuery<ResponseType, Error>({
    queryKey: ["dietas"],
    queryFn: async () => {
      const response = await client.api.dietas.$get();

      return (await response.json()) as ResponseType;
    },
  });

  return query;
};
