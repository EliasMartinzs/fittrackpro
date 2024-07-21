ALTER TABLE "dietas" ADD COLUMN "tipo" text;--> statement-breakpoint
ALTER TABLE "dietas" DROP COLUMN IF EXISTS "comum";