CREATE TABLE IF NOT EXISTS "usuarios" (
	"id" text PRIMARY KEY NOT NULL,
	"nome" text NOT NULL,
	"email" text NOT NULL,
	"image" text,
	"criado_em" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DROP TABLE "users";