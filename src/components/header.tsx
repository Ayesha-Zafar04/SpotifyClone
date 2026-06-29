"use client";

import { User, ChevronLeft, ChevronRight, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useUser, useClerk } from "@clerk/nextjs";
import Link from "next/link";

export default function Header() {
  const router = useRouter();
  const { isSignedIn, user } = useUser();
  const { signOut } = useClerk();

  const handleSignOut = () => {
    signOut({ redirectUrl: "/login" });
  };

  return (
    <header className="flex items-center justify-between bg-zinc-900/90 px-6 py-4 rounded-t-lg shrink-0">
      {/* Navigation Arrows & App Name */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => router.back()}
            className="flex items-center justify-center size-8 rounded-full bg-black text-neutral-400 hover:text-white transition duration-200 cursor-pointer"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            onClick={() => router.forward()}
            className="flex items-center justify-center size-8 rounded-full bg-black text-neutral-400 hover:text-white transition duration-200 cursor-pointer"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
        <h1 className="text-xl font-bold text-white tracking-tight hidden sm:block">
          Spotify Clone
        </h1>
      </div>

      {/* User Actions */}
      <div className="flex items-center gap-4">
        {isSignedIn ? (
          <div className="flex items-center gap-3">
            <Button
              variant="secondary"
              size="default"
              className="rounded-full bg-black text-white hover:bg-neutral-800 border-none font-bold text-sm py-2 px-4 gap-2 flex items-center cursor-default select-none"
            >
              <User className="size-4" />
              <span>{user.username || user.firstName || "Profile"}</span>
            </Button>
            <Button
              variant="ghost"
              onClick={handleSignOut}
              className="text-neutral-400 hover:text-white text-sm font-semibold transition py-2 px-4 flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="size-4" />
              <span>Log out</span>
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              href="/signup"
              className="text-neutral-400 hover:text-white text-sm font-bold transition duration-200 py-2 px-4 cursor-pointer"
            >
              Sign up
            </Link>
            <Link href="/login">
              <Button
                variant="secondary"
                size="default"
                className="rounded-full bg-white text-black hover:scale-105 transition font-bold text-sm py-2 px-6 cursor-pointer"
              >
                Log in
              </Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
