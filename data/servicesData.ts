export interface SubService {
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

export interface ServiceCategory {
  slug: string;
  title: string;
  breadcrumbTitle?: string;
  shortDescription: string;
  description: string;
  featuredImage: string;
  bgImage: string;
  icon?: string;
  services: SubService[];
  features?: string[];
  benefits?: string[];
  process?: string[];
}

export const initialServicesData: ServiceCategory[] = [
  {
    slug: "renovation-upgrading",
    title: "Renovation & Upgrading",
    shortDescription: "Transform your residential, commercial, or industrial spaces with our custom renovation and space-planning solutions.",
    description: "UA Engineering provides top-tier renovation, interior upgrading, and space optimization solutions in Singapore. From modernizing layout structures to premium custom finishes, we deliver turnkey excellence.",
    featuredImage: "/images/services/sanitary-hero.png",
    bgImage: "/images/layout/services-bg.png",
    services: [
      {
        slug: "home-renovation",
        title: "Home Renovation",
        image: "/images/services/sub_home_reno.png",
        description: "Complete home remodeling, space planning, wall re-configuration, flooring, plastering, painting, and modern interior transformations.",
        longDescription: "Our comprehensive Home Renovation service is designed to transform your existing space into your dream home. We handle everything from the initial space planning and layout drawing to hacking, partitioning, electrical rewiring, plastering, painting, and high-end custom carpentry. Our team of experienced interior engineers ensures that every square foot is optimized for functionality, comfort, and premium modern aesthetics.",
        features: [
          "Space Planning & Layout Design",
          "Wall Hacking & Structural Changes",
          "Premium Vinyl & Tile Flooring",
          "Custom Wardrobes & Carpentry",
          "Integrated False Ceiling & Lighting",
          "Hassle-Free Project Coordination"
        ],
        benefits: [
          "One-stop solution from structural hacking to custom final trim",
          "Compliance with Singapore building safety guidelines (HDB/BCA)",
          "Strict quality control with experienced site supervisors",
          "Clear, transparent cost breakdown without hidden charges"
        ],
        process: [
          "Initial consultation & site measurements",
          "Layout presentation & design rendering",
          "Obtaining necessary HDB/BCA permits",
          "Structural hacking & masonry flooring",
          "Electrical, plumbing & carpentry installation",
          "Final touch-ups, QA inspection & key handover"
        ]
      },
      {
        slug: "kitchen-renovation",
        title: "Kitchen Renovation",
        image: "/images/services/sub_kitchen_reno.png",
        description: "Custom carpentry cabinets, high-durability countertops (quartz, granite, solid surface), sink and tap installation, tile backsplashes.",
        longDescription: "The kitchen is the heart of the home, and our kitchen renovation service focuses on maximizing efficiency, durability, and elegance. We specialize in custom high-pressure laminate cabinetry with soft-close mechanisms, premium heat-resistant countertops (quartz, granite, homogeneous tiles), leak-proof plumbing fixtures, and custom-tiled backsplashes.",
        features: [
          "Custom Kitchen Cabinets & Drawers",
          "High-Grade Countertops (Quartz/Granite)",
          "Sink, Tap & Hood Installation",
          "Backsplash Tiling & Under-Cabinet Lighting",
          "Sanitary Piping & Leak Protection"
        ],
        benefits: [
          "Waterproof and warp-resistant materials selected for tropical humidity",
          "High-durability surfaces that are scratch-resistant and easy to clean",
          "Seamless pipe routing to prevent kitchen sink leaks and odors"
        ],
        process: [
          "On-site kitchen space assessment & layout planning",
          "Material selection (Laminates, Countertops, Tiles)",
          "Old cabinets dismantling & disposal",
          "Plumbing routing & wall plastering",
          "Cabinet installation & countertop fitting"
        ]
      },
      {
        slug: "room-beautification",
        title: "Room Beautification",
        image: "/images/services/sub_room_beautification.png",
        description: "Custom feature walls, built-in wardrobes, custom bedframes, wallpaper installation, and ambient ceiling details.",
        longDescription: "Our Room Beautification service transforms dull bedrooms, study rooms, and living areas into luxurious, functional spaces.",
        features: [
          "Fluted Feature Walls & TV Consoles",
          "Hidden LED Cove Lighting Setup",
          "Custom Built-In Study Desks & Vanities"
        ],
        benefits: [
          "Optimizes small bedroom spaces with clever built-in furniture",
          "Creates a premium, luxurious hotel-like feel in your own home"
        ],
        process: [
          "Consultation to define design themes & color palettes",
          "3D rendering of feature walls and custom carpentry",
          "On-site installation and painting works"
        ]
      }
    ]
  },
  {
    slug: "structural-exterior-works",
    title: "Structural & Exterior Works",
    shortDescription: "Heavy-duty steel works, gates, awnings, and extension solutions engineered for structural safety and durability.",
    description: "Our structural engineering and exterior solutions are built for durability, weather resilience, and architectural compliance.",
    featuredImage: "/images/services/structural.png",
    bgImage: "/images/layout/projects-bg.png",
    services: [
      {
        slug: "steel-work",
        title: "All Kinds of Steel Work",
        image: "/images/services/sub_steel_work.png",
        description: "Heavy structural steel fabrication, structural beam installation, safety reinforcements, metal welding, and custom metal supports.",
        longDescription: "We provide professional metal engineering and heavy structural steel works for residential extensions, commercial buildings, and industrial plants.",
        features: [
          "Structural Steel I-Beam Installation",
          "Mezzanine Floor Steel Framing",
          "Certified Welding & Metal Cutting"
        ],
        benefits: [
          "High load-bearing strength engineered by certified professional engineers",
          "Durable rust-resistant zinc coating"
        ],
        process: [
          "Site survey & load calculation",
          "Steel beam cutting & shop welding",
          "On-site erection & bolt fastening"
        ]
      }
    ]
  },
  {
    slug: "painting-waterproofing",
    title: "Painting & Waterproofing",
    shortDescription: "Certified building painting, roof coating, concrete seepage injection, and waterproofing membranes.",
    description: "Protect your property against moisture, roof leaks, and wall weathering with UA Engineering's professional waterproofing and exterior painting services.",
    featuredImage: "/images/services/painting.png",
    bgImage: "/images/layout/contact-bg.png",
    services: [
      {
        slug: "waterproofing-services",
        title: "Waterproofing Services",
        image: "/images/services/sub_waterproofing.png",
        description: "PU injection grouting, torch-on membrane, RC flat roof waterproofing, toilet leakage repair without hacking.",
        longDescription: "Water leakage can damage building structures rapidly. We use advanced non-destructive PU chemical injection and multi-layer liquid applied membranes.",
        features: [
          "Polyurethane (PU) High-Pressure Grouting",
          "Torch-On Bituminous Membrane Laying",
          "Clear Resin Waterproofing Overlay"
        ],
        benefits: [
          "Stops active water leaks instantly without hacking existing tiles",
          "Prevents mold growth and interior wall paint peeling"
        ],
        process: [
          "Thermal imaging & moisture meter inspection",
          "Surface preparation & crack chasing",
          "Chemical PU injection & seal coat application"
        ]
      }
    ]
  },
  {
    slug: "electrical-plumbing-aircon",
    title: "Electrical, Plumbing & Aircon",
    shortDescription: "Licensed EMA electrical rewiring, pipe installation, DB upgrades, and aircon chemical wash servicing.",
    description: "Turnkey mechanical, electrical, and plumbing (MEP) solutions for residential, commercial, and industrial sites.",
    featuredImage: "/images/services/mep.png",
    bgImage: "/images/layout/breadcrumb-bg.png",
    services: [
      {
        slug: "plumbing-services",
        title: "Plumbing Services",
        image: "/images/services/sub_plumbing.png",
        description: "Pipe leak repair, sanitary installation, water heater setup, copper/PVC pipe replacement, and drain unclogging.",
        longDescription: "Our PUB-licensed plumbers handle all residential and commercial plumbing requirements.",
        features: [
          "Copper & Stainless Steel Pipe Re-piping",
          "Sanitary Ware & Tap Fixture Fitting",
          "High-Pressure Drain Unclogging"
        ],
        benefits: [
          "Quick emergency leak response",
          "Neat pipe routing and leak-tested connections"
        ],
        process: [
          "Leak tracing & pressure testing",
          "Replacing worn pipes & fittings",
          "Testing flow & sealing checks"
        ]
      }
    ]
  },
  {
    slug: "solar-panel-installation",
    title: "Solar Panel Installation",
    shortDescription: "Eco-friendly residential and commercial rooftop solar panel systems to reduce utility bills.",
    description: "Transition to green energy with our certified solar panel installation services.",
    featuredImage: "/images/services/solar.png",
    bgImage: "/images/layout/contact-bg.png",
    services: [
      {
        slug: "solar-panel",
        title: "Solar Panel Installation",
        image: "/images/services/sub_solar.png",
        description: "Complete design, engineering, and installation of rooftop solar PV systems to offset electricity bills.",
        longDescription: "Transitioning to green energy is made simple with our turnkey Solar Panel Installation service.",
        features: [
          "High-Efficiency Tier-1 Monocrystalline Solar Panels",
          "Hybrid & Grid-Tied Inverter Systems"
        ],
        benefits: [
          "Reduces electricity bills by up to 50% to 80% every month"
        ],
        process: [
          "Site survey to analyze shadow casting and roof structural safety",
          "PV layout design & grid connection"
        ]
      }
    ]
  }
];
