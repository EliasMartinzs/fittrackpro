import { db } from "@/db/db";
import {
  alimentos,
  dietas,
  inserirAlimentos,
  inserirDietas,
  inserirRefeicoes,
  refeicoes,
} from "@/db/schema";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { createId } from "@paralleldrive/cuid2";
import { and, eq } from "drizzle-orm";
import { Hono } from "hono";
import { cache } from "hono/cache";

const app = new Hono()
  .post(
    "/alimentos",
    clerkMiddleware(),
    zValidator(
      "json",
      inserirAlimentos.pick({
        nome: true,
        proteinas: true,
        calorias: true,
        carboidratos: true,
        quantidade: true,
        refeicoesId: true,
      })
    ),
    async (c) => {
      const auth = getAuth(c);
      const values = c.req.valid("json");

      if (!auth?.userId) {
        return c.json({ error: "Usuário não autenticado" });
      }

      const data = await db.insert(alimentos).values({
        id: createId(),
        ...values,
      });

      return c.json({ data });
    }
  )
  .post(
    "/refeicoes",
    clerkMiddleware(),
    zValidator(
      "json",
      inserirRefeicoes.pick({ nome: true, horario: true, dietaId: true })
    ),
    async (c) => {
      const auth = getAuth(c);
      const values = c.req.valid("json");

      if (!auth?.userId) {
        return c.json({ error: "Usuário não autenticado" });
      }

      const data = await db.insert(refeicoes).values({
        id: createId(),
        ...values,
      });

      return c.json({ data });
    }
  )
  .post(
    "/",
    cache({
      cacheName: "dietas",
      cacheControl: "no-cache",
    }),
    clerkMiddleware(),
    zValidator(
      "form",
      inserirDietas.pick({
        nome: true,
        descricao: true,
        tipo: true,
      })
    ),
    async (c) => {
      const auth = getAuth(c);
      const values = c.req.valid("form");
      if (!auth?.userId) {
        return c.json({ error: "Usuário não autenticado" });
      }

      let { nome } = values;
      console.log(nome);
      const dietaExistente = await db
        .select()
        .from(dietas)
        .where(and(eq(dietas.usuarioId, auth.userId), eq(dietas.nome, nome)))
        .limit(1);

      if (dietaExistente.length > 0) {
        throw new Error("Dieta já existe com esse nome.");
      }

      const data = await db.insert(dietas).values({
        id: createId(),
        usuarioId: auth.userId,
        criadoEm: new Date(),
        ...values,
      });

      return c.json({ data });
    }
  );

export default app;
