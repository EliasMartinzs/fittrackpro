import { Hono } from "hono";
import { handle } from "hono/vercel";

import treinos from "./treinos";

export const runtime = "edge";

const app = new Hono().basePath("/api");

const routes = app.route("/treinos", treinos);

export const GET = handle(app);
export const POST = handle(app);
export const DELETE = handle(app);
export const PATCH = handle(app);

export type AppType = typeof routes;
