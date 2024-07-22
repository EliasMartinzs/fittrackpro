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
import { schemaPassoTres } from "@/lib/validacoes";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoCreateOutline } from "react-icons/io5";
import { toast } from "sonner";
import { z } from "zod";
import { criarNovaAlimento } from "../api/criar-novo-alimento";
import { usarNovaDieta } from "../hooks/usar-nova-dieta";

type PassoTresData = z.infer<typeof schemaPassoTres>;

type Props = {
  anterior: () => void;
  refeicaoId: string;
};

export const DietaPassoTres = ({ anterior, refeicaoId }: Props) => {
  const form = useForm<PassoTresData>({
    mode: "onChange",
    resolver: zodResolver(schemaPassoTres),
    defaultValues: {
      calorias: 0,
      carboidratos: 0,
      nome: "",
      proteinas: 0,
      quantidade: 0,
    },
  });
  const { fechar } = usarNovaDieta();

  const criarAlimentoMutation = criarNovaAlimento();

  const onSubmit: SubmitHandler<PassoTresData> = (data) => {
    criarAlimentoMutation.mutate(
      {
        refeicoesId: refeicaoId,
        ...data,
      },
      {
        onSuccess: () => {
          toast("Dieta criada com sucesso");
          fechar();
        },
      }
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <small className="text-muted-foreground text-center w-full">
          Para criar uma dieta, adicione pelo menos um alimento. Após criar a
          dieta, você poderá adicionar mais alimentos acessando a página da
          dieta.
        </small>
        <FormField
          control={form.control}
          name="nome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do alimento</FormLabel>
              <FormControl>
                <Input {...field} placeholder="arroz" />
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
              <FormLabel>Quantidade do alimento</FormLabel>
              <FormControl>
                <Input
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  value={field.value ? Number(field.value) : ""}
                  placeholder="80g"
                  type="number"
                />
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
              <FormLabel>Quantidade de calorias</FormLabel>
              <FormControl>
                <Input
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  value={field.value ? Number(field.value) : ""}
                  placeholder="250"
                  type="number"
                />
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
              <FormLabel>Quantidade de proteinas</FormLabel>
              <FormControl>
                <Input
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  value={field.value ? Number(field.value) : ""}
                  placeholder="30"
                  type="number"
                />
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
              <FormLabel>Quantidade de carboidratos</FormLabel>
              <FormControl>
                <Input
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  value={field.value ? Number(field.value) : ""}
                  placeholder="90"
                  type="number"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="w-full flex items-center justify-center gap-10">
          {!criarAlimentoMutation.isPending ? (
            <>
              <Button className="hover:bg-primary hover:text-primary-foreground transition-colors">
                <ChevronLeft /> Anterior
              </Button>
              <Button className="bg-primary text-primary-foreground transition-colors flex items-center gap-3">
                Criar dieta <IoCreateOutline className="size-5" />
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
