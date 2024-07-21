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

export const treinos = pgTable("treinos", {
  id: text("id").primaryKey(),
  diaDaSemana: text("dia_da_semana").notNull(),
  horarioTreino: text("horario_treino").notNull(),
  usuarioId: text("usuario_id").notNull(),
  criadoEm: timestamp("criado_em", { mode: "date" }).defaultNow(),
});

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

export const treinosRelacao = relations(treinos, ({ many }) => ({
  treinosDiarios: many(treinosDiarios),
}));

export const treinosDiariosRelacao = relations(treinosDiarios, ({ one }) => ({
  treino: one(treinos, {
    fields: [treinosDiarios.treinoId],
    references: [treinos.id],
  }),
}));

export const dietas = pgTable("dietas", {
  id: text("id").primaryKey(),
  usuarioId: text("usuario_id").notNull(),
  tipo: text("tipo"),
  nome: text("nome_da_dieta").notNull(),
  descricao: text("descricao"),
  criadoEm: timestamp("criado_em", { mode: "date" }).defaultNow(),
});

export const dietasRelacoes = relations(dietas, ({ many }) => ({
  refeicoes: many(refeicoes),
}));

export const refeicoes = pgTable("refeicoes", {
  id: text("id").primaryKey(),
  dietaId: text("dieta_id")
    .references(() => dietas.id)
    .notNull(),
  nome: text("nome").notNull(),
  horario: timestamp("time", { mode: "date" }).notNull(),
});

export const refeicoesRelacoes = relations(refeicoes, ({ one, many }) => ({
  dieta: one(dietas, {
    fields: [refeicoes.dietaId],
    references: [dietas.id],
  }),
  alimentos: many(alimentos),
}));

export const alimentos = pgTable("alimentos", {
  id: text("id").primaryKey(),
  refeicoesId: text("refeicoes_id")
    .references(() => refeicoes.id)
    .notNull(),
  nome: text("nome").notNull(),
  quantidade: text("quantidade").notNull(),
  calorias: text("calorias"),
  proteinas: text("proteinas"),
  carboidratos: text("categoria"),
});

export const alimentosRelacoes = relations(alimentos, ({ one }) => ({
  alimentos: one(refeicoes),
}));

// Schemas de Inserção
export const inserirTreinos = createInsertSchema(treinos);
export const inserirTreinosDiarios = createInsertSchema(treinosDiarios);
export const inserirDietas = createInsertSchema(dietas);
export const inserirRefeicoes = createInsertSchema(refeicoes);
export const inserirAlimentos = createInsertSchema(alimentos);
