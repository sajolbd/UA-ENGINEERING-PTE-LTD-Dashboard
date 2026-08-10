"use client";
import { API_BASE, getImageUrl } from "../lib/api";

import React, { useState, useRef } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import KPISection from "../components/KPISection";
import BlogCharts from "../components/BlogCharts";
import BlogTable from "../components/BlogTable";
import CmsForms from "../components/CmsForms";
import ServicesListEditor from "../components/ServicesListEditor";
import ProjectsListEditor from "../components/ProjectsListEditor";
import BreadcrumbEditor from "../components/BreadcrumbEditor";
import { blogPosts } from "../data/blogData";
import { initialCmsData, CmsDatabase, CmsContentUnion, PageSeo } from "../data/cmsData";
import {
  Plus,
  X,
  Save,
  CheckCircle,
  Bold,
  Italic,
  Underline,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Link as LinkIcon,
  Palette,
  Eraser,
  Image as ImageIcon,
  Video as VideoIcon,
  Table as TableIcon
} from "lucide-react";

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (newValue: string) => void;
}

function ImageUploadField({ label, value, onChange }: ImageUploadFieldProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setError("File is too large. Max limit is 10MB.");
      return;
    }

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(`${API_BASE}/api/upload`, {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      if (result.success && result.imagePath) {
        onChange(result.imagePath);
      } else {
        setError(result.error || "Upload failed");
      }
    } catch {
      setError("Connection to Express server failed.");
    } finally {
      setUploading(false);
    }
  };

  const fullImageUrl = getImageUrl(value);

  return (
    <div className="space-y-3">
      <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
        {label}
      </label>

      {value && (
        <div className="relative group max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 aspect-video shadow-sm transition-all duration-300 hover:shadow-md">
          <img
            src={fullImageUrl}
            alt="Uploaded Preview"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/images/footer-logo.png";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
            <span className="text-[10px] text-white font-extrabold tracking-widest uppercase">
              Current Live Preview
            </span>
          </div>
        </div>
      )}
      
      <div className="relative flex items-center bg-white border border-slate-200 rounded-xl focus-within:border-primary focus-within:ring-1 focus-within:ring-primary overflow-hidden transition-all duration-300">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="/images/placeholder.png"
          className="flex-1 px-3 py-3 text-sm outline-none bg-white text-slate-950 font-medium font-mono text-xs border-none focus:ring-0 focus:outline-none"
        />

        <label className="cursor-pointer inline-flex items-center justify-center px-4 py-3 bg-slate-50 hover:bg-slate-100 hover:text-slate-900 text-slate-600 text-xs font-bold transition-all border-l border-slate-200 select-none shrink-0 h-full">
          {uploading ? "Uploading..." : "Upload Image"}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
            className="hidden"
          />
        </label>
      </div>

      {error && <span className="text-[10px] font-bold text-red-600 block mt-1">{error}</span>}
    </div>
  );
}

