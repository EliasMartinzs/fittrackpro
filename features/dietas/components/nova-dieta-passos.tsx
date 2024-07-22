import { useState } from "react";
import { DietaPassoDois } from "./dieta-passo-dois";
import { DietaPassoTres } from "./dieta-passo-tres";
import { DietaPassoUm } from "./dieta-passo-um";
import { PassosNavegacao } from "./passos-navegacao";

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

export const NovaDietaPassos = () => {
  const [passosAtual, setPassosAtual] = useState(0);
  const [dietaId, setDietaId] = useState<string>("");
  const [refeicaoId, setRefeicaoId] = useState<string>("");

  const nextStep = () => setPassosAtual((prev) => prev + 1);
  const prevStep = () => setPassosAtual((prev) => prev - 1);

  const renderStepContent = () => {
    switch (passosAtual) {
      case 0:
        return <DietaPassoUm proximo={nextStep} setDietaId={setDietaId} />;
      case 1:
        return (
          <DietaPassoDois
            proximo={nextStep}
            anterior={prevStep}
            dietaId={dietaId}
            setRefeicaoId={setRefeicaoId}
          />
        );
      case 2:
        return <DietaPassoTres anterior={prevStep} refeicaoId={refeicaoId} />;
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
