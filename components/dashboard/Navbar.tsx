"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { logout } from "@/services/auth";

import { Button } from "@/components/ui/button";

export default function Navbar() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    try {
      setLoading(true);

      await logout();

      router.replace("/login");
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <header className="border-b bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <div>
          <h1 className="text-xl font-bold">Task Board</h1>
          <p className="text-sm text-slate-500">
            Manage your daily tasks
          </p>
        </div>

        <Button
          variant="destructive"
          onClick={handleLogout}
          disabled={loading}
        >
          {loading ? "Logging out..." : "Logout"}
        </Button>
      </div>
    </header>
  );
}