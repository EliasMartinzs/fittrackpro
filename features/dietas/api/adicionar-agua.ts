import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.dietas)["adicionar-agua"]["$post"]
>;

type RequestType = InferRequestType<
  (typeof client.api.dietas)["adicionar-agua"]["$post"]
>;

export const adicionarAgua = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationKey: ["dietas"],
    mutationFn: async (json: RequestType) => {
      const response = await client.api.dietas["adicionar-agua"].$post({
        json: {
          consumoAgua: json.json.consumoAgua,
        },
      });

      return (await response.json()) as ResponseType;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dietas"] });
    },
    onError: () => {
      toast("Houve um erro ao criar a dieta!");
    },
  });

  return mutation;
};
