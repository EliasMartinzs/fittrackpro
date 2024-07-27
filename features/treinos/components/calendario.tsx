"use client";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { pegarDietas } from "@/features/dietas/api/pegar-dietas";
import { usarSelecionarDieta } from "@/features/dietas/hooks/usar-selecionar-dieta";
import { horarioTreino } from "@/lib/constants";
import { cn, gerarDiasDaSemana } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

type Props = {
  mostraHorario?: boolean;
};

export const Calendario = ({ mostraHorario = false }: Props) => {
  const dias = gerarDiasDaSemana();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data, isLoading } = pegarDietas();
  const { setDietaId, dietaId } = usarSelecionarDieta();

  const diaSelecionado = searchParams.get("dia");
  const horarioSelecionado = searchParams.get("horario");

  const criarQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <div className="space-y-4 flex flex-col gap-5">
      <div className="flex items-start justify-center gap-1.5 overflow-hidden">
        {dias.map(({ diaSemana, data, hoje }) => (
          <div
            onClick={() => {
              router.push(
                pathname + "?" + criarQueryString("dia", diaSemana.slice(0, 3))
              );
            }}
            key={data}
            className={cn(
              "bg-background rounded-xl grid place-items-center gap-3 p-2 cursor-pointer hover:border-primary",
              hoje &&
                "bg-primary text-primary-foreground border-none transition-colors",
              diaSelecionado === diaSemana.slice(0, 3) &&
                "border border-primary"
            )}
          >
            <small>{diaSemana.slice(0, 3)}</small>
            <small
              className={cn(
                "text-muted-foreground",
                hoje && "text-primary-foreground"
              )}
            >
              {data}
            </small>
          </div>
        ))}
      </div>

      {mostraHorario && (
        <div className="flex gap-3">
          {horarioTreino.map((horario, index) => (
            <Button
              onClick={() => {
                router.push(
                  pathname + "?" + criarQueryString("horario", horario)
                );
              }}
              variant={
                (horarioSelecionado === horario && "destructive") ||
                (index === 0 && !horarioSelecionado && "destructive") ||
                "outline"
              }
              key={horario}
            >
              {horario}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};
