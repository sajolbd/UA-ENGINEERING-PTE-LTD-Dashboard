export interface CmsPage {
  pageId: string;
  content: Record<string, any>;
  seo: {
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string;
    schemaJson: string;
  };
}

export const initialCmsData: Record<string, CmsPage> = {
  "site": {
    "pageId": "site",
    "content": {
      "siteLogo": "/images/logo.webp",
      "footerLogo": "/images/logo.webp",
      "companyName": "UA ENGINEERING PTE. LTD.",
      "welcomeMessage": "Welcome to",
      "phone": "+65 8459 3003",
      "email": "info@uaengineering.com.sg",
      "address": "38C SEA AVENUE MARINE MANSION SINGAPORE 424256",
      "workingHours": "Mon - Sat: 9:00 AM - 6:00 PM (Emergency 24/7 Support)",
      "appointmentButtonText": "Book An Appointment",
      "footerAboutText": "A complete renovation partner for homes and commercial spaces in Singapore, handling everything from small repairs to full structural transformation.",
      "facebook": "https://facebook.com",
      "instagram": "https://instagram.com",
      "linkedin": "https://linkedin.com",
      "youtube": "https://youtube.com",
      "whatsapp": "https://wa.me/6584593003"
    },
    "seo": {
      "metaTitle": "UA Engineering PTE. LTD. | Singapore Engineering & Renovation",
      "metaDescription": "UA Engineering PTE. LTD. provides renovation, waterproofing, steel works, roofing, electrical, plumbing, aircon, aluminium glazing and maintenance services across Singapore.",
      "metaKeywords": "UA Engineering, Singapore Renovation, Waterproofing Singapore",
      "schemaJson": "{\"@context\":\"https://schema.org\",\"@type\":\"LocalBusiness\",\"name\":\"UA Engineering Pte Ltd\"}"
    }
  },
  "home": {
    "pageId": "home",
    "content": {
      "heroHeading": "From Renovation to Painting, Roofing, Electrical, Plumbing and Steel Works.",
      "heroSubheading": "We handle it all with expertise, reliability, and guaranteed quality.",
      "heroSlide1Heading": "From Renovation to Painting, Roofing, Electrical, Plumbing and Steel Works.",
      "heroSlide1Subheading": "We handle it all with expertise, reliability, and guaranteed quality.",
      "heroSlide2Heading": "Everything Your Property Needs. One Trusted Engineering Team.",
      "heroSlide2Subheading": "From renovations to electrical, plumbing, painting, roofing, steel fabrication, waterproofing, and maintenance - We handle it all.",
      "heroSlide3Heading": "Fresh Paint. Lasting Protection. Stunning Results.",
      "heroSlide3Subheading": "Interior and exterior painting services that enhance appearance, protect surfaces, and increase the value of your property.",
      "heroSlide4Heading": "Roof Problems? We Fix Them Before They Cost You More.",
      "heroSlide4Subheading": "Professional roof repairs, waterproofing, leak prevention, and complete roofing solutions to keep your property safe in every season.",
      "heroSlide5Heading": "Safe, Reliable Electrical Solutions for Every Building.",
      "heroSlide5Subheading": "From new installations and rewiring to troubleshooting and upgrades, we deliver electrical work that keeps your property running safely.",
      "heroSlide6Heading": "Professional Plumbing Services Without the Hassle.",
      "heroSlide6Subheading": "Leak repairs, pipe replacement, drainage solutions and sanitary installations all completed with quality workmanship.",
      "heroSlide7Heading": "Custom Steel Fabrication Built for Strength & Precision.",
      "heroSlide7Subheading": "We design, fabricate, and install steel structures, staircases, platforms, railings, and custom metal works.",
      "heroImage": "/images/home/hero/hero-bg.png",
      "heroImageAlt": "UA Engineering Renovation and Steel Fabrications Banner",
      "heroCtaText": "Book An Appointment",
      "aboutHeading": "Your Trusted Partner for All Building Needs.",
      "aboutSubheading": "We provide home renovation, painting, waterproofing, main gate & grill works, balcony shelter installation, roof extensions, aluminium & glass installation, electrical, plumbing, aircon, and solar panel installation for homes and commercial properties across Singapore.",
      "aboutImage": "/images/home/about/about-main.jpg",
      "aboutImageAlt": "UA Engineering Upgrading Worksite Team",
      "aboutExperience": "15",
      "aboutCard1Title": "BCA Certified Company",
      "aboutCard1Desc": "Meeting standards with high-quality workmanship, reliable service, compliance, consistent delivery, and professional practices.",
      "aboutCard2Title": "Skilled & Certified Workforce",
      "aboutCard2Desc": "Experienced professionals delivering quality work with precision, and attention.",
      "aboutCard3Title": "Competitive & Transparent Pricing",
      "aboutCard3Desc": "Fair, upfront pricing with detailed quotations, competitive rates, and no hidden costs or charges.",
      "servicesIntro": "Get professional renovation, painting, waterproofing, structural works, M&E services, and solar panel installation-all under one roof.",
      "whyChooseBadge": "UA ADVANTAGE",
      "whyChooseHeading": "Why Choose UA Engineering",
      "whyCard1Title": "Complete Building Solutions",
      "whyCard1Desc": "From renovation and structural works to M&E, glazing, waterproofing, and solar, one trusted team handles every project.",
      "whyCard2Title": "Quality Workmanship",
      "whyCard2Desc": "Every project is completed with skilled workmanship, quality materials, and attention to detail for lasting performance.",
      "whyCard3Title": "Honest & Transparent Pricing",
      "whyCard3Desc": "Clear quotations, fair pricing, and no hidden costs, so you can plan your project with confidence.",
      "whyCard4Title": "Reliable Project Management",
      "whyCard4Desc": "We coordinate every stage efficiently, keeping projects organized, on schedule, and completed to high standards.",
      "issue1Title": "Multiple Contractors to Manage",
      "issue1Desc": "Hiring separate contractors often leads to delays, communication gaps, and inconsistent workmanship across different stages of the project.",
      "issue2Title": "Poor Workmanship",
      "issue2Desc": "Low-quality materials and rushed installation can result in recurring repairs, higher maintenance costs, and reduced durability.",
      "issue3Title": "Unclear Pricing",
      "issue3Desc": "Unexpected charges and incomplete quotations can increase project costs and create unnecessary stress during construction.",
      "issue4Title": "Delays & Poor Communication",
      "issue4Desc": "Lack of planning and communication often causes missed deadlines, project disruptions, and uncertainty throughout the construction process.",
      "relyBadge": "RELIABILITY & TRUST",
      "relyHeading": "Why Do You Rely On Us?",
      "relyImage": "/images/home/rely/rely-main.png",
      "relyButtonText": "Talk to an Expert",
      "relyFeature1Title": "Honest & Transparent Pricing",
      "relyFeature1Desc": "Receive clear, detailed quotations with fair pricing and no hidden costs, so you know exactly what to expect before work begins.",
      "relyFeature2Title": "Quality Work That Lasts",
      "relyFeature2Desc": "We focus on quality materials, skilled workmanship, and proper installation to deliver durable solutions you can depend on for years.",
      "relyFeature3Title": "Reliable Service, Every Step",
      "relyFeature3Desc": "From the first site visit to project handover, we keep you informed, stay on schedule, and ensure a smooth experience.",
      "callbackHeading": "Let Us Call You",
      "callbackSubheading": "Need help now? Send a few details - we'll call you shortly.",
      "callbackBgImage": "/images/home/call/callback-bg.png",
      "callbackSupportImage": "/images/home/call/call-support.png",
      "callbackButtonText": "Submit Now",
      "reviewsBadge": "CLIENT TESTIMONIALS",
      "reviewsHeading": "What Our Clients Say About UA Engineering",
      "processBadge": "HOW IT WORKS",
      "processHeading": "Our Simple & Transparent Working Process",
      "processSubheading": "From site inspection and quotation to professional installation and project handover, we ensure quality, transparency, and customer satisfaction at every stage.",
      "processStep1Title": "Free Consultation & Site Visit",
      "processStep1Desc": "We assess your requirements, inspect the site, discuss solutions, and understand your project goals.",
      "processStep1Image": "/images/home/process/assessment.png",
      "processStep2Title": "Quotation & Project Planning",
      "processStep2Desc": "Provide a detailed quotation, project scope, material recommendations, timeline, and execution plan with transparent pricing.",
      "processStep2Image": "/images/home/process/planning.png",
      "processStep3Title": "Professional Execution",
      "processStep3Desc": "Our skilled team completes every project using quality materials, safe practices, and strict workmanship standards.",
      "processStep3Image": "/images/home/process/execution.png",
      "processStep4Title": "Final Inspection & Handover",
      "processStep4Desc": "We conduct final quality checks, ensure everything meets expectations, and hand over your completed project with confidence.",
      "processStep4Image": "/images/home/process/handover.png",
      "serviceAreasTitle": "Reliable Home Renovation Solutions Near You",
      "serviceAreasSubtitle": "UA ENGINEERING proudly provides home renovation services across Singapore, covering all major residential and commercial areas.",
      "consultHeading": "Book a Free Consultation as Your Convenient Time",
      "consultSubheading": "Would you like to discuss your project face-to-face with our expert? Do you need expert guidance for your project? Would you like our expert to visit your site or project? Then book a free-of-cost appointment at your convenience."
    },
    "seo": {
      "metaTitle": "UA Engineering PTE. LTD. | Singapore Engineering & Renovation",
      "metaDescription": "UA Engineering PTE. LTD. provides renovation, waterproofing, steel works, roofing, electrical, plumbing, aircon, aluminium glazing and maintenance services across Singapore.",
      "metaKeywords": "UA Engineering, Singapore Renovation, Waterproofing Singapore",
      "schemaJson": "{\"@context\":\"https://schema.org\",\"@type\":\"LocalBusiness\",\"name\":\"UA Engineering Pte Ltd\"}"
    }
  },
  "about": {
    "pageId": "about",
    "content": {
      "heroHeading": "About UA Engineering",
      "heroSubheading": "UA Engineering is a Singapore-based company providing renovation, structural, glazing, electrical, plumbing, aircon, waterproofing, and solar solutions.",
      "heroImage": "/images/layout/about-bg.png",
      "aboutImage": "/images/home/about/about-main.jpg",
      "heroImageAlt": "UA Engineering Commercial Facility Builders",
      "sectionTag": "About Our Company",
      "overviewHeading": "About Our Company",
      "overviewText": "UA ENGINEERING PTE. LTD. is a trusted engineering and construction company. We deliver quality workmanship through highly skilled and certified professionals, BCA-compliant practices, and premium materials. With transparent pricing, a strong focus on safety, and reliable project management, we are committed to completing every project on time while exceeding our clients' expectations. Your satisfaction, safety, and trust are at the heart of everything we do.",
      "experienceYears": "15",
      "experienceTitle": "Years of Excellence",
      "experienceSubtitle": "15+ Years Skilled Personnel",
      "trustHeading": "Why Property Owners Trust UA Engineering",
      "highlightsJson": "[{\"text\":\"15+ Years Skilled Personnel\",\"icon\":\"Clock\"},{\"text\":\"Highly Skilled & Certified Workers\",\"icon\":\"Wrench\"},{\"text\":\"BCA Compliant Workmanship\",\"icon\":\"Award\"},{\"text\":\"Transparent & Competitive Pricing\",\"icon\":\"DollarSign\"},{\"text\":\"Premium Quality Materials\",\"icon\":\"ShieldCheck\"},{\"text\":\"Safety-First Construction Practices\",\"icon\":\"ShieldCheck\"},{\"text\":\"On-Time Project Completion\",\"icon\":\"Clock\"},{\"text\":\"100% Commitment to Client Satisfaction\",\"icon\":\"ThumbsUp\"}]",
      "ehsHeading": "EHS Safety Policy & Environmental Compliance",
      "ehsText": "We maintain a Zero-Accident policy across all site operations. Our EHS compliance officers inspect structural rigs, high-voltage lines, and confined space setups daily to protect our workers and clients.",
      "ehsImage": "/images/home/about/about-main.jpg",
      "processBadge": "HOW WE WORK",
      "processHeading": "Our Process",
      "processSubheading": "Every successful renovation begins with proper planning and professional execution. At UA Engineering, we follow a proven project management process that ensures efficiency, quality, and complete customer confidence from the initial consultation through project completion.",
      "processStepsJson": "[{\"id\":1,\"tag\":\"STEP 01\",\"title\":\"Consultation & Site Assessment\",\"description\":\"We discuss your renovation goals, inspect the property, take accurate measurements, assess technical requirements, and recommend practical solutions to develop a clear and efficient project plan.\",\"milestones\":[\"Free consultation and site inspection\",\"Detailed technical assessment\",\"Structural and feasibility evaluation\",\"Accurate measurements\"]},{\"id\":2,\"tag\":\"STEP 02\",\"title\":\"Proposal & Project Planning\",\"description\":\"We prepare a transparent quotation covering scope, materials, pricing, and timeline. After approval, we organise resources, scheduling, and project planning for smooth execution.\",\"milestones\":[\"Detailed itemised quotation\",\"Transparent pricing\",\"Material recommendations\",\"Project scheduling\"]},{\"id\":3,\"tag\":\"STEP 03\",\"title\":\"Professional Execution & Quality Control\",\"description\":\"Our skilled team completes every project safely under experienced supervision, following BCA and HDB standards while maintaining strict quality control throughout every stage.\",\"milestones\":[\"Experienced project supervisors\",\"Certified skilled workers\",\"Premium construction materials\",\"Continuous quality inspections\"]},{\"id\":4,\"tag\":\"STEP 04\",\"title\":\"Completion, Handover & After-Sales Support\",\"description\":\"After final inspections and site cleaning, we hand over the completed project with warranty information, maintenance guidance, and responsive after-sales support for your peace of mind.\",\"milestones\":[\"Final quality inspection\",\"Complete project walkthrough\",\"Site cleaning and finishing\",\"Warranty documentation\"]}]",
      "residentialBadge": "WHAT WE DO",
      "residentialHeading": "Complete Renovation, Engineering & Property Improvement Services",
      "residentialSubheading": "UA Engineering provides complete renovation, structural, waterproofing, electrical, plumbing, aluminium, and solar panel solutions for residential, commercial, and industrial properties across Singapore.",
      "faqBadge": "FAQ'S",
      "faqHeading": "Frequently Asked Questions",
      "faqSubheading": "Find expert answers to common questions about our renovation, construction, and handyman services in Singapore.",
      "faqsJson": "[{\"question\":\"1. What services does UA Engineering provide?\",\"answer\":\"UA Engineering provides a comprehensive range of renovation and engineering services, including residential and commercial renovation, structural works, glazing, aluminium works, electrical, plumbing, air-conditioning, waterproofing, and solar panel solutions.\"},{\"question\":\"2. Does UA Engineering handle both residential and commercial projects?\",\"answer\":\"Yes. We undertake projects for residential, commercial, and industrial properties across Singapore. Our team can manage projects of different sizes and requirements, from individual renovation works to complete property improvement projects.\"},{\"question\":\"3. How does the renovation process work?\",\"answer\":\"Our process begins with a consultation and site assessment, followed by a detailed proposal and project planning. Once approved, our skilled team carries out the works under professional supervision and quality control. The project concludes with final inspection, handover, site cleaning, and after-sales support.\"},{\"question\":\"4. Do you provide a detailed quotation before starting work?\",\"answer\":\"Yes. We provide transparent, itemised quotations outlining the project scope, materials, pricing, and expected timeline. This helps clients understand the costs clearly and minimise unexpected charges during the project.\"},{\"question\":\"5. Are your workers skilled and certified?\",\"answer\":\"Yes. UA Engineering works with highly skilled and certified professionals who follow applicable industry requirements and established safety and quality practices. Experienced supervision is maintained throughout the project to ensure professional execution.\"},{\"question\":\"6. Do you provide waterproofing, plumbing, electrical and air-conditioning services?\",\"answer\":\"Yes. We provide a wide range of essential property services, including waterproofing, plumbing, electrical works, and air-conditioning solutions. These services can be carried out as individual works or integrated into a larger renovation or engineering project.\"},{\"question\":\"7. How does UA Engineering ensure quality and timely project completion?\",\"answer\":\"We use structured project planning, experienced supervision, quality inspections, premium materials, and professional workmanship throughout each stage. Our team focuses on safety, quality control, clear communication, and efficient scheduling to deliver projects reliably and on time.\"}]"
    },
    "seo": {
      "metaTitle": "About Us | UA Engineering PTE. LTD.",
      "metaDescription": "Learn more about UA Engineering's team, licensed professional engineers, safety track record, and commercial construction capability in Singapore.",
      "metaKeywords": "about UA engineering, site engineers Singapore, certified contractors Singapore",
      "schemaJson": "{\"@context\":\"https://schema.org\",\"@type\":\"AboutPage\",\"name\":\"About UA Engineering Pte Ltd\"}"
    }
  },
  "services": {
    "pageId": "services",
    "content": {
      "heroHeading": "Our Engineering Services",
      "heroSubheading": "Professional solutions covering plumbing, substation electrical networks, waterproofing membranes, drywall, tiling, hacking, and solar panels.",
      "heroImage": "/images/services/services-bg.jpg",
      "heroImageAlt": "UA Engineering Substation Electrical Rewiring Grid",
      "servicesHeading": "Singapore Building and Construction Capability",
      "servicesSubheading": "We handle commercial, industrial, and residential upgrades. All works are certified by BCA registered professional engineers."
    },
    "seo": {
      "metaTitle": "Our Services | Substation Electrical, Plumbing, Waterproofing",
      "metaDescription": "Explore our commercial and industrial services in Singapore.",
      "metaKeywords": "substation electrical works, commercial plumbing Singapore",
      "schemaJson": "{\"@context\":\"https://schema.org\",\"@type\":\"Service\"}"
    }
  },
  "projects": {
    "pageId": "projects",
    "content": {
      "heroHeading": "Our Completed Projects",
      "heroSubheading": "A catalog of successfully delivered commercial, retail, and residential projects reflecting structural engineering precision and quality.",
      "heroImage": "/images/projects/projects-bg.jpg",
      "heroImageAlt": "UA Engineering Commercial Drywall Alteration Project",
      "portfolioHeading": "Featured Engineering Contracts",
      "portfolioSubheading": "Review our portfolio of successfully delivered projects in Singapore."
    },
    "seo": {
      "metaTitle": "Completed Projects | UA Engineering Portfolio",
      "metaDescription": "Review our portfolio of successfully delivered projects in Singapore.",
      "metaKeywords": "engineering portfolio Singapore, substation works Singapore",
      "schemaJson": "{\"@context\":\"https://schema.org\",\"@type\":\"CollectionPage\"}"
    }
  },
  "blog": {
    "pageId": "blog",
    "content": {
      "heroHeading": "Engineering & Safety Resources",
      "heroSubheading": "Professional insights, building codes, EHS checklists, and tips on flat roof waterproofing and electrical safety upgrades in HDBs.",
      "heroImage": "/images/blog/blog-bg.jpg",
      "heroImageAlt": "UA Engineering BTO Renovation Checklist Documents",
      "blogHeading": "Latest Insights & Field Manuals",
      "blogSubheading": "Stay up-to-date with Singapore BCA and HDB guidelines."
    },
    "seo": {
      "metaTitle": "Blog & Engineering Resources | UA Engineering",
      "metaDescription": "Read the latest engineering articles, safety tips, BTO renovation rules, and electrical rewiring checklists.",
      "metaKeywords": "engineering blog, BTO renovation tips",
      "schemaJson": "{\"@context\":\"https://schema.org\",\"@type\":\"Blog\"}"
    }
  },
  "contact": {
    "pageId": "contact",
    "content": {
      "heroHeading": "Contact UA Engineering",
      "heroSubheading": "Get in touch for commercial quotations, structural surveys, emergency substation audits, or custom plumbing design layout consultations.",
      "heroImage": "/images/contact/contact-bg.jpg",
      "heroImageAlt": "UA Engineering Singapore Customer Support Center",
      "contactAddress": "38C SEA AVENUE MARINE MANSION SINGAPORE 424256",
      "contactPhone": "+65 8459 3003",
      "contactEmail": "info@uaengineering.com.sg",
      "contactHours": "Mon - Sat: 9:00 AM - 6:00 PM (Emergency 24/7 Support)"
    },
    "seo": {
      "metaTitle": "Contact Us | UA Engineering PTE. LTD.",
      "metaDescription": "Request a callback or quotation from UA Engineering Singapore.",
      "metaKeywords": "contact UA engineering, Singapore engineer inspection",
      "schemaJson": "{\"@context\":\"https://schema.org\",\"@type\":\"ContactPage\"}"
    }
  }
};
