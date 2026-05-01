"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") ?? "/admin";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setLoading(false);
    if (res?.error) {
      setError("Invalid email or password.");
      return;
    }
    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-md">
        <p className="font-mono text-[0.7rem] uppercase tracking-wider2 text-gold-light">
          Editorial CMS / Sign in
        </p>
        <h1 className="mt-3 font-display text-5xl text-cream-50">
          Welcome back.
        </h1>
        <p className="mt-3 text-cream-50/70">
          Sign in to edit the published site.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 space-y-5">
          <label className="block">
            <span className="font-mono text-[0.65rem] uppercase tracking-wider2 text-cream-50/60">
              Email
            </span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 block w-full rounded-md border border-cream-50/20 bg-cream-50/5 px-4 py-3 text-cream-50 placeholder-cream-50/40 outline-none focus:border-gold-light"
              placeholder="you@example.com"
            />
          </label>
          <label className="block">
            <span className="font-mono text-[0.65rem] uppercase tracking-wider2 text-cream-50/60">
              Password
            </span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 block w-full rounded-md border border-cream-50/20 bg-cream-50/5 px-4 py-3 text-cream-50 placeholder-cream-50/40 outline-none focus:border-gold-light"
              placeholder="••••••••"
            />
          </label>

          {error && (
            <p className="rounded-md border border-rust/40 bg-rust/10 px-4 py-2 font-mono text-xs text-rust">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="block w-full rounded-md bg-gold px-4 py-3 font-mono text-sm uppercase tracking-wider2 text-cream-50 hover:bg-gold-dark disabled:opacity-50"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
