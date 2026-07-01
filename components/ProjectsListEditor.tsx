"use client";
import { API_BASE } from "../lib/api";

import React, { useState, useEffect } from "react";
import {
  FolderGit,
  Plus,
  Trash2,
  Save,
  CheckCircle,
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

export default function ProjectsListEditor() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Modal states
  const [showModal, setShowModal] = useState(false);
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
    "Painting & Waterproofing",
    "Renovation & Tiling",
    "Structural & Steel",
    "Electrical & Plumbing",
    "Solar Panel"
  ];

  const loadProjects = () => {
    setLoading(true);
    fetch(`${API_BASE}/api/projects`)
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.data) {
          setProjects(res.data);
        }
      })
      .catch((err) => console.error("Failed to load projects list:", err))
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
    setTitle("");
    setCategory("Painting & Waterproofing");
    setImage("");
    setDescription("");
    setLocation("");
    setGallery([""]);
    setShowModal(true);
  };

  const handleAddProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      showToast("warning", "Missing Title", "Please enter a project title.");
      return;
    }

    const newProject: ProjectItem = {
      title: title.trim(),
      category,
      image: image || "/images/layout/breadcrumb-bg.png",
      description: description.trim(),
      location: location.trim(),
      gallery: gallery.filter((g) => g.trim() !== "")
    };

    try {
      const res = await fetch(`${API_BASE}/api/projects`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProject)
      });
      const result = await res.json();
      if (result.success) {
        setSaveSuccess(true);
        setShowModal(false);
        loadProjects(); // Reload list
        showToast("success", "Project Published", `"${title.trim()}" has been published successfully.`);
        setTimeout(() => setSaveSuccess(false), 4000);
      } else {
        showToast("error", "Publish Failed", result.error || "Failed to publish project");
      }
    } catch {
      showToast("error", "Connection Error", "Failed to connect to Express REST server.");
    }
  };

  const handleDeleteProject = (projectId: string, projectTitle: string) => {
    setDeleteConfirm({ show: true, projectId, projectTitle });
  };

  const confirmDeleteProject = async () => {
    const { projectId, projectTitle } = deleteConfirm;
    setDeleteConfirm({ show: false, projectId: "", projectTitle: "" });

    // Filter out the project from the current list
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
      showToast("error", "Connection Error", "Failed to connect to Express REST server.");
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
    <div className="space-y-6 max-w-5xl mx-auto animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-white border border-slate-100 rounded-2xl shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary-light text-primary rounded-2xl border border-primary/5">
            <FolderGit className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
              Completed Works Portfolio
            </span>
            <h3 className="text-lg font-black text-secondary font-display">
              Projects Portfolio Manager
            </h3>
          </div>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-xl text-xs font-bold shadow-sm transition-all active:scale-95 self-start sm:self-auto"
        >
          <Plus className="w-4.5 h-4.5" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* SAVE SUCCESS NOTIFICATION */}
      {saveSuccess && (
        <div className="flex items-center gap-3 p-4 bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-2xl shadow-sm animate-slide-up">
          <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
          <span className="text-xs font-bold">
            New project successfully published and synced to Website gallery!
          </span>
        </div>
      )}

      {/* Search Input Filter bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Filter portfolio by title, category, or location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 pl-10 border border-slate-200 rounded-2xl outline-none bg-white text-slate-900 text-xs font-bold focus:border-primary transition-all duration-300"
        />


      </div>

      {/* Projects Grid Display List */}
      {
        filteredProjects.length === 0 ? (
          <div className="text-center py-16 bg-white border border-slate-100 rounded-2xl">
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
                  className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Thumbnail Banner */}
                    <div className="relative aspect-video w-full bg-slate-50 border-b border-slate-50">
                      <img
                        src={p.image.startsWith("/") ? `${API_BASE}${p.image}` : p.image}
                        alt={p.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/images/footer-logo.png";
                        }}
                      />
                      <span className="absolute top-3 left-3 bg-secondary text-white text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-md tracking-wider">
                        {p.category}
                      </span>
                    </div>

                    <div className="p-4 space-y-2">
                      <div className="flex items-center gap-1 text-[10px] text-slate-400 font-extrabold uppercase tracking-wide">
                        <MapPin className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                        <span>{p.location}</span>
                      </div>

                      <h4 className="text-xs font-black text-secondary leading-snug line-clamp-1">
                        {p.title}
                      </h4>

                      <p className="text-[10px] text-slate-400 line-clamp-2 leading-relaxed">
                        {p.description}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 pt-0 flex justify-between items-center border-t border-slate-50/50 mt-2">
                    <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest">
                      {p.gallery?.length || 0} Gallery Items
                    </span>

                    <button
                      onClick={() => handleDeleteProject(id, p.title)}
                      className="p-1.5 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-lg transition-colors"
                      title="Delete Project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )
      }

      {/* --- ADD NEW PROJECT MODAL DIALOG --- */}
      {
        showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm z-50 overflow-y-auto p-4 py-8">
            <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl p-6 max-w-2xl w-full max-h-[85vh] overflow-y-auto thin-scrollbar relative space-y-6 animate-scale-up">

              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Plus className="w-5 h-5 text-primary" />
                  <h3 className="text-sm font-black text-secondary">
                    Add Completed Project
                  </h3>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-1 hover:bg-slate-100 rounded-full text-slate-400 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddProjectSubmit} className="space-y-5">

                {/* Grid 2 Cols */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Title */}
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                      Project Title
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Roof Tile Waterproofing Coating"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-white text-slate-950 font-medium"
                      required
                    />
                  </div>

                  {/* Category Selector */}
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                      Project Category
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
                </div>

                {/* Location */}
                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                    Project Location (Singapore Area)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Sembawang, Singapore"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-white text-slate-950 font-medium"
                    required
                  />
                </div>

                {/* Featured Image */}
                <ImageUploadField
                  label="Featured Project Cover Image"
                  value={image}
                  onChange={setImage}
                />

                {/* Description */}
                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                    Description Narrative
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Description of concrete works, painting application coatings or solar structures..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-white text-slate-950 font-medium resize-none"
                    required
                  />
                </div>

                {/* Dynamic Project gallery image uploads list */}
                <div className="space-y-4 border-t border-slate-100 pt-4">
                  <div className="flex items-center justify-between">
                    <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                      Additional Gallery Images
                    </label>
                    <button
                      type="button"
                      onClick={handleAddGalleryItem}
                      className="text-[10px] font-extrabold text-primary hover:underline inline-flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Gallery Row
                    </button>
                  </div>

                  <div className="space-y-3">
                    {gallery.map((item, idx) => (
                      <div key={idx} className="flex gap-2 items-start bg-slate-50/50 p-3 rounded-2xl border border-slate-100 relative">
                        <div className="flex-1 space-y-2">
                          <ImageUploadField
                            label={`Gallery Image #${idx + 1}`}
                            value={item}
                            onChange={(val) => handleGalleryChange(idx, val)}
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveGalleryItem(idx)}
                          className="p-1.5 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-lg transition-colors self-start mt-4"
                        >
                          <Trash2 className="w-4.5 h-4.5" />
                        </button>
                      </div>
                    ))}
                  </div>
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
                    <span>Publish Project</span>
                  </button>
                </div>

              </form>
            </div>
          </div>
        )
      }

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
              <h3 className="text-sm font-black text-secondary">Delete Project</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Are you sure you want to permanently delete <span className="font-extrabold text-secondary">&ldquo;{deleteConfirm.projectTitle}&rdquo;</span>? This operation is permanent.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirm({ show: false, projectId: "", projectTitle: "" })}
                className="py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Keep Project
              </button>
              <button
                onClick={confirmDeleteProject}
                className="py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-md transition-all active:scale-95"
              >
                Delete Project
              </button>
            </div>
          </div>
        </div>
      )}

    </div >
  );
}
