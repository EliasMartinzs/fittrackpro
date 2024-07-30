import { Wrapper } from "@/components/global/wrapper,";
import { AbrirNovaDieta } from "@/features/dietas/components/abrir-nova-dieta";
import { AbrirNovaRefeicao } from "@/features/dietas/components/abrir-nova-refeicao";
import { AbrirNovoAlimento } from "@/features/dietas/components/abrir-novo-alimento";
import { PlanoDiario } from "@/features/dietas/components/plano-diario";
import { Calendario } from "@/features/treinos/components/calendario";

export default function Dietas() {
  return (
    <Wrapper className="space-y-6">
      <h2 className="font-medium text-2xl">Minhas dietas</h2>

      <div className="w-full border-2 border-accent rounded-2xl max-lg:flex flex-col gap-y-5 ">
        <div className="w-full flex items-center justify-center flex-col gap-y-8 lg:flex-row lg:justify-between px-4 custom-shadow rounded-2xl">
          <div className="max-lg:fixed bottom-3 right-3">
            <AbrirNovaDieta />
          </div>
          <div className="my-3">
            <Calendario />
          </div>
        </div>
      </div>

      <div className="custom-shadow rounded-2xl p-4 space-y-6 border-2 border-accent w-full">
        <div className="w-full flex items-center justify-between">
          <h4 className="text-lg lg:text-xl font-semibold">Dieta</h4>
          <div className="flex gap-x-3 items-center">
            <AbrirNovaRefeicao />
            <AbrirNovoAlimento />
          </div>
        </div>
        <div className="my-3">
          <PlanoDiario />
        </div>
      </div>
    </Wrapper>
  );
}
