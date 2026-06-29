import { SignIn } from "@clerk/nextjs";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black p-4">
      <SignIn
        signUpUrl="/signup"
        forceRedirectUrl="/"
        appearance={{
          variables: {
            colorPrimary: "#1db954",
            colorBackground: "#121212",
          },
          elements: {
            card: "border border-zinc-800/80 shadow-2xl rounded-xl",
            headerTitle: "text-white font-extrabold text-2xl",
            headerSubtitle: "text-neutral-400 text-sm",
            socialButtonsIconButton: "bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700",
            formButtonPrimary: "bg-[#1db954] hover:bg-[#1ed760] text-black font-bold uppercase py-3 rounded-full text-sm tracking-wider transition",
            footerActionLink: "text-emerald-400 hover:text-emerald-300 font-bold",
            dividerText: "text-neutral-500",
            dividerLine: "bg-zinc-800",
            formFieldLabel: "text-white text-xs font-bold uppercase tracking-wider mb-2",
            formFieldInput: "bg-zinc-900 border-zinc-800 text-white focus:border-zinc-700 rounded-md py-3",
          }
        }}
      />
    </div>
  );
}
