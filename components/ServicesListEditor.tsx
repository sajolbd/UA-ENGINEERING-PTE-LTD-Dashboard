"use client";
import { API_BASE, getImageUrl } from "../lib/api";

import React, { useState, useEffect } from "react";
import {
  Briefcase,
  Plus,
  Edit,
  Trash2,
  ChevronDown,
  ChevronUp,
  Save,
  CheckCircle,
  AlertCircle,
  X,
  Layers,
  Sparkles
} from "lucide-react";

interface SubService {
  slug: string;
  title: string;
  image: string;
  breadcrumbTitle?: string;
  breadcrumbBg?: string;
  description: string;
  longDescription: string;
  features: string[];
  benefits: string[];
  process: string[];
}

interface ServiceCategory {
  slug: string;
  title: string;
  breadcrumbTitle?: string;
  shortDescription: string;
  description: string;
  featuredImage: string;
  bgImage: string;
  services: SubService[];
}

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (newValue: string) => void;
}

function ImageUploadField({ label, value, onChange }: ImageUploadFieldProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [darkPreview, setDarkPreview] = useState(false);
  const [fitContain, setFitContain] = useState(true);

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
    <div className="flex flex-col space-y-3 bg-slate-900/60 p-4 rounded-2xl border border-slate-700 shadow-sm hover:shadow-md transition-all duration-300 w-full">
      <div className="flex items-center justify-between gap-2">
        <label className="text-xs font-black uppercase tracking-wider text-slate-300 truncate">
          {label}
        </label>
        {value && (
          <span className={`text-[9px] font-black uppercase px-2.5 py-1 rounded-full shrink-0 ${
            isBase64 ? "bg-emerald-950 text-emerald-300 border border-emerald-800" : isUploaded ? "bg-blue-950 text-blue-300 border border-blue-800" : "bg-slate-800 text-slate-300 border border-slate-700"
          }`}>
            {isBase64 ? "⚡ DB Direct Base64" : isUploaded ? "🌐 DB Uploaded API" : "📁 Local Asset"}
          </span>
        )}
      </div>

      {value ? (
        <div className={`relative group w-full h-44 rounded-xl border border-slate-700 overflow-hidden shadow-inner transition-colors duration-300 ${
          darkPreview ? "bg-slate-950 text-white" : "bg-slate-900 text-slate-200"
        }`}>
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:12px_12px]" />
          
          <img
            src={fullImageUrl}
            alt="Uploaded Preview"
            className={`relative z-10 w-full h-full p-2 transition-all duration-300 ${
              fitContain ? "object-contain" : "object-cover"
            }`}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/images/footer-logo.png";
            }}
          />

          <div className="absolute top-2 right-2 z-20 flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
            <button
              type="button"
              onClick={() => setDarkPreview(!darkPreview)}
              className="text-[10px] font-bold bg-slate-950/80 hover:bg-slate-950 text-white backdrop-blur px-2 py-1 rounded-lg border border-white/20 transition shadow-sm"
            >
              {darkPreview ? "☀️ Light Bg" : "🌙 Dark Bg"}
            </button>

            <button
              type="button"
              onClick={() => setFitContain(!fitContain)}
              className="text-[10px] font-bold bg-slate-950/80 hover:bg-slate-950 text-white backdrop-blur px-2 py-1 rounded-lg border border-white/20 transition shadow-sm"
            >
              {fitContain ? "🔍 Contain" : "🖼️ Cover"}
            </button>

            <button
              type="button"
              onClick={() => onChange("")}
              className="text-[10px] font-bold bg-red-600/90 hover:bg-red-600 text-white px-2 py-1 rounded-lg transition shadow-sm"
            >
              ✕ Remove
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full h-20 rounded-xl border-2 border-dashed border-slate-700 bg-slate-950/40 flex flex-col items-center justify-center text-slate-400 p-3 text-center">
          <span className="text-xs font-bold">No image selected</span>
        </div>
      )}
      
      <div className="w-full">
        <div className="relative flex items-center bg-slate-950 border border-slate-700 rounded-xl focus-within:border-primary focus-within:ring-1 focus-within:ring-primary overflow-hidden transition-all duration-300">
          <span className="pl-3 text-slate-400 text-xs font-mono font-bold select-none">URL</span>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="/images/services/sample.png or https://... or data:image/..."
            className="w-full px-3 py-2 text-xs outline-none bg-slate-950 text-white font-mono font-medium border-none focus:ring-0 placeholder:text-slate-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 w-full pt-1">
        <label className="cursor-pointer inline-flex items-center justify-center px-3 py-2 bg-slate-800 hover:bg-primary text-white text-xs font-bold rounded-xl transition-all duration-200 shadow-sm text-center select-none">
          {uploading ? "Uploading..." : "📤 Upload File"}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
            className="hidden"
          />
        </label>

        <label className="cursor-pointer inline-flex items-center justify-center px-3 py-2 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold rounded-xl transition-all duration-200 shadow-sm text-center select-none">
          ⚡ Save Base64 (DB)
          <input
            type="file"
            accept="image/*"
            onChange={handleBase64Convert}
            className="hidden"
          />
        </label>
      </div>

      {error && <span className="text-[10px] font-bold text-red-400 block mt-1">{error}</span>}
    </div>
  );
}

