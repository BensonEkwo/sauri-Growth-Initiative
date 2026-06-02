import { IoArrowBack } from "react-icons/io5";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostGallery } from "@/app/components/news/PostGallery";
import { getPostBySlug } from "@/lib/postsStore";

type NewsPostPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export default async function NewsPostPage({ params }: NewsPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="flex w-full flex-col items-start px-4 mt-24 md:mt-36 space-y-6 mb-16 md:space-y-10 md:px-10">
      <Link href="/news-feed" className="inline-flex items-center space-x-2">
        <span className="text-xl md:text-2xl"><IoArrowBack /></span>
        <span className="inline text-sm md:text-base">News Feed</span>
      </Link>
      <article className="w-full max-w-6xl space-y-8">
        <div className="space-y-4">
          <p className="inline-block rounded-xl bg-neutral-300 px-3 py-1 text-xs font-semibold uppercase">{post.category}</p>
          <h1 className="font-poppins text-3xl font-bold leading-tight md:text-6xl md:font-extrabold md:leading-tight">
            {post.title}
          </h1>
          <p className="text-sm font-semibold text-blue-950">{new Date(post.publishedAt).toLocaleDateString()}</p>
        </div>
        <PostGallery post={post} />
        <div className="max-w-3xl space-y-5 rounded-md bg-white py-2 md:px-8 md:py-8 md:shadow-md">
          <p className="text-lg font-semibold leading-8 text-blue-950">{post.excerpt}</p>
          {post.body.split(/\n{2,}/).map((paragraph) => (
            <p key={paragraph} className="text-base leading-8 text-blue-950">
              {paragraph}
            </p>
          ))}
        </div>
      </article>
    </div>
  );
}
