import { IconType } from "react-icons/lib";
import { LuGlassWater } from "react-icons/lu";
import { adicionarAgua } from "../api/adicionar-agua";
import { toast } from "sonner";
import { Loading } from "@/components/global/loading";

const quantidadeAgua: { agua: number; icon: IconType }[] = [
  {
    agua: 100,
    icon: LuGlassWater,
  },
  {
    agua: 200,
    icon: LuGlassWater,
  },
  {
    agua: 300,
    icon: LuGlassWater,
  },
  {
    agua: 400,
    icon: LuGlassWater,
  },
];

export const AdicionarAguaForm = () => {
  const adicionarAguaMutation = adicionarAgua();

  const calcularTamanhoDoIcone = (agua: number) => {
    const minSize = 20;
    const maxSize = 50;

    const minAgua = 100;
    const maxAgua = 500;

    return (
      minSize + ((agua - minAgua) / (maxAgua - minAgua)) * (maxSize - minSize)
    );
  };

  function onClick(agua: number) {
    adicionarAguaMutation.mutate(
      {
        json: {
          consumoAgua: agua,
        },
      },
      {
        onSuccess: () => {
          toast(`Consumo de ${agua}ml adicionada com sucesso`);
        },
      }
    );
  }

  if (adicionarAguaMutation.isPending) {
    return (
      <div className="w-full flex items-center justify-center py-6">
        <Loading width={36} height={36} color="muted-foreground" />;
      </div>
    );
  }

  return (
    <div className="space-y-6 flex flex-col items-center justify-center py-6">
      <h4 className="text-xl font-semibold">Água</h4>
      <div className="flex items-center justify-between gap-3">
        {quantidadeAgua.map(({ agua, icon }) => {
          const Icon = icon;
          const IconSize = calcularTamanhoDoIcone(agua);
          return (
            <div
              key={agua}
              className="flex items-center gap-1 cursor-pointer"
              onClick={() => onClick(agua)}
            >
              <Icon size={IconSize} className="text-blue-500" /> <p>{agua}ML</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
