CREATE TABLE IF NOT EXISTS "exercicios" (
	"id" text PRIMARY KEY NOT NULL,
	"author_id" text,
	"nome" text NOT NULL,
	"repeticoes" integer NOT NULL,
	"series" integer NOT NULL,
	"peso" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "treinosDiarios" (
	"id" text PRIMARY KEY NOT NULL,
	"usuario_id" text NOT NULL,
	"dia_da_semana" text NOT NULL,
	"categoria" text NOT NULL,
	"duracao" integer NOT NULL,
	"intensidade" text NOT NULL,
	"tipo_exercicio" text,
	"status" text DEFAULT 'planejado' NOT NULL,
	"notas" text,
	"criado_em" timestamp DEFAULT now()
);
--> statement-breakpoint
DROP TABLE "usuarios";