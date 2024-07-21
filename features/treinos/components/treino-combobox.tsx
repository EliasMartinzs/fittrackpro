"use client";

import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { exercicios } from "@/lib/constants";
import { useMemo, useState } from "react";

type Props = {
  onChange: (...event: any[]) => void;
  tipoExercicio: string;
};

export const TreinoCombobox = ({ onChange, tipoExercicio }: Props) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const tipoExercicios = useMemo(() => {
    return exercicios.filter((exercicio) => exercicio.tipo === tipoExercicio);
  }, [tipoExercicio]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          role="combobox"
          aria-expanded={open}
          className="w-full flex justify-between border border-accent rounded-2xl"
        >
          {value ? value : "Selecione um exercicio..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 select-content">
        <Command>
          <CommandInput
            placeholder="Buscar ou criar um exercicio..."
            className="h-10"
            onValueChange={(e) => setValue(e)}
          />
          <CommandEmpty className="bg-accent">
            <Button
              onClick={() => {
                onChange(value);
                setOpen(false);
              }}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Criar exercicio
            </Button>
          </CommandEmpty>
          <CommandGroup className="max-lg:mt-4">
            {tipoExercicios.map((exercicio, i) => (
              <CommandList key={i}>
                <CommandItem
                  value={exercicio.nome}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    onChange(currentValue);
                    setOpen(false);
                  }}
                >
                  {exercicio.nome}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === exercicio.nome ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              </CommandList>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
