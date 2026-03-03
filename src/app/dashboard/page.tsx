
"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { FiPlus, } from "react-icons/fi";
import { Polls } from "./_components/polls";
import { redirect } from "next/navigation";

export default function Dashboard() {
  const { data: session } = useSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-600 via-slate-700 to-slate-500 text-white p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* header */}
        <div className="bg-black/25  border border-white/10 rounded-2xl p-6 shadow-xl">
          <h1 className="text-2xl font-bold capitalize">
            Bem-vindo, {session.user.name} 👋
          </h1>
          <p className="text-gray-400 mt-1">{session.user.email}</p>
          
        </div>

        {/* Polls */}
        <Polls />

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/poll/create"
            className="flex-1 text-center bg-emerald-500 hover:bg-emerald-600 transition px-4 py-3 rounded-xl font-medium"
          >
            <FiPlus className="inline-block mr-2" />
            Criar Enquete
          </Link>

        </div>
      </div>
    </main>
  );
}
