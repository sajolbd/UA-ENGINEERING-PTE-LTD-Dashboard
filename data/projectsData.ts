export interface ProjectItem {
  id?: string;
  _id?: string;
  title: string;
  subtitle?: string;
  category: string;
  image: string;
  description: string;
  location: string;
  gallery: string[];
}

export const initialProjectsData: ProjectItem[] = [
  {
    "title": "SHAMIM",
    "category": "Painting & Waterproofing",
    "image": "/images/uploads/image-1786333085591-361452311.png",
    "description": "",
    "location": "Singapore",
    "gallery": [],
    "id": "1786333090036"
  },
  {
    "title": "Latest Roof Coating",
    "category": "Painting & Waterproofing",
    "image": "/images/projects/latest-roof-coating.png",
    "description": "Multi-layered protective coating applied to terracotta roofing tiles to resist tropical weathering, UV rays, and algae growth.",
    "location": "Sembawang, Singapore",
    "gallery": [
      "/images/projects/latest-roof-coating.png",
      "/images/projects/roof-waterproofing.png",
      "/images/services/sub_waterproofing.png",
      "/images/services/sub_painting.png"
    ]
  },
  {
    "title": "External Painting",
    "category": "Painting & Waterproofing",
    "image": "/images/projects/external-painting.png",
    "description": "High-rise external wall painting, crack repair, and facade upgrading using premium weather-shield paint systems.",
    "location": "Orchard Road, Singapore",
    "gallery": [
      "/images/projects/external-painting.png",
      "/images/services/sub_painting.png",
      "/images/projects/latest-roof-coating.png",
      "/images/services/sub_waterproofing.png"
    ]
  },
  {
    "title": "Roof Waterproofing",
    "category": "Painting & Waterproofing",
    "image": "/images/projects/roof-waterproofing.png",
    "description": "Polyurethane liquid membrane waterproofing system applied on a commercial flat concrete rooftop next to AC ledges.",
    "location": "Tuas Industrial Estate, Singapore",
    "gallery": [
      "/images/projects/roof-waterproofing.png",
      "/images/services/sub_waterproofing.png",
      "/images/projects/latest-roof-coating.png",
      "/images/services/sub_painting.png"
    ]
  },
  {
    "title": "Commercial Plumbing Installation",
    "category": "Electrical & Plumbing",
    "image": "/images/home/projects/project-plumbing.png",
    "description": "Design and installation of high-pressure copper water supply pipelines, heavy-duty floor traps, and sanitary fixtures.",
    "location": "Marina Bay, Singapore",
    "gallery": [
      "/images/home/projects/project-plumbing.png",
      "/images/services/sub_plumbing.png",
      "/images/services/mep.png",
      "/images/services/sub_electrical.png"
    ]
  },
  {
    "title": "Industrial Substation Electrical Works",
    "category": "Electrical & Plumbing",
    "image": "/images/home/projects/project-electrical.png",
    "description": "Installation and testing of three-phase distribution boards, industrial conduit wiring, and safety grounding systems.",
    "location": "Changi Business Park, Singapore",
    "gallery": [
      "/images/home/projects/project-electrical.png",
      "/images/services/sub_electrical.png",
      "/images/services/mep.png",
      "/images/services/sub_aircon.png"
    ]
  },
  {
    "title": "Foundation & Structural Waterproofing",
    "category": "Painting & Waterproofing",
    "image": "/images/home/projects/project-waterproofing.png",
    "description": "Sub-structure torch-on bitumen membrane installation for permanent protection against underground water ingress.",
    "location": "Jurong East, Singapore",
    "gallery": [
      "/images/home/projects/project-waterproofing.png",
      "/images/services/sub_waterproofing.png",
      "/images/projects/roof-waterproofing.png",
      "/images/projects/latest-roof-coating.png"
    ]
  },
  {
    "title": "Modern Office Drywall Fit-out",
    "category": "Renovation & Tiling",
    "image": "/images/home/projects/project-drywall.png",
    "description": "Acoustic-rated double-layered gypsum board drywall partitions with galvanized iron framing for an open-plan office.",
    "location": "Raffles Place, Singapore",
    "gallery": [
      "/images/home/projects/project-drywall.png",
      "/images/services/sub_home_reno.png",
      "/images/services/sub_open_plan.png",
      "/images/services/sub_room_beautification.png"
    ]
  },
  {
    "title": "Rooftop Solar Array Grid Integration",
    "category": "Solar Panel",
    "image": "/images/home/projects/project-solar.png",
    "description": "Installation of high-efficiency monocrystalline solar panels with customized aluminium mounting rails and grid-tied inverters.",
    "location": "Ang Mo Kio, Singapore",
    "gallery": [
      "/images/home/projects/project-solar.png",
      "/images/services/sub_solar.png",
      "/images/services/solar.png",
      "/images/home/projects/project-electrical.png"
    ]
  },
  {
    "title": "Luxury Condominium Lobby Tiling",
    "category": "Renovation & Tiling",
    "image": "/images/home/projects/project-tiling.png",
    "description": "Precision laying of large-format premium homogeneous marble-grain tiles with epoxy grout lines in a high-rise lobby.",
    "location": "Sentosa Cove, Singapore",
    "gallery": [
      "/images/home/projects/project-tiling.png",
      "/images/services/sub_floor_reno.png",
      "/images/services/sub_kitchen_reno.png",
      "/images/services/sub_home_reno.png"
    ]
  },
  {
    "title": "Controlled Concrete Demolition",
    "category": "Structural & Steel",
    "image": "/images/home/projects/project-demolition.png",
    "description": "Controlled hacking and demolition of reinforced concrete partition walls with safety barriers and structural support props.",
    "location": "Bedok Mall, Singapore",
    "gallery": [
      "/images/home/projects/project-demolition.png",
      "/images/services/sub_steel_work.png",
      "/images/services/sub_gate_grill.png",
      "/images/services/structural.png"
    ]
  },
  {
    "title": "Suspended Cove Ceiling Grid System",
    "category": "Renovation & Tiling",
    "image": "/images/home/projects/project-ceiling.png",
    "description": "Fabrication of suspended plasterboard false ceilings with integrated indirect LED cove lighting troughs and access panels.",
    "location": "Bukit Timah, Singapore",
    "gallery": [
      "/images/home/projects/project-ceiling.png",
      "/images/services/sub_room_beautification.png",
      "/images/services/sub_home_reno.png",
      "/images/services/sub_open_plan.png"
    ]
  }
];
