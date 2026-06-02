"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiTrash2, FiCheckCircle, FiAlertCircle } from "react-icons/fi";

type Status = "idle" | "deleting" | "deleted" | "error";

export function DeletePostButton({ postId, title }: { postId: string; title: string }) {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("idle");

  async function handleDelete() {
    const confirmed = window.confirm(`Delete "${title}"? This removes it from the news feed.`);
    if (!confirmed) return;

    setStatus("deleting");
    const response = await fetch(`/api/admin/posts/${postId}`, { method: "DELETE" });

    if (!response.ok) {
      setStatus("error");
      return;
    }

    setStatus("deleted");
    setTimeout(() => router.refresh(), 1500);
  }

  if (status === "deleted") {
    return (
      <div className="inline-flex items-center gap-2 rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm font-bold text-green-800">
        <FiCheckCircle size={15} className="text-green-600" />
        Post deleted
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="inline-flex items-center gap-2 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm font-bold text-red-800">
        <FiAlertCircle size={15} className="text-red-600" />
        Failed to delete
      </div>
    );
  }

  return (
    <button
      onClick={handleDelete}
      disabled={status === "deleting"}
      className="inline-flex items-center justify-center gap-2 rounded-md bg-red-700 px-3 py-2 text-sm font-bold text-white hover:bg-red-800 disabled:opacity-70"
    >
      <FiTrash2 />
      {status === "deleting" ? "Deleting..." : "Delete"}
    </button>
  );
}
