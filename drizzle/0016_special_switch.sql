DROP TABLE "statusTreinos";--> statement-breakpoint
ALTER TABLE "treinos" ADD COLUMN "dia_da_semana" text NOT NULL;--> statement-breakpoint
ALTER TABLE "treinos" ADD COLUMN "criado_em" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "treinosDiarios" ADD COLUMN "criado_em" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "treinos" DROP COLUMN IF EXISTS "nome_treino";