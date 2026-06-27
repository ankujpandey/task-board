import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type SignupInput = z.infer<typeof signupSchema>;


export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type LoginInput = z.infer<typeof loginSchema>;


export const createTaskSchema = z.object({
  title: z.string().trim().min(3).max(100),
  status: z.enum(["TODO", "IN_PROGRESS", "DONE"]),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
