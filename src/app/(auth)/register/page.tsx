"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { set } from "zod";
// ================= REGISTER PAGE =================
export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);


  async function handleRegister() {
    setLoading(true);

    
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      toast(data.error || "Erro desconhecido");
      setLoading(false);
      return;
    }

    toast.success("Conta criada com sucesso! Faça login para continuar.");
    setLoading(false);
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-600 via-slate-700 to-slate-500 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-black/25 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8 space-y-5">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-white">Criar conta</h1>
            <p className="text-gray-400 text-sm">Comece a usar o EnqueteDev</p>
          </div>

          <div className="flex flex-col gap-3">
            <input
              placeholder="Nome"
              onChange={(e) => setName(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              placeholder="Senha"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              disabled={loading}
              onClick={handleRegister}
              className="cursor-pointer bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2.5 rounded-xl transition"
            >
              {loading ? "Aguarde..." : "Registrar"}
            </button>
            <p className="text-gray-400 text-sm text-center">
              Ja possui uma conta?{" "}
              <Link
                href="/login"
                className="inline-block px-4 py-1.5 rounded-lg text-white border border-white/20 hover:border-blue-500 hover:text-blue-400 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all duration-300"
              >
                Faça login
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
