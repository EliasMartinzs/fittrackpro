"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { pegarCategoriasTreinos } from "@/features/treinos/api/pegar-categorias-treino";
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import { Loading } from "../global/loading";

export const CategoriasChart = () => {
  const { data, isLoading, isError } = pegarCategoriasTreinos();

  if (isLoading) {
    return (
      <div className="w-full grid place-items-center">
        <Loading height={24} width={24} />
      </div>
    );
  }

  if (isError || !data) {
    return <div>Ocorreu um erro ao buscar os dados.</div>;
  }

  if ("data" in data) {
    const chartData =
      data?.data.map((item) => ({
        categoria: item.categoria,
        quantia: item.count,
      })) || [];

    const chartConfig = {
      desktop: {
        label: "Categorias de Treino",
        color: "hsl(262.1 83.3% 57.8%)",
      },
    };

    return (
      <Card>
        <CardHeader>
          <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
            <CardTitle>Categorias dos treinos</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="categoria" tickLine={false} axisLine={false} />
              <YAxis />
              <Tooltip content={<ChartTooltipContent hideLabel />} />
              <Bar
                dataKey="quantia"
                fill={chartConfig.desktop.color}
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <small className="leading-none text-muted-foreground">
            Mostrando contagem de exercícios por categoria de treino
          </small>
        </CardFooter>
      </Card>
    );
  } else {
    return <div>Ocorreu um erro ao buscar os dados.</div>;
  }
};
