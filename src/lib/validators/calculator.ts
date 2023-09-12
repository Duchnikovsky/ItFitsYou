import { z } from "zod";

export const CaculatorValidaor = z.object({
  gender: z.number().min(0).max(1),
  age: z.number().min(1).max(100),
  height: z.number().min(50).max(300),
  weight: z.number().min(10).max(300),
  activity: z.number().min(0).max(3),
  goal: z.number().min(0).max(2),
});

export type CalculatorRequest = z.infer<typeof CaculatorValidaor>;

export const AsignValidator = z.object({
  kcal: z.number().min(1).max(10000),
  lowC: z.number().min(1),
  highC: z.number().min(1),
  lowF: z.number().min(1),
  highF: z.number().min(1),
  lowP: z.number().min(1),
  highP: z.number().min(1),
});

export type AsignRequest = z.infer<typeof AsignValidator>;
