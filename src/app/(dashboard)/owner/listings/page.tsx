import {
  Plus,
  Search,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Suspense } from "react";
import MyListingsList from "./components/my-listings";

export default function MyListingsPage() {
  return (
    <div className="space-y-8">
      {/* Header Action Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            My Listings
          </h1>
          <p className="text-slate-500 text-sm">
            Manage and monitor your properties across Tunisia
          </p>
        </div>
        <Link href="/owner/listings/new">
          <Button className="h-12 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/20 px-6 transition-all group">
            <Plus className="mr-2 h-5 w-5 group-hover:rotate-90 transition-transform" />
            Add New Property
          </Button>
        </Link>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-4 bg-white/5 border border-white/10 p-4 rounded-3xl">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
          <Input
            placeholder="Search listings..."
            className="pl-10 bg-white/5 border-white/5 text-white placeholder:text-slate-600 focus-visible:ring-indigo-500/50 rounded-xl"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="bg-white/5 border-white/5 text-white hover:bg-white/10 rounded-xl px-4"
          >
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <select className="bg-white/5 border border-white/5 text-sm font-bold text-slate-400 rounded-xl px-4 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500">
            <option>All Status</option>
            <option>Published</option>
            <option>Draft</option>
          </select>
        </div>
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 gap-4">
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-[200px]">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
            </div>
          }
        >
          <MyListingsList />
        </Suspense>
      </div>
    </div>
  );
}
