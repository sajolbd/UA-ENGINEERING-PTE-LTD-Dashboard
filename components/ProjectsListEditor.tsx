"use client";
import { API_BASE, fetchWithTimeout, getImageUrl } from "../lib/api";

import React, { useState, useEffect } from "react";
import {
  FolderGit,
  Plus,
  Edit,
  Trash2,
  Save,
  CheckCircle,
  AlertCircle,
  X,
  MapPin
} from "lucide-react";

interface ProjectItem {
  id?: string;
  _id?: string;
  title: string;
  category: string;
  image: string;
  description: string;
  location: string;
  gallery: string[];
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
            placeholder="/images/projects/sample.png or https://... or data:image/..."
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

export default function ProjectsListEditor() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
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
    projectId: string;
    projectTitle: string;
  }>({ show: false, projectId: "", projectTitle: "" });

  const showToast = (type: "success" | "error" | "warning", title: string, message: string) => {
    setToast({ show: true, type, title, message });
    setTimeout(() => {
      setToast((prev) => (prev.title === title && prev.message === message ? { ...prev, show: false } : prev));
    }, 4000);
  };

  // Form Fields State
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Painting & Waterproofing");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [gallery, setGallery] = useState<string[]>([""]);

  const CATEGORIES = [
    "Sanitary & Plumbing",
    "Painting & Waterproofing",
    "Renovation & Tiling",
    "Structural & Steel",
    "Electrical & Plumbing",
    "Solar Panel"
  ];

  const loadProjects = () => {
    setLoading(true);
    fetchWithTimeout(`${API_BASE}/api/projects`, {}, 5000)
      .then((res) => res.json())
      .then((res) => {
        if (res.success && Array.isArray(res.data)) {
          setProjects(res.data);
        }
      })
      .catch((err) => console.warn("Failed to load projects list:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleAddGalleryItem = () => {
    setGallery([...gallery, ""]);
  };

  const handleGalleryChange = (index: number, val: string) => {
    const copy = [...gallery];
    copy[index] = val;
    setGallery(copy);
  };

  const handleRemoveGalleryItem = (index: number) => {
    setGallery(gallery.filter((_, idx) => idx !== index));
  };

  const handleOpenAddModal = () => {
    setEditingProjectId(null);
    setTitle("");
    setCategory("Painting & Waterproofing");
    setImage("/images/projects/project1.png");
    setDescription("");
    setLocation("Singapore");
    setGallery([""]);
    setShowModal(true);
  };

  const handleOpenEditModal = (p: ProjectItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const id = p.id || p._id || "";
    setEditingProjectId(id);
    setTitle(p.title);
    setCategory(p.category || "Painting & Waterproofing");
    setImage(p.image || "");
    setDescription(p.description || "");
    setLocation(p.location || "Singapore");
    setGallery(p.gallery && p.gallery.length > 0 ? p.gallery : [""]);
    setShowModal(true);
  };

  const handleAddOrEditProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      showToast("warning", "Missing Title", "Please enter a project title.");
      return;
    }

    const payload: ProjectItem = {
      title: title.trim(),
      category,
      image: image || "/images/layout/breadcrumb-bg.png",
      description: description.trim(),
      location: location.trim(),
      gallery: gallery.filter((g) => g.trim() !== "")
    };

    try {
      const isEdit = !!editingProjectId;
      const url = isEdit ? `${API_BASE}/api/projects/${editingProjectId}` : `${API_BASE}/api/projects`;
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await res.json();
      if (result.success) {
        setSaveSuccess(true);
        setShowModal(false);
        loadProjects();
        showToast("success", isEdit ? "Project Updated" : "Project Published", `"${title.trim()}" has been saved successfully.`);
        setTimeout(() => setSaveSuccess(false), 4000);
      } else {
        showToast("error", "Save Failed", result.error || "Failed to save project");
      }
    } catch {
      showToast("error", "Connection Error", "Failed to connect to backend server.");
    }
  };

  const handleDeleteProjectPrompt = (projectId: string, projectTitle: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDeleteConfirm({ show: true, projectId, projectTitle });
  };

  const confirmDeleteProject = async () => {
    const { projectId, projectTitle } = deleteConfirm;
    setDeleteConfirm({ show: false, projectId: "", projectTitle: "" });

    const updatedProjects = projects.filter((p) => (p.id || p._id) !== projectId);

    try {
      const response = await fetch(`${API_BASE}/api/projects/${projectId}`, {
        method: "DELETE"
      });
      const result = await response.json();
      if (result.success) {
        setProjects(updatedProjects);
        showToast("success", "Project Deleted", `"${projectTitle}" has been removed successfully.`);
      } else {
        showToast("error", "Delete Failed", result.error || "Failed to delete project");
      }
    } catch {
      showToast("error", "Connection Error", "Failed to connect to backend server.");
    }
  };

  const filteredProjects = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <span className="text-xs font-bold text-slate-500">Loading projects portfolio...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-fade-in pb-12">
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

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-slate-900 border border-slate-800 rounded-2xl shadow-md">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/20 text-primary rounded-2xl border border-primary/30">
            <FolderGit className="w-6 h-6 text-primary" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
              Completed Works Portfolio
            </span>
            <h3 className="text-lg font-black text-white font-display">
              Projects Showcase Manager
            </h3>
          </div>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-xl text-xs font-bold shadow-lg shadow-primary/20 transition-all active:scale-95 self-start sm:self-auto select-none"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* SAVE SUCCESS NOTIFICATION */}
      {saveSuccess && (
        <div className="flex items-center gap-3 p-4 bg-emerald-950/80 text-emerald-200 border border-emerald-800 rounded-2xl shadow-sm animate-slide-up">
          <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-bold">
            Project portfolio successfully saved and synced to Website gallery!
          </span>
        </div>
      )}

      {/* Search Filter input */}
      <div className="relative">
        <input
          type="text"
          placeholder="Filter portfolio by title, category, or location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 pl-10 border border-slate-700 rounded-2xl outline-none bg-slate-900 text-white text-xs font-bold focus:border-primary transition-all duration-300 placeholder:text-slate-500"
        />
        <FolderGit className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
      </div>

      {/* Projects Grid Display List */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-16 bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <p className="text-sm font-bold text-slate-400">
            No projects found matching the filter query.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((p) => {
            const id = p.id || p._id || "";
            return (
              <div
                key={id}
                className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-md hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Thumbnail Banner */}
                  <div className="relative aspect-video w-full bg-slate-950 border-b border-slate-800">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={getImageUrl(p.image)}
                      alt={p.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/images/footer-logo.png";
                      }}
                    />
                    <span className="absolute top-3 left-3 bg-primary text-white text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-md tracking-wider shadow-sm">
                      {p.category}
                    </span>
                  </div>

                  <div className="p-4 space-y-2">
                    <div className="flex items-center gap-1 text-[10px] text-slate-400 font-extrabold uppercase tracking-wide">
                      <MapPin className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                      <span>{p.location}</span>
                    </div>

                    <h4 className="text-sm font-black text-white leading-snug line-clamp-1">
                      {p.title}
                    </h4>

                    <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                </div>

                <div className="p-4 pt-3 flex justify-between items-center border-t border-slate-800 bg-slate-950/40">
                  <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest">
                    {p.gallery?.length || 0} Gallery Items
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={(e) => handleOpenEditModal(p, e)}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold border border-slate-700 transition"
                      title="Edit Project Details"
                    >
                      <Edit className="w-3.5 h-3.5 text-primary" />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={(e) => handleDeleteProjectPrompt(id, p.title, e)}
                      className="p-1.5 bg-slate-800 hover:bg-red-950/80 text-slate-400 hover:text-red-400 rounded-xl border border-slate-700 transition"
                      title="Delete Project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* --- ADD / EDIT PROJECT MODAL FORM --- */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-slate-950/80 backdrop-blur-md z-50 overflow-y-auto p-4 py-8">
          <div className="bg-slate-900 rounded-3xl border border-slate-700 shadow-2xl p-6 max-w-2xl w-full max-h-[85vh] overflow-y-auto thin-scrollbar relative space-y-5 text-white animate-scale-up">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <FolderGit className="w-5 h-5 text-primary" />
                <h3 className="text-sm font-black text-white">
                  {editingProjectId ? "Edit Project Portfolio Details" : "Add New Completed Project"}
                </h3>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddOrEditProjectSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                    Project Title / Header
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Controlled Concrete Demolition"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-950 text-white font-medium placeholder:text-slate-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                    Service Category Tag
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-950 text-white font-medium"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                  Location / Site Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Bedok Mall, Singapore"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-950 text-white font-medium placeholder:text-slate-500"
                />
              </div>

              <ImageUploadField
                label="Featured Showcase Image"
                value={image}
                onChange={setImage}
              />

              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                  Project Description / Engineering Summary
                </label>
                <textarea
                  rows={3}
                  placeholder="Controlled hacking and demolition of reinforced concrete partition walls..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-950 text-white font-medium resize-none placeholder:text-slate-500"
                />
              </div>

              {/* Dynamic Gallery List */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    Project Image Gallery Photos
                  </label>
                  <button
                    type="button"
                    onClick={handleAddGalleryItem}
                    className="text-[10px] font-extrabold text-primary hover:underline inline-flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Gallery Image
                  </button>
                </div>

                {gallery.map((gItem, idx) => (
                  <div key={idx} className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-extrabold text-slate-400 uppercase">
                        Gallery Image #{idx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveGalleryItem(idx)}
                        className="text-[10px] font-bold text-red-400 hover:text-red-300"
                      >
                        Remove
                      </button>
                    </div>

                    <ImageUploadField
                      label=""
                      value={gItem}
                      onChange={(val) => handleGalleryChange(idx, val)}
                    />
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl shadow-md transition"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingProjectId ? "Update Project" : "Publish Project"}</span>
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
                Delete Project?
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Are you sure you want to permanently delete <strong className="text-white">&quot;{deleteConfirm.projectTitle}&quot;</strong>?
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirm({ show: false, projectId: "", projectTitle: "" })}
                className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteProject}
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
