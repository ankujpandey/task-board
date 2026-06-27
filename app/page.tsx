import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-6">
      <div className="w-full max-w-3xl rounded-xl bg-white px-10 py-16 text-center shadow-lg">
        <h1 className="text-5xl font-bold tracking-tight text-slate-900">
          Task Board
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">
          A simple task management application built with Next.js,
          Prisma, SQLite and JWT Authentication.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="w-40"
          >
            <Link href="/signup">
              Sign Up
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-40"
          >
            <Link href="/login">
              Login
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}