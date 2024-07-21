import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.dietas.$post>;
type RequestType = InferRequestType<typeof client.api.dietas.$post>["form"];

export const criarNovaDieta = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationKey: ["dietas"],
    mutationFn: async ({ nome, descricao, tipo }) => {
      const response = await client.api.dietas["$post"]({
        form: {
          nome: nome,
          descricao: descricao,
          tipo: tipo,
        },
      });

      return await response.json();
    },
    onSuccess: () => {
      toast("Dieta criada com sucesso", {
        id: "criar-dieta",
      });

      queryClient.invalidateQueries({ queryKey: ["dietas"] });
    },
    onError: () => {
      toast("Houve um erro, Tente novamente!", {
        id: "criar-dieta",
      });
    },
  });

  return mutation;
};
