CREATE TABLE IF NOT EXISTS "historico_consumo_agua" (
	"id" text PRIMARY KEY NOT NULL,
	"dieta_id" text NOT NULL,
	"quantidade" integer NOT NULL,
	"criado_em" timestamp NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "historico_consumo_agua" ADD CONSTRAINT "historico_consumo_agua_dieta_id_dietas_id_fk" FOREIGN KEY ("dieta_id") REFERENCES "dietas"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
