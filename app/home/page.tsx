import { CategoriasChart } from "@/components/dashboard/categorias-chart";
import { IntensidadeChart } from "@/components/dashboard/intensidade-chart";
import { Wrapper } from "@/components/global/wrapper,";
import { AguaProgresso } from "@/components/dashboard/agua-progresso";

export default function Dashbaord() {
  return (
    <Wrapper className="space-y-6">
      <h2 className="font-medium text-2xl">Dashboard</h2>

      <div className="flex flex-col lg:flex-row gap-3">
        <div className="lg:max-w-96">
          <CategoriasChart />
        </div>
        <div className="flex-1">
          <IntensidadeChart />
        </div>
      </div>

      <div className="w-full max-lg:flex items-center justify-center">
        <AguaProgresso />
      </div>
    </Wrapper>
  );
}
