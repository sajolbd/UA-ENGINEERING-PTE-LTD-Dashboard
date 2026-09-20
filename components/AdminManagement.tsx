"use client";

import React, { useState, useEffect } from "react";
import { API_BASE, getApiBaseUrl, getImageUrl } from "../lib/api";
import {
  Users,
  UserCheck,
  ShieldCheck,
  UserPlus,
  Search,
  Filter,
  Edit,
  Trash2,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  XCircle,
  AlertCircle,
  X,
  UserCog,
  RefreshCw,
  KeyRound,
  ShieldAlert
} from "lucide-react";

export interface AdminUser {
  id?: string;
  _id?: string;
  username: string;
  name: string;
  email: string;
  role: "Super Admin" | "Admin" | "Editor";
  status: "Active" | "Inactive";
  avatar?: string;
  lastLogin?: string;
  createdAt?: string;
}

interface AdminManagementProps {
  currentLoggedUser?: AdminUser | null;
  showToast: (type: "success" | "error" | "warning", title: string, message: string) => void;
}

export default function AdminManagement({ currentLoggedUser, showToast }: AdminManagementProps) {
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");

  // Modal States
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Selected Item for Edit / Delete / Password
  const [selectedAdmin, setSelectedAdmin] = useState<AdminUser | null>(null);

  // Form Fields - Add / Edit
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    role: "Admin" as "Super Admin" | "Admin" | "Editor",
    status: "Active" as "Active" | "Inactive",
    avatar: ""
  });

  // Password Reset Field
  const [newPassword, setNewPassword] = useState("");
  const [showPassText, setShowPassText] = useState(false);

  // Resilient Fetch Helper
  const fetchAdminApi = async (path: string, options: RequestInit = {}) => {
    const baseUrl = getApiBaseUrl();
    const primaryUrl = `${baseUrl}${path}`;
    try {
      const res = await fetch(primaryUrl, options);
      if (res.ok) return res;
      if (!primaryUrl.includes("localhost") && !primaryUrl.includes("127.0.0.1")) {
        const localRes = await fetch(`http://localhost:5000${path}`, options);
        if (localRes.ok) return localRes;
      }
      return res;
    } catch (err) {
      if (!primaryUrl.includes("localhost") && !primaryUrl.includes("127.0.0.1")) {
        try {
          const localRes = await fetch(`http://localhost:5000${path}`, options);
          return localRes;
        } catch (e) {}
      }
      throw err;
    }
  };

  // Fetch Admins List
  const fetchAdmins = async () => {
    setLoading(true);
    try {
      const res = await fetchAdminApi("/api/admins", { cache: "no-store" });
      const result = await res.json();
      if (result.success && Array.isArray(result.data)) {
        setAdmins(result.data);
      } else {
        showToast("error", "Data Load Error", result.error || "Failed to load admin list.");
      }
    } catch (err) {
      console.error("Failed to load admin list:", err);
      showToast("error", "Connection Error", "Failed to connect to backend server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  // Filtered Admins
  const filteredAdmins = admins.filter((admin) => {
    const matchesSearch =
      admin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      admin.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = selectedRole === "All" || admin.role === selectedRole;
    const matchesStatus = selectedStatus === "All" || admin.status === selectedStatus;

    return matchesSearch && matchesRole && matchesStatus;
  });

  // KPI Calculations
  const totalAdminsCount = admins.length;
  const activeAdminsCount = admins.filter((a) => a.status === "Active").length;
  const superAdminsCount = admins.filter((a) => a.role === "Super Admin").length;

  // Open Add Modal
  const handleOpenAddModal = () => {
    setFormData({
      name: "",
      username: "",
      email: "",
      password: "",
      role: "Admin",
      status: "Active",
      avatar: ""
    });
    setShowAddModal(true);
  };

  // Submit Add Admin
  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.username.trim() || !formData.email.trim() || !formData.password.trim()) {
      showToast("warning", "Missing Fields", "Please complete all required fields.");
      return;
    }

    try {
      const res = await fetchAdminApi("/api/admins", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const result = await res.json();
      if (result.success) {
        showToast("success", "Admin Created", result.message || `Admin '${formData.name}' created!`);
        setShowAddModal(false);
        fetchAdmins();
      } else {
        showToast("error", "Creation Failed", result.error || "Failed to create admin account.");
      }
    } catch {
      showToast("error", "Connection Error", "Unable to communicate with backend server.");
    }
  };

  // Open Edit Modal
  const handleOpenEditModal = (admin: AdminUser) => {
    setSelectedAdmin(admin);
    setFormData({
      name: admin.name,
      username: admin.username,
      email: admin.email,
      password: "",
      role: admin.role,
      status: admin.status,
      avatar: admin.avatar || ""
    });
    setShowEditModal(true);
  };

  // Submit Edit Admin
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAdmin) return;
    const adminId = selectedAdmin.id || selectedAdmin._id || selectedAdmin.username;

    try {
      const res = await fetchAdminApi(`/api/admins/${adminId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          role: formData.role,
          status: formData.status,
          avatar: formData.avatar,
          ...(formData.password ? { password: formData.password } : {})
        })
      });
      const result = await res.json();
      if (result.success) {
        showToast("success", "Admin Updated", result.message || "Admin account updated successfully!");
        setShowEditModal(false);
        fetchAdmins();
      } else {
        showToast("error", "Update Failed", result.error || "Failed to update admin account.");
      }
    } catch {
      showToast("error", "Connection Error", "Unable to communicate with backend server.");
    }
  };

  // Toggle Admin Active Status Quick Action
  const handleToggleStatus = async (admin: AdminUser) => {
    const adminId = admin.id || admin._id || admin.username;
    const newStatus = admin.status === "Active" ? "Inactive" : "Active";

    // Safety guard
    if (admin.role === "Super Admin" && newStatus === "Inactive") {
      const activeSuperCount = admins.filter((a) => a.role === "Super Admin" && a.status === "Active").length;
      if (activeSuperCount <= 1) {
        showToast("warning", "Action Blocked", "Cannot deactivate the only active Super Admin account.");
        return;
      }
    }

    try {
      const res = await fetchAdminApi(`/api/admins/${adminId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });
      const result = await res.json();
      if (result.success) {
        showToast("success", "Status Changed", `Account '${admin.username}' is now ${newStatus}.`);
        fetchAdmins();
      } else {
        showToast("error", "Status Toggle Failed", result.error || "Could not toggle status.");
      }
    } catch {
      showToast("error", "Connection Error", "Failed to update status.");
    }
  };

  // Open Password Modal
  const handleOpenPasswordModal = (admin: AdminUser) => {
    setSelectedAdmin(admin);
    setNewPassword("");
    setShowPasswordModal(true);
  };

  // Submit Password Change
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAdmin || !newPassword.trim()) {
      showToast("warning", "Missing Password", "Please enter a new password.");
      return;
    }
    const adminId = selectedAdmin.id || selectedAdmin._id || selectedAdmin.username;

    try {
      const res = await fetchAdminApi(`/api/admins/${adminId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: newPassword.trim() })
      });
      const result = await res.json();
      if (result.success) {
        showToast("success", "Password Reset", `Password updated for '${selectedAdmin.username}'!`);
        setShowPasswordModal(false);
      } else {
        showToast("error", "Reset Failed", result.error || "Failed to update password.");
      }
    } catch {
      showToast("error", "Connection Error", "Failed to update password.");
    }
  };

  // Open Delete Modal
  const handleOpenDeleteModal = (admin: AdminUser) => {
    setSelectedAdmin(admin);
    setShowDeleteModal(true);
  };

  // Confirm Delete
  const handleConfirmDelete = async () => {
    if (!selectedAdmin) return;
    const adminId = selectedAdmin.id || selectedAdmin._id || selectedAdmin.username;

    try {
      const res = await fetchAdminApi(`/api/admins/${adminId}`, {
        method: "DELETE"
      });
      const result = await res.json();
      if (result.success) {
        showToast("success", "Admin Deleted", result.message || `Admin '${selectedAdmin.username}' deleted.`);
        setShowDeleteModal(false);
        fetchAdmins();
      } else {
        showToast("error", "Delete Blocked", result.error || "Failed to delete admin.");
      }
    } catch {
      showToast("error", "Connection Error", "Failed to delete admin account.");
    }
  };

  // Get Role Badge Styling
  const getRoleBadge = (role: string) => {
    switch (role) {
      case "Super Admin":
        return "bg-purple-100 text-purple-800 border-purple-200 shadow-sm";
      case "Admin":
        return "bg-blue-100 text-blue-800 border-blue-200 shadow-sm";
      case "Editor":
        return "bg-amber-100 text-amber-800 border-amber-200 shadow-sm";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-gradient-to-r from-[#0a1526] via-[#102038] to-[#152a4a] p-6 rounded-3xl text-white shadow-xl border border-slate-800 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-primary/10 to-transparent pointer-events-none" />
        
        <div className="space-y-1.5 z-10">
          <div className="flex items-center gap-2">
            <UserCog className="w-6 h-6 text-accent animate-pulse" />
            <h1 className="text-xl sm:text-2xl font-black font-display tracking-tight text-white">
              Admin &amp; Access Management
            </h1>
          </div>
          <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
            Manage administrator accounts, assign access roles (Super Admin, Admin, Editor), control account status, and enforce portal security standards.
          </p>
        </div>

        <div className="flex items-center gap-3 z-10 shrink-0">
          <button
            onClick={fetchAdmins}
            className="p-3 bg-slate-800/80 hover:bg-slate-700 text-slate-200 rounded-2xl border border-slate-700/60 shadow-sm transition-all active:scale-95 flex items-center gap-2 text-xs font-bold"
            title="Refresh List"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-accent" : ""}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>

          <button
            onClick={handleOpenAddModal}
            className="px-5 py-3 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-2xl shadow-lg shadow-primary/25 transition-all active:scale-95 flex items-center gap-2.5"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add New Admin</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Admins */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Total Admin Accounts</p>
            <h3 className="text-2xl font-black text-slate-900 mt-1 font-display">{totalAdminsCount}</h3>
            <p className="text-[11px] text-slate-500 font-medium mt-0.5">Registered system users</p>
          </div>
          <div className="p-3.5 bg-blue-50 text-blue-600 rounded-2xl border border-blue-100">
            <Users className="w-6 h-6" />
          </div>
        </div>

        {/* Active Admins */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Active Admins</p>
            <h3 className="text-2xl font-black text-emerald-600 mt-1 font-display">{activeAdminsCount}</h3>
            <p className="text-[11px] text-slate-500 font-medium mt-0.5">Authorized for portal login</p>
          </div>
          <div className="p-3.5 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-100">
            <UserCheck className="w-6 h-6" />
          </div>
        </div>

        {/* Super Admins */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Super Administrators</p>
            <h3 className="text-2xl font-black text-purple-600 mt-1 font-display">{superAdminsCount}</h3>
            <p className="text-[11px] text-slate-500 font-medium mt-0.5">Full access permissions</p>
          </div>
          <div className="p-3.5 bg-purple-50 text-purple-600 rounded-2xl border border-purple-100">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </div>

        {/* Security System Status */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Portal Authentication</p>
            <h3 className="text-lg font-black text-slate-900 mt-1 font-display flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 inline-block animate-ping" />
              REST Secured
            </h3>
            <p className="text-[11px] text-slate-500 font-medium mt-0.5">RBAC Access Active</p>
          </div>
          <div className="p-3.5 bg-amber-50 text-amber-600 rounded-2xl border border-amber-100">
            <Lock className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, username, or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-primary focus:bg-white transition-all font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Dropdown Filters */}
        <div className="flex items-center gap-2 overflow-x-auto thin-scrollbar pb-1 md:pb-0">
          <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs shrink-0">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[10px] font-extrabold uppercase text-slate-400">Role:</span>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="bg-transparent text-xs font-bold text-slate-700 outline-none cursor-pointer"
            >
              <option value="All">All Roles</option>
              <option value="Super Admin">Super Admin</option>
              <option value="Admin">Admin</option>
              <option value="Editor">Editor</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs shrink-0">
            <span className="text-[10px] font-extrabold uppercase text-slate-400">Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-transparent text-xs font-bold text-slate-700 outline-none cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Admin Users Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200/80 text-[10px] font-black uppercase tracking-wider text-slate-400">
                <th className="py-4 px-6">User Profile</th>
                <th className="py-4 px-6">Contact Email</th>
                <th className="py-4 px-6">Assigned Role</th>
                <th className="py-4 px-6">Account Status</th>
                <th className="py-4 px-6">Last Active</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400 font-medium">
                    <div className="flex flex-col items-center gap-2">
                      <RefreshCw className="w-6 h-6 animate-spin text-primary" />
                      <span>Loading administrator directory...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredAdmins.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400 font-medium">
                    <div className="flex flex-col items-center gap-2">
                      <AlertCircle className="w-8 h-8 text-slate-300" />
                      <span>No admin accounts found matching your filters.</span>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredAdmins.map((admin) => {
                  const isCurrent =
                    currentLoggedUser?.username === admin.username ||
                    currentLoggedUser?.email === admin.email;

                  return (
                    <tr
                      key={admin.id || admin._id || admin.username}
                      className="hover:bg-slate-50/80 transition-colors group"
                    >
                      {/* Profile / Avatar / Username */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="relative shrink-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={getImageUrl(admin.avatar, "/images/logo.webp")}
                              alt={admin.name}
                              className="w-10 h-10 rounded-xl object-cover bg-slate-100 border border-slate-200"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = "/images/logo.webp";
                              }}
                            />
                            <span
                              className={`absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-white ${
                                admin.status === "Active" ? "bg-emerald-500" : "bg-slate-400"
                              }`}
                            />
                          </div>

                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-extrabold text-slate-900 text-sm">{admin.name}</span>
                              {isCurrent && (
                                <span className="px-2 py-0.5 text-[9px] font-black uppercase rounded-full bg-primary/10 text-primary border border-primary/20">
                                  You
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] font-mono text-slate-400">@{admin.username}</span>
                          </div>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="py-4 px-6 font-medium text-slate-600">
                        {admin.email}
                      </td>

                      {/* Role Badge */}
                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold border ${getRoleBadge(
                            admin.role
                          )}`}
                        >
                          {admin.role === "Super Admin" && <ShieldCheck className="w-3 h-3 text-purple-600" />}
                          {admin.role}
                        </span>
                      </td>

                      {/* Status Toggle Switch */}
                      <td className="py-4 px-6">
                        <button
                          type="button"
                          onClick={() => handleToggleStatus(admin)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold transition-all ${
                            admin.status === "Active"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
                              : "bg-slate-100 text-slate-500 border border-slate-200 hover:bg-slate-200"
                          }`}
                          title={`Click to ${admin.status === "Active" ? "deactivate" : "activate"}`}
                        >
                          {admin.status === "Active" ? (
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          ) : (
                            <XCircle className="w-3 h-3 text-slate-400" />
                          )}
                          <span>{admin.status}</span>
                        </button>
                      </td>

                      {/* Last Active */}
                      <td className="py-4 px-6 text-[11px] text-slate-500 font-medium">
                        {admin.lastLogin
                          ? new Date(admin.lastLogin).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit"
                            })
                          : "Never Logged In"}
                      </td>

                      {/* Action Buttons */}
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Change Password */}
                          <button
                            onClick={() => handleOpenPasswordModal(admin)}
                            className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-colors"
                            title="Reset / Change Password"
                          >
                            <KeyRound className="w-4 h-4" />
                          </button>

                          {/* Edit Details */}
                          <button
                            onClick={() => handleOpenEditModal(admin)}
                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                            title="Edit Admin Account"
                          >
                            <Edit className="w-4 h-4" />
                          </button>

                          {/* Delete Account */}
                          <button
                            onClick={() => handleOpenDeleteModal(admin)}
                            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                            title="Delete Admin Account"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ─── ADD ADMIN MODAL ─── */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-scale-up">
            <div className="flex items-center justify-between p-6 bg-slate-900 text-white border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <UserPlus className="w-5 h-5 text-accent" />
                <h3 className="text-base font-extrabold font-display">Create Admin Account</h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sajol Ahmed"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-primary focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">
                    Username *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. sajol_admin"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-primary focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="sajol@uaengineering.com.sg"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-primary focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">
                  Initial Password *
                </label>
                <div className="relative">
                  <input
                    type={showPassText ? "text" : "password"}
                    required
                    placeholder="Enter strong password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-primary focus:bg-white pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassText(!showPassText)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassText ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">
                    System Role *
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        role: e.target.value as "Super Admin" | "Admin" | "Editor"
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-primary"
                  >
                    <option value="Super Admin">Super Admin (Full Access)</option>
                    <option value="Admin">Admin (Management)</option>
                    <option value="Editor">Editor (Content Edit Only)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">
                    Initial Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        status: e.target.value as "Active" | "Inactive"
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-primary"
                  >
                    <option value="Active">Active (Can Login)</option>
                    <option value="Inactive">Inactive (Suspended)</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl shadow-md"
                >
                  Save Admin Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── EDIT ADMIN MODAL ─── */}
      {showEditModal && selectedAdmin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-scale-up">
            <div className="flex items-center justify-between p-6 bg-slate-900 text-white border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <Edit className="w-5 h-5 text-accent" />
                <h3 className="text-base font-extrabold font-display">Edit Admin Details</h3>
              </div>
              <button
                onClick={() => setShowEditModal(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">
                    Username (Read Only)
                  </label>
                  <input
                    type="text"
                    disabled
                    value={formData.username}
                    className="w-full px-3.5 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs text-slate-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">
                    System Role *
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        role: e.target.value as "Super Admin" | "Admin" | "Editor"
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-primary"
                  >
                    <option value="Super Admin">Super Admin (Full Access)</option>
                    <option value="Admin">Admin (Management)</option>
                    <option value="Editor">Editor (Content Edit Only)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">
                    Account Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        status: e.target.value as "Active" | "Inactive"
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-primary"
                  >
                    <option value="Active">Active (Can Login)</option>
                    <option value="Inactive">Inactive (Suspended)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">
                  Update Password (Leave blank to keep unchanged)
                </label>
                <input
                  type="password"
                  placeholder="Enter new password to overwrite"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-primary"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl shadow-md"
                >
                  Update Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── RESET PASSWORD MODAL ─── */}
      {showPasswordModal && selectedAdmin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-scale-up">
            <div className="flex items-center justify-between p-6 bg-slate-900 text-white border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <KeyRound className="w-5 h-5 text-accent" />
                <h3 className="text-base font-extrabold font-display">Reset Password</h3>
              </div>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePasswordSubmit} className="p-6 space-y-4">
              <p className="text-xs text-slate-600 font-medium">
                Resetting password for administrator account: <strong className="text-slate-900 font-bold">@{selectedAdmin.username}</strong> ({selectedAdmin.name})
              </p>

              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">
                  New Password *
                </label>
                <div className="relative">
                  <input
                    type={showPassText ? "text" : "password"}
                    required
                    placeholder="Enter new password (min 6 chars)"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-primary pr-10 font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassText(!showPassText)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassText ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow-md"
                >
                  Reset Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── DELETE CONFIRMATION MODAL ─── */}
      {showDeleteModal && selectedAdmin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-scale-up">
            <div className="p-6 text-center space-y-4">
              <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <ShieldAlert className="w-6 h-6" />
              </div>

              <div>
                <h3 className="text-lg font-black text-slate-900 font-display">Delete Admin Account?</h3>
                <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
                  Are you sure you want to delete administrator <strong className="text-slate-900 font-bold">{selectedAdmin.name}</strong> (@{selectedAdmin.username})? This action cannot be undone.
                </p>
              </div>

              <div className="flex justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowDeleteModal(false)}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDelete}
                  className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-lg shadow-rose-600/20"
                >
                  Confirm Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
