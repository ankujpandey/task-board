import { api } from "@/lib/api";
import { LoginInput } from "@/lib/validations";

export async function signup(data: LoginInput) {
  const response = await api.post("/auth/signup", data);

  return response.data;
}

export async function login(data: LoginInput) {
  const response = await api.post("/auth/login", data);

  return response.data;
}

export async function logout() {
  const response = await api.post("/auth/logout");

  return response.data;
}