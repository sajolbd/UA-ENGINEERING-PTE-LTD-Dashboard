export interface ProcessStep {
  title: string;
  description: string;
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
  subServices?: SubService[];
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
  serviceAreasCount?: string;
  serviceAreasMapImage?: string;
  faqs?: Array<{ question: string; answer: string }>;
}


export const servicesData: ServiceCategory[] = [
  {
    "slug": "renovation-upgrading",
    "title": "Renovation & Upgrading",
    "shortDescription": "Transform homes, offices, and commercial spaces with tailored renovations, interior upgrades, quality finishes, and expert project execution.",
    "description": "We help homeowners and property owners achieve beautiful, practical spaces through professional renovation solutions built on trust, precision, and proven expertise.",
    "featuredImage": "/images/services/service_0_featuredImage_1788760396236_4501.webp",
    "bgImage": "/images/services/service_0_bgImage_1788760396290_2012.webp",
    "services": [
      {
        "slug": "home-renovation",
        "title": "Home Renovation",
        "image": "/images/services/service_0_services_0_image_1788760396294_6882.webp",
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
          "Quality Inspection: Inspect workmanship and complete all necessary touch-ups.",
          "Project Handover: Final walkthrough, site cleaning, and customer handover."
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
          },
          {
            "title": "Project Handover",
            "description": "Final walkthrough, site cleaning, and customer handover."
          }
        ]
      },
      {
        "slug": "kitchen-renovation",
        "title": "Kitchen Renovation",
        "image": "/images/services/service_0_services_1_image_1788760396297_2340.webp",
        "description": "Upgrade your kitchen with smart layouts, durable cabinetry, and stylish finishes that maximise storage, efficiency, and everyday convenience for Singapore homes.",
        "longDescription": "Transform your cooking space with UA Engineering's professional Kitchen Renovation Services in Singapore. We design and renovate functional kitchens for HDB flats, condominiums, and landed homes, combining smart layouts with quality materials and efficient storage solutions. From cabinet replacement and countertop installation to tiling and plumbing coordination, we deliver practical kitchen renovations that improve workflow, maximise space, and enhance everyday living.",
        "features": [
          "Kitchen Layout Planning",
          "Custom Kitchen Cabinet Installation",
          "Quartz & Solid Surface Countertops",
          "Kitchen Wall & Floor Tiling",
          "Sink & Plumbing Coordination",
          "Storage Optimisation Solutions"
        ],
        "benefits": [
          "Practical kitchen layouts designed for everyday cooking and storage.",
          "Quality cabinetry with durable hardware and premium finishes.",
          "Experienced project coordination for smooth renovation progress.",
          "Tailored solutions for HDB, condo, and landed properties."
        ],
        "process": [
          "Consultation: Discuss kitchen layout, storage, and lifestyle requirements.",
          "Site Measurement: Measure the kitchen and assess renovation requirements.",
          "Design Planning: Confirm layout, materials, and countertop selection.",
          "Renovation Works: Install cabinets, countertops, tiling, and plumbing fixtures.",
          "Finishing: Complete adjustments, detailing, and final fittings.",
          "Handover: Inspect completed work and hand over your new kitchen."
        ],
        "processSteps": [
          {
            "title": "Consultation",
            "description": "Discuss kitchen layout, storage, and lifestyle requirements."
          },
          {
            "title": "Site Measurement",
            "description": "Measure the kitchen and assess renovation requirements."
          },
          {
            "title": "Design Planning",
            "description": "Confirm layout, materials, and countertop selection."
          },
          {
            "title": "Renovation Works",
            "description": "Install cabinets, countertops, tiling, and plumbing fixtures."
          },
          {
            "title": "Finishing",
            "description": "Complete adjustments, detailing, and final fittings."
          },
          {
            "title": "Handover",
            "description": "Inspect completed work and hand over your new kitchen."
          }
        ]
      },
      {
        "slug": "room-beautification",
        "title": "Room Beautification",
        "image": "/images/services/service_0_services_2_image_1788760396301_2485.webp",
        "description": "Refresh bedrooms, living rooms, and study spaces with elegant interior upgrades that create a comfortable, stylish, and personalised environment for your family.",
        "longDescription": "Enhance the comfort and appearance of your home with UA Engineering's Room Beautification Services in Singapore. We upgrade bedrooms, living rooms, and study spaces through customised interior enhancements, decorative finishes, space optimisation, and quality built-in features. Every project is designed to create a welcoming environment that reflects your lifestyle while improving functionality and visual appeal.",
        "features": [
          "Interior Space Enhancement",
          "Decorative Feature Walls",
          "Built-in Wardrobes & Storage",
          "Ceiling Design Improvements",
          "Decorative Wall Panel Installation",
          "Interior Finishing Coordination"
        ],
        "benefits": [
          "Personalised room designs tailored to your lifestyle.",
          "Modern finishes that enhance comfort and aesthetics.",
          "Quality craftsmanship with attention to every detail.",
          "Efficient renovation with minimal disruption."
        ],
        "process": [
          "Consultation: Understand your design preferences and room requirements.",
          "Site Assessment: Evaluate room dimensions and existing conditions.",
          "Design Selection: Confirm finishes, materials, and renovation scope.",
          "Installation: Carry out enhancement works with precision.",
          "Final Detailing: Complete finishing touches and quality checks.",
          "Project Completion: Clean the area and hand over the completed space."
        ],
        "processSteps": [
          {
            "title": "Consultation",
            "description": "Understand your design preferences and room requirements."
          },
          {
            "title": "Site Assessment",
            "description": "Evaluate room dimensions and existing conditions."
          },
          {
            "title": "Design Selection",
            "description": "Confirm finishes, materials, and renovation scope."
          },
          {
            "title": "Installation",
            "description": "Carry out enhancement works with precision."
          },
          {
            "title": "Final Detailing",
            "description": "Complete finishing touches and quality checks."
          },
          {
            "title": "Project Completion",
            "description": "Clean the area and hand over the completed space."
          }
        ]
      },
      {
        "slug": "open-plan-spaces",
        "title": "Create Open Plan Spaces (C&R Works)",
        "image": "/images/services/service_0_services_3_image_1788760396303_8147.webp",
        "description": "Create spacious and modern open-plan living areas with professional C&R works, ensuring safe structural modifications and compliance with Singapore regulations.",
        "longDescription": "Create brighter and more spacious interiors with UA Engineering's C&R (Construction & Reconstruction) Services in Singapore. We perform professional wall removal, structural modifications, and space reconfiguration to improve flow and maximise usable living areas. Every project is carefully planned and executed in compliance with HDB and Singapore building regulations.",
        "features": [
          "Site Assessment & Structural Review",
          "Non-Load Bearing Wall Removal",
          "Masonry & Reconstruction Works",
          "Space Reconfiguration",
          "BCA Compliance Coordination",
          "Site Restoration & Finishing"
        ],
        "benefits": [
          "Safe structural modifications following Singapore regulations.",
          "Professional planning before any alteration begins.",
          "Experienced masonry and reconstruction specialists.",
          "Neat execution with careful quality supervision."
        ],
        "process": [
          "Site Inspection: Assess structural conditions and project feasibility.",
          "Planning: Prepare renovation scope and compliance requirements.",
          "Approval: Coordinate necessary renovation approvals where required.",
          "Construction Works: Carry out demolition and reconstruction safely.",
          "Site Restoration: Complete masonry finishing and clean the work area.",
          "Final Inspection: Inspect completed works before project handover."
        ],
        "processSteps": [
          {
            "title": "Site Inspection",
            "description": "Assess structural conditions and project feasibility."
          },
          {
            "title": "Planning",
            "description": "Prepare renovation scope and compliance requirements."
          },
          {
            "title": "Approval",
            "description": "Coordinate necessary renovation approvals where required."
          },
          {
            "title": "Construction Works",
            "description": "Carry out demolition and reconstruction safely."
          },
          {
            "title": "Site Restoration",
            "description": "Complete masonry finishing and clean the work area."
          },
          {
            "title": "Final Inspection",
            "description": "Inspect completed works before project handover."
          }
        ]
      },
      {
        "slug": "floor-renovation",
        "title": "Floor Renovation & Polishing",
        "image": "/images/services/service_0_services_4_image_1788760396305_4609.webp",
        "description": "Restore and upgrade your flooring with high-quality renovation and polishing services that enhance durability, appearance, and long-lasting protection.",
        "longDescription": "Restore the beauty and durability of your floors with UA Engineering's professional Floor Renovation & Polishing Services in Singapore. We repair, replace, and polish a wide range of flooring materials to improve appearance, safety, and long-term performance for residential and commercial properties.",
        "features": [
          "Floor Surface Assessment",
          "Tile Replacement & Repairs",
          "Vinyl Flooring Installation",
          "Marble & Homogeneous Tile Polishing",
          "Floor Levelling",
          "Protective Surface Finishing"
        ],
        "benefits": [
          "Professional flooring solutions for lasting durability.",
          "Smooth, level finishes with quality workmanship.",
          "Suitable for residential and commercial properties.",
          "Reliable project scheduling and clean execution."
        ],
        "process": [
          "Inspection: Assess floor condition and identify repair requirements.",
          "Surface Preparation: Remove damaged flooring and prepare the substrate.",
          "Material Selection: Confirm flooring materials and finish options.",
          "Installation: Install or restore flooring with precision.",
          "Polishing: Polish and protect completed floor surfaces.",
          "Handover: Perform final inspection and site cleaning."
        ],
        "processSteps": [
          {
            "title": "Inspection",
            "description": "Assess floor condition and identify repair requirements."
          },
          {
            "title": "Surface Preparation",
            "description": "Remove damaged flooring and prepare the substrate."
          },
          {
            "title": "Material Selection",
            "description": "Confirm flooring materials and finish options."
          },
          {
            "title": "Installation",
            "description": "Install or restore flooring with precision."
          },
          {
            "title": "Polishing",
            "description": "Polish and protect completed floor surfaces."
          },
          {
            "title": "Handover",
            "description": "Perform final inspection and site cleaning."
          }
        ]
      },
      {
        "slug": "decking-work",
        "title": "Decking Work",
        "image": "/images/services/sub_decking.png",
        "description": "Enhance balconies, patios, and outdoor spaces with durable decking solutions that combine weather resistance, safety, and elegant design.",
        "longDescription": "Upgrade your outdoor living areas with UA Engineering's professional Decking Installation Services in Singapore. We design and install durable timber and composite decking for balconies, patios, gardens, and outdoor spaces that combine functionality, safety, and long-lasting performance in Singapore's tropical climate.",
        "features": [
          "Timber Deck Installation",
          "Composite Decking Systems",
          "Balcony & Patio Decking",
          "Outdoor Flooring Solutions",
          "Anti-Slip Deck Finishes",
          "Deck Repair & Replacement"
        ],
        "benefits": [
          "Weather-resistant decking designed for Singapore conditions.",
          "Quality materials with durable construction.",
          "Custom decking layouts to suit your outdoor space.",
          "Professional installation with precise workmanship."
        ],
        "process": [
          "Consultation: Review outdoor space and decking requirements.",
          "Site Measurement: Measure the installation area accurately.",
          "Material Selection: Choose decking materials and finishing options.",
          "Installation: Install decking framework and deck boards.",
          "Finishing: Complete trimming and final detailing.",
          "Project Handover: Inspect the completed deck and hand over the project."
        ],
        "processSteps": [
          {
            "title": "Consultation",
            "description": "Review outdoor space and decking requirements."
          },
          {
            "title": "Site Measurement",
            "description": "Measure the installation area accurately."
          },
          {
            "title": "Material Selection",
            "description": "Choose decking materials and finishing options."
          },
          {
            "title": "Installation",
            "description": "Install decking framework and deck boards."
          },
          {
            "title": "Finishing",
            "description": "Complete trimming and final detailing."
          },
          {
            "title": "Project Handover",
            "description": "Inspect the completed deck and hand over the project."
          }
        ]
      }
    ],
    "breadcrumbTitle": "Renovation & Upgrading Services",
    "icon": "",
    "features": [],
    "benefits": [],
    "process": [],
    "faqs": [
      {
        "question": "What renovation services does UA Engineering provide?",
        "answer": "We provide home, kitchen, room, flooring, decking, and open-plan renovation services, including C&R works."
      },
      {
        "question": "Do you handle HDB, condo, and landed property renovations?",
        "answer": "Yes. We provide customised renovation solutions for HDB flats, condominiums, and landed homes across Singapore."
      },
      {
        "question": "Can UA Engineering help with creating open-plan spaces?",
        "answer": "Yes. We handle C&R works, including site assessment, non-load-bearing wall removal, masonry, and reconstruction, while following Singapore regulations."
      },
      {
        "question": "Do you provide customised renovation solutions?",
        "answer": "Yes. Our team tailors renovation plans, layouts, materials, finishes, and built-in solutions to suit your space and requirements."
      },
      {
        "question": "How do you ensure renovation projects stay on schedule and budget?",
        "answer": "We use structured project management, transparent quotations, quality materials, and coordinated workmanship to keep projects organised and on track."
      },
      {
        "question": "Does UA Engineering provide renovation services across Singapore?",
        "answer": "Yes. We serve major areas across Singapore, including the Central, East, North, North-East, and West regions."
      },
      {
        "question": "How can I get a quotation for my renovation project?",
        "answer": "Contact UA Engineering through the Get Free Quote, WhatsApp, or Let Us Call You options and share your project requirements."
      }
    ],
    "processHeading": "Our Working Process",
    "processText": "Our structured renovation process transforms your Singapore property on time and budget. We manage design, structural permits, and premium built-in cabinetry.",
    "processSteps": [
      {
        "title": "One-Site Meeting & Site Visit",
        "description": "We assess your space, understand your needs, and identify the best renovation approach."
      },
      {
        "title": "Planning & Proposal Making",
        "description": "We create a clear renovation plan with scope, timeline, materials, and pricing."
      },
      {
        "title": "Start Working & Quality Control",
        "description": "Our team executes the project with strict supervision and consistent quality checks."
      },
      {
        "title": "Functional Audit & Handover",
        "description": "We inspect every detail, complete final checks, and hand over a ready-to-use space."
      }
    ],
    "targetSpaces": [],
    "whyChooseLeftTitle": "Our Renovation & Upgrading",
    "whyChooseRightTitle": "Traditional Renovation Companies",
    "whyChooseAdvantages": [
      {
        "title": "Smart Space Planning",
        "description": "We use digital layout planning and modern design tools to optimize every square foot of your home, creating functional, stylish, and efficient living spaces."
      },
      {
        "title": "Minimal Disruption Process",
        "description": "Our organised workflow, dust-control measures, and efficient project coordination reduce noise, mess, and inconvenience during renovation works."
      },
      {
        "title": "Premium Materials & Finishes",
        "description": "We source durable, high-quality materials and apply advanced installation techniques to ensure long-lasting performance and a refined finish."
      },
      {
        "title": "Skilled & Certified Team",
        "description": "Our BCA-compliant workmanship and experienced project specialists deliver reliable results with strict attention to safety and quality standards."
      }
    ],
    "whyChooseChallenges": [
      {
        "title": "Outdated Planning Methods",
        "description": "Traditional contractors may rely on basic planning, resulting in inefficient layouts, wasted space, and design changes during the project."
      },
      {
        "title": "Delays & Poor Coordination",
        "description": "Without a structured workflow, projects can face delays, miscommunication, and extended renovation timelines that disrupt daily life."
      },
      {
        "title": "Inconsistent Workmanship",
        "description": "Some contractors use lower-grade materials or outdated techniques, leading to uneven finishes and frequent repair needs"
      },
      {
        "title": "Limited Quality Assurance",
        "description": "Traditional processes may lack proper inspections, documentation, and systematic quality control, reducing confidence in the final result."
      }
    ]
  },
  {
    "slug": "structural-exterior-works",
    "title": "Structural & Exterior Works",
    "shortDescription": "Strengthen and protect your property with structural repairs, roofing, steel works, gate, grill, masonry, and durable exterior improvement solutions.",
    "description": "UA ENGINEERING provides professional structural and exterior works for homes and businesses in Singapore. Our skilled team delivers steel fabrication, roof extensions, gates, grills, balcony shelters, and awnings built for durability.",
    "featuredImage": "/images/services/service_1_featuredImage_1788760396307_2492.webp",
    "bgImage": "/images/services/service_1_bgImage_1788760396309_9494.webp",
    "services": [
      {
        "slug": "steel-work",
        "title": "All Kinds of Steel Work",
        "image": "/images/services/service_1_services_0_image_1788760396310_780.webp",
        "description": "Expert steel fabrication and installation for durable, safe, customised structural solutions throughout Singapore properties.",
        "longDescription": "UA ENGINEERING provides custom steel fabrication and installation services for HDB flats, condominiums, landed homes, and commercial properties across Singapore. We fabricate and install steel support structures, custom frames, platforms, brackets, railings, and other metal components tailored to your property's requirements. Our team combines precise fabrication, quality materials, and professional installation to deliver durable steel solutions built for safety, functionality, and long-term performance.",
        "features": [
          "Custom Steel Fabrication",
          "Structural Steel Support Frames",
          "Steel Platforms & Access Structures",
          "Precision Cutting & Welding",
          "Protective Anti-Rust Finishes",
          "Steel Repair & Modification Works"
        ],
        "benefits": [
          "Every component is custom-fabricated using accurate site measurements.",
          "Suitable materials and coatings withstand Singapore's humid conditions.",
          "Experienced professionals ensure safe, stable, quality workmanship.",
          "Clear coordination ensures organised projects from assessment through installation."
        ],
        "process": [
          "Site Assessment: Inspect site, measure areas, understand requirements.",
          "Planning & Quotation: Recommend solutions, materials, and provide quotation.",
          "Steel Fabrication: Cut, weld, assemble, and prepare steel components.",
          "Surface Finishing: Apply protective coatings for durability and appearance.",
          "Installation: Install and secure components with precise alignment.",
          "Inspection & Handover: Check quality, finishing, functionality before project handover."
        ],
        "processSteps": [
          {
            "title": "Site Assessment",
            "description": "Inspect site, measure areas, understand requirements."
          },
          {
            "title": "Planning & Quotation",
            "description": "Recommend solutions, materials, and provide quotation."
          },
          {
            "title": "Steel Fabrication",
            "description": "Cut, weld, assemble, and prepare steel components."
          },
          {
            "title": "Surface Finishing",
            "description": "Apply protective coatings for durability and appearance."
          },
          {
            "title": "Installation",
            "description": "Install and secure components with precise alignment."
          },
          {
            "title": "Inspection & Handover",
            "description": "Check quality, finishing, functionality before project handover."
          }
        ]
      },
      {
        "slug": "gate-grill-work",
        "title": "Main Gate & Grill Work",
        "image": "/images/services/service_1_services_1_image_1788760396311_7719.webp",
        "description": "Custom gates and grills combining security, durability, and modern designs for residential and commercial properties across Singapore.",
        "longDescription": "UA ENGINEERING provides custom main gate and grill fabrication services for HDB flats, condominiums, landed homes, and commercial properties across Singapore. Whether you're replacing an existing gate, installing a new entrance gate, or upgrading window and door grills, we fabricate each product to suit your property's dimensions and design preferences. Our team focuses on quality workmanship, secure installation, and durable materials to improve property security while complementing the overall appearance of your home or business.",
        "features": [
          "Stainless Steel Gates",
          "Decorative Metal Grills",
          "Mild Steel Main Gates ",
          "Window & Door Grill Installation",
          "Custom Metal Fencing",
          "Rust-Resistant Protective Finishes"
        ],
        "benefits": [
          "Every gate and grill is custom-made for precise fitting.",
          "Strong steel provides reliable security for daily use.",
          "Protective coatings ensure durability and clean modern appearance.",
          "Professional installation ensures secure fixing and smooth operation."
        ],
        "process": [
          "Site Measurement: Inspect site, discuss preferences, take accurate measurements.",
          "Design & Quotation: Recommend materials, styles, and provide clear quotation.",
          "Fabrication: Fabricate gates and grills to approved specifications.",
          "Surface Finishing: Apply protective finishes for durability and appearance.",
          "Installation: Securely install, align, and test smooth operation.",
          "Final Inspection: Check alignment, locks, finishing, and complete handover."
        ],
        "processSteps": [
          {
            "title": "Site Measurement",
            "description": "Inspect site, discuss preferences, take accurate measurements."
          },
          {
            "title": "Design & Quotation",
            "description": "Recommend materials, styles, and provide clear quotation."
          },
          {
            "title": "Fabrication",
            "description": "Fabricate gates and grills to approved specifications."
          },
          {
            "title": "Surface Finishing",
            "description": "Apply protective finishes for durability and appearance."
          },
          {
            "title": "Installation",
            "description": "Securely install, align, and test smooth operation."
          },
          {
            "title": "Final Inspection",
            "description": "Check alignment, locks, finishing, and complete handover."
          }
        ]
      },
      {
        "slug": "balcony-shelter",
        "title": "Balcony Shelter Work",
        "image": "/images/services/service_1_services_2_image_1788760396313_9275.webp",
        "description": "Professionally installed balcony shelters providing reliable weather protection, enhanced comfort, and lasting durability for Singapore properties.",
        "longDescription": "UA ENGINEERING designs and installs balcony shelters that provide practical weather protection while enhancing the comfort and usability of outdoor living spaces. Our balcony shelter solutions are suitable for HDB executive apartments (where permitted), condominiums, landed homes, and commercial premises. We use quality structural materials and roofing systems to create shelters that blend with your property's exterior while helping protect against Singapore's sun and frequent rainfall.",
        "features": [
          "Polycarbonate Balcony Shelters",
          "Aluminium Support Structures",
          "Balcony Canopy Installation",
          "UV-Resistant Roofing Panels",
          "Rain Protection Systems",
          "Custom Shelter Designs"
        ],
        "benefits": [
          "Customised shelters complement your property's layout and functional needs.",
          "Durable roofing materials provide reliable weather protection.",
          "Professional workmanship ensures secure fixing and structural support.",
          "Balcony shelters create comfortable outdoor spaces for daily use."
        ],
        "process": [
          "Site Assessment: We inspect the balcony area and assess suitable shelter options.",
          "Design Consultation: Material options, colours, and structural requirements are discussed.",
          "Fabrication: Support frames and shelter components are fabricated according to site measurements.",
          "Material Preparation: Roofing panels and structural components are prepared before installation.",
          "Installation: The shelter is securely installed with careful alignment and finishing.",
          "Inspection & Handover: Completed works are checked before final project completion."
        ],
        "processSteps": [
          {
            "title": "Site Assessment",
            "description": "We inspect the balcony area and assess suitable shelter options."
          },
          {
            "title": "Design Consultation",
            "description": "Material options, colours, and structural requirements are discussed."
          },
          {
            "title": "Fabrication",
            "description": "Support frames and shelter components are fabricated according to site measurements."
          },
          {
            "title": "Material Preparation",
            "description": "Roofing panels and structural components are prepared before installation."
          },
          {
            "title": "Installation",
            "description": "The shelter is securely installed with careful alignment and finishing."
          },
          {
            "title": "Inspection & Handover",
            "description": "Completed works are checked before final project completion."
          }
        ]
      },
      {
        "slug": "roof-extension",
        "title": "Roof Extension & Solutions",
        "image": "/images/services/service_1_services_3_image_1788760396315_2972.webp",
        "description": "Custom roof extensions designed to maximise covered space while improving weather protection, functionality, and long-term property value.",
        "longDescription": "UA ENGINEERING provides customised roof extension solutions for landed homes and commercial properties across Singapore. Whether you need additional covered space for a car porch, outdoor seating area, side walkway, or backyard, our team fabricates and installs durable roof structures designed to suit your property's layout. We focus on practical designs, quality materials, and professional installation to improve protection from Singapore's weather while maintaining a clean and well-integrated appearance.",
        "features": [
          "Car Porch Roof Extensions",
          "Side Walkway Roof Covers",
          "Backyard Roof Extensions",
          "Metal Roof Structures",
          "Polycarbonate Roofing",
          "Aluminium Roofing Systems"
        ],
        "benefits": [
          "Tailored roof designs maximise covered space and complement architecture.",
          "Quality structural materials ensure reliable long-term performance.",
          "Climate-suitable solutions protect against sun and heavy rainfall.",
          "Professional installation ensures organised workmanship and quality finishing."
        ],
        "process": [
          "Site Visit: We assess your existing roof and discuss extension requirements.",
          "Design Proposal: Roof layout, materials, and structural details are finalised.",
          "Fabrication: Roof support structures are fabricated according to approved dimensions.",
          "Material Preparation: Roofing sheets, flashings, and accessories are prepared.",
          "Installation: Structural frames and roofing materials are professionally installed.",
          "Quality Inspection: The completed roof extension is inspected before handover."
        ],
        "processSteps": [
          {
            "title": "Site Visit",
            "description": "We assess your existing roof and discuss extension requirements."
          },
          {
            "title": "Design Proposal",
            "description": "Roof layout, materials, and structural details are finalised."
          },
          {
            "title": "Fabrication",
            "description": "Roof support structures are fabricated according to approved dimensions."
          },
          {
            "title": "Material Preparation",
            "description": "Roofing sheets, flashings, and accessories are prepared."
          },
          {
            "title": "Installation",
            "description": "Structural frames and roofing materials are professionally installed."
          },
          {
            "title": "Quality Inspection",
            "description": "The completed roof extension is inspected before handover."
          }
        ]
      },
      {
        "slug": "awning-shelter",
        "title": "Awning Shelter Fabrication & Installation",
        "image": "/images/services/service_1_services_4_image_1788760396317_8129.webp",
        "description": "High-quality awning shelters expertly fabricated and installed to provide shade, weather protection, and enhanced outdoor comfort.",
        "longDescription": "UA ENGINEERING fabricates and installs customised awning shelters for residential and commercial properties throughout Singapore. Our awnings provide practical shade and weather protection for entrances, windows, patios, shopfronts, and outdoor areas. Every awning is manufactured according to your property's dimensions and installed with careful attention to structural stability, functionality, and overall appearance.",
        "features": [
          "Residential Awning Installation",
          "Commercial Shopfront Awnings",
          "Window Awnings",
          "Patio & Outdoor Shelters",
          "Polycarbonate Awnings",
          "Custom Shelter Installation"
        ],
        "benefits": [
          "Every awning is fabricated to suit your property's size, usage, and exterior design.",
          "Our awning systems help reduce direct sunlight and provide shelter during rainy weather.",
          "Quality framing and secure installation contribute to the stability and durability of every awning.",
          "We complete installations with careful alignment, neat workmanship, and attention to detail."
        ],
        "process": [
          "Site Consultation: We assess the installation area and discuss your shelter requirements.",
          "Material Selection: Suitable awning materials, frame types, and colours are recommended.",
          "Custom Fabrication: The awning frame and roofing components are fabricated to the required dimensions.",
          "Pre-Installation Preparation: Materials and fittings are prepared for efficient on-site installation.",
          "Installation: We securely install, check alignment, fixing points, and structural stability.",
          "Final Inspection & Handover: We complete a final quality inspection and ensure the awning."
        ],
        "processSteps": [
          {
            "title": "Site Consultation",
            "description": "We assess the installation area and discuss your shelter requirements."
          },
          {
            "title": "Material Selection",
            "description": "Suitable awning materials, frame types, and colours are recommended."
          },
          {
            "title": "Custom Fabrication",
            "description": "The awning frame and roofing components are fabricated to the required dimensions."
          },
          {
            "title": "Pre-Installation Preparation",
            "description": "Materials and fittings are prepared for efficient on-site installation."
          },
          {
            "title": "Installation",
            "description": "We securely install, check alignment, fixing points, and structural stability."
          },
          {
            "title": "Final Inspection & Handover",
            "description": "We complete a final quality inspection and ensure the awning."
          }
        ]
      }
    ],
    "icon": "",
    "features": [],
    "benefits": [],
    "process": []
  },
  {
    "slug": "painting-waterproofing",
    "title": "Painting & Waterproofing",
    "shortDescription": "Enhance your property's interior and exterior appearance through premium painting, waterproofing, crack repairs, and protective coatings.",
    "description": "UA ENGINEERING provides expert painting and waterproofing solutions in Singapore, delivering durable finishes, leak protection, and reliable solutions for homes, offices, and commercial properties.",
    "featuredImage": "/images/services/service_2_featuredImage_1788760396318_8758.webp",
    "bgImage": "/images/services/service_2_bgImage_1788760396320_3412.webp",
    "services": [
      {
        "slug": "painting-services",
        "title": "Painting Services",
        "image": "/images/services/service_2_services_0_image_1788760396321_2453.webp",
        "description": "Expert Interior and Exterior Painting Services Designed to Enhance Beauty, Protection, and Property Value.",
        "longDescription": "Refresh and protect your property with UA Engineering's professional Painting Services in Singapore. We provide interior and exterior painting for HDB flats, condominiums, landed houses, offices, and commercial properties. Our process includes thorough surface preparation, crack repairs, priming, and premium paint application to achieve smooth, durable, and long-lasting finishes that withstand Singapore's humid climate.",
        "features": [
          "Interior Wall & Ceiling Painting",
          "Exterior Wall & Facade Painting",
          "Repainting for Homes & Commercial Properties",
          "Door, Metal Gate & Railing Painting",
          "Protective Primers & Premium Top Coats",
          "Final Touch-Up & Site Cleaning"
        ],
        "benefits": [
          "Comprehensive surface preparation for smoother, longer-lasting paint finishes.",
          "Premium quality paints from trusted brands for excellent durability and colour retention.",
          "Clean, efficient workmanship with minimal disruption to your home or business.",
          "Experienced painters delivering reliable results with attention to every detail."
        ],
        "process": [
          "Site Inspection: Assess wall condition, cracks, moisture, and painting requirements.",
          "Surface Preparation: Protect surrounding areas, repair cracks, sand surfaces, and apply primer.",
          "Colour Confirmation: Confirm paint colours, finishes, and project scope before application.",
          "Paint Application: Apply premium paint systems using professional techniques for even coverage.",
          "Final Touch-Up: Inspect painted surfaces, complete touch-ups, and remove protective coverings.",
          "Quality Handover: Conduct final inspection, site cleaning, and customer handover."
        ],
        "processSteps": [
          {
            "title": "Site Inspection",
            "description": "Assess wall condition, cracks, moisture, and painting requirements."
          },
          {
            "title": "Surface Preparation",
            "description": "Protect surrounding areas, repair cracks, sand surfaces, and apply primer."
          },
          {
            "title": "Colour Confirmation",
            "description": "Confirm paint colours, finishes, and project scope before application."
          },
          {
            "title": "Paint Application",
            "description": "Apply premium paint systems using professional techniques for even coverage."
          },
          {
            "title": "Final Touch-Up",
            "description": "Inspect painted surfaces, complete touch-ups, and remove protective coverings."
          },
          {
            "title": "Quality Handover",
            "description": "Conduct final inspection, site cleaning, and customer handover."
          }
        ]
      },
      {
        "slug": "waterproofing-solutions",
        "title": "Waterproofing Solutions",
        "image": "/images/services/service_2_services_1_image_1788760396322_3907.webp",
        "description": "Professional Waterproofing Solutions Preventing Water Seepage, Roof Leaks, and Moisture Damage for Lasting Protection.",
        "longDescription": "Protect your property from water seepage, roof leaks, ceiling leaks, and damp walls with UA Engineering's professional Waterproofing Solutions in Singapore. We provide effective waterproofing for roofs, bathrooms, balconies, external walls, and concrete surfaces using proven waterproofing systems that deliver long-term protection against Singapore's heavy rainfall and humidity.",
        "features": [
          "Roof Waterproofing Systems",
          "Bathroom & Toilet Waterproofing",
          "Balcony & Terrace Waterproofing",
          "Ceiling Leak & Water Seepage Repair",
          "Leak Testing & Final Quality Inspection",
          "PU Injection for Crack Sealing"
        ],
        "benefits": [
          "Accurate leak detection to identify the root cause before repairs begin.",
          "High-performance waterproofing systems designed for Singapore's tropical climate.",
          "Durable solutions that help prevent recurring leaks and costly repairs.",
          "Skilled waterproofing specialists delivering dependable workmanship and lasting protection."
        ],
        "process": [
          "Site Assessment: Inspect leak sources, moisture levels, cracks, and affected surfaces.",
          "Surface Preparation: Clean the area, remove damaged materials, and prepare surfaces for treatment.",
          "System Selection: Recommend the most suitable waterproofing method based on site conditions.",
          "Waterproofing Application: Apply membranes, PU injection, sealants, or waterproof coatings professionally.",
          "Testing & Inspection: Carry out water testing and verify complete waterproof protection.",
          "Project Handover: Perform final quality checks, clean the site, and provide maintenance guidance."
        ],
        "processSteps": [
          {
            "title": "Site Assessment",
            "description": "Inspect leak sources, moisture levels, cracks, and affected surfaces."
          },
          {
            "title": "Surface Preparation",
            "description": "Clean the area, remove damaged materials, and prepare surfaces for treatment."
          },
          {
            "title": "System Selection",
            "description": "Recommend the most suitable waterproofing method based on site conditions."
          },
          {
            "title": "Waterproofing Application",
            "description": "Apply membranes, PU injection, sealants, or waterproof coatings professionally."
          },
          {
            "title": "Testing & Inspection",
            "description": "Carry out water testing and verify complete waterproof protection."
          },
          {
            "title": "Project Handover",
            "description": "Perform final quality checks, clean the site, and provide maintenance guidance."
          }
        ]
      }
    ],
    "icon": "",
    "features": [],
    "benefits": [],
    "process": []
  },
  {
    "slug": "aluminium-glazing-works",
    "title": "Aluminium & Glazing Works",
    "shortDescription": "Modern aluminium and glass solutions including windows, doors, shopfronts, office partitions, balustrades, and custom glazing installations.",
    "description": "UA Engineering provides professional aluminium and glass solutions designed to enhance durability, natural lighting, security, and architectural appeal with expert craftsmanship and reliable installation services throughout Singapore.",
    "featuredImage": "/images/services/service_3_featuredImage_1788760396323_2589.webp",
    "bgImage": "/images/services/service_3_bgImage_1788760396324_1553.webp",
    "services": [
      {
        "slug": "aluminium-glass",
        "title": "Aluminium & Glass Installation & Repair",
        "image": "/images/services/service_3_services_0_image_1788760396325_3372.webp",
        "description": "Professional aluminium and glass installation and repair services delivering durability, safety, and modern aesthetics seamlessly.",
        "longDescription": "We manufacture and install premium aluminium casement windows, sliding doors, glass partitions, and glass balustrades. We offer double-glazed, tempered, or laminated safety glass configurations that reduce outdoor street noise and heat. We also provide repair services for loose window hinges, handles, and rollers to ensure smooth opening.",
        "features": [
          "Aluminium Casement & Sliding Windows",
          "Double-Glazed Soundproof Glass Doors",
          "Tempered Glass Shower Screens",
          "Office Glass Partition Systems",
          "Window Handle, Friction Stay, Hinge Repairs",
          "Laminated Glass Balustrades & Railings"
        ],
        "benefits": [
          "BCA-approved window installation specialists",
          "Reduces noise levels by up to 50% with double glazing",
          "Improves thermal efficiency, reducing aircon bills",
          "Rust-proof frames engineered for high-salinity coastal areas"
        ],
        "process": [
          "Precise laser window measurements",
          "Aluminium frame cutting & glass assembly at workshop",
          "Safely dismantling and recycling old windows/doors",
          "Installing new frames, anchoring, and glazing",
          "Applying heavy-duty structural silicone sealants",
          "Testing safety handles & smooth friction sliding"
        ]
      },
      {
        "slug": "skylight-installation",
        "title": "Skylight Installation",
        "image": "/images/services/service_3_services_1_image_1788760396326_7614.webp",
        "description": "Brighten interiors with professionally installed skylights that enhance natural lighting, ventilation, and energy efficiency effortlessly.",
        "longDescription": "Our Skylight Installation service is designed for landed homes and commercial spaces looking to bring in natural daylight. We build leak-proof, heavy-duty structural frames holding heat-reflective, laminated safety glass or durable polycarbonate panels. This reduces the need for artificial lighting during the day while filtering out harmful UV rays and heat.",
        "features": [
          "Laminated Safety Glass Skylights",
          "Heat-Reflective Low-E Glass options",
          "UV-Resistant Polycarbonate Domes",
          "Heavy-Duty Leak-Proof Metal Frames",
          "Acoustic Dampening Gaskets",
          "Architectural Integration with Ceilings"
        ],
        "benefits": [
          "Maximizes natural daylight, creating a bright and positive mood",
          "Reduces daytime lighting electricity bills",
          "Low-E glass coatings reflect heat, keeping interiors cool",
          "Double sealing ensures zero water leaks even during storms"
        ],
        "process": [
          "Roof structure check & opening fabrication",
          "Welding steel structural support frame",
          "Applying weatherproofing flashings around the frame",
          "Hoisting and mounting laminated glass panels",
          "Installing secondary seals & silicone weatherproofing",
          "Testing with high-pressure water spray to ensure zero leaks"
        ]
      },
      {
        "slug": "mosquito-net",
        "title": "Mosquito Net Installation",
        "image": "/images/services/service_3_services_2_image_1788760396327_2548.webp",
        "description": "Custom mosquito net installations provide effective insect protection while maintaining fresh airflow and unobstructed outdoor views.",
        "longDescription": "Enjoy fresh outdoor breeze without worrying about dengue-carrying mosquitoes, flies, or pests. We customize high-durability magnetic mosquito nets, sliding mesh screens, and roll-up insect netting for casement windows, sliding doors, and louvres. The screens use premium fibreglass or stainless steel mesh that is virtually invisible and easy to clean.",
        "features": [
          "Magnetic Window Mosquito Screens",
          "Retractable Roller Netting Systems",
          "Heavy-Duty Stainless Steel Insect Mesh",
          "Slim Aluminium Frame Profiles",
          "Custom Sliding Insect Screen Doors",
          "Washable & Rust-Proof Net Materials"
        ],
        "benefits": [
          "Protects your family from mosquitoes, flies, and lizards",
          "Allows 100% natural breeze, reducing aircon usage",
          "Minimalist design that does not block views or light",
          "Easy to detach, wash, and reinstall in seconds"
        ],
        "process": [
          "Measuring window and door frame dimensions",
          "Choosing frame colors to match existing window frames",
          "Fabricating frames & tensioning fibreglass mesh",
          "On-site installation of magnetic strips or guide rails",
          "Fitting the net panels & testing retraction smoothness",
          "Providing maintenance & cleaning guide"
        ]
      },
      {
        "slug": "zip-blinds",
        "title": "Zip Blind & All Types of Blind Fabrication & Installation",
        "image": "/images/services/service_3_services_3_image_1788760396329_5872.webp",
        "description": "Custom blind fabrication and installation enhancing privacy, comfort, sun protection, and contemporary property aesthetics effectively.",
        "longDescription": "Our outdoor motorized Zip Blinds are Singapore's favorite solution for converting hot, wet balconies into functional indoor-like rooms. The blind's fabric is locked into side tracks to resist strong winds and heavy rain splash. We also fabricate and install indoor roller blinds, wooden Venetian blinds, and vertical blinds for offices and homes.",
        "features": [
          "Motorized Outdoor Zip Blinds",
          "Heavy-Duty Windproof Track Systems",
          "UV-Blocking & Rain-Resistant Screen Fabrics",
          "Smart Home Remote & Mobile App Integration",
          "Indoor Venetian & Roller Blinds",
          "Custom Fabric Selection (Blackout/Semi-Sheer)"
        ],
        "benefits": [
          "Expands your living room space out to the balcony",
          "Blocks 90%+ of rain splash and heavy wind during storms",
          "Provides immediate privacy from nearby neighbors",
          "Easily integrates with Google Home / Alexa smart automation"
        ],
        "process": [
          "Balcony dimensions measurement & wind exposure check",
          "Selecting fabric color, transparency, and motor brand",
          "Installing heavy-duty top cassettes & side tracks",
          "Threading and tensioning the zip fabric",
          "Connecting motor to power & calibrating sensor limits",
          "Testing obstacle detection & remote control app"
        ]
      }
    ],
    "breadcrumbTitle": "Aluminium & Glazing Works",
    "icon": "",
    "features": [],
    "benefits": [],
    "process": []
  },
  {
    "slug": "electrical-plumbing-aircon",
    "title": "Electrical, Plumbing & Aircon",
    "shortDescription": "Complete M&E solutions covering electrical systems, plumbing installations, air-conditioning services, repairs, upgrades, and routine maintenance.",
    "description": "Expert electrical, plumbing, and aircon services ensuring safe, efficient, reliable building systems across Singapore properties.",
    "featuredImage": "/images/services/service_4_featuredImage_1788760396330_3308.webp",
    "bgImage": "/images/services/service_4_bgImage_1788760396331_7001.webp",
    "services": [
      {
        "slug": "electrical-lighting",
        "title": "Electrical & Lighting Work",
        "image": "/images/services/service_4_services_0_image_1788760396332_6676.webp",
        "description": "Safe, efficient electrical and lighting solutions delivering reliable power, comfort, and everyday convenience for every property.",
        "longDescription": "We provide certified residential and commercial electrical services. Our licensed EMA electricians handle full home rewiring, distribution board (DB) box replacements, circuit breaker upgrades, smart switch setups, ceiling fan mountings, and decorative lighting installations. We ensure all works comply with local SS638 electrical safety standards.",
        "features": [
          "Licensed EMA Electrician Services",
          "Whole-House Electrical Rewiring",
          "Distribution Board (DB) Upgrades",
          "Power Sockets & USB Port Installations",
          "Ceiling Fan & Chandelier Mounting",
          "Electrical Fault Finding & Troubleshooting"
        ],
        "benefits": [
          "Prevents short circuits, overloaded breakers, and fire hazards",
          "Ensures full safety compliance with EMA regulations",
          "Neat routing using PVC casings or concealed conduits",
          "Quick response for sudden power outages or tripping issues"
        ],
        "process": [
          "Reviewing power load requirements & drawing single line maps",
          "Laying safety cables & running conduits (concealed or surface)",
          "Installing switches, sockets, DB boards, and lights",
          "Testing circuit loops, earthing, and safety breakers",
          "EMA inspection and sign-off",
          "Power activation & client walkthrough"
        ]
      },
      {
        "slug": "plumbing-services",
        "title": "Plumbing Services",
        "image": "/images/services/service_4_services_1_image_1788760396333_1134.webp",
        "description": "Professional plumbing solutions ensure reliable water flow, leak-free systems, and long-lasting performance for every property.",
        "longDescription": "Our professional plumbing service covers all commercial and residential needs. We repair copper and PVC pipe leaks, clear clogged toilet bowls or kitchen sinks, replace instant and storage water heaters, and install modern kitchen and bathroom sanitary wares. We use high-grade plumbing joints and pressure testing to ensure leak-free results.",
        "features": [
          "Copper & PVC Pipe Leak Repairs",
          "Sink, Toilet Bowl & Basin Unclogging",
          "Storage & Instant Water Heater Installation",
          "Sanitary Ware & Faucet Replacements",
          "Water Pressure Pump Installations",
          "Main Water Supply Pipe Replacements"
        ],
        "benefits": [
          "Immediate leak resolution, preventing water damage and mold",
          "Ensures clean, odorless water flow with correct traps",
          "Storage heaters installed with approved safety pressure valves",
          "PUB licensed plumber coordination when required"
        ],
        "process": [
          "Site inspection to locate leakage source or choke point",
          "Providing repair options & plumbing parts catalog",
          "Shutting off water main & cutting out old pipes/fittings",
          "Laying new pipelines, soldering copper, or gluing PVC",
          "Mounting faucets, heaters, or toilet bowls",
          "Turning on water supply, testing pressure, and verifying zero leaks"
        ]
      },
      {
        "slug": "aircon-repair",
        "title": "Aircon Repair",
        "image": "/images/services/service_4_services_2_image_1788760396334_6506.webp",
        "description": "Restore cooling efficiency with expert aircon repairs for dependable comfort and optimal system performance year-round.",
        "longDescription": "Keep your indoor air cool and clean in Singapore's tropical heat. We offer regular aircon servicing, deep chemical wash overhauls, refrigerant gas top-ups, drainage pipe vacuuming (to stop water leaking), and troubleshooting of compressor or fan motor failures. We handle all major aircon brands like Daikin, Mitsubishi Electric, Panasonic, and system configs.",
        "features": [
          "General Aircon Cleaning & Servicing",
          "Deep Chemical Wash / Overhaul",
          "Coolant Gas Leak Check & Top-Up",
          "Condensation Pipe Vacuuming (Fix Water Leaking)",
          "Compressor & Fan Motor Diagnosis & Repair",
          "Smart Thermostat & Controller Setup"
        ],
        "benefits": [
          "Restores icy cold air flow and optimizes cooling speed",
          "Saves up to 20% on electricity bills by cleaning clogged coils",
          "Improves indoor air purity, filtering out dust, mold, and allergens",
          "Prevents messy water dripping damage to your walls and floors"
        ],
        "process": [
          "Checking air temp, fan speed, and checking error codes",
          "Cleaning filters, front panel, and water tray",
          "Vacuuming water drainage pipe to clear jelly/slime build-up",
          "If chemical wash: dismantling fan coil and rinsing with chemical coil cleaners",
          "Checking refrigerant gas pressure & topping up if low",
          "Reassembling, turning on the system, and testing cooling efficiency"
        ]
      }
    ],
    "icon": "",
    "features": [],
    "benefits": [],
    "process": [],
    "breadcrumbTitle": "Electrical, Plumbing & Aircon"
  },
  {
    "slug": "solar-panel-installation",
    "title": "Solar Panel Installation",
    "shortDescription": "Reduce energy costs with professionally installed solar panel systems designed for long-term efficiency, reliability, and sustainable performance.",
    "description": "Professional solar panel installation service delivering clean, efficient renewable energy solutions for residential and commercial properties across Singapore.",
    "featuredImage": "/images/services/service_5_featuredImage_1788760396335_6493.webp",
    "bgImage": "/images/services/service_5_bgImage_1788760396336_8348.webp",
    "services": [
      {
        "slug": "solar-panel",
        "title": "Solar Panel Installation",
        "image": "/images/services/sub_solar.png",
        "description": "Complete design, engineering, and installation of rooftop solar PV systems to offset electricity bills.",
        "longDescription": "Transitioning to green energy is made simple with our turnkey Solar Panel Installation service. We cater to landed residential properties, commercial offices, and industrial warehouses in Singapore. We manage the entire lifecycle: structural roof load evaluations, solar PV panel layout drawings, high-efficiency solar panel procurement, power inverter setups, grid connections with SP Group, and Net-Metering configurations to sell excess power back to the grid.",
        "features": [
          "High-Efficiency Tier-1 Monocrystalline Solar Panels",
          "Hybrid & Grid-Tied Inverter Systems",
          "Rooftop Mounting Rail & Safety Harness Setup",
          "SP Group Grid-Connection & Net Metering Support",
          "Real-Time Solar Power Yield App Setup",
          "BCA Structural submission & PE Endorsements"
        ],
        "benefits": [
          "Reduces electricity bills by up to 50% to 80% every month",
          "Earns income by exporting excess solar energy back to SP Group",
          "Protects the roof from direct sun rays, lowering top-floor temps",
          "Adds significant eco-friendly value to your landed property"
        ],
        "process": [
          "Site survey to analyze shadow casting and roof structural safety",
          "PV layout design and estimation of monthly energy savings",
          "Submitting drawings for BCA & SP Group grid approval",
          "On-site mounting rail fabrication & solar panel installation",
          "DC cabling, inverter installation, and safety checks",
          "Installing SP Group bi-directional meter & turning on the system"
        ]
      }
    ],
    "icon": "",
    "features": [
      "Solar PV Installation",
      "Rooftop Solar Systems",
      "Secure Roof Mounting",
      "Weather-Resistant Installation",
      "Precision Workmanship",
      "Clean Energy Solutions"
    ],
    "benefits": [],
    "process": []
  }
];

export const initialServicesData = servicesData;
