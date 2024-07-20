import { relations } from "drizzle-orm";
import { integer, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

// Enums
export const tipoExercicioEnum = pgEnum("tipoExercicio", [
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

export const intensidadeEnum = pgEnum("intensidade", [
  "baixa",
  "media",
  "alta",
]);

// Tabela de Treinos
export const treinos = pgTable("treinos", {
  id: text("id").primaryKey(),
  diaDaSemana: text("dia_da_semana").notNull(),
  horarioTreino: text("horario_treino").notNull(),
  usuarioId: text("usuario_id").notNull(),
  criadoEm: timestamp("criado_em", { mode: "date" }).defaultNow(),
});

// Tabela de Treinos Diários
export const treinosDiarios = pgTable("treinosDiarios", {
  id: text("id").primaryKey(),
  treinoId: text("treino_id").notNull(),
  diaDaSemana: text("dia_da_semana").notNull(),
  nomeExercisio: text("nome_exercisio").notNull(),
  categoria: text("categoria").notNull(),
  tipoExercicio: tipoExercicioEnum("Força"),
  horarioTreino: text("horario_treino"),
  intensidade: text("intensidade"),
  series: integer("series"),
  repeticoes: integer("repeticoes"),
  notas: text("notas"),
  criadoEm: timestamp("criado_em", { mode: "date" }).defaultNow(),
});

// Relações
export const treinosRelacao = relations(treinos, ({ many }) => ({
  treinosDiarios: many(treinosDiarios),
}));

export const treinosDiariosRelacao = relations(treinosDiarios, ({ one }) => ({
  treino: one(treinos, {
    fields: [treinosDiarios.treinoId],
    references: [treinos.id],
  }),
}));

// Schemas de Inserção
export const inserirTreinos = createInsertSchema(treinos);
export const inserirTreinosDiarios = createInsertSchema(treinosDiarios);
