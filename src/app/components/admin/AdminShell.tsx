import Link from "next/link";
import { FiBarChart2, FiEdit3, FiGrid, FiHome, FiLogOut } from "react-icons/fi";
import { AdminSessionBoundary } from "./AdminSessionBoundary";

type AdminShellProps = {
  children: React.ReactNode;
  title: string;
  description: string;
};

const links = [
  { href: "/admin", label: "Dashboard", icon: FiHome },
  { href: "/admin/create-post", label: "Create Post", icon: FiEdit3 },
  { href: "/admin/gallery", label: "Gallery", icon: FiGrid },
  { href: "/admin/analytics", label: "Visitor Analytics", icon: FiBarChart2 },
];

export function AdminShell({ children, title, description }: AdminShellProps) {
  return (
    <AdminSessionBoundary>
      <div className="min-h-screen bg-slate-100 text-slate-950 md:flex">
        <aside className="md:sticky md:top-0 md:h-screen md:w-72 bg-blue-950 text-white px-5 py-6">
          <div className="mb-8">
            <p className="text-xs font-bold uppercase tracking-wide text-blue-200">Admin</p>
            <h1 className="font-poppins text-2xl font-extrabold">Sauri Growth Initiative</h1>
          </div>
          <nav className="flex flex-col gap-2">
            {links.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href} className="inline-flex items-center gap-3 rounded-md px-3 py-3 font-semibold hover:bg-white hover:text-blue-950">
                  <Icon />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <form action="/api/admin/logout" method="post" className="mt-8">
            <button className="inline-flex w-full items-center gap-3 rounded-md px-3 py-3 font-semibold text-blue-100 hover:bg-white hover:text-blue-950">
              <FiLogOut />
              Sign Out
            </button>
          </form>
        </aside>
        <section className="flex-1 px-5 py-8 md:px-8">
          <div className="mb-6">
            <h2 className="font-poppins text-3xl font-extrabold md:text-4xl">{title}</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 md:text-base">{description}</p>
          </div>
          {children}
        </section>
      </div>
    </AdminSessionBoundary>
  );
}
