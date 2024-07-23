import * as z from "zod";
import { tiposDeDietas } from "./constants";

export const tipoExercicioEnum = z.enum([
  "Cardio",
  "Força",
  "Flexibilidade",
  "Resistência",
  "Equilíbrio",
  "HIIT",
  "Pilates",
  "Yoga",
  "Aeróbico",
  "Anaeróbico",
  "Musculação",
  "Alongamento",
  "Pliometria",
]);
export const categoriasEnum = z.enum([
  "Peito",
  "Costas",
  "Bíceps",
  "Tríceps",
  "Ombros",
  "Pernas",
  "Abdômen",
  "Glúteos",
  "Panturrilhas",
  "Cardio",
  "Funcional",
  "Flexibilidade",
]);
export const diasDaSemanaEnum = z.enum([
  "Dom",
  "Seg",
  "Ter",
  "Qua",
  "Qui",
  "Sex",
  "Sáb",
]);
export const horarioTreinoEnum = z.enum(["manha", "tarde", "noite"]);
export const intensidadeEnum = z.enum(["Baixa", "Média", "Alta"]);

export const treinoSchema = z.object({
  diaDaSemana: diasDaSemanaEnum.default("Seg"),
  nomeExercisio: z.string().min(3, {
    message: "Por favor, Insira o nome do exercicio",
  }),
  categoria: categoriasEnum.default("Bíceps"),
  tipoExercicio: tipoExercicioEnum.default("Força"),
  horarioTreino: horarioTreinoEnum.default("manha"),
  intensidade: intensidadeEnum.default("Baixa"),
  repeticoes: z.number(),
  series: z.number(),
  notas: z.string().optional(),
});

export const tiposDeDietasEnum = z.enum([
  "Comum",
  "Dieta Low Carb",
  "Dieta DASH",
  "Dieta Cetogênica",
  "Dieta Dukan",
  "Dieta Mediterrânea",
  "Bulking",
  "Cutting",
]);

export const schemaPassoUm = z.object({
  nome: z.string().min(1, {
    message: "Nome da dieta é obrigatório",
  }),
  tipo: tiposDeDietasEnum.default("Comum").optional(),
  descricao: z.string().optional(),
  caloriasGastaPorDia: z.number(),
});

export const schemaPassoDois = z.object({
  nome: z.string().min(1, {
    message: "Nome da refeicao é obrigatório",
  }),
  horario: z.string(),
});

export const schemaPassoTres = z.object({
  nome: z.string().min(1, {
    message: "Nome do alimento é obrigatório",
  }),
  quantidade: z.number().min(1, {
    message: "Quantidade é obrigatória",
  }),
  calorias: z.number().optional(),
  proteinas: z.number().optional(),
  carboidratos: z.number().optional(),
});
