import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

// GET /api/playlist - Fetch all playlists belonging to the current user
export async function GET() {
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

    const playlists = await prisma.playlist.findMany({
      where: { userId: dbUser.id },
      include: {
        songs: {
          include: {
            song: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(playlists);
  } catch (error) {
    console.error("GET Playlists Error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Internal Server Error", message },
      { status: 500 }
    );
  }
}

// POST /api/playlist - Create a new playlist
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
    const { name, description, imageUrl } = body;

    if (!name || typeof name !== "string") {
      return NextResponse.json(
        { error: "Bad Request: Playlist name is required" },
        { status: 400 }
      );
    }

    const playlist = await prisma.playlist.create({
      data: {
        name,
        description: description || null,
        imageUrl: imageUrl || null,
        userId: dbUser.id,
      },
    });

    return NextResponse.json(playlist);
  } catch (error) {
    console.error("POST Playlist Error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Internal Server Error", message },
      { status: 500 }
    );
  }
}

// DELETE /api/playlist - Delete a playlist
export async function DELETE(req: Request) {
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

    const { searchParams } = new URL(req.url);
    const playlistId = searchParams.get("id");

    if (!playlistId) {
      return NextResponse.json(
        { error: "Bad Request: Playlist ID is required in search query (?id=xxx)" },
        { status: 400 }
      );
    }

    // Verify existence
    const playlist = await prisma.playlist.findUnique({
      where: { id: playlistId },
    });

    if (!playlist) {
      return NextResponse.json(
        { error: "Not Found: Playlist does not exist" },
        { status: 404 }
      );
    }

    // Verify ownership before deleting
    if (playlist.userId !== dbUser.id) {
      return NextResponse.json(
        { error: "Forbidden: You do not own this playlist" },
        { status: 403 }
      );
    }

    await prisma.playlist.delete({
      where: { id: playlistId },
    });

    return NextResponse.json({ success: true, message: "Playlist deleted successfully" });
  } catch (error) {
    console.error("DELETE Playlist Error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Internal Server Error", message },
      { status: 500 }
    );
  }
}
