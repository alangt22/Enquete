"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";

// ================= LOGIN PAGE =================
export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleCredentialsLogin() {
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setLoading(false);

    if (res?.error) {
      setError("Email ou senha incorretos");
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-600 via-slate-700 to-slate-500 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-black/25 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8 space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-white">Entrar</h1>
            <p className="text-gray-400 text-sm">
              Acesse sua conta no EnqueteDev
            </p>
          </div>

          {/* Google */}
          <button
            onClick={() => signIn("google", { redirect: true, callbackUrl: "/dashboard" })}
            className="w-full bg-white text-black font-medium py-2.5 rounded-xl hover:bg-gray-200 transition cursor-pointer"
          >
            <FcGoogle className="w-6 h-6 inline-block mr-2" />
            Entrar com Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 text-gray-400 text-sm">
            <div className="flex-1 h-px bg-white/10" />
            ou
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Credentials */}
          <div className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}

            <button
              onClick={handleCredentialsLogin}
              disabled={loading}
              className="bg-emerald-500 cursor-pointer hover:bg-emerald-600 text-white font-medium py-2.5 rounded-xl transition disabled:opacity-50"
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
            <p className="text-gray-400 text-sm text-center">
              Não possui uma conta?{" "}
              <Link
                href="/register"
                className="inline-block px-4 py-1.5 rounded-lg text-white border border-white/20 hover:border-blue-500 hover:text-blue-400 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all duration-300"
              >
                Registre-se
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
