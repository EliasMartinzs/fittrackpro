ALTER TABLE "treinosDiarios" ADD COLUMN "Manha" "horario_treino";--> statement-breakpoint
ALTER TABLE "treinosDiarios" DROP COLUMN IF EXISTS "manha";