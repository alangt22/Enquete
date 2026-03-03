
import { motion } from "framer-motion";
import Link from "next/link";
export function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
          Crie enquetes em tempo real
          <span className="text-blue-400 block">de forma simples 🚀</span>
        </h2>

        <p className="text-slate-300 text-lg mb-8">
          O Enquete<span className="font-bold text-blue-400">Dev</span> permite criar votações profissionais com atualização
          instantânea via WebSocket. Compartilhe o link e acompanhe os votos
          acontecendo ao vivo.
        </p>

        <div className="flex flex-wrap gap-4">
          <Link
            href="/register"
            className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 transition font-semibold shadow-lg shadow-blue-600/20"
          >
            Começar grátis
          </Link>

          <Link
            href="/login"
            className="px-6 py-3 rounded-2xl border border-white/20 hover:bg-white/10 transition"
          >
            Já tenho conta
          </Link>
        </div>
      </motion.div>

      {/* Card visual */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="bg-white/5 border border-white/10 rounded-3xl p-6 shadow-2xl"
      >
        <h3 className="text-xl font-semibold mb-4">📊 Exemplo de enquete</h3>

        <div className="space-y-3">
          {["React", "Vue", "Angular"].map((opt, i) => (
            <div
              key={i}
              className="flex items-center justify-between bg-white/5 rounded-xl px-4 py-3"
            >
              <span>{opt}</span>
              <span className="text-blue-400 font-medium">
                {[42, 27, 18][i]} votos
              </span>
            </div>
          ))}
        </div>

        <p className="text-xs text-slate-400 mt-4">
          Atualizações em tempo real ⚡
        </p>
      </motion.div>
    </section>
  );
}
