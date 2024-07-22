import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

type ResponseType = InferResponseType<
  (typeof client.api.dietas)["alimentos"]["$post"]
>;
type RequestType = InferRequestType<
  (typeof client.api.dietas)["alimentos"]["$post"]
>["json"];

export const criarNovaAlimento = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationKey: ["dietas"],
    mutationFn: async (json) => {
      const response = await client.api.dietas["alimentos"]["$post"]({ json });

      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dietas"] });
    },
  });

  return mutation;
};
