import { AbrirNovaDieta } from "@/features/dietas/components/abrir-nova-dieta";
import { PlanoDiario } from "@/features/dietas/components/plano-diario";
import { Calendario } from "@/features/treinos/components/calendario";

export default function Dietas() {
  return (
    <main className="space-y-4">
      <div className="w-full bg-accent rounded-2xl max-lg:flex flex-col gap-y-5 ">
        <div className="w-full flex items-center justify-center flex-col gap-y-8 lg:flex-row lg:justify-between px-4 custom-shadow rounded-2xl">
          <div className="max-lg:fixed bottom-3 right-3">
            <AbrirNovaDieta />
          </div>
          <div className="my-3">
            <Calendario mostraHorario={false} />
          </div>
        </div>
      </div>

      <div className="custom-shadow rounded-2xl p-4 space-y-6 bg-accent">
        <div className="w-full flex items-center justify-between">
          <h4 className="text-lg lg:text-xl font-semibold text-foreground/80">
            Plano diário
          </h4>
        </div>
        <PlanoDiario />
      </div>
    </main>
  );
}
