import { z } from "zod";
export const createSiteSchema = z.object({
  title: z.string().min(1, { message: "Название не может быть пустым" }).max(50),
  subdomain: z.string().min(1, { message: "Субдомен не может быть пустым" }).max(50),
});