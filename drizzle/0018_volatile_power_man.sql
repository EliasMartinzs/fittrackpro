ALTER TABLE "treinosDiarios" ADD COLUMN "intensidade" text;--> statement-breakpoint
ALTER TABLE "treinosDiarios" DROP COLUMN IF EXISTS "baixa";