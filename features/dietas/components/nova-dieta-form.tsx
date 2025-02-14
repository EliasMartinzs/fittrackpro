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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { tiposDeDietas } from "@/lib/constants";
import { novaDietaSchema } from "@/lib/validacoes";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { criarNovaDieta } from "../api/criar-nova-dieta";
import { Loading } from "@/components/global/loading";
import { usarNovaDieta } from "../hooks/usar-nova-dieta";

export type dietaValidacao = z.infer<typeof novaDietaSchema>;

export const NovaDietaForm = () => {
  const form = useForm<dietaValidacao>({
    mode: "onChange",
    resolver: zodResolver(novaDietaSchema),
    defaultValues: {
      nome: "",
      tipo: "Comum",
      descricao: "",
      caloriasGastaPorDia: undefined,
      pesoDieta: undefined,
    },
  });

  const criarDietaMutation = criarNovaDieta();
  const { fechar } = usarNovaDieta();

  const onSubmit: SubmitHandler<dietaValidacao> = (data) => {
    criarDietaMutation.mutate(
      {
        nome: data?.nome!,
        descricao: data?.descricao,
        tipo: data?.tipo,
        caloriasGastaPorDia: data.caloriasGastaPorDia,
        pesoDieta: data.pesoDieta,
      },
      {
        onSuccess: () => fechar(),
      }
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="nome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome da dieta</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Projeto verão" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tipo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de dieta</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value!}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Tipo de dieta" />
                  </SelectTrigger>
                  <SelectContent className="select-content">
                    {tiposDeDietas.map((dieta) => (
                      <SelectItem key={dieta} value={dieta}>
                        {dieta}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="caloriasGastaPorDia"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Calorias gastas por dia</FormLabel>
              <FormControl>
                <Input
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(Number(e.target.value));
                  }}
                  placeholder="2200"
                  type="number"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="pesoDieta"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Peso atual no momento da dieta</FormLabel>
              <FormControl>
                <Input
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(Number(e.target.value));
                  }}
                  placeholder="88.2 KG"
                  type="number"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="descricao"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição sobre a dieta</FormLabel>
              <FormControl>
                <Textarea
                  value={field.value!}
                  onChange={field.onChange}
                  rows={7}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="w-full flex items-center justify-center gap-10">
          {!criarDietaMutation.isPending ? (
            <>
              <Button
                variant="destructive"
                disabled={criarDietaMutation.isPending}
                size="full"
              >
                Criar Dieta
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
