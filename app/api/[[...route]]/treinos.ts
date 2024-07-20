import { db } from "@/db/db";
import { inserirTreinosDiarios, treinos, treinosDiarios } from "@/db/schema";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { createId } from "@paralleldrive/cuid2";
import { format, parseISO } from "date-fns";
import { and, eq, sql } from "drizzle-orm";
import { Hono } from "hono";
import { z } from "zod";

const app = new Hono()
  .get("/intensidade", clerkMiddleware(), async (c) => {
    const auth = getAuth(c);

    if (!auth?.userId) {
      return c.json({ error: "Usuário não autenticado" });
    }

    const treinosData = await db
      .select()
      .from(treinosDiarios)
      .leftJoin(treinos, eq(treinos.id, treinosDiarios.treinoId))
      .where(eq(treinos.usuarioId, auth.userId));

    const intensidadesPorMes: {
      [key: string]: { baixa: number; media: number; alta: number };
    } = {};

    treinosData.forEach(({ treinosDiarios }) => {
      const { criadoEm, intensidade } = treinosDiarios;

      if (criadoEm && intensidade) {
        const month = format(new Date(criadoEm), "yyyy-MM");

        if (!intensidadesPorMes[month]) {
          intensidadesPorMes[month] = { baixa: 0, media: 0, alta: 0 };
        }

        // Normalizar a intensidade para minúsculas
        const normalizedIntensity = intensidade.toLowerCase();

        // Incrementar a contagem com base na intensidade normalizada
        if (normalizedIntensity === "baixa") {
          intensidadesPorMes[month].baixa++;
        } else if (normalizedIntensity === "média") {
          intensidadesPorMes[month].media++;
        } else if (normalizedIntensity === "alta") {
          intensidadesPorMes[month].alta++;
        }
      }
    });

    return c.json({ intensidadesPorMes });
  })
  .get("/categorias", clerkMiddleware(), async (c) => {
    const auth = getAuth(c);

    if (!auth?.userId) {
      return c.json({ error: "Usuário não autenticado" });
    }

    try {
      const data = await db
        .select({
          categoria: treinosDiarios.categoria,
          count: sql<number>`COUNT(${treinosDiarios.id})`.as("count"),
        })
        .from(treinosDiarios)
        .leftJoin(treinos, eq(treinos.id, treinosDiarios.treinoId))
        .where(eq(treinos.usuarioId, auth.userId))
        .groupBy(treinosDiarios.categoria);

      return c.json({ data });
    } catch (error) {
      console.error("Erro ao buscar categorias de treinos do usuário:", error);
      return c.json({
        error: "Erro interno ao buscar categorias de treinos do usuário",
      });
    }
  })
  .get(
    "/:id",
    clerkMiddleware(),
    zValidator(
      "param",
      z.object({
        id: z.string().optional(),
      })
    ),
    async (c) => {
      const auth = getAuth(c);
      const { id } = c.req.valid("param");

      if (!id) {
        return c.json("id não encontrado");
      }

      if (!auth?.userId) {
        return c.json({ error: "Usuário não autenticado" });
      }

      const data = await db
        .select()
        .from(treinosDiarios)
        .where(eq(treinosDiarios.id, id));

      return c.json({ data });
    }
  )
  .get("/", clerkMiddleware(), async (c) => {
    const auth = getAuth(c);

    if (!auth?.userId) {
      return c.json({ error: "Usuário não autenticado" });
    }

    try {
      const data = await db
        .select({
          id: treinosDiarios.id,
          treinoId: treinosDiarios.treinoId,
          diaDaSemana: treinosDiarios.diaDaSemana,
          nomeExercisio: treinosDiarios.nomeExercisio,
          categoria: treinosDiarios.categoria,
          tipoExercicio: treinosDiarios.tipoExercicio,
          horarioTreino: treinosDiarios.horarioTreino,
          intensidade: treinosDiarios.intensidade,
          series: treinosDiarios.series,
          repeticoes: treinosDiarios.repeticoes,
          notas: treinosDiarios.notas,
          criadoEm: treinosDiarios.criadoEm,
        })
        .from(treinos)
        .leftJoin(treinosDiarios, eq(treinos.id, treinosDiarios.treinoId))
        .where(eq(treinos.usuarioId, auth.userId));

      return c.json({ data });
    } catch (error) {
      console.error("Erro ao buscar treinos do usuário:", error);
      return c.json({ error: "Erro interno ao buscar treinos do usuário" });
    }
  })
  .post(
    "/",
    clerkMiddleware(),
    zValidator(
      "json",
      inserirTreinosDiarios.pick({
        diaDaSemana: true,
        nomeExercisio: true,
        categoria: true,
        tipoExercicio: true,
        horarioTreino: true,
        notas: true,
        intensidade: true,
        repeticoes: true,
        series: true,
      })
    ),
    async (c) => {
      try {
        const auth = getAuth(c);
        const values = c.req.valid("json");

        if (!auth?.userId) {
          return c.json({ error: "Usuário não autenticado" }, 401);
        }

        // Verifica se já existe um treino para o usuário com mesmo horário e dia
        let treinoExistente = await db
          .select({
            id: treinos.id,
            diaDaSemana: treinos.diaDaSemana,
            horarioTreino: treinos.horarioTreino,
            usuarioId: treinos.usuarioId,
            criadoEm: treinos.criadoEm,
          })
          .from(treinos)
          .where(
            and(
              eq(treinos.usuarioId, auth.userId),
              eq(treinos.horarioTreino, values.horarioTreino!),
              eq(treinos.diaDaSemana, values.diaDaSemana)
            )
          );

        let treinoId: string;

        if (treinoExistente.length === 0) {
          // Se não existe, cria um novo treino
          const novoTreino = await db
            .insert(treinos)
            .values({
              id: createId(),
              diaDaSemana: values.diaDaSemana,
              horarioTreino: values.horarioTreino!,
              usuarioId: auth.userId,
              criadoEm: new Date(),
            })
            .returning({
              id: treinos.id,
            });

          treinoId = novoTreino[0].id;
        } else {
          // Se existe, usa o ID do treino existente
          treinoId = treinoExistente[0].id;
        }

        // Insere o novo treino diário usando o treinoId obtido
        const novoTreinoDiario = await db.insert(treinosDiarios).values({
          id: createId(),
          treinoId: treinoId,
          diaDaSemana: values.diaDaSemana,
          nomeExercisio: values.nomeExercisio,
          categoria: values.categoria,
          tipoExercicio: values.tipoExercicio,
          horarioTreino: values.horarioTreino,
          intensidade: values.intensidade,
          series: values.series,
          repeticoes: values.repeticoes,
          notas: values.notas,
          criadoEm: new Date(),
        });

        return c.json({ success: true, data: novoTreinoDiario });
      } catch (error) {
        console.error("Erro ao processar requisição:", error);
        return c.json({ error: "Erro interno ao processar requisição" }, 500);
      }
    }
  )
  .delete(
    "/:id",
    clerkMiddleware(),
    zValidator(
      "param",
      z.object({
        id: z.string(),
      })
    ),
    async (c) => {
      const auth = getAuth(c);
      const { id } = c.req.valid("param");

      if (!id) {
        return c.json("id não encontrado");
      }

      if (!auth?.userId) {
        return c.json({ error: "Usuário não autenticado" });
      }

      const data = await db
        .delete(treinosDiarios)
        .where(and(eq(treinosDiarios.id, id)))
        .returning({
          id: treinosDiarios.id,
        });

      return c.json({ data });
    }
  );
export default app;
