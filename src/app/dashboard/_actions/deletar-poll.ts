"use server"

import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { z } from "zod"

const formSchema = z.object({
  id: z.string().min(1),
})

export async function deletarPoll(formData: FormData) {
  const schema = formSchema.safeParse({
    id: formData.get("id"),
  })

  if (!schema.success) {
    return { error: "ID inválido" }
  }

  const session = await auth()

  if (!session?.user?.id) {
    return { error: "Usuário não autenticado" }
  }

  try {
    await prisma.poll.delete({
      where: {
        id: schema.data.id,
        userId: session.user.id,
      },
    })

    return { success: "Enquete deletada com sucesso" }
  } catch {
    return { error: "Erro ao deletar enquete" }
  }
}