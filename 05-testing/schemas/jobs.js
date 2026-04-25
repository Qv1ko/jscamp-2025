import * as z from "zod";

// TypeScript se ejecuta en buildtime
// ZOD se ejecuta en runtime
const JobSchema = z.object({
  titulo: z
    .string({
      error: "El título es obligatorio",
    })
    .min(1, "El título debe tener al menos 1 carácter")
    .max(100, "El título no puede exceder los 100 caracteres"),
  empresa: z.string(),
  ubicacion: z.string(),
  descripcion: z.string().optional(),
  data: z.object({
    technology: z.array(z.string()),
    modalidad: z.string(),
    nivel: z.string(),
  }),
});

export function validateJob(input) {
  return JobSchema.saveParse(input);
}

export function validatePartialJob(input) {
  return JobSchema.partial().safeParse(input);
}
