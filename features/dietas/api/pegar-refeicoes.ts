import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const pegarRefeicoes = () => {
  const query = useQuery({
    queryKey: ["dietas"],
    queryFn: async () => {
      const response = await client.api.dietas["refeicoes"].$get();

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const result = await response.json();

      if ("error" in result) {
        throw new Error(result.error);
      }

      return result;
    },
    enabled: true,
  });

  return query;
};
