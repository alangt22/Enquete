"use server"

import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const formSchema = z.object({
  question: z.string().min(1, "A pergunta é obrigatória"),
  options: z
    .array(z.string().min(1, "A opção não pode ser vazia"))
    .min(2, "São necessárias pelo menos 2 opções"),
})

export async function createPoll(formData: FormData) {
  const rawOptions = formData.getAll("options")

  const schema = formSchema.safeParse({
    question: formData.get("question"),
    options: rawOptions.map((opt) => String(opt)),
  })

  if (!schema.success) {
    return { error: schema.error.flatten() }
  }

  const session = await auth()

  if (!session?.user?.id) {
    return { error: "Usuário não autenticado" }
  }

  try {
    const poll = await prisma.poll.create({
      data: {
        question: schema.data.question,
        userId: session.user.id,
        options: {
          create: schema.data.options.map((option) => ({
            text: option,
          })),
        },
      },
    })

    revalidatePath("/dashboard")
    return { success: "Enquete criada com sucesso", pollId: poll.id }
  } catch {
    return { error: "Erro ao criar enquete" }
  }
}