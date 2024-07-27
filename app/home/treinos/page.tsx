import { AbrirNovoTreino } from "@/features/treinos/components/abrir-novo-treino";
import { Calendario } from "@/features/treinos/components/calendario";
import { MeusTreinos } from "@/features/treinos/components/meus-treinos";
import { TreinoDetalhe } from "@/features/treinos/components/treino-detalhes";

export default function Treinos() {
  return (
    <main className="space-y-6">
      <h2 className="font-medium text-2xl">Meus treinos</h2>

      <div className="w-full bg-accent rounded-2xl max-lg:flex flex-col gap-y-5 ">
        <div className="w-full flex items-center justify-center flex-col gap-y-8 lg:flex-row lg:justify-between px-4 custom-shadow rounded-2xl">
          <div className="max-lg:fixed bottom-3 right-3">
            <AbrirNovoTreino />
          </div>
          <div className="my-3">
            <Calendario mostraHorario />
          </div>
        </div>
      </div>

      <div className="custom-shadow rounded-2xl p-4 space-y-6 bg-accent">
        <div className="w-full flex items-center justify-between">
          <h4 className="text-lg lg:text-xl font-semibold text-foreground/80">
            Meus treinos
          </h4>
        </div>

        <MeusTreinos />
      </div>
      <div className="custom-shadow rounded-2xl p-4 space-y-6 bg-accent">
        <div className="w-full flex items-center justify-between">
          <h4 className="text-lg lg:text-xl font-semibold text-foreground/80">
            Detalhes
          </h4>
        </div>

        <TreinoDetalhe />
      </div>
    </main>
  );
}
