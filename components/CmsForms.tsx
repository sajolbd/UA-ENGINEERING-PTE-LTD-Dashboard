"use client";
import { API_BASE, getImageUrl } from "../lib/api";

import React, { useState, useEffect } from "react";
import {
  FileText,
  Globe,
  Save,
  CheckCircle,
  AlertCircle,
  Database,
  Code,
  Sliders,
  Image as ImageIcon
} from "lucide-react";
import {
  CmsDatabase,
  PageSeo,
  CmsContentUnion
} from "../data/cmsData";

interface CmsFormsProps {
  activeTab: string;
  cmsData: CmsDatabase;
  onUpdateCmsData: (
    pageId: keyof CmsDatabase,
    formType: "content" | "seo",
    data: CmsContentUnion | PageSeo
  ) => Promise<boolean>;
  onSeedPageData: (pageId: keyof CmsDatabase) => void;
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
    <div className="flex flex-col space-y-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-300 w-full">
      {/* Field Label & Type Badge */}
      <div className="flex items-center justify-between gap-2">
        <label className="text-xs font-black uppercase tracking-wider text-slate-700 truncate">
          {label}
        </label>
        {value && (
          <span className={`text-[9px] font-black uppercase px-2.5 py-1 rounded-full shrink-0 ${
            isBase64 ? "bg-emerald-100 text-emerald-800 border border-emerald-200" : isUploaded ? "bg-blue-100 text-blue-800 border border-blue-200" : "bg-slate-100 text-slate-700 border border-slate-200"
          }`}>
            {isBase64 ? "⚡ DB Direct Base64" : isUploaded ? "🌐 DB Uploaded API" : "📁 Local Asset"}
          </span>
        )}
      </div>

      {/* Large Framed Live Image Preview Box */}
      {value ? (
        <div className={`relative group w-full h-48 rounded-xl border border-slate-200/80 overflow-hidden shadow-inner transition-colors duration-300 ${
          darkPreview ? "bg-slate-950 text-white" : "bg-slate-50 text-slate-800"
        }`}>
          {/* Background grid pattern for transparency */}
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

          {/* Quick Floating Controls (Dark/Light Canvas Toggle, Crop/Contain Toggle, Clear Button) */}
          <div className="absolute top-2 right-2 z-20 flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
            <button
              type="button"
              onClick={() => setDarkPreview(!darkPreview)}
              className="text-[10px] font-bold bg-slate-900/80 hover:bg-slate-900 text-white backdrop-blur px-2 py-1 rounded-lg border border-white/20 transition shadow-sm"
              title="Toggle Dark / Light canvas background for transparent white logos"
            >
              {darkPreview ? "☀️ Light Bg" : "🌙 Dark Bg"}
            </button>

            <button
              type="button"
              onClick={() => setFitContain(!fitContain)}
              className="text-[10px] font-bold bg-slate-900/80 hover:bg-slate-900 text-white backdrop-blur px-2 py-1 rounded-lg border border-white/20 transition shadow-sm"
              title="Toggle Contain (full view) or Cover (fill frame)"
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

          <div className="absolute bottom-2 left-2 z-20">
            <span className="text-[9px] font-bold bg-black/60 text-white backdrop-blur px-2 py-0.5 rounded uppercase tracking-wider">
              Live Preview
            </span>
          </div>
        </div>
      ) : (
        <div className="w-full h-24 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50 flex flex-col items-center justify-center text-slate-400 p-4 text-center">
          <span className="text-xs font-bold">No image selected</span>
          <span className="text-[10px] text-slate-400 mt-1">Upload a file or enter an image URL below</span>
        </div>
      )}
      
      {/* Path / URL Input Box */}
      <div className="w-full">
        <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-xl focus-within:border-primary focus-within:ring-1 focus-within:ring-primary overflow-hidden transition-all duration-300">
          <span className="pl-3 text-slate-400 text-xs font-mono font-bold select-none">URL</span>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="/images/logo.png or https://... or data:image/..."
            className="w-full px-3 py-2.5 text-xs outline-none bg-slate-900 text-white font-mono font-medium border-none focus:ring-0 placeholder:text-slate-500"
          />
        </div>
      </div>

