DO $$ BEGIN
 CREATE TYPE "intensidade" AS ENUM('baixa', 'media', 'alta');
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
CREATE TABLE IF NOT EXISTS "alimentos" (
	"id" text PRIMARY KEY NOT NULL,
	"refeicoes_id" text NOT NULL,
	"nome" text NOT NULL,
	"quantidade" integer NOT NULL,
	"calorias" integer,
	"proteinas" integer,
	"carboidratos" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dietas" (
	"id" text PRIMARY KEY NOT NULL,
	"usuario_id" text NOT NULL,
	"tipo" text,
	"nome_da_dieta" text NOT NULL,
	"descricao" text,
	"calorias_gastas_por_dia" integer,
	"criado_em" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "refeicoes" (
	"id" text PRIMARY KEY NOT NULL,
	"dieta_id" text NOT NULL,
	"nome" text NOT NULL,
	"horario" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "treinos" (
	"id" text PRIMARY KEY NOT NULL,
	"dia_da_semana" text NOT NULL,
	"horario_treino" text NOT NULL,
	"usuario_id" text NOT NULL,
	"criado_em" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "treinosDiarios" (
	"id" text PRIMARY KEY NOT NULL,
	"treino_id" text NOT NULL,
	"dia_da_semana" text NOT NULL,
	"nome_exercisio" text NOT NULL,
	"categoria" text NOT NULL,
	"tipo_exercicio" "tipoExercicio" DEFAULT 'Aeróbico',
	"horario_treino" text,
	"intensidade" "intensidade" DEFAULT 'baixa',
	"series" integer,
	"repeticoes" integer,
	"notas" text,
	"criado_em" timestamp DEFAULT now()
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
