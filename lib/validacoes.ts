import * as z from "zod";

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
