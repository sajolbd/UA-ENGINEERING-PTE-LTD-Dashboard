"use client";
import { API_BASE, fetchWithTimeout, getImageUrl } from "../lib/api";
import { initialServicesData } from "../data/servicesData";

import React, { useState, useEffect } from "react";
import {
  Image as ImageIcon,
  Save,
  CheckCircle,
  Info,
  Briefcase,
  FolderGit,
  BookOpen,
  PhoneCall,
  Sparkles,
  Eye,
  Layers,
  LayoutGrid
} from "lucide-react";
import { CmsDatabase, PageSeo, CmsContentUnion } from "../data/cmsData";

interface BreadcrumbEditorProps {
  cmsData: CmsDatabase;
  onUpdateCmsData: (
    pageId: keyof CmsDatabase,
    formType: "content" | "seo",
    data: CmsContentUnion | PageSeo
  ) => Promise<boolean>;
}

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
          
          {/* eslint-disable-next-line @next/next/no-img-element */}
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
            placeholder="/images/layout/breadcrumb-bg.png or https://... or data:image/..."
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

export default function BreadcrumbEditor({ cmsData, onUpdateCmsData }: BreadcrumbEditorProps) {
  const [activeMode, setActiveMode] = useState<"pages" | "categories" | "sub_services">("categories");
  const [selectedPage, setSelectedPage] = useState<keyof CmsDatabase>("about");
  
  // Categories & Sub-Services directory
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [selectedCatSlug, setSelectedCatSlug] = useState<string>("");
  const [selectedSubSlug, setSelectedSubSlug] = useState<string>("");

  const [heroHeading, setHeroHeading] = useState("");
  const [heroSubheading, setHeroSubheading] = useState("");
  const [heroImage, setHeroImage] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const PAGE_TABS = [
    { id: "about", label: "About Page", icon: Info },
    { id: "services", label: "Services Catalog", icon: Briefcase },
    { id: "projects", label: "Projects Page", icon: FolderGit },
    { id: "blog", label: "Blog Page", icon: BookOpen },
    { id: "contact", label: "Contact Page", icon: PhoneCall },
  ];

  // Load Services directory
  useEffect(() => {
    fetchWithTimeout(`${API_BASE}/api/services`, {}, 5000)
      .then((res) => res.json())
      .then((res) => {
        if (res.success && Array.isArray(res.data) && res.data.length > 0) {
          setCategories(res.data);
          if (res.data.length > 0) {
            setSelectedCatSlug(res.data[0].slug);
            if (res.data[0].services && res.data[0].services.length > 0) {
              setSelectedSubSlug(res.data[0].services[0].slug);
            }
          }
        } else {
          setCategories(initialServicesData);
          if (initialServicesData.length > 0) {
            setSelectedCatSlug(initialServicesData[0].slug);
            if (initialServicesData[0].services && initialServicesData[0].services.length > 0) {
              setSelectedSubSlug(initialServicesData[0].services[0].slug);
            }
          }
        }
      })
      .catch((err) => {
        console.warn("Failed to load services for breadcrumbs, using fallback:", err);
        setCategories(initialServicesData);
        if (initialServicesData.length > 0) {
          setSelectedCatSlug(initialServicesData[0].slug);
          if (initialServicesData[0].services && initialServicesData[0].services.length > 0) {
            setSelectedSubSlug(initialServicesData[0].services[0].slug);
          }
        }
      });
  }, []);

  // Sync state when page changes in pages mode
  useEffect(() => {
    if (activeMode === "pages" && cmsData && cmsData[selectedPage]) {
      const content = cmsData[selectedPage].content as unknown as Record<string, string>;
      setHeroHeading(content.heroHeading || "");
      setHeroSubheading(content.heroSubheading || "");
      setHeroImage(content.heroImage || "/images/layout/breadcrumb-bg.png");
    }
  }, [selectedPage, cmsData, activeMode]);

  // Sync state when category changes in categories mode
  useEffect(() => {
    if (activeMode === "categories" && categories.length > 0) {
      const cat = categories.find((c) => c.slug === selectedCatSlug);
      if (cat) {
        setHeroHeading(cat.breadcrumbTitle || cat.title);
        setHeroSubheading(cat.shortDescription || "");
        setHeroImage(cat.bgImage || "/images/layout/breadcrumb-bg.png");
      }
    }
  }, [selectedCatSlug, categories, activeMode]);

  // Sync state when sub-service changes in sub_services mode
  useEffect(() => {
    if (activeMode === "sub_services" && categories.length > 0) {
      const cat = categories.find((c) => c.slug === selectedCatSlug);
      if (cat) {
        const sub = cat.services.find((s) => s.slug === selectedSubSlug);
        if (sub) {
          setHeroHeading(sub.breadcrumbTitle || sub.title);
          setHeroSubheading(sub.description || "");
          setHeroImage(sub.breadcrumbBg || cat.bgImage || "/images/layout/breadcrumb-bg.png");
        }
      }
    }
  }, [selectedCatSlug, selectedSubSlug, categories, activeMode]);

  // Category switch handler
  const handleCatSelectChange = (catSlug: string) => {
    setSelectedCatSlug(catSlug);
    const cat = categories.find((c) => c.slug === catSlug);
    if (cat && cat.services.length > 0) {
      setSelectedSubSlug(cat.services[0].slug);
    } else {
      setSelectedSubSlug("");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveSuccess(false);

    if (activeMode === "pages") {
      const currentContent = { ...cmsData[selectedPage].content } as unknown as Record<string, string>;
      currentContent.heroHeading = heroHeading;
      currentContent.heroSubheading = heroSubheading;
      currentContent.heroImage = heroImage;

      const success = await onUpdateCmsData(
        selectedPage,
        "content",
        currentContent as unknown as CmsContentUnion
      );

      setSaving(false);
      if (success) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 4000);
      }
    } else if (activeMode === "categories") {
      // Main Service Category Breadcrumb Save
      const updatedCategories = categories.map((cat) => {
        if (cat.slug === selectedCatSlug) {
          return {
            ...cat,
            breadcrumbTitle: heroHeading,
            bgImage: heroImage
          };
        }
        return cat;
      });

      try {
        const res = await fetch(`${API_BASE}/api/services`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ categories: updatedCategories })
        });
        const result = await res.json();
        if (result.success) {
          setCategories(updatedCategories);
          setSaveSuccess(true);
          setTimeout(() => setSaveSuccess(false), 4000);
        }
      } catch (err) {
        console.error("Failed to save category breadcrumb:", err);
      } finally {
        setSaving(false);
      }
    } else {
      // Sub-service Breadcrumb Save
      const updatedCategories = categories.map((cat) => {
        if (cat.slug === selectedCatSlug) {
          return {
            ...cat,
            services: cat.services.map((sub) => {
              if (sub.slug === selectedSubSlug) {
                return {
                  ...sub,
                  breadcrumbTitle: heroHeading,
                  breadcrumbBg: heroImage
                };
              }
              return sub;
            })
          };
        }
        return cat;
      });

      try {
        const res = await fetch(`${API_BASE}/api/services`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ categories: updatedCategories })
        });
        const result = await res.json();
        if (result.success) {
          setCategories(updatedCategories);
          setSaveSuccess(true);
          setTimeout(() => setSaveSuccess(false), 4000);
        }
      } catch (err) {
        console.error("Failed to save sub-service breadcrumb:", err);
      } finally {
        setSaving(false);
      }
    }
  };

  const fullImageUrl = getImageUrl(heroImage || "/images/layout/breadcrumb-bg.png");
  const currentCat = categories.find((c) => c.slug === selectedCatSlug);

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-fade-in pb-12">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-slate-900 border border-slate-800 rounded-2xl shadow-md">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/20 text-primary rounded-2xl border border-primary/30">
            <ImageIcon className="w-6 h-6 text-primary" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
              Header Banners Controller
            </span>
            <h3 className="text-lg font-black text-white font-display">
              Breadcrumb Banners & Header Titles
            </h3>
          </div>
        </div>

        {/* 3 Mode Switcher Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 self-start sm:self-auto">
          <button
            onClick={() => setActiveMode("categories")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeMode === "categories" ? "bg-primary text-white shadow" : "text-slate-400 hover:text-white"
            }`}
          >
            Main Service Categories
          </button>

          <button
            onClick={() => setActiveMode("sub_services")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeMode === "sub_services" ? "bg-primary text-white shadow" : "text-slate-400 hover:text-white"
            }`}
          >
            Sub-Services Banners
          </button>

          <button
            onClick={() => setActiveMode("pages")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeMode === "pages" ? "bg-primary text-white shadow" : "text-slate-400 hover:text-white"
            }`}
          >
            Static Page Banners
          </button>
        </div>
      </div>

      {/* MODE 1: MAIN SERVICE CATEGORIES SELECTOR */}
      {activeMode === "categories" && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
            <LayoutGrid className="w-4 h-4 text-primary" />
            <span>Select Main Service Category to Edit Breadcrumb Header</span>
          </div>

          <div>
            <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
              Select Main Service Category (e.g. Renovation & Upgrading)
            </label>
            <select
              value={selectedCatSlug}
              onChange={(e) => setSelectedCatSlug(e.target.value)}
              className="w-full px-4 py-2.5 text-xs border border-slate-700 rounded-xl bg-slate-950 text-white font-bold outline-none focus:border-primary"
            >
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.title} ({c.services.length} sub-services)
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* MODE 2: SUB-SERVICES CATEGORY & SERVICE SELECTORS */}
      {activeMode === "sub_services" && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
            <Layers className="w-4 h-4 text-primary" />
            <span>Select Sub-Service to Edit Breadcrumb Banner</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                1. Select Service Category
              </label>
              <select
                value={selectedCatSlug}
                onChange={(e) => handleCatSelectChange(e.target.value)}
                className="w-full px-4 py-2.5 text-xs border border-slate-700 rounded-xl bg-slate-950 text-white font-bold outline-none focus:border-primary"
              >
                {categories.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.title} ({c.services.length} services)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                2. Select Specific Sub-Service Item
              </label>
              <select
                value={selectedSubSlug}
                onChange={(e) => setSelectedSubSlug(e.target.value)}
                className="w-full px-4 py-2.5 text-xs border border-slate-700 rounded-xl bg-slate-950 text-white font-bold outline-none focus:border-primary"
              >
                {currentCat && currentCat.services.length > 0 ? (
                  currentCat.services.map((sub) => (
                    <option key={sub.slug} value={sub.slug}>
                      {sub.title}
                    </option>
                  ))
                ) : (
                  <option value="">No sub-services in this category</option>
                )}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* MODE 3: STATIC PAGE TABS */}
      {activeMode === "pages" && (
        <div className="flex flex-wrap gap-2 p-2 bg-slate-900 border border-slate-800 rounded-2xl">
          {PAGE_TABS.map((tab) => {
            const TabIcon = tab.icon;
            const isActive = selectedPage === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedPage(tab.id as keyof CmsDatabase)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all duration-300 select-none ${
                  isActive
                    ? "bg-primary text-white shadow-lg shadow-primary/20 scale-[1.02]"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                <TabIcon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Save Success Alert */}
      {saveSuccess && (
        <div className="flex items-center gap-3 p-4 bg-emerald-950/80 text-emerald-200 border border-emerald-800 rounded-2xl shadow-sm animate-slide-up">
          <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-bold">
            Breadcrumb banner configuration saved and synced to Database & Website!
          </span>
        </div>
      )}

      {/* REAL-TIME MOCKUP PREVIEW BOX */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
          <Eye className="w-4 h-4 text-primary" />
          <span>Real-time Website Breadcrumb Banner Live Mockup</span>
        </div>

        <div className="relative w-full h-[220px] sm:h-[260px] flex items-center justify-center overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-xl group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={fullImageUrl}
            alt="Breadcrumb Mockup Background"
            className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/images/footer-logo.png";
            }}
          />

          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/30" />

          <div className="relative z-10 border border-white/40 bg-black/45 backdrop-blur-md px-8 py-5 sm:px-12 sm:py-6 max-w-xl text-center rounded-sm shadow-2xl space-y-1">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight uppercase leading-none">
              {heroHeading || "SERVICE BREADCRUMB"}
            </h1>
            {heroSubheading && (
              <p className="text-[11px] text-slate-300 line-clamp-1 font-medium pt-1">
                {heroSubheading}
              </p>
            )}
          </div>

          <div className="absolute bottom-3 left-3 z-20">
            <span className="text-[9px] font-bold bg-primary text-white px-2.5 py-1 rounded-md uppercase tracking-wider shadow-sm">
              {activeMode === "categories"
                ? `CATEGORY: ${selectedCatSlug.toUpperCase()}`
                : activeMode === "sub_services"
                ? `SUB-SERVICE: ${selectedSubSlug.toUpperCase()}`
                : `${selectedPage.toUpperCase()} PAGE`}
            </span>
          </div>
        </div>
      </div>

      {/* BREADCRUMB EDIT FORM */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-md space-y-5 text-white">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
          <Sparkles className="w-5 h-5 text-primary" />
          <h4 className="text-sm font-black uppercase tracking-wider text-white">
            Edit Breadcrumb for &quot;{heroHeading}&quot;
          </h4>
        </div>

        <form onSubmit={handleSave} className="space-y-5">
          <div>
            <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
              Breadcrumb Main Title / Heading
            </label>
            <input
              type="text"
              value={heroHeading}
              onChange={(e) => setHeroHeading(e.target.value)}
              placeholder="e.g. RENOVATION & UPGRADING"
              className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-950 text-white font-medium placeholder:text-slate-500"
            />
          </div>

          <div>
            <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
              Breadcrumb Subheading / Caption
            </label>
            <textarea
              rows={2}
              value={heroSubheading}
              onChange={(e) => setHeroSubheading(e.target.value)}
              placeholder="Provide banner subheading..."
              className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-950 text-white font-medium resize-none placeholder:text-slate-500"
            />
          </div>

          <ImageUploadField
            label="Breadcrumb Background Image Banner"
            value={heroImage}
            onChange={setHeroImage}
          />

          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold">
              Updates sync live to Website & Database document
            </span>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-xl shadow-lg text-xs font-bold transition-all active:scale-95 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? "Saving..." : "Save & Publish Breadcrumb"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
