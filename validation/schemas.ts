// Reglas de validación de los formularios (Zod).
// React Hook Form las ejecuta en cada cambio (mode: "onChange") mediante zodResolver,
// por eso los errores aparecen mientras el usuario escribe.
import { z } from "zod";
import { Skill } from "../types/cv.types";

const LETTERS = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s.'-]+$/;
const PHONE_CHARS = /^\+?[\d\s]+$/;

const required = (message = "Este campo es obligatorio") =>
  z.string().trim().min(1, message);

export const personalInfoSchema = z.object({
  fullName: required("El nombre es obligatorio")
    .regex(LETTERS, "Ingrese un nombre válido (solo letras)")
    .min(3, "El nombre debe tener al menos 3 caracteres"),
  email: required("El email es obligatorio").pipe(
    z.email("Ingrese un correo electrónico válido")
  ),
  phone: z
    .string()
    .trim()
    .refine((v) => v === "" || PHONE_CHARS.test(v), "Ingrese un número válido")
    .refine(
      (v) => {
        const digits = v.replace(/\D/g, "").length;
        return v === "" || (digits >= 7 && digits <= 15);
      },
      "El número debe tener entre 7 y 15 dígitos"
    ),
  location: z.string().trim().max(60, "Máximo 60 caracteres"),
  summary: z.string().trim().max(500, "Máximo 500 caracteres"),
  photoUri: z.string(),
});

export const experienceSchema = z
  .object({
    company: required("La empresa es obligatoria").max(80, "Máximo 80 caracteres"),
    position: required("El cargo es obligatorio").max(80, "Máximo 80 caracteres"),
    startDate: z.string().min(1, "Selecciona la fecha de inicio"),
    endDate: z.string(),
    current: z.boolean(),
    description: z.string().trim().max(500, "Máximo 500 caracteres"),
  })
  .superRefine((data, ctx) => {
    if (data.current) return;
    if (!data.endDate) {
      ctx.addIssue({
        code: "custom",
        path: ["endDate"],
        message: "Selecciona la fecha de fin o marca 'Trabajo actual'",
      });
    } else if (data.startDate && data.endDate < data.startDate) {
      ctx.addIssue({
        code: "custom",
        path: ["endDate"],
        message: "La fecha de fin debe ser posterior a la de inicio",
      });
    }
  });

export const educationSchema = z.object({
  institution: required("La institución es obligatoria").max(100, "Máximo 100 caracteres"),
  degree: required("El título es obligatorio").max(100, "Máximo 100 caracteres"),
  field: z.string().trim().max(80, "Máximo 80 caracteres"),
  graduationDate: z.string(),
});

// Se construye con las habilidades existentes para impedir duplicados en tiempo real
export const makeSkillSchema = (existing: Skill[]) =>
  z.object({
    type: z.enum(["soft", "hard"]),
    name: required("Escribe una habilidad")
      .max(40, "Máximo 40 caracteres")
      .refine(
        (name) =>
          !existing.some(
            (s) => s.name.toLowerCase() === name.trim().toLowerCase()
          ),
        "Esta habilidad ya fue agregada"
      ),
  });

export type PersonalInfoForm = z.infer<typeof personalInfoSchema>;
export type ExperienceForm = z.infer<typeof experienceSchema>;
export type EducationForm = z.infer<typeof educationSchema>;
export type SkillForm = z.infer<ReturnType<typeof makeSkillSchema>>;
