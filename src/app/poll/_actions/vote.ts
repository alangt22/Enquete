"use server"

import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { pusherServer } from "@/lib/pusher"
import { z } from "zod"

const voteSchema = z.object({
  pollId: z.string().min(1, "ID da enquete é obrigatório"),
  optionId: z.string().min(1, "Opção de voto é obrigatória"),
})

export async function votePoll(formData: FormData) {
  const pollId = formData.get("pollId")
  const optionId = formData.get("optionId")

  const schema = voteSchema.safeParse({
    pollId: pollId,
    optionId: optionId,
  })

  if (!schema.success) {
    return { error: schema.error.issues[0].message }
  }

  const session = await auth()

  if (!session?.user?.id) {
    return { error: "Não autenticado" }
  }

  try {
    await prisma.vote.create({
      data: {
        userId: session.user.id,
        pollId: schema.data.pollId,
        optionId: schema.data.optionId,
      },
    })

    const poll = await prisma.poll.findUnique({
      where: { id: schema.data.pollId },
      include: {
        options: { include: { votes: true } },
      },
    })

    if (!poll) {
      return { error: "Enquete não encontrada" }
    }

    await pusherServer.trigger(
      `poll-${schema.data.pollId}`,
      "poll-update",
      { poll }
    )

    return { success: "Voto registrado!" }

  } catch (err: unknown) {

    if (err && typeof err === 'object' && 'code' in err && err.code === "P2002") {
      return { error: "Você já votou nessa enquete" }
    }

    console.error("Erro ao votar:", err)
    return { error: "Erro ao votar" }
  }
}