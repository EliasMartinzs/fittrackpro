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

type PassoDoisData = z.infer<typeof schemaPassoDois>;

type Props = {
  proximo: () => void;
  anterior: () => void;
  setPassoDoisData: (data: PassoDoisData) => void;
};

export const DietaPassoDois = ({
  proximo,
  anterior,
  setPassoDoisData,
}: Props) => {
  const form = useForm<PassoDoisData>({
    mode: "onChange",
    resolver: zodResolver(schemaPassoDois),
    defaultValues: {
      nome: "",
      horario: "",
    },
  });

  const onSubmit: SubmitHandler<PassoDoisData> = (data) => {
    setPassoDoisData(data);
    proximo();
  };

  const [horarioValue, setHorarioValue] = useState<string>("");
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

        <div className="w-full flex items-center justify-center gap-5">
          <Button type="button" onClick={anterior}>
            <ChevronLeft /> Anterior
          </Button>
          <Button type="submit">
            Proximo <ChevronRight />
          </Button>
        </div>
      </form>
    </Form>
  );
};
