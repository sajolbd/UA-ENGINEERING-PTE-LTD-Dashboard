"use client";

import React from "react";
import { BookOpen, Eye, TrendingUp, PlusCircle } from "lucide-react";

interface KPISectionProps {
  totalBlogs: number;
  totalViews: number;
  onAddBlogClick: () => void;
}

export default function KPISection({
  totalBlogs,
  totalViews,
  onAddBlogClick
}: KPISectionProps) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
      {/* Blog Post Count Card */}
      <div className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm flex items-center justify-between">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Total Published Blogs
          </span>
          <p className="text-4xl font-black text-primary font-display">
            {totalBlogs} <span className="text-xs text-slate-500 font-bold">Articles</span>
          </p>
          <p className="text-[11px] text-slate-500 font-medium">
            Live articles published on the corporate website
          </p>
        </div>
        <div className="p-4 rounded-2xl bg-primary-light border border-primary/5 text-primary">
          <BookOpen className="w-8 h-8" />
        </div>
      </div>

      {/* Views Card */}
      <div className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm flex items-center justify-between">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Accumulated Views
          </span>
          <p className="text-3xl font-extrabold text-secondary font-display">
            {totalViews.toLocaleString()}
          </p>
          <p className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
            <span>
              Average {totalBlogs > 0 ? Math.round(totalViews / totalBlogs) : 0} views per article
            </span>
          </p>
        </div>
        <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600">
          <Eye className="w-8 h-8" />
        </div>
      </div>

      {/* Add Blog Post Quick Action Card */}
      <button
        onClick={onAddBlogClick}
        className="p-6 bg-gradient-to-br from-primary to-primary-hover border border-primary/20 rounded-2xl shadow-sm flex items-center justify-between hover:shadow-md hover:scale-[1.01] active:scale-95 transition-all text-left"
      >
        <div className="space-y-2 text-white">
          <span className="text-[10px] font-black uppercase tracking-widest text-white/70">
            Quick Actions
          </span>
          <p className="text-xl font-black font-display">
            Add Blog Post
          </p>
          <p className="text-[11px] text-white/85 font-medium leading-relaxed">
            Publish a new article with MS Word rich text editor
          </p>
        </div>
        <div className="p-4 rounded-2xl bg-white/10 text-white border border-white/10 shrink-0">
          <PlusCircle className="w-8 h-8" />
        </div>
      </button>
    </div>
  );
}
