import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";
import { Heart, Shuffle, SkipBack, Play, SkipForward, Repeat, Volume2, ListMusic, Maximize2 } from "lucide-react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Spotify Clone",
  description: "A Spotify clone built with Next.js, Tailwind CSS, and shadcn/ui",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
      >
        <body className="h-full bg-black text-white flex flex-col overflow-hidden">
          {/* Main section: Sidebar + Content */}
          <div className="flex flex-1 overflow-hidden min-h-0">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0 p-2 md:pl-0 gap-2">
              <Header />
              <main className="flex-1 bg-zinc-900/50 rounded-b-lg overflow-y-auto min-h-0">
                {children}
              </main>
            </div>
          </div>

          {/* Reserved Bottom Section (Mock Music Player Bar) */}
          <footer className="h-20 bg-black border-t border-zinc-900/80 px-4 flex items-center justify-between text-neutral-400 select-none shrink-0">
            {/* Left: Mock Track Info */}
            <div className="flex items-center gap-3 w-1/3 min-w-[180px]">
              <div className="size-10 bg-zinc-800 rounded flex items-center justify-center text-[10px] text-zinc-500 font-bold">
                ART
              </div>
              <div className="flex flex-col gap-0.5 min-w-0">
                <span className="text-sm font-semibold text-white truncate cursor-default">
                  Select a track
                </span>
                <span className="text-xs text-neutral-400 truncate cursor-default">
                  No artist
                </span>
              </div>
              <button className="text-neutral-400 hover:text-white transition cursor-default ml-2">
                <Heart className="size-4" />
              </button>
            </div>

            {/* Center: Mock Playback Controls */}
            <div className="flex flex-col items-center gap-1.5 flex-1 max-w-[40%]">
              <div className="flex items-center gap-5">
                <button className="text-neutral-400 hover:text-white transition cursor-default">
                  <Shuffle className="size-4" />
                </button>
                <button className="text-neutral-400 hover:text-white transition cursor-default">
                  <SkipBack className="size-4" />
                </button>
                <button className="size-8 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition cursor-default">
                  <Play className="size-4 fill-black ml-0.5" />
                </button>
                <button className="text-neutral-400 hover:text-white transition cursor-default">
                  <SkipForward className="size-4" />
                </button>
                <button className="text-neutral-400 hover:text-white transition cursor-default">
                  <Repeat className="size-4" />
                </button>
              </div>
              {/* Mock Timeline Progress Bar */}
              <div className="flex items-center gap-2 w-full text-[10px] text-neutral-400">
                <span>0:00</span>
                <div className="flex-1 h-1 bg-zinc-800 rounded-full overflow-hidden">
                  <div className="w-0 h-full bg-neutral-400" />
                </div>
                <span>0:00</span>
              </div>
            </div>

            {/* Right: Mock Volume/Settings */}
            <div className="flex items-center gap-3 w-1/3 min-w-[180px] justify-end">
              <button className="text-neutral-400 hover:text-white transition cursor-default">
                <ListMusic className="size-4" />
              </button>
              <div className="flex items-center gap-2 max-w-[120px] w-full">
                <Volume2 className="size-4 text-neutral-400 shrink-0" />
                <div className="flex-1 h-1 bg-zinc-800 rounded-full overflow-hidden">
                  <div className="w-1/2 h-full bg-neutral-400" />
                </div>
              </div>
              <button className="text-neutral-400 hover:text-white transition cursor-default">
                <Maximize2 className="size-4" />
              </button>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
