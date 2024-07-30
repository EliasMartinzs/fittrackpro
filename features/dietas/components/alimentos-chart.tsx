import * as React from "react";
import { Pie, PieChart, Label } from "recharts";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartTooltip,
  ChartTooltipContent,
  ChartContainer,
  ChartConfig,
} from "@/components/ui/chart";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

type Props = {
  data: {
    id: string;
    nome: string;
    horario: string;
    alimentos: {
      id: string;
      nome: string;
      quantidade: number;
      calorias: number | null;
      proteinas: number | null;
      carboidratos: number | null;
    }[];
  };
};

export const AlimentosChart = ({ data }: Props) => {
  const { theme } = useTheme();
  const somaCalorias = data.alimentos.reduce(
    (acc, curr) => acc + curr?.calorias!,
    0
  );
  const somaProteinas = data.alimentos.reduce(
    (acc, curr) => acc + curr?.proteinas!,
    0
  );
  const somaCarboidratos = data.alimentos.reduce(
    (acc, curr) => acc + curr?.carboidratos!,
    0
  );

  const chartConfig = {
    total: {
      label: "Visitors",
    },
    proteinas: {
      label: "Proteínas",
      color: "hsl(var(--chart-1))",
    },
    carboridratos: {
      label: "Carboidratos",
      color: "hsl(var(--chart-2))",
    },
    calorias: {
      label: "Calórias",
      color: "hsl(var(--chart-3))",
    },
  } satisfies ChartConfig;

  const chartData = [
    { name: "Proteínas", value: somaProteinas, fill: "hsl(210, 70%, 50%)" },
    {
      name: "Carboidratos",
      value: somaCarboidratos,
      fill: "hsl(120, 70%, 50%)",
    },
    { name: "Calorias", value: somaCalorias, fill: "hsl(0, 70%, 50%)" },
  ];

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle className="space-y-1">
          <small className="font-extralight">Plano</small>
          <div className="flex items-center">
            <p>{data.nome}</p>
          </div>
        </CardTitle>
      </CardHeader>
      {data.alimentos.length === 0 ? (
        <CardContent className="flex-1 text-center font-extralight my-5">
          Adicione alimentos para visualizar as estatísticas detalhadas.
        </CardContent>
      ) : (
        <CardContent className="flex-1 pb-0 text-foreground">
          <ChartContainer config={chartConfig} className="">
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                outerRadius={80}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="font-bold text-4xl text-foreground fill-foreground"
                            fill={theme === "dark" ? "#fff" : "#000"}
                          >
                            {somaCalorias.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-foreground text-foreground"
                            fill={theme === "dark" ? "#fff" : "#000"}
                          >
                            Kcal
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
      )}
      {data.alimentos.length !== 0 && (
        <CardFooter className="w-full flex items-center justify-center gap-x-3">
          {chartData.map((c) => (
            <div key={c.name} className="flex items-center gap-x-3">
              <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg">
                <circle cx="5" cy="5" r="5" fill={c.fill} />
              </svg>
              {c.name}
            </div>
          ))}
        </CardFooter>
      )}
    </Card>
  );
};
