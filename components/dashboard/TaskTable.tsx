"use client";

import { Status } from "@/types/task";

import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

import StatusBadge from "./StatusBadge";

interface Task {
  id: string;
  title: string;
  status: Status;
  createdAt: string;
  updatedAt: string;
}

interface Props {
  tasks: Task[];
  onEdit: (task: Task) => void;
}

export default function TaskTable({
  tasks,
  onEdit,
}: Props) {
  if (tasks.length === 0) {
    return (
      <div className="rounded-lg border bg-white p-10 text-center text-slate-500 shadow-sm">
        No tasks found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border bg-white shadow">
      <Table>

        <TableHeader>

          <TableRow>

            <TableHead className="min-w-[220px]">
              Task
            </TableHead>

            <TableHead>Status</TableHead>

            <TableHead>Created</TableHead>

            <TableHead>Updated</TableHead>

            <TableHead className="text-right">
              Actions
            </TableHead>

          </TableRow>

        </TableHeader>

        <TableBody>

          {tasks.map((task) => (

            <TableRow key={task.id}>

              <TableCell className="font-medium">
                {task.title}
              </TableCell>

              <TableCell>

                <StatusBadge
                  status={task.status}
                />

              </TableCell>

              <TableCell className="text-sm text-slate-500">
                {new Date(task.createdAt).toLocaleString()}
              </TableCell>

              <TableCell className="text-sm text-slate-500">
                {new Date(task.updatedAt).toLocaleString()}
              </TableCell>

              <TableCell className="text-right">

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onEdit(task)}
                >
                  Edit
                </Button>

              </TableCell>

            </TableRow>

          ))}

        </TableBody>

      </Table>

    </div>
  );
}