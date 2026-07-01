"use client";

import React, { useState, useEffect } from "react";
import {
  FileText,
  Globe,
  Save,
  CheckCircle,
  AlertCircle,
  Database,
  Code
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
      const res = await fetch("http://localhost:5000/api/upload", {
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

  const fullImageUrl = value
    ? (value.startsWith("http") || value.startsWith("data")
      ? value
      : "http://localhost:5000" + value)
    : "";

  return (
    <div className="space-y-3">
      <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
        {label}
      </label>

      {/* Large Framed Preview Box */}
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
        {/* Center: Text Input for Path */}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="/images/placeholder.png"
          className="flex-1 px-3 py-3 text-sm outline-none bg-white text-slate-950 font-medium font-mono text-xs border-none focus:ring-0 focus:outline-none"
        />

        {/* Right: Embedded Upload Button */}
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
      metaTitle: pageData.seo.metaTitle || "",
      metaDescription: pageData.seo.metaDescription || "",
      metaKeywords: pageData.seo.metaKeywords || "",
      schemaJson: pageData.seo.schemaJson || "",
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

  const pageDisplayName = pageId.toUpperCase() + " PAGE";

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
            Changes saved successfully! The MongoDB database is updated.
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
              
              {/* --- HERO SECTION FIELDS --- */}
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
                    className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-white text-slate-950 font-medium"
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
                    className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-white text-slate-950 font-medium resize-none"
                  />
                </div>
                
                {/* Hero Image upload */}
                <ImageUploadField
                  label="Hero Section Background Image"
                  value={localContent.heroImage || ""}
                  onChange={(val) => handleFieldChange("heroImage", val)}
                />

                {/* Hero Image Alt Tag */}
                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                    Hero Section Image Alt tag (for SEO compliance)
                  </label>
                  <input
                    type="text"
                    value={localContent.heroImageAlt || ""}
                    onChange={(e) => handleFieldChange("heroImageAlt", e.target.value)}
                    className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-white text-slate-950 font-medium"
                  />
                </div>
              </div>

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
                        className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-white text-slate-950 font-medium"
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
                        className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-white text-slate-950 font-medium resize-none"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      
                      {/* About Showcase Image upload */}
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
                          className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-white text-slate-950 font-medium"
                        />
                      </div>
                    </div>

                    {/* About Image Alt Tag */}
                    <div>
                      <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                        Showcase Image Alt tag (for SEO compliance)
                      </label>
                      <input
                        type="text"
                        value={localContent.aboutImageAlt || ""}
                        onChange={(e) => handleFieldChange("aboutImageAlt", e.target.value)}
                        className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-white text-slate-950 font-medium"
                      />
                    </div>
                  </div>

                  <div className="space-y-4 border-b border-slate-100 pb-5">
                    <h4 className="text-xs font-extrabold uppercase tracking-widest text-primary border-l-2 border-primary pl-2 mb-2">
                      3. Call to Action / Inspection Request Section
                    </h4>
                    <div>
                      <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                        Request Block Title
                      </label>
                      <input
                        type="text"
                        value={localContent.callbackHeading || ""}
                        onChange={(e) => handleFieldChange("callbackHeading", e.target.value)}
                        className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-white text-slate-950 font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                        Request Block Subtitle
                      </label>
                      <input
                        type="text"
                        value={localContent.callbackSubheading || ""}
                        onChange={(e) => handleFieldChange("callbackSubheading", e.target.value)}
                        className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-white text-slate-950 font-medium"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-xs font-extrabold uppercase tracking-widest text-primary border-l-2 border-primary pl-2 mb-2">
                      4. Rely On / Brand Core Values Section
                    </h4>
                    <div>
                      <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                        Rely Block Title
                      </label>
                      <input
                        type="text"
                        value={localContent.relyHeading || ""}
                        onChange={(e) => handleFieldChange("relyHeading", e.target.value)}
                        className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-white text-slate-950 font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                        Rely Block Subtitle / Summary
                      </label>
                      <input
                        type="text"
                        value={localContent.relySubheading || ""}
                        onChange={(e) => handleFieldChange("relySubheading", e.target.value)}
                        className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-white text-slate-950 font-medium"
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
                        className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-white text-slate-950 font-medium"
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
                        className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-white text-slate-950 font-medium resize-none"
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
                        className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-white text-slate-950 font-medium"
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
                        className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-white text-slate-950 font-medium resize-none"
                      />
                    </div>
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
                      className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-white text-slate-950 font-medium"
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
                      className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-white text-slate-950 font-medium"
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
                      className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-white text-slate-950 font-medium"
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
                      className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-white text-slate-950 font-medium"
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
                      className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-white text-slate-950 font-medium"
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
                      className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-white text-slate-950 font-medium"
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
                        className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-white text-slate-950 font-medium"
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
                        className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-white text-slate-950 font-medium"
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
                        className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-white text-slate-950 font-medium font-mono text-xs"
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
                        className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-white text-slate-950 font-medium"
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
                    className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-white text-slate-950 font-medium"
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
                    className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-white text-slate-950 font-medium"
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
                  className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-white text-slate-950 font-medium resize-none"
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
                  className={`w-full px-4 py-3 text-xs border rounded-xl outline-none font-mono resize-none bg-white text-slate-950 font-medium focus:ring-1 ${
                    jsonError
                      ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                      : "border-slate-200 focus:border-primary focus:ring-primary"
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
              Updates sync to MongoDB Database instantly
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
                All changes have been successfully saved, updated, and synchronized to your MongoDB Database cluster.
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
                We encountered an error while communicating with the MongoDB Database server. Please check your network connection or backend state.
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
