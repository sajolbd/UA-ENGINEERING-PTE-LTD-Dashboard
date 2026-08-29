"use client";
import { API_BASE, fetchWithTimeout, getImageUrl } from "../lib/api";
import { initialServicesData } from "../data/servicesData";
import { compressImageFile } from "../lib/imageUtils";

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
  processSteps?: ProcessStep[];
}

interface FAQItem {
  question: string;
  answer: string;
}

interface ProcessStep {
  title: string;
  description: string;
}

interface ServiceCategory {
  slug: string;
  title: string;
  breadcrumbTitle?: string;
  detailTitle?: string;
  subServicesTitle?: string;
  subServicesSubheading?: string;
  shortDescription: string;
  description: string;
  featuredImage: string;
  bgImage: string;
  icon?: string;
  services: SubService[];
  features?: string[];
  benefits?: string[];
  process?: string[];
  processHeading?: string;
  processText?: string;
  processSteps?: ProcessStep[];
  targetBadge?: string;
  targetHeading?: string;
  targetSubheading?: string;
  targetSpaces?: string[];
  whyChooseBadge?: string;
  whyChooseHeading?: string;
  whyChooseLeftTitle?: string;
  whyChooseRightTitle?: string;
  whyChooseAdvantages?: { title: string; description: string }[];
  whyChooseChallenges?: { title: string; description: string }[];
  serviceAreasBadge?: string;
  serviceAreasHeading?: string;
  serviceAreasSubheading?: string;
  faqs?: FAQItem[];
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

    if (file.size > 15 * 1024 * 1024) {
      setError("File is too large. Max limit is 15MB.");
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const compressedDataUrl = await compressImageFile(file, 1200, 1200, 0.75);

      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch(`${API_BASE}/api/upload`, {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      if (result.success && result.imagePath) {
        onChange(result.imagePath);
      } else {
        onChange(compressedDataUrl);
      }
    } catch {
      try {
        const compressedDataUrl = await compressImageFile(file, 1200, 1200, 0.75);
        onChange(compressedDataUrl);
      } catch {
        setError("Failed to process image.");
      }
    } finally {
      setUploading(false);
    }
  };

  const handleBase64Convert = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const compressedDataUrl = await compressImageFile(file, 1200, 1200, 0.75);
      onChange(compressedDataUrl);
    } catch {
      setError("Failed to convert image.");
    } finally {
      setUploading(false);
    }
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
  const [catDetailTitle, setCatDetailTitle] = useState("");
  const [catSubServicesTitle, setCatSubServicesTitle] = useState("");
  const [catSubServicesSubheading, setCatSubServicesSubheading] = useState("");
  const [catShortDesc, setCatShortDesc] = useState("");
  const [catDesc, setCatDesc] = useState("");
  const [catFeaturedImage, setCatFeaturedImage] = useState("");
  const [catBgImage, setCatBgImage] = useState("");
  const [catIcon, setCatIcon] = useState("");
  const [catFeatures, setCatFeatures] = useState<string[]>([""]);
  const [catBenefits, setCatBenefits] = useState<string[]>([""]);
  const [catProcessList, setCatProcessList] = useState<string[]>([""]);
  const [catProcessHeading, setCatProcessHeading] = useState("");
  const [catProcessText, setCatProcessText] = useState("");
  const [catProcessSteps, setCatProcessSteps] = useState<{ title: string; description: string }[]>([
    { title: "", description: "" }
  ]);
  const [catTargetBadge, setCatTargetBadge] = useState("");
  const [catTargetHeading, setCatTargetHeading] = useState("");
  const [catTargetSubheading, setCatTargetSubheading] = useState("");
  const [catTargetSpaces, setCatTargetSpaces] = useState<string[]>([""]);
  const [catWhyBadge, setCatWhyBadge] = useState("");
  const [catWhyHeading, setCatWhyHeading] = useState("");
  const [catWhyLeftTitle, setCatWhyLeftTitle] = useState("");
  const [catWhyRightTitle, setCatWhyRightTitle] = useState("");
  const [catWhyAdvantages, setCatWhyAdvantages] = useState<{ title: string; description: string }[]>([
    { title: "", description: "" }
  ]);
  const [catWhyChallenges, setCatWhyChallenges] = useState<{ title: string; description: string }[]>([
    { title: "", description: "" }
  ]);
  const [catAreasBadge, setCatAreasBadge] = useState("");
  const [catAreasHeading, setCatAreasHeading] = useState("");
  const [catAreasSubheading, setCatAreasSubheading] = useState("");
  const [catFaqs, setCatFaqs] = useState<{ question: string; answer: string }[]>([{ question: "", answer: "" }]);

  const handleWhyAdvantageChange = (index: number, field: "title" | "description", value: string) => {
    const copy = [...catWhyAdvantages];
    copy[index] = { ...copy[index], [field]: value };
    setCatWhyAdvantages(copy);
  };
  const handleAddWhyAdvantage = () => {
    setCatWhyAdvantages([...catWhyAdvantages, { title: "", description: "" }]);
  };
  const handleRemoveWhyAdvantage = (index: number) => {
    setCatWhyAdvantages(catWhyAdvantages.filter((_, idx) => idx !== index));
  };