export default function DashboardHome() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<string>("overview");
  
  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);

  // Blog State prefilled with actual website blog posts data
  const [posts, setPosts] = useState<typeof blogPosts>(blogPosts);

  // CMS State prefilled with actual website pages and SEO data
  const [cmsData, setCmsData] = useState<CmsDatabase>(initialCmsData);

  // Add Blog Modal States
  const [showAddBlogModal, setShowAddBlogModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Renovation & Upgrading");
  const [newImage, setNewImage] = useState("");
  const [newBgColor, setNewBgColor] = useState("bg-amber-100");
  const [newPopular, setNewPopular] = useState(false);

  // MS Word custom grid table selector states
  const [showTableSelector, setShowTableSelector] = useState(false);
  const [hoveredGrid, setHoveredGrid] = useState({ rows: 0, cols: 0 });

  const editorRef = useRef<HTMLDivElement>(null);

  // Custom Toast State
  const [toast, setToast] = useState<{
    show: boolean;
    type: "success" | "error" | "warning";
    title: string;
    message: string;
  }>({ show: false, type: "success", title: "", message: "" });

  const showToast = (type: "success" | "error" | "warning", title: string, message: string) => {
    setToast({ show: true, type, title, message });
    setTimeout(() => {
      setToast((prev) => (prev.title === title && prev.message === message ? { ...prev, show: false } : prev));
    }, 4000);
  };

  const CATEGORIES = [
    "Renovation & Upgrading",
    "Structural & Construction",
    "Industrial Engineering",
    "Commercial Fit-out"
  ];

  const BG_COLORS = [
    { value: "bg-amber-100", label: "Amber / Yellow" },
    { value: "bg-blue-100", label: "Blue" },
    { value: "bg-emerald-100", label: "Green" },
    { value: "bg-rose-100", label: "Rose / Red" },
    { value: "bg-indigo-100", label: "Indigo" },
    { value: "bg-slate-100", label: "Slate / Grey" }
  ];

  const fetchBlogs = () => {
    fetch(`${API_BASE}/api/blogs`)
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.data) {
          setPosts(res.data);
        }
      })
      .catch((err) => console.error("Failed to load blog posts from Express backend:", err));
  };

  // Check auth state on mount
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const auth = localStorage.getItem("admin_auth");
      setIsAuthenticated(auth === "true");
    }

    fetch(`${API_BASE}/api/cms`)
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.data) {
          setCmsData(res.data);
        }
      })
      .catch((err) => console.error("Failed to load CMS settings from Express backend:", err));

    fetchBlogs();
  }, []);

  // Blog Seeder
  const handleSeedBlogData = () => {
    setPosts(blogPosts);
  };

  // CMS Seeder for specific page (Syncs to Express backend API)
  const handleSeedPageData = (pageId: keyof CmsDatabase) => {
    // 1. Sync Content data
    fetch(`${API_BASE}/api/cms`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pageId,
        formType: "content",
        data: initialCmsData[pageId].content,
      }),
    });

    // 2. Sync SEO data
    fetch(`${API_BASE}/api/cms`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pageId,
        formType: "seo",
        data: initialCmsData[pageId].seo,
      }),
    });

    setCmsData((prev) => ({
      ...prev,
      [pageId]: {
        content: { ...initialCmsData[pageId].content },
        seo: { ...initialCmsData[pageId].seo },
      },
    }));
  };

  const handleUpdateCmsData = async (
    pageId: keyof CmsDatabase,
    formType: "content" | "seo",
    updatedData: CmsContentUnion | PageSeo
  ): Promise<boolean> => {
    try {
      const res = await fetch(`${API_BASE}/api/cms`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pageId,
          formType,
          data: updatedData,
        }),
      });
      const result = await res.json();
      if (result.success) {
        setCmsData((prev) => ({
          ...prev,
          [pageId]: {
            ...prev[pageId],
            [formType]: { ...updatedData },
          },
        }));
        return true;
      }
      return false;
    } catch (err) {
      console.error("[CMS Save Error]", err);
      return false;
    }
  };

  const handleOpenAddBlogModal = () => {
    setNewTitle("");
    setNewCategory("Renovation & Upgrading");
    setNewImage("");
    setNewBgColor("bg-amber-100");
    setNewPopular(false);
    setShowTableSelector(false);
    setShowAddBlogModal(true);
    setTimeout(() => {
      if (editorRef.current) {
        editorRef.current.innerHTML = "";
      }
    }, 100);
  };

  const handleAddBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      showToast("warning", "Missing Title", "Please enter a blog title.");
      return;
    }

    const htmlContent = editorRef.current ? editorRef.current.innerHTML : "";
    if (!htmlContent.trim() || htmlContent === "<br>") {
      showToast("warning", "Missing Content", "Please write some article content in the editor.");
      return;
    }

    // Dynamic Read Time Calculation based on word count
    const cleanText = htmlContent.replace(/<[^>]*>/g, "");
    const wordCount = cleanText.split(/\s+/).filter(Boolean).length;
    const calculatedReadTime = Math.max(1, Math.ceil(wordCount / 200)) + " mins read";

    const slug = newTitle.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const categorySlug = newCategory.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    const newBlog = {
      slug,
      title: newTitle.trim(),
      category: newCategory,
      categorySlug,
      date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
      author: "Er. Tan Boon",
      image: newImage || "/images/services/sub_home_reno.png",
      bgColor: newBgColor,
      readTime: calculatedReadTime,
      popular: newPopular,
      content: htmlContent.trim(),
      views: 0
    };

    try {
      const res = await fetch(`${API_BASE}/api/blogs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBlog)
      });
      const result = await res.json();
      if (result.success) {
        setShowAddBlogModal(false);
        fetchBlogs();
        showToast("success", "Article Published", `"${newTitle.trim()}" published successfully!`);
      } else {
        showToast("error", "Publish Failed", result.error || "Failed to publish article");
      }
    } catch {
      showToast("error", "Connection Error", "Failed to connect to Express REST server.");
    }
  };

  const execEditorCommand = (command: string, value: string = "") => {
    if (typeof document !== "undefined") {
      document.execCommand(command, false, value);
    }
  };

  const insertHTMLAtCursor = (html: string) => {
    if (typeof window === "undefined") return;
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      range.deleteContents();
      const el = document.createElement("div");
      el.innerHTML = html;
      const frag = document.createDocumentFragment();
      let node;
      while ((node = el.firstChild)) {
        frag.appendChild(node);
      }
      range.insertNode(frag);
    }
  };

  const handleEditorImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(`${API_BASE}/api/upload`, {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      if (result.success && result.imagePath) {
        const fullUrl = `${API_BASE}${result.imagePath}`;
        if (editorRef.current) {
          editorRef.current.focus();
        }
        const imgHtml = `<img src="${fullUrl}" alt="Blog Image" style="max-width: 100%; border-radius: 12px; margin: 15px 0; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);" /><p><br></p>`;
        insertHTMLAtCursor(imgHtml);
      } else {
        showToast("error", "Upload Failed", result.error || "Failed to upload image");
      }
    } catch {
      showToast("error", "Connection Error", "Failed to upload image to Express server.");
    }
  };

  const handleInsertVideo = () => {
    const url = prompt("Enter video link (e.g. YouTube URL or raw MP4 URL):");
    if (!url) return;

    if (editorRef.current) {
      editorRef.current.focus();
    }

    let videoHtml = "";
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      let videoId = "";
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      const match = url.match(regExp);
      if (match && match[2].length === 11) {
        videoId = match[2];
      }
      if (videoId) {
        videoHtml = `<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; margin: 15px 0; border-radius: 12px; border: 1px solid #e2e8f0;"><iframe src="https://www.youtube.com/embed/${videoId}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" allowfullscreen></iframe></div><p><br></p>`;
      }
    }

    if (!videoHtml) {
      videoHtml = `<video src="${url}" controls style="width: 100%; border-radius: 12px; margin: 15px 0; border: 1px solid #e2e8f0;"></video><p><br></p>`;
    }

    insertHTMLAtCursor(videoHtml);
  };

  const handleInsertCustomTable = (rows: number, cols: number) => {
    if (editorRef.current) {
      editorRef.current.focus();
    }

    let tableHtml = `<table style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin: 15px 0; font-size: 13px;">`;
    tableHtml += `<thead><tr style="background: #f1f5f9;">`;
    for (let c = 0; c < cols; c++) {
      tableHtml += `<th style="border: 1px solid #cbd5e1; padding: 10px; font-weight: bold; text-align: left;">Header ${c + 1}</th>`;
    }
    tableHtml += `</tr></thead><tbody>`;

    const bodyRows = Math.max(1, rows - 1);
    for (let r = 0; r < bodyRows; r++) {
      tableHtml += `<tr>`;
      for (let c = 0; c < cols; c++) {
        tableHtml += `<td style="border: 1px solid #cbd5e1; padding: 10px; text-align: left;">Click to type...</td>`;
      }
      tableHtml += `</tr>`;
    }
    tableHtml += `</tbody></table><p><br></p>`;

    insertHTMLAtCursor(tableHtml);
  };

  const handleInsertLink = () => {
    const url = prompt("Enter the link URL (e.g. https://ua-engineering.com):");
    if (url) {
      execEditorCommand("createLink", url);
    }
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    execEditorCommand("foreColor", e.target.value);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    if (loginUsername === "admin" && loginPassword === "admin123") {
      localStorage.setItem("admin_auth", "true");
      setIsAuthenticated(true);
      showToast("success", "Access Granted", "Welcome back, Administrator!");
    } else {
      setLoginError("Invalid username or password credentials. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_auth");
    setIsAuthenticated(false);
    showToast("warning", "Signed Out", "You have successfully signed out.");
  };

  // Blog Calculations
  const totalBlogs = posts.length;
  const totalViews = posts.reduce((sum, post) => sum + (post.views || 0), 0);

  // Group blogs by category
  const categoryCounts = posts.reduce((acc, post) => {
    acc[post.category] = (acc[post.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const categoryData = Object.entries(categoryCounts).map(([name, count]) => ({
    name,
    count,
  }));

  // Filtered posts for search
  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // loading view during hydration verification
  if (isAuthenticated === null) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#0b0f19] text-white font-sans">
        <div className="animate-pulse flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-t-primary border-slate-700 rounded-full animate-spin" />
          <span className="text-xs font-bold tracking-widest uppercase text-slate-400">Initializing Portal...</span>
        </div>
      </div>
    );
  }

  // Login view if unauthenticated
  if (!isAuthenticated) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#0b0f19] font-sans relative overflow-hidden">
        {/* Glowing Background Orbs */}
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-[120px]" />

        <div className="w-full max-w-md mx-4 p-8 bg-slate-900/50 backdrop-blur-xl border border-slate-800/80 rounded-3xl shadow-2xl space-y-6 text-center animate-scale-up z-10">
          {/* Logo Header */}
          <div className="space-y-2 flex flex-col items-center">
            <img 
              src={getImageUrl("/images/footer-logo.png")} 
              alt="Logo" 
              className="h-12 w-auto mb-2" 
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/images/footer-logo.png";
              }} 
            />
            <h2 className="text-lg font-black text-white font-display tracking-wide uppercase">
              Control Center Login
            </h2>
            <p className="text-xs text-slate-400 font-medium max-w-xs leading-relaxed">
              Enter administrator username and password to authenticate dashboard session.
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-4 text-left">
            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                Username
              </label>
              <input
                type="text"
                placeholder="Enter username"
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                className="w-full px-4 py-3 bg-slate-950/60 border border-slate-800 rounded-xl text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm font-medium"
                required
              />
            </div>

            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full px-4 py-3 bg-slate-950/60 border border-slate-800 rounded-xl text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm font-medium"
                required
              />
            </div>

            {loginError && (
              <p className="text-xs font-bold text-rose-500 bg-rose-500/10 border border-rose-500/20 p-3 rounded-xl">
                {loginError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 mt-2"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Dashboard Main Interface
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 font-sans">
      {/* SIDEBAR */}
      <Sidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* MAIN CONTAINER */}
      <div className="flex flex-col flex-1 overflow-hidden min-w-0">
        {/* HEADER BAR */}
        <Header totalViews={totalViews} onMenuClick={() => setMobileOpen(true)} />

        {/* PAGE CONTENT CONTAINER */}
        <main className="flex-1 p-3 sm:p-6 overflow-y-auto bg-slate-50/50 thin-scrollbar">
          {activeTab === "overview" ? (
            /* OVERVIEW TAB VIEW */
            <div className="space-y-6 animate-fade-in">
              {/* KPI SECTION */}
              <KPISection
                totalBlogs={totalBlogs}
                totalViews={totalViews}
                onAddBlogClick={handleOpenAddBlogModal}
              />

              {/* CHARTS CONTAINER */}
              <BlogCharts categoryData={categoryData} totalBlogs={totalBlogs} />

              {/* TABLE LIST CATALOG */}
              <BlogTable
                posts={filteredPosts}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onSeedData={handleSeedBlogData}
                onRefresh={fetchBlogs}
              />
            </div>
          ) : activeTab === "breadcrumbs_editor" ? (
            /* DYNAMIC BREADCRUMB & HEADER BANNERS EDITOR VIEW */
            <BreadcrumbEditor
              cmsData={cmsData}
              onUpdateCmsData={handleUpdateCmsData}
            />
          ) : activeTab === "services_list" ? (
            /* DYNAMIC SERVICES LIST EDITOR VIEW */
            <ServicesListEditor />
          ) : activeTab === "projects_list" ? (
            /* DYNAMIC PROJECTS PORTFOLIO EDITOR VIEW */
            <ProjectsListEditor />
          ) : (
            /* CMS FORMS PANEL VIEW */
            <CmsForms
              activeTab={activeTab}
              cmsData={cmsData}
              onUpdateCmsData={handleUpdateCmsData}
              onSeedPageData={handleSeedPageData}
            />
          )}
        </main>
      </div>

      {/* Dynamic Slide-in Toast Notification */}
      {toast.show && (
        <div className="fixed top-5 right-5 z-[9999] flex items-center gap-3 p-4 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-100 max-w-sm animate-slide-in-right">
          <div className={`p-2.5 rounded-xl ${
            toast.type === "success"
              ? "bg-emerald-50 text-emerald-600"
              : toast.type === "error"
              ? "bg-rose-50 text-rose-600"
              : "bg-amber-50 text-amber-600"
          }`}>
            {toast.type === "success" ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <X className="w-5 h-5" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-black text-secondary">{toast.title}</h4>
            <p className="text-[10px] text-slate-500 font-medium leading-relaxed truncate">{toast.message}</p>
          </div>
          <button
            onClick={() => setToast({ ...toast, show: false })}
            className="p-1 hover:bg-slate-100 rounded-full text-slate-400"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* --- ADD NEW BLOG POST MODAL DIALOG WITH WYSIWYG EDITOR --- */}
      {showAddBlogModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm z-50 overflow-y-auto p-4 py-8">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto thin-scrollbar relative space-y-6 animate-scale-up">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-primary" />
                <h3 className="text-sm font-black text-secondary font-display">
                  Create Blog Article (MS Word Editor)
                </h3>
              </div>
              <button
                onClick={() => setShowAddBlogModal(false)}
                className="p-1 hover:bg-slate-100 rounded-full text-slate-400 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddBlogSubmit} className="space-y-5">
              {/* Title */}
              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                  Article Title / Heading
                </label>
                <input
                  type="text"
                  placeholder="e.g. Waterproofing Methods for flat roofs in Singapore"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-white text-slate-950 font-medium"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                  Category
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-white text-slate-950 font-bold"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Banner Image */}
              <ImageUploadField
                label="Article Feature Banner Image"
                value={newImage}
                onChange={setNewImage}
              />

              {/* Card Background Color */}
              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                  Card Background Color Theme
                </label>
                <select
                  value={newBgColor}
                  onChange={(e) => setNewBgColor(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-white text-slate-950 font-bold"
                >
                  {BG_COLORS.map((bg) => (
                    <option key={bg.value} value={bg.value}>
                      {bg.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Popular Checkbox */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="newPopular"
                  checked={newPopular}
                  onChange={(e) => setNewPopular(e.target.checked)}
                  className="rounded border-slate-200 text-primary focus:ring-primary h-4 w-4"
                />
                <label htmlFor="newPopular" className="text-xs font-bold text-secondary">
                  Flag as Popular / Featured Article
                </label>
              </div>

              {/* --- WYSIWYG MS WORD-STYLE EDITOR --- */}
              <div className="space-y-2 border border-slate-200 rounded-2xl overflow-hidden shadow-sm bg-slate-50">
                {/* Word Toolbar */}
                <div className="flex flex-wrap items-center gap-1 p-2 bg-slate-100 border-b border-slate-200 select-none">
                  {/* Text formats */}
                  <button
                    type="button"
                    onClick={() => execEditorCommand("bold")}
                    className="p-2 hover:bg-slate-200 active:bg-slate-300 rounded-lg text-slate-700 transition-colors"
                    title="Bold"
                  >
                    <Bold className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => execEditorCommand("italic")}
                    className="p-2 hover:bg-slate-200 active:bg-slate-300 rounded-lg text-slate-700 transition-colors"
                    title="Italic"
                  >
                    <Italic className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => execEditorCommand("underline")}
                    className="p-2 hover:bg-slate-200 active:bg-slate-300 rounded-lg text-slate-700 transition-colors"
                    title="Underline"
                  >
                    <Underline className="w-4 h-4" />
                  </button>

                  <div className="w-px h-5 bg-slate-300 mx-1" />

                  {/* Headers */}
                  <button
                    type="button"
                    onClick={() => execEditorCommand("formatBlock", "<h2>")}
                    className="p-2 hover:bg-slate-200 active:bg-slate-300 rounded-lg text-slate-700 font-extrabold text-xs transition-colors flex items-center gap-0.5"
                    title="Heading 2"
                  >
                    <Heading2 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => execEditorCommand("formatBlock", "<h3>")}
                    className="p-2 hover:bg-slate-200 active:bg-slate-300 rounded-lg text-slate-700 font-extrabold text-xs transition-colors flex items-center gap-0.5"
                    title="Heading 3"
                  >
                    <Heading3 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => execEditorCommand("formatBlock", "<p>")}
                    className="p-2 hover:bg-slate-200 active:bg-slate-300 rounded-lg text-slate-700 font-extrabold text-xs transition-colors flex items-center gap-0.5"
                    title="Paragraph Text"
                  >
                    <span className="text-xs font-bold font-mono">P</span>
                  </button>

                  <div className="w-px h-5 bg-slate-300 mx-1" />

                  {/* Lists */}
                  <button
                    type="button"
                    onClick={() => execEditorCommand("insertUnorderedList")}
                    className="p-2 hover:bg-slate-200 active:bg-slate-300 rounded-lg text-slate-700 transition-colors"
                    title="Bullet List"
                  >
                    <List className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => execEditorCommand("insertOrderedList")}
                    className="p-2 hover:bg-slate-200 active:bg-slate-300 rounded-lg text-slate-700 transition-colors"
                    title="Numbered List"
                  >
                    <ListOrdered className="w-4 h-4" />
                  </button>

                  <div className="w-px h-5 bg-slate-300 mx-1" />

                  {/* Alignments */}
                  <button
                    type="button"
                    onClick={() => execEditorCommand("justifyLeft")}
                    className="p-2 hover:bg-slate-200 active:bg-slate-300 rounded-lg text-slate-700 transition-colors"
                    title="Align Left"
                  >
                    <AlignLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => execEditorCommand("justifyCenter")}
                    className="p-2 hover:bg-slate-200 active:bg-slate-300 rounded-lg text-slate-700 transition-colors"
                    title="Align Center"
                  >
                    <AlignCenter className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => execEditorCommand("justifyRight")}
                    className="p-2 hover:bg-slate-200 active:bg-slate-300 rounded-lg text-slate-700 transition-colors"
                    title="Align Right"
                  >
                    <AlignRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => execEditorCommand("justifyFull")}
                    className="p-2 hover:bg-slate-200 active:bg-slate-300 rounded-lg text-slate-700 transition-colors"
                    title="Justify"
                  >
                    <AlignJustify className="w-4 h-4" />
                  </button>

                  <div className="w-px h-5 bg-slate-300 mx-1" />

                  {/* Insert Elements */}
                  <label
                    className="p-2 hover:bg-slate-200 active:bg-slate-300 rounded-lg text-slate-700 transition-colors cursor-pointer flex items-center justify-center relative"
                    title="Insert Image"
                  >
                    <ImageIcon className="w-4 h-4" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleEditorImageUpload}
                      className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                    />
                  </label>

                  <button
                    type="button"
                    onClick={handleInsertVideo}
                    className="p-2 hover:bg-slate-200 active:bg-slate-300 rounded-lg text-slate-700 transition-colors"
                    title="Insert Video"
                  >
                    <VideoIcon className="w-4 h-4" />
                  </button>

                  {/* Table Selection Dropdown Grid */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setShowTableSelector(!showTableSelector)}
                      className={`p-2 hover:bg-slate-200 active:bg-slate-300 rounded-lg transition-colors ${
                        showTableSelector ? "bg-slate-200 text-primary" : "text-slate-700"
                      }`}
                      title="Insert Table Grid"
                    >
                      <TableIcon className="w-4 h-4" />
                    </button>
                    {showTableSelector && (
                      <div className="absolute top-10 left-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-xl p-3.5 z-50 space-y-2 select-none animate-scale-up w-[185px]">
                        <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest text-center">
                          {hoveredGrid.rows > 0 && hoveredGrid.cols > 0
                            ? `Insert ${hoveredGrid.cols} × ${hoveredGrid.rows} Table`
                            : "Select Table Size"}
                        </div>
                        <div
                          className="grid gap-1"
                          style={{ gridTemplateColumns: "repeat(10, minmax(0, 1fr))" }}
                          onMouseLeave={() => setHoveredGrid({ rows: 0, cols: 0 })}
                        >
                          {Array.from({ length: 100 }).map((_, idx) => {
                            const row = Math.floor(idx / 10) + 1;
                            const col = (idx % 10) + 1;
                            const isHighlighted = row <= hoveredGrid.rows && col <= hoveredGrid.cols;
                            return (
                              <div
                                key={idx}
                                onMouseEnter={() => setHoveredGrid({ rows: row, cols: col })}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleInsertCustomTable(row, col);
                                  setShowTableSelector(false);
                                }}
                                className={`w-3 h-3 rounded-sm transition-colors cursor-pointer border ${
                                  isHighlighted
                                    ? "bg-primary border-primary"
                                    : "bg-slate-50 border-slate-200 hover:border-slate-300"
                                }`}
                              />
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="w-px h-5 bg-slate-300 mx-1" />

                  {/* Link & Clear format */}
                  <button
                    type="button"
                    onClick={handleInsertLink}
                    className="p-2 hover:bg-slate-200 active:bg-slate-300 rounded-lg text-slate-700 transition-colors"
                    title="Insert Link"
                  >
                    <LinkIcon className="w-4 h-4" />
                  </button>

                  {/* Color Picker Wrapper */}
                  <label
                    className="p-2 hover:bg-slate-200 active:bg-slate-300 rounded-lg text-slate-700 transition-colors cursor-pointer flex items-center justify-center relative"
                    title="Text Color"
                  >
                    <Palette className="w-4 h-4" />
                    <input
                      type="color"
                      onChange={handleColorChange}
                      className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                    />
                  </label>

                  <button
                    type="button"
                    onClick={() => execEditorCommand("removeFormat")}
                    className="p-2 hover:bg-slate-200 active:bg-slate-300 rounded-lg text-slate-700 transition-colors"
                    title="Clear Formatting"
                  >
                    <Eraser className="w-4 h-4" />
                  </button>
                </div>

                {/* ContentEditable Typing Frame */}
                <div
                  ref={editorRef}
                  contentEditable
                  className="w-full min-h-[350px] p-5 bg-white text-slate-900 text-sm focus:outline-none focus:ring-0 overflow-y-auto leading-relaxed border-none prose prose-slate max-w-none"
                />
              </div>

              {/* Save footer buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddBlogModal(false)}
                  className="px-4 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-xl shadow-md text-xs font-bold transition-all active:scale-95"
                >
                  <Save className="w-4 h-4" />
                  <span>Publish Article</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}
