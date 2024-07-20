ALTER TABLE "treinosDiarios" ADD COLUMN "horario_treino" text;--> statement-breakpoint
ALTER TABLE "treinosDiarios" DROP COLUMN IF EXISTS "Manha";