"use client";

import React from "react";
import { Sparkles } from "lucide-react";

interface HeaderProps {
  totalViews: number;
}

export default function Header({ totalViews }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200 shadow-sm shrink-0">
      <div className="flex items-center gap-3">
        {/* Mobile Logo */}
        <div className="md:hidden p-2 bg-[#0a1526] rounded-xl flex items-center justify-center">
          <img src="/favicon.png" alt="Logo" className="h-8 w-8 object-contain" />
        </div>
        <div>
          <h2 className="text-xl font-extrabold text-secondary font-display">
            Website Content Dashboard
          </h2>
          <p className="text-xs text-slate-500 hidden sm:block">
            UA Engineering Blog Metrics & Analytics
          </p>
        </div>
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-4">
        {/* Readers Count Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-primary-light border border-primary/10 rounded-full">
          <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
          <span className="text-[11px] font-extrabold text-primary tracking-wider">
            {totalViews.toLocaleString()} BLOG VIEWS
          </span>
        </div>

        <div className="text-right hidden lg:block">
          <p className="text-xs font-bold text-secondary">Active Status</p>
          <p className="text-[9px] font-semibold text-emerald-600 uppercase tracking-widest flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block animate-ping" />
            Live Sync
          </p>
        </div>
      </div>
    </header>
  );
}
