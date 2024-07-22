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
import { schemaPassoUm } from "@/lib/validacoes";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { criarNovaDieta } from "../api/criar-nova-dieta";
import { toast } from "sonner";
import { Loading } from "@/components/global/loading";

export type PassoUmValidacao = z.infer<typeof schemaPassoUm>;

type Props = {
  proximo: () => void;
  setDietaId: (dietaId: string) => void;
};

export const DietaPassoUm = ({ proximo, setDietaId }: Props) => {
  const form = useForm<PassoUmValidacao>({
    mode: "onChange",
    resolver: zodResolver(schemaPassoUm),
    defaultValues: {
      nome: "",
      tipo: "Comum",
      descricao: "",
    },
  });
  const criarDietaMutation = criarNovaDieta();

  const onSubmit: SubmitHandler<PassoUmValidacao> = (data) => {
    criarDietaMutation.mutate(
      {
        nome: data?.nome!,
        descricao: data?.descricao,
        tipo: data?.tipo,
      },
      {
        onSuccess: (data) => {
          setDietaId(data.dietaId as string);
          form.reset();
          proximo();
        },
        onError: () => {
          toast("Houve um erro. Tente novamente!");
        },
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
                <Input {...field} placeholder="Objetivo 80kg" />
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
                className="hover:bg-primary hover:text-primary-foreground transition-colors"
                disabled={true}
              >
                <ChevronLeft /> Anterior
              </Button>
              <Button className="hover:bg-primary hover:text-primary-foreground transition-colors">
                Proximo <ChevronRight />
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
