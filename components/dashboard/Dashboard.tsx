"use client";

import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { getTasks } from "@/services/task";
import CreateTaskDialog from "./CreateTaskDialog";
import TaskTable from "./TaskTable";
import EditTaskDialog from "./EditTaskDialog";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    try {
      const response = await getTasks();
      setTasks(response.tasks);
    } catch (error) {
      console.error(error);
    }finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100">
        <p className="text-slate-500 text-lg">Loading tasks...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100">
      <Navbar />

      <div className="mx-auto max-w-5xl space-y-8 p-6">
        <CreateTaskDialog onSuccess={fetchTasks} />

        <TaskTable
          tasks={tasks}
          onEdit={(task) => {
            setSelectedTask(task);
            setEditOpen(true);
          }}
        />
      
        <EditTaskDialog
          task={selectedTask}
          open={editOpen}
          onClose={() => setEditOpen(false)}
          onSuccess={fetchTasks}
        />
      </div>
    </main>
  );
}