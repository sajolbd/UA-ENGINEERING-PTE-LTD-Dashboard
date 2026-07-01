export interface Project {
  id: string;
  title: string;
  category: string;
  status: "Planning" | "In Progress" | "Completed";
  lead: string;
  budget: number;
  progress: number; // 0 to 100
  startDate: string;
  endDate: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  date: string;
  status: "New" | "Contacted" | "Resolved";
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  specialization: string;
  status: "On Site" | "Available" | "On Leave";
  activeProject: string;
  safetyClearance: boolean;
}

export interface ServiceStat {
  category: string;
  projectCount: number;
  revenue: number;
  teamSize: number;
  rating: number;
}

export const initialProjects: Project[] = [
  {
    id: "PROJ-001",
    title: "Commercial Plumbing Installation",
    category: "Plumbing",
    status: "Completed",
    lead: "Alex Chen",
    budget: 85000,
    progress: 100,
    startDate: "2026-01-10",
    endDate: "2026-03-15",
  },
  {
    id: "PROJ-002",
    title: "Industrial Substation Electrical Works",
    category: "Electrical",
    status: "In Progress",
    lead: "Sanjay Kumar",
    budget: 240000,
    progress: 68,
    startDate: "2026-02-01",
    endDate: "2026-08-30",
  },
  {
    id: "PROJ-003",
    title: "Foundation & Structural Waterproofing",
    category: "Waterproofing",
    status: "In Progress",
    lead: "Marcus Wong",
    budget: 125000,
    progress: 45,
    startDate: "2026-04-15",
    endDate: "2026-07-20",
  },
  {
    id: "PROJ-004",
    title: "Modern Office Drywall Fit-out",
    category: "Drywall Partition",
    status: "Completed",
    lead: "Lee Wei",
    budget: 65000,
    progress: 100,
    startDate: "2026-03-01",
    endDate: "2026-05-10",
  },
  {
    id: "PROJ-005",
    title: "Rooftop Solar Array Grid Integration",
    category: "Solar Installation",
    status: "In Progress",
    lead: "David Tan",
    budget: 180000,
    progress: 82,
    startDate: "2026-03-15",
    endDate: "2026-07-15",
  },
  {
    id: "PROJ-006",
    title: "Luxury Condominium Lobby Tiling",
    category: "Tiling Installation",
    status: "Planning",
    lead: "Lim Boon",
    budget: 95000,
    progress: 15,
    startDate: "2026-07-10",
    endDate: "2026-09-30",
  },
  {
    id: "PROJ-007",
    title: "Controlled Concrete Demolition",
    category: "Hacking & Demolition",
    status: "Completed",
    lead: "Rahmat Shah",
    budget: 45000,
    progress: 100,
    startDate: "2026-05-01",
    endDate: "2026-06-15",
  },
  {
    id: "PROJ-008",
    title: "Suspended Cove Ceiling Grid System",
    category: "False Ceiling",
    status: "In Progress",
    lead: "Kenji Sato",
    budget: 78000,
    progress: 30,
    startDate: "2026-06-01",
    endDate: "2026-08-15",
  },
];

export const initialInquiries: Inquiry[] = [
  {
    id: "INQ-001",
    name: "Thomas Lim",
    email: "t.lim@capitaland.com",
    phone: "+65 9123 4567",
    service: "Electrical",
    message: "Requesting quotation for substation maintenance works at our Changi business park building.",
    date: "2026-06-28",
    status: "New",
  },
  {
    id: "INQ-002",
    name: "Sarah Jenkins",
    email: "sarah.j@citydev.sg",
    phone: "+65 8234 5678",
    service: "Waterproofing",
    message: "Need inspection for concrete basement water seepage. Multiple damp spots observed.",
    date: "2026-06-29",
    status: "Contacted",
  },
  {
    id: "INQ-003",
    name: "Tan Min-Li",
    email: "minli.tan@residences.sg",
    phone: "+65 9345 6789",
    service: "Plumbing",
    message: "Urgent commercial piping layout modification needed for a F&B space renovation in Orchard.",
    date: "2026-06-30",
    status: "New",
  },
  {
    id: "INQ-004",
    name: "Vikram Nair",
    email: "vikram@ascendas.com.sg",
    phone: "+65 8456 7890",
    service: "Solar Installation",
    message: "Feasibility study for commercial solar roof panels installation for warehouse cluster.",
    date: "2026-06-25",
    status: "Resolved",
  },
  {
    id: "INQ-005",
    name: "Michael Chang",
    email: "m.chang@builders.sg",
    phone: "+65 9567 8901",
    service: "Hacking & Demolition",
    message: "Controlled hacking needed for concrete pillars in commercial retrofit project.",
    date: "2026-06-27",
    status: "Contacted",
  },
];

