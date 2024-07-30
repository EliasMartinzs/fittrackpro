"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { novoPesoAtualSchema } from "@/lib/validacoes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { criarPesoAtual } from "../api/criar-peso-atual";
import { Button } from "@/components/ui/button";
import { Loading } from "@/components/global/loading";
import { usarNovoPesoAtual } from "../hooks/user-novo-peso-atual";
import { toast } from "sonner";

type pesoAtualValidacao = z.infer<typeof novoPesoAtualSchema>;

export const NovoPesoAtualForm = () => {
  const form = useForm<pesoAtualValidacao>({
    resolver: zodResolver(novoPesoAtualSchema),
    defaultValues: {
      pesoAtual: undefined,
    },
  });
  const { dietaId, fechar } = usarNovoPesoAtual();

  const novoPesoAtualMutation = criarPesoAtual();

  function onSubmit(data: pesoAtualValidacao) {
    if (dietaId) {
      novoPesoAtualMutation.mutate(
        {
          id: dietaId,
          pesoAtual: data.pesoAtual,
        },
        {
          onSuccess: () => {
            toast("Peso atualizado com sucesso!");
            fechar(); // Opcional: Fechar o formulário após o sucesso
          },
          onError: () => {
            toast("Houve um erro, tente novamente!");
          },
        }
      );
    } else {
      toast("Houve um erro, Tente novamente!");
    }
  }

  return (
    <Form {...form}>
      <form className="space-y-6 py-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="pesoAtual"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Peso atual</FormLabel>
              <FormControl>
                <div className="flex items-center">
                  <Input
                    placeholder="80kg"
                    type="number"
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(Number(e.target.value));
                    }}
                  />
                  <p className="p-2">Kg</p>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="w-full flex items-center justify-center gap-10">
          {!novoPesoAtualMutation.isPending ? (
            <>
              <Button
                variant="destructive"
                disabled={novoPesoAtualMutation.isPending}
                size="full"
              >
                Salvar
              </Button>
            </>
          ) : (
            <Loading height={24} width={24} />
          )}
        </div>
      </form>
    </Form>
  );
};
