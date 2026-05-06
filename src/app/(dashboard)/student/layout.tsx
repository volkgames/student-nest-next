import { Bell } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { StudentSidebar } from "./components/student-sidebar";

export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (user.role !== "student") {
    redirect("/owner");
  }

  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "ST";

  return (
    <div className="min-h-screen bg-slate-950 flex text-white font-sans overflow-hidden">
      <StudentSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 relative h-screen">
        {/* Header */}
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-10 relative z-10 shrink-0">
          <div>
            <h2 className="text-lg font-bold text-white">Student Dashboard</h2>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
              Find your next nest, {user.name?.split(" ")[0]} 🎓
            </p>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative h-10 w-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
              <Bell className="h-5 w-5 text-slate-400" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-blue-500 rounded-full border-2 border-slate-950" />
            </button>
            <div className="flex items-center gap-3 px-3 py-1.5 bg-white/5 rounded-xl border border-white/10">
              <div className="h-8 w-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs">
                {initials}
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold">{user.name}</span>
                <span className="text-[9px] text-slate-500 font-bold uppercase tracking-tighter">
                  Verified Student
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Scroll Area */}
        <main className="flex-1 overflow-y-auto p-10 custom-scrollbar relative z-0">
          <div className="max-w-6xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
