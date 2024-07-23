import { db } from "@/db/db";
import {
  alimentos,
  DietaCompleta,
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
  .get("/refeicoes", clerkMiddleware(), async (c) => {
    try {
      const auth = getAuth(c);

      if (!auth?.userId) {
        return c.json({ error: "Usuário não autenticado" }, { status: 401 });
      }

      const dietaData = await db
        .select()
        .from(dietas)
        .where(and(eq(dietas.usuarioId, auth.userId)));
      if (dietaData.length === 0) {
        return c.json({ error: "Dieta não encontrada" }, { status: 404 });
      }

      const dietaDetalhes = await Promise.all(
        dietaData.map(async (dieta) => {
          const refeicaoData = await db
            .select()
            .from(refeicoes)
            .where(eq(refeicoes.dietaId, dieta.id));

          const refeicoesComAlimentos = await Promise.all(
            refeicaoData.map(async (refeicao) => {
              const alimentosData = await db
                .select()
                .from(alimentos)
                .where(eq(alimentos.refeicoesId, refeicao.id));
              console.log(
                `Refeições para dieta ${dieta.id}:`,
                JSON.stringify(refeicaoData, null, 2)
              );
              return { ...refeicao, alimentos: alimentosData };
            })
          );

          return { ...dieta, refeicoes: refeicoesComAlimentos };
        })
      );

      const data = dietaDetalhes as DietaCompleta[];

      return c.json({ data });
    } catch (error) {
      console.error("Erro interno do servidor:", error);
      return c.json({ error: "Erro interno do servidor" }, { status: 500 });
    }
  })
  .get("/", clerkMiddleware(), async (c) => {
    const auth = getAuth(c);

    if (!auth?.userId) {
      return c.json({ error: "Usuário não autenticado" });
    }

    const data = await db
      .select()
      .from(dietas)
      .where(eq(dietas.usuarioId, auth.userId));

    return c.json({ data });
  })
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
        caloriasGastaPorDia: true,
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
        return c.json(
          { error: "Uma dieta com esse nome e tipo já existe" },
          400
        );
      }

      try {
        // Criar a nova dieta
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
