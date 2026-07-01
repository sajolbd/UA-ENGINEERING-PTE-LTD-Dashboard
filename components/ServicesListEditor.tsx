"use client";
import { API_BASE } from "../lib/api";

import React, { useState, useEffect } from "react";
import {
  Briefcase,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  Save,
  CheckCircle,
  X
} from "lucide-react";

interface SubService {
  slug: string;
  title: string;
  image: string;
  description: string;
  longDescription: string;
  features: string[];
  benefits: string[];
  process: string[];
}

interface ServiceCategory {
  slug: string;
  title: string;
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

  const fullImageUrl = value
    ? (value.startsWith("http") || value.startsWith("data")
      ? value
      : `${API_BASE}${value}`)
    : "";

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

export default function ServicesListEditor() {
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedCat, setExpandedCat] = useState<string | null>(null);
  
  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [targetCategorySlug, setTargetCategorySlug] = useState<string>("");
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
    categorySlug: string;
    serviceSlug: string;
    serviceTitle: string;
  }>({ show: false, categorySlug: "", serviceSlug: "", serviceTitle: "" });

  const showToast = (type: "success" | "error" | "warning", title: string, message: string) => {
    setToast({ show: true, type, title, message });
    setTimeout(() => {
      setToast((prev) => (prev.title === title && prev.message === message ? { ...prev, show: false } : prev));
    }, 4000);
  };

  // Form Fields State
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [features, setFeatures] = useState<string[]>([""]);
  const [benefits, setBenefits] = useState<string[]>([""]);
  const [processList, setProcessList] = useState<string[]>([""]);

  const loadServices = () => {
    setLoading(true);
    fetch(`${API_BASE}/api/services`)
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.data) {
          setCategories(res.data);
          if (res.data.length > 0) {
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

  const handleToggleExpand = (slug: string) => {
    setExpandedCat(expandedCat === slug ? null : slug);
  };

  // List Inputs handlers
  const handleListChange = (
    index: number,
    value: string,
    listType: "features" | "benefits" | "process"
  ) => {
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

  const handleRemoveListItem = (
    index: number,
    listType: "features" | "benefits" | "process"
  ) => {
    if (listType === "features") {
      setFeatures(features.filter((_, idx) => idx !== index));
    } else if (listType === "benefits") {
      setBenefits(benefits.filter((_, idx) => idx !== index));
    } else {
      setProcessList(processList.filter((_, idx) => idx !== index));
    }
  };

  const handleOpenAddModal = (categorySlug: string) => {
    setTargetCategorySlug(categorySlug);
    setTitle("");
    setImage("");
    setDescription("");
    setLongDescription("");
    setFeatures([""]);
    setBenefits([""]);
    setProcessList([""]);
    setShowModal(true);
  };

  const handleAddServiceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      showToast("warning", "Missing Title", "Please enter a service title.");
      return;
    }

    const slug = title.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    const newService: SubService = {
      slug,
      title: title.trim(),
      image: image || "/images/layout/breadcrumb-bg.png",
      description: description.trim(),
      longDescription: longDescription.trim(),
      features: features.filter((f) => f.trim() !== ""),
      benefits: benefits.filter((b) => b.trim() !== ""),
      process: processList.filter((p) => p.trim() !== "")
    };

    // Update locally in the categories tree
    const updatedCategories = categories.map((cat) => {
      if (cat.slug === targetCategorySlug) {
        return {
          ...cat,
          services: [...cat.services, newService]
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
        setShowModal(false);
        showToast("success", "Service Added", `"${title.trim()}" has been published successfully.`);
        setTimeout(() => setSaveSuccess(false), 4000);
      } else {
        showToast("error", "Publish Failed", result.error || "Failed to publish service");
      }
    } catch {
      showToast("error", "Connection Error", "Failed to connect to Express REST server.");
    }
  };

  const handleDeleteSubService = (catSlug: string, servSlug: string, servTitle: string) => {
    setDeleteConfirm({ show: true, categorySlug: catSlug, serviceSlug: servSlug, serviceTitle: servTitle });
  };

  const confirmDeleteSubService = async () => {
    const { categorySlug, serviceSlug, serviceTitle } = deleteConfirm;
    setDeleteConfirm({ show: false, categorySlug: "", serviceSlug: "", serviceTitle: "" });

    const updatedCategories = categories.map((cat) => {
      if (cat.slug === categorySlug) {
        return {
          ...cat,
          services: cat.services.filter((s) => s.slug !== serviceSlug)
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
        showToast("success", "Service Deleted", `"${serviceTitle}" has been removed successfully.`);
      } else {
        showToast("error", "Delete Failed", result.error || "Failed to delete service");
      }
    } catch {
      showToast("error", "Connection Error", "Failed to connect to Express REST server.");
    }
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
    <div className="space-y-6 max-w-4xl mx-auto animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-white border border-slate-100 rounded-2xl shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary-light text-primary rounded-2xl border border-primary/5">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
              Services Database Listing
            </span>
            <h3 className="text-lg font-black text-secondary font-display">
              Services Directory Manager
            </h3>
          </div>
        </div>
      </div>

      {/* SAVE SUCCESS NOTIFICATION */}
      {saveSuccess && (
        <div className="flex items-center gap-3 p-4 bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-2xl shadow-sm animate-slide-up">
          <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
          <span className="text-xs font-bold">
            New service successfully published and synced to MongoDB Atlas!
          </span>
        </div>
      )}

      {/* Accordion Categories Manager */}
      <div className="space-y-4">
        {categories.map((cat) => {
          const isExpanded = expandedCat === cat.slug;
          return (
            <div
              key={cat.slug}
              className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden"
            >
              {/* Accordion Header */}
              <div
                onClick={() => handleToggleExpand(cat.slug)}
                className="flex items-center justify-between p-5 cursor-pointer hover:bg-slate-50/50 select-none transition-colors"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={cat.featuredImage.startsWith("/") ? `${API_BASE}${cat.featuredImage}` : cat.featuredImage}
                    alt={cat.title}
                    className="w-12 h-12 object-cover rounded-xl border border-slate-100"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/images/logo.png";
                    }}
                  />
                  <div>
                    <h4 className="text-sm font-black text-secondary">
                      {cat.title}
                    </h4>
                    <p className="text-xs text-slate-400 line-clamp-1 font-medium mt-0.5">
                      {cat.shortDescription}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg">
                    {cat.services.length} Services
                  </span>
                  {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </div>
              </div>

              {/* Accordion Expanded Content */}
              {isExpanded && (
                <div className="border-t border-slate-100 p-5 bg-slate-50/20 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                      Sub-Services Lists
                    </span>
                    
                    <button
                      onClick={() => handleOpenAddModal(cat.slug)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary hover:bg-primary-hover text-white rounded-xl text-xs font-bold shadow-sm transition-all active:scale-95"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add New Service</span>
                    </button>
                  </div>

                  {cat.services.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-xs text-slate-400 font-bold">
                        No services configured in this category yet. Click above to add one.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {cat.services.map((service) => (
                        <div
                          key={service.slug}
                          className="flex items-start justify-between p-4 bg-white border border-slate-100 rounded-xl shadow-xs hover:shadow-sm transition-all"
                        >
                          <div className="flex gap-3">
                            <img
                              src={service.image.startsWith("/") ? `${API_BASE}${service.image}` : service.image}
                              alt={service.title}
                              className="w-14 h-14 object-cover rounded-lg border border-slate-100 shrink-0"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = "/images/logo.png";
                              }}
                            />
                            <div className="space-y-1">
                              <h5 className="text-xs font-bold text-secondary">
                                {service.title}
                              </h5>
                              <p className="text-[10px] text-slate-400 line-clamp-2 leading-relaxed">
                                {service.description}
                              </p>
                            </div>
                          </div>

                          <button
                            onClick={() => handleDeleteSubService(cat.slug, service.slug, service.title)}
                            className="p-1.5 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-lg transition-colors shrink-0"
                            title="Delete Service"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
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

      {/* --- ADD SUB-SERVICE MODAL FORM --- */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm z-50 overflow-y-auto p-4 py-8">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl p-6 max-w-2xl w-full max-h-[85vh] overflow-y-auto thin-scrollbar relative space-y-6 animate-scale-up">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-primary" />
                <h3 className="text-sm font-black text-secondary">
                  Add Service to Category
                </h3>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 hover:bg-slate-100 rounded-full text-slate-400 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddServiceSubmit} className="space-y-5">
              {/* Title field */}
              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                  Service Title / Heading
                </label>
                <input
                  type="text"
                  placeholder="e.g. Toilet Bowl Plumbing Install"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-white text-slate-950 font-medium"
                />
              </div>

              {/* Banner Image upload */}
              <ImageUploadField
                label="Service Banner Showcase Image"
                value={image}
                onChange={setImage}
              />

              {/* Short Description */}
              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                  Short Description (Shown on cards)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Custom toilet bowl replacement and leak protection piping..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-white text-slate-950 font-medium resize-none"
                />
              </div>

              {/* Long description */}
              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                  Detailed long Description (Shown on Service page)
                </label>
                <textarea
                  rows={4}
                  placeholder="Provide complete engineering overview, specs and masonry work details..."
                  value={longDescription}
                  onChange={(e) => setLongDescription(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-white text-slate-950 font-medium resize-none"
                />
              </div>

              {/* Dynamic list array: features */}
              <div className="space-y-2.5">
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
                      className="flex-1 px-4 py-2 text-xs border border-slate-200 rounded-lg bg-white text-slate-950"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveListItem(idx, "features")}
                      className="p-2 text-slate-400 hover:text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Dynamic list array: benefits */}
              <div className="space-y-2.5">
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
                      placeholder="Benefit statement..."
                      value={item}
                      onChange={(e) => handleListChange(idx, e.target.value, "benefits")}
                      className="flex-1 px-4 py-2 text-xs border border-slate-200 rounded-lg bg-white text-slate-950"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveListItem(idx, "benefits")}
                      className="p-2 text-slate-400 hover:text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Dynamic list array: process steps */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    Step-by-Step Construction Process
                  </label>
                  <button
                    type="button"
                    onClick={() => handleAddListItem("process")}
                    className="text-[10px] font-extrabold text-primary hover:underline inline-flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Step Row
                  </button>
                </div>
                {processList.map((item, idx) => (
                  <div key={idx} className="flex gap-2 items-center">
                    <input
                      type="text"
                      placeholder={`Step ${idx + 1} description...`}
                      value={item}
                      onChange={(e) => handleListChange(idx, e.target.value, "process")}
                      className="flex-1 px-4 py-2 text-xs border border-slate-200 rounded-lg bg-white text-slate-950"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveListItem(idx, "process")}
                      className="p-2 text-slate-400 hover:text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
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
                  <span>Publish Service</span>
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
              <h3 className="text-sm font-black text-secondary">Delete Service</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Are you sure you want to permanently delete <span className="font-extrabold text-secondary">&ldquo;{deleteConfirm.serviceTitle}&rdquo;</span>? This operation is permanent.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirm({ show: false, categorySlug: "", serviceSlug: "", serviceTitle: "" })}
                className="py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Keep Service
              </button>
              <button
                onClick={confirmDeleteSubService}
                className="py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-md transition-all active:scale-95"
              >
                Delete Service
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
