"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { pegarIntensidadeTreino } from "@/features/treinos/api/pegar-intensidade-treino";
import { Skeleton } from "../ui/skeleton";

const chartConfig = {
  baixa: {
    label: "Baixa",
    color: "hsl(262.1 83.3% 57.8%)",
  },
  media: {
    label: "Média",
    color: "hsl(262.1 83.3% 57.8%)",
  },
  alta: {
    label: "Alta",
    color: "hsl(262.1 83.3% 57.8%)",
  },
} satisfies ChartConfig;

export const IntensidadeChart = () => {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("baixa");

  const { data, isLoading, isError } = pegarIntensidadeTreino();

  const chartData = React.useMemo(() => {
    if (!data || "error" in data) return [];

    const { intensidadesPorMes } = data;
    if (!intensidadesPorMes) return [];

    return Object.entries(intensidadesPorMes).map(([date, intensidades]) => ({
      date,
      baixa: intensidades.baixa,
      media: intensidades.media,
      alta: intensidades.alta,
    }));
  }, [data]);

  const total = React.useMemo(
    () => ({
      baixa: chartData.reduce((acc, curr) => acc + curr.baixa, 0),
      media: chartData.reduce((acc, curr) => acc + curr.media, 0),
      alta: chartData.reduce((acc, curr) => acc + curr.alta, 0),
    }),
    [chartData]
  );

  if (isLoading) {
    return (
      <div className="w-full grid place-items-center gap-2">
        <Skeleton className="w-full h-48" />
        <Skeleton className="w-full h-8" />
        <Skeleton className="w-full h-8" />
      </div>
    );
  }

  if (isError || !data) {
    return <div>Ocorreu um erro ao buscar os dados.</div>;
  }

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Intensidades dos treinos</CardTitle>
        </div>

        <div className="flex">
          {["baixa", "media", "alta"].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[chart as keyof typeof total].toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        {chartData.length >= 1 && (
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[250px] w-full"
          >
            <BarChart
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const [year, month] = value.split("-");
                  return `${month}/${year}`;
                }}
              />
              <YAxis />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="w-[150px]"
                    nameKey={activeChart}
                    labelFormatter={(value) => {
                      return value; // Mantém a data original no tooltip
                    }}
                  />
                }
              />
              <Bar
                dataKey={activeChart}
                fill={chartConfig[activeChart].color}
              />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <small className="leading-none text-muted-foreground">
          Mostrando contagem de intensidades dos treino
        </small>
      </CardFooter>
    </Card>
  );
};
