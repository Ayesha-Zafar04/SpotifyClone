import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const songs = await prisma.song.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(songs);
  } catch (error) {
    console.error("Fetch Songs Error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Internal Server Error", message },
      { status: 500 }
    );
  }
}
