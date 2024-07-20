"use client";

import { Loading } from "@/components/global/loading";
import { useExerciciosFiltrados } from "@/hooks/use-exercicios-filtrados";
import { useSearchParams } from "next/navigation";
import { pegarTreinos } from "../api/pegar-treinos";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { obterDiaDaSemana } from "@/lib/utils";

export const TreinoDetalhe = () => {
  const { data, isLoading } = pegarTreinos();
  const searchParams = useSearchParams();

  const diaSelecionado = searchParams.get("dia");
  const horarioSelecionado = searchParams.get("horario");

  const exerciciosFiltrados = useExerciciosFiltrados({
    data: data,
    dia: diaSelecionado,
    hora: horarioSelecionado,
  });

  if (isLoading) {
    return (
      <div className="flex-1 grid place-items-center">
        <Loading height={32} width={32} />
      </div>
    );
  }

  return (
    <Table>
      <TableCaption>
        {exerciciosFiltrados.length === 0
          ? "Nenhum encontrado!"
          : `Detalhes de seus exercicios de ${
              diaSelecionado === null ? obterDiaDaSemana() : diaSelecionado
            }, ${horarioSelecionado === null ? "Manha" : horarioSelecionado}`}
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Categoria</TableHead>
          <TableHead>Exercicio</TableHead>
          <TableHead>Series</TableHead>
          <TableHead>Rep</TableHead>
          <TableHead>Int</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {exerciciosFiltrados?.map(
          ({
            id,
            nomeExercisio,
            series,
            repeticoes,
            categoria,
            intensidade,
          }) => (
            <TableRow key={id} className="relative">
              <TableCell>{categoria}</TableCell>
              <TableCell>{nomeExercisio}</TableCell>
              <TableCell>{series}</TableCell>
              <TableCell>{repeticoes}</TableCell>
              <TableCell>
                {intensidade?.charAt(0).toUpperCase()}
                {intensidade?.slice(1)}
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </Table>
  );
};