export const initialTeam: TeamMember[] = [
  {
    id: "TEAM-001",
    name: "Alex Chen",
    role: "Project Manager",
    specialization: "Plumbing & Piping",
    status: "On Site",
    activeProject: "Commercial Plumbing Installation",
    safetyClearance: true,
  },
  {
    id: "TEAM-002",
    name: "Sanjay Kumar",
    role: "Site Engineer",
    specialization: "High Voltage Electrical Systems",
    status: "On Site",
    activeProject: "Industrial Substation Electrical Works",
    safetyClearance: true,
  },
  {
    id: "TEAM-003",
    name: "Marcus Wong",
    role: "Site Engineer",
    specialization: "Concrete Structural Remediation",
    status: "On Site",
    activeProject: "Foundation & Structural Waterproofing",
    safetyClearance: true,
  },
  {
    id: "TEAM-004",
    name: "Lee Wei",
    role: "Project Manager",
    specialization: "Interior Fit-outs & Partitions",
    status: "Available",
    activeProject: "None",
    safetyClearance: true,
  },
  {
    id: "TEAM-005",
    name: "David Tan",
    role: "Site Engineer",
    specialization: "Solar Grid Interconnection",
    status: "On Site",
    activeProject: "Rooftop Solar Array Grid Integration",
    safetyClearance: true,
  },
  {
    id: "TEAM-006",
    name: "Lim Boon",
    role: "Senior Technician",
    specialization: "Tiling & Stonework",
    status: "Available",
    activeProject: "Luxury Condominium Lobby Tiling",
    safetyClearance: true,
  },
  {
    id: "TEAM-007",
    name: "Rahmat Shah",
    role: "Senior Technician",
    specialization: "Controlled Hacking & Heavy Equipment",
    status: "Available",
    activeProject: "None",
    safetyClearance: true,
  },
  {
    id: "TEAM-008",
    name: "Kenji Sato",
    role: "Site Engineer",
    specialization: "Acoustic Ceilings & Lighting Integration",
    status: "On Site",
    activeProject: "Suspended Cove Ceiling Grid System",
    safetyClearance: true,
  },
  {
    id: "TEAM-009",
    name: "Ahmad Bin-Osman",
    role: "Safety Inspector",
    specialization: "EHS Audit & Incident Management",
    status: "On Site",
    activeProject: "Multiple Sites",
    safetyClearance: true,
  },
];

export const initialServiceStats: ServiceStat[] = [
  {
    category: "Electrical",
    projectCount: 4,
    revenue: 480000,
    teamSize: 12,
    rating: 4.8,
  },
  {
    category: "Solar Installation",
    projectCount: 2,
    revenue: 310000,
    teamSize: 8,
    rating: 4.9,
  },
  {
    category: "Waterproofing",
    projectCount: 3,
    revenue: 250000,
    teamSize: 6,
    rating: 4.7,
  },
  {
    category: "Plumbing",
    projectCount: 5,
    revenue: 195000,
    teamSize: 5,
    rating: 4.6,
  },
  {
    category: "Tiling Installation",
    projectCount: 2,
    revenue: 145000,
    teamSize: 4,
    rating: 4.5,
  },
  {
    category: "Drywall Partition",
    projectCount: 3,
    revenue: 130000,
    teamSize: 5,
    rating: 4.7,
  },
  {
    category: "False Ceiling",
    projectCount: 2,
    revenue: 110000,
    teamSize: 3,
    rating: 4.8,
  },
  {
    category: "Hacking & Demolition",
    projectCount: 4,
    revenue: 95000,
    teamSize: 6,
    rating: 4.4,
  },
];
