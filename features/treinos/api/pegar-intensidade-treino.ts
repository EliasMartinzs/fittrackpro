import { client } from "@/lib/hono";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const pegarIntensidadeTreino = () => {
  const query = useQuery({
    queryKey: ["treinos"],
    queryFn: async () => {
      const response = await client.api.treinos["intensidade"].$get();

      return await response.json();
    },
  });

  return query;
};
