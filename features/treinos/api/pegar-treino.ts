import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const pegarTreino = (id?: string) => {
  const query = useQuery({
    queryKey: ["treino"],
    queryFn: async () => {
      const response = await client.api.treinos[":id"].$get({
        param: { id },
      });

      if (!response.ok) {
        throw new Error("falha ao pegar treino");
      }

      return await response.json();
    },
  });

  return query;
};
