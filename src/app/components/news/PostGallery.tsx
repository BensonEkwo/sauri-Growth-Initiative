import type { StoredPost } from "@/lib/postsStore";

type PostGalleryProps = {
  post: StoredPost;
};

export function PostGallery({ post }: PostGalleryProps) {
  const items = [...post.mediaItems].sort((first, second) => first.order - second.order);

  if (post.galleryLayout === "grid") {
    return (
      <div className="grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <img key={item.key} src={item.url} alt={item.fileName} className="aspect-[4/3] w-full rounded-md object-cover" />
        ))}
      </div>
    );
  }

  if (post.galleryLayout === "stack") {
    return (
      <div className="flex w-full flex-col gap-5">
        {items.map((item) => (
          <img key={item.key} src={item.url} alt={item.fileName} className="max-h-[560px] w-full rounded-md object-cover" />
        ))}
      </div>
    );
  }

  const [lead, ...rest] = items;

  return (
    <div className="grid w-full gap-3">
      {lead ? <img src={lead.url} alt={lead.fileName} className="max-h-[620px] w-full rounded-md object-cover" /> : null}
      {rest.length ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((item) => (
            <img key={item.key} src={item.url} alt={item.fileName} className="aspect-[4/3] w-full rounded-md object-cover" />
          ))}
        </div>
      ) : null}
    </div>
  );
}
