"use client";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/admin/login" })}
      className="block w-full rounded-md bg-rust px-3 py-2 text-center font-mono text-[0.7rem] uppercase tracking-wider2 text-cream-50 hover:bg-rust/80"
    >
      Sign out
    </button>
  );
}
