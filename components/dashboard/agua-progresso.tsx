"use client";
import { pegarDietas } from "@/features/dietas/api/pegar-dietas";
import { usarAdicionarAgua } from "@/features/dietas/hooks/usar-adicionar-agua";
import { calcularAgua } from "@/lib/utils";
import { Heat } from "@alptugidin/react-circular-progress-bar";
import { useTheme } from "next-themes";
import { LuGlassWater } from "react-icons/lu";
import { Skeleton } from "../ui/skeleton";
import { resetarAgua } from "@/features/treinos/api/resetar-agua";
import { GrPowerReset } from "react-icons/gr";

export const AguaProgresso = () => {
  const { theme } = useTheme();
  const { abrir, fechar } = usarAdicionarAgua();
  const { data, isLoading } = pegarDietas();
  const mutation = resetarAgua();

  const on = () => {
    mutation.mutate(
      {},
      {
        onSuccess: () => {
          fechar();
          window.location.reload();
        },
      }
    );
  };

  const text = theme === "dark" ? "#fff" : "#000";

  if (isLoading) {
    return (
      <div className="w-full flex flex-col gap-2">
        <Skeleton className="w-full h-8" />
        <Skeleton className="w-full h-8" />
        <Skeleton className="w-full h-8" />
      </div>
    );
  }

  const peso = data?.data?.at(0)?.pesoAtual ?? 0;
  let consumoAgua = Number(data?.data?.at(0)?.consumoAgua) ?? 0;
  const aguaTotalRecomendada = calcularAgua(peso);

  // Limitar consumo de água ao máximo recomendado
  if (consumoAgua > aguaTotalRecomendada) {
    consumoAgua = aguaTotalRecomendada;
  }

  let progress =
    aguaTotalRecomendada > 0
      ? Math.min((consumoAgua / aguaTotalRecomendada) * 100, 100)
      : 0;

  if (progress < 0.01) {
    progress = 0;
  }

  const formattedProgress = progress.toFixed(2);

  return (
    <div className="w-72 flex flex-row items-start text-center justify-center gap-y-6 lg:px-2">
      <div className="w-full space-y-2">
        <p className="font-semibold" onClick={on}>
          Consumo de água
        </p>
        <Heat
          progress={Number(formattedProgress)}
          range={{ from: 0, to: 100 }}
          sign={{ value: "%", position: "end" }}
          showValue={true}
          revertBackground={false}
          text={`${
            consumoAgua === aguaTotalRecomendada
              ? "Perfeito"
              : `${consumoAgua} de ${aguaTotalRecomendada} ml total`
          }`}
          sx={{
            barWidth: 5,
            bgColor: "#dadada",
            shape: "threequarters",
            valueSize: 12,
            textSize: 9,
            valueFamily: "Wingdings",
            textFamily: "Wingdings",
            valueWeight: "lighter",
            textWeight: "lighter",
            textColor: text,
            valueColor: text,
            loadingTime: 1000,
            strokeLinecap: "butt",
            valueAnimation: true,
            intersectionEnabled: true,
          }}
        />
      </div>

      <div className="space-y-6">
        <LuGlassWater
          className="size-6 text-blue-500 cursor-pointer"
          onClick={abrir}
        />
        <GrPowerReset
          className="size-6 text-blue-500 cursor-pointer"
          onClick={on}
        />
      </div>
    </div>
  );
};
