"use client";

import React from "react";

interface CategoryDataPoint {
  name: string;
  count: number;
}

interface BlogChartsProps {
  categoryData: CategoryDataPoint[];
  totalBlogs: number;
}

export default function BlogCharts({ categoryData, totalBlogs }: BlogChartsProps) {
  // If zero state, show default categories list with 0 count
  const displayCategoryData =
    categoryData.length > 0
      ? categoryData
      : [
          { name: "Renovation & Upgrading", count: 0 },
          { name: "Structural & Exterior Works", count: 0 },
          { name: "Painting & Waterproofing", count: 0 },
          { name: "Aluminium & Glazing Works", count: 0 },
          { name: "Electrical, Plumbing & Aircon", count: 0 },
          { name: "Solar Panel Installation", count: 0 },
        ];

  const maxCount = Math.max(...displayCategoryData.map((d) => d.count), 1);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Category Chart */}
      <div className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm lg:col-span-2 space-y-4">
        <div>
          <h3 className="text-base font-extrabold text-secondary font-display">
            Articles Count by Category
          </h3>
          <p className="text-xs text-slate-500">Distribution of educational articles</p>
        </div>

        {/* Custom SVG Bar Chart */}
        <div className="w-full pt-4">
          <div className="space-y-3.5">
            {displayCategoryData.map((item, idx) => {
              const percentage = (item.count / maxCount) * 100;
              return (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-700 font-bold truncate max-w-[250px]">
                      {item.name}
                    </span>
                    <span className="text-primary font-extrabold">
                      {item.count} {item.count === 1 ? "Article" : "Articles"}
                    </span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex">
                    <div
                      style={{ width: `${item.count > 0 ? percentage : 5}%` }}
                      className={`h-full rounded-full transition-all duration-500 shadow-inner ${
                        item.count > 0
                          ? "bg-gradient-to-r from-primary to-[#8c2227]"
                          : "bg-slate-200"
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Monthly publishing trends */}
      <div className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm flex flex-col justify-between space-y-4">
        <div>
          <h3 className="text-base font-extrabold text-secondary font-display">
            Publishing Frequency
          </h3>
          <p className="text-xs text-slate-500">Monthly article additions</p>
        </div>

        {/* Custom SVG line / point graph */}
        <div className="flex-1 flex items-center justify-center py-4">
          {totalBlogs > 0 ? (
            <svg viewBox="0 0 200 120" className="w-full h-auto overflow-visible">
              {/* Grid lines */}
              <line x1="10" y1="20" x2="190" y2="20" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="10" y1="60" x2="190" y2="60" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="10" y1="100" x2="190" y2="100" stroke="#e2e8f0" strokeWidth="1.5" />

              <defs>
                <linearGradient id="month-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#641215" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#641215" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Area under graph */}
              <path
                d="M 20 100 L 20 80 L 70 80 Q 120 40, 170 30 L 170 100 Z"
                fill="url(#month-grad)"
              />

              {/* Line path */}
              <path
                d="M 20 80 L 70 80 Q 120 40, 170 30"
                fill="none"
                stroke="#641215"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* Point indicators */}
              <circle cx="20" cy="80" r="3.5" fill="#102039" stroke="#641215" strokeWidth="1.5" />
              <circle cx="70" cy="80" r="3.5" fill="#102039" stroke="#641215" strokeWidth="1.5" />
              <circle cx="170" cy="30" r="3.5" fill="#102039" stroke="#641215" strokeWidth="1.5" />

              {/* Value badges */}
              <text x="20" y="70" fill="#641215" fontSize="8" fontWeight="bold" textAnchor="middle">1</text>
              <text x="70" y="70" fill="#641215" fontSize="8" fontWeight="bold" textAnchor="middle">1</text>
              <text x="170" y="20" fill="#641215" fontSize="8" fontWeight="bold" textAnchor="middle">6</text>

              {/* Month labels */}
              <text x="20" y="112" fill="#94a3b8" fontSize="8" fontWeight="bold" textAnchor="middle">Jan</text>
              <text x="70" y="112" fill="#94a3b8" fontSize="8" fontWeight="bold" textAnchor="middle">Feb</text>
              <text x="170" y="112" fill="#94a3b8" fontSize="8" fontWeight="bold" textAnchor="middle">Mar</text>
            </svg>
          ) : (
            <svg viewBox="0 0 200 120" className="w-full h-auto overflow-visible">
              {/* Flat zero lines */}
              <line x1="10" y1="20" x2="190" y2="20" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="10" y1="60" x2="190" y2="60" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="10" y1="100" x2="190" y2="100" stroke="#e2e8f0" strokeWidth="1.5" />
              <line x1="10" y1="100" x2="190" y2="100" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3,3" />

              <text x="100" y="65" fill="#94a3b8" fontSize="9" fontWeight="bold" textAnchor="middle">
                0 Publications Logged
              </text>
            </svg>
          )}
        </div>

        <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
          <p className="text-[10px] text-slate-500 leading-relaxed text-center font-medium">
            {totalBlogs > 0
              ? "Strongest publishing output recorded in March 2026."
              : "Waiting for content syndication to initialize."}
          </p>
        </div>
      </div>
    </div>
  );
}
