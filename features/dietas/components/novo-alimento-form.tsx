import { Loading } from "@/components/global/loading";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { novoAliemntoSchema } from "@/lib/validacoes";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { criarNovoAlimento } from "../api/criar-novo-alimento";
import { pegarDietas } from "../api/pegar-dietas";
import { usarNovoAlimento } from "../hooks/usar-novo-alimento";

type alimentoValidacao = z.infer<typeof novoAliemntoSchema>;

export const NovoAlimentoForm = () => {
  const form = useForm<alimentoValidacao>({
    mode: "onChange",
    resolver: zodResolver(novoAliemntoSchema),
    defaultValues: {
      nome: "",
      quantidade: undefined,
      calorias: undefined,
      carboidratos: undefined,
      proteinas: undefined,
      refeicaoid: "",
    },
  });

  const criarNovoAlimentoMutation = criarNovoAlimento();
  const { data, isLoading } = pegarDietas();
  const { fechar } = usarNovoAlimento();

  const refeicoes = data?.data?.at(0)?.refeicoes?.map((refeicao) => ({
    nome: refeicao.nome,
    id: refeicao.id,
  }));

  const onSubmit: SubmitHandler<alimentoValidacao> = (data) => {
    console.log(data);
    criarNovoAlimentoMutation.mutate(
      {
        nome: data?.nome,
        quantidade: data?.quantidade,
        calorias: data?.calorias!,
        proteinas: data.proteinas!,
        carboidratos: data.carboidratos!,
        refeicoesId: data.refeicaoid,
      },
      {
        onSuccess: () => fechar(),
      }
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-6">
        <FormField
          control={form.control}
          name="refeicaoid"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adicionar alimento a refeição</FormLabel>
              <FormControl>
                {!isLoading ? (
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione a refeição" />
                    </SelectTrigger>
                    <SelectContent className="select-content">
                      <SelectGroup>
                        {refeicoes?.map((t) => (
                          <SelectItem key={t.id} value={t.id}>
                            {t.nome}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                ) : (
                  <Loading width={16} height={16} />
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="nome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Arroz" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="quantidade"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantidade</FormLabel>
              <FormControl>
                <div className="flex gap-x-3 items-center">
                  <Input
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(Number(e.target.value));
                    }}
                    placeholder="80g"
                    type="number"
                  />
                  <p className="text-muted-foreground">Gramas</p>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="carboidratos"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Carboidratos</FormLabel>
              <FormControl>
                <div className="flex gap-x-3 items-center">
                  <Input
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(Number(e.target.value));
                    }}
                    placeholder="65"
                    type="number"
                  />
                  <p className="text-muted-foreground">Gramas</p>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="proteinas"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Proteínas</FormLabel>
              <FormControl>
                <div className="flex gap-x-3 items-center">
                  <Input
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(Number(e.target.value));
                    }}
                    placeholder="32"
                    type="number"
                  />
                  <p className="text-muted-foreground">Gramas</p>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="calorias"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Calorias</FormLabel>
              <FormControl>
                <Input
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(Number(e.target.value));
                  }}
                  placeholder="110"
                  type="number"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="w-full flex items-center justify-center gap-10">
          {!criarNovoAlimentoMutation.isPending ? (
            <>
              <Button
                variant="destructive"
                disabled={criarNovoAlimentoMutation.isPending}
                size="full"
              >
                Adicionar alimento
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
