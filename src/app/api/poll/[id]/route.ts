import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    // Pega o id direto da URL
    const url = new URL(req.url);
    const segments = url.pathname.split("/"); // exemplo: ["", "api", "poll", "cmm5gz1d10007bo74n55e4krk"]
    const pollId = segments[segments.length - 1]; // pega o último segmento

    if (!pollId) {
      return NextResponse.json({ error: "ID da enquete não fornecido" }, { status: 400 });
    }

    const poll = await prisma.poll.findUnique({
      where: { id: pollId },
      include: {
        options: {
          include: { votes: true },
        },
      },
    });

    if (!poll) {
      return NextResponse.json({ error: "Enquete não encontrada" }, { status: 404 });
    }

    return NextResponse.json({ poll });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao buscar enquete" }, { status: 500 });
  }
}