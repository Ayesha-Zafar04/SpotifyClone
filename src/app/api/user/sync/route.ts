import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function POST() {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized: No active Clerk session found" },
        { status: 401 }
      );
    }

    const email = user.emailAddresses[0]?.emailAddress;
    if (!email) {
      return NextResponse.json(
        { error: "Bad Request: User does not have a primary email address" },
        { status: 400 }
      );
    }

    const name = `${user.firstName || ""} ${user.lastName || ""}`.trim() || null;
    const imageUrl = user.imageUrl || null;

    // Secure server-side user upsert linked by Clerk ID
    const dbUser = await prisma.user.upsert({
      where: { clerkId: user.id },
      update: {
        email,
        name,
        imageUrl,
      },
      create: {
        clerkId: user.id,
        email,
        name,
        imageUrl,
      },
    });

    return NextResponse.json({ success: true, user: dbUser });
  } catch (error) {
    console.error("User Sync Error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Internal Server Error", message },
      { status: 500 }
    );
  }
}
