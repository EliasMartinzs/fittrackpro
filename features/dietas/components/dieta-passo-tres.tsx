import { schemaPassoTres } from "@/lib/validacoes";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

type PassoTresData = z.infer<typeof schemaPassoTres>;

type Props = {
  anterior: () => void;
  setPassoTresData: (data: PassoTresData) => void;
};

export const DietaPassoTres = ({ anterior, setPassoTresData }: Props) => {
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

  const onSubmit: SubmitHandler<PassoTresData> = (data) => {
    setPassoTresData(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                <Input {...field} placeholder="80g" type="number" />
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
                <Input {...field} placeholder="250" type="number" />
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
                <Input {...field} placeholder="30" type="number" />
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
              <FormLabel>Quantidade de carboidratos</FormLabel>
              <FormControl>
                <Input {...field} placeholder="90" type="number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="w-full flex items-center justify-center gap-10">
          <Button type="button" onClick={anterior}>
            <ChevronLeft /> Anterior
          </Button>
          <Button
            type="submit"
            variant="destructive"
            className="flex items-center gap-2"
          >
            Criar dieta <Plus className="size-5" />
          </Button>
        </div>
      </form>
    </Form>
  );
};
