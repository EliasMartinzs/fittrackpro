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
import { schemaPassoDois } from "@/lib/validacoes";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import "react-clock/dist/Clock.css";
import { SubmitHandler, useForm } from "react-hook-form";
import "react-time-picker/dist/TimePicker.css";
import { z } from "zod";
import { criarNovaRefeicao } from "../api/criar-nova-refeicao";
import { Loading } from "@/components/global/loading";

type PassoDoisData = z.infer<typeof schemaPassoDois>;

type Props = {
  proximo: () => void;
  anterior: () => void;
  dietaId: string;
  setRefeicaoId: (refeicaoId: string) => void;
};

export const DietaPassoDois = ({
  proximo,
  anterior,
  dietaId,
  setRefeicaoId,
}: Props) => {
  const [horarioValue, setHorarioValue] = useState<string>("");
  const form = useForm<PassoDoisData>({
    mode: "onChange",
    resolver: zodResolver(schemaPassoDois),
    defaultValues: {
      nome: "",
      horario: "",
    },
  });

  const criarRefeicaoMutation = criarNovaRefeicao();

  const onSubmit: SubmitHandler<PassoDoisData> = (data) => {
    criarRefeicaoMutation.mutate(
      {
        dietaId: dietaId,
        nome: data.nome,
        horario: convertTimeToDateTimeString(data.horario),
      },
      {
        onSuccess: (data) => {
          setRefeicaoId(data.refeicaoId!);
          form.reset();
          proximo();
        },
      }
    );
  };

  const formatTime = (value: string) => {
    const cleanValue = value.replace(/\D/g, "").slice(0, 4);
    if (cleanValue.length <= 2) return cleanValue;
    return `${cleanValue.slice(0, 2)}:${cleanValue.slice(2, 4)}`;
  };

  const handleHorarioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setHorarioValue(newValue);
    form.setValue("horario", newValue);
  };

  function convertTimeToDateTimeString(time: string): string {
    const [hours, minutes] = time.split(":").map(Number);
    const now = new Date();
    now.setHours(hours, minutes, 0, 0);

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Meses são baseados em zero
    const day = String(now.getDate()).padStart(2, "0");
    const hour = String(now.getHours()).padStart(2, "0");
    const minute = String(now.getMinutes()).padStart(2, "0");
    const second = String(now.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="nome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome da refeicao</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Cafe da manha" />
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
              <FormLabel>Horario da refeicao</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="HH:MM"
                  value={formatTime(horarioValue)}
                  onChange={handleHorarioChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="w-full flex items-center justify-center gap-10">
          {!criarRefeicaoMutation.isPending ? (
            <>
              <Button className="hover:bg-primary hover:text-primary-foreground transition-colors">
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
