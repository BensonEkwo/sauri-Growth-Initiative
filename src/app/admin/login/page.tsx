"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/admin/login", {
      method: "POST",
      body: JSON.stringify({ password: formData.get("password") }),
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      setError("Invalid admin password.");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="mt-28 flex min-h-[70vh] items-center justify-center bg-slate-100 px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-md bg-white p-6 shadow-lg">
        <p className="text-sm font-bold uppercase text-blue-900">Secure Admin</p>
        <h1 className="mt-2 font-poppins text-3xl font-extrabold">Sign in</h1>
        <label className="mt-6 flex flex-col gap-2">
          <span className="text-sm font-bold text-slate-700">Admin password</span>
          <input name="password" type="password" required className="rounded-md border border-slate-300 px-4 py-3 outline-none focus:border-blue-800" />
        </label>
        {error ? <p className="mt-3 text-sm font-semibold text-red-700">{error}</p> : null}
        <button className="mt-6 w-full rounded-md bg-blue-900 px-5 py-3 font-bold text-white hover:bg-blue-800">
          Continue
        </button>
      </form>
    </div>
  );
}
