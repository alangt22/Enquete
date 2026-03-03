"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { FiLogOut, FiUser } from "react-icons/fi";

export function NavBar() {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 backdrop-blur bg-gradient-to-br from-slate-700 via-slate-750 to-slate-800">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Enquete<span className="font-bold text-blue-400">Dev</span>
        </h1>

        {session ? (
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="text-sm font-bold capitalize  text-slate-400 flex items-center flex-col hover:text-white transition"
            >
              <FiUser className="inline" />
              {session.user?.name}
            </Link>

            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="text-slate-400 cursor-pointer hover:text-red-500 transition flex items-center gap-1"
            >
              <FiLogOut className="inline-block mr-2" size={20} />
            </button>
          </div>
        ) : (
          <div className="flex gap-3">
            <Link
              href="/login"
              className="px-4 bg-gray-50 py-2 rounded-xl border border-white/20 hover:bg-white/10 transition"
            >
              Entrar
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 transition font-medium"
            >
              Criar conta
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
