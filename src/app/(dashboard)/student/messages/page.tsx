"use client";

import { useState } from "react";
import { 
  Search, 
  Send, 
  Paperclip, 
  Phone, 
  Video,
  Info,
  CheckCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const chats = [
  { id: 1, name: "Ahmed Aloui", house: "Modern Studio - INSAT", lastMsg: "I'll see you at 2:30 PM then!", time: "2m ago", unread: 1, avatar: "AA" },
  { id: 2, name: "Sami Ben Ali", house: "Shared Apt - Ariana", lastMsg: "The WiFi is indeed high-speed.", time: "1h ago", unread: 0, avatar: "SA" },
  { id: 3, name: "Mouna Dridi", house: "Luxury Loft - Marsa", lastMsg: "Sorry, we don't allow pets.", time: "Yesterday", unread: 0, avatar: "MD" },
];

export default function StudentMessagesPage() {
  const [selectedChat, setSelectedChat] = useState(chats[0]);

  return (
    <div className="h-[calc(100vh-180px)] flex bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative">
      {/* Background Orbs for the chat */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Sidebar: Chats List */}
      <div className="w-80 border-r border-white/5 flex flex-col bg-slate-950/20 backdrop-blur-md shrink-0">
        <div className="p-6 border-b border-white/5">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
            <Input 
              placeholder="Search conversations..." 
              className="pl-9 h-9 bg-white/5 border-white/5 text-white text-xs rounded-xl focus-visible:ring-blue-500/50"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {chats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className={cn(
                "w-full p-4 flex items-center gap-4 transition-all hover:bg-white/5 border-b border-white/5 last:border-0 relative",
                selectedChat.id === chat.id && "bg-white/5 after:absolute after:left-0 after:top-0 after:bottom-0 after:w-1 after:bg-blue-500"
              )}
            >
              <div className="h-10 w-10 rounded-xl bg-white/10 text-slate-400 flex items-center justify-center font-bold text-xs shrink-0">
                {chat.avatar}
              </div>
              <div className="flex-1 min-w-0 text-left">
                <div className="flex justify-between items-baseline mb-0.5">
                  <span className="text-sm font-bold text-white truncate">{chat.name}</span>
                  <span className="text-[9px] text-slate-500 font-bold uppercase">{chat.time}</span>
                </div>
                <p className="text-[10px] text-blue-400 font-bold truncate mb-0.5">{chat.house}</p>
                <p className="text-xs text-slate-500 truncate font-medium">{chat.lastMsg}</p>
              </div>
              {chat.unread > 0 && (
                <span className="h-4 w-4 bg-blue-600 text-[9px] font-black text-white rounded-full flex items-center justify-center shadow-lg shadow-blue-600/30">
                  {chat.unread}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main: Chat View */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-950/10 relative z-10">
        {/* Chat Header */}
        <div className="h-16 px-6 border-b border-white/5 flex items-center justify-between bg-white/2 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="h-9 w-9 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs">
              {selectedChat.avatar}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-white">{selectedChat.name}</span>
              <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Property Owner</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white"><Phone className="h-4 w-4" /></Button>
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white"><Video className="h-4 w-4" /></Button>
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white"><Info className="h-4 w-4" /></Button>
          </div>
        </div>

        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
          <div className="flex flex-col gap-1 items-start">
            <div className="bg-white/10 text-white p-4 rounded-2xl rounded-tl-none max-w-[70%] text-sm font-medium border border-white/5">
              Hello Ahmed! Is the studio near INSAT still available for July?
            </div>
            <span className="text-[9px] text-slate-500 font-bold uppercase ml-1">10:15 AM</span>
          </div>

          <div className="flex flex-col gap-1 items-end">
            <div className="bg-blue-600 text-white p-4 rounded-2xl rounded-tr-none max-w-[70%] text-sm font-medium shadow-xl shadow-blue-600/20">
              Hello Sami! Yes, it&apos;s still available. Would you like to schedule a visit?
            </div>
            <span className="text-[9px] text-slate-500 font-bold uppercase mr-1">10:16 AM <CheckCheck className="h-3 w-3 inline ml-1 text-blue-300" /></span>
          </div>

          <div className="flex flex-col gap-1 items-start">
            <div className="bg-white/10 text-white p-4 rounded-2xl rounded-tl-none max-w-[70%] text-sm font-medium border border-white/5">
              Yes, please! Can I come today at 2:30 PM?
            </div>
            <span className="text-[9px] text-slate-500 font-bold uppercase ml-1">10:17 AM</span>
          </div>

          <div className="flex flex-col gap-1 items-end">
            <div className="bg-blue-600 text-white p-4 rounded-2xl rounded-tr-none max-w-[70%] text-sm font-medium shadow-xl shadow-blue-600/20">
              I&apos;ll see you at 2:30 PM then!
            </div>
            <span className="text-[9px] text-slate-500 font-bold uppercase mr-1">10:18 AM <CheckCheck className="h-3 w-3 inline ml-1 text-blue-300" /></span>
          </div>
        </div>

        {/* Chat Input */}
        <div className="p-6 bg-white/2 backdrop-blur-md border-t border-white/5">
          <form className="flex items-center gap-3" onSubmit={(e) => e.preventDefault()}>
            <Button type="button" variant="ghost" size="icon" className="h-10 w-10 rounded-xl bg-white/5 hover:bg-white/10 text-slate-500 hover:text-white shrink-0">
              <Paperclip className="h-5 w-5" />
            </Button>
            <Input 
              placeholder="Message Ahmed Aloui..." 
              className="flex-1 h-11 bg-white/5 border-white/5 text-white placeholder:text-slate-600 rounded-xl focus-visible:ring-blue-500/50"
            />
            <Button type="submit" className="h-11 w-11 rounded-xl bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20 shrink-0">
              <Send className="h-5 w-5" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
