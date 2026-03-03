import { useEffect, useState, useRef } from "react";
import Pusher from "pusher-js";
import { votePoll } from "@/app/poll/_actions/vote";
import { toast } from "sonner";

export type PollOption = {
  id: string;
  text: string;
  votes: { id: string }[];
};

export type PollType = {
  id: string;
  question: string;
  status: boolean;
  options: PollOption[];
};

type UsePollReturn = {
  poll: PollType | null;
  loading: boolean;
  wsStatus: string;
  error: string | null;
  submitVote: (optionId: string) => Promise<{ error?: string; success?: string }>;
};

export function usePoll(pollId: string): UsePollReturn {
  const [poll, setPoll] = useState<PollType | null>(null);
  const [loading, setLoading] = useState(true);
  const [wsStatus, setWsStatus] = useState("Conectando...");
  const [error, setError] = useState<string | null>(null);
  const pusherRef = useRef<Pusher | null>(null);

  useEffect(() => {
    if (!pollId) return;

    setLoading(true);
    fetch(`/api/poll/${pollId}`)
      .then((res) => res.json())
      .then((data) => {
        setPoll(data.poll);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Erro ao carregar enquete");
        toast.error("Erro ao carregar enquete");
        setLoading(false);
      });
  }, [pollId]);

  useEffect(() => {
    if (!pollId) return;

    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    });
    pusherRef.current = pusher;

    const channel = pusher.subscribe(`poll-${pollId}`);

    channel.bind("poll-update", (data: { poll: PollType }) => {
      setPoll({
        ...data.poll,
        options: data.poll.options.map((opt) => ({
          ...opt,
          votes: opt.votes || [],
        })),
      });
      setWsStatus("Atualizado!");
    });

    setTimeout(() => setWsStatus("Conectado!"), 100);

    return () => {
      pusher.unsubscribe(`poll-${pollId}`);
      pusher.disconnect();
    };
  }, [pollId]);

  const submitVote = async (optionId: string) => {
    setError(null);
    const formData = new FormData();
    formData.append("pollId", pollId);
    formData.append("optionId", optionId);

    const result = await votePoll(formData);
    return result;
  };

  return {
    poll,
    loading,
    wsStatus,
    error,
    submitVote,
  };
} 
