import { AppType } from "@/app/api/[[...route]]/route";
import { hc } from "hono/client";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const client = hc<AppType>(apiUrl);
