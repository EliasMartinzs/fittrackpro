"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useExerciciosFiltrados } from "@/hooks/use-exercicios-filtrados";
import { Trash2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { deletarTreino } from "../api/deletar-treino";
import { pegarTreinos } from "../api/pegar-treinos";
export const MeusTreinos = () => {
  const { data, isLoading } = pegarTreinos();
  const searchParams = useSearchParams();

  const diaSelecionado = searchParams.get("dia");
  const horarioSelecionado = searchParams.get("horario");
  const mutationDelete = deletarTreino();

  const exerciciosFiltrados = useExerciciosFiltrados({
    data: data,
    dia: diaSelecionado,
    hora: horarioSelecionado,
  });

  if (isLoading) {
    return (
      <div className="w-full grid place-items-center">
        <Skeleton className="w-full h-20" />
        <Skeleton className="w-full h-20" />
      </div>
    );
  }

  return (
    <Table>
      <TableCaption>
        {exerciciosFiltrados.length === 0
          ? "Nenhum exercicio criado!"
          : "Uma lista de seus exercicios"}
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Exercícios</TableHead>
          <TableHead>Tipo de exercícios</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {exerciciosFiltrados?.map(({ id, nomeExercisio, tipoExercicio }) => (
          <TableRow key={id} className="relative">
            <TableCell>{nomeExercisio}</TableCell>
            <TableCell>{tipoExercicio}</TableCell>
            <Button
              className="absolute right-0 cursor-pointer z-50"
              onClick={() =>
                mutationDelete.mutate({
                  id: id,
                })
              }
            >
              <Trash2 className="text-muted-foreground w-4 h-4" />
            </Button>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
