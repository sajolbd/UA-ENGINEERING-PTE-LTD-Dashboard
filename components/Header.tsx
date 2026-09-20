"use client";

import React from "react";
import { Sparkles, Menu, ShieldCheck, User } from "lucide-react";
import { AdminUser } from "./AdminManagement";
import { getImageUrl } from "../lib/api";

interface HeaderProps {
  totalViews: number;
  onMenuClick?: () => void;
  adminUser?: AdminUser | null;
}

export default function Header({ totalViews, onMenuClick, adminUser }: HeaderProps) {
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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo.webp" alt="Logo" className="h-7 w-auto max-w-[120px] object-contain animate-fade-in" />
        </div>

        <div>
          <h2 className="text-base sm:text-xl font-extrabold text-secondary font-display leading-tight">
            Website Content Dashboard
          </h2>
          <p className="text-xs text-slate-500 hidden sm:block">
            UA Engineering CMS &amp; Administration Control Panel
          </p>
        </div>
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Readers Count Badge */}
        <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 bg-primary-light border border-primary/10 rounded-full hidden xs:flex">
          <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse shrink-0" />
          <span className="text-[10px] sm:text-[11px] font-extrabold text-primary tracking-wider whitespace-nowrap">
            {totalViews.toLocaleString()} <span className="hidden sm:inline">BLOG </span>VIEWS
          </span>
        </div>

        {/* Logged in Admin Profile Badge */}
        {adminUser && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200/80 rounded-2xl shadow-sm">
            <div className="relative shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={getImageUrl(adminUser.avatar, "/images/logo.webp")}
                alt={adminUser.name}
                className="w-7 h-7 rounded-xl object-cover border border-slate-200"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/images/logo.webp";
                }}
              />
              <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 border border-white" />
            </div>

            <div className="hidden sm:block text-left">
              <p className="text-xs font-black text-slate-800 leading-none">{adminUser.name}</p>
              <p className="text-[9px] font-extrabold uppercase text-purple-600 tracking-wider mt-0.5 flex items-center gap-1">
                <ShieldCheck className="w-2.5 h-2.5" />
                {adminUser.role || "Administrator"}
              </p>
            </div>
          </div>
        )}

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
