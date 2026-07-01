import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { userId: clerkId } = await auth();

    if (!clerkId) {
      return NextResponse.json(
        { error: "Unauthorized: No active session" },
        { status: 401 }
      );
    }

    const dbUser = await prisma.user.findUnique({
      where: { clerkId },
    });

    if (!dbUser) {
      return NextResponse.json(
        { error: "Bad Request: User profile is not synchronized" },
        { status: 400 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const { songId } = body;

    if (!songId || typeof songId !== "string") {
      return NextResponse.json(
        { error: "Bad Request: Song ID is required" },
        { status: 400 }
      );
    }

    // Verify the song exists in the database
    const song = await prisma.song.findUnique({
      where: { id: songId },
    });

    if (!song) {
      return NextResponse.json(
        { error: "Not Found: Song does not exist" },
        { status: 404 }
      );
    }

    // Check if the user has already liked this track
    const existingLike = await prisma.likedSong.findUnique({
      where: {
        userId_songId: {
          userId: dbUser.id,
          songId,
        },
      },
    });

    if (existingLike) {
      // Toggle logic: Unlike the song
      await prisma.likedSong.delete({
        where: {
          userId_songId: {
            userId: dbUser.id,
            songId,
          },
        },
      });
      return NextResponse.json({ liked: false, message: "Song unliked successfully" });
    } else {
      // Toggle logic: Like the song
      await prisma.likedSong.create({
        data: {
          userId: dbUser.id,
          songId,
        },
      });
      return NextResponse.json({ liked: true, message: "Song liked successfully" });
    }
  } catch (error) {
    console.error("POST Like Error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Internal Server Error", message },
      { status: 500 }
    );
  }
}
