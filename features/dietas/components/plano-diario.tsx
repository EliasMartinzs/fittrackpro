"use client";

import { Loading } from "@/components/global/loading";
import { calcularAgua } from "@/lib/utils";
import { IoMdBody } from "react-icons/io";
import { IoWaterOutline } from "react-icons/io5";
import { pegarDietas } from "../api/pegar-dietas";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { usarNovoPesoAtual } from "../hooks/user-novo-peso-atual";
import { AlimentosChart } from "./alimentos-chart";
import { deletarDieta } from "../api/deletar-dieta";
import { useConfirm } from "@/hooks/use-confirm";
import { useTheme } from "next-themes";

export const PlanoDiario = () => {
  const { data, isLoading } = pegarDietas();
  const { abrir } = usarNovoPesoAtual();
  const deletarDietaMutation = deletarDieta();
  const [ConfirmationDialog, confirm] = useConfirm(
    "Você tem certeza de que deseja excluir sua dieta?",
    ""
  );
  const { theme } = useTheme();

  if (isLoading) {
    return (
      <div className="w-full flex justify-center">
        <Loading width={32} height={32} />
      </div>
    );
  }

  if (
    Array.isArray(data?.data) &&
    data?.data !== undefined &&
    data?.data.length === 0
  ) {
    return (
      <div className="text-center max-lg:mx-2 flex flex-col items-center gap-y-6 py-4">
        <p className="font-extralight">
          Não há dietas criadas ainda. Para começar a acompanhar suas metas e
          gerenciar sua alimentação, crie uma dieta agora
        </p>
        {theme === "dark" ? (
          <Image
            src="/diet-dark.svg"
            width={100}
            height={100}
            alt="dieta icone"
          />
        ) : (
          <Image
            src="/diet-light.svg"
            width={100}
            height={100}
            alt="dieta icone"
          />
        )}
      </div>
    );
  }

  async function onDeletarDieta(id: string) {
    const ok = await confirm();

    if (ok) {
      deletarDietaMutation.mutate({
        id: id,
      });
    }
  }

  return (
    <div className="space-y-6">
      <ConfirmationDialog />
      {data?.data.map((dieta) => (
        <div key={dieta.id} className="space-y-6">
          <div className="flex flex-col space-y-6">
            <div>
              <div className="w-full flex items-center justify-between">
                <h6 className="font-semibold text-lg">{dieta.nome}</h6>
                <Trash2
                  className="size-5 cursor-pointer"
                  onClick={() => onDeletarDieta(dieta.id)}
                />
              </div>
              <p className="text-sm font-extralight text-muted-foreground">
                {dieta.descricao}
              </p>
            </div>

            <div className="space-y-2">
              {/* Estatisticas */}
              <div className="flex gap-2">
                <div
                  className="flex-1 bg-background rounded-lg p-4 space-y-6"
                  onClick={() => abrir(dieta.id)}
                >
                  <div className="w-full flex items-center justify-between">
                    <h6 className="font-medium text-lg">Peso corporal</h6>
                    <IoMdBody className="size-5" />
                  </div>
                  <div className="flex gap-3">
                    <div className="flex flex-1 flex-col items-center justify-center bg-accent gap-1 rounded-lg p-3 hover:bg-primary cursor-pointer">
                      {dieta.pesoAtual === null ? (
                        <Button onClick={() => abrir(dieta.id)}>
                          {<Plus />}
                        </Button>
                      ) : (
                        <p
                          onClick={() => abrir(dieta.id)}
                          className="font-semibold text-lg whitespace-nowrap"
                        >
                          {dieta.pesoAtual}
                          <small>kg</small>
                        </p>
                      )}
                      <p className="font-extralight">Atual</p>
                    </div>
                    <div className="flex flex-1 flex-col items-center bg-accent gap-1 rounded-lg p-3">
                      <p className="font-semibold text-lg whitespace-nowrap">
                        {dieta.pesoDieta} <small>kg</small>
                      </p>
                      <p className="font-extralight">Objetivo</p>
                    </div>
                  </div>
                </div>
                <div className="flex-1 bg-background rounded-lg p-4 space-y-4">
                  <div className="w-full flex items-center justify-between">
                    <h6 className="font-medium text-lg">Água</h6>{" "}
                    <IoWaterOutline className="size-5" />
                  </div>
                  <div className="flex gap-3">
                    <div className="flex flex-col items-start justify-center gap-y-3">
                      <h6>Meta de Água</h6>
                      <p className="text-2xl font-bold">
                        {dieta.pesoAtual !== null ? (
                          calcularAgua(dieta.pesoAtual!)
                        ) : (
                          <small className="text-sm font-extralight text-center">
                            Informe seu peso para calcular a quantidade ideal de
                            água.
                          </small>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid-container">
                {data?.data?.at(0)?.refeicoes.map((refeicao) => (
                  <div key={refeicao.id}>
                    <AlimentosChart data={refeicao} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Refeicoes */}
          <div className="space-y-2">
            <h6 className="font-semibold text-2xl">Refeições</h6>
            <div className="flex flex-col gap-y-3">
              {dieta.refeicoes.length === 0 ? (
                <p className="text-muted-foreground">
                  Nenhuma refeição criada até o momento!
                </p>
              ) : (
                dieta.refeicoes.map((refeicao) => (
                  <Accordion key={refeicao.id} type="single" collapsible>
                    <AccordionItem value={refeicao.nome}>
                      <AccordionTrigger className="bg-accent rounded-lg px-2">
                        <div className="flex items-center">
                          <div className="flex items-center">
                            <div className="p-1 grid place-items-center bg-primary rounded-md mr-2">
                              <Image
                                src="/talher.svg"
                                alt="talher icon"
                                width={32}
                                height={32}
                              />
                            </div>
                            <p className="font-semibold">{refeicao.horario}</p>
                          </div>
                          <div className="px-2">-</div>
                          <div>
                            <p>
                              {refeicao.nome.charAt(0).toUpperCase()}
                              {refeicao.nome.slice(1)}
                            </p>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="space-y-2 p-2 capitalize">
                        {refeicao.alimentos.length === 0 ? (
                          <p>
                            Nenhuma alimento adicionado a refeição até o momento
                          </p>
                        ) : (
                          refeicao.alimentos.map((alimento) => (
                            <div key={alimento.id}>
                              <div className="">
                                <p className="font-semibold text-lg">
                                  {alimento.nome}
                                </p>
                                <p>{alimento.quantidade} grama(s)</p>
                              </div>
                            </div>
                          ))
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ))
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
