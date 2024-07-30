import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.dietas)["atualizar-peso"]["$post"]
>;
type ResquestResponse = InferRequestType<
  (typeof client.api.dietas)["atualizar-peso"]["$post"]
>["json"];

export const criarPesoAtual = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, ResquestResponse>({
    mutationKey: ["dietas"],
    mutationFn: async (json) => {
      const response = await client.api.dietas["atualizar-peso"].$post({
        json,
      });

      if (!response.ok) {
        return { error: "Erro ao atualizar peso atual" };
      }

      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dietas"] });
    },
    onError: () => {
      toast("Houve um erro, Tente novamente!");
    },
  });

  return mutation;
};
