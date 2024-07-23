import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType } from "hono";

type ResponseType = {
  dietaId?: string;
  error?: string;
};

type RequestType = InferRequestType<
  (typeof client.api.dietas)["dietas"]["$post"]
>["json"];

export const criarNovaDieta = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationKey: ["dietas"],
    mutationFn: async (json: RequestType) => {
      const response = await client.api.dietas["dietas"].$post({
        json: {
          nome: json.nome,
          descricao: json.descricao,
          tipo: json.tipo,
          caloriasGastaPorDia: json.caloriasGastaPorDia,
        },
      });

      return (await response.json()) as ResponseType;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dietas"] });
    },
    onError: (error) => {
      console.error("Erro ao criar a dieta:", error);
    },
  });

  return mutation;
};
