export interface ProcessStep {
  title: string;
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface SubService {
  id?: string;
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  features?: string[];
  benefits?: string[];
  process?: string[];
  processSteps?: ProcessStep[];
  breadcrumbTitle?: string;
  breadcrumbBg?: string;
}

export interface ServiceCategory {
  id?: string;
  slug: string;
  title: string;
  tagline?: string;
  breadcrumbTitle?: string;
  detailTitle?: string;
  subServicesTitle?: string;
  subServicesSubheading?: string;
  shortDescription?: string;
  description: string;
  heroImage?: string;
  cardImage?: string;
  featuredImage?: string;
  bgImage?: string;
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

export const servicesData: ServiceCategory[] = [
  {
    "slug": "renovation-upgrading",
    "title": "Renovation & Upgrading",
    "breadcrumbTitle": "Renovation & Upgrading Solutions",
    "detailTitle": "Professional Renovation & Property Upgrading in Singapore",
    "subServicesTitle": "Our Renovation & Upgrading Services",
    "subServicesSubheading": "Customised residential and commercial renovation solutions crafted for modern living, high durability, and superior quality finish.",
    "shortDescription": "Transform homes, offices, and commercial spaces with tailored renovations, interior upgrades, quality finishes, and expert project execution.",
    "description": "We help homeowners and property owners achieve beautiful, practical spaces through professional renovation solutions built on trust, precision, and proven expertise.",
    "featuredImage": "/images/services/renovation.png",
    "bgImage": "/images/layout/breadcrumb-bg.png",
    "targetBadge": "PROJECT COVERAGE",
    "targetHeading": "Properties & Spaces We Renovate",
    "targetSubheading": "From HDB flats to commercial offices, our experienced project team handles all renovation works with precision.",
    "targetSpaces": [
      "HDB 3-Room, 4-Room, 5-Room & Executive Apartments",
      "BTO Flats & Resale HDB Units",
      "Condominium Apartments & Penthouses",
      "Landed Houses & Bungalows",
      "Commercial Offices & Retail Stores",
      "Industrial Premises & Warehouses"
    ],
    "whyChooseBadge": "UA ADVANTAGE",
    "whyChooseHeading": "Why Choose UA Engineering For Renovation?",
    "whyChooseLeftTitle": "Challenges Property Owners Face",
    "whyChooseRightTitle": "The UA Engineering Solution",
    "whyChooseAdvantages": [
      {
        "title": "Single-Point Project Management",
        "description": "One dedicated project manager coordinates all demolition, masonry, carpentry, plumbing, and electrical works efficiently."
      },
      {
        "title": "BCA & HDB Compliance Guaranteed",
        "description": "All hacking, structural alterations, and installations adhere strictly to Singapore renovation guidelines and safety standards."
      },
      {
        "title": "Transparent Itemised Pricing",
        "description": "No hidden charges or unexpected variation orders. Clear pricing provided upfront with itemised bill of quantities."
      },
      {
        "title": "Quality Workmanship & After-Sales Support",
        "description": "Premium grade materials, skilled certified tradesmen, and reliable after-sales support for complete peace of mind."
      }
    ],
    "whyChooseChallenges": [
      {
        "title": "Managing Multiple Independent Contractors",
        "description": "Dealing with separate hacking, tiling, and carpentry contractors leads to miscommunication and project delays."
      },
      {
        "title": "Unclear Quotations & Hidden Costs",
        "description": "Low upfront estimates that suddenly surge due to unlisted mandatory installation and disposal fees."
      },
      {
        "title": "Substandard Materials & Rushed Workmanship",
        "description": "Use of poor quality timber, tiles, or adhesives causing early cracks, warping, and water leaks."
      },
      {
        "title": "Non-Compliant Hacking Works",
        "description": "Unauthorised hacking of load-bearing walls leading to structural risks and municipal penalties."
      }
    ],
    "features": [
      "Full Interior & Exterior Renovation Planning",
      "HDB & Condominium Compliant Demolition & Hacking",
      "Custom Cabinetry & Custom Carpentry Design",
      "Floor Tiling, Vinyl Flooring & Marble Polishing",
      "Ceiling Board & Partition Wall Installation",
      "Complete Electrical Rewiring & Lighting Setup"
    ],
    "benefits": [
      "Comprehensive end-to-end renovation managed by single experienced contractor.",
      "Strict compliance with HDB, BCA, and condo management guidelines.",
      "High quality materials for long-lasting aesthetic and structural durability.",
      "Clear upfront quotation with detailed breakdown and fixed delivery timeline."
    ],
    "processHeading": "Our Renovation Project Workflow",
    "processText": "From initial design layout to final handover, we follow a systematic process to deliver exceptional renovation results on schedule.",
    "processSteps": [
      {
        "title": "Consultation & Layout Planning",
        "description": "We discuss your vision, space requirements, budget, and draft initial floor plan layouts."
      },
      {
        "title": "Detailed Quotation & Permits",
        "description": "Transparent quotation breakdown and submission of required HDB / BCA permits."
      },
      {
        "title": "Demolition & Masonry Works",
        "description": "Careful hacking, wall erection, wet works, and floor tile installation under strict supervision."
      },
      {
        "title": "M&E Works & Carpentry Fabrication",
        "description": "Electrical rewiring, plumbing pipe installation, and custom carpentry fabrication."
      },
      {
        "title": "Finishing & Quality Inspection",
        "description": "Painting, light fitting installation, deep site cleaning, and comprehensive final QA walkthrough."
      }
    ],
    "serviceAreasBadge": "COVERAGE",
    "serviceAreasHeading": "Serving All Regions Across Singapore",
    "serviceAreasSubheading": "Our teams deploy islandwide across North, South, East, West, and Central Singapore.",
    "faqs": [
      {
        "question": "How long does a typical HDB home renovation take?",
        "answer": "A complete HDB home renovation typically takes between 4 to 8 weeks depending on the scope of hacking, tiling, and custom carpentry required."
      },
      {
        "question": "Do you assist with obtaining HDB and condo renovation permits?",
        "answer": "Yes, UA Engineering handles all necessary permit applications and submissions to HDB, BCA, and condo management prior to commencing works."
      },
      {
        "question": "Are your quotations fixed with no hidden fees?",
        "answer": "All our quotations are itemised with transparent pricing. Any changes requested during the project are agreed upon in writing before execution."
      }
    ],
    "services": [
      {
        "slug": "home-renovation",
        "title": "Home Renovation",
        "image": "/images/services/sub_home_reno.png",
        "breadcrumbBg": "/images/layout/breadcrumb-bg.png",
        "description": "Transform your HDB, condo, or landed property with customised home renovation solutions designed for modern living, comfort, functionality, and long-term value.",
        "longDescription": "Create a home that reflects your lifestyle with UA Engineering's professional Home Renovation Services in Singapore. We specialise in renovating HDB flats, condominiums, and landed homes by improving layouts, maximising usable space, and upgrading interiors for better comfort and functionality. Whether you're renovating an ageing property or preparing a newly purchased home, our experienced team delivers practical renovation solutions with quality workmanship, efficient project coordination, and compliance with Singapore renovation guidelines.",
        "features": [
          "Complete Home Renovation Planning",
          "Space Reconfiguration",
          "Wall Hacking & Masonry Works",
          "Room Reconfiguration",
          "Demolition Works",
          "Built-in Carpentry Installation"
        ],
        "benefits": [
          "Complete renovation solutions managed under one experienced project team.",
          "Quality workmanship using durable materials and proven installation methods.",
          "Transparent project planning with clear timelines and regular progress updates.",
          "Professional renovations completed in accordance with Singapore renovation requirements."
        ],
        "process": [
          "Consultation: Discuss renovation goals, budget, and project requirements.",
          "Site Survey: Measure the property and assess existing conditions.",
          "Planning: Prepare layouts, material selections, and project schedule.",
          "Renovation Works: Carry out demolition, installation, and finishing works.",
          "Quality Inspection: Inspect workmanship and complete all necessary touch-ups."
        ],
        "processSteps": [
          {
            "title": "Consultation",
            "description": "Discuss renovation goals, budget, and project requirements."
          },
          {
            "title": "Site Survey",
            "description": "Measure the property and assess existing conditions."
          },
          {
            "title": "Planning",
            "description": "Prepare layouts, material selections, and project schedule."
          },
          {
            "title": "Renovation Works",
            "description": "Carry out demolition, installation, and finishing works."
          },
          {
            "title": "Quality Inspection",
            "description": "Inspect workmanship and complete all necessary touch-ups."
          }
        ]
      },
      {
        "slug": "kitchen-renovation",
        "title": "Kitchen Renovation",
        "image": "/images/services/sub_kitchen_reno.png",
        "breadcrumbBg": "/images/layout/breadcrumb-bg.png",
        "description": "Upgrade your kitchen with smart layouts, durable cabinetry, and stylish finishes that maximise functionality and aesthetics.",
        "longDescription": "Transform your cooking space into a highly functional and modern kitchen. We provide custom kitchen cabinets, countertop installation, wall tiling, plumbing point relocations, and appliances integration tailored to your everyday culinary needs.",
        "features": [
          "Custom Kitchen Cabinets & Islands",
          "Quartz & Granite Countertop Fitting",
          "Kitchen Sink & Plumbing Relocation",
          "Backsplash Tiling & Waterproofing",
          "Appliance Integration & Wiring"
        ],
        "benefits": [
          "Ergonomic kitchen layout for smooth workflow and cooking comfort.",
          "Water-resistant and heat-durable countertop and cabinet materials.",
          "Enhanced storage solutions with soft-close hardware and pull-out drawers."
        ],
        "process": [
          "Initial Assessment: Inspect existing kitchen space and plumbing points.",
          "Design & Material Selection: Choose cabinet laminates and countertop stone.",
          "Fabrication & Installation: Precision installation of cabinets and countertops."
        ],
        "processSteps": [
          {
            "title": "Initial Assessment",
            "description": "Inspect existing kitchen space and plumbing points."
          },
          {
            "title": "Design & Selection",
            "description": "Choose cabinet laminates and countertop stone."
          },
          {
            "title": "Installation",
            "description": "Precision installation of cabinets and countertops."
          }
        ]
      },
      {
        "slug": "room-beautification",
        "title": "Room Beautification",
        "image": "/images/services/sub_room_beautification.png",
        "breadcrumbBg": "/images/layout/breadcrumb-bg.png",
        "description": "Refresh bedrooms, living rooms, and study spaces with elegant interior upgrades that create a welcoming atmosphere.",
        "longDescription": "Enhance the aesthetic appeal of individual rooms with custom wall paneling, ambient cove lighting, built-in wardrobes, feature walls, and fresh interior paint.",
        "features": [
          "Feature Wall & Fluted Panel Installation",
          "False Ceiling & Ambient Cove Lighting",
          "Built-in Wardrobes & Display Units",
          "Premium Interior Wall Painting"
        ],
        "benefits": [
          "Modern visual transformation without full structural hacking.",
          "Maximised vertical storage with custom-fitted wardrobe designs.",
          "Improved lighting ambiance tailored for relaxation or productivity."
        ],
        "process": [
          "Concept Discussion: Select feature wall designs and color schemes.",
          "On-site Fitting: Precise assembly of wall panels and lighting fixtures."
        ],
        "processSteps": [
          {
            "title": "Concept Discussion",
            "description": "Select feature wall designs and color schemes."
          },
          {
            "title": "On-site Fitting",
            "description": "Precise assembly of wall panels and lighting fixtures."
          }
        ]
      },
      {
        "slug": "create-open-plan-spaces",
        "title": "Create Open Plan Spaces (C&R Works)",
        "image": "/images/services/sub_open_plan.png",
        "breadcrumbBg": "/images/layout/breadcrumb-bg.png",
        "description": "Create spacious and modern open-plan living areas with professional C&R works, ensuring safe wall removal and structural integrity.",
        "longDescription": "Maximise light and natural airflow by merging living and dining areas. We manage non-structural wall hacking, beam reinforcement checks, and floor seamlessly matching.",
        "features": [
          "Non-Load Bearing Wall Demolition",
          "Structural PE Endorsement & Permits",
          "Seamless Floor Tile Patching",
          "Ceiling & Lighting Extension"
        ],
        "benefits": [
          "Spacious and airy interior layout ideal for modern entertaining.",
          "Increased natural daylight throughout the home.",
          "Engineered structural safety compliance."
        ],
        "process": [
          "Structural Verification: Ensure wall removal is safe and permitted.",
          "Controlled Demolition: Dust-controlled hacking and debris removal."
        ],
        "processSteps": [
          {
            "title": "Structural Verification",
            "description": "Ensure wall removal is safe and permitted."
          },
          {
            "title": "Controlled Demolition",
            "description": "Dust-controlled hacking and debris removal."
          }
        ]
      },
      {
        "slug": "floor-renovation-polishing",
        "title": "Floor Renovation & Polishing",
        "image": "/images/services/sub_floor_reno.png",
        "breadcrumbBg": "/images/layout/breadcrumb-bg.png",
        "description": "Restore and upgrade your flooring with high-quality renovation and polishing services that extend life and enhance appearance.",
        "longDescription": "Renew worn-out floors with professional marble polishing, parquet sanding, vinyl overlay installation, and ceramic tile replacement for pristine finishes.",
        "features": [
          "Marble & Natural Stone Diamond Polishing",
          "Parquet Wood Sanding & Varnishing",
          "Heavy-Duty SPC Vinyl Floor Overlay",
          "Tile Grout Restoration & Sealing"
        ],
        "benefits": [
          "Restores original luster and shine to aged stone and timber floors.",
          "Cost-effective overlay solutions with zero hacking required.",
          "Slip-resistant and scratch-durable protective sealants."
        ],
        "process": [
          "Surface Preparation: Deep cleaning and levelling of sub-floor.",
          "Grinding & Polishing: Multi-stage diamond pad grinding and sealing."
        ],
        "processSteps": [
          {
            "title": "Surface Preparation",
            "description": "Deep cleaning and levelling of sub-floor."
          },
          {
            "title": "Grinding & Polishing",
            "description": "Multi-stage diamond pad grinding and sealing."
          }
        ]
      },
      {
        "slug": "decking-work",
        "title": "Decking Work",
        "image": "/images/services/sub_decking.png",
        "breadcrumbBg": "/images/layout/breadcrumb-bg.png",
        "description": "Enhance balconies, patios, and outdoor spaces with durable decking solutions that combine aesthetics with weather resistance.",
        "longDescription": "Extend your living space outwards with weather-resistant Composite Wood (WPC) or Chengal timber decking for balconies, roof terraces, and garden patios.",
        "features": [
          "WPC Composite Eco Decking Installation",
          "Natural Chengal & Teak Wood Decking",
          "Sub-Frame Aluminum Framing Support",
          "Outdoor Timber Varnishing & Maintenance"
        ],
        "benefits": [
          "UV and water-resistant materials engineered for tropical climates.",
          "Splinter-free and comfortable underfoot surface.",
          "Low maintenance outdoor flooring solution."
        ],
        "process": [
          "Framework Setup: Install anti-rust aluminum sub-frame structure.",
          "Deck Board Fitting: Concealed clip fastening for smooth finish."
        ],
        "processSteps": [
          {
            "title": "Framework Setup",
            "description": "Install anti-rust aluminum sub-frame structure."
          },
          {
            "title": "Deck Board Fitting",
            "description": "Concealed clip fastening for smooth finish."
          }
        ]
      }
    ]
  },
  {
    "slug": "structural-exterior-works",
    "title": "Structural & Exterior Works",
    "breadcrumbTitle": "Structural & Exterior Engineering",
    "detailTitle": "Heavy-Duty Structural Steel & Exterior Works Singapore",
    "subServicesTitle": "Our Structural & Exterior Services",
    "subServicesSubheading": "Custom steel fabrication, roof extensions, gates, grills, and structural additions built for extreme strength and longevity.",
    "shortDescription": "Strengthen and protect your property with structural repairs, roofing, steel works, gate, grill, masonry, and durable exterior solutions.",
    "description": "UA Engineering designs, fabricates, and installs structural steel, metalwork, gates, railings, roof extensions, and exterior structures engineered for maximum durability and compliance.",
    "featuredImage": "/images/services/structural.png",
    "bgImage": "/images/layout/breadcrumb-bg.png",
    "targetBadge": "APPLICATIONS",
    "targetHeading": "Structural Engineering Applications",
    "targetSubheading": "We handle custom structural steel fabrication and exterior building works for all sectors.",
    "targetSpaces": [
      "Commercial Buildings & Industrial Factories",
      "Landed Residential Roof & Balcony Extensions",
      "Warehouse Platforms & Mezzanine Floors",
      "Exterior Gate & Security Perimeter Grills",
      "Staircases, Catwalks & Fire Escapes"
    ],
    "whyChooseBadge": "STRUCTURAL EXPERTISE",
    "whyChooseHeading": "Why UA Engineering For Structural Works?",
    "whyChooseLeftTitle": "Structural Concerns",
    "whyChooseRightTitle": "Our Engineering Guarantee",
    "whyChooseAdvantages": [
      {
        "title": "PE Certified Structural Calculations",
        "description": "All structural designs endorsed by Professional Engineers (PE) ensuring structural safety."
      },
      {
        "title": "Precision Metal Welding & Anti-Rust Coating",
        "description": "Hot-dip galvanised steel and high-grade primers preventing rust and corrosion."
      },
      {
        "title": "Custom In-House Fabrication",
        "description": "Fabricated to exact dimensions with minimal disruption during on-site installation."
      }
    ],
    "whyChooseChallenges": [
      {
        "title": "Uncertified Welding & Poor Steel Quality",
        "description": "Substandard structural joints vulnerable to stress fractures and collapse."
      },
      {
        "title": "Premature Rusting & Paint Peeling",
        "description": "Inadequate surface preparation causing steel oxidation within months."
      }
    ],
    "features": [
      "Custom Structural Steel Fabrication",
      "Mezzanine Floor & Platform Construction",
      "Main Entrance Gate & Stainless Steel Grills",
      "Roof Extension & Canopy Metal Framework",
      "Awning Shelter Fabrication & Fitting"
    ],
    "benefits": [
      "Certified structural integrity compliant with BCA standards.",
      "Weather-proof anti-corrosion treatment for outdoor installations.",
      "Custom designed to complement building architecture."
    ],
    "processHeading": "Our Structural Fabrication Process",
    "processText": "From PE design approval to factory fabrication and on-site crane hoisting.",
    "processSteps": [
      {
        "title": "PE Calculation & Design",
        "description": "Engineer load-bearing calculations and technical shop drawings."
      },
      {
        "title": "Factory Fabrication",
        "description": "Precision cutting, welding, and anti-rust galvanising."
      },
      {
        "title": "Site Erection",
        "description": "Safe on-site installation, anchoring, and final bolt torque checks."
      }
    ],
    "serviceAreasBadge": "SINGAPORE WIDE",
    "serviceAreasHeading": "Exterior & Steel Works Islandwide",
    "serviceAreasSubheading": "Deploying certified welders and installation rigs across Singapore.",
    "faqs": [
      {
        "question": "Do structural steel modifications require PE endorsement?",
        "answer": "Yes, major structural works such as mezzanine floors and structural beam replacements require PE calculations and BCA permits."
      },
      {
        "question": "Are your steel structures anti-rust treated?",
        "answer": "Yes, all exterior steel structures undergo hot-dip galvanising or zinc-rich anti-corrosion primer coating before final painting."
      }
    ],
    "services": [
      {
        "slug": "all-kinds-of-steel-work",
        "title": "All Kinds of Steel Work",
        "image": "/images/services/sub_steel_work.png",
        "breadcrumbBg": "/images/layout/breadcrumb-bg.png",
        "description": "Expert steel fabrication and installation services for residential, commercial, and industrial properties across Singapore.",
        "longDescription": "We specialize in custom structural steel fabrication, mezzanine platforms, steel staircases, support beams, and industrial metal frameworks engineered to high load-bearing standards.",
        "features": [
          "Structural I-Beam & H-Beam Fabrication",
          "Mezzanine Floor Steel Platforms",
          "Industrial Steel Staircases & Handrails",
          "Hot-Dip Galvanised Anti-Rust Coating"
        ],
        "benefits": [
          "Maximum load-bearing strength verified by PE calculations.",
          "Long-term resistance against rust, moisture, and heavy usage.",
          "Tailored fabrication matching exact site dimensions."
        ],
        "process": [
          "Technical Site Measurement: Precise laser site survey and load assessment.",
          "Off-site Fabrication: Cutting, welding, and galvanising in workshop.",
          "On-site Installation: Crane hoisting and secure bolt anchoring."
        ],
        "processSteps": [
          {
            "title": "Technical Measurement",
            "description": "Laser site survey and load assessment."
          },
          {
            "title": "Off-site Fabrication",
            "description": "Cutting, welding, and galvanising in workshop."
          },
          {
            "title": "On-site Installation",
            "description": "Crane hoisting and secure bolt anchoring."
          }
        ]
      },
      {
        "slug": "main-gate-grill-work",
        "title": "Main Gate & Grill Work",
        "image": "/images/services/sub_gate_grill.png",
        "breadcrumbBg": "/images/layout/breadcrumb-bg.png",
        "description": "Custom gates and grills combining security, durability, and modern design for homes, landed properties, and commercial buildings.",
        "longDescription": "Upgrade property entrance security with custom wrought iron, mild steel, or aluminum main gates, window grills, and security perimeter fencing.",
        "features": [
          "Mild Steel & Wrought Iron Main Gates",
          "Laser-Cut Decorative Metal Panels",
          "Window Security Grills & Sliding Gates",
          "Powder-Coated Weather Resistant Finishes"
        ],
        "benefits": [
          "Enhanced security against intrusion with robust locking mechanisms.",
          "Rust-resistant powder coated finish requiring minimal maintenance.",
          "Custom laser-cut aesthetic patterns to elevate facade look."
        ],
        "process": [
          "Design Selection: Choose gate patterns, colors, and lock fittings.",
          "Installation: Secure hinge mounting and lock alignment."
        ],
        "processSteps": [
          {
            "title": "Design Selection",
            "description": "Choose gate patterns, colors, and lock fittings."
          },
          {
            "title": "Installation",
            "description": "Secure hinge mounting and lock alignment."
          }
        ]
      },
      {
        "slug": "balcony-shelter-work",
        "title": "Balcony Shelter Work",
        "image": "/images/services/sub_balcony_shelter.png",
        "breadcrumbBg": "/images/layout/breadcrumb-bg.png",
        "description": "Professionally installed balcony shelters that provide reliable weather protection while enhancing your outdoor living area.",
        "longDescription": "Protect your balcony from heavy rain and intense tropical heat with custom glass, polycarbonate, or aluminum composite balcony roofing structures.",
        "features": [
          "Laminated Tempered Glass Canopy Shelters",
          "UV-Blocking Polycarbonate Roofing Sheets",
          "Aluminum Alloy Structural Support Frame",
          "Integrated Rainwater Gutter System"
        ],
        "benefits": [
          "Keeps outdoor balcony usable during wet and sunny weather.",
          "High UV reflection reducing indoor room heat transfer.",
          "Clean modern architectural appearance."
        ],
        "process": [
          "Site Measurement: Measure balcony span and drainage points.",
          "Structure Fitting: Anchor aluminum frame and seal glass panels."
        ],
        "processSteps": [
          {
            "title": "Site Measurement",
            "description": "Measure balcony span and drainage points."
          },
          {
            "title": "Structure Fitting",
            "description": "Anchor aluminum frame and seal glass panels."
          }
        ]
      },
      {
        "slug": "roof-extension-solutions",
        "title": "Roof Extension & Solutions",
        "image": "/images/services/sub_roof_extension.png",
        "breadcrumbBg": "/images/layout/breadcrumb-bg.png",
        "description": "Custom roof extensions designed to maximize usable sheltered space for landed homes, walkways, and commercial facilities.",
        "longDescription": "Extend existing rooflines seamlessly with metal roofing sheets, tile matching, rainwater gutters, and insulated roof extension panels.",
        "features": [
          "Metal Deck & Insulated Roof Extension",
          "Roof Structural Beam Extension",
          "Gutters & Downpipe Drainage Routing",
          "Flashing & Waterproof Joint Sealing"
        ],
        "benefits": [
          "Expands usable covered area for cars, gardens, or storage.",
          "Prevents rainwater leakage at roof extension joints.",
          "Durable heat-insulated metal roof paneling."
        ],
        "process": [
          "Structural Framing: Extend metal rafters and purlins.",
          "Roof Sheet Laying: Install insulated roofing and flashing."
        ],
        "processSteps": [
          {
            "title": "Structural Framing",
            "description": "Extend metal rafters and purlins."
          },
          {
            "title": "Roof Sheet Laying",
            "description": "Install insulated roofing and flashing."
          }
        ]
      },
      {
        "slug": "awning-shelter-fabrication-installation",
        "title": "Awning Shelter Fabrication & Installation",
        "image": "/images/services/sub_awning.png",
        "breadcrumbBg": "/images/layout/breadcrumb-bg.png",
        "description": "High-quality awning shelters expertly fabricated and installed to shield windows, entrances, and outdoor areas from sun and rain.",
        "longDescription": "Shield shopfronts, patio entrances, and windows with fixed acrylic awnings, retractable canvas shelters, and aluminum metal louvers.",
        "features": [
          "Fixed Aluminum & Polycarbonate Awnings",
          "Motorised & Manual Retractable Canvas Awnings",
          "Window & Door Entrance Rain Canopy",
          "Heavy-Duty Outdoor Fabric Selections"
        ],
        "benefits": [
          "Instant shade protection reducing direct sunlight glare.",
          "Retractable options allow flexibile outdoor open space.",
          "Durable rust-proof aluminum mounting brackets."
        ],
        "process": [
          "Bracket Mounting: Anchor heavy duty brackets into concrete beam.",
          "Awning Mounting: Fit canvas or poly canopy and test mechanism."
        ],
        "processSteps": [
          {
            "title": "Bracket Mounting",
            "description": "Anchor heavy duty brackets into concrete beam."
          },
          {
            "title": "Awning Mounting",
            "description": "Fit canvas or poly canopy and test mechanism."
          }
        ]
      }
    ]
  },
  {
    "slug": "painting-waterproofing",
    "title": "Painting & Waterproofing",
    "breadcrumbTitle": "Painting & Waterproofing Experts",
    "detailTitle": "Interior & Exterior Painting and Leak Waterproofing Singapore",
    "subServicesTitle": "Our Painting & Waterproofing Services",
    "subServicesSubheading": "Long-lasting surface protection, crack repairs, anti-mold coatings, and advanced membrane waterproofing.",
    "shortDescription": "Enhance your property's interior and exterior appearance through premium painting, waterproofing, crack repairs, and protective sealants.",
    "description": "UA Engineering offers professional interior and exterior painting services alongside specialized waterproofing solutions for roofs, balconies, bathrooms, and basements.",
    "featuredImage": "/images/services/painting.png",
    "bgImage": "/images/layout/breadcrumb-bg.png",
    "targetBadge": "PROTECTION",
    "targetHeading": "Waterproofing & Paint Applications",
    "targetSubheading": "We resolve water seepage and refresh wall appearances across all building types.",
    "targetSpaces": [
      "HDB & Condo Bathroom Water Seepage Repair",
      "RC Flat Roof & Metal Roof Waterproofing",
      "External Wall Painting & Crack Sealing",
      "Interior Wall Anti-Mold Paint Coating",
      "Basement & Swimming Pool Membrane Lining"
    ],
    "whyChooseBadge": "LEAK FREE GUARANTEE",
    "whyChooseHeading": "Why Choose Our Waterproofing & Painting?",
    "whyChooseLeftTitle": "Common Moisture Problems",
    "whyChooseRightTitle": "Our Protective Coating System",
    "whyChooseAdvantages": [
      {
        "title": "PU Injection & Membrane Technology",
        "description": "High-pressure Polyurethane (PU) grouting to seal active water leaks without damaging tiles."
      },
      {
        "title": "Weather-Resistant Anti-Algae Paints",
        "description": "Premium exterior paints that resist peeling, fading, and algae growth under tropical sun."
      }
    ],
    "whyChooseChallenges": [
      {
        "title": "Recurring Water Seepage & Ceiling Stains",
        "description": "Temporary surface patching that fails during heavy monsoon downpours."
      },
      {
        "title": "Peeling & Flaking Paint",
        "description": "Using cheap interior paints on damp walls causing unsightly bubbling."
      }
    ],
    "features": [
      "Interior Wall & Ceiling Painting",
      "Exterior Building Facade Painting",
      "PU Injection Leak Waterproofing",
      "Torch-On & Liquid Waterproofing Membrane",
      "Anti-Mold & Anti-Fungal Protective Coating"
    ],
    "benefits": [
      "Stops water leakage at the root source.",
      "Extends building facade lifespan with weather-proof coatings.",
      "Improves indoor air quality by eliminating mold and damp odors."
    ],
    "processHeading": "Waterproofing & Painting Workflow",
    "processText": "Thorough surface preparation, moisture testing, primer coat, and multi-layer protective topcoats.",
    "processSteps": [
      {
        "title": "Moisture Inspection",
        "description": "Thermal imaging and moisture meter detection of leak source."
      },
      {
        "title": "Surface Preparation",
        "description": "High-pressure washing, scraping, and crack filling."
      },
      {
        "title": "Coating Application",
        "description": "Application of waterproof membrane or multi-coat painting system."
      }
    ],
    "serviceAreasBadge": "ISLANDWIDE",
    "serviceAreasHeading": "Waterproofing Services Across Singapore",
    "serviceAreasSubheading": "Rapid response teams for urgent water leak inspection and repairs.",
    "faqs": [
      {
        "question": "Can bathroom leaks be fixed without hacking tiles?",
        "answer": "Yes, we utilize non-destructive PU injection chemical grouting to seal internal concrete voids and stop leaks from below."
      },
      {
        "question": "How long does external facade paint last?",
        "answer": "Our premium exterior paint systems come with weather-shield technology lasting 5 to 10 years."
      }
    ],
    "services": [
      {
        "slug": "painting-services",
        "title": "Painting Services",
        "image": "/images/services/sub_painting.png",
        "breadcrumbBg": "/images/layout/breadcrumb-bg.png",
        "description": "Expert Interior and Exterior Painting Services for HDB, Condos, Landed Homes, Commercial Buildings, and Industrial Offices across Singapore.",
        "longDescription": "Refresh and protect your property with UA Engineering's professional painting services. We use premium non-toxic low-VOC paints for interiors and heavy-duty weather-shield coatings for exteriors. Our trained painters ensure proper wall scraping, crack filling, primer application, and neat drop-cloth protection.",
        "features": [
          "HDB & Condo Full Interior Painting",
          "Landed Exterior Facade Painting",
          "Anti-Mold & Odourless Paint Coating",
          "Wall Crack Scraping & Plastering",
          "Commercial & Industrial Office Painting"
        ],
        "benefits": [
          "Vibrant, smooth finish that brightens up living and working spaces.",
          "Long-lasting protection against dampness, yellowing, and peeling.",
          "Clean process with thorough floor and furniture protection."
        ],
        "process": [
          "Surface Prep: Patch wall cracks, sand rough surfaces, apply sealer.",
          "Coat Application: 1 coat primer + 2 coats premium finish paint."
        ],
        "processSteps": [
          {
            "title": "Surface Prep",
            "description": "Patch wall cracks, sand rough surfaces, apply sealer."
          },
          {
            "title": "Coat Application",
            "description": "1 coat primer + 2 coats premium finish paint."
          }
        ]
      },
      {
        "slug": "waterproofing-solutions",
        "title": "Waterproofing Solutions",
        "image": "/images/services/sub_waterproofing.png",
        "breadcrumbBg": "/images/layout/breadcrumb-bg.png",
        "description": "Professional Waterproofing Solutions Preventing Water Leakage, Seepage, Moisture Damage & Mold Growth for Roofs, Balconies, Bathrooms & Basements.",
        "longDescription": "Eliminate stubborn water leaks with specialized waterproofing systems. We diagnose seepage root causes using thermal imaging and apply liquid acrylic membranes, torch-on bitumen membranes, and PU injection grouting.",
        "features": [
          "High Pressure PU Chemical Injection Grouting",
          "Torch-On Bitumen Roof Waterproofing",
          "Liquid Applied Acrylic Membrane Coating",
          "Bathroom & Toilet Non-Hacking Leak Repair",
          "Balcony & Concrete Deck Waterproofing"
        ],
        "benefits": [
          "Completely resolves water seepage into lower neighbor units.",
          "Prevents structural concrete spalling and rebar corrosion.",
          "Backed by leak-free warranty coverage."
        ],
        "process": [
          "Leak Inspection: Pinpoint exact water ingress point.",
          "Membrane Treatment: Apply multi-layer waterproof barrier."
        ],
        "processSteps": [
          {
            "title": "Leak Inspection",
            "description": "Pinpoint exact water ingress point."
          },
          {
            "title": "Membrane Treatment",
            "description": "Apply multi-layer waterproof barrier."
          }
        ]
      }
    ]
  },
  {
    "slug": "aluminium-glazing-works",
    "title": "Aluminium & Glazing Works",
    "breadcrumbTitle": "Aluminium & Glass Solutions",
    "detailTitle": "Custom Aluminium Framing & Glass Installation Singapore",
    "subServicesTitle": "Our Aluminium & Glazing Services",
    "subServicesSubheading": "Precision glass partitions, sliding doors, windows, skylights, mosquito nets, and zip blinds.",
    "shortDescription": "Modern aluminium and glass solutions including windows, doors, storefronts, office partitions, balustrades, and custom glazing.",
    "description": "UA Engineering delivers high quality aluminium window frames, tempered glass doors, shower screens, acoustic glass partitions, skylights, and zip blinds for modern building designs.",
    "featuredImage": "/images/services/aluminium.png",
    "bgImage": "/images/layout/breadcrumb-bg.png",
    "targetBadge": "GLAZING SCOPE",
    "targetHeading": "Glass & Aluminium Applications",
    "targetSubheading": "Delivering architectural glass and aluminium fittings for homes and commercial interiors.",
    "targetSpaces": [
      "Commercial Office Glass Partitions & Conference Rooms",
      "Residential Aluminum Sliding Windows & French Doors",
      "Tempered Glass Shower Screens & Balustrades",
      "Roof Skylights & Glass Canopies",
      "Zip Blinds & Insect Mosquito Mesh Screens"
    ],
    "whyChooseBadge": "PRECISION GLAZING",
    "whyChooseHeading": "Why Choose Our Glazing Solutions?",
    "whyChooseLeftTitle": "Glazing Challenges",
    "whyChooseRightTitle": "Our Glazing Standards",
    "whyChooseAdvantages": [
      {
        "title": "Tempered Safety & Soundproof Laminated Glass",
        "description": "Heavy-duty safety glass engineered for high wind load and noise reduction."
      },
      {
        "title": "Precision Powder Coated Aluminum Frames",
        "description": "Seamless aluminum extrusions resistant to warping and corrosion."
      }
    ],
    "whyChooseChallenges": [
      {
        "title": "Water Leakage Around Window Frames",
        "description": "Degraded sealant silicon causing rainwater entry during windstorms."
      },
      {
        "title": "Noisy External Environment",
        "description": "Single pane glass failing to block road traffic noise."
      }
    ],
    "features": [
      "Aluminium Sliding & Casement Windows",
      "Tempered Glass Office Partition Walls",
      "Laminated Glass Roof Skylights",
      "Magnetic & Roller Mosquito Mesh Screens",
      "Outdoor Motorised Zip Blinds"
    ],
    "benefits": [
      "Enhances natural indoor lighting while maintaining safety.",
      "Reduces external traffic noise through acoustic double glazing.",
      "Sleek contemporary look matching modern architectural aesthetics."
    ],
    "processHeading": "Glazing Installation Workflow",
    "processText": "Accurate site laser measurement, factory glass tempering, aluminum frame assembly, and airtight sealant fitting.",
    "processSteps": [
      {
        "title": "Laser Measurement",
        "description": "Measure opening dimensions with sub-millimeter precision."
      },
      {
        "title": "Glass Tempering & Cutting",
        "description": "Custom glass processing and edge polishing."
      },
      {
        "title": "Site Installation",
        "description": "Secure frame anchoring, glass panel insertion, and weather seal silicone."
      }
    ],
    "serviceAreasBadge": "SINGAPORE WIDE",
    "serviceAreasHeading": "Aluminium & Glass Services Islandwide",
    "serviceAreasSubheading": "Providing custom glass repair and new fitting across Singapore.",
    "faqs": [
      {
        "question": "Are your glass partitions made of safety glass?",
        "answer": "Yes, all our glass partitions and shower screens use heat-strengthened tempered or laminated safety glass."
      },
      {
        "question": "Can double glazing reduce outside traffic noise?",
        "answer": "Yes, double-glazed acoustic glass significantly dampens external street and traffic noise."
      }
    ],
    "services": [
      {
        "slug": "aluminium-glass-installation-repair",
        "title": "Aluminium & Glass Installation & Repair",
        "image": "/images/services/sub_aluminium_glass.png",
        "breadcrumbBg": "/images/layout/breadcrumb-bg.png",
        "description": "Professional aluminium and glass installation, replacement, and repair services for commercial offices, residential homes, and retail storefronts.",
        "longDescription": "Upgrade your property facade and interior with custom aluminum sliding doors, casement windows, glass partition walls, and storefront glass. We also repair broken glass panels, worn rollers, and faulty window hinges.",
        "features": [
          "Commercial Glass Door & Partition Fitting",
          "Aluminium Casement & Sliding Windows",
          "Tempered Glass Shower Screen Enclosures",
          "Glass Door Hinge & Roller Repair"
        ],
        "benefits": [
          "Maximises daylight while creating distinct functional zones.",
          "Smooth sliding operation with durable aluminum tracks.",
          "High thermal and acoustic insulation."
        ],
        "process": [
          "Measurement: Site survey for exact frame dimensions.",
          "Fitting: Frame anchoring and glass panel installation."
        ],
        "processSteps": [
          {
            "title": "Measurement",
            "description": "Site survey for exact frame dimensions."
          },
          {
            "title": "Fitting",
            "description": "Frame anchoring and glass panel installation."
          }
        ]
      },
      {
        "slug": "skylight-installation",
        "title": "Skylight Installation",
        "image": "/images/services/sub_skylight.png",
        "breadcrumbBg": "/images/layout/breadcrumb-bg.png",
        "description": "Brighten interiors with professionally installed glass skylights that bring natural sunlight into homes, stairwells, and commercial buildings.",
        "longDescription": "Illuminate dim stairwells, attic rooms, and atrium hallways with custom laminated glass roof skylights framed in heavy-duty weatherproof aluminum.",
        "features": [
          "Double Laminated Safety Glass Skylights",
          "Heat-Reflective Low-E Glass Options",
          "Airtight Double-Sealed Aluminum Framing",
          "Integrated Water Drainage Channels"
        ],
        "benefits": [
          "Reduces daytime artificial electrical lighting energy costs.",
          "Completely leak-proof installation with double weather seals.",
          "UV blocking glass prevents furniture fading."
        ],
        "process": [
          "Roof Opening: Prepare structural roof frame opening.",
          "Skylight Mounting: Anchor aluminum frame and seal glass unit."
        ],
        "processSteps": [
          {
            "title": "Roof Opening",
            "description": "Prepare structural roof frame opening."
          },
          {
            "title": "Skylight Mounting",
            "description": "Anchor aluminum frame and seal glass unit."
          }
        ]
      },
      {
        "slug": "mosquito-net-installation",
        "title": "Mosquito Net Installation",
        "image": "/images/services/sub_mosquito_net.png",
        "breadcrumbBg": "/images/layout/breadcrumb-bg.png",
        "description": "Custom mosquito net installations providing reliable insect protection while allowing fresh airflow into your living spaces.",
        "longDescription": "Keep Dengue mosquitoes, lizards, and pests out while keeping windows wide open. We install invisible magnetic mesh screens, sliding netting doors, and roller insect screens.",
        "features": [
          "Magnetic Window Mosquito Mesh Screens",
          "Sliding Mesh Door Screens for Balconies",
          "Retractable Roller Insect Screens",
          "Durable High-Clarity Fiberglass Mesh"
        ],
        "benefits": [
          "100% insect protection without blocking breeze or outdoor view.",
          "Easy to detach and wash with magnetic snap frames.",
          "Rust-proof and tear-resistant mesh material."
        ],
        "process": [
          "Frame Sizing: Measure window and door frame perimeters.",
          "Mesh Assembly: Mount magnetic strips and snap mesh into place."
        ],
        "processSteps": [
          {
            "title": "Frame Sizing",
            "description": "Measure window and door frame perimeters."
          },
          {
            "title": "Mesh Assembly",
            "description": "Mount magnetic strips and snap mesh into place."
          }
        ]
      },
      {
        "slug": "zip-blind-all-types-of-blind-fabrication-installation",
        "title": "Zip Blind & All Types of Blind Fabrication & Installation",
        "image": "/images/services/sub_zip_blinds.png",
        "breadcrumbBg": "/images/layout/breadcrumb-bg.png",
        "description": "Custom blind fabrication and installation services including outdoor zip blinds, roller blinds, and venetian blinds for shade and privacy.",
        "longDescription": "Protect outdoor balconies and indoor office windows from harsh sunlight and rain with heavy-duty motorised outdoor zip blinds, blackout roller blinds, and timber venetian blinds.",
        "features": [
          "Heavy-Duty Motorised Outdoor Zip Blinds",
          "Indoor Blackout & Dimout Roller Blinds",
          "Venetian & Vertical Window Blinds",
          "Smart Home Remote & Mobile App Integration"
        ],
        "benefits": [
          "Blocks up to 90% rain and solar heat on outdoor balconies.",
          "Zip side-track system prevents blind flapping in strong winds.",
          "Sleek modern sun-shade solution."
        ],
        "process": [
          "Track Mounting: Secure heavy-duty side zip tracks.",
          "Blind Fitting: Mount motor roller tube and program remote controls."
        ],
        "processSteps": [
          {
            "title": "Track Mounting",
            "description": "Secure heavy-duty side zip tracks."
          },
          {
            "title": "Blind Fitting",
            "description": "Mount motor roller tube and program remote controls."
          }
        ]
      }
    ]
  },
  {
    "slug": "electrical-plumbing-aircon",
    "title": "Electrical, Plumbing & Aircon",
    "breadcrumbTitle": "M&E Electrical, Plumbing & Aircon",
    "detailTitle": "Complete Mechanical & Electrical (M&E) Services Singapore",
    "subServicesTitle": "Our M&E Engineering Services",
    "subServicesSubheading": "Licensed electrical rewiring, sanitary plumbing repair, pipe replacement, and air-conditioning servicing.",
    "shortDescription": "Complete M&E solutions covering electrical systems, plumbing installations, air-conditioning services, repairs, and maintenance.",
    "description": "UA Engineering provides comprehensive M&E services carried out by licensed electricians and plumbers, ensuring safe power distribution, leak-free piping, and efficient air cooling.",
    "featuredImage": "/images/services/mep.png",
    "bgImage": "/images/layout/breadcrumb-bg.png",
    "targetBadge": "M&E SERVICES",
    "targetHeading": "Electrical, Plumbing & Aircon Solutions",
    "targetSubheading": "Trusted utility installation and emergency repairs for homes, offices, and industrial premises.",
    "targetSpaces": [
      "HDB & Landed Electrical DB Box Upgrades & Rewiring",
      "Sanitary Ware, Toilet Bowl & Pipe Leak Repairs",
      "Aircon Chemical Overhaul & Servicing Contracts",
      "Commercial Lighting & Power Socket Distribution",
      "Water Heater & Ceiling Fan Installation"
    ],
    "whyChooseBadge": "LICENSED TRADESMEN",
    "whyChooseHeading": "Why Choose Our M&E Services?",
    "whyChooseLeftTitle": "Utility Issues",
    "whyChooseRightTitle": "Our M&E Guarantee",
    "whyChooseAdvantages": [
      {
        "title": "EMA Licensed Electricians & PUB Plumbers",
        "description": "All works executed according to Singapore electrical code (SS 638) and PUB water regulations."
      },
      {
        "title": "Fast Response Emergency Repairs",
        "description": "Quick turnaround for power trips, burst pipes, and aircon water leaks."
      }
    ],
    "whyChooseChallenges": [
      {
        "title": "Frequent Power Trips & Overloaded Circuits",
        "description": "Outdated DB boxes failing to support modern high-wattage appliances."
      },
      {
        "title": "Hidden Pipe Leaks & Low Water Pressure",
        "description": "Corroded concealed pipes causing water damage behind walls."
      }
    ],
    "features": [
      "Full House Electrical Rewiring & DB Box Upgrade",
      "Sanitary Ware & Water Pipe Leak Repair",
      "Aircon Servicing, Chemical Wash & Repair",
      "Lighting & Power Point Additions",
      "Water Heater & Ceiling Fan Installation"
    ],
    "benefits": [
      "Ensures electrical safety and prevents fire hazards.",
      "Restores optimal aircon cooling efficiency and lower electricity bills.",
      "Reliable plumbing fixtures with zero water leakage."
    ],
    "processHeading": "M&E Execution Workflow",
    "processText": "Safety isolation, circuit/pipe testing, professional installation, and load test verification.",
    "processSteps": [
      {
        "title": "Safety Isolation",
        "description": "Isolate power DB or main water supply shutoff."
      },
      {
        "title": "Installation / Repair",
        "description": "Execute wiring, piping, or aircon overhaul."
      },
      {
        "title": "Testing & Verification",
        "description": "Voltage testing, pressure testing, and temperature verification."
      }
    ],
    "serviceAreasBadge": "SINGAPORE WIDE",
    "serviceAreasHeading": "M&E Services Across Singapore",
    "serviceAreasSubheading": "Deploying licensed technicians islandwide.",
    "faqs": [
      {
        "question": "Are your electrical works performed by EMA licensed electricians?",
        "answer": "Yes, all electrical wiring and distribution box works are handled by EMA LEW licensed electricians."
      },
      {
        "question": "How often should residential aircons be serviced?",
        "answer": "We recommend routine aircon servicing every 3 to 4 months to maintain cooling efficiency and clean air quality."
      }
    ],
    "services": [
      {
        "slug": "electrical-lighting-work",
        "title": "Electrical & Lighting Work",
        "image": "/images/services/sub_electrical.png",
        "breadcrumbBg": "/images/layout/breadcrumb-bg.png",
        "description": "Safe, efficient electrical and lighting services, including full rewiring, DB box upgrades, power point installation, and LED lighting setups.",
        "longDescription": "Ensure electrical safety with UA Engineering's licensed electrical services. We upgrade old electrical DB breaker boxes, install new power sockets, wire track lights and chandeliers, and resolve frequent circuit trips.",
        "features": [
          "Full Home & Office Electrical Rewiring",
          "EMA Compliant DB Box & MCB Replacement",
          "Lighting Fixture & LED Strip Installation",
          "Power Socket & Data Point Additions"
        ],
        "benefits": [
          "Prevents electrical short circuits and appliance damage.",
          "Neat concealed or trunking wiring execution.",
          "Energy-efficient LED lighting recommendations."
        ],
        "process": [
          "Circuit Audit: Test current wiring load and DB box health.",
          "Wiring & Testing: Lay new wires, connect switches, and test load."
        ],
        "processSteps": [
          {
            "title": "Circuit Audit",
            "description": "Test current wiring load and DB box health."
          },
          {
            "title": "Wiring & Testing",
            "description": "Lay new wires, connect switches, and test load."
          }
        ]
      },
      {
        "slug": "plumbing-services",
        "title": "Plumbing Services",
        "image": "/images/services/sub_plumbing.png",
        "breadcrumbBg": "/images/layout/breadcrumb-bg.png",
        "description": "Professional plumbing solutions ensure reliable water flow, leak-free piping, and properly installed sanitary fixtures.",
        "longDescription": "From clearing stubborn choke drains to replacing old copper or stainless steel water pipes, our PUB licensed plumbers handle all residential and commercial plumbing needs.",
        "features": [
          "Copper, Stainless Steel & PVC Pipe Replacement",
          "Toilet Bowl, Basin & Tap Installation",
          "Drain Choke & Sewer Clearing",
          "Instant & Storage Water Heater Fitting"
        ],
        "benefits": [
          "Eliminates foul odors and water seepage under sinks.",
          "Restores strong, clean water flow pressure.",
          "Durable leak-proof pipe joint fittings."
        ],
        "process": [
          "Leak Inspection: Identify choke or leak source.",
          "Pipe Fitting: Replace damaged piping and install fixtures."
        ],
        "processSteps": [
          {
            "title": "Leak Inspection",
            "description": "Identify choke or leak source."
          },
          {
            "title": "Pipe Fitting",
            "description": "Replace damaged piping and install fixtures."
          }
        ]
      },
      {
        "slug": "aircon-repair",
        "title": "Aircon Repair",
        "image": "/images/services/sub_aircon.png",
        "breadcrumbBg": "/images/layout/breadcrumb-bg.png",
        "description": "Restore cooling efficiency with expert aircon repair, regular servicing, chemical overhaul, and refrigerant gas top-up services.",
        "longDescription": "Keep your home cool and clean. We service split unit aircons and central VRV systems, fixing water leaking, warm air blowing, noisy blower fans, and gas leaks.",
        "features": [
          "General Aircon Filter & Coil Cleaning",
          "Chemical Wash & Full Overhaul Flushing",
          "R32 / R410A Refrigerant Gas Top-Up",
          "Compressor & Fan Motor Repair"
        ],
        "benefits": [
          "Blows ice-cold, fresh air free of bacteria and dust mites.",
          "Reduces compressor strain and lowers monthly power bill.",
          "Stops water dripping onto floors and furniture."
        ],
        "process": [
          "Diagnostic Check: Check gas pressure and cooling temperature.",
          "Chemical Overhaul: Dismantle unit and chemical flush coil parts."
        ],
        "processSteps": [
          {
            "title": "Diagnostic Check",
            "description": "Check gas pressure and cooling temperature."
          },
          {
            "title": "Chemical Overhaul",
            "description": "Dismantle unit and chemical flush coil parts."
          }
        ]
      }
    ]
  },
  {
    "slug": "solar-panel-installation",
    "title": "Solar Panel Installation",
    "breadcrumbTitle": "Clean Energy Solar Solutions",
    "detailTitle": "Turnkey Solar PV System Design & Installation Singapore",
    "subServicesTitle": "Our Solar Panel Installation Services",
    "subServicesSubheading": "Harness renewable clean solar energy to lower monthly electricity bills for landed homes and commercial buildings.",
    "shortDescription": "Complete design, engineering, and installation of high-efficiency solar panel systems to generate clean energy and cut electricity bills.",
    "description": "UA Engineering provides end-to-end solar photovoltaic (PV) systems for landed residential properties, commercial factories, and industrial roofs across Singapore.",
    "featuredImage": "/images/services/solar.png",
    "bgImage": "/images/layout/breadcrumb-bg.png",
    "targetBadge": "SOLAR POWER",
    "targetHeading": "Solar PV Installations",
    "targetSubheading": "Turn unused roof space into a clean power generating asset.",
    "targetSpaces": [
      "Landed Terraces, Semi-Detached & Bungalow Roofs",
      "Commercial Building & Factory Roof Decks",
      "Warehouse Rooftops & Industrial Parks",
      "Agricultural & Institutional Canopy Roofs"
    ],
    "whyChooseBadge": "RENEWABLE ENERGY",
    "whyChooseHeading": "Why Invest In Solar Panels?",
    "whyChooseLeftTitle": "High Energy Costs",
    "whyChooseRightTitle": "The Solar Advantage",
    "whyChooseAdvantages": [
      {
        "title": "Up to 70% Monthly Electricity Bill Reduction",
        "description": "Generate your own green electricity and export excess solar energy back to the grid."
      },
      {
        "title": "Tier-1 High Efficiency Solar Panels",
        "description": "Monocrystalline panels with 25-year power output performance warranty."
      }
    ],
    "whyChooseChallenges": [
      {
        "title": "Rising SP Group Electricity Tariffs",
        "description": "Increasing monthly utility bills impacting operational margins."
      }
    ],
    "features": [
      "Solar PV System Feasibility & Roof Structural Audit",
      "Grid-Tied Inverter & Battery Storage Setup",
      "SP Group Grid Interconnection & Net Metering",
      "Mobile App Real-Time Power Generation Monitoring"
    ],
    "benefits": [
      "Substantial long-term savings on electricity expenses.",
      "Reduces carbon footprint and enhances building sustainability rating.",
      "Long 25-year manufacturer solar panel performance warranty."
    ],
    "processHeading": "Solar Installation Workflow",
    "processText": "Roof assessment, PE structural endorsement, solar mounting, inverter wiring, and SP grid turn-on.",
    "processSteps": [
      {
        "title": "Roof Audit & Design",
        "description": "Solar irradiance simulation and structural load assessment."
      },
      {
        "title": "Permits & Interconnection",
        "description": "Submit SP Group grid connection and EMA approvals."
      },
      {
        "title": "Panel Installation & Turn-On",
        "description": "Mount solar racking, wire inverter, and turn on green power."
      }
    ],
    "serviceAreasBadge": "SINGAPORE WIDE",
    "serviceAreasHeading": "Solar Solutions Across Singapore",
    "serviceAreasSubheading": "Installing clean solar energy systems islandwide.",
    "faqs": [
      {
        "question": "How much can I save with a solar panel system on a landed house?",
        "answer": "Landed property owners typically save between 50% to 70% on monthly electricity bills, achieving full payback in 4 to 6 years."
      },
      {
        "question": "Can excess solar energy be sold back to the power grid?",
        "answer": "Yes, under SP Group's net metering scheme, unused excess solar power is credited back to your utility account."
      }
    ],
    "services": [
      {
        "slug": "solar-panel-installation",
        "title": "Solar Panel Installation",
        "image": "/images/services/sub_solar.png",
        "breadcrumbBg": "/images/layout/breadcrumb-bg.png",
        "description": "Complete design, engineering, and installation of high-efficiency solar panel systems to generate clean energy and cut electricity bills.",
        "longDescription": "Harness clean solar energy with UA Engineering. We provide turnkey solar PV solutions including roof structural load checks, Tier-1 solar panel mounting, grid-tie inverter installation, SP Group meter submission, and mobile app performance monitoring.",
        "features": [
          "Tier-1 Monocrystalline Solar Panel Fitting",
          "Smart Solar Inverter & Battery Storage Setup",
          "SP Group Net Metering & Power Export",
          "Mobile App Live Energy Yield Tracking"
        ],
        "benefits": [
          "Drastically slashes monthly utility power bills.",
          "High ROI with 25-year panel performance guarantee.",
          "Increases property value and sustainability score."
        ],
        "process": [
          "Solar Audit: Calculate roof area, shade, and annual solar yield.",
          "Installation & Grid Hookup: Secure mounting racking, wire inverter, and activate grid."
        ],
        "processSteps": [
          {
            "title": "Solar Audit",
            "description": "Calculate roof area, shade, and annual solar yield."
          },
          {
            "title": "Installation & Grid Hookup",
            "description": "Secure mounting racking, wire inverter, and activate grid."
          }
        ]
      }
    ]
  }
];

export const initialServicesData = servicesData;