  const handleWhyChallengeChange = (index: number, field: "title" | "description", value: string) => {
    const copy = [...catWhyChallenges];
    copy[index] = { ...copy[index], [field]: value };
    setCatWhyChallenges(copy);
  };
  const handleAddWhyChallenge = () => {
    setCatWhyChallenges([...catWhyChallenges, { title: "", description: "" }]);
  };
  const handleRemoveWhyChallenge = (index: number) => {
    setCatWhyChallenges(catWhyChallenges.filter((_, idx) => idx !== index));
  };

  const handleCatTargetSpaceChange = (index: number, value: string) => {
    const copy = [...catTargetSpaces];
    copy[index] = value;
    setCatTargetSpaces(copy);
  };

  const handleAddCatTargetSpace = () => {
    setCatTargetSpaces([...catTargetSpaces, ""]);
  };

  const handleRemoveCatTargetSpace = (index: number) => {
    setCatTargetSpaces(catTargetSpaces.filter((_, idx) => idx !== index));
  };

  const handleCatProcessStepChange = (index: number, field: "title" | "description", value: string) => {
    const copy = [...catProcessSteps];
    copy[index] = { ...copy[index], [field]: value };
    setCatProcessSteps(copy);
  };

  const handleAddCatProcessStep = () => {
    setCatProcessSteps([...catProcessSteps, { title: "", description: "" }]);
  };

  const handleRemoveCatProcessStep = (index: number) => {
    setCatProcessSteps(catProcessSteps.filter((_, idx) => idx !== index));
  };

  const handleCatListChange = (index: number, value: string, listType: "features" | "benefits" | "process") => {
    if (listType === "features") {
      const copy = [...catFeatures];
      copy[index] = value;
      setCatFeatures(copy);
    } else if (listType === "benefits") {
      const copy = [...catBenefits];
      copy[index] = value;
      setCatBenefits(copy);
    } else {
      const copy = [...catProcessList];
      copy[index] = value;
      setCatProcessList(copy);
    }
  };

  const handleAddCatListItem = (listType: "features" | "benefits" | "process") => {
    if (listType === "features") setCatFeatures([...catFeatures, ""]);
    else if (listType === "benefits") setCatBenefits([...catBenefits, ""]);
    else setCatProcessList([...catProcessList, ""]);
  };

  const handleRemoveCatListItem = (index: number, listType: "features" | "benefits" | "process") => {
    if (listType === "features") setCatFeatures(catFeatures.filter((_, idx) => idx !== index));
    else if (listType === "benefits") setCatBenefits(catBenefits.filter((_, idx) => idx !== index));
    else setCatProcessList(catProcessList.filter((_, idx) => idx !== index));
  };

  const handleCatFaqChange = (index: number, field: "question" | "answer", value: string) => {
    const copy = [...catFaqs];
    copy[index] = { ...copy[index], [field]: value };
    setCatFaqs(copy);
  };

  const handleAddCatFaq = () => {
    setCatFaqs([...catFaqs, { question: "", answer: "" }]);
  };

  const handleRemoveCatFaq = (index: number) => {
    setCatFaqs(catFaqs.filter((_, idx) => idx !== index));
  };

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
  const [subProcessSteps, setSubProcessSteps] = useState<{ title: string; description: string }[]>([
    { title: "", description: "" }
  ]);

  const handleSubProcessStepChange = (index: number, field: "title" | "description", value: string) => {
    const copy = [...subProcessSteps];
    copy[index] = { ...copy[index], [field]: value };
    setSubProcessSteps(copy);
  };
  const handleAddSubProcessStep = () => {
    setSubProcessSteps([...subProcessSteps, { title: "", description: "" }]);
  };
  const handleRemoveSubProcessStep = (index: number) => {
    setSubProcessSteps(subProcessSteps.filter((_, idx) => idx !== index));
  };

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
    fetchWithTimeout(`${API_BASE}/api/services`, {}, 5000)
      .then((res) => res.json())
      .then((res) => {
        if (res.success && Array.isArray(res.data) && res.data.length > 0) {
          setCategories(res.data);
          if (!expandedCat) {
            setExpandedCat(res.data[0].slug);
          }
        } else {
          // Fallback if data is empty
          setCategories(initialServicesData);
          if (initialServicesData.length > 0 && !expandedCat) {
            setExpandedCat(initialServicesData[0].slug);
          }
        }
      })
      .catch((err) => {
        console.warn("Using default fallback services directory:", err);
        setCategories(initialServicesData);
        if (initialServicesData.length > 0 && !expandedCat) {
          setExpandedCat(initialServicesData[0].slug);
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadServices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saveCategoriesToBackend = async (updated: ServiceCategory[], successMsg: string) => {
    try {
      const res = await fetch(`${API_BASE}/api/services`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categories: updated })
      });

      let result;
      try {
        result = await res.json();
      } catch {
        if (res.status === 413) {
          showToast("error", "Payload Too Large", "Image files are too large. Please use smaller/compressed images.");
          return false;
        }
        showToast("error", "Server Error", `Backend returned status ${res.status}`);
        return false;
      }

      if (res.ok && result.success) {
        setCategories(updated);
        setSaveSuccess(true);
        showToast("success", "Database Saved", successMsg);
        setTimeout(() => setSaveSuccess(false), 4000);
        return true;
      } else {
        showToast("error", "Save Failed", result.error || result.message || "Failed to save services database");
        return false;
      }
    } catch (err: any) {
      console.error("saveCategoriesToBackend error:", err);
      showToast("error", "Connection Error", err?.message || "Failed to connect to backend server.");
      return false;
    }
  };

