"use client"

import React from "react";
import { 
  Menu, 
  Search, 
  Bell, 
  Settings, 
  HelpCircle,
  TrendingUp,
  Globe,
  LayoutGrid,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";

export function GlobalStatusBar() {
  return (
    <div className="sap-shell-bar">
      {/* Brand Section */}
      <div className="flex items-center space-x-3">
        <button className="p-2 hover:bg-white/10 rounded transition-colors">
          <Menu className="w-5 h-5 text-white" />
        </button>
        <div className="flex items-center space-x-3 group cursor-pointer">
          <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center">
            <TrendingUp className="text-white w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight text-white uppercase">AgriCTS</span>
            <span className="text-[10px] text-white/70 font-medium leading-none">海大农牧期现一体化供应链中台</span>
          </div>
        </div>
      </div>

      {/* Center Search (Fiori Shell Bar Search) */}
      <div className="hidden md:flex flex-1 max-w-xl mx-8 items-center bg-white/10 border border-white/20 rounded px-3 py-1.5 focus-within:bg-white focus-within:border-white group transition-all">
        <Search className="w-4 h-4 text-white group-focus-within:text-[#354a5f] mr-2" />
        <input 
          type="text" 
          placeholder="搜索应用、报表、合同或物料..." 
          className="bg-transparent border-none focus:ring-0 text-sm w-full placeholder:text-white/50 focus-within:placeholder:text-[#354a5f]/50 text-white focus-within:text-[#354a5f] outline-none"
        />
      </div>

      {/* Right Actions */}
      <div className="flex items-center space-x-1">
        <button className="p-2 hover:bg-white/10 rounded text-white relative transition-colors" title="通知中心">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 border-2 border-[#354a5f] rounded-full" />
        </button>
        
        <button className="p-2 hover:bg-white/10 rounded text-white transition-colors" title="帮助">
          <HelpCircle className="w-5 h-5" />
        </button>

        <button className="p-2 hover:bg-white/10 rounded text-white transition-colors" title="设置">
          <Settings className="w-5 h-5" />
        </button>

        <div className="h-6 w-px bg-white/20 mx-2" />

        <button className="flex items-center space-x-2 p-1 hover:bg-white/10 rounded transition-all group">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-sm border border-white/20">
            HS
          </div>
        </button>
      </div>
    </div>
  );
}
