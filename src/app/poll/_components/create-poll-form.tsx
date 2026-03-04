"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { createPoll } from "../_actions/create-poll";
import { z } from "zod";
import { FiPlus } from "react-icons/fi";
import { LoaderButton } from "@/app/_components/loaderbutton";

const pollSchema = z.object({
  question: z
    .string()
    .min(1, "A pergunta é obrigatória")
    .min(5, "Pergunta muito curta"),
  options: z
    .array(z.string().min(1, "A opção não pode ser vazia"))
    .min(2, "São necessárias pelo menos 2 opções"),
});

type FormErrors = {
  question?: string[];
  options?: string[];
};

interface CreatePollFormProps {
  onCreated: (pollId: string) => void;
}

export function CreatePollForm({ onCreated }: CreatePollFormProps) {
  const [options, setOptions] = useState(["", ""]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
    if (errors.options) {
      setErrors((prev) => ({ ...prev, options: undefined }));
    }
  };

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    const schema = pollSchema.safeParse({
      question: formData.get("question"),
      options: options,
    });

    if (!schema.success) {
      const fieldErrors = schema.error.flatten().fieldErrors;
      setErrors(fieldErrors as FormErrors);
      setLoading(false);
      return;
    }

    setErrors({});

    const result = await createPoll(formData);

    if (result?.error) {
      if (result.error === "Usuário não autenticado") {
        toast.error("Você precisa estar logado");
      } else {
        toast.error("Erro ao criar enquete");
      }
      setLoading(false);
      return;
    }

    if (result?.pollId) {
      onCreated(result.pollId);
      toast.success("Enquete criada com sucesso!");
    }

    setLoading(false);
  }

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        await handleSubmit(formData);
      }}
      className="bg-black/25
           backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl space-y-4"
    >
      <div className="space-y-2">
        <label className="text-sm text-gray-400">Pergunta</label>
        <input
          placeholder="Ex: Qual é a sua linguagem de programação favorita?"
          name="question"
          type="text"
          required
          className="w-full bg-black/40 border border-white/10 rounded-xl p-3 outline-none focus:border-blue-500 transition"
        />
        {errors.question && (
          <p className="text-red-400 text-sm">{errors.question[0]}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm text-gray-400">Opções</label>

        {options.map((opt, i) => (
          <div key={i}>
            <input
              name="options"
              type="text"
              required
              placeholder={`Opção ${i + 1}`}
              value={opt}
              onChange={(e) => handleOptionChange(i, e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl p-3 outline-none focus:border-blue-500 transition"
            />
            {errors.options && errors.options[i] && (
              <p className="text-red-400 text-sm">{errors.options[i]}</p>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={addOption}
          className="text-sm cursor-pointer bg-white/10 hover:bg-white/20 transition px-4 py-2 rounded-lg mt-2"
        >
          <FiPlus className="inline-block mr-1" />
          Adicionar opção
        </button>
      </div>

      <LoaderButton
        type="submit"
        loading={loading}
        className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-3 rounded-lg"
      >
        Criar Enquete
      </LoaderButton>

      <Link
        href="/dashboard"
        className="block text-center text-gray-400 hover:text-white text-sm mt-2"
      >
        ← Voltar ao dashboard
      </Link>
    </form>
  );
}
