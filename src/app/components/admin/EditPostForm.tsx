"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { FiGrid, FiImage, FiLayout, FiSave, FiStar } from "react-icons/fi";
import { StoredPost } from "@/lib/postsStore";

type Status = {
  type: "idle" | "loading" | "success" | "error";
  message: string;
};

export function EditPostForm({ post }: { post: StoredPost }) {
  const router = useRouter();
  const [status, setStatus] = useState<Status>({ type: "idle", message: "" });
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    setSelectedFiles(Array.from(event.target.files || []).map((file) => file.name));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus({ type: "loading", message: "Saving post..." });

    const formData = new FormData(event.currentTarget);
    const response = await fetch(`/api/admin/posts/${post.id}`, {
      method: "PATCH",
      body: formData,
    });
    const result = await response.json();

    if (!response.ok) {
      setStatus({ type: "error", message: result.message || "Unable to save post." });
      return;
    }

    setStatus({ type: "success", message: "Post updated." });
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 rounded-md bg-white p-4 shadow-md sm:p-5 md:grid-cols-2 md:p-8">
      <label className="flex flex-col gap-2 md:col-span-2">
        <span className="text-sm font-bold uppercase text-slate-600">Title</span>
        <input name="title" required defaultValue={post.title} className="rounded-md border border-slate-300 px-4 py-3 outline-none focus:border-blue-800" />
      </label>
      <label className="flex flex-col gap-2">
        <span className="text-sm font-bold uppercase text-slate-600">Category</span>
        <input name="category" required defaultValue={post.category} className="rounded-md border border-slate-300 px-4 py-3 outline-none focus:border-blue-800" />
      </label>
      <label className="flex flex-col gap-2">
        <span className="text-sm font-bold uppercase text-slate-600">Publish Date</span>
        <input name="publishedAt" type="date" required defaultValue={post.publishedAt.slice(0, 10)} className="rounded-md border border-slate-300 px-4 py-3 outline-none focus:border-blue-800" />
      </label>
      <label className="flex flex-col gap-2 md:col-span-2">
        <span className="text-sm font-bold uppercase text-slate-600">Excerpt</span>
        <textarea name="excerpt" rows={3} required defaultValue={post.excerpt} className="rounded-md border border-slate-300 px-4 py-3 outline-none focus:border-blue-800" />
      </label>
      <label className="flex flex-col gap-2 md:col-span-2">
        <span className="text-sm font-bold uppercase text-slate-600">Story Body</span>
        <textarea name="body" rows={8} required defaultValue={post.body} className="rounded-md border border-slate-300 px-4 py-3 outline-none focus:border-blue-800" />
      </label>
      <div className="md:col-span-2">
        <span className="inline-flex items-center gap-2 text-sm font-bold uppercase text-slate-600">
          <FiLayout />
          Story Arrangement
        </span>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          <LayoutOption icon={<FiStar />} title="Feature First" description="Large lead photo followed by supporting photos." value="feature" current={post.galleryLayout} />
          <LayoutOption icon={<FiGrid />} title="Equal Grid" description="Photos share the same visual weight." value="grid" current={post.galleryLayout} />
          <LayoutOption icon={<FiImage />} title="Story Stack" description="Photos appear in order between story sections." value="stack" current={post.galleryLayout} />
        </div>
      </div>
      <div className="md:col-span-2 rounded-md bg-slate-100 p-4">
        <p className="text-sm font-bold uppercase text-slate-600">Current Photos</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {post.mediaItems.map((item) => (
            <img key={item.key} src={item.url} alt={item.fileName} className="aspect-[4/3] w-full rounded-md object-cover" />
          ))}
        </div>
      </div>
      <label className="flex flex-col gap-2 md:col-span-2">
        <span className="inline-flex items-center gap-2 text-sm font-bold uppercase text-slate-600">
          <FiImage />
          Add More Photos
        </span>
        <input name="media" type="file" accept="image/*" multiple onChange={handleFileChange} className="rounded-md border border-dashed border-slate-400 bg-slate-50 px-4 py-5" />
      </label>
      {selectedFiles.length ? (
        <div className="md:col-span-2 rounded-md bg-slate-100 p-4">
          <p className="text-sm font-bold uppercase text-slate-600">New Uploads</p>
          <ol className="mt-3 grid gap-2 sm:grid-cols-2">
            {selectedFiles.map((fileName, index) => (
              <li key={`${fileName}-${index}`} className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-slate-700">
                {index + 1}. {fileName}
              </li>
            ))}
          </ol>
        </div>
      ) : null}
      <div className="flex flex-col gap-3 md:col-span-2 md:flex-row md:items-center md:justify-between">
        <p className={`text-sm font-semibold ${status.type === "error" ? "text-red-700" : "text-blue-900"}`}>
          {status.message}
        </p>
        <button disabled={status.type === "loading"} className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-blue-900 px-5 py-3 font-bold text-white hover:bg-blue-800 disabled:opacity-70 sm:w-max">
          <FiSave />
          Save Changes
        </button>
      </div>
    </form>
  );
}

function LayoutOption({ icon, title, description, value, current }: { icon: React.ReactNode; title: string; description: string; value: string; current: string }) {
  return (
    <label className="flex min-h-28 cursor-pointer flex-col justify-between rounded-md border border-slate-300 p-4 hover:border-blue-900">
      <span className="inline-flex items-center gap-2 font-bold text-slate-900">
        {icon}
        {title}
      </span>
      <span className="text-sm leading-5 text-slate-600">{description}</span>
      <input name="galleryLayout" type="radio" value={value} defaultChecked={current === value} className="mt-3 h-4 w-4" />
    </label>
  );
}
