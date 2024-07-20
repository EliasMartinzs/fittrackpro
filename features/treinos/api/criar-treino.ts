import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.treinos.$post>;
type RequestType = InferRequestType<typeof client.api.treinos.$post>["json"];

export const criarTreino = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.treinos.$post({ json });

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Treino criado com sucesso", {
        id: "criar-treino",
      });

      queryClient.invalidateQueries({ queryKey: ["treinos"] });
      queryClient.invalidateQueries({ queryKey: ["treino"] });
    },
    onError: () => {
      toast.success("Houve um erro, Tente novamente!", {
        id: "criar-treino",
      });
    },
  });

  return mutation;
};
