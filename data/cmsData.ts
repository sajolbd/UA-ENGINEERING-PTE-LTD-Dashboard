export interface PageSeo {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  schemaJson: string;
}

export interface SiteContent {
  siteLogo: string;
  footerLogo: string;
  companyName: string;
  welcomeMessage: string;
  phone: string;
  email: string;
  address: string;
  workingHours: string;
  appointmentButtonText: string;
  footerAboutText: string;
  facebook: string;
  instagram: string;
  linkedin: string;
  youtube: string;
  whatsapp: string;
}

export interface HomeContent {
  heroHeading: string;
  heroSubheading: string;
  heroSlide1Heading?: string;
  heroSlide1Subheading?: string;
  heroSlide2Heading?: string;
  heroSlide2Subheading?: string;
  heroSlide3Heading?: string;
  heroSlide3Subheading?: string;
  heroSlide4Heading?: string;
  heroSlide4Subheading?: string;
  heroSlide5Heading?: string;
  heroSlide5Subheading?: string;
  heroSlide6Heading?: string;
  heroSlide6Subheading?: string;
  heroSlide7Heading?: string;
  heroSlide7Subheading?: string;
  heroImage: string;
  heroImageAlt: string;
  heroCtaText: string;
  aboutHeading: string;
  aboutSubheading: string;
  aboutImage: string;
  aboutImageAlt: string;
  aboutExperience: string;
  aboutCard1Title?: string;
  aboutCard1Desc?: string;
  aboutCard2Title?: string;
  aboutCard2Desc?: string;
  aboutCard3Title?: string;
  aboutCard3Desc?: string;
  whyChooseBadge: string;
  whyChooseHeading: string;
  relyBadge: string;
  relyHeading: string;
  relyImage: string;
  relyButtonText: string;
  callbackHeading: string;
  callbackSubheading: string;
  callbackBgImage: string;
  callbackSupportImage: string;
  callbackButtonText: string;
  reviewsBadge: string;
  reviewsHeading: string;
  processBadge: string;
  processHeading: string;
  [key: string]: any;
}

export interface AboutContent {
  heroHeading: string;
  heroSubheading: string;
  heroImage: string;
  aboutImage?: string;
  heroImageAlt: string;
  sectionTag?: string;
  overviewHeading: string;
  overviewText: string;
  experienceYears?: string;
  experienceTitle?: string;
  experienceSubtitle?: string;
  trustHeading?: string;
  highlightsJson?: string;
  ehsHeading: string;
  ehsText: string;
  ehsImage: string;
  processBadge?: string;
  processHeading: string;
  processSubheading: string;
  processStepsJson?: string;
  residentialBadge?: string;
  residentialHeading: string;
  residentialSubheading: string;
  faqBadge?: string;
  faqHeading: string;
  faqSubheading: string;
  faqsJson?: string;
}

export interface ServicesContent {
  heroHeading: string;
  heroSubheading: string;
  heroImage: string;
  heroImageAlt: string;
  servicesHeading: string;
  servicesSubheading: string;
}

export interface ProjectsContent {
  heroHeading: string;
  heroSubheading: string;
  heroImage: string;
  heroImageAlt: string;
  portfolioHeading: string;
  portfolioSubheading: string;
}

export interface BlogContent {
  heroHeading: string;
  heroSubheading: string;
  heroImage: string;
  heroImageAlt: string;
  blogHeading: string;
  blogSubheading: string;
}

export interface ContactContent {
  heroHeading: string;
  heroSubheading: string;
  heroImage: string;
  heroImageAlt: string;
  contactAddress: string;
  contactPhone: string;
  contactEmail: string;
  contactHours: string;
}

export type CmsContentUnion =
  | SiteContent
  | HomeContent
  | AboutContent
  | ServicesContent
  | ProjectsContent
  | BlogContent
  | ContactContent;

export interface PageCmsData {
  content: CmsContentUnion;
  seo: PageSeo;
}

