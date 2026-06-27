"use client";

import { useEffect, useState } from "react";
import { Status } from "@/app/generated/prisma/enums";

import { updateTask } from "@/services/task";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Task {
  id: string;
  title: string;
  status: Status;
}

interface Props {
  task: Task | null;
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function EditTaskDialog({
  task,
  open,
  onClose,
  onSuccess,
}: Props) {
  const [status, setStatus] = useState<Status>(Status.TODO);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (task) {
      setStatus(task.status);
    }
  }, [task]);

  async function handleUpdate() {
    if (!task) return;

    try {
      setLoading(true);

      await updateTask(task.id, status);

      onSuccess();

      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (!task) return null;

  return (
    <Dialog
      open={open}
      onOpenChange={onClose}
    >
      <DialogContent className="sm:max-w-md">

        <DialogHeader>

          <DialogTitle>
            Update Status
          </DialogTitle>

          <DialogDescription>
            Change task status.
          </DialogDescription>

        </DialogHeader>

        <div className="space-y-5">

          <div>

            <p className="mb-2 text-sm text-slate-500">
              Task
            </p>

            <div className="rounded-md border bg-slate-50 p-3 font-medium">
              {task.title}
            </div>

          </div>

          <div>

            <p className="mb-2 text-sm text-slate-500">
              Status
            </p>

            <Select
              value={status}
              onValueChange={(value) =>
                setStatus(value as Status)
              }
            >
              <SelectTrigger>

                <SelectValue />

              </SelectTrigger>

              <SelectContent>

                <SelectItem value={Status.TODO}>
                  Todo
                </SelectItem>

                <SelectItem value={Status.IN_PROGRESS}>
                  In Progress
                </SelectItem>

                <SelectItem value={Status.DONE}>
                  Done
                </SelectItem>

              </SelectContent>

            </Select>

          </div>

        </div>

        <DialogFooter>

          <Button
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            onClick={handleUpdate}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </Button>

        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}