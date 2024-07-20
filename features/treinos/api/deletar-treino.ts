import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.treinos)[":id"]["$delete"]
>;
type RequestType = InferRequestType<
  (typeof client.api.treinos)[":id"]["$delete"]
>["param"];

export const deletarTreino = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationKey: ["treinos"],
    mutationFn: async ({ id }) => {
      const response = await client.api.treinos[":id"]["$delete"]({
        param: { id: id },
      });

      return await response.json();
    },
    onSuccess: () => {
      toast("Treino deletado com sucesso", { id: "deletar-treino" });
      queryClient.invalidateQueries({ queryKey: ["treino"] });
      queryClient.invalidateQueries({ queryKey: ["treinos"] });
    },
    onError: () => {
      toast("Houve um erro, Tente novamente!", { id: "deletar-treino" });
    },
  });

  return mutation;
};