  // --- CATEGORY CRUD HANDLERS ---
  const handleOpenAddCategoryModal = () => {
    setEditingCategorySlug(null);
    setCatTitle("");
    setCatBreadcrumbTitle("");
    setCatDetailTitle("");
    setCatSubServicesTitle("");
    setCatSubServicesSubheading("");
    setCatShortDesc("");
    setCatDesc("");
    setCatFeaturedImage("/images/services/sanitary-hero.png");
    setCatBgImage("/images/layout/breadcrumb-bg.png");
    setCatIcon("");
    setCatFeatures([""]);
    setCatBenefits([""]);
    setCatProcessList([""]);
    setCatProcessHeading("");
    setCatProcessText("");
    setCatProcessSteps([{ title: "", description: "" }]);
    setCatTargetBadge("");
    setCatTargetHeading("");
    setCatTargetSubheading("");
    setCatTargetSpaces([""]);
    setCatWhyBadge("");
    setCatWhyHeading("");
    setCatWhyLeftTitle("");
    setCatWhyRightTitle("");
    setCatWhyAdvantages([{ title: "", description: "" }]);
    setCatWhyChallenges([{ title: "", description: "" }]);
    setCatAreasBadge("");
    setCatAreasHeading("");
    setCatAreasSubheading("");
    setCatFaqs([{ question: "", answer: "" }]);
    setShowCategoryModal(true);
  };

