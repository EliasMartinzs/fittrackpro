import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.dietas)["refeicoes"]["$post"]
>;
type RequestType = InferRequestType<
  (typeof client.api.dietas)["refeicoes"]["$post"]
>["json"];

export const criarNovaRefeicao = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationKey: ["dietas"],
    mutationFn: async (json) => {
      const response = await client.api.dietas["refeicoes"]["$post"]({ json });

      return await response.json();
    },
    onSuccess: () => {
      toast("Refeicao criada com sucesso", {
        id: "criar-refeicao",
      });

      queryClient.invalidateQueries({ queryKey: ["dietas"] });
    },
    onError: () => {
      toast("Houve um erro, Tente novamente!", {
        id: "criar-refeicao",
      });
    },
  });

  return mutation;
};
