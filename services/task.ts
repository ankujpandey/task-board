import { api } from "@/lib/api";
import { Status } from "@/app/generated/prisma/enums";

export async function getTasks() {
  const response = await api.get("/tasks");

  return response.data;
}

export async function createTask(data: {
  title: string;
  status: Status;
}) {
  const response = await api.post("/tasks", data);

  return response.data;
}

export async function updateTask(
  id: string,
  status: Status
) {
  const response = await api.patch(`/tasks/${id}`, {
    status,
  });

  return response.data;
}