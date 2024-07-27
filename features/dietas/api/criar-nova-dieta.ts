import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType } from "hono";
import { toast } from "sonner";

type ResponseType = {
  dietaId?: string;
  error?: string;
};

type RequestType = InferRequestType<
  (typeof client.api.dietas)["$post"]
>["json"];

export const criarNovaDieta = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationKey: ["dietas"],
    mutationFn: async (json: RequestType) => {
      const response = await client.api.dietas.$post({
        json: {
          nome: json.nome,
          descricao: json.descricao,
          tipo: json.tipo,
          caloriasGastaPorDia: json.caloriasGastaPorDia,
          pesoDieta: json.pesoDieta,
        },
      });

      return (await response.json()) as ResponseType;
    },
    onSuccess: () => {
      toast("Dieta criada com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["dietas"] });
    },
    onError: () => {
      toast("Houve um erro ao criar a dieta!");
    },
  });

  return mutation;
};
