DO $$ BEGIN
 CREATE TYPE "intensidade" AS ENUM('baixa', 'média', 'alta');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "status" AS ENUM('planejado', 'em_progresso', 'completo', 'cancelado', 'pendente', 'falha');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "tipoExercicio" AS ENUM('Cardio', 'Força', 'Flexibilidade', 'Resistência', 'Equilíbrio', 'HIIT', 'Pilates', 'Yoga', 'Aeróbico', 'Anaeróbico', 'Musculação', 'Alongamento', 'Pliometria');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "treinosDiarios" ADD COLUMN "baixa" "intensidade";--> statement-breakpoint
ALTER TABLE "treinosDiarios" ADD COLUMN "Força" "tipoExercicio";--> statement-breakpoint
ALTER TABLE "treinosDiarios" ADD COLUMN "planejado" "status";--> statement-breakpoint
ALTER TABLE "treinosDiarios" DROP COLUMN IF EXISTS "intensidade";--> statement-breakpoint
ALTER TABLE "treinosDiarios" DROP COLUMN IF EXISTS "tipo_exercicio";--> statement-breakpoint
ALTER TABLE "treinosDiarios" DROP COLUMN IF EXISTS "status";