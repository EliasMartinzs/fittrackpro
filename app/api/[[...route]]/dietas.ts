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

const app = new Hono()
  .get("")
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

      const [data] = await db
        .insert(alimentos)
        .values({
          id: createId(),
          ...values,
        })
        .returning({ alimentoId: alimentos.id });

      return c.json({ data });
    }
  )
  .post(
    "/refeicoes",
    clerkMiddleware(),
    zValidator(
      "json",
      inserirRefeicoes.pick({
        dietaId: true,
        nome: true,
        horario: true,
      })
    ),
    async (c) => {
      const auth = getAuth(c);
      const values = c.req.valid("json");

      if (!auth?.userId) {
        return c.json({ error: "Usuário não autenticado" }, 401);
      }

      try {
        const [data] = await db
          .insert(refeicoes)
          .values({
            id: createId(),
            dietaId: values.dietaId,
            horario: values.horario,
            nome: values.nome,
          })
          .returning({ refeicaoId: refeicoes.id });

        const refeicaoId = data.refeicaoId;

        return c.json({ refeicaoId });
      } catch (error) {}
    }
  )
  .post(
    "/dietas",
    clerkMiddleware(),
    zValidator(
      "json",
      inserirDietas.pick({
        nome: true,
        descricao: true,
        tipo: true,
      })
    ),
    async (c) => {
      const auth = getAuth(c);
      const values = c.req.valid("json");

      if (!auth?.userId) {
        return c.json({ error: "Usuário não autenticado" });
      }

      const dietaExistente = await db
        .select()
        .from(dietas)
        .where(
          and(
            eq(dietas.usuarioId, auth.userId),
            eq(dietas.nome, values.nome),
            eq(dietas.tipo, values.tipo!)
          )
        )
        .limit(1);

      if (dietaExistente.length > 0) {
        const dietaId = dietaExistente[0]?.id;
        return c.json({ dietaId });
      }

      try {
        const [data] = await db
          .insert(dietas)
          .values({
            id: createId(),
            usuarioId: auth.userId,
            criadoEm: new Date(),
            ...values,
          })
          .returning({ dietaId: dietas.id });

        return c.json({ dietaId: data.dietaId });
      } catch (error) {
        console.error(error);
        return c.json({ error: "Erro ao criar a dieta" }, 500);
      }
    }
  );

export default app;
