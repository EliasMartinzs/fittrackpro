"use client";

import { z } from "zod";
import { novaRefeicaoSchema } from "../../../lib/validacoes";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { criarNovaRefeicao } from "../api/criar-nova-refeicao";
import { pegarDietas } from "../api/pegar-dietas";
import { Skeleton } from "@/components/ui/skeleton";
import { InputMask } from "@react-input/mask";
import { usarNovaRefeicao } from "../hooks/usar-nova-refeicao";
import { Loading } from "@/components/global/loading";
import { ComboboxRefeicao } from "./combobox-refeicao";

type refeicaoValidacao = z.infer<typeof novaRefeicaoSchema>;

export const NovaRefeicaoForm = () => {
  const form = useForm<refeicaoValidacao>({
    resolver: zodResolver(novaRefeicaoSchema),
    defaultValues: {
      nome: "",
      horario: "",
    },
  });

  const criarRefeicaoMutation = criarNovaRefeicao();
  const { data, isLoading } = pegarDietas();
  const { fechar } = usarNovaRefeicao();

  const carregando = isLoading || criarRefeicaoMutation.isPending;

  function onSubmit(values: refeicaoValidacao) {
    criarRefeicaoMutation.mutate(
      {
        dietaId: data?.data?.at(0)?.id!,
        ...values,
      },
      {
        onSuccess: () => {
          fechar();
        },
      }
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-5">
        <FormField
          control={form.control}
          name="nome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome da refeição</FormLabel>
              <FormControl>
                <ComboboxRefeicao onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="horario"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Horário da refeição</FormLabel>
              <FormControl>
                <InputMask
                  mask="__:__"
                  replacement={{ _: /\d/ }}
                  {...field}
                  className="flex h-9 w-full rounded-md border border-accent bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground outline-none"
                  placeholder="15:30"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button
          variant="destructive"
          size="full"
          type="submit"
          disabled={carregando}
        >
          {!carregando ? "Criar refeição" : <Loading width={24} height={24} />}
        </Button>
      </form>
    </Form>
  );
};