      {/* Action Buttons Grid (Upload Server API & Save Base64 DB) */}
      <div className="grid grid-cols-2 gap-2 w-full pt-1">
        <label className="cursor-pointer inline-flex items-center justify-center px-3 py-2 bg-slate-900 hover:bg-primary text-white text-xs font-bold rounded-xl transition-all duration-200 shadow-sm hover:shadow text-center select-none">
          {uploading ? "Uploading..." : "📤 Upload File"}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
            className="hidden"
          />
        </label>

        <label className="cursor-pointer inline-flex items-center justify-center px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all duration-200 shadow-sm hover:shadow text-center select-none" title="Save image directly inside Database document">
          ⚡ Save as Base64 (DB)
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

export default function CmsForms({
  activeTab,
  cmsData,
  onUpdateCmsData,
  onSeedPageData
}: CmsFormsProps) {
  const pageId = activeTab.split("_")[0] as keyof CmsDatabase;
  const [formType, setFormType] = useState<"content" | "seo">("content");

  const [localContent, setLocalContent] = useState<Record<string, string>>({});
  const [localSeo, setLocalSeo] = useState<PageSeo>({
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
    schemaJson: "",
  });

  const [saveSuccess, setSaveSuccess] = useState(false);
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [showPreviewJson, setShowPreviewJson] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailureModal, setShowFailureModal] = useState(false);

  useEffect(() => {
    setSaveSuccess(false);
    setJsonError(null);
    if (!pageId || !cmsData[pageId]) return;

    const pageData = cmsData[pageId];
    const contentMap = { ...(pageData.content as unknown as Record<string, string>) };
    setLocalContent(contentMap);
    setLocalSeo({
      metaTitle: pageData.seo?.metaTitle || "",
      metaDescription: pageData.seo?.metaDescription || "",
      metaKeywords: pageData.seo?.metaKeywords || "",
      schemaJson: pageData.seo?.schemaJson || "",
    });
  }, [pageId, cmsData]);

  const handleFieldChange = (field: string, value: string) => {
    setLocalContent((prev) => ({ ...prev, [field]: value }));
  };