export interface CmsDatabase {
  site: { content: SiteContent; seo: PageSeo };
  home: { content: HomeContent; seo: PageSeo };
  about: { content: AboutContent; seo: PageSeo };
  services: { content: ServicesContent; seo: PageSeo };
  projects: { content: ProjectsContent; seo: PageSeo };
  blog: { content: BlogContent; seo: PageSeo };
  contact: { content: ContactContent; seo: PageSeo };
}

export const initialCmsData: CmsDatabase = {
  site: {
    content: {
      siteLogo: "/images/logo.webp",
      footerLogo: "/images/logo.webp",
      companyName: "UA ENGINEERING PTE. LTD.",
      welcomeMessage: "Welcome to",
      phone: "+65 8459 3003",
      email: "Info@uaengineering.com.sg",
      address: "38C Sea Avenue Marine Mansion Singapore 424256",
      workingHours: "Mon - Sat: 9:00 AM - 6:00 PM (Emergency 24/7 Support)",
      appointmentButtonText: "Book An Appointment",
      footerAboutText: "Professional engineering, renovation, waterproofing, and steel fabrication solutions in Singapore. Licensed, certified, and compliant with BCA standards.",
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
      youtube: "https://youtube.com",
      whatsapp: "https://wa.me/6584593003",
    },
    seo: {
      metaTitle: "UA Engineering PTE. LTD. | Singapore Engineering & Renovation",
      metaDescription: "UA Engineering PTE. LTD. provides renovation, waterproofing, steel works, roofing, electrical, plumbing, aircon, aluminium glazing and maintenance services across Singapore.",
      metaKeywords: "UA Engineering, Singapore Renovation, Waterproofing Singapore",
      schemaJson: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "UA Engineering Pte Ltd"
      }, null, 2)
    }
  },
  home: {
    content: {
      heroHeading: "From Renovation to Painting, Roofing, Electrical, Plumbing and Steel Works.",
      heroSubheading: "We handle it all with expertise, reliability, and guaranteed quality.",
      heroSlide1Heading: "From Renovation to Painting, Roofing, Electrical, Plumbing and Steel Works.",
      heroSlide1Subheading: "We handle it all with expertise, reliability, and guaranteed quality.",
      heroSlide2Heading: "Everything Your Property Needs. One Trusted Engineering Team.",
      heroSlide2Subheading: "From renovations and reinstatement to electrical, plumbing, painting, roofing, steel fabrication, waterproofing, and maintenance - we handle every project with precision and professionalism.",
      heroSlide3Heading: "Fresh Paint. Lasting Protection. Stunning Results.",
      heroSlide3Subheading: "Interior and exterior painting services that enhance appearance, protect surfaces, and increase the value of your property.",
      heroSlide4Heading: "Roof Problems? We Fix Them Before They Cost You More.",
      heroSlide4Subheading: "Professional roof repairs, waterproofing, leak prevention, and complete roofing solutions to keep your property safe in every season.",
      heroSlide5Heading: "Safe, Reliable Electrical Solutions for Every Building",
      heroSlide5Subheading: "From new installations and rewiring to troubleshooting and upgrades, we deliver electrical work that keeps your property running safely.",
      heroSlide6Heading: "Professional Plumbing Services Without the Hassle",
      heroSlide6Subheading: "Leak repairs, pipe replacement, drainage solutions, sanitary installations, and preventive maintenance-all completed with quality workmanship.",
      heroSlide7Heading: "Custom Steel Fabrication Built for Strength & Precision",
      heroSlide7Subheading: "We design, fabricate, and install steel structures, staircases, platforms, railings, and custom metal works for commercial and industrial projects.",
      heroImage: "/images/home/hero/hero-bg.png",
      heroImageAlt: "UA Engineering Renovation and Steel Fabrications Banner",
      heroCtaText: "Book An Appointment",
      aboutHeading: "Your Trusted Partner for High Quality Renovation & Upgrading Services.",
      aboutSubheading: "At UA ENGINEERING PTE. LTD. we deliver reliable Renovation & Upgrading solutions grounded in integrity, expertise, and precision. Our team ensures every project meets high standards of safety, durability, and quality workmanship.",
      aboutImage: "/images/home/about/about-main.jpg",
      aboutImageAlt: "UA Engineering Upgrading Worksite Inspections Team",
      aboutExperience: "15",
      aboutCard1Title: "BCA Certified Company",
      aboutCard1Desc: "Meeting standards with quality workmanship, compliance, and professional practices.",
      aboutCard2Title: "Skilled & Certified Workforce",
      aboutCard2Desc: "Experienced professionals delivering quality work with precision, reliability, and attention.",
      aboutCard3Title: "Competitive & Transparent Pricing",
      aboutCard3Desc: "Fair, upfront pricing with detailed quotations and no hidden costs or unexpected charges.",
      whyChooseBadge: "UA ADVANTAGE",
      whyChooseHeading: "Why Choose UA Engineering?",
      whyCard1Title: "Complete Building Solutions",
      whyCard1Desc: "From renovation and structural works to M&E, glazing, waterproofing, and solar, one trusted team handles every project.",
      whyCard2Title: "Quality Workmanship",
      whyCard2Desc: "Every project is completed with skilled workmanship, quality materials, and attention to detail for lasting performance.",
      whyCard3Title: "Honest & Transparent Pricing",
      whyCard3Desc: "Clear quotations, fair pricing, and no hidden costs, so you can plan your project with confidence.",
      whyCard4Title: "Reliable Project Management",
      whyCard4Desc: "We coordinate every stage efficiently, keeping projects organized, on schedule, and completed to high standards.",
      issue1Title: "Multiple Contractors to Manage",
      issue1Desc: "Hiring separate contractors often leads to delays, communication gaps, and inconsistent workmanship across different stages of the project.",
      issue2Title: "Poor Workmanship",
      issue2Desc: "Low-quality materials and rushed installation can result in recurring repairs, higher maintenance costs, and reduced durability.",
      issue3Title: "Unclear Pricing",
      issue3Desc: "Unexpected charges and incomplete quotations can increase project costs and create unnecessary stress during construction.",
      issue4Title: "Delays & Poor Communication",
      issue4Desc: "Lack of planning and communication often causes missed deadlines, project disruptions, and uncertainty throughout the construction process.",
      relyBadge: "RELIABILITY & TRUST",
      relyHeading: "Why Do You Rely On Us?",
      relyImage: "/images/home/rely/rely-main.png",
      relyButtonText: "Talk to an Expert",
      relyFeature1Title: "Honest & Transparent Pricing",
      relyFeature1Desc: "Receive clear, detailed quotations with fair pricing and no hidden costs, so you know exactly what to expect before work begins.",
      relyFeature2Title: "Quality Work That Lasts",
      relyFeature2Desc: "We focus on quality materials, skilled workmanship, and proper installation to deliver durable solutions you can depend on for years.",
      relyFeature3Title: "Reliable Service, Every Step",
      relyFeature3Desc: "From the first site visit to project handover, we keep you informed, stay on schedule, and ensure a smooth experience.",
      callbackHeading: "Let Us Call You",
      callbackSubheading: "Need help now? Send a few details - we'll call you shortly.",
      callbackBgImage: "/images/home/call/callback-bg.png",
      callbackSupportImage: "/images/home/call/call-support.png",
      callbackButtonText: "Submit Now",
      reviewsBadge: "CLIENT TESTIMONIALS",
      reviewsHeading: "What Our Clients Say About UA Engineering",
      processBadge: "HOW IT WORKS",
      processHeading: "Our Simple & Transparent Work Process",
      processSubheading: "From site inspection and quotation to professional installation and project handover, we ensure quality, transparency, and customer satisfaction at every stage.",
      processStep1Title: "Free Consultation & Site Visit",
      processStep1Desc: "We assess your requirements, inspect the site, discuss solutions, and understand your project goals.",
      processStep1Image: "/images/home/process/assessment.png",
      processStep2Title: "Quotation & Project Planning",
      processStep2Desc: "Provide a detailed quotation, project scope, material recommendations, timeline, and execution plan with transparent pricing.",
      processStep2Image: "/images/home/process/planning.png",
      processStep3Title: "Professional Execution",
      processStep3Desc: "Our skilled team completes every project using quality materials, safe practices, and strict workmanship standards.",
      processStep3Image: "/images/home/process/execution.png",
      processStep4Title: "Final Inspection & Handover",
      processStep4Desc: "We conduct final quality checks, ensure everything meets expectations, and hand over your completed project with confidence.",
      processStep4Image: "/images/home/process/handover.png"
    },
    seo: {
      metaTitle: "UA Engineering PTE. LTD. | Singapore Engineering & Renovation",
      metaDescription: "UA Engineering PTE. LTD. provides renovation, waterproofing, steel works, roofing, electrical, plumbing, aircon, aluminium glazing and maintenance services across Singapore.",
      metaKeywords: "UA Engineering, Singapore Renovation, Waterproofing Singapore, Roof Extension, Steel Works, Electrical Services, Plumbing Services, Aircon Repair, Aluminium Works, Engineering Company Singapore",
      schemaJson: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "UA Engineering Pte Ltd",
        "image": "https://ua-engineering.com/images/logo.png",
        address: {
          "@type": "PostalAddress",
          "streetAddress": "38C Sea Avenue Marine Mansion",
          "addressLocality": "Singapore",
          "postalCode": "424256"
        },
        "telephone": "+65 8459 3003"
      }, null, 2),
    },
  },
  about: {
    content: {
      heroHeading: "About UA Engineering",
      heroSubheading: "A dedicated team of licensed professional engineers and certified EHS compliance officers delivering high-quality construction works.",
      heroImage: "/images/layout/about-bg.png",
      aboutImage: "/images/home/about/about-main.jpg",
      heroImageAlt: "UA Engineering Commercial Facility Builders",
      sectionTag: "About Our Company",
      overviewHeading: "Why Choose UA Engineering For Renovation & Upgrading Services in Singapore",
      overviewText: "Looking for a dependable renovation and upgrading contractor in Singapore? UA ENGINEERING PTE. LTD. provides renovation, construction, and engineering services for HDB, BTO, condos, landed homes, commercial, and industrial properties.",
      experienceYears: "15",
      experienceTitle: "Years of Excellence",
      experienceSubtitle: "Renovation & Upgrading Services",
      trustHeading: "Why Property Owners Trust UA Engineering",
      highlightsJson: JSON.stringify([
        { text: "15+ Years of Industry Experience", icon: "Clock" },
        { text: "Highly Skilled & Certified Workers", icon: "Wrench" },
        { text: "BCA & HDB Compliant Workmanship", icon: "Award" },
        { text: "Transparent & Competitive Pricing", icon: "DollarSign" },
        { text: "Premium Quality Materials", icon: "ShieldCheck" },
        { text: "Safety-First Construction Practices", icon: "ShieldCheck" },
        { text: "On-Time Project Completion", icon: "Clock" },
        { text: "100% Commitment to Client Satisfaction", icon: "ThumbsUp" }
      ]),
      ehsHeading: "EHS Safety Policy & Environmental Compliance",
      ehsText: "We maintain a Zero-Accident policy across all site operations. Our EHS compliance officers inspect structural rigs, high-voltage lines, and confined space setups daily to protect our workers and clients.",
      ehsImage: "/images/home/about/about-main.jpg",
      processBadge: "HOW WE WORK",
      processHeading: "Our Process",
      processSubheading: "Every successful renovation begins with proper planning and professional execution. At UA Engineering, we follow a proven project management process that ensures efficiency, quality, and complete customer confidence from the initial consultation through project completion.",
      processStepsJson: JSON.stringify([
        {
          id: 1,
          tag: "STEP 01",
          title: "Consultation & Site Assessment",
          description: "We discuss your renovation goals, inspect the property, take accurate measurements, assess technical requirements, and recommend practical solutions to develop a clear and efficient project plan.",
          milestones: [
            "Free consultation and site inspection",
            "Detailed technical assessment",
            "Structural and feasibility evaluation",
            "Accurate measurements"
          ]
        },
        {
          id: 2,
          tag: "STEP 02",
          title: "Proposal & Project Planning",
          description: "We prepare a transparent quotation covering scope, materials, pricing, and timeline. After approval, we organise resources, scheduling, and project planning for smooth execution.",
          milestones: [
            "Detailed itemised quotation",
            "Transparent pricing",
            "Material recommendations",
            "Project scheduling"
          ]
        },
        {
          id: 3,
          tag: "STEP 03",
          title: "Professional Execution & Quality Control",
          description: "Our skilled team completes every project safely under experienced supervision, following BCA and HDB standards while maintaining strict quality control throughout every stage.",
          milestones: [
            "Experienced project supervisors",
            "Certified skilled workers",
            "Premium construction materials",
            "Continuous quality inspections"
          ]
        },
        {
          id: 4,
          tag: "STEP 04",
          title: "Completion, Handover & After-Sales Support",
          description: "After final inspections and site cleaning, we hand over the completed project with warranty information, maintenance guidance, and responsive after-sales support for your peace of mind.",
          milestones: [
            "Final quality inspection",
            "Complete project walkthrough",
            "Site cleaning and finishing",
            "Warranty documentation"
          ]
        }
      ]),
      residentialBadge: "WHAT WE DO",
      residentialHeading: "Complete Renovation, Engineering & Property Improvement Services",
      residentialSubheading: "UA Engineering provides complete renovation, structural, waterproofing, electrical, plumbing, aluminium, and solar panel solutions for residential, commercial, and industrial properties across Singapore.",
      faqBadge: "FAQ'S",
      faqHeading: "FAQ's: Looking for Answers?",
      faqSubheading: "Find expert answers to common questions about our renovation, construction, and handyman services in Singapore.",
      faqsJson: JSON.stringify([
        {
          question: "How long has UA Engineering PTE. LTD. been serving Singapore?",
          answer: "UA Engineering PTE. LTD. has been a trusted contractor in Singapore's renovation and engineering industry for over 15 years. Over the years, we've built a strong reputation for delivering high-quality renovation, partition, waterproofing, and structural upgrades for residential, commercial, and industrial properties."
        },
        {
          question: "What sets UA Engineering apart from other contractors in Singapore?",
          answer: "What sets us apart is our professional specialization, certified engineering teams (such as EMA-certified electricians), transparency in quoting, and adherence to Singapore building safety guidelines (HDB/BCA). We provide turnkey project execution from minor handyman repairs to full landed house addition & alteration (A&A)."
        },
        {
          question: "Do you offer free site inspections and consultations?",
          answer: "Yes, we believe in empowering our clients with the information they need to make informed decisions. We offer free, no-obligation site assessments and detailed consultations. This allows us to inspect your property (e.g., for roof leakages or renovation layout plans) and provide a transparent, upfront quotation."
        },
        {
          question: "How do you ensure safety and quality control on site?",
          answer: "Safety is our absolute priority and is non-negotiable. We strictly follow Workplace Safety and Health (WSH) guidelines on all project sites. Our teams are equipped with certified personal protective equipment (PPE) and undergo regular risk assessments. For quality control, we utilize premium, Singapore-certified materials and conduct strict supervision at every project phase."
        }
      ])
    },
    seo: {
      metaTitle: "About Us | UA Engineering PTE. LTD.",
      metaDescription: "Learn more about UA Engineering's team, licensed professional engineers, safety track record, and commercial construction capability in Singapore.",
      metaKeywords: "about UA engineering, site engineers Singapore, certified contractors Singapore, BCA registered contractor",
      schemaJson: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "name": "About UA Engineering Pte Ltd"
      }, null, 2),
    },
  },
  services: {
    content: {
      heroHeading: "Our Engineering Services",
      heroSubheading: "Professional solutions covering plumbing, substation electrical networks, waterproofing membranes, drywall, tiling, hacking, and solar panels.",
      heroImage: "/images/services/services-bg.jpg",
      heroImageAlt: "UA Engineering Substation Electrical Rewiring Grid",
      servicesHeading: "Singapore Building and Construction Capability",
      servicesSubheading: "We handle commercial, industrial, and residential upgrades. All works are certified by BCA registered professional engineers.",
    },
    seo: {
      metaTitle: "Our Services | Substation Electrical, Plumbing, Waterproofing",
      metaDescription: "Explore our commercial and industrial services in Singapore. We specialize in plumbing layout, substation electrical grids, concrete hacking, and solar roof setups.",
      metaKeywords: "substation electrical works, commercial plumbing Singapore, industrial concrete demolition, commercial solar array",
      schemaJson: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service"
      }, null, 2),
    },
  },
  projects: {
    content: {
      heroHeading: "Our Completed Projects",
      heroSubheading: "A catalog of successfully delivered commercial, retail, and residential projects reflecting structural engineering precision and quality.",
      heroImage: "/images/projects/projects-bg.jpg",
      heroImageAlt: "UA Engineering Commercial Drywall Alteration Project",
      portfolioHeading: "Featured Engineering Contracts",
      portfolioSubheading: "Review our portfolio of successfully delivered projects in Singapore, including shopping mall drywalls, substation setups, and waterproofing flat roofs.",
    },
    seo: {
      metaTitle: "Completed Projects | UA Engineering Portfolio",
      metaDescription: "Review our portfolio of successfully delivered projects in Singapore, including shopping mall drywalls, substation setups, and waterproofing flat roofs.",
      metaKeywords: "engineering portfolio Singapore, substation works Singapore, commercial plumbing project, solar roof layout",
      schemaJson: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CollectionPage"
      }, null, 2),
    },
  },
  blog: {
    content: {
      heroHeading: "Engineering & Safety Resources",
      heroSubheading: "Professional insights, building codes, EHS checklists, and tips on flat roof waterproofing and electrical safety upgrades in HDBs.",
      heroImage: "/images/blog/blog-bg.jpg",
      heroImageAlt: "UA Engineering BTO Renovation Checklist Documents",
      blogHeading: "Latest Insights & Field Manuals",
      blogSubheading: "Stay up-to-date with Singapore BCA and HDB guidelines. Our registered engineers share field checklists, tips, and safety articles.",
    },
    seo: {
      metaTitle: "Blog & Engineering Resources | UA Engineering",
      metaDescription: "Read the latest engineering articles, safety tips, BTO renovation rules, and electrical rewiring checklists written by our expert engineers.",
      metaKeywords: "engineering blog, BTO renovation tips, electrical safety HDB, Singapore building code audit",
      schemaJson: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Blog"
      }, null, 2),
    },
  },
  contact: {
    content: {
      heroHeading: "Contact UA Engineering",
      heroSubheading: "Get in touch for commercial quotations, structural surveys, emergency substation audits, or custom plumbing design layout consultations.",
      heroImage: "/images/contact/contact-bg.jpg",
      heroImageAlt: "UA Engineering Singapore Customer Support Center",
      contactAddress: "38C Sea Avenue Marine Mansion Singapore 424256",
      contactPhone: "+65 8459 3003",
      contactEmail: "Info@uaengineering.com.sg",
      contactHours: "Mon - Sat: 9:00 AM - 6:00 PM (Emergency 24/7 Support)",
    },
    seo: {
      metaTitle: "Contact Us | UA Engineering PTE. LTD.",
      metaDescription: "Request a callback or quotation from UA Engineering Singapore. Visit our office, email us, or call for immediate high-voltage substation checks.",
      metaKeywords: "contact UA engineering, Singapore engineer inspection, substation maintenance quotation",
      schemaJson: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ContactPage"
      }, null, 2),
    },
  },
};