  const handleOpenEditCategoryModal = (cat: ServiceCategory, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingCategorySlug(cat.slug);
    setCatTitle(cat.title);
    setCatBreadcrumbTitle(cat.breadcrumbTitle || "");
    setCatDetailTitle(cat.detailTitle || "");
    setCatSubServicesTitle(cat.subServicesTitle || "");
    setCatSubServicesSubheading(cat.subServicesSubheading || "");
    setCatShortDesc(cat.shortDescription);
    setCatDesc(cat.description);
    setCatFeaturedImage(cat.featuredImage);
    setCatBgImage(cat.bgImage);
    setCatIcon(cat.icon || "");
    setCatFeatures(cat.features && cat.features.length > 0 ? cat.features : [""]);
    setCatBenefits(cat.benefits && cat.benefits.length > 0 ? cat.benefits : [""]);
    setCatProcessList(cat.process && cat.process.length > 0 ? cat.process : [""]);
    setCatProcessHeading(cat.processHeading || "");
    setCatProcessText(cat.processText || "");
    setCatProcessSteps(cat.processSteps && cat.processSteps.length > 0 ? cat.processSteps : [{ title: "", description: "" }]);
    setCatTargetBadge(cat.targetBadge || "");
    setCatTargetHeading(cat.targetHeading || "");
    setCatTargetSubheading(cat.targetSubheading || "");
    setCatTargetSpaces(cat.targetSpaces && cat.targetSpaces.length > 0 ? cat.targetSpaces : [""]);
    setCatWhyBadge(cat.whyChooseBadge || "");
    setCatWhyHeading(cat.whyChooseHeading || "");
    setCatWhyLeftTitle(cat.whyChooseLeftTitle || "");
    setCatWhyRightTitle(cat.whyChooseRightTitle || "");
    setCatWhyAdvantages(cat.whyChooseAdvantages && cat.whyChooseAdvantages.length > 0 ? cat.whyChooseAdvantages : [{ title: "", description: "" }]);
    setCatWhyChallenges(cat.whyChooseChallenges && cat.whyChooseChallenges.length > 0 ? cat.whyChooseChallenges : [{ title: "", description: "" }]);
    setCatAreasBadge(cat.serviceAreasBadge || "");
    setCatAreasHeading(cat.serviceAreasHeading || "");
    setCatAreasSubheading(cat.serviceAreasSubheading || "");
    setCatFaqs(cat.faqs && cat.faqs.length > 0 ? cat.faqs : [{ question: "", answer: "" }]);
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

    const featuresClean = catFeatures.map((s) => s.trim()).filter(Boolean);
    const benefitsClean = catBenefits.map((s) => s.trim()).filter(Boolean);
    const processClean = catProcessList.map((s) => s.trim()).filter(Boolean);
    const processStepsClean = catProcessSteps.filter((s) => s.title.trim() !== "" || s.description.trim() !== "");
    const targetSpacesClean = catTargetSpaces.map((s) => s.trim()).filter(Boolean);
    const whyAdvantagesClean = catWhyAdvantages.filter((a) => a.title.trim() !== "" || a.description.trim() !== "");
    const whyChallengesClean = catWhyChallenges.filter((c) => c.title.trim() !== "" || c.description.trim() !== "");
    const faqsClean = catFaqs.filter((f) => f.question.trim() !== "" || f.answer.trim() !== "");

    let updated: ServiceCategory[];
    if (editingCategorySlug) {
      // Editing existing category
      updated = categories.map((c) => {
        if (c.slug === editingCategorySlug) {
          return {
            ...c,
            title: catTitle.trim(),
            breadcrumbTitle: catBreadcrumbTitle.trim() || undefined,
            detailTitle: catDetailTitle.trim() || undefined,
            subServicesTitle: catSubServicesTitle.trim() || undefined,
            subServicesSubheading: catSubServicesSubheading.trim() || undefined,
            shortDescription: catShortDesc.trim(),
            description: catDesc.trim(),
            featuredImage: catFeaturedImage || "/images/services/sanitary-hero.png",
            bgImage: catBgImage || "/images/layout/breadcrumb-bg.png",
            icon: catIcon || "",
            features: featuresClean,
            benefits: benefitsClean,
            process: processClean,
            processHeading: catProcessHeading.trim(),
            processText: catProcessText.trim(),
            processSteps: processStepsClean,
            targetBadge: catTargetBadge.trim() || undefined,
            targetHeading: catTargetHeading.trim() || undefined,
            targetSubheading: catTargetSubheading.trim() || undefined,
            targetSpaces: targetSpacesClean,
            whyChooseBadge: catWhyBadge.trim() || undefined,
            whyChooseHeading: catWhyHeading.trim() || undefined,
            whyChooseLeftTitle: catWhyLeftTitle.trim() || undefined,
            whyChooseRightTitle: catWhyRightTitle.trim() || undefined,
            whyChooseAdvantages: whyAdvantagesClean,
            whyChooseChallenges: whyChallengesClean,
            serviceAreasBadge: catAreasBadge.trim() || undefined,
            serviceAreasHeading: catAreasHeading.trim() || undefined,
            serviceAreasSubheading: catAreasSubheading.trim() || undefined,
            faqs: faqsClean
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
        detailTitle: catDetailTitle.trim() || undefined,
        subServicesTitle: catSubServicesTitle.trim() || undefined,
        subServicesSubheading: catSubServicesSubheading.trim() || undefined,
        shortDescription: catShortDesc.trim(),
        description: catDesc.trim(),
        featuredImage: catFeaturedImage || "/images/services/sanitary-hero.png",
        bgImage: catBgImage || "/images/layout/breadcrumb-bg.png",
        icon: catIcon || "",
        services: [],
        features: featuresClean,
        benefits: benefitsClean,
        process: processClean,
        processHeading: catProcessHeading.trim(),
        processText: catProcessText.trim(),
        processSteps: processStepsClean,
        targetBadge: catTargetBadge.trim() || undefined,
        targetHeading: catTargetHeading.trim() || undefined,
        targetSubheading: catTargetSubheading.trim() || undefined,
        targetSpaces: targetSpacesClean,
        whyChooseBadge: catWhyBadge.trim() || undefined,
        whyChooseHeading: catWhyHeading.trim() || undefined,
        whyChooseLeftTitle: catWhyLeftTitle.trim() || undefined,
        whyChooseRightTitle: catWhyRightTitle.trim() || undefined,
        whyChooseAdvantages: whyAdvantagesClean,
        whyChooseChallenges: whyChallengesClean,
        serviceAreasBadge: catAreasBadge.trim() || undefined,
        serviceAreasHeading: catAreasHeading.trim() || undefined,
        serviceAreasSubheading: catAreasSubheading.trim() || undefined,
        faqs: faqsClean
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
    setSubProcessSteps([
      { title: "Assessment", description: "Initial consultation & site measurements" },
      { title: "Design", description: "Layout presentation & design rendering" },
      { title: "Approval", description: "Obtaining necessary HDB/BCA permits" },
      { title: "Hacking", description: "Structural hacking & masonry flooring" },
      { title: "Installation", description: "Electrical, plumbing & carpentry installation" },
      { title: "Verification", description: "Final touch-ups, QA inspection & key handover" }
    ]);
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
    setFeatures(service.features && service.features.length > 0 ? service.features : [""]);
    setBenefits(service.benefits && service.benefits.length > 0 ? service.benefits : [""]);
    setProcessList(service.process && service.process.length > 0 ? service.process : [""]);

    const stepsInitial = (service.processSteps && service.processSteps.length > 0)
      ? service.processSteps
      : (service.process && service.process.length > 0)
        ? service.process.map((step, idx) => {
            const defaultTitles = ["Assessment", "Design", "Approval", "Hacking", "Installation", "Verification"];
            let title = defaultTitles[idx] || `Step 0${idx + 1}`;
            let description = step;
            if (typeof step === "string" && (step.includes(":") || step.includes("–") || step.includes(" - "))) {
              const parts = step.split(/[:–]|\s-\s/);
              if (parts.length > 1) {
                title = parts[0].trim();
                description = parts.slice(1).join(":").trim();
              }
            }
            return { title, description };
          })
        : [{ title: "", description: "" }];
    setSubProcessSteps(stepsInitial);
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

    const processStepsClean = subProcessSteps.filter((s) => s.title.trim() !== "" || s.description.trim() !== "");
    const processListClean = processStepsClean.map((s) => `${s.title.trim()}: ${s.description.trim()}`);

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
      process: processListClean,
      processSteps: processStepsClean
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
                  {/* eslint-disable-next-line @next/next/no-img-element */}
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
                        Sub-Services List inside &quot;{cat.title}&quot;
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
                        No services configured under &quot;{cat.title}&quot; yet. Click above to add your first service item!
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
                            {/* eslint-disable-next-line @next/next/no-img-element */}
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
                  Detail Page Main Heading (Title on Category Page)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Professional Renovation & Upgrading"
                  value={catDetailTitle}
                  onChange={(e) => setCatDetailTitle(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-950 text-white font-medium placeholder:text-slate-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                  Sub-Services Section Heading
                </label>
                <input
                  type="text"
                  placeholder="e.g. What We Offer Under Renovation & Upgrading"
                  value={catSubServicesTitle}
                  onChange={(e) => setCatSubServicesTitle(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-950 text-white font-medium placeholder:text-slate-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                  Sub-Services Section Subheading
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Discover our specific range of professional contracting services designed to meet Singapore regulatory standards."
                  value={catSubServicesSubheading}
                  onChange={(e) => setCatSubServicesSubheading(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-950 text-white font-medium resize-none placeholder:text-slate-500"
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
                label="Service Card Icon (Shown on Homepage Grid)"
                value={catIcon}
                onChange={setCatIcon}
              />

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

              {/* Dynamic list: Category Key Specifications / Features */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <div className="flex items-center justify-between">
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    Category Key Specifications / Highlights
                  </label>
                  <button
                    type="button"
                    onClick={() => handleAddCatListItem("features")}
                    className="text-[10px] font-extrabold text-primary hover:underline inline-flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Bullet Row
                  </button>
                </div>
                {catFeatures.map((item, idx) => (
                  <div key={idx} className="flex gap-2 items-center">
                    <input
                      type="text"
                      placeholder="e.g. BCA Certified Workmanship..."
                      value={item}
                      onChange={(e) => handleCatListChange(idx, e.target.value, "features")}
                      className="flex-1 px-4 py-2 text-xs border border-slate-700 rounded-xl bg-slate-950 text-white placeholder:text-slate-500"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveCatListItem(idx, "features")}
                      className="p-2 text-slate-400 hover:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Dynamic list: Category Benefits to Client */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    Category Key Benefits / Why Choose Us
                  </label>
                  <button
                    type="button"
                    onClick={() => handleAddCatListItem("benefits")}
                    className="text-[10px] font-extrabold text-primary hover:underline inline-flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Bullet Row
                  </button>
                </div>
                {catBenefits.map((item, idx) => (
                  <div key={idx} className="flex gap-2 items-center">
                    <input
                      type="text"
                      placeholder="Benefit point..."
                      value={item}
                      onChange={(e) => handleCatListChange(idx, e.target.value, "benefits")}
                      className="flex-1 px-4 py-2 text-xs border border-slate-700 rounded-xl bg-slate-950 text-white placeholder:text-slate-500"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveCatListItem(idx, "benefits")}
                      className="p-2 text-slate-400 hover:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* --- OUR WORKING PROCESS SECTION EDITOR --- */}
              <div className="space-y-4 pt-4 border-t border-slate-800">
                <h4 className="text-xs font-extrabold uppercase tracking-widest text-primary border-l-2 border-primary pl-2 mb-2">
                  &quot;Our Working Process&quot; Section Settings
                </h4>
                
                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                    Section Big Heading (Left Column)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Your Vision, Your Space, Our Renovation"
                    value={catProcessHeading}
                    onChange={(e) => setCatProcessHeading(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-950 text-white font-medium placeholder:text-slate-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                    Section Narrative Description (Left Column)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Our structured renovation process transforms your Singapore property on time and budget..."
                    value={catProcessText}
                    onChange={(e) => setCatProcessText(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-950 text-white font-medium resize-none placeholder:text-slate-500"
                  />
                </div>

                {/* Detailed Process Steps List */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                      Process Steps List (Right Column Timeline)
                    </label>
                    <button
                      type="button"
                      onClick={handleAddCatProcessStep}
                      className="text-[10px] font-extrabold text-primary hover:underline inline-flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Process Step
                    </button>
                  </div>

                  {catProcessSteps.map((step, idx) => (
                    <div key={idx} className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl space-y-2 relative">
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] font-extrabold text-slate-400 uppercase">Step 0{idx + 1}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveCatProcessStep(idx)}
                          className="text-[10px] font-bold text-red-400 hover:text-red-300"
                        >
                          Remove Step
                        </button>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <label className="block text-[9px] font-extrabold uppercase text-slate-400 mb-0.5">Step Title</label>
                          <input
                            type="text"
                            placeholder="e.g. One-Site Meeting & Site Visit"
                            value={step.title}
                            onChange={(e) => handleCatProcessStepChange(idx, "title", e.target.value)}
                            className="w-full px-3 py-1.5 text-xs border border-slate-700 rounded-lg outline-none bg-slate-900 text-white font-medium"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] font-extrabold uppercase text-slate-400 mb-0.5">Step Description</label>
                          <textarea
                            rows={2}
                            placeholder="e.g. We assess your space, understand your needs..."
                            value={step.description}
                            onChange={(e) => handleCatProcessStepChange(idx, "description", e.target.value)}
                            className="w-full px-3 py-1.5 text-xs border border-slate-700 rounded-lg outline-none bg-slate-900 text-white font-medium resize-none"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* --- TARGET PROPERTIES / SERVED SPACES SECTION EDITOR --- */}
              <div className="space-y-4 pt-4 border-t border-slate-800">
                <h4 className="text-xs font-extrabold uppercase tracking-widest text-primary border-l-2 border-primary pl-2 mb-2">
                  &quot;Target Properties / Served Spaces&quot; Section Settings
                </h4>
                
                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                    Section Badge Text (e.g. TARGET PROPERTIES)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. TARGET PROPERTIES or Served Properties"
                    value={catTargetBadge}
                    onChange={(e) => setCatTargetBadge(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-950 text-white font-medium placeholder:text-slate-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                    Section Main Heading
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Professional Solutions for Every Space"
                    value={catTargetHeading}
                    onChange={(e) => setCatTargetHeading(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-950 text-white font-medium placeholder:text-slate-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                    Section Narrative Subheading
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Enhancing and protecting homes, offices, retail spaces, and industrial facilities with expert workmanship."
                    value={catTargetSubheading}
                    onChange={(e) => setCatTargetSubheading(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-950 text-white font-medium resize-none placeholder:text-slate-500"
                  />
                </div>

                {/* Target Property Cards List */}
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                      Property / Space Cards List
                    </label>
                    <button
                      type="button"
                      onClick={handleAddCatTargetSpace}
                      className="text-[10px] font-extrabold text-primary hover:underline inline-flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Property Card
                    </button>
                  </div>
                  {catTargetSpaces.map((space, idx) => (
                    <div key={idx} className="flex gap-2 items-center">
                      <input
                        type="text"
                        placeholder="e.g. HDB Flats, Condominiums, Landed Houses..."
                        value={space}
                        onChange={(e) => handleCatTargetSpaceChange(idx, e.target.value)}
                        className="flex-1 px-4 py-2 text-xs border border-slate-700 rounded-xl bg-slate-950 text-white placeholder:text-slate-500"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveCatTargetSpace(idx)}
                        className="p-2 text-slate-400 hover:text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* --- WHY CHOOSE US / COMPARISON SECTION EDITOR --- */}
              <div className="space-y-4 pt-4 border-t border-slate-800">
                <h4 className="text-xs font-extrabold uppercase tracking-widest text-primary border-l-2 border-primary pl-2 mb-2">
                  &quot;Why Choose Us / Comparison&quot; Section Settings
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                      Top Badge Text (e.g. UA ADVANTAGE)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. UA ADVANTAGE"
                      value={catWhyBadge}
                      onChange={(e) => setCatWhyBadge(e.target.value)}
                      className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-950 text-white font-medium placeholder:text-slate-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                      Main Section Heading
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Why Choose UA Engineering?"
                      value={catWhyHeading}
                      onChange={(e) => setCatWhyHeading(e.target.value)}
                      className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-950 text-white font-medium placeholder:text-slate-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                      Left Card Title (Company Name)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. UA ENGINEERING PTE. LTD."
                      value={catWhyLeftTitle}
                      onChange={(e) => setCatWhyLeftTitle(e.target.value)}
                      className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-950 text-white font-medium placeholder:text-slate-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                      Right Card Title (Common Challenges)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Common Contractor Challenges"
                      value={catWhyRightTitle}
                      onChange={(e) => setCatWhyRightTitle(e.target.value)}
                      className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-950 text-white font-medium placeholder:text-slate-500"
                    />
                  </div>
                </div>

                {/* Left Card Advantages List */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-[10px] font-extrabold uppercase tracking-wider text-emerald-400">
                      Left Card Advantages List (Thumbs Up Points)
                    </label>
                    <button
                      type="button"
                      onClick={handleAddWhyAdvantage}
                      className="text-[10px] font-extrabold text-primary hover:underline inline-flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Advantage Point
                    </button>
                  </div>
                  {catWhyAdvantages.map((item, idx) => (
                    <div key={idx} className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl space-y-2 relative">
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] font-extrabold text-emerald-400 uppercase">Advantage #{idx + 1}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveWhyAdvantage(idx)}
                          className="text-[10px] font-bold text-red-400 hover:text-red-300"
                        >
                          Remove
                        </button>
                      </div>
                      <div className="space-y-2">
                        <input
                          type="text"
                          placeholder="Advantage Title (e.g. Complete Building Solutions)..."
                          value={item.title}
                          onChange={(e) => handleWhyAdvantageChange(idx, "title", e.target.value)}
                          className="w-full px-3 py-1.5 text-xs border border-slate-700 rounded-lg outline-none bg-slate-900 text-white font-medium"
                        />
                        <textarea
                          rows={2}
                          placeholder="Advantage Description..."
                          value={item.description}
                          onChange={(e) => handleWhyAdvantageChange(idx, "description", e.target.value)}
                          className="w-full px-3 py-1.5 text-xs border border-slate-700 rounded-lg outline-none bg-slate-900 text-white font-medium resize-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Right Card Challenges List */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-[10px] font-extrabold uppercase tracking-wider text-rose-400">
                      Right Card Challenges List (Thumbs Down Points)
                    </label>
                    <button
                      type="button"
                      onClick={handleAddWhyChallenge}
                      className="text-[10px] font-extrabold text-primary hover:underline inline-flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Challenge Point
                    </button>
                  </div>
                  {catWhyChallenges.map((item, idx) => (
                    <div key={idx} className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl space-y-2 relative">
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] font-extrabold text-rose-400 uppercase">Challenge #{idx + 1}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveWhyChallenge(idx)}
                          className="text-[10px] font-bold text-red-400 hover:text-red-300"
                        >
                          Remove
                        </button>
                      </div>
                      <div className="space-y-2">
                        <input
                          type="text"
                          placeholder="Challenge Title (e.g. Multiple Contractors to Manage)..."
                          value={item.title}
                          onChange={(e) => handleWhyChallengeChange(idx, "title", e.target.value)}
                          className="w-full px-3 py-1.5 text-xs border border-slate-700 rounded-lg outline-none bg-slate-900 text-white font-medium"
                        />
                        <textarea
                          rows={2}
                          placeholder="Challenge Description..."
                          value={item.description}
                          onChange={(e) => handleWhyChallengeChange(idx, "description", e.target.value)}
                          className="w-full px-3 py-1.5 text-xs border border-slate-700 rounded-lg outline-none bg-slate-900 text-white font-medium resize-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* --- SERVICE AREAS HEADER SECTION EDITOR WITH INPUT PREVIEW --- */}
              <div className="space-y-4 pt-4 border-t border-slate-800">
                <h4 className="text-xs font-extrabold uppercase tracking-widest text-primary border-l-2 border-primary pl-2 mb-2">
                  &quot;Service Areas Header&quot; Section Settings
                </h4>
                
                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                    Section Badge Text (e.g. SERVICE AREAS)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. SERVICE AREAS"
                    value={catAreasBadge}
                    onChange={(e) => setCatAreasBadge(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-950 text-white font-medium placeholder:text-slate-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                    Section Main Heading
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Reliable House Renovation Solutions Near You!"
                    value={catAreasHeading}
                    onChange={(e) => setCatAreasHeading(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-950 text-white font-medium placeholder:text-slate-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                    Section Narrative Subheading / Description
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. UA ENGINEERING proudly provides home renovation services across Singapore, covering all major residential and commercial areas."
                    value={catAreasSubheading}
                    onChange={(e) => setCatAreasSubheading(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-950 text-white font-medium resize-none placeholder:text-slate-500"
                  />
                </div>

                {/* --- LIVE INPUT PREVIEW BOX --- */}
                <div className="mt-4 p-5 bg-slate-950 border border-red-900/50 rounded-2xl relative shadow-lg">
                  <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-red-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-ping inline-block" />
                      Live Header Preview
                    </span>
                    <span className="text-[9px] text-slate-500 font-semibold">Real-Time Output</span>
                  </div>

                  <div className="text-center py-4 px-2 bg-slate-900/80 rounded-xl border border-slate-800">
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-red-400">
                      {catAreasBadge || "SERVICE AREAS"}
                    </p>
                    <h3 className="mt-2 text-xl font-extrabold tracking-tight text-white sm:text-2xl leading-tight">
                      {catAreasHeading || `Reliable ${catTitle || "Service"} Solutions Near You!`}
                    </h3>
                    <div className="mx-auto mt-3 flex h-1 w-16 overflow-hidden rounded-full">
                      <div className="w-1/2 bg-red-500" />
                      <div className="w-1/2 bg-slate-400" />
                    </div>
                    <p className="mt-4 text-xs leading-relaxed text-slate-300 max-w-lg mx-auto">
                      {catAreasSubheading || "UA ENGINEERING proudly provides professional contracting services across Singapore, covering all major residential and commercial areas."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Dynamic list: Category FAQs */}
              <div className="space-y-3 pt-2 border-t border-slate-800">
                <div className="flex items-center justify-between">
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    Category FAQs (Frequently Asked Questions)
                  </label>
                  <button
                    type="button"
                    onClick={handleAddCatFaq}
                    className="text-[10px] font-extrabold text-primary hover:underline inline-flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add FAQ Pair
                  </button>
                </div>
                {catFaqs.map((faq, idx) => (
                  <div key={idx} className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl space-y-2 relative">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-extrabold text-slate-400 uppercase">FAQ #{idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveCatFaq(idx)}
                        className="text-[10px] font-bold text-red-400 hover:text-red-300"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <label className="block text-[9px] font-extrabold uppercase text-slate-400 mb-0.5">Question</label>
                        <input
                          type="text"
                          placeholder="e.g. Do you assist with BCA permits?"
                          value={faq.question}
                          onChange={(e) => handleCatFaqChange(idx, "question", e.target.value)}
                          className="w-full px-3 py-1.5 text-xs border border-slate-700 rounded-lg outline-none bg-slate-950 text-white font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-extrabold uppercase text-slate-400 mb-0.5">Answer</label>
                        <textarea
                          rows={2}
                          placeholder="e.g. Yes, we handle all statutory applications..."
                          value={faq.answer}
                          onChange={(e) => handleCatFaqChange(idx, "answer", e.target.value)}
                          className="w-full px-3 py-1.5 text-xs border border-slate-700 rounded-lg outline-none bg-slate-950 text-white font-medium resize-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

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

              {/* Dynamic list: Structured Process Flow with Live Preview */}
              <div className="space-y-3 pt-3 border-t border-slate-800">
                <div className="flex items-center justify-between">
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-amber-400">
                    &quot;Our Work Process Flow&quot; Steps (Title &amp; Description)
                  </label>
                  <button
                    type="button"
                    onClick={handleAddSubProcessStep}
                    className="text-[10px] font-extrabold text-primary hover:underline inline-flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Process Step
                  </button>
                </div>

                {subProcessSteps.map((step, idx) => (
                  <div key={idx} className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl space-y-2 relative">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-extrabold text-amber-400 uppercase">Step 0{idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSubProcessStep(idx)}
                        className="text-[10px] font-bold text-red-400 hover:text-red-300"
                      >
                        Remove Step
                      </button>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <label className="block text-[9px] font-bold text-slate-400 mb-1">
                          Step Title (Red Marked Part, e.g. Assessment, Design, Approval, Hacking, Installation, Verification)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Assessment / Design / Approval..."
                          value={step.title}
                          onChange={(e) => handleSubProcessStepChange(idx, "title", e.target.value)}
                          className="w-full px-3 py-1.5 text-xs border border-slate-700 rounded-lg outline-none bg-slate-900 text-white font-extrabold focus:border-amber-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold text-slate-400 mb-1">
                          Step Description (Work details)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Initial consultation & site measurements..."
                          value={step.description}
                          onChange={(e) => handleSubProcessStepChange(idx, "description", e.target.value)}
                          className="w-full px-3 py-1.5 text-xs border border-slate-700 rounded-lg outline-none bg-slate-900 text-white font-medium"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                {/* --- LIVE WORK PROCESS FLOW PREVIEW BOX --- */}
                <div className="mt-4 p-4 bg-slate-950 border border-amber-900/50 rounded-2xl relative shadow-lg">
                  <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping inline-block" />
                      Live Work Process Flow Preview
                    </span>
                    <span className="text-[9px] text-slate-500 font-semibold">Real-Time Grid Output</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {subProcessSteps.map((step, i) => (
                      <div key={i} className="p-3 bg-slate-900/90 border border-slate-800 rounded-xl relative flex flex-col justify-between">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[9px] font-extrabold text-amber-400 uppercase">Step 0{i + 1}</span>
                          <span className="text-[10px] text-slate-500">▶</span>
                        </div>
                        <div>
                          <h5 className="text-xs font-black text-white underline decoration-amber-500 decoration-2 underline-offset-4 mb-1">
                            {step.title || `Phase ${i + 1}`}
                          </h5>
                          <p className="text-[11px] text-slate-300 font-medium leading-tight">
                            {step.description || "Step description details..."}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
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
                Are you sure you want to permanently delete <strong className="text-white">&quot;{deleteConfirm.title}&quot;</strong>?
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
