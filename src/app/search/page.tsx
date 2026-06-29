import { Search } from "lucide-react";

export default function SearchPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-white">Search</h2>
        <p className="text-sm text-neutral-400 max-w-md leading-relaxed">
          Search for songs, artists, podcasts, and playlists.
        </p>
      </div>

      {/* Mock Search Input */}
      <div className="relative max-w-md w-full">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-neutral-400">
          <Search className="size-5" />
        </span>
        <input
          type="text"
          placeholder="What do you want to listen to?"
          disabled
          className="w-full bg-zinc-800 text-white placeholder-neutral-400 text-sm rounded-full py-3 pl-11 pr-4 border border-transparent opacity-60 cursor-not-allowed select-none"
        />
      </div>
    </div>
  );
}
