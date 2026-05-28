"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";

export function DeletePostButton({ postId, title }: { postId: string; title: string }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(`Delete "${title}"? This removes it from the news feed.`);

    if (!confirmed) {
      return;
    }

    setIsDeleting(true);
    const response = await fetch(`/api/admin/posts/${postId}`, { method: "DELETE" });

    if (!response.ok) {
      setIsDeleting(false);
      window.alert("Unable to delete this post.");
      return;
    }

    router.refresh();
  }

  return (
    <button onClick={handleDelete} disabled={isDeleting} className="inline-flex items-center justify-center gap-2 rounded-md bg-red-700 px-3 py-2 text-sm font-bold text-white hover:bg-red-800 disabled:opacity-70">
      <FiTrash2 />
      {isDeleting ? "Deleting" : "Delete"}
    </button>
  );
}
