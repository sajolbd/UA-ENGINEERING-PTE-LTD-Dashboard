"use client";

import React from "react";
import { Sparkles, Menu } from "lucide-react";

interface HeaderProps {
  totalViews: number;
  onMenuClick?: () => void;
}

export default function Header({ totalViews, onMenuClick }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-4 sm:px-6 py-4 bg-white border-b border-slate-200 shadow-sm shrink-0">
      <div className="flex items-center gap-3">
        {/* Hamburger — mobile only */}
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
          aria-label="Open Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Mobile Logo */}
        <div className="md:hidden p-2 bg-[#0a1526] rounded-xl flex items-center justify-center">
          <img src="/images/logo.png" alt="Logo" className="h-7 w-auto max-w-[120px] object-contain animate-fade-in" />
        </div>

        <div>
          <h2 className="text-base sm:text-xl font-extrabold text-secondary font-display leading-tight">
            Website Content Dashboard
          </h2>
          <p className="text-xs text-slate-500 hidden sm:block">
            UA Engineering Blog Metrics &amp; Analytics
          </p>
        </div>
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Readers Count Badge */}
        <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 bg-primary-light border border-primary/10 rounded-full">
          <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse shrink-0" />
          <span className="text-[10px] sm:text-[11px] font-extrabold text-primary tracking-wider whitespace-nowrap">
            {totalViews.toLocaleString()} <span className="hidden sm:inline">BLOG </span>VIEWS
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
