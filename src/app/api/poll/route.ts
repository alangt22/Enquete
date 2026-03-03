import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(req: Request) {
  try {
      const session = await auth();
    
      if (!session?.user?.id) {
        return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
      }
    

    const poll = await prisma.poll.findMany({
      where: { userId: session.user.id },
      include: {
        options: { include: { votes: true } },
      },
    });
    if (poll.length === 0) {
      return NextResponse.json({poll});
    }

    return NextResponse.json({ poll });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao buscar enquete" }, { status: 500 });
  }
}