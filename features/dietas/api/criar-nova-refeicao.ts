import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType } from "hono";
import { toast } from "sonner";

type ResponseType = {
  error?: string;
  refeicaoId?: string;
};

type RequestType = InferRequestType<
  (typeof client.api.dietas)["refeicoes"]["$post"]
>["json"];

export const criarNovaRefeicao = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationKey: ["dietas"],
    mutationFn: async (json) => {
      const response = await client.api.dietas["refeicoes"].$post({
        json: {
          dietaId: json.dietaId,
          horario: json.horario,
          nome: json.nome,
        },
      });

      return (await response.json()) as ResponseType;
    },
    onSuccess: () => {
      toast("Refeição criada com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["dietas"] });
    },
    onError: () => {
      toast("Houve um erro, Tente novamente!");
    },
  });

  return mutation;
};
