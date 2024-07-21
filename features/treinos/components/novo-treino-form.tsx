"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { treinoSchema } from "@/lib/validacoes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  categoriasTreino,
  diasDaSemana,
  horarioTreino,
  tiposExercisio,
} from "@/lib/constants";
import { Loader2 } from "lucide-react";
import { criarTreino } from "../api/criar-treino";
import { usarNovoTreino } from "../hooks/usar-novo-treino-drawer";
import { TreinoCombobox } from "./treino-combobox";
import { TreinoSelect } from "./treino-select";

type ValidacaoForm = z.infer<typeof treinoSchema>;

export const NovoTreinoForm = () => {
  const form = useForm<ValidacaoForm>({
    resolver: zodResolver(treinoSchema),
    defaultValues: {
      categoria: "Peito",
      tipoExercicio: "Força",
      nomeExercisio: "",
      diaDaSemana: "Seg",
      horarioTreino: "manha",
      notas: "",
      intensidade: "Baixa",
      repeticoes: 0,
      series: 0,
    },
  });

  const mutation = criarTreino();
  const estaCarregando = mutation.isPending;
  const { fechar } = usarNovoTreino();

  function onSubmit(values: ValidacaoForm) {
    mutation.mutate(values, {
      onSuccess: () => {
        fechar();
      },
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-5 overflow-y-auto ocultar-scrollbar py-5"
      >
        <FormField
          control={form.control}
          name="categoria"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Selecione o tipo de Treino</FormLabel>
              <FormControl>
                <TreinoSelect
                  onEventChange={field.onChange}
                  data={categoriasTreino}
                  selectLabel="Selecione um tipo de Treino"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="nomeExercisio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Nome do exercicio de {form.watch("categoria")}
              </FormLabel>
              <FormControl>
                <TreinoCombobox
                  onChange={field.onChange}
                  tipoExercicio={form.watch("categoria")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tipoExercicio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Selecione o tipo de Exercisio</FormLabel>
              <FormControl>
                <TreinoSelect
                  onEventChange={field.onChange}
                  data={tiposExercisio}
                  selectLabel="Selecione um tipo de Exercisio"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="series"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Series</FormLabel>
              <FormControl>
                <Input
                  value={field.value}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  type="number"
                  placeholder="Series"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="repeticoes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Repetições</FormLabel>
              <FormControl>
                <Input
                  value={field.value}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  type="number"
                  placeholder="Repetições"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="intensidade"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Intensidade</FormLabel>
              <FormControl>
                <div>
                  {["Baixa", "Média", "Alta"].map((int) => (
                    <Button
                      key={int}
                      onClick={() => {
                        field.onChange(int);
                      }}
                      type="button"
                      variant={
                        form.watch("intensidade") === int
                          ? "destructive"
                          : "default"
                      }
                    >
                      <p>{int}</p>
                    </Button>
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="diaDaSemana"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dia da Semana</FormLabel>
              <FormControl>
                <div>
                  {diasDaSemana.map((dia) => (
                    <Button
                      key={dia}
                      onClick={() => {
                        field.onChange(dia.slice(0, 3));
                      }}
                      type="button"
                      variant={
                        form.watch("diaDaSemana") === dia.slice(0, 3)
                          ? "destructive"
                          : "default"
                      }
                    >
                      <p>{dia.slice(0, 3)}</p>
                    </Button>
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="horarioTreino"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hora do treino</FormLabel>
              <FormControl>
                <div className="flex gap-1 overflow-hidden">
                  {horarioTreino.map((horario) => (
                    <Button
                      key={horario}
                      onClick={() => {
                        field.onChange(horario.toLowerCase());
                      }}
                      type="button"
                      variant={
                        form.watch("horarioTreino") === horario.toLowerCase()
                          ? "destructive"
                          : "default"
                      }
                    >
                      <p className="text-blue-500">{horario}</p>
                    </Button>
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notas"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Observação de exercício</FormLabel>
              <FormControl>
                <Textarea
                  onChange={field.onChange}
                  value={field.value}
                  rows={8}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          disabled={estaCarregando}
          variant="destructive"
          type="submit"
          className="rounded-full"
        >
          {!estaCarregando ? "Salvar" : <Loader2 className="animate-spin" />}
        </Button>
      </form>
    </Form>
  );
};
