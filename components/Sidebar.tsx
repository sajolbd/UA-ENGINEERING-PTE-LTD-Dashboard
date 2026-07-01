"use client";

import React from "react";
import {
  LayoutDashboard,
  Home as HomeIcon,
  Info,
  Briefcase,
  FolderGit,
  BookOpen,
  PhoneCall,
  ChevronLeft,
  ChevronRight,
  LogOut
} from "lucide-react";

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout?: () => void;
}

export default function Sidebar({
  isCollapsed,
  setIsCollapsed,
  activeTab,
  setActiveTab,
  onLogout
}: SidebarProps) {
  // Sidebar menu lists

  const pagesList = [
    { id: "home", label: "Home Page", icon: HomeIcon },
    { id: "about", label: "About Page", icon: Info },
    { id: "services", label: "Services Page", icon: Briefcase },
    { id: "projects", label: "Projects Page", icon: FolderGit },
    { id: "blog", label: "Blog Page", icon: BookOpen },
    { id: "contact", label: "Contact Page", icon: PhoneCall },
  ];

  return (
    <aside
      className={`hidden md:flex flex-col bg-[#0a1526] text-white shrink-0 shadow-xl border-r border-[#15233c] transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Sidebar Header */}
      <div className="relative flex items-center justify-between px-4 py-5 border-b border-[#15233c] h-20 bg-[#070f1c]">
        {!isCollapsed ? (
          <div className="flex items-center justify-center w-full px-2">
            <img
              src="/images/footer-logo.png"
              alt="UA Engineering Logo"
              className="max-h-14 w-auto object-contain brightness-100"
            />
          </div>
        ) : (
          <div className="w-full flex justify-center">
            <img
              src="/images/logo.png"
              alt="UA Engineering Logo Icon"
              className="h-10 w-10 object-contain brightness-100"
            />
          </div>
        )}

        {/* Floating Collapse Toggle Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3.5 top-1/2 -translate-y-1/2 p-1 bg-primary text-white border border-[#15233c] hover:bg-primary-hover rounded-full shadow-lg transition-transform hover:scale-110 z-10"
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation Links Accordion */}
      <nav className="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto thin-scrollbar select-none">
        
        {/* Dashboard Overview */}
        <button
          onClick={() => {
            setActiveTab("overview");
          }}
          className={`flex items-center justify-between w-full py-2.5 text-xs font-bold rounded-xl transition-all duration-300 group ${
            activeTab === "overview"
              ? "bg-primary text-white shadow-lg shadow-primary/20 scale-[1.02]"
              : "text-slate-400 hover:text-white hover:bg-slate-800/20"
          } ${isCollapsed ? "px-2 justify-center" : "px-4"}`}
        >
          <div className="flex items-center gap-3">
            <LayoutDashboard className="w-4 h-4 text-accent shrink-0" />
            {!isCollapsed && <span>Dashboard Overview</span>}
          </div>
        </button>

        {/* Separator */}
        <div className="pt-4 pb-1 border-t border-[#15233c] mt-2 mb-1">
          {!isCollapsed ? (
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 px-4">
              Website CMS Sections
            </span>
          ) : (
            <div className="border-b border-[#15233c] mx-4" />
          )}
        </div>

        {/* Page CMS Links */}
        {pagesList.map((page) => {
          const PageIcon = page.icon;
          const isActive = activeTab === `${page.id}_content`;
          
          return (
            <button
              key={page.id}
              onClick={() => setActiveTab(`${page.id}_content`)}
              className={`flex items-center justify-between w-full py-2.5 text-xs font-bold rounded-xl transition-all duration-300 group ${
                isActive
                  ? "bg-primary text-white shadow-lg shadow-primary/20 scale-[1.02]"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/20"
              } ${isCollapsed ? "px-2 justify-center" : "px-4"}`}
            >
              <div className="flex items-center gap-3">
                <PageIcon className="w-4 h-4 shrink-0 text-slate-400 group-hover:text-slate-200" />
                {!isCollapsed && <span>{page.label}</span>}
              </div>
            </button>
          );
        })}

        {/* Dynamic Database Lists */}
        <div className="pt-4 pb-1 border-t border-[#15233c] mt-2 mb-1">
          {!isCollapsed ? (
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 px-4">
              Database Lists
            </span>
          ) : (
            <div className="border-b border-[#15233c] mx-4" />
          )}
        </div>

        <button
          onClick={() => setActiveTab("services_list")}
          className={`flex items-center justify-between w-full py-2.5 text-xs font-bold rounded-xl transition-all duration-300 group ${
            activeTab === "services_list"
              ? "bg-primary text-white shadow-lg shadow-primary/20 scale-[1.02]"
              : "text-slate-400 hover:text-white hover:bg-slate-800/20"
          } ${isCollapsed ? "px-2 justify-center" : "px-4"}`}
        >
          <div className="flex items-center gap-3">
            <Briefcase className="w-4 h-4 shrink-0 text-slate-400 group-hover:text-slate-200" />
            {!isCollapsed && <span>Services Directory</span>}
          </div>
        </button>

        <button
          onClick={() => setActiveTab("projects_list")}
          className={`flex items-center justify-between w-full py-2.5 text-xs font-bold rounded-xl transition-all duration-300 group ${
            activeTab === "projects_list"
              ? "bg-primary text-white shadow-lg shadow-primary/20 scale-[1.02]"
              : "text-slate-400 hover:text-white hover:bg-slate-800/20"
          } ${isCollapsed ? "px-2 justify-center" : "px-4"}`}
        >
          <div className="flex items-center gap-3">
            <FolderGit className="w-4 h-4 shrink-0 text-slate-400 group-hover:text-slate-200" />
            {!isCollapsed && <span>Portfolio Projects</span>}
          </div>
        </button>

        {onLogout && (
          <>
            <div className="pt-4 border-t border-[#15233c] mt-2 mb-2" />
            <button
              onClick={onLogout}
              className={`flex items-center justify-between w-full py-2.5 text-xs font-bold rounded-xl transition-all duration-300 text-rose-400 hover:text-rose-200 hover:bg-rose-500/10 ${
                isCollapsed ? "px-2 justify-center" : "px-4"
              }`}
            >
              <div className="flex items-center gap-3">
                <LogOut className="w-4 h-4 shrink-0" />
                {!isCollapsed && <span>Sign Out</span>}
              </div>
            </button>
          </>
        )}
      </nav>
    </aside>
  );
}
