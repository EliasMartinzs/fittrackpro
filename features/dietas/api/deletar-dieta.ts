import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.dietas)["deletar-dieta"]["$delete"]
>;

type RequestType = InferRequestType<
  (typeof client.api.dietas)["deletar-dieta"]["$delete"]
>["json"];

export const deletarDieta = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationKey: ["dietas"],
    mutationFn: async (json) => {
      const response = await client.api.dietas["deletar-dieta"].$delete({
        json,
      });

      return (await response.json()) as ResponseType;
    },
    onSuccess: () => {
      toast("Dieta deletada com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["dietas"] });
    },
    onError: () => {
      toast("Houve um erro, Tente novamente");
    },
  });

  return mutation;
};
