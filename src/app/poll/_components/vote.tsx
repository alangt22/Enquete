import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { usePoll } from "@/hooks/usePoll";
import { toast } from "sonner";

export function Vote() {
  const params = useParams();
  const pollId = params.id as string;

  const { poll, loading, wsStatus, submitVote } = usePoll(pollId);
  const [selectedOption, setSelectedOption] = useState("");
  const [message, setMessage] = useState("");
  const [loadingVote, setLoadingVote] = useState(false);

  const handleVote = async () => {
    if (!selectedOption) {
      setMessage("Selecione uma opção");
      return;
    }

    setLoadingVote(true);
    setMessage("");

    const result = await submitVote(selectedOption);

    if (result?.error) {
      setMessage(result.error);
      toast.error("Erro ao votar");
    } else {
      setMessage("Voto registrado!");
      setSelectedOption("");
      toast.success("Voto registrado!");
    }

    setLoadingVote(false);
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="bg-black/25 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="animate-pulse space-y-3">
            <div className="h-6 bg-white/10 rounded w-3/4"></div>
            <div className="h-4 bg-white/10 rounded w-1/4"></div>
          </div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-16 bg-white/10 rounded-xl"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!poll) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        Enquete não encontrada
      </div>
    );
  }

  const totalVotes = poll.options.reduce(
    (acc, opt) => acc + opt.votes.length,
    0,
  );

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-black/25 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold">{poll.question}</h1>
          <p className="text-sm text-gray-400 mt-1">
            {totalVotes} votos no total • {wsStatus}
          </p>
        </div>

        {poll.status ? (
          <div className="space-y-3">
            {poll.options.map((opt) => {
              const percentage =
                totalVotes > 0
                  ? Math.round((opt.votes.length / totalVotes) * 100)
                  : 0;

              return (
                <label
                  key={opt.id}
                  className="block bg-black/40 border border-white/10 rounded-xl p-4 cursor-pointer hover:border-blue-500 transition"
                >
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <input
                        type="radio"
                        name="option"
                        value={opt.id}
                        checked={selectedOption === opt.id}
                        onChange={() => setSelectedOption(opt.id)}
                        className="mr-2"
                        disabled={loadingVote}
                      />
                      {opt.text}
                    </div>
                    <span className="text-sm text-gray-400">
                      {opt.votes.length} votos
                    </span>
                  </div>

                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </label>
              );
            })}
          </div>
        ) : (
          <div className="space-y-3">
            {poll.options.map((opt) => {
              const percentage =
                totalVotes > 0
                  ? Math.round((opt.votes.length / totalVotes) * 100)
                  : 0;
              const isWinner = opt.votes.length === Math.max(...poll.options.map(o => o.votes.length)) && totalVotes > 0;

              return (
                <div
                  key={opt.id}
                  className={`bg-black/40 border rounded-xl p-4 ${
                    isWinner ? "border-green-500/50" : "border-white/10"
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">
                      {opt.text} {isWinner && "🏆"}
                    </span>
                    <span className="text-sm text-gray-400">
                      {opt.votes.length} votos ({percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        isWinner ? "bg-green-500" : "bg-blue-500"
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {poll.status ? (
          <button
            className="bg-blue-500 cursor-pointer hover:bg-blue-600 transition px-4 py-3 rounded-xl font-medium"
            onClick={handleVote}
            disabled={loadingVote}
          >
            {loadingVote ? "Votando..." : "Votar"}
          </button>
        ) : (
          <>
            <p className="text-sm text-red-400 mt-1">Enquete Encerrada</p>
          </>
        )}

        {message && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3 text-sm text-emerald-400">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
