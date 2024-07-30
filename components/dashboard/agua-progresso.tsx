"use client";
import { pegarDietas } from "@/features/dietas/api/pegar-dietas";
import { usarAdicionarAgua } from "@/features/dietas/hooks/usar-adicionar-agua";
import { calcularAgua } from "@/lib/utils";
import { Heat } from "@alptugidin/react-circular-progress-bar";
import { useTheme } from "next-themes";
import { LuGlassWater } from "react-icons/lu";
import { Skeleton } from "../ui/skeleton";

export const AguaProgresso = () => {
  const { theme } = useTheme();
  const { abrir } = usarAdicionarAgua();
  const { data, isLoading } = pegarDietas();

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

  return (
    <div className="w-72 flex flex-row items-start justify-center gap-3 lg:px-2">
      <div className="w-full space-y-2">
        <p className="font-semibold">Consumo de água</p>
        <Heat
          progress={Number(data?.data?.at(0)?.consumoAgua)}
          range={{ from: 0, to: 100 }}
          sign={{ value: "ml", position: "end" }}
          showValue={true}
          revertBackground={false}
          text={`${calcularAgua(data?.data?.at(0)?.pesoDieta!)} total`}
          sx={{
            barWidth: 5,
            bgColor: "#dadada",
            shape: "half",
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

      <LuGlassWater
        className="size-8 text-blue-500 cursor-pointer"
        onClick={abrir}
      />
    </div>
  );
};
