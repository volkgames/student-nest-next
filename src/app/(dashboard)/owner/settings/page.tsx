import { getCurrentUser } from "@/lib/auth";
import { OwnerSettingsForm } from "./settings-form";
import { redirect } from "next/navigation";
import { User } from "@/db/schema";

export default async function OwnerSettingsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-20">
      <div>
        <h1 className="text-3xl font-black text-white tracking-tight">
          Settings
        </h1>
        <p className="text-slate-500 text-sm">
          Manage your profile and account preferences
        </p>
      </div>

      <OwnerSettingsForm user={user as User} />
    </div>
  );
}
