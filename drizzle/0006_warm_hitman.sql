DO $$ BEGIN
 CREATE TYPE "horario_treino" AS ENUM('manha', 'tarde', 'noite');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "treinosDiarios" ADD COLUMN "manha" "horario_treino";--> statement-breakpoint
ALTER TABLE "treinosDiarios" DROP COLUMN IF EXISTS "duracao";--> statement-breakpoint
ALTER TABLE "treinosDiarios" DROP COLUMN IF EXISTS "planejado";