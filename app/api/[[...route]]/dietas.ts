import { db } from "@/db/db";
import {
  alimentos,
  dietas,
  historicoConsumoAgua,
  inserirAlimentos,
  inserirDietas,
  inserirRefeicoes,
  refeicoes,
} from "@/db/schema";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { createId } from "@paralleldrive/cuid2";
import { and, eq, inArray, sql } from "drizzle-orm";
import { Hono } from "hono";

const app = new Hono()
  .get("/", clerkMiddleware(), async (c) => {
    const auth = getAuth(c);

    if (!auth?.userId) {
      return c.json({ error: "deu bo aqui" });
    }

    const dietasData = await db
      .select()
      .from(dietas)
      .where(eq(dietas.usuarioId, auth.userId));

    if (dietasData.length === 0) {
      return c.json({
        data: dietasData.map((dieta) => ({
          ...dieta,
        })),
      });
    }

    const refeicoesData = await db
      .select()
      .from(refeicoes)
      .where(
        inArray(
          refeicoes.dietaId,
          dietasData.map((d) => d.id)
        )
      );

    if (refeicoesData.length === 0) {
      return c.json({
        data: dietasData.map((dieta) => ({
          ...dieta,
          refeicoes: [],
        })),
      });
    }

    const alimentosData = await db
      .select()
      .from(alimentos)
      .where(
        inArray(
          alimentos.refeicoesId,
          refeicoesData.map((r) => r.id)
        )
      );

    const parseTime = (timeString: string) => {
      const [hours, minutes] = timeString.split(":").map(Number);
      return new Date(0, 0, 0, hours, minutes);
    };

    const sortedRefeicoesData = refeicoesData.sort((a, b) => {
      const timeA = parseTime(a.horario);
      const timeB = parseTime(b.horario);
      return timeA.getTime() - timeB.getTime();
    });

    const result = dietasData.map((dieta) => ({
      ...dieta,
      refeicoes: sortedRefeicoesData
        .filter((refeicao) => refeicao.dietaId === dieta.id)
        .map((refeicao) => ({
          ...refeicao,
          alimentos: alimentosData.filter(
            (alimento) => alimento.refeicoesId === refeicao.id
          ),
        })),
    }));

    return c.json({ data: result });
  })
  .post(
    "/adicionar-agua",
    clerkMiddleware(),
    zValidator(
      "json",
      inserirDietas.pick({
        consumoAgua: true,
      })
    ),
    async (c) => {
      const auth = getAuth(c);
      const { consumoAgua } = c.req.valid("json");

      if (!auth?.userId) {
        return c.json({ error: "deu bo aqui" });
      }

      const data = await db
        .update(dietas)
        .set({
          consumoAgua: sql`${dietas.consumoAgua} + ${consumoAgua}`,
        })
        .where(and(eq(dietas.usuarioId, auth.userId)));

      return c.json({ data });
    }
  )
  .post("/resetar-agua", clerkMiddleware(), async (c) => {
    const auth = getAuth(c);

    if (!auth?.userId) {
      return c.json({ error: "Usuário não autenticado" }, 401);
    }

    try {
      const [dataDieta] = await db
        .update(dietas)
        .set({ consumoAgua: 0 })
        .where(eq(dietas.usuarioId, auth.userId))
        .returning({ id: dietas.id, quantidade: dietas.consumoAgua });

      if (!dataDieta) {
        return c.json({ error: "Falha ao atualizar o consumo de água" }, 500);
      }

      await db.insert(historicoConsumoAgua).values({
        id: createId(),
        criadoEm: new Date().toISOString(),
        dietaId: dataDieta.id,
        quantidade: dataDieta.quantidade!,
      });

      return c.json({ message: "Consumo de água resetado com sucesso!" });
    } catch (error) {
      console.error("Erro ao resetar consumo de água:", error);
      return c.json({ error: "Erro ao resetar consumo de água" }, 500);
    }
  })
  .post(
    "/atualizar-peso",
    clerkMiddleware(),
    zValidator(
      "json",
      inserirDietas.pick({
        id: true,
        pesoAtual: true,
      })
    ),
    async (c) => {
      const auth = getAuth(c);
      const { id, pesoAtual } = c.req.valid("json");

      if (!auth?.userId) {
        return c.json({ error: "deu bo aqui" });
      }

      if (!id) {
        return c.json({ error: "Id não encontrado!" });
      }

      const data = await db
        .update(dietas)
        .set({
          pesoAtual: pesoAtual,
        })
        .where(and(eq(dietas.id, id), eq(dietas.usuarioId, auth.userId)))
        .returning({ id: dietas.id });

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
      } catch (error) {
        console.error(error);
        return c.json({ error: "Erro ao criar a refeição" }, 500);
      }
    }
  )
  .post(
    "/",
    clerkMiddleware(),
    zValidator(
      "json",
      inserirDietas.pick({
        nome: true,
        descricao: true,
        tipo: true,
        caloriasGastaPorDia: true,
        pesoDieta: true,
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
        .where(eq(dietas.usuarioId, auth.userId))
        .limit(1);

      if (dietaExistente.length > 0) {
        return c.json(
          { error: "Você já possui uma dieta cadastrada no sistema" },
          { status: 400 }
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
  )
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

      try {
        const [data] = await db
          .insert(alimentos)
          .values({
            id: createId(),
            ...values,
          })
          .returning({ alimentoId: alimentos.id });

        return c.json({ data });
      } catch (error) {
        console.error(error);
        return c.json({ error: "Erro ao criar o alimento" }, 500);
      }
    }
  )
  .delete(
    "/deletar-dieta",
    clerkMiddleware(),
    zValidator(
      "json",
      inserirDietas.pick({
        id: true,
      })
    ),
    async (c) => {
      const auth = getAuth(c);
      const values = c.req.valid("json");

      if (!auth?.userId) {
        return c.json({ error: "Usuário não autenticado" });
      }

      const data = await db
        .delete(dietas)
        .where(and(eq(dietas.id, values.id), eq(dietas.usuarioId, auth.userId)))
        .returning({
          id: dietas.id,
        });

      return c.json({ data });
    }
  );

export default app;
