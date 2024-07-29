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
import Image from "next/image";

export const PlanoDiario = () => {
  const { data, isLoading } = pegarDietas();

  if (isLoading) {
    return (
      <div className="w-full flex justify-center">
        <Loading width={32} height={32} />
      </div>
    );
  }

  if (Array.isArray(data?.data) && data?.data.length === 0) {
    return (
      <div className="text-center max-lg:mx-2">
        <p>
          Não há dietas criadas ainda. Para começar a acompanhar suas metas e
          gerenciar sua alimentação,{" "}
          <a href="/criar-dieta">crie uma dieta agora</a>!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {data?.data.map((dieta) => (
        <div key={dieta.id} className="space-y-6">
          <div className="flex flex-col space-y-6">
            <div>
              <h6 className="font-semibold text-2xl">{dieta.nome}</h6>
              <p className="text-muted-foreground">{dieta.descricao}</p>
            </div>

            <div className="flex gap-2 bg">
              <div className="bg-background rounded-lg p-4 space-y-4">
                <div className="w-full flex items-center justify-between">
                  <h6 className="font-medium text-lg">Peso corporal</h6>
                  <IoMdBody className="size-5" />
                </div>
                <div className="flex gap-3">
                  <div className="flex flex-1 flex-col items-center bg-accent gap-1 rounded-lg p-3">
                    <p className="font-semibold text-lg whitespace-nowrap">
                      {dieta.pesoDieta} <small>kg</small>
                    </p>
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
              <div className="bg-background rounded-lg p-4 space-y-4">
                <div className="w-full flex items-center justify-between">
                  <h6 className="font-medium text-lg">Água</h6>{" "}
                  <IoWaterOutline className="size-5" />
                </div>
                <div className="flex gap-3">
                  <div className="flex-1 flex flex-col items-start justify-center gap-y-3">
                    <h6>Meta de Água</h6>
                    <p className="text-2xl font-bold">
                      {calcularAgua(dieta.pesoDieta!)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h6 className="font-semibold text-2xl">Refeições</h6>
            <div className="flex flex-col gap-y-3">
              {dieta.refeicoes.map((refeicao) => (
                <Accordion
                  key={refeicao.id}
                  type="single"
                  collapsible
                  className="border-primary border-b"
                >
                  <AccordionItem value={refeicao.nome}>
                    <AccordionTrigger>
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
                    <AccordionContent>
                      {refeicao.alimentos.length === 0 ? (
                        <p className="text-muted-foreground">
                          Nenhuma alimento adicionado a refeição até o momento
                        </p>
                      ) : (
                        refeicao.alimentos.map((alimento) => (
                          <div key={alimento.id}>
                            <p>
                              {alimento.nome}: {alimento.quantidade} unidades
                            </p>
                          </div>
                        ))
                      )}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
