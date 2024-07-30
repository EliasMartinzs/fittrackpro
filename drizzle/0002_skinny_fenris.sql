ALTER TABLE "alimentos" DROP CONSTRAINT "alimentos_refeicoes_id_refeicoes_id_fk";
--> statement-breakpoint
ALTER TABLE "refeicoes" DROP CONSTRAINT "refeicoes_dieta_id_dietas_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "alimentos" ADD CONSTRAINT "alimentos_refeicoes_id_refeicoes_id_fk" FOREIGN KEY ("refeicoes_id") REFERENCES "refeicoes"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "refeicoes" ADD CONSTRAINT "refeicoes_dieta_id_dietas_id_fk" FOREIGN KEY ("dieta_id") REFERENCES "dietas"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
