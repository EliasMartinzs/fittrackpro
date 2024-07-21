import { schemaPassoDois, schemaPassoTres } from "@/lib/validacoes";
import { useState } from "react";
import { z } from "zod";
import { schemaPassoUm } from "../../../lib/validacoes";
import { DietaPassoDois } from "./dieta-passo-dois";
import { DietaPassoTres } from "./dieta-passo-tres";
import { DietaPassoUm } from "./dieta-passo-um";
import { PassosNavegacao } from "./passos-navegacao";
import { criarNovaDieta } from "../api/criar-nova-dieta";
import { criarNovaRefeicao } from "../api/criar-nova-refeicao";
import { criarNovaAlimento } from "../api/criar-novo-alimento";

const passosData = [
  {
    label: "Step 1",
    content: DietaPassoUm,
  },
  {
    label: "Step 2",
    content: DietaPassoDois,
  },
  {
    label: "Step 3",
    content: DietaPassoTres,
  },
];

type PassoUmData = z.infer<typeof schemaPassoUm>;
type PassoDoisData = z.infer<typeof schemaPassoDois>;
type PassoTresData = z.infer<typeof schemaPassoTres>;

export const NovaDietaPassos = () => {
  const [passosAtual, setPassosAtual] = useState(0);
  const [passoUmData, setPassoUmData] = useState<PassoUmData | null>(null);
  const [passoDoisData, setPassoDoisData] = useState<PassoDoisData | null>(
    null
  );
  const [passoTresData, setPassoTresData] = useState<PassoTresData | null>(
    null
  );
  const criarDietaMutation = criarNovaDieta();
  const criarRefeicaoMutation = criarNovaRefeicao();
  const criarAlimentoMutation = criarNovaAlimento();

  const nextStep = () => setPassosAtual((prev) => prev + 1);
  const prevStep = () => setPassosAtual((prev) => prev - 1);

  const criarDieta = () => {
    criarDietaMutation.mutate({
      nome: passoUmData?.nome!,
      descricao: passoUmData?.descricao,
      tipo: passoUmData?.tipo,
    });
  };

  const renderStepContent = () => {
    switch (passosAtual) {
      case 0:
        return (
          <DietaPassoUm
            proximo={nextStep}
            setPassoUmData={setPassoUmData}
            criarDieta={criarDieta}
          />
        );
      case 1:
        return (
          <DietaPassoDois
            proximo={nextStep}
            anterior={prevStep}
            setPassoDoisData={setPassoDoisData}
          />
        );
      case 2:
        return (
          <DietaPassoTres
            anterior={prevStep}
            setPassoTresData={setPassoTresData}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 mt-5 py-6">
      <PassosNavegacao passosData={passosData} passosAtual={passosAtual} />
      {renderStepContent()}
    </div>
  );
};
