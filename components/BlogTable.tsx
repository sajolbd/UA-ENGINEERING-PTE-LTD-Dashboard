"use client";
import { API_BASE, getImageUrl } from "../lib/api";

import React, { useState, useRef } from "react";
import {
  Search,
  ArrowUpRight,
  Database,
  Plus,
  Trash2,
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
import { BlogPost } from "../data/blogData";

interface BlogPostWithId extends BlogPost {
  id?: string;
  _id?: string;
}

interface BlogTableProps {
  posts: BlogPostWithId[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSeedData: () => void;
  onRefresh: () => void;
}

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
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === "string") {
            onChange(reader.result);
          }
        };
        reader.readAsDataURL(file);
      }
    } catch {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          onChange(reader.result);
        }
      };
      reader.readAsDataURL(file);
    } finally {
      setUploading(false);
    }
  };

  const handleBase64Convert = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        onChange(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const fullImageUrl = getImageUrl(value);
  const isBase64 = value.startsWith("data:");
  const isUploaded = value.startsWith("/images/uploads/") || value.startsWith("http");

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
          {label}
        </label>
        {value && (
          <span className={`text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full shrink-0 ${
            isBase64 ? "bg-emerald-100 text-emerald-800" : isUploaded ? "bg-blue-100 text-blue-800" : "bg-slate-100 text-slate-700"
          }`}>
            {isBase64 ? "⚡ Direct Base64" : isUploaded ? "🌐 Server Upload" : "📁 Local Asset"}
          </span>
        )}
      </div>

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
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-3">
            <span className="text-[10px] text-white font-extrabold tracking-widest uppercase">
              Current Live Preview
            </span>
            <button
              type="button"
              onClick={() => onChange("")}
              className="text-[10px] font-bold bg-rose-600 hover:bg-rose-700 text-white px-2 py-0.5 rounded-md shadow-sm"
            >
              Remove
            </button>
          </div>
        </div>
      )}
      
      <div className="relative flex items-center bg-white border border-slate-200 rounded-xl focus-within:border-primary focus-within:ring-1 focus-within:ring-primary overflow-hidden transition-all duration-300">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="/images/placeholder.png or data:image/..."
          className="flex-1 px-3 py-3 text-sm outline-none bg-white text-slate-950 font-medium font-mono text-xs border-none focus:ring-0 focus:outline-none"
        />

        <label className="cursor-pointer inline-flex items-center justify-center px-3 py-3 bg-slate-50 hover:bg-slate-100 hover:text-slate-900 text-slate-600 text-xs font-bold transition-all border-l border-slate-200 select-none shrink-0 h-full">
          {uploading ? "Uploading..." : "📤 Upload File"}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
            className="hidden"
          />
        </label>

        <label className="cursor-pointer inline-flex items-center justify-center px-3 py-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold transition-all border-l border-slate-200 select-none shrink-0 h-full">
          ⚡ Base64
          <input
            type="file"
            accept="image/*"
            onChange={handleBase64Convert}
            className="hidden"
          />
        </label>
      </div>

      {error && <span className="text-[10px] font-bold text-red-600 block mt-1">{error}</span>}
    </div>
  );
}

