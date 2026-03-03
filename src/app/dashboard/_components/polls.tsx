"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiExternalLink, FiTrash2 } from "react-icons/fi";
import { toast } from "sonner";
import { deletarPoll } from "../_actions/deletar-poll";
import { encerrarPoll } from "../_actions/encerrar-poll";

type PollOption = {
  id: string;
  text: string;
  votes: { id: string }[];
};

type PollType = {
  id: string;
  question: string;
  status: boolean;
  options: PollOption[];
};

export function Polls() {
  const [polls, setPolls] = useState<PollType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPolls() {
      try {
        const res = await fetch("/api/poll");

        if (!res.ok) {
          setPolls([]);
          setLoading(false);
          return;
        }

        const data = await res.json();
        setPolls(data.poll ?? []);
      } catch (error) {
        console.error(error);
        toast.error("Erro ao carregar enquetes");
        setPolls([]);
      } finally {
        setLoading(false);
      }
    }

    loadPolls();
  }, []);

  async function encerrarEnquete(pollId: string) {
    const formData = new FormData();
    formData.append("id", pollId);

    const result = await encerrarPoll(formData);

    if (result?.error) {
      toast.error(result.error);
      return;
    }

    toast.success(result?.success);

    setPolls((prev) =>
      prev.map((poll) =>
        poll.id === pollId ? { ...poll, status: false } : poll,
      ),
    );
  }

  async function handleDelete(pollId: string) {
    const formData = new FormData();
    formData.append("id", pollId);

    const result = await deletarPoll(formData);

    if (result?.error) {
      toast.error(result.error);
      return;
    }

    toast.success(result?.success);

    setPolls((prev) => prev.filter((poll) => poll.id !== pollId));
  }
  return (
    <div className="bg-black/25 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
      <div className="flex justify-between sm:flex-row gap-3">
        <h1 className="text-2xl font-bold mb-6">Minhas enquetes</h1>
      </div>

      <div className="border px-4 py-6 border-white/10 rounded-xl">
        {loading ? (
          <div className="flex flex-col gap-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-white/10 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-white/10 rounded w-1/4"></div>
              </div>
            ))}
          </div>
        ) : polls.length > 0 ? (
          <div className="flex flex-col gap-3">
            {polls.map((poll) => (
              <div
                key={poll.id}
                className="mb-4 border border-white/10 p-4 rounded-xl flex justify-between"
              >
                <div className="flex flex-col">
                  <h2 className="font-semibold mb-2">{poll.question}</h2>
                  <span className="text-sm text-gray-400">
                    Votos:{" "}
                    {poll.options.reduce(
                      (acc, option) => acc + option.votes.length,
                      0,
                    )}
                  </span>
                  <span
                    className={`text-sm mt-2 ${
                      poll.status ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {poll.status ? "Aberta" : "Fechada"}
                  </span>
                </div>

                <div className="flex flex-col">
                  {poll.status ? (
                    <Link
                      href={`/poll/${poll.id}`}
                      target="_blanck"
                      className="bg-blue-600 hover:bg-blue-500 transition px-4 py-2 rounded-xl font-medium"
                    >
                      Votar Agora
                    </Link>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <button onClick={() => handleDelete(poll.id)}>
                        <FiTrash2 size={25} className="text-red-600 cursor-pointer hover:scale-110 transition" />
                      </button>
                      <Link
                        href={`/poll/${poll.id}`}
                        target="_blanck"
                      >
                        <FiExternalLink size={25} className="text-green-600 cursor-pointer hover:scale-110 transition" />
                      </Link>
                    </div>
                  )}
                  {poll.status === true && (
                    <button
                      onClick={() => encerrarEnquete(poll.id)}
                      className="bg-red-600 cursor-pointer hover:bg-red-500 transition px-4 py-2 rounded-xl font-medium mt-2"
                    >
                      Encerrar enquete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>nenhuma enquete criada</p>
        )}
      </div>
    </div>
  );
}
