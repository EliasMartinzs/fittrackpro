import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.dietas)["resetar-agua"]["$post"]
>;
type RequestType = InferRequestType<
  (typeof client.api.dietas)["resetar-agua"]["$post"]
>;

export const resetarAgua = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async () => {
      const response = await client.api.dietas["resetar-agua"].$post();

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Água resetada!", {});

      queryClient.invalidateQueries({ queryKey: ["dietas"] });
    },
    onError: () => {
      toast.success("Houve um erro, Tente novamente!", {});
    },
  });

  return mutation;
};
