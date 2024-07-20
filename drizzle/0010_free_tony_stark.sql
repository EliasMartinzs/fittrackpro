DO $$ BEGIN
 CREATE TYPE "intensidade" AS ENUM('baixa', 'media', 'alta');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TYPE "status" ADD VALUE 'incompleto';--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "statusTreinos" (
	"id" text PRIMARY KEY NOT NULL,
	"treino_diario_id" text NOT NULL,
	"incompleto" "status",
	"data_conclusao" timestamp,
	"notas" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "treinos" (
	"id" text PRIMARY KEY NOT NULL,
	"nome_treino" text NOT NULL,
	"usuario_id" text NOT NULL,
	"criado_em" timestamp DEFAULT now()
);
--> statement-breakpoint
DROP TABLE "exercicios";--> statement-breakpoint
ALTER TABLE "treinosDiarios" ADD COLUMN "treino_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "treinosDiarios" ADD COLUMN "baixa" "intensidade";--> statement-breakpoint
ALTER TABLE "treinosDiarios" ADD COLUMN "series" integer;--> statement-breakpoint
ALTER TABLE "treinosDiarios" ADD COLUMN "repeticoes" integer;--> statement-breakpoint
ALTER TABLE "treinosDiarios" DROP COLUMN IF EXISTS "usuario_id";