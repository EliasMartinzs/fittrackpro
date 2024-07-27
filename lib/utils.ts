import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { diasDaSemana } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function pegarHorarioDoDia() {
  const now = new Date();
  const hours = now.getHours();

  if (hours >= 5 && hours < 12) {
    return "Manhã";
  } else if (hours >= 12 && hours < 18) {
    return "Tarde";
  } else {
    return "Noite";
  }
}

export function gerarDiasDaSemana() {
  const hoje = new Date();
  const dias = [];

  for (let i = 0; i < 7; i++) {
    const diaAtual = new Date(hoje);
    diaAtual.setDate(hoje.getDate() + i - hoje.getDay());
    const diaSemana = diasDaSemana[diaAtual.getDay()];
    const data = `${("0" + diaAtual.getDate()).slice(-2)}/${(
      "0" +
      (diaAtual.getMonth() + 1)
    ).slice(-2)}`;
    dias.push({
      diaSemana,
      data,
      hoje: diaAtual.toDateString() === hoje.toDateString(),
    });
  }

  return dias;
}

export function obterDiaDaSemana() {
  const dataAtual = new Date();
  const diaDaSemana = dataAtual.getDay(); // Retorna um número de 0 (Domingo) a 6 (Sábado)

  return diasDaSemana[diaDaSemana].slice(0, 3);
}

export function calcularAgua(peso: number) {
  const mlPorPeso = 50;
  const consumoAgua = peso * mlPorPeso;

  return `${consumoAgua}ml`;
}
