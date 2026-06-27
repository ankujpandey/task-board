"use client";

import { useState } from "react";
import { Status } from "@/app/generated/prisma/enums";
import { createTask } from "@/services/task";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  onSuccess: () => void;
}

export default function CreateTaskDialog({ onSuccess }: Props) {
  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [status, setStatus] = useState<Status>(Status.TODO);

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  async function handleSubmit() {
    if (!title.trim()) {
      setApiError("Task title is required");
      return;
    }

    try {
      setLoading(true);
      setApiError("");

      await createTask({
        title,
        status,
      });

      setTitle("");
      setStatus(Status.TODO);

      setOpen(false);

      onSuccess();
    } catch (error: any) {
      console.error(error);

      setApiError(
        error.response?.data?.message ??
          "Failed to create task"
      );
    } finally {
      setLoading(false);
    }
  }

  function handleOpenChange(value: boolean) {
    setOpen(value);

    if (!value) {
      setTitle("");
      setStatus(Status.TODO);
      setApiError("");
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={handleOpenChange}
    >
      <DialogTrigger asChild>
        <Button>Create Task</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Task</DialogTitle>

          <DialogDescription>
            Add a new task to your board.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-2">

          {apiError && (
            <p className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600">
              {apiError}
            </p>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Task Title
            </label>

            <Input
              placeholder="Example: Learn Prisma"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);

                if (apiError) {
                  setApiError("");
                }
              }}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Status
            </label>

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
            onClick={() => setOpen(false)}
            disabled={loading}
          >
            Cancel
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}