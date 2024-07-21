DO $$ BEGIN
 CREATE TYPE "tipo_de_dieta" AS ENUM('Comum', 'Dieta Low Carb', 'Dieta DASH', 'Dieta Cetogênica', 'Dieta Dukan', 'Dieta Mediterrânea');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "alimentos" (
	"id" text PRIMARY KEY NOT NULL,
	"refeicoes_id" text NOT NULL,
	"nome" text NOT NULL,
	"quantidade" text NOT NULL,
	"calorias" text,
	"proteinas" text,
	"categoria" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dietas" (
	"id" text PRIMARY KEY NOT NULL,
	"usuario_id" text NOT NULL,
	"comum" "tipo_de_dieta" NOT NULL,
	"nome_da_dieta" text NOT NULL,
	"descricao" text,
	"criado_em" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "refeicoes" (
	"id" text PRIMARY KEY NOT NULL,
	"dieta_id" text NOT NULL,
	"nome" text NOT NULL,
	"time" timestamp NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "alimentos" ADD CONSTRAINT "alimentos_refeicoes_id_refeicoes_id_fk" FOREIGN KEY ("refeicoes_id") REFERENCES "refeicoes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "refeicoes" ADD CONSTRAINT "refeicoes_dieta_id_dietas_id_fk" FOREIGN KEY ("dieta_id") REFERENCES "dietas"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
