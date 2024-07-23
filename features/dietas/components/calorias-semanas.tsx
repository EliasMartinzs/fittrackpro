import { DietaCompleta, Dietas } from "@/db/schema";
import { ResponseTypeRefeicoesPorId } from "../api/pegar-refeicoes";

const diasDaSemana = ["D", "S", "T", "Q", "Q", "S", "S"];

function somarCaloriasPorDieta(dados: DietaCompleta[]) {
  const caloriasPorDieta: { [key: string]: number } = {};

  if (!dados) return caloriasPorDieta;

  dados.forEach((dieta) => {
    let totalCalorias = 0;

    dieta.refeicoes?.forEach((refeicao) => {
      refeicao.alimentos?.forEach((alimento) => {
        if (alimento.calorias !== undefined && alimento.calorias !== null) {
          totalCalorias += alimento.calorias;
        }
      });
    });

    caloriasPorDieta[dieta.nome] = totalCalorias;
  });
  return caloriasPorDieta;
}

const CaloriasSemana = ({ data }: { data: DietaCompleta[] | undefined }) => {
  const soma = somarCaloriasPorDieta(data!);

  return (
    <>
      <div>
        {data?.map((dieta) => (
          <div key={dieta.id}>
            <h2>{dieta.nome}</h2>
            <ul>
              {dieta.refeicoes?.map((refeicao) => (
                <li key={refeicao.id}>
                  {refeicao.nome}
                  <ul>
                    {refeicao.alimentos?.map((alimento) => (
                      <li key={alimento.id}>
                        {alimento.nome}: {alimento.calorias} calorias
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
};

export default CaloriasSemana;