export default function ServicesListEditor() {
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedCat, setExpandedCat] = useState<string | null>(null);
  
  // Category Modal States (Add & Edit)
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editingCategorySlug, setEditingCategorySlug] = useState<string | null>(null);
  const [catTitle, setCatTitle] = useState("");
  const [catBreadcrumbTitle, setCatBreadcrumbTitle] = useState("");
  const [catShortDesc, setCatShortDesc] = useState("");
  const [catDesc, setCatDesc] = useState("");
  const [catFeaturedImage, setCatFeaturedImage] = useState("");
  const [catBgImage, setCatBgImage] = useState("");

  // Sub-Service Modal States (Add & Edit)
  const [showSubModal, setShowSubModal] = useState(false);
  const [targetCategorySlug, setTargetCategorySlug] = useState<string>("");
  const [editingSubSlug, setEditingSubSlug] = useState<string | null>(null);
  
  const [subTitle, setSubTitle] = useState("");
  const [subBreadcrumbTitle, setSubBreadcrumbTitle] = useState("");
  const [subImage, setSubImage] = useState("");
  const [subBreadcrumbBg, setSubBreadcrumbBg] = useState("");
  const [subDesc, setSubDesc] = useState("");
  const [subLongDesc, setSubLongDesc] = useState("");
  const [features, setFeatures] = useState<string[]>([""]);
  const [benefits, setBenefits] = useState<string[]>([""]);
  const [processList, setProcessList] = useState<string[]>([""]);

  const [saveSuccess, setSaveSuccess] = useState(false);

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
    type: "category" | "service";
    categorySlug: string;
    serviceSlug?: string;
    title: string;
  }>({ show: false, type: "service", categorySlug: "", serviceSlug: "", title: "" });

  const showToast = (type: "success" | "error" | "warning", title: string, message: string) => {
    setToast({ show: true, type, title, message });
    setTimeout(() => {
      setToast((prev) => (prev.title === title && prev.message === message ? { ...prev, show: false } : prev));
    }, 4000);
  };

  const loadServices = () => {
    setLoading(true);
    fetch(`${API_BASE}/api/services`)
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.data) {
          setCategories(res.data);
          if (res.data.length > 0 && !expandedCat) {
            setExpandedCat(res.data[0].slug);
          }
        }
      })
      .catch((err) => console.error("Failed to load services directory:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadServices();
  }, []);

  const saveCategoriesToBackend = async (updated: ServiceCategory[], successMsg: string) => {
    try {
      const res = await fetch(`${API_BASE}/api/services`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categories: updated })
      });
      const result = await res.json();
      if (result.success) {
        setCategories(updated);
        setSaveSuccess(true);
        showToast("success", "Database Saved", successMsg);
        setTimeout(() => setSaveSuccess(false), 4000);
        return true;
      } else {
        showToast("error", "Save Failed", result.error || "Failed to save services database");
        return false;
      }
    } catch {
      showToast("error", "Connection Error", "Failed to connect to backend server.");
      return false;
    }
  };

  // --- CATEGORY CRUD HANDLERS ---
  const handleOpenAddCategoryModal = () => {
    setEditingCategorySlug(null);
    setCatTitle("");
    setCatBreadcrumbTitle("");
    setCatShortDesc("");
    setCatDesc("");
    setCatFeaturedImage("/images/services/sanitary-hero.png");
    setCatBgImage("/images/layout/breadcrumb-bg.png");
    setShowCategoryModal(true);
  };

  const handleOpenEditCategoryModal = (cat: ServiceCategory, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingCategorySlug(cat.slug);
    setCatTitle(cat.title);
    setCatBreadcrumbTitle(cat.breadcrumbTitle || "");
    setCatShortDesc(cat.shortDescription);
    setCatDesc(cat.description);
    setCatFeaturedImage(cat.featuredImage);
    setCatBgImage(cat.bgImage);
    setShowCategoryModal(true);
  };

  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!catTitle.trim()) {
      showToast("warning", "Title Required", "Please enter a Category Title.");
      return;
    }

    const slug = editingCategorySlug
      ? editingCategorySlug
      : catTitle.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    let updated: ServiceCategory[];
    if (editingCategorySlug) {
      // Editing existing category
      updated = categories.map((c) => {
        if (c.slug === editingCategorySlug) {
          return {
            ...c,
            title: catTitle.trim(),
            breadcrumbTitle: catBreadcrumbTitle.trim() || undefined,
            shortDescription: catShortDesc.trim(),
            description: catDesc.trim(),
            featuredImage: catFeaturedImage || "/images/services/sanitary-hero.png",
            bgImage: catBgImage || "/images/layout/breadcrumb-bg.png"
          };
        }
        return c;
      });
    } else {
      // Adding new category
      const newCategory: ServiceCategory = {
        slug,
        title: catTitle.trim(),
        breadcrumbTitle: catBreadcrumbTitle.trim() || undefined,
        shortDescription: catShortDesc.trim(),
        description: catDesc.trim(),
        featuredImage: catFeaturedImage || "/images/services/sanitary-hero.png",
        bgImage: catBgImage || "/images/layout/breadcrumb-bg.png",
        services: []
      };
      updated = [...categories, newCategory];
    }

    const saved = await saveCategoriesToBackend(
      updated,
      editingCategorySlug ? `Category "${catTitle.trim()}" updated successfully.` : `New Service Category "${catTitle.trim()}" created!`
    );

    if (saved) {
      setShowCategoryModal(false);
      setExpandedCat(slug);
    }
  };

  const handleDeleteCategoryPrompt = (catSlug: string, catTitle: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDeleteConfirm({
      show: true,
      type: "category",
      categorySlug: catSlug,
      title: catTitle
    });
  };

  // --- SUB-SERVICE CRUD HANDLERS ---
  const handleOpenAddSubModal = (catSlug: string) => {
    setTargetCategorySlug(catSlug);
    setEditingSubSlug(null);
    setSubTitle("");
    setSubBreadcrumbTitle("");
    setSubImage("");
    setSubBreadcrumbBg("");
    setSubDesc("");
    setSubLongDesc("");
    setFeatures([""]);
    setBenefits([""]);
    setProcessList([""]);
    setShowSubModal(true);
  };

  const handleOpenEditSubModal = (catSlug: string, service: SubService, e: React.MouseEvent) => {
    e.stopPropagation();
    setTargetCategorySlug(catSlug);
    setEditingSubSlug(service.slug);
    setSubTitle(service.title);
    setSubBreadcrumbTitle(service.breadcrumbTitle || "");
    setSubImage(service.image);
    setSubBreadcrumbBg(service.breadcrumbBg || "");
    setSubDesc(service.description);
    setSubLongDesc(service.longDescription);
    setFeatures(service.features.length > 0 ? service.features : [""]);
    setBenefits(service.benefits.length > 0 ? service.benefits : [""]);
    setProcessList(service.process.length > 0 ? service.process : [""]);
    setShowSubModal(true);
  };

  const handleListChange = (index: number, value: string, listType: "features" | "benefits" | "process") => {
    if (listType === "features") {
      const copy = [...features];
      copy[index] = value;
      setFeatures(copy);
    } else if (listType === "benefits") {
      const copy = [...benefits];
      copy[index] = value;
      setBenefits(copy);
    } else {
      const copy = [...processList];
      copy[index] = value;
      setProcessList(copy);
    }
  };

  const handleAddListItem = (listType: "features" | "benefits" | "process") => {
    if (listType === "features") setFeatures([...features, ""]);
    else if (listType === "benefits") setBenefits([...benefits, ""]);
    else setProcessList([...processList, ""]);
  };

  const handleRemoveListItem = (index: number, listType: "features" | "benefits" | "process") => {
    if (listType === "features") setFeatures(features.filter((_, idx) => idx !== index));
    else if (listType === "benefits") setBenefits(benefits.filter((_, idx) => idx !== index));
    else setProcessList(processList.filter((_, idx) => idx !== index));
  };

  const handleSubServiceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subTitle.trim()) {
      showToast("warning", "Title Required", "Please enter a Service Title.");
      return;
    }

    const slug = editingSubSlug
      ? editingSubSlug
      : subTitle.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    const updatedServiceItem: SubService = {
      slug,
      title: subTitle.trim(),
      breadcrumbTitle: subBreadcrumbTitle.trim() || undefined,
      image: subImage || "/images/layout/breadcrumb-bg.png",
      breadcrumbBg: subBreadcrumbBg || undefined,
      description: subDesc.trim(),
      longDescription: subLongDesc.trim(),
      features: features.filter((f) => f.trim() !== ""),
      benefits: benefits.filter((b) => b.trim() !== ""),
      process: processList.filter((p) => p.trim() !== "")
    };

    const updatedCategories = categories.map((cat) => {
      if (cat.slug === targetCategorySlug) {
        if (editingSubSlug) {
          return {
            ...cat,
            services: cat.services.map((s) => (s.slug === editingSubSlug ? updatedServiceItem : s))
          };
        } else {
          return {
            ...cat,
            services: [...cat.services, updatedServiceItem]
          };
        }
      }
      return cat;
    });

    const saved = await saveCategoriesToBackend(
      updatedCategories,
      editingSubSlug ? `Service "${subTitle.trim()}" updated.` : `New Service "${subTitle.trim()}" added.`
    );

    if (saved) {
      setShowSubModal(false);
    }
  };

  const handleDeleteSubServicePrompt = (catSlug: string, servSlug: string, servTitle: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDeleteConfirm({
      show: true,
      type: "service",
      categorySlug: catSlug,
      serviceSlug: servSlug,
      title: servTitle
    });
  };

  const confirmDelete = async () => {
    const { type, categorySlug, serviceSlug, title } = deleteConfirm;
    setDeleteConfirm({ show: false, type: "service", categorySlug: "", serviceSlug: "", title: "" });

    let updated: ServiceCategory[];
    if (type === "category") {
      updated = categories.filter((c) => c.slug !== categorySlug);
    } else {
      updated = categories.map((cat) => {
        if (cat.slug === categorySlug) {
          return {
            ...cat,
            services: cat.services.filter((s) => s.slug !== serviceSlug)
          };
        }
        return cat;
      });
    }

    await saveCategoriesToBackend(
      updated,
      type === "category" ? `Category "${title}" removed.` : `Service "${title}" removed.`
    );
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <span className="text-xs font-bold text-slate-500">Loading services directory...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-fade-in pb-12">
      {/* Toast Notification */}
      {toast.show && (
        <div className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl border backdrop-blur-md animate-slide-in-right ${
          toast.type === "success" ? "bg-emerald-950/90 border-emerald-700 text-emerald-200" : toast.type === "error" ? "bg-rose-950/90 border-rose-700 text-rose-200" : "bg-amber-950/90 border-amber-700 text-amber-200"
        }`}>
          {toast.type === "success" ? <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" /> : <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />}
          <div>
            <h5 className="text-xs font-black">{toast.title}</h5>
            <p className="text-[11px] font-medium opacity-90">{toast.message}</p>
          </div>
        </div>
      )}

      {/* Page Header Bar with ADD CATEGORY Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-slate-900 border border-slate-800 rounded-2xl shadow-md">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/20 text-primary rounded-2xl border border-primary/30">
            <Briefcase className="w-6 h-6 text-primary" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
              CMS Service Manager
            </span>
            <h3 className="text-lg font-black text-white font-display">
              Services & Capabilities Directory
            </h3>
          </div>
        </div>

        <button
          onClick={handleOpenAddCategoryModal}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-xl text-xs font-bold shadow-lg shadow-primary/20 transition-all active:scale-95 self-start sm:self-auto select-none"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service Category</span>
        </button>
      </div>

      {saveSuccess && (
        <div className="flex items-center gap-3 p-4 bg-emerald-950/80 text-emerald-200 border border-emerald-800 rounded-2xl shadow-sm animate-slide-up">
          <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-bold">
            Services database synced to MongoDB Atlas & Website!
          </span>
        </div>
      )}

      {/* Accordion List for Service Categories */}
      <div className="space-y-4">
        {categories.map((cat) => {
          const isExpanded = expandedCat === cat.slug;
          return (
            <div
              key={cat.slug}
              className="bg-slate-900 border border-slate-800 rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:border-slate-700"
            >
              {/* Accordion Header */}
              <div
                onClick={() => setExpandedCat(isExpanded ? null : cat.slug)}
                className="flex items-center justify-between p-5 cursor-pointer hover:bg-slate-800/60 select-none transition-colors"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={getImageUrl(cat.featuredImage)}
                    alt={cat.title}
                    className="w-14 h-14 object-cover rounded-xl border border-slate-700 shrink-0"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/images/logo.png";
                    }}
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-black text-white">
                        {cat.title}
                      </h4>
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 bg-slate-800 text-slate-300 rounded-md border border-slate-700">
                        {cat.services.length} Services
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-1 font-medium">
                      {cat.shortDescription || cat.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => handleOpenEditCategoryModal(cat, e)}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold border border-slate-700 transition"
                    title="Edit Category Details"
                  >
                    <Edit className="w-3.5 h-3.5 text-primary" />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={(e) => handleDeleteCategoryPrompt(cat.slug, cat.title, e)}
                    className="p-1.5 bg-slate-800 hover:bg-red-950/80 text-slate-400 hover:text-red-400 rounded-xl border border-slate-700 transition"
                    title="Delete Category"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  {isExpanded ? <ChevronUp className="w-5 h-5 text-slate-400 ml-1" /> : <ChevronDown className="w-5 h-5 text-slate-400 ml-1" />}
                </div>
              </div>

              {/* Expanded Sub-Services Container */}
              {isExpanded && (
                <div className="border-t border-slate-800 p-5 bg-slate-950/40 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-primary" />
                      <span className="text-xs font-extrabold uppercase tracking-wider text-slate-300">
                        Sub-Services List inside "{cat.title}"
                      </span>
                    </div>
                    
                    <button
                      onClick={() => handleOpenAddSubModal(cat.slug)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-primary hover:bg-primary-hover text-white rounded-xl text-xs font-bold shadow-md transition-all active:scale-95"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Sub-Service</span>
                    </button>
                  </div>

                  {cat.services.length === 0 ? (
                    <div className="text-center py-8 bg-slate-900/40 rounded-xl border border-dashed border-slate-800 p-4">
                      <p className="text-xs text-slate-400 font-bold">
                        No services configured under "{cat.title}" yet. Click above to add your first service item!
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {cat.services.map((service) => (
                        <div
                          key={service.slug}
                          className="flex items-start justify-between p-4 bg-slate-900 border border-slate-800 rounded-2xl shadow-sm hover:border-slate-700 transition-all gap-3"
                        >
                          <div className="flex gap-3">
                            <img
                              src={getImageUrl(service.image)}
                              alt={service.title}
                              className="w-14 h-14 object-cover rounded-xl border border-slate-700 shrink-0"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = "/images/logo.png";
                              }}
                            />
                            <div className="space-y-1">
                              <h5 className="text-xs font-bold text-white">
                                {service.title}
                              </h5>
                              <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                                {service.description}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              onClick={(e) => handleOpenEditSubModal(cat.slug, service, e)}
                              className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition-colors"
                              title="Edit Service Details"
                            >
                              <Edit className="w-3.5 h-3.5 text-primary" />
                            </button>
                            <button
                              onClick={(e) => handleDeleteSubServicePrompt(cat.slug, service.slug, service.title, e)}
                              className="p-1.5 hover:bg-red-950/80 text-slate-400 hover:text-red-400 rounded-lg transition-colors"
                              title="Delete Service"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* --- ADD / EDIT CATEGORY MODAL --- */}
      {showCategoryModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-slate-950/80 backdrop-blur-md z-50 overflow-y-auto p-4 py-8">
          <div className="bg-slate-900 rounded-3xl border border-slate-700 shadow-2xl p-6 max-w-xl w-full max-h-[85vh] overflow-y-auto thin-scrollbar relative space-y-5 text-white animate-scale-up">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <h3 className="text-sm font-black text-white">
                  {editingCategorySlug ? "Edit Service Category" : "Add New Top-Level Service Category"}
                </h3>
              </div>
              <button
                onClick={() => setShowCategoryModal(false)}
                className="p-1 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCategorySubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                  Category Title / Header
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sanitary & Plumbing Work or Solar Panel Solutions"
                  value={catTitle}
                  onChange={(e) => setCatTitle(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-950 text-white font-medium placeholder:text-slate-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                  Breadcrumb Banner Title (Optional - defaults to Category Title)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Professional Renovation & Upgrading Services"
                  value={catBreadcrumbTitle}
                  onChange={(e) => setCatBreadcrumbTitle(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-950 text-white font-medium placeholder:text-slate-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                  Short Description (Shown on cards)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Comprehensive commercial and residential plumbing services..."
                  value={catShortDesc}
                  onChange={(e) => setCatShortDesc(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-950 text-white font-medium placeholder:text-slate-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                  Detailed Narrative Description (Shown on Category page)
                </label>
                <textarea
                  rows={3}
                  placeholder="Provide full description..."
                  value={catDesc}
                  onChange={(e) => setCatDesc(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-950 text-white font-medium resize-none placeholder:text-slate-500"
                />
              </div>

              <ImageUploadField
                label="Featured Showcase Image"
                value={catFeaturedImage}
                onChange={setCatFeaturedImage}
              />

              <ImageUploadField
                label="Background Banner Image"
                value={catBgImage}
                onChange={setCatBgImage}
              />

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowCategoryModal(false)}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl shadow-md transition"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingCategorySlug ? "Update Category" : "Publish Category"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- ADD / EDIT SUB-SERVICE MODAL FORM --- */}
      {showSubModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-slate-950/80 backdrop-blur-md z-50 overflow-y-auto p-4 py-8">
          <div className="bg-slate-900 rounded-3xl border border-slate-700 shadow-2xl p-6 max-w-2xl w-full max-h-[85vh] overflow-y-auto thin-scrollbar relative space-y-5 text-white animate-scale-up">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-primary" />
                <h3 className="text-sm font-black text-white">
                  {editingSubSlug ? "Edit Service Item" : `Add Service under "${targetCategorySlug}"`}
                </h3>
              </div>
              <button
                onClick={() => setShowSubModal(false)}
                className="p-1 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubServiceSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                  Service Title / Heading
                </label>
                <input
                  type="text"
                  placeholder="e.g. Toilet Bowl Plumbing Install or Pipe Relining"
                  value={subTitle}
                  onChange={(e) => setSubTitle(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-950 text-white font-medium placeholder:text-slate-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                  Breadcrumb Banner Title (Optional - defaults to Service Title)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Professional Floor Renovation & Polishing"
                  value={subBreadcrumbTitle}
                  onChange={(e) => setSubBreadcrumbTitle(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-950 text-white font-medium placeholder:text-slate-500"
                />
              </div>

              <ImageUploadField
                label="Service Showcase Image"
                value={subImage}
                onChange={setSubImage}
              />

              <ImageUploadField
                label="Breadcrumb Banner Background Image (Optional)"
                value={subBreadcrumbBg}
                onChange={setSubBreadcrumbBg}
              />

              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                  Short Description (Shown on cards)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Custom toilet bowl replacement and leak protection piping..."
                  value={subDesc}
                  onChange={(e) => setSubDesc(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-950 text-white font-medium resize-none placeholder:text-slate-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                  Detailed Long Description (Shown on Service page)
                </label>
                <textarea
                  rows={4}
                  placeholder="Provide complete engineering overview, specs and masonry work details..."
                  value={subLongDesc}
                  onChange={(e) => setSubLongDesc(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-950 text-white font-medium resize-none placeholder:text-slate-500"
                />
              </div>

              {/* Dynamic list: features */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    Features / Technical Highlights
                  </label>
                  <button
                    type="button"
                    onClick={() => handleAddListItem("features")}
                    className="text-[10px] font-extrabold text-primary hover:underline inline-flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Bullet Row
                  </button>
                </div>
                {features.map((item, idx) => (
                  <div key={idx} className="flex gap-2 items-center">
                    <input
                      type="text"
                      placeholder="Highlight point..."
                      value={item}
                      onChange={(e) => handleListChange(idx, e.target.value, "features")}
                      className="flex-1 px-4 py-2 text-xs border border-slate-700 rounded-xl bg-slate-950 text-white placeholder:text-slate-500"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveListItem(idx, "features")}
                      className="p-2 text-slate-400 hover:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Dynamic list: benefits */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    Benefits to Client
                  </label>
                  <button
                    type="button"
                    onClick={() => handleAddListItem("benefits")}
                    className="text-[10px] font-extrabold text-primary hover:underline inline-flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Bullet Row
                  </button>
                </div>
                {benefits.map((item, idx) => (
                  <div key={idx} className="flex gap-2 items-center">
                    <input
                      type="text"
                      placeholder="Benefit point..."
                      value={item}
                      onChange={(e) => handleListChange(idx, e.target.value, "benefits")}
                      className="flex-1 px-4 py-2 text-xs border border-slate-700 rounded-xl bg-slate-950 text-white placeholder:text-slate-500"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveListItem(idx, "benefits")}
                      className="p-2 text-slate-400 hover:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Dynamic list: process */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    Work Process Steps
                  </label>
                  <button
                    type="button"
                    onClick={() => handleAddListItem("process")}
                    className="text-[10px] font-extrabold text-primary hover:underline inline-flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Bullet Row
                  </button>
                </div>
                {processList.map((item, idx) => (
                  <div key={idx} className="flex gap-2 items-center">
                    <input
                      type="text"
                      placeholder="Step description..."
                      value={item}
                      onChange={(e) => handleListChange(idx, e.target.value, "process")}
                      className="flex-1 px-4 py-2 text-xs border border-slate-700 rounded-xl bg-slate-950 text-white placeholder:text-slate-500"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveListItem(idx, "process")}
                      className="p-2 text-slate-400 hover:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowSubModal(false)}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl shadow-md transition"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingSubSlug ? "Update Service" : "Publish Service"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- CONFIRMATION MODAL FOR DELETION --- */}
      {deleteConfirm.show && (
        <div className="fixed inset-0 flex items-center justify-center bg-slate-950/80 backdrop-blur-md z-50 p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 max-w-sm w-full text-center space-y-5 animate-scale-up text-white shadow-2xl">
            <div className="w-14 h-14 bg-red-950 text-red-400 rounded-full border border-red-800 flex items-center justify-center mx-auto">
              <Trash2 className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <h4 className="text-base font-black">
                Delete {deleteConfirm.type === "category" ? "Category" : "Service"}?
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Are you sure you want to permanently delete <strong className="text-white">"{deleteConfirm.title}"</strong>?
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirm({ show: false, type: "service", categorySlug: "", title: "" })}
                className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition shadow-md"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
