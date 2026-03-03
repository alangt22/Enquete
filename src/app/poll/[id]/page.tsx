"use client";

import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { FiLogIn } from "react-icons/fi";
import { Vote } from "../_components/vote";

export default function PollPage() {
  const { data: session, status } = useSession();

  const params = useParams();

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-600 via-slate-700 to-slate-500 text-white p-6">
      {!session && (
        <div className="flex flex-col items-center">
          <p className="text-center mt-20 mb-4">Você precisa estar logado!</p>

          <Link
            className="flex items-center justify-center gap-2 mb-10 text-2xl font-bold hover:text-blue-500"
            href="/login"
          >
            Login
            <FiLogIn />
          </Link>
        </div>
      )}

      <Vote />
    </main>
  );
}
