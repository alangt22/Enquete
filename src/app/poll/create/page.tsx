"use client"

import { useState } from "react"
import Link from "next/link"
import { toast } from "sonner"
import { CreatePollForm } from "../_components/create-poll-form"

export default function CreatePoll() {
  const [createdPollId, setCreatedPollId] = useState<string | null>(null)


  if (createdPollId) {
    const pollUrl = `${window.location.origin}/poll/${createdPollId}`
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-500 via-slate-950 to-black text-white p-6">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
            <div className="text-center space-y-4">
              <div className="text-5xl">🎉</div>
              <h1 className="text-2xl font-bold">Enquete Criada!</h1>
              <p className="text-gray-400">
                Compartilhe o link com seus amigos
              </p>
            </div>

            <div className="mt-6 space-y-4">
              <div className="bg-black/40 border border-white/10 rounded-xl p-4">
                <p className="text-sm text-gray-400 mb-2">Link da enquete:</p>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={pollUrl}
                    className="flex-1 bg-transparent text-blue-400 outline-none text-sm"
                    onClick={(e) => (e.target as HTMLInputElement).select()}
                  />
                  <button
                    onClick={() => navigator.clipboard.writeText(pollUrl)
                      .then(() => toast.success("Link copiado!"))
                      .catch(() => toast.error("Erro ao copiar link"))
                    }
                    className="bg-blue-600 cursor-pointer hover:bg-blue-500 px-3 py-2 rounded-lg text-sm transition"
                  >
                    Copiar
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <Link
                  href={`/poll/${createdPollId}`}
                  className="flex-1 text-center bg-emerald-600 hover:bg-emerald-500 transition px-4 py-3 rounded-xl font-medium"
                >
                  Ver Enquete
                </Link>
                <Link
                  href="/dashboard"
                  className="flex-1 text-center bg-white/10 hover:bg-white/20 transition px-4 py-3 rounded-xl font-medium"
                >
                  Meu Dashboard
                </Link>
              </div>

              <a
                href={`https://wa.me/?text=Vote%20na%20minha%20enquete!%20${encodeURIComponent(pollUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center bg-green-600 hover:bg-green-500 transition px-4 py-3 rounded-xl font-medium"
              >
                Compartilhar no WhatsApp 💬
              </a>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-600 via-slate-700 to-slate-500 text-white p-6">
      <div className="max-w-2xl mx-auto space-y-6">

        <div className="bg-black/25 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
          <h1 className="text-2xl font-bold">🗳️ Criar Enquete</h1>
          <p className="text-gray-400 mt-1">
            Crie uma enquete e compartilhe com seu público.
          </p>
        </div>

        <CreatePollForm onCreated={setCreatedPollId} />


      </div>
    </main>
  )
}