import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.dietas)["alimentos"]["$post"]
>;
type RequestType = InferRequestType<
  (typeof client.api.dietas)["alimentos"]["$post"]
>["json"];

export const criarNovoAlimento = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationKey: ["dietas"],
    mutationFn: async (json) => {
      const response = await client.api.dietas["alimentos"]["$post"]({ json });
      console.log(json);

      return await response.json();
    },
    onSuccess: () => {
      toast("Alimento criado com sucesso");
      queryClient.invalidateQueries({ queryKey: ["dietas"] });
    },
    onError: () => {
      toast("Houve um erro, Tente novamente!");
    },
  });

  return mutation;
};
