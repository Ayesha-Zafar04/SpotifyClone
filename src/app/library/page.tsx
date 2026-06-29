export default function LibraryPage() {
  const categories = ["Playlists", "Podcasts", "Artists", "Albums"];

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-white">Your Library</h2>
        <p className="text-sm text-neutral-400 max-w-md leading-relaxed">
          Manage and browse your saved music, custom playlists, and podcasts.
        </p>
      </div>

      {/* Mock Filter Chips */}
      <div className="flex gap-2">
        {categories.map((cat) => (
          <span
            key={cat}
            className="px-4 py-2 bg-zinc-800 text-white rounded-full text-xs font-semibold cursor-default select-none hover:bg-zinc-700 transition"
          >
            {cat}
          </span>
        ))}
      </div>

      {/* Library Empty State */}
      <div className="flex flex-col items-center justify-center p-12 bg-zinc-900/40 rounded-lg border border-zinc-800/40 text-center max-w-lg mt-4">
        <span className="font-bold text-white text-base mb-2">Build your library</span>
        <span className="text-sm text-neutral-400 mb-6 max-w-sm">
          Save your favorite songs, albums, and playlists to access them here anytime.
        </span>
        <button className="bg-white text-black font-bold text-sm px-6 py-2.5 rounded-full hover:scale-105 transition cursor-default">
          Explore music
        </button>
      </div>
    </div>
  );
}
