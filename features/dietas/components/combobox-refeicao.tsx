"use client";

import * as React from "react";
import { Check, CheckIcon, ChevronsUpDown } from "lucide-react";

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

const refeicao = [
  {
    value: "café da manhã",
    label: "Café da manhâ",
  },
  {
    value: "lanche",
    label: "Lanche",
  },
  {
    value: "almoço",
    label: "Almoço",
  },
  {
    value: "café da tarde",
    label: "Café da tarde",
  },
  {
    value: "jantar",
    label: "Jantar",
  },
];

type Props = {
  onChange: (...event: any[]) => void;
};

export const ComboboxRefeicao = ({ onChange }: Props) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          role="combobox"
          aria-expanded={open}
          className="w-full flex justify-between border border-accent rounded-2xl"
        >
          {value ? value : "Selecione ou crie uma refeição..."}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 select-content">
        <Command>
          <CommandInput
            placeholder="Digite para criar uma refeição"
            className="h-10"
            onValueChange={(e) => setValue(e)}
          />
          <CommandEmpty className="bg-accent">
            <Button
              onClick={() => {
                onChange(value);
                setOpen(false);
              }}
              className="flex items-center"
            >
              Adicionar refeição: {value}
            </Button>
          </CommandEmpty>
          <CommandGroup className="max-lg:mt-4">
            {refeicao.map((exercicio, i) => (
              <CommandList key={i}>
                <CommandItem
                  value={exercicio.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    onChange(currentValue);
                    setOpen(false);
                  }}
                >
                  {exercicio.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === exercicio.label ? "opacity-100" : "opacity-0"
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