  const handleSeoChange = (field: keyof PageSeo, value: string) => {
    setLocalSeo((prev) => ({ ...prev, [field]: value }));
    if (field === "schemaJson") {
      setJsonError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(false);

    let success = false;
    if (formType === "content") {
      success = await onUpdateCmsData(pageId, "content", localContent as unknown as CmsContentUnion);
    } else {
      if (localSeo.schemaJson.trim()) {
        try {
          JSON.parse(localSeo.schemaJson);
          setJsonError(null);
        } catch (err) {
          setJsonError((err as Error).message || "Invalid JSON syntax.");
          return;
        }
      }
      success = await onUpdateCmsData(pageId, "seo", localSeo);
    }

    if (success) {
      setSaveSuccess(true);
      setShowSuccessModal(true);
      setTimeout(() => {
        setSaveSuccess(false);
      }, 4000);
    } else {
      setShowFailureModal(true);
    }
  };

  if (!pageId || !cmsData[pageId]) return null;

  const pageDisplayName = pageId === "site" ? "GLOBAL SITE SETTINGS" : pageId.toUpperCase() + " PAGE";

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-fade-in">
      {/* CMS Form Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-white border border-slate-100 rounded-2xl shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary-light text-primary rounded-2xl border border-primary/5">
            {formType === "content" ? (
              <FileText className="w-6 h-6" />
            ) : (
              <Globe className="w-6 h-6" />
            )}
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
              {pageDisplayName} Configuration
            </span>
            <h3 className="text-lg font-black text-secondary font-display">
              {formType === "content" ? "Page Content & Sections Copy" : "SEO Meta Settings & Schema"}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowPreviewJson(!showPreviewJson)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl text-xs font-bold transition-all"
            title="Preview Config JSON"
          >
            <Code className="w-3.5 h-3.5" />
            <span>JSON Preview</span>
          </button>

          <button
            onClick={() => onSeedPageData(pageId)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary-light hover:bg-primary-light/80 text-primary border border-primary/10 rounded-xl text-xs font-bold transition-all duration-300"
          >
            <Database className="w-3.5 h-3.5" />
            <span>Load Presets</span>
          </button>
        </div>
      </div>

      {/* Tabs Toggles */}
      <div className="flex gap-2 p-1.5 bg-slate-100 rounded-2xl max-w-sm">
        <button
          onClick={() => setFormType("content")}
          className={`flex-1 py-2 text-center text-xs font-extrabold rounded-xl transition-all duration-300 ${
            formType === "content"
              ? "bg-primary text-white shadow-md"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          Section Content
        </button>
        <button
          onClick={() => setFormType("seo")}
          className={`flex-1 py-2 text-center text-xs font-extrabold rounded-xl transition-all duration-300 ${
            formType === "seo"
              ? "bg-primary text-white shadow-md"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          SEO & Schema.org
        </button>
      </div>

      {/* SAVE SUCCESS NOTIFICATION */}
      {saveSuccess && (
        <div className="flex items-center gap-3 p-4 bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-2xl shadow-sm animate-slide-up">
          <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
          <span className="text-xs font-bold">
            Changes saved successfully! Database and Website dynamic files updated.
          </span>
        </div>
      )}

      {/* JSON DATA PREVIEW SECTION */}
      {showPreviewJson && (
        <div className="p-5 bg-[#09101f] text-slate-300 border border-[#1b263e] rounded-2xl shadow-lg font-mono text-xs space-y-2">
          <div className="flex items-center justify-between text-[10px] text-slate-500 uppercase tracking-widest font-sans border-b border-[#1b263e] pb-2">
            <span>JSON Representation (Read Only)</span>
            <span className="text-accent">Live REST Sync</span>
          </div>
          <pre className="overflow-x-auto thin-scrollbar max-h-48 text-[11px] p-2 leading-relaxed">
            {JSON.stringify(cmsData[pageId][formType], null, 2)}
          </pre>
        </div>
      )}

      {/* EDITING FORM */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {formType === "content" ? (
            <div className="space-y-6">
              
              {/* --- SITE GLOBAL SETTINGS --- */}
              {pageId === "site" && (
                <div className="space-y-6">
                  <div className="space-y-4 border-b border-slate-100 pb-5">
                    <h4 className="text-xs font-extrabold uppercase tracking-widest text-primary border-l-2 border-primary pl-2 mb-2">
                      1. Brand Logos & Company Name
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <ImageUploadField
                        label="Header Navbar Logo"
                        value={localContent.siteLogo || ""}
                        onChange={(val) => handleFieldChange("siteLogo", val)}
                      />
                      <ImageUploadField
                        label="Footer Branding Logo"
                        value={localContent.footerLogo || ""}
                        onChange={(val) => handleFieldChange("footerLogo", val)}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                          Company Name
                        </label>
                        <input
                          type="text"
                          value={localContent.companyName || ""}
                          onChange={(e) => handleFieldChange("companyName", e.target.value)}
                          className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-900 text-white font-medium placeholder:text-slate-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                          Top Bar Welcome Message
                        </label>
                        <input
                          type="text"
                          value={localContent.welcomeMessage || ""}
                          onChange={(e) => handleFieldChange("welcomeMessage", e.target.value)}
                          className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-900 text-white font-medium placeholder:text-slate-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 border-b border-slate-100 pb-5">
                    <h4 className="text-xs font-extrabold uppercase tracking-widest text-primary border-l-2 border-primary pl-2 mb-2">
                      2. Global Contact Information
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                          Primary Phone Number
                        </label>
                        <input
                          type="text"
                          value={localContent.phone || ""}
                          onChange={(e) => handleFieldChange("phone", e.target.value)}
                          className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-900 text-white font-medium placeholder:text-slate-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                          Primary Email Address
                        </label>
                        <input
                          type="text"
                          value={localContent.email || ""}
                          onChange={(e) => handleFieldChange("email", e.target.value)}
                          className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-900 text-white font-medium font-mono text-xs placeholder:text-slate-500"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                          Office Physical Address
                        </label>
                        <input
                          type="text"
                          value={localContent.address || ""}
                          onChange={(e) => handleFieldChange("address", e.target.value)}
                          className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-900 text-white font-medium placeholder:text-slate-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                          Operating Hours
                        </label>
                        <input
                          type="text"
                          value={localContent.workingHours || ""}
                          onChange={(e) => handleFieldChange("workingHours", e.target.value)}
                          className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-900 text-white font-medium placeholder:text-slate-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 border-b border-slate-100 pb-5">
                    <h4 className="text-xs font-extrabold uppercase tracking-widest text-primary border-l-2 border-primary pl-2 mb-2">
                      3. Footer Description & CTA Buttons
                    </h4>
                    <div>
                      <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                        Header Appointment Button Label
                      </label>
                      <input
                        type="text"
                        value={localContent.appointmentButtonText || ""}
                        onChange={(e) => handleFieldChange("appointmentButtonText", e.target.value)}
                        className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-900 text-white font-medium placeholder:text-slate-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                        Footer About Paragraph
                      </label>
                      <textarea
                        rows={3}
                        value={localContent.footerAboutText || ""}
                        onChange={(e) => handleFieldChange("footerAboutText", e.target.value)}
                        className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-900 text-white font-medium resize-none placeholder:text-slate-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-xs font-extrabold uppercase tracking-widest text-primary border-l-2 border-primary pl-2 mb-2">
                      4. Social Media Links
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">Facebook URL</label>
                        <input
                          type="text"
                          value={localContent.facebook || ""}
                          onChange={(e) => handleFieldChange("facebook", e.target.value)}
                          className="w-full px-4 py-2 text-xs border border-slate-700 rounded-xl font-mono bg-slate-900 text-white placeholder:text-slate-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">Instagram URL</label>
                        <input
                          type="text"
                          value={localContent.instagram || ""}
                          onChange={(e) => handleFieldChange("instagram", e.target.value)}
                          className="w-full px-4 py-2 text-xs border border-slate-700 rounded-xl font-mono bg-slate-900 text-white placeholder:text-slate-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">LinkedIn URL</label>
                        <input
                          type="text"
                          value={localContent.linkedin || ""}
                          onChange={(e) => handleFieldChange("linkedin", e.target.value)}
                          className="w-full px-4 py-2 text-xs border border-slate-700 rounded-xl font-mono bg-slate-900 text-white placeholder:text-slate-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">WhatsApp Direct Link / Phone</label>
                        <input
                          type="text"
                          value={localContent.whatsapp || ""}
                          onChange={(e) => handleFieldChange("whatsapp", e.target.value)}
                          className="w-full px-4 py-2 text-xs border border-slate-700 rounded-xl font-mono bg-slate-900 text-white placeholder:text-slate-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* --- HERO SECTION FIELDS FOR PAGES --- */}
              {pageId !== "site" && (
                <div className="space-y-4 border-b border-slate-100 pb-5">
                  <h4 className="text-xs font-extrabold uppercase tracking-widest text-primary border-l-2 border-primary pl-2 mb-2">
                    1. Page Hero Banner Section
                  </h4>
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                      Hero Section Main Title / Heading
                    </label>
                    <input
                      type="text"
                      value={localContent.heroHeading || ""}
                      onChange={(e) => handleFieldChange("heroHeading", e.target.value)}
                      className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-900 text-white font-medium placeholder:text-slate-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                      Hero Section Subheading / Description
                    </label>
                    <textarea
                      rows={2}
                      value={localContent.heroSubheading || ""}
                      onChange={(e) => handleFieldChange("heroSubheading", e.target.value)}
                      className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-900 text-white font-medium resize-none placeholder:text-slate-500"
                    />
                  </div>
                  
                  {/* Hero Image upload */}
                  <ImageUploadField
                    label="Hero Section Background Image"
                    value={localContent.heroImage || ""}
                    onChange={(val) => handleFieldChange("heroImage", val)}
                  />

                  <div>
                    <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                      Hero Section Image Alt tag (for SEO compliance)
                    </label>
                    <input
                      type="text"
                      value={localContent.heroImageAlt || ""}
                      onChange={(e) => handleFieldChange("heroImageAlt", e.target.value)}
                      className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-900 text-white font-medium placeholder:text-slate-500"
                    />
                  </div>
                </div>
              )}

              {/* --- HOME HERO CAROUSEL SLIDERS EDITOR (7 SLIDERS) --- */}
              {pageId === "home" && (
                <div className="space-y-4 border-b border-slate-100 pb-5">
                  <h4 className="text-xs font-extrabold uppercase tracking-widest text-primary border-l-2 border-primary pl-2 mb-2">
                    1.1 Hero Carousel Sliders (7 Interactive Sliders Control)
                  </h4>
                  <p className="text-[11px] text-slate-400 font-medium pb-2">
                    Customize titles and descriptions for each of the 7 automatic rotating hero banner slides displayed on the website homepage.
                  </p>
                  <div className="space-y-4">
                    {[
                      { id: 1, title: "Slide 1: General & Renovation Services" },
                      { id: 2, title: "Slide 2: Comprehensive Engineering Team" },
                      { id: 3, title: "Slide 3: Painting & Surface Protection" },
                      { id: 4, title: "Slide 4: Roof Repairs & Waterproofing" },
                      { id: 5, title: "Slide 5: Electrical Solutions & Rewiring" },
                      { id: 6, title: "Slide 6: Plumbing & Sanitary Services" },
                      { id: 7, title: "Slide 7: Custom Steel Fabrication" },
                    ].map((slide) => {
                      const headingKey = `heroSlide${slide.id}Heading`;
                      const subheadingKey = `heroSlide${slide.id}Subheading`;
                      return (
                        <div key={slide.id} className="p-4 bg-slate-950/60 border border-slate-800 rounded-2xl space-y-3">
                          <span className="text-[10px] font-black uppercase text-primary tracking-wider">
                            {slide.title}
                          </span>
                          <div>
                            <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">
                              Slide {slide.id} Main Title / Heading
                            </label>
                            <input
                              type="text"
                              value={localContent[headingKey] || ""}
                              onChange={(e) => handleFieldChange(headingKey, e.target.value)}
                              placeholder={`Enter main heading for slide ${slide.id}...`}
                              className="w-full px-4 py-2 text-xs border border-slate-700 rounded-xl focus:border-primary outline-none bg-slate-900 text-white font-medium"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">
                              Slide {slide.id} Subheading / Description
                            </label>
                            <textarea
                              rows={2}
                              value={localContent[subheadingKey] || ""}
                              onChange={(e) => handleFieldChange(subheadingKey, e.target.value)}
                              placeholder={`Enter description for slide ${slide.id}...`}
                              className="w-full px-4 py-2 text-xs border border-slate-700 rounded-xl focus:border-primary outline-none bg-slate-900 text-white font-medium resize-none"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* --- HOME PAGE SECTIONS --- */}
              {pageId === "home" && (
                <div className="space-y-6">
                  <div className="space-y-4 border-b border-slate-100 pb-5">
                    <h4 className="text-xs font-extrabold uppercase tracking-widest text-primary border-l-2 border-primary pl-2 mb-2">
                      2. Company Introduction / About Section
                    </h4>
                    <div>
                      <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                        About Title / Header
                      </label>
                      <input
                        type="text"
                        value={localContent.aboutHeading || ""}
                        onChange={(e) => handleFieldChange("aboutHeading", e.target.value)}
                        className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-900 text-white font-medium placeholder:text-slate-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                        About Detailed Narrative Description
                      </label>
                      <textarea
                        rows={3}
                        value={localContent.aboutSubheading || ""}
                        onChange={(e) => handleFieldChange("aboutSubheading", e.target.value)}
                        className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-900 text-white font-medium resize-none placeholder:text-slate-500"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <ImageUploadField
                        label="Featured Showcase Image"
                        value={localContent.aboutImage || ""}
                        onChange={(val) => handleFieldChange("aboutImage", val)}
                      />

                      <div>
                        <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                          Years of Experience Counter
                        </label>
                        <input
                          type="text"
                          value={localContent.aboutExperience || ""}
                          onChange={(e) => handleFieldChange("aboutExperience", e.target.value)}
                          className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-900 text-white font-medium placeholder:text-slate-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 border-b border-slate-100 pb-5">
                    <h4 className="text-xs font-extrabold uppercase tracking-widest text-primary border-l-2 border-primary pl-2 mb-2">
                      3. Why Choose Section (UA Advantage)
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                          Sub-Badge Text
                        </label>
                        <input
                          type="text"
                          value={localContent.whyChooseBadge || ""}
                          onChange={(e) => handleFieldChange("whyChooseBadge", e.target.value)}
                          className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-900 text-white font-medium placeholder:text-slate-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                          Main Title / Heading
                        </label>
                        <input
                          type="text"
                          value={localContent.whyChooseHeading || ""}
                          onChange={(e) => handleFieldChange("whyChooseHeading", e.target.value)}
                          className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-900 text-white font-medium placeholder:text-slate-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 border-b border-slate-100 pb-5">
                    <h4 className="text-xs font-extrabold uppercase tracking-widest text-primary border-l-2 border-primary pl-2 mb-2">
                      4. Why Rely On Us Section
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                          Badge Label
                        </label>
                        <input
                          type="text"
                          value={localContent.relyBadge || ""}
                          onChange={(e) => handleFieldChange("relyBadge", e.target.value)}
                          className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-900 text-white font-medium placeholder:text-slate-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                          Rely Heading
                        </label>
                        <input
                          type="text"
                          value={localContent.relyHeading || ""}
                          onChange={(e) => handleFieldChange("relyHeading", e.target.value)}
                          className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-900 text-white font-medium placeholder:text-slate-500"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <ImageUploadField
                        label="Rely Feature Showcase Image"
                        value={localContent.relyImage || ""}
                        onChange={(val) => handleFieldChange("relyImage", val)}
                      />
                      <div>
                        <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                          CTA Button Label
                        </label>
                        <input
                          type="text"
                          value={localContent.relyButtonText || ""}
                          onChange={(e) => handleFieldChange("relyButtonText", e.target.value)}
                          className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-900 text-white font-medium placeholder:text-slate-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 border-b border-slate-100 pb-5">
                    <h4 className="text-xs font-extrabold uppercase tracking-widest text-primary border-l-2 border-primary pl-2 mb-2">
                      5. Callback Request Section
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                          Callback Title
                        </label>
                        <input
                          type="text"
                          value={localContent.callbackHeading || ""}
                          onChange={(e) => handleFieldChange("callbackHeading", e.target.value)}
                          className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-900 text-white font-medium placeholder:text-slate-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                          Callback Subtitle
                        </label>
                        <input
                          type="text"
                          value={localContent.callbackSubheading || ""}
                          onChange={(e) => handleFieldChange("callbackSubheading", e.target.value)}
                          className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-900 text-white font-medium placeholder:text-slate-500"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <ImageUploadField
                        label="Callback Banner Background Image"
                        value={localContent.callbackBgImage || ""}
                        onChange={(val) => handleFieldChange("callbackBgImage", val)}
                      />
                      <ImageUploadField
                        label="Call Support Mascot Graphic Image"
                        value={localContent.callbackSupportImage || ""}
                        onChange={(val) => handleFieldChange("callbackSupportImage", val)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* --- ABOUT PAGE SECTIONS --- */}
              {pageId === "about" && (
                <div className="space-y-6">
                  <div className="space-y-4 border-b border-slate-100 pb-5">
                    <h4 className="text-xs font-extrabold uppercase tracking-widest text-primary border-l-2 border-primary pl-2 mb-2">
                      2. Company History & Overview Section
                    </h4>
                    <div>
                      <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                        Overview Heading
                      </label>
                      <input
                        type="text"
                        value={localContent.overviewHeading || ""}
                        onChange={(e) => handleFieldChange("overviewHeading", e.target.value)}
                        className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-900 text-white font-medium placeholder:text-slate-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                        Overview Detailed Narrative Body
                      </label>
                      <textarea
                        rows={4}
                        value={localContent.overviewText || ""}
                        onChange={(e) => handleFieldChange("overviewText", e.target.value)}
                        className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-900 text-white font-medium resize-none placeholder:text-slate-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-xs font-extrabold uppercase tracking-widest text-primary border-l-2 border-primary pl-2 mb-2">
                      3. EHS Workplace Safety Policy Section
                    </h4>
                    <div>
                      <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                        Safety Policy Title
                      </label>
                      <input
                        type="text"
                        value={localContent.ehsHeading || ""}
                        onChange={(e) => handleFieldChange("ehsHeading", e.target.value)}
                        className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-900 text-white font-medium placeholder:text-slate-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                        Safety Policy Details
                      </label>
                      <textarea
                        rows={3}
                        value={localContent.ehsText || ""}
                        onChange={(e) => handleFieldChange("ehsText", e.target.value)}
                        className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-900 text-white font-medium resize-none placeholder:text-slate-500"
                      />
                    </div>
                    <ImageUploadField
                      label="EHS Safety Showcase Image"
                      value={localContent.ehsImage || ""}
                      onChange={(val) => handleFieldChange("ehsImage", val)}
                    />
                  </div>
                </div>
              )}

              {/* --- SERVICES PAGE SECTIONS --- */}
              {pageId === "services" && (
                <div className="space-y-4">
                  <h4 className="text-xs font-extrabold uppercase tracking-widest text-primary border-l-2 border-primary pl-2 mb-2">
                    2. Service Capability Description
                  </h4>
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                      Services Listing Header
                    </label>
                    <input
                      type="text"
                      value={localContent.servicesHeading || ""}
                      onChange={(e) => handleFieldChange("servicesHeading", e.target.value)}
                      className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-900 text-white font-medium placeholder:text-slate-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                      Services Listing Subtitle
                    </label>
                    <input
                      type="text"
                      value={localContent.servicesSubheading || ""}
                      onChange={(e) => handleFieldChange("servicesSubheading", e.target.value)}
                      className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-900 text-white font-medium placeholder:text-slate-500"
                    />
                  </div>
                </div>
              )}

              {/* --- PROJECTS PAGE SECTIONS --- */}
              {pageId === "projects" && (
                <div className="space-y-4">
                  <h4 className="text-xs font-extrabold uppercase tracking-widest text-primary border-l-2 border-primary pl-2 mb-2">
                    2. Featured Works Showcase Header
                  </h4>
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                      Portfolio Section Title
                    </label>
                    <input
                      type="text"
                      value={localContent.portfolioHeading || ""}
                      onChange={(e) => handleFieldChange("portfolioHeading", e.target.value)}
                      className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-900 text-white font-medium placeholder:text-slate-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                      Portfolio Section Subtitle
                    </label>
                    <input
                      type="text"
                      value={localContent.portfolioSubheading || ""}
                      onChange={(e) => handleFieldChange("portfolioSubheading", e.target.value)}
                      className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-900 text-white font-medium placeholder:text-slate-500"
                    />
                  </div>
                </div>
              )}

              {/* --- BLOG PAGE SECTIONS --- */}
              {pageId === "blog" && (
                <div className="space-y-4">
                  <h4 className="text-xs font-extrabold uppercase tracking-widest text-primary border-l-2 border-primary pl-2 mb-2">
                    2. Blog Listing Intro
                  </h4>
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                      Blog Catalog Title
                    </label>
                    <input
                      type="text"
                      value={localContent.blogHeading || ""}
                      onChange={(e) => handleFieldChange("blogHeading", e.target.value)}
                      className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-900 text-white font-medium placeholder:text-slate-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                      Blog Catalog Subtitle / Summary
                    </label>
                    <input
                      type="text"
                      value={localContent.blogSubheading || ""}
                      onChange={(e) => handleFieldChange("blogSubheading", e.target.value)}
                      className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-900 text-white font-medium placeholder:text-slate-500"
                    />
                  </div>
                </div>
              )}

              {/* --- CONTACT PAGE SECTIONS --- */}
              {pageId === "contact" && (
                <div className="space-y-4">
                  <h4 className="text-xs font-extrabold uppercase tracking-widest text-primary border-l-2 border-primary pl-2 mb-2">
                    2. Official Office Contact Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                        Office Physical Address
                      </label>
                      <input
                        type="text"
                        value={localContent.contactAddress || ""}
                        onChange={(e) => handleFieldChange("contactAddress", e.target.value)}
                        className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-900 text-white font-medium placeholder:text-slate-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                        Official Phone Number
                      </label>
                      <input
                        type="text"
                        value={localContent.contactPhone || ""}
                        onChange={(e) => handleFieldChange("contactPhone", e.target.value)}
                        className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-900 text-white font-medium placeholder:text-slate-500"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                        Official Support Email Address
                      </label>
                      <input
                        type="text"
                        value={localContent.contactEmail || ""}
                        onChange={(e) => handleFieldChange("contactEmail", e.target.value)}
                        className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-900 text-white font-medium font-mono text-xs placeholder:text-slate-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                        Office Operation Hours
                      </label>
                      <input
                        type="text"
                        value={localContent.contactHours || ""}
                        onChange={(e) => handleFieldChange("contactHours", e.target.value)}
                        className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-900 text-white font-medium placeholder:text-slate-500"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* SEO & SCHEMA FORM FIELDS */
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                    Meta Page Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. UA Engineering | BCA Certified Plumber"
                    value={localSeo.metaTitle}
                    onChange={(e) => handleSeoChange("metaTitle", e.target.value)}
                    className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-900 text-white font-medium placeholder:text-slate-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                    Meta Keywords
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. engineering, substation, plumbing"
                    value={localSeo.metaKeywords}
                    onChange={(e) => handleSeoChange("metaKeywords", e.target.value)}
                    className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-900 text-white font-medium placeholder:text-slate-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                  Meta Description
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. UA Engineering provides..."
                  value={localSeo.metaDescription}
                  onChange={(e) => handleSeoChange("metaDescription", e.target.value)}
                  className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-900 text-white font-medium resize-none placeholder:text-slate-500"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    Schema.org Structured Data (JSON-LD)
                  </label>
                  {jsonError && (
                    <span className="text-[10px] font-bold text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> Schema Syntax Error
                    </span>
                  )}
                </div>
                <textarea
                  rows={6}
                  placeholder={`{\n  "@context": "https://schema.org",\n  "@type": "LocalBusiness"\n}`}
                  value={localSeo.schemaJson}
                  onChange={(e) => handleSeoChange("schemaJson", e.target.value)}
                  className={`w-full px-4 py-3 text-xs border rounded-xl outline-none font-mono resize-none bg-slate-900 text-white font-medium placeholder:text-slate-500 focus:ring-1 ${
                    jsonError
                      ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                      : "border-slate-700 focus:border-primary focus:ring-primary"
                  }`}
                />
                {jsonError && (
                  <p className="mt-1.5 text-[10px] text-red-600 font-mono">
                    Error: {jsonError}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Form Actions Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <span className="text-[10px] text-slate-400 font-bold">
              Updates sync to Database & Website dynamically
            </span>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-xl shadow-md text-xs font-bold transition-colors"
            >
              <Save className="w-4 h-4 text-accent" />
              <span>Save & Publish Section</span>
            </button>
          </div>
        </form>
      </div>

      {/* BEAUTIFUL CUSTOM SUCCESS MODAL OVERLAY */}
      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm z-50 animate-fade-in">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl p-8 max-w-sm w-full mx-4 text-center space-y-6 animate-scale-up">
            
            {/* Animated Check Circle Container */}
            <div className="mx-auto w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100 flex items-center justify-center shadow-inner relative">
              <CheckCircle className="w-10 h-10 animate-pulse" />
            </div>

            {/* Content Details */}
            <div className="space-y-2">
              <h3 className="text-lg font-black text-secondary font-display">
                Publish Successful!
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                All changes have been successfully saved, updated, and synchronized to your Database & Website.
              </p>
            </div>

            {/* Action Dismiss Button */}
            <button
              onClick={() => setShowSuccessModal(false)}
              className="w-full py-3 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl shadow-md transition-all active:scale-95"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      )}

      {/* BEAUTIFUL CUSTOM FAILURE MODAL OVERLAY */}
      {showFailureModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm z-50 animate-fade-in">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl p-8 max-w-sm w-full mx-4 text-center space-y-6 animate-scale-up">
            
            {/* Animated Warning Icon Container */}
            <div className="mx-auto w-16 h-16 bg-rose-50 text-rose-600 rounded-full border border-rose-100 flex items-center justify-center shadow-inner relative">
              <AlertCircle className="w-10 h-10 animate-bounce" />
            </div>

            {/* Content Details */}
            <div className="space-y-2">
              <h3 className="text-lg font-black text-secondary font-display">
                Publish Failed!
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                We encountered an error while communicating with the server. Please check your backend connection.
              </p>
            </div>

            {/* Action Dismiss Button */}
            <button
              onClick={() => setShowFailureModal(false)}
              className="w-full py-3 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-xl shadow-md transition-all active:scale-95"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