export default function BlogTable({
  posts,
  searchQuery,
  setSearchQuery,
  onSeedData,
  onRefresh
}: BlogTableProps) {
  const [showModal, setShowModal] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Table grid states inside blog table component
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

  // Custom Delete Confirm State
  const [deleteConfirm, setDeleteConfirm] = useState<{
    show: boolean;
    blogId: string;
    blogTitle: string;
  }>({ show: false, blogId: "", blogTitle: "" });

  const showToast = (type: "success" | "error" | "warning", title: string, message: string) => {
    setToast({ show: true, type, title, message });
    setTimeout(() => {
      setToast((prev) => (prev.title === title && prev.message === message ? { ...prev, show: false } : prev));
    }, 4000);
  };

  // Form Fields State
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Renovation & Upgrading");
  const [image, setImage] = useState("");
  const [bgColor, setBgColor] = useState("bg-amber-100");
  const [popular, setPopular] = useState(false);

  const CATEGORIES = [
    "Renovation & Upgrading",
    "Structural & Construction",
    "Structural & Exterior Works",
    "Painting & Waterproofing",
    "Aluminium & Glazing Works",
    "Electrical, Plumbing & Aircon",
    "Solar Panel Installation",
    "Industrial Engineering",
    "Commercial Fit-out",
    "Others"
  ];

  const BG_COLORS = [
    { value: "bg-amber-100", label: "Amber / Yellow" },
    { value: "bg-blue-100", label: "Blue" },
    { value: "bg-emerald-100", label: "Green" },
    { value: "bg-rose-100", label: "Rose / Red" },
    { value: "bg-indigo-100", label: "Indigo" },
    { value: "bg-slate-100", label: "Slate / Grey" }
  ];

  const handleOpenAddModal = () => {
    setTitle("");
    setCategory("Renovation & Upgrading");
    setImage("");
    setBgColor("bg-amber-100");
    setPopular(false);
    setShowTableSelector(false);
    setShowModal(true);
    setTimeout(() => {
      if (editorRef.current) {
        editorRef.current.innerHTML = "";
      }
    }, 100);
  };

  const handleAddBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
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

    const slug = title.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const categorySlug = category.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    const newBlog = {
      slug,
      title: title.trim(),
      category,
      categorySlug,
      date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
      author: "Er. Tan Boon",
      image: image || "/images/services/sub_home_reno.png",
      bgColor,
      readTime: calculatedReadTime,
      popular,
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
        setSaveSuccess(true);
        setShowModal(false);
        onRefresh();
        showToast("success", "Article Published", `"${title.trim()}" has been published successfully.`);
        setTimeout(() => setSaveSuccess(false), 4000);
      } else {
        showToast("error", "Publish Failed", result.error || "Failed to publish article");
      }
    } catch {
      showToast("error", "Connection Error", "Failed to connect to Express REST server.");
    }
  };

  const handleDeleteBlog = (blogId: string, blogTitle: string) => {
    setDeleteConfirm({ show: true, blogId, blogTitle });
  };

  const confirmDeleteBlog = async () => {
    const { blogId, blogTitle } = deleteConfirm;
    setDeleteConfirm({ show: false, blogId: "", blogTitle: "" });

    try {
      const res = await fetch(`${API_BASE}/api/blogs/${blogId}`, {
        method: "DELETE"
      });
      const result = await res.json();
      if (result.success) {
        onRefresh();
        showToast("success", "Article Deleted", `"${blogTitle}" has been removed successfully.`);
      } else {
        showToast("error", "Delete Failed", result.error || "Failed to delete article");
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

  return (
    <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
      
      {/* Header */}
      <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-extrabold text-secondary font-display">
            Published Articles Catalog
          </h3>
          <p className="text-xs text-slate-500 font-medium">Live feed monitoring and articles setup</p>
        </div>

        {/* Search & Actions */}
        <div className="flex items-center gap-2">
          {posts.length === 0 && (
            <button
              onClick={onSeedData}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary-light hover:bg-primary-light/80 text-primary border border-primary/10 rounded-xl text-xs font-bold transition-all duration-300"
            >
              <Database className="w-3.5 h-3.5" />
              <span>Seed Demo Articles</span>
            </button>
          )}

          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8.5 pr-4 py-1.5 text-xs border border-slate-200 rounded-xl outline-none focus:border-primary w-full sm:w-48 text-slate-900 font-bold transition-all"
            />
          </div>

          <button
            onClick={handleOpenAddModal}
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 bg-primary hover:bg-primary-hover text-white rounded-xl text-xs font-bold shadow-sm transition-all active:scale-95 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add Article</span>
          </button>
        </div>
      </div>

      {/* SAVE SUCCESS NOTIFICATION */}
      {saveSuccess && (
        <div className="mx-5 my-4 flex items-center gap-3 p-4 bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-2xl shadow-sm animate-slide-up">
          <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
          <span className="text-xs font-bold">
            New article successfully published and synced to Website!
          </span>
        </div>
      )}

      {/* Table grid */}
      <div className="overflow-x-auto thin-scrollbar">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              <th className="py-3 px-5">Title</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Publish Date</th>
              <th className="py-3 px-4">Views</th>
              <th className="py-3 px-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {posts.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-12 text-center text-slate-400 font-semibold">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Database className="w-8 h-8 text-slate-300 animate-bounce" />
                    <p>No articles found (database is empty).</p>
                    <button
                      onClick={onSeedData}
                      className="mt-2 text-xs font-bold text-primary hover:underline"
                    >
                      Click here to load mock data.
                    </button>
                  </div>
                </td>
              </tr>
            ) : (
              posts.map((post, idx) => {
                const id = post.id || post._id || idx.toString();
                return (
                  <tr key={id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="py-3.5 px-5 font-bold text-secondary group-hover:text-primary transition-colors max-w-xs truncate">
                      {post.title}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-bold">
                        {post.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">{post.date}</td>
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      {post.views.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-5 text-right flex items-center justify-end gap-3.5">
                      <a
                        href={`https://ua-engineering.com/blog/${post.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-0.5 text-primary hover:underline font-bold"
                      >
                        <span>Live</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>

                      <button
                        onClick={() => handleDeleteBlog(id, post.title)}
                        className="p-1 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-md transition-colors"
                        title="Delete Article"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* --- ADD NEW ARTICLE MODAL DIALOG --- */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm z-50 overflow-y-auto p-4 py-8">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto thin-scrollbar relative space-y-6 animate-scale-up">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-primary" />
                <h3 className="text-sm font-black text-secondary font-display">
                  Publish New Article (MS Word Editor)
                </h3>
              </div>
              <button
                onClick={() => setShowModal(false)}
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
                  placeholder="e.g. Top 10 Water Leakage Solutions in Singapore"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-white text-slate-950 font-medium"
                  required
                />
              </div>

              {/* Category Selection */}
              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                  Category Selection
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
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
                value={image}
                onChange={setImage}
              />

              {/* Card Background Color */}
              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                  Card Background Color Theme
                </label>
                <select
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
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
                  id="popular"
                  checked={popular}
                  onChange={(e) => setPopular(e.target.checked)}
                  className="rounded border-slate-200 text-primary focus:ring-primary h-4 w-4"
                />
                <label htmlFor="popular" className="text-xs font-bold text-secondary">
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

                  {/* Table Grid Size Dropdown Selector */}
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
                  onClick={() => setShowModal(false)}
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

      {/* Custom Delete Confirmation Modal */}
      {deleteConfirm.show && (
        <div className="fixed inset-0 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm z-[9998] animate-fade-in">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl p-6 max-w-sm w-full mx-4 text-center space-y-6 animate-scale-up">
            <div className="mx-auto w-12 h-12 bg-rose-50 text-rose-600 rounded-full border border-rose-100 flex items-center justify-center shadow-inner">
              <Trash2 className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-black text-secondary">Delete Article</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Are you sure you want to permanently delete <span className="font-extrabold text-secondary">&ldquo;{deleteConfirm.blogTitle}&rdquo;</span>? This operation is permanent.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirm({ show: false, blogId: "", blogTitle: "" })}
                className="py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Keep Article
              </button>
              <button
                onClick={confirmDeleteBlog}
                className="py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-md transition-all active:scale-95"
              >
                Delete Post
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
