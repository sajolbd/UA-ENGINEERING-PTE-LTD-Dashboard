"use client";
import { API_BASE, getImageUrl } from "../lib/api";

import React, { useState, useEffect } from "react";
import {
  FileText,
  Globe,
  Save,
  CheckCircle,
  AlertCircle,
  Database,
  Code,
  Sliders,
  Image as ImageIcon
} from "lucide-react";
import {
  CmsDatabase,
  PageSeo,
  CmsContentUnion
} from "../data/cmsData";

interface CmsFormsProps {
  activeTab: string;
  cmsData: CmsDatabase;
  onUpdateCmsData: (
    pageId: keyof CmsDatabase,
    formType: "content" | "seo",
    data: CmsContentUnion | PageSeo
  ) => Promise<boolean>;
  onSeedPageData: (pageId: keyof CmsDatabase) => void;
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
    <div className="flex flex-col space-y-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-300 w-full">
      {/* Field Label & Type Badge */}
      <div className="flex items-center justify-between gap-2">
        <label className="text-xs font-black uppercase tracking-wider text-slate-700 truncate">
          {label}
        </label>
        {value && (
          <span className={`text-[9px] font-black uppercase px-2.5 py-1 rounded-full shrink-0 ${
            isBase64 ? "bg-emerald-100 text-emerald-800 border border-emerald-200" : isUploaded ? "bg-blue-100 text-blue-800 border border-blue-200" : "bg-slate-100 text-slate-700 border border-slate-200"
          }`}>
            {isBase64 ? "⚡ DB Direct Base64" : isUploaded ? "🌐 DB Uploaded API" : "📁 Local Asset"}
          </span>
        )}
      </div>

      {/* Large Framed Live Image Preview Box */}
      {value ? (
        <div className={`relative group w-full h-48 rounded-xl border border-slate-200/80 overflow-hidden shadow-inner transition-colors duration-300 ${
          darkPreview ? "bg-slate-950 text-white" : "bg-slate-50 text-slate-800"
        }`}>
          {/* Background grid pattern for transparency */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:12px_12px]" />
          
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

          {/* Quick Floating Controls (Dark/Light Canvas Toggle, Crop/Contain Toggle, Clear Button) */}
          <div className="absolute top-2 right-2 z-20 flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
            <button
              type="button"
              onClick={() => setDarkPreview(!darkPreview)}
              className="text-[10px] font-bold bg-slate-900/80 hover:bg-slate-900 text-white backdrop-blur px-2 py-1 rounded-lg border border-white/20 transition shadow-sm"
              title="Toggle Dark / Light canvas background for transparent white logos"
            >
              {darkPreview ? "☀️ Light Bg" : "🌙 Dark Bg"}
            </button>

            <button
              type="button"
              onClick={() => setFitContain(!fitContain)}
              className="text-[10px] font-bold bg-slate-900/80 hover:bg-slate-900 text-white backdrop-blur px-2 py-1 rounded-lg border border-white/20 transition shadow-sm"
              title="Toggle Contain (full view) or Cover (fill frame)"
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

          <div className="absolute bottom-2 left-2 z-20">
            <span className="text-[9px] font-bold bg-black/60 text-white backdrop-blur px-2 py-0.5 rounded uppercase tracking-wider">
              Live Preview
            </span>
          </div>
        </div>
      ) : (
        <div className="w-full h-24 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50 flex flex-col items-center justify-center text-slate-400 p-4 text-center">
          <span className="text-xs font-bold">No image selected</span>
          <span className="text-[10px] text-slate-400 mt-1">Upload a file or enter an image URL below</span>
        </div>
      )}
      
      {/* Path / URL Input Box */}
      <div className="w-full">
        <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-xl focus-within:border-primary focus-within:ring-1 focus-within:ring-primary overflow-hidden transition-all duration-300">
          <span className="pl-3 text-slate-400 text-xs font-mono font-bold select-none">URL</span>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="/images/logo.png or https://... or data:image/..."
            className="w-full px-3 py-2.5 text-xs outline-none bg-slate-900 text-white font-mono font-medium border-none focus:ring-0 placeholder:text-slate-500"
          />
        </div>
      </div>

      {/* Action Buttons Grid (Upload Server API & Save Base64 DB) */}
      <div className="grid grid-cols-2 gap-2 w-full pt-1">
        <label className="cursor-pointer inline-flex items-center justify-center px-3 py-2 bg-slate-900 hover:bg-primary text-white text-xs font-bold rounded-xl transition-all duration-200 shadow-sm hover:shadow text-center select-none">
          {uploading ? "Uploading..." : "📤 Upload File"}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
            className="hidden"
          />
        </label>

        <label className="cursor-pointer inline-flex items-center justify-center px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all duration-200 shadow-sm hover:shadow text-center select-none" title="Save image directly inside Database document">
          ⚡ Save as Base64 (DB)
          <input
            type="file"
            accept="image/*"
            onChange={handleBase64Convert}
            className="hidden"
          />
        </label>
      </div>

      {error && <span className="text-[10px] font-bold text-red-600 block mt-1">{error}</span>}
    </div>
  );
}

const DEFAULT_HERO_SLIDES: Record<number, { heading: string; subheading: string }> = {
  1: {
    heading: "From Renovation to Painting, Roofing, Electrical, Plumbing and Steel Works.",
    subheading: "We handle it all with expertise, reliability, and guaranteed quality.",
  },
  2: {
    heading: "Everything Your Property Needs. One Trusted Engineering Team.",
    subheading: "From renovations and reinstatement to electrical, plumbing, painting, roofing, steel fabrication, waterproofing, and maintenance - we handle every project with precision and professionalism.",
  },
  3: {
    heading: "Fresh Paint. Lasting Protection. Stunning Results.",
    subheading: "Interior and exterior painting services that enhance appearance, protect surfaces, and increase the value of your property.",
  },
  4: {
    heading: "Roof Problems? We Fix Them Before They Cost You More.",
    subheading: "Professional roof repairs, waterproofing, leak prevention, and complete roofing solutions to keep your property safe in every season.",
  },
  5: {
    heading: "Safe, Reliable Electrical Solutions for Every Building",
    subheading: "From new installations and rewiring to troubleshooting and upgrades, we deliver electrical work that keeps your property running safely.",
  },
  6: {
    heading: "Professional Plumbing Services Without the Hassle",
    subheading: "Leak repairs, pipe replacement, drainage solutions, sanitary installations, and preventive maintenance-all completed with quality workmanship.",
  },
  7: {
    heading: "Custom Steel Fabrication Built for Strength & Precision",
    subheading: "We design, fabricate, and install steel structures, staircases, platforms, railings, and custom metal works for commercial and industrial projects.",
  },
};

const DEFAULT_PAGE_CONTENT: Record<string, Record<string, string>> = {
  home: {
    heroHeading: "From Renovation to Painting, Roofing, Electrical, Plumbing and Steel Works.",
    heroSubheading: "We handle it all with expertise, reliability, and guaranteed quality.",
    heroCtaText: "Book An Appointment",
    heroImage: "/images/home/hero/hero-bg.png",
    heroImageAlt: "UA Engineering Renovation and Steel Fabrications Banner",
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
    processStep4Image: "/images/home/process/handover.png",
    testimonialBadge: "TESTIMONIALS",
    testimonialHeading: "Hear out From our clients",
    testimonialSubheading: "See what our clients has to say about our services and experience.",
    testimonial1Name: "Marcus Tan",
    testimonial1Role: "Property Manager, CapitaLand",
    testimonial1Project: "Commercial Waterproofing",
    testimonial1Quote: "UA Engineering did an outstanding job waterproofing our commercial facade and basement. Excellent workmanship, clean execution, and no water leaks since completion!",
    testimonial1Thumbnail: "/images/home/projects/project-waterproofing.png",
    testimonial1VideoId: "A2y8jK-iGSw",
    testimonial2Name: "Sarah Lim",
    testimonial2Role: "Homeowner, Sentosa Cove",
    testimonial2Project: "Premium Renovation & Fit-out",
    testimonial2Quote: "Their attention to detail during our home renovation was exceptional. From hacking to false ceiling installation, they delivered premium quality on schedule.",
    testimonial2Thumbnail: "/images/home/projects/project-drywall.png",
    testimonial2VideoId: "G5-o475Xz1Y",
    testimonial3Name: "David Hendricks",
    testimonial3Role: "Facilities Director, Jurong Hub",
    testimonial3Project: "Industrial Electrical Upgrade",
    testimonial3Quote: "Superb coordination and safety protocol adherence during our substation electrical works. The project was completed efficiently and complied with all regulations.",
    testimonial3Thumbnail: "/images/home/projects/project-electrical.png",
    testimonial3VideoId: "yY19i3889p4",
  },
  about: {
    heroHeading: "About UA Engineering",
    heroSubheading: "A dedicated team of licensed professional engineers and certified EHS compliance officers delivering high-quality construction works.",
    heroImage: "/images/layout/about-bg.png",
    heroImageAlt: "UA Engineering Commercial Facility Builders",
    overviewHeading: "Company History & Core Values",
    overviewText: "Founded in Singapore, UA Engineering has grown into a leading contractor offering mechanical, electrical, plumbing, waterproofing, and steel fabrication works. Integrity, safety, and client satisfaction drive our operations.",
    ehsHeading: "EHS Safety Policy & Environmental Compliance",
    ehsText: "We maintain a Zero-Accident policy across all site operations. Our EHS compliance officers inspect structural rigs, high-voltage lines, and confined space setups daily to protect our workers and clients.",
    ehsImage: "/images/home/about/about-main.jpg",
    processHeading: "Our Engineering Process",
    processSubheading: "From initial consultation to project completion, we follow standard safety guidelines.",
    faqHeading: "Frequently Asked Questions",
    faqSubheading: "Got questions about our engineering & renovation services in Singapore?",
    residentialHeading: "Residential Renovation & Upgrading Capability",
    residentialSubheading: "Providing HDB, Condominium, and Landed Home owners with certified renovation solutions.",
  },
  services: {
    heroHeading: "Our Engineering Services",
    heroSubheading: "Professional solutions covering plumbing, substation electrical networks, waterproofing membranes, drywall, tiling, hacking, and solar panels.",
    heroImage: "/images/services/services-bg.jpg",
    heroImageAlt: "UA Engineering Substation Electrical Rewiring Grid",
    servicesHeading: "Singapore Building and Construction Capability",
    servicesSubheading: "We handle commercial, industrial, and residential upgrades. All works are certified by BCA registered professional engineers.",
  },
  projects: {
    heroHeading: "Our Completed Projects",
    heroSubheading: "A catalog of successfully delivered commercial, retail, and residential projects reflecting structural engineering precision and quality.",
    heroImage: "/images/projects/projects-bg.jpg",
    heroImageAlt: "UA Engineering Commercial Drywall Alteration Project",
    portfolioHeading: "Featured Engineering Contracts",
    portfolioSubheading: "Review our portfolio of successfully delivered projects in Singapore, including shopping mall drywalls, substation setups, and waterproofing flat roofs.",
  },
  blog: {
    heroHeading: "Engineering & Safety Resources",
    heroSubheading: "Professional insights, building codes, EHS checklists, and tips on flat roof waterproofing and electrical safety upgrades in HDBs.",
    heroImage: "/images/blog/blog-bg.jpg",
    heroImageAlt: "UA Engineering BTO Renovation Checklist Documents",
    blogHeading: "Latest Insights & Field Manuals",
    blogSubheading: "Stay up-to-date with Singapore BCA and HDB guidelines. Our registered engineers share field checklists, tips, and safety articles.",
  },
  contact: {
    heroHeading: "Contact UA Engineering",
    heroSubheading: "Get in touch for commercial quotations, structural surveys, emergency substation audits, or custom plumbing design layout consultations.",
    heroImage: "/images/contact/contact-bg.jpg",
    heroImageAlt: "UA Engineering Singapore Customer Support Center",
    contactAddress: "10 Anson Road, Singapore 079903",
    contactPhone: "+65 9841 1786",
    contactEmail: "info@ua-engineering.com",
    contactHours: "Mon - Sat: 9:00 AM - 6:00 PM (Emergency 24/7 Support)",
  },
  site: {
    siteLogo: "/images/logo.png",
    footerLogo: "/images/footer-logo.png",
    companyName: "UA ENGINEERING PTE. LTD.",
    welcomeMessage: "Welcome to UA Engineering",
    phone: "+65 9841 1786",
    email: "hello.uaengineering@gmail.com",
    address: "10 Anson Road, Singapore 079903",
    workingHours: "Mon - Sat: 9:00 AM - 6:00 PM (Emergency 24/7 Support)",
    appointmentButtonText: "Book An Appointment",
    footerAboutText: "Professional engineering, renovation, waterproofing, and steel fabrication solutions in Singapore. Licensed, certified, and compliant with BCA standards.",
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    youtube: "https://youtube.com",
    whatsapp: "https://wa.me/6598411786",
  },
};

export default function CmsForms({
  activeTab,
  cmsData,
  onUpdateCmsData,
  onSeedPageData
}: CmsFormsProps) {
  const pageId = activeTab.split("_")[0] as keyof CmsDatabase;
  const [formType, setFormType] = useState<"content" | "seo">("content");

  const [localContent, setLocalContent] = useState<Record<string, any>>({});
  const [localSeo, setLocalSeo] = useState<PageSeo>({
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
    schemaJson: "",
  });

  const [saveSuccess, setSaveSuccess] = useState(false);
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [showPreviewJson, setShowPreviewJson] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailureModal, setShowFailureModal] = useState(false);
  const [previewSlide, setPreviewSlide] = useState(1);

  useEffect(() => {
    setSaveSuccess(false);
    setJsonError(null);
    if (!pageId || !cmsData[pageId]) return;

    const pageData = cmsData[pageId];
    const contentMap = { ...(pageData.content as unknown as Record<string, any>) };

    // Fill defaults for 7 Hero Sliders on Home Page
    if (pageId === "home") {
      [1, 2, 3, 4, 5, 6, 7].forEach((num) => {
        const hKey = `heroSlide${num}Heading`;
        const sKey = `heroSlide${num}Subheading`;
        if (!contentMap[hKey]) {
          contentMap[hKey] = DEFAULT_HERO_SLIDES[num].heading;
        }
        if (!contentMap[sKey]) {
          contentMap[sKey] = DEFAULT_HERO_SLIDES[num].subheading;
        }
      });
    }

    // Fill page section defaults if missing
    const pageDefaults = DEFAULT_PAGE_CONTENT[pageId] || {};
    Object.keys(pageDefaults).forEach((key) => {
      if (contentMap[key] === undefined || contentMap[key] === "") {
        contentMap[key] = pageDefaults[key];
      }
    });

    // Ensure testimonials array is initialized for home page
    if (pageId === "home") {
      if (!Array.isArray(contentMap.testimonials) || contentMap.testimonials.length === 0) {
        contentMap.testimonials = [
          {
            id: "1",
            name: contentMap.testimonial1Name || "Marcus Tan",
            role: contentMap.testimonial1Role || "Property Manager, CapitaLand",
            project: contentMap.testimonial1Project || "Commercial Waterproofing",
            quote: contentMap.testimonial1Quote || "UA Engineering did an outstanding job waterproofing our commercial facade and basement. Excellent workmanship, clean execution, and no water leaks since completion!",
            thumbnail: contentMap.testimonial1Thumbnail || "/images/home/projects/project-waterproofing.png",
            videoId: contentMap.testimonial1VideoId || "A2y8jK-iGSw",
          },
          {
            id: "2",
            name: contentMap.testimonial2Name || "Sarah Lim",
            role: contentMap.testimonial2Role || "Homeowner, Sentosa Cove",
            project: contentMap.testimonial2Project || "Premium Renovation & Fit-out",
            quote: contentMap.testimonial2Quote || "Their attention to detail during our home renovation was exceptional. From hacking to false ceiling installation, they delivered premium quality on schedule.",
            thumbnail: contentMap.testimonial2Thumbnail || "/images/home/projects/project-drywall.png",
            videoId: contentMap.testimonial2VideoId || "G5-o475Xz1Y",
          },
          {
            id: "3",
            name: contentMap.testimonial3Name || "David Hendricks",
            role: contentMap.testimonial3Role || "Facilities Director, Jurong Hub",
            project: contentMap.testimonial3Project || "Industrial Electrical Upgrade",
            quote: contentMap.testimonial3Quote || "Superb coordination and safety protocol adherence during our substation electrical works. The project was completed efficiently and complied with all regulations.",
            thumbnail: contentMap.testimonial3Thumbnail || "/images/home/projects/project-electrical.png",
            videoId: contentMap.testimonial3VideoId || "yY19i3889p4",
          },
        ];
      }

      if (!Array.isArray(contentMap.googleReviews) || contentMap.googleReviews.length === 0) {
        contentMap.googleReviews = [
          {
            id: "1",
            name: "Majidul Islam Majidul",
            time: "1 year ago",
            stars: 5,
            avatar: "/images/home/reviews/google-majidul.png",
            text: "UA Engineering workmanship and investigation of existing building leaking very good. They have done waterproofing leaking rectification work for The American Club Singapore so far no leaking last few weeks I monitoring. Thanks, UA Engineering team members and workers."
          },
          {
            id: "2",
            name: "Cyril Wood",
            time: "1 year ago",
            stars: 5,
            avatar: "/images/home/reviews/google-cyril.png",
            text: "The team at UA Engineering were very efficient. They worked well to do the job in an awkward place. Even repainted an area affected by water damage at no extra cost. I would recommend this service."
          },
          {
            "id": "3",
            name: "James Lim",
            time: "2 years ago",
            stars: 5,
            avatar: "/images/home/reviews/google-james.png",
            text: "Very good! Solved my problem which others cannot solve. Thank you! Highly recommended."
          },
          {
            "id": "4",
            name: "Eugene T",
            time: "2 years ago",
            stars: 5,
            avatar: "/images/home/reviews/google-eugene.png",
            text: "Engaged UA Engineering for my roof and RC waterproofing. The workers handled the works relatively well and were receptive to our inputs. They are responsive and returned on a few times when we noticed areas that the paint was not even. Overall, happy to recommend to ask for a quote if you are looking for good works at competitive rates."
          },
          {
            "id": "5",
            name: "Atik Tamim",
            time: "2 years ago",
            stars: 5,
            avatar: "/images/home/reviews/google-atik.png",
            text: "You saved my structure. Thanks for your quality work."
          },
          {
            "id": "6",
            name: "Yong Huat Ng",
            time: "2 years ago",
            stars: 5,
            avatar: "/images/home/reviews/google-yonghuat.png",
            text: "Willingness to listen, give no excuses, and very committed to doing a complete job is the key characteristics and strength of this vendor. As waterproofing can be a progressive trial process. This vendor response fast to feedback and comeback quickly to complete the coverage of the fixes. I am particularly impressed with the positive attitude of the lead worker. He is friendly, attentive, welcome feedback and committed to delivering a quality work (which he did). A vendor that I am very happy with and will recommend to anyone that need to have the waterproofing services."
          },
          {
            "id": "7",
            name: "Joo Goh",
            time: "3 years ago",
            stars: 5,
            avatar: "/images/home/reviews/google-joogoh.png",
            text: "Am very pleased with the work done by UA Engineering Pte Ltd few months back and no further leakage or mould were detected to date. The previous contractor (Flux Solutions Pte Ltd) was very unresponsive and rude to after sales service and I decided to terminate them in favour for UA Engineering. I hope UA Engineering will continue with its responsive after sales service that I've experienced and recommend this company after the bad experience I had with Flux Solutions."
          }
        ];
      }

      if (!Array.isArray(contentMap.regions) || contentMap.regions.length === 0) {
        contentMap.regions = [
          {
            name: "Central",
            areas: ["Orchard Road", "Marina Bay", "Bugis", "Raffles Place", "Tanjong Pagar", "Clarke Quay"]
          },
          {
            name: "East",
            areas: ["Bedok", "Tampines", "Pasir Ris", "Changi", "Marine Parade"]
          },
          {
            name: "West",
            areas: ["Jurong East", "Jurong West", "Bukit Batok", "Clementi", "Boon Lay"]
          },
          {
            name: "North",
            areas: ["Woodlands", "Yishun", "Sembawang", "Admiralty"]
          },
          {
            name: "North-East",
            areas: ["Hougang", "Punggol", "Sengkang", "Serangoon"]
          }
        ];
      }
    }

    setLocalContent(contentMap);
    setLocalSeo({
      metaTitle: pageData.seo?.metaTitle || "",
      metaDescription: pageData.seo?.metaDescription || "",
      metaKeywords: pageData.seo?.metaKeywords || "",
      schemaJson: pageData.seo?.schemaJson || "",
    });
  }, [pageId, cmsData]);

  const handleFieldChange = (field: string, value: any) => {
    setLocalContent((prev) => ({ ...prev, [field]: value }));
  };

  const handleSeoChange = (field: keyof PageSeo, value: string) => {
    setLocalSeo((prev) => ({ ...prev, [field]: value }));
    if (field === "schemaJson") {
      setJsonError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(false);

    let success = false;
    if (formType === "content") {
      success = await onUpdateCmsData(pageId, "content", localContent as unknown as CmsContentUnion);
    } else {
      if (localSeo.schemaJson.trim()) {
        try {
          JSON.parse(localSeo.schemaJson);
          setJsonError(null);
        } catch (err) {
          setJsonError((err as Error).message || "Invalid JSON syntax.");
          return;
        }
      }
      success = await onUpdateCmsData(pageId, "seo", localSeo);
    }

    if (success) {
      setSaveSuccess(true);
      setShowSuccessModal(true);
      setTimeout(() => {
        setSaveSuccess(false);
      }, 4000);
    } else {
      setShowFailureModal(true);
    }
  };

  if (!pageId || !cmsData[pageId]) return null;

  const pageDisplayName = pageId === "site" ? "GLOBAL SITE SETTINGS" : pageId.toUpperCase() + " PAGE";

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-fade-in">
      {/* CMS Form Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-white border border-slate-100 rounded-2xl shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary-light text-primary rounded-2xl border border-primary/5">
            {formType === "content" ? (
              <FileText className="w-6 h-6" />
            ) : (
              <Globe className="w-6 h-6" />
            )}
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
              {pageDisplayName} Configuration
            </span>
            <h3 className="text-lg font-black text-secondary font-display">
              {formType === "content" ? "Page Content & Sections Copy" : "SEO Meta Settings & Schema"}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowPreviewJson(!showPreviewJson)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl text-xs font-bold transition-all"
            title="Preview Config JSON"
          >
            <Code className="w-3.5 h-3.5" />
            <span>JSON Preview</span>
          </button>

          <button
            onClick={() => onSeedPageData(pageId)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary-light hover:bg-primary-light/80 text-primary border border-primary/10 rounded-xl text-xs font-bold transition-all duration-300"
          >
            <Database className="w-3.5 h-3.5" />
            <span>Load Presets</span>
          </button>
        </div>
      </div>

      {/* Tabs Toggles */}
      <div className="flex gap-2 p-1.5 bg-slate-100 rounded-2xl max-w-sm">
        <button
          onClick={() => setFormType("content")}
          className={`flex-1 py-2 text-center text-xs font-extrabold rounded-xl transition-all duration-300 ${
            formType === "content"
              ? "bg-primary text-white shadow-md"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          Section Content
        </button>
        <button
          onClick={() => setFormType("seo")}
          className={`flex-1 py-2 text-center text-xs font-extrabold rounded-xl transition-all duration-300 ${
            formType === "seo"
              ? "bg-primary text-white shadow-md"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          SEO & Schema.org
        </button>
      </div>

      {/* SAVE SUCCESS NOTIFICATION */}
      {saveSuccess && (
        <div className="flex items-center gap-3 p-4 bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-2xl shadow-sm animate-slide-up">
          <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
          <span className="text-xs font-bold">
            Changes saved successfully! Database and Website dynamic files updated.
          </span>
        </div>
      )}

      {/* JSON DATA PREVIEW SECTION */}
      {showPreviewJson && (
        <div className="p-5 bg-[#09101f] text-slate-300 border border-[#1b263e] rounded-2xl shadow-lg font-mono text-xs space-y-2">
          <div className="flex items-center justify-between text-[10px] text-slate-500 uppercase tracking-widest font-sans border-b border-[#1b263e] pb-2">
            <span>JSON Representation (Read Only)</span>
            <span className="text-accent">Live REST Sync</span>
          </div>
          <pre className="overflow-x-auto thin-scrollbar max-h-48 text-[11px] p-2 leading-relaxed">
            {JSON.stringify(cmsData[pageId][formType], null, 2)}
          </pre>
        </div>
      )}

      {/* --- ALWAYS-ON REAL-TIME LIVE WEBSITE PREVIEW PANEL --- */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-3 text-white animate-fade-in">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-200">
              {formType === "content" ? "Real-time Website Live Mockup Preview" : "Real-time Google SERP Search Snippet Live Preview"}
            </h4>
          </div>
          <span className="text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/30">
            {pageId.toUpperCase()} {formType.toUpperCase()} LIVE SYNC
          </span>
        </div>

        {formType === "content" ? (
          <div className="space-y-4 pt-1">
            {/* SITE GLOBAL SETTINGS PREVIEW */}
            {pageId === "site" && (
              <div className="space-y-3">
                {/* Mock Navbar */}
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={getImageUrl(localContent.siteLogo || "/images/logo.png")}
                      alt="Site Logo"
                      className="h-9 w-auto object-contain"
                      onError={(e) => { (e.target as HTMLImageElement).src = "/images/logo.png"; }}
                    />
                    <div>
                      <h5 className="text-xs font-black text-white">{localContent.companyName || "UA ENGINEERING PTE. LTD."}</h5>
                      <p className="text-[10px] text-slate-400 font-medium">{localContent.welcomeMessage || "Welcome to UA Engineering"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-300 font-semibold">
                    <span className="hidden sm:inline">📞 {localContent.phone || "+65 9841 1786"}</span>
                    <button type="button" className="px-3 py-1.5 bg-primary text-white font-bold rounded-xl text-xs shadow-sm">
                      {localContent.appointmentButtonText || "Book An Appointment"}
                    </button>
                  </div>
                </div>

                {/* Mock Footer */}
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center gap-3">
                    <img
                      src={getImageUrl(localContent.footerLogo || "/images/footer-logo.png")}
                      alt="Footer Logo"
                      className="h-8 w-auto object-contain"
                      onError={(e) => { (e.target as HTMLImageElement).src = "/images/footer-logo.png"; }}
                    />
                    <span className="text-xs font-bold text-slate-300">Footer Branding</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                    {localContent.footerAboutText || "Professional engineering, renovation, waterproofing, and steel fabrication solutions in Singapore."}
                  </p>
                  <div className="text-[10px] text-slate-500 font-mono pt-1">
                    📍 {localContent.address || "10 Anson Road, Singapore"} | ✉️ {localContent.email || "hello.uaengineering@gmail.com"}
                  </div>
                </div>
              </div>
            )}

            {/* HOME PAGE HERO & SECTIONS PREVIEW */}
            {pageId === "home" && (
              <div className="space-y-3">
                {/* Hero Banner Mockup with 7 Sliders Selector */}
                <div className="relative w-full h-[220px] sm:h-[250px] flex items-center justify-center overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-xl group">
                  <img
                    src={getImageUrl(localContent.heroImage || "/images/home/hero/hero-bg.png")}
                    alt="Hero Background"
                    className="absolute inset-0 w-full h-full object-cover opacity-50 transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => { (e.target as HTMLImageElement).src = "/images/footer-logo.png"; }}
                  />
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/40" />

                  <div className="relative z-10 p-4 max-w-xl text-center space-y-2">
                    <span className="text-[9px] font-extrabold uppercase bg-primary/90 text-white px-2.5 py-0.5 rounded-full tracking-wider">
                      Slide #{previewSlide}: {previewSlide === 1 ? "General & Renovation" : previewSlide === 2 ? "Engineering Team" : previewSlide === 3 ? "Painting" : previewSlide === 4 ? "Roof Repairs" : previewSlide === 5 ? "Electrical" : previewSlide === 6 ? "Plumbing" : "Steel Fabrication"}
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-white tracking-tight leading-snug">
                      {localContent[`heroSlide${previewSlide}Heading`] || (previewSlide === 1 ? localContent.heroHeading : `Hero Slide ${previewSlide} Title`) || "Hero Heading"}
                    </h3>
                    <p className="text-[11px] text-slate-200 line-clamp-2 font-medium">
                      {localContent[`heroSlide${previewSlide}Subheading`] || (previewSlide === 1 ? localContent.heroSubheading : `Hero Slide ${previewSlide} Description`) || "Hero Subheading"}
                    </p>
                  </div>

                  {/* Slider Quick Tabs Switcher inside mockup */}
                  <div className="absolute bottom-2 inset-x-2 z-20 flex justify-center gap-1 bg-black/60 backdrop-blur p-1 rounded-xl">
                    {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setPreviewSlide(num)}
                        className={`px-2 py-0.5 text-[9px] font-black rounded-lg transition-all ${
                          previewSlide === num ? "bg-primary text-white shadow" : "text-slate-400 hover:text-white"
                        }`}
                      >
                        Slide {num}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STATIC PAGE HERO & SECTIONS PREVIEW (about, services, projects, blog, contact) */}
            {pageId !== "site" && pageId !== "home" && (
              <div className="relative w-full h-[180px] sm:h-[220px] flex items-center justify-center overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-xl group">
                <img
                  src={getImageUrl(localContent.heroImage || "/images/layout/breadcrumb-bg.png")}
                  alt="Page Hero Background"
                  className="absolute inset-0 w-full h-full object-cover opacity-50 transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => { (e.target as HTMLImageElement).src = "/images/footer-logo.png"; }}
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/30" />

                <div className="relative z-10 border border-white/30 bg-black/50 backdrop-blur-md px-6 py-4 max-w-lg text-center rounded-xl shadow-2xl space-y-1">
                  <h3 className="text-base sm:text-lg font-black text-white tracking-tight uppercase leading-snug">
                    {localContent.heroHeading || `${pageId.toUpperCase()} PAGE HERO`}
                  </h3>
                  {localContent.heroSubheading && (
                    <p className="text-[11px] text-slate-300 line-clamp-2 font-medium">
                      {localContent.heroSubheading}
                    </p>
                  )}
                </div>

                <div className="absolute bottom-2 left-3 z-20">
                  <span className="text-[9px] font-extrabold bg-primary text-white px-2 py-0.5 rounded uppercase tracking-wider">
                    {pageId.toUpperCase()} PAGE LIVE BANNER
                  </span>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* SEO & SCHEMA GOOGLE SERP PREVIEW BOX */
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-blue-400"></span>
              <span>https://ua-engineering.com{pageId === "home" ? "" : `/${pageId}`}</span>
            </div>
            <h4 className="text-sm font-bold text-blue-400 hover:underline cursor-pointer line-clamp-1">
              {localSeo.metaTitle || localContent.heroHeading || `UA Engineering PTE. LTD. | ${pageId.toUpperCase()}`}
            </h4>
            <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed font-normal">
              {localSeo.metaDescription || localContent.heroSubheading || "Professional engineering, renovation, waterproofing, and steel fabrication solutions in Singapore."}
            </p>
            {localSeo.metaKeywords && (
              <div className="flex flex-wrap gap-1 pt-1">
                {localSeo.metaKeywords.split(",").map((kw, i) => (
                  <span key={i} className="text-[9px] bg-slate-900 text-slate-400 px-2 py-0.5 rounded border border-slate-800 font-mono">
                    {kw.trim()}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* EDITING FORM */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {formType === "content" ? (
            <div className="space-y-6">
              
              {/* --- SITE GLOBAL SETTINGS --- */}
              {pageId === "site" && (
                <div className="space-y-6">
                  <div className="space-y-4 border-b border-slate-100 pb-5">
                    <h4 className="text-xs font-extrabold uppercase tracking-widest text-primary border-l-2 border-primary pl-2 mb-2">
                      1. Brand Logos & Company Name
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <ImageUploadField
                        label="Header Navbar Logo"
                        value={localContent.siteLogo || ""}
                        onChange={(val) => handleFieldChange("siteLogo", val)}
                      />
                      <ImageUploadField
                        label="Footer Branding Logo"
                        value={localContent.footerLogo || ""}
                        onChange={(val) => handleFieldChange("footerLogo", val)}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                          Company Name
                        </label>
                        <input
                          type="text"
                          value={localContent.companyName || ""}
                          onChange={(e) => handleFieldChange("companyName", e.target.value)}
                          className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-900 text-white font-medium placeholder:text-slate-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                          Top Bar Welcome Message
                        </label>
                        <input
                          type="text"
                          value={localContent.welcomeMessage || ""}
                          onChange={(e) => handleFieldChange("welcomeMessage", e.target.value)}
                          className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-900 text-white font-medium placeholder:text-slate-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 border-b border-slate-100 pb-5">
                    <h4 className="text-xs font-extrabold uppercase tracking-widest text-primary border-l-2 border-primary pl-2 mb-2">
                      2. Global Contact Information
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                          Primary Phone Number
                        </label>
                        <input
                          type="text"
                          value={localContent.phone || ""}
                          onChange={(e) => handleFieldChange("phone", e.target.value)}
                          className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-900 text-white font-medium placeholder:text-slate-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                          Primary Email Address
                        </label>
                        <input
                          type="text"
                          value={localContent.email || ""}
                          onChange={(e) => handleFieldChange("email", e.target.value)}
                          className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-900 text-white font-medium font-mono text-xs placeholder:text-slate-500"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                          Office Physical Address
                        </label>
                        <input
                          type="text"
                          value={localContent.address || ""}
                          onChange={(e) => handleFieldChange("address", e.target.value)}
                          className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-900 text-white font-medium placeholder:text-slate-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                          Operating Hours
                        </label>
                        <input
                          type="text"
                          value={localContent.workingHours || ""}
                          onChange={(e) => handleFieldChange("workingHours", e.target.value)}
                          className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-900 text-white font-medium placeholder:text-slate-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 border-b border-slate-100 pb-5">
                    <h4 className="text-xs font-extrabold uppercase tracking-widest text-primary border-l-2 border-primary pl-2 mb-2">
                      3. Footer Description & CTA Buttons
                    </h4>
                    <div>
                      <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                        Header Appointment Button Label
                      </label>
                      <input
                        type="text"
                        value={localContent.appointmentButtonText || ""}
                        onChange={(e) => handleFieldChange("appointmentButtonText", e.target.value)}
                        className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-900 text-white font-medium placeholder:text-slate-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                        Footer About Paragraph
                      </label>
                      <textarea
                        rows={3}
                        value={localContent.footerAboutText || ""}
                        onChange={(e) => handleFieldChange("footerAboutText", e.target.value)}
                        className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-900 text-white font-medium resize-none placeholder:text-slate-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-xs font-extrabold uppercase tracking-widest text-primary border-l-2 border-primary pl-2 mb-2">
                      4. Social Media Links
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">Facebook URL</label>
                        <input
                          type="text"
                          value={localContent.facebook || ""}
                          onChange={(e) => handleFieldChange("facebook", e.target.value)}
                          className="w-full px-4 py-2 text-xs border border-slate-700 rounded-xl font-mono bg-slate-900 text-white placeholder:text-slate-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">Instagram URL</label>
                        <input
                          type="text"
                          value={localContent.instagram || ""}
                          onChange={(e) => handleFieldChange("instagram", e.target.value)}
                          className="w-full px-4 py-2 text-xs border border-slate-700 rounded-xl font-mono bg-slate-900 text-white placeholder:text-slate-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">LinkedIn URL</label>
                        <input
                          type="text"
                          value={localContent.linkedin || ""}
                          onChange={(e) => handleFieldChange("linkedin", e.target.value)}
                          className="w-full px-4 py-2 text-xs border border-slate-700 rounded-xl font-mono bg-slate-900 text-white placeholder:text-slate-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">WhatsApp Direct Link / Phone</label>
                        <input
                          type="text"
                          value={localContent.whatsapp || ""}
                          onChange={(e) => handleFieldChange("whatsapp", e.target.value)}
                          className="w-full px-4 py-2 text-xs border border-slate-700 rounded-xl font-mono bg-slate-900 text-white placeholder:text-slate-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* --- HERO SECTION FIELDS FOR PAGES --- */}
              {pageId !== "site" && (
                <div className="space-y-4 border-b border-slate-100 pb-5">
                  <h4 className="text-xs font-extrabold uppercase tracking-widest text-primary border-l-2 border-primary pl-2 mb-2">
                    1. Page Hero Banner Section
                  </h4>
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                      Hero Section Main Title / Heading
                    </label>
                    <input
                      type="text"
                      value={localContent.heroHeading || ""}
                      onChange={(e) => handleFieldChange("heroHeading", e.target.value)}
                      className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-900 text-white font-medium placeholder:text-slate-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                      Hero Section Subheading / Description
                    </label>
                    <textarea
                      rows={2}
                      value={localContent.heroSubheading || ""}
                      onChange={(e) => handleFieldChange("heroSubheading", e.target.value)}
                      className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-900 text-white font-medium resize-none placeholder:text-slate-500"
                    />
                  </div>
                  
                  {/* Hero Image upload */}
                  <ImageUploadField
                    label="Hero Section Background Image"
                    value={localContent.heroImage || ""}
                    onChange={(val) => handleFieldChange("heroImage", val)}
                  />

                  <div>
                    <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                      Hero Section Image Alt tag (for SEO compliance)
                    </label>
                    <input
                      type="text"
                      value={localContent.heroImageAlt || ""}
                      onChange={(e) => handleFieldChange("heroImageAlt", e.target.value)}
                      className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-900 text-white font-medium placeholder:text-slate-500"
                    />
                  </div>
                </div>
              )}

              {/* --- HOME HERO CAROUSEL SLIDERS EDITOR (7 SLIDERS) --- */}
              {pageId === "home" && (
                <div className="space-y-4 border-b border-slate-100 pb-5">
                  <h4 className="text-xs font-extrabold uppercase tracking-widest text-primary border-l-2 border-primary pl-2 mb-2">
                    1.1 Hero Carousel Sliders (7 Interactive Sliders Control)
                  </h4>
                  <p className="text-[11px] text-slate-400 font-medium pb-2">
                    Customize titles and descriptions for each of the 7 automatic rotating hero banner slides displayed on the website homepage.
                  </p>
                  <div className="space-y-4">
                    {[
                      { id: 1, title: "Slide 1: General & Renovation Services" },
                      { id: 2, title: "Slide 2: Comprehensive Engineering Team" },
                      { id: 3, title: "Slide 3: Painting & Surface Protection" },
                      { id: 4, title: "Slide 4: Roof Repairs & Waterproofing" },
                      { id: 5, title: "Slide 5: Electrical Solutions & Rewiring" },
                      { id: 6, title: "Slide 6: Plumbing & Sanitary Services" },
                      { id: 7, title: "Slide 7: Custom Steel Fabrication" },
                    ].map((slide) => {
                      const headingKey = `heroSlide${slide.id}Heading`;
                      const subheadingKey = `heroSlide${slide.id}Subheading`;
                      const bgKey = `heroSlide${slide.id}Bg`;
                      const slideDefault = DEFAULT_HERO_SLIDES[slide.id] || { heading: "", subheading: "" };
                      const headingVal = localContent[headingKey] !== undefined ? localContent[headingKey] : slideDefault.heading;
                      const subheadingVal = localContent[subheadingKey] !== undefined ? localContent[subheadingKey] : slideDefault.subheading;
                      const bgVal = localContent[bgKey] || localContent.heroImage || "/images/home/hero/hero-bg.png";

                      return (
                        <div key={slide.id} className="p-4 bg-slate-950/60 border border-slate-800 rounded-2xl space-y-3">
                          <span className="text-[10px] font-black uppercase text-primary tracking-wider">
                            {slide.title}
                          </span>
                          <div>
                            <ImageUploadField
                              label={`Slide ${slide.id} Background Image`}
                              value={bgVal}
                              onChange={(val) => handleFieldChange(bgKey, val)}
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">
                              Slide {slide.id} Main Title / Heading
                            </label>
                            <input
                              type="text"
                              value={headingVal}
                              onChange={(e) => handleFieldChange(headingKey, e.target.value)}
                              placeholder={`Enter main heading for slide ${slide.id}...`}
                              className="w-full px-4 py-2 text-xs border border-slate-700 rounded-xl focus:border-primary outline-none bg-slate-900 text-white font-medium"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">
                              Slide {slide.id} Subheading / Description
                            </label>
                            <textarea
                              rows={2}
                              value={subheadingVal}
                              onChange={(e) => handleFieldChange(subheadingKey, e.target.value)}
                              placeholder={`Enter description for slide ${slide.id}...`}
                              className="w-full px-4 py-2 text-xs border border-slate-700 rounded-xl focus:border-primary outline-none bg-slate-900 text-white font-medium resize-none"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* --- HOME PAGE SECTIONS --- */}
              {pageId === "home" && (
                <div className="space-y-6">
                  <div className="space-y-4 border-b border-slate-100 pb-5">
                    <h4 className="text-xs font-extrabold uppercase tracking-widest text-primary border-l-2 border-primary pl-2 mb-2">
                      2. Company Introduction / About Section
                    </h4>
                    <div>
                      <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                        About Title / Header
                      </label>
                      <input
                        type="text"
                        value={localContent.aboutHeading || ""}
                        onChange={(e) => handleFieldChange("aboutHeading", e.target.value)}
                        className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-900 text-white font-medium placeholder:text-slate-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                        About Detailed Narrative Description
                      </label>
                      <textarea
                        rows={3}
                        value={localContent.aboutSubheading || ""}
                        onChange={(e) => handleFieldChange("aboutSubheading", e.target.value)}
                        className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-900 text-white font-medium resize-none placeholder:text-slate-500"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <ImageUploadField
                        label="Featured Showcase Image"
                        value={localContent.aboutImage || ""}
                        onChange={(val) => handleFieldChange("aboutImage", val)}
                      />

                      <div>
                        <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                          Years of Experience Counter
                        </label>
                        <input
                          type="text"
                          value={localContent.aboutExperience || ""}
                          onChange={(e) => handleFieldChange("aboutExperience", e.target.value)}
                          className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-900 text-white font-medium placeholder:text-slate-500"
                        />
                      </div>
                    </div>

                    {/* About Section Feature Cards (3 Cards) */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t border-slate-800">
                      {/* Card 1 */}
                      <div className="p-3 bg-slate-950/40 rounded-xl border border-slate-800 space-y-2">
                        <span className="text-[10px] font-black uppercase text-primary tracking-wider">About Card 1</span>
                        <div>
                          <label className="block text-[9px] font-extrabold uppercase text-slate-400 mb-1">Title</label>
                          <input
                            type="text"
                            value={localContent.aboutCard1Title || ""}
                            onChange={(e) => handleFieldChange("aboutCard1Title", e.target.value)}
                            className="w-full px-3 py-1.5 text-xs border border-slate-700 rounded-lg outline-none bg-slate-900 text-white font-medium"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] font-extrabold uppercase text-slate-400 mb-1">Description</label>
                          <textarea
                            rows={2}
                            value={localContent.aboutCard1Desc || ""}
                            onChange={(e) => handleFieldChange("aboutCard1Desc", e.target.value)}
                            className="w-full px-3 py-1.5 text-xs border border-slate-700 rounded-lg outline-none bg-slate-900 text-white font-medium resize-none"
                          />
                        </div>
                      </div>

                      {/* Card 2 */}
                      <div className="p-3 bg-slate-950/40 rounded-xl border border-slate-800 space-y-2">
                        <span className="text-[10px] font-black uppercase text-primary tracking-wider">About Card 2</span>
                        <div>
                          <label className="block text-[9px] font-extrabold uppercase text-slate-400 mb-1">Title</label>
                          <input
                            type="text"
                            value={localContent.aboutCard2Title || ""}
                            onChange={(e) => handleFieldChange("aboutCard2Title", e.target.value)}
                            className="w-full px-3 py-1.5 text-xs border border-slate-700 rounded-lg outline-none bg-slate-900 text-white font-medium"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] font-extrabold uppercase text-slate-400 mb-1">Description</label>
                          <textarea
                            rows={2}
                            value={localContent.aboutCard2Desc || ""}
                            onChange={(e) => handleFieldChange("aboutCard2Desc", e.target.value)}
                            className="w-full px-3 py-1.5 text-xs border border-slate-700 rounded-lg outline-none bg-slate-900 text-white font-medium resize-none"
                          />
                        </div>
                      </div>

                      {/* Card 3 */}
                      <div className="p-3 bg-slate-950/40 rounded-xl border border-slate-800 space-y-2">
                        <span className="text-[10px] font-black uppercase text-primary tracking-wider">About Card 3</span>
                        <div>
                          <label className="block text-[9px] font-extrabold uppercase text-slate-400 mb-1">Title</label>
                          <input
                            type="text"
                            value={localContent.aboutCard3Title || ""}
                            onChange={(e) => handleFieldChange("aboutCard3Title", e.target.value)}
                            className="w-full px-3 py-1.5 text-xs border border-slate-700 rounded-lg outline-none bg-slate-900 text-white font-medium"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] font-extrabold uppercase text-slate-400 mb-1">Description</label>
                          <textarea
                            rows={2}
                            value={localContent.aboutCard3Desc || ""}
                            onChange={(e) => handleFieldChange("aboutCard3Desc", e.target.value)}
                            className="w-full px-3 py-1.5 text-xs border border-slate-700 rounded-lg outline-none bg-slate-900 text-white font-medium resize-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 border-b border-slate-100 pb-5">
                    <h4 className="text-xs font-extrabold uppercase tracking-widest text-primary border-l-2 border-primary pl-2 mb-2">
                      3. Why Choose Section (UA Advantage)
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                          Sub-Badge Text
                        </label>
                        <input
                          type="text"
                          value={localContent.whyChooseBadge || ""}
                          onChange={(e) => handleFieldChange("whyChooseBadge", e.target.value)}
                          className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-900 text-white font-medium placeholder:text-slate-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                          Main Title / Heading
                        </label>
                        <input
                          type="text"
                          value={localContent.whyChooseHeading || ""}
                          onChange={(e) => handleFieldChange("whyChooseHeading", e.target.value)}
                          className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-900 text-white font-medium placeholder:text-slate-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 3.1 UA Benefits & Contractor Challenges Sub-Cards Editor */}
                  <div className="space-y-4 border-b border-slate-100 pb-5">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                      3.1 UA Benefits (4 Key Strengths Cards)
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[1, 2, 3, 4].map((num) => (
                        <div key={num} className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl space-y-2">
                          <span className="text-[10px] font-black uppercase text-primary">UA Benefit #{num}</span>
                          <div>
                            <label className="block text-[9px] font-extrabold uppercase text-slate-400">Title</label>
                            <input
                              type="text"
                              value={localContent[`whyCard${num}Title`] || ""}
                              onChange={(e) => handleFieldChange(`whyCard${num}Title`, e.target.value)}
                              className="w-full px-3 py-1.5 text-xs border border-slate-700 rounded-lg bg-slate-900 text-white font-medium"
                            />
                          </div>
                          <div>
                            <label className="block text-[9px] font-extrabold uppercase text-slate-400">Description</label>
                            <textarea
                              rows={2}
                              value={localContent[`whyCard${num}Desc`] || ""}
                              onChange={(e) => handleFieldChange(`whyCard${num}Desc`, e.target.value)}
                              className="w-full px-3 py-1.5 text-xs border border-slate-700 rounded-lg bg-slate-900 text-white font-medium resize-none"
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <h5 className="text-xs font-bold uppercase tracking-wider text-slate-300 pt-2">
                      3.2 Common Contractor Challenges (4 Problem Cards)
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[1, 2, 3, 4].map((num) => (
                        <div key={num} className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl space-y-2">
                          <span className="text-[10px] font-black uppercase text-rose-400">Challenge #{num}</span>
                          <div>
                            <label className="block text-[9px] font-extrabold uppercase text-slate-400">Title</label>
                            <input
                              type="text"
                              value={localContent[`issue${num}Title`] || ""}
                              onChange={(e) => handleFieldChange(`issue${num}Title`, e.target.value)}
                              className="w-full px-3 py-1.5 text-xs border border-slate-700 rounded-lg bg-slate-900 text-white font-medium"
                            />
                          </div>
                          <div>
                            <label className="block text-[9px] font-extrabold uppercase text-slate-400">Description</label>
                            <textarea
                              rows={2}
                              value={localContent[`issue${num}Desc`] || ""}
                              onChange={(e) => handleFieldChange(`issue${num}Desc`, e.target.value)}
                              className="w-full px-3 py-1.5 text-xs border border-slate-700 rounded-lg bg-slate-900 text-white font-medium resize-none"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4 border-b border-slate-100 pb-5">
                    <h4 className="text-xs font-extrabold uppercase tracking-widest text-primary border-l-2 border-primary pl-2 mb-2">
                      4. Why Rely On Us Section & Features
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                          Badge Label
                        </label>
                        <input
                          type="text"
                          value={localContent.relyBadge || ""}
                          onChange={(e) => handleFieldChange("relyBadge", e.target.value)}
                          className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-900 text-white font-medium placeholder:text-slate-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                          Rely Heading
                        </label>
                        <input
                          type="text"
                          value={localContent.relyHeading || ""}
                          onChange={(e) => handleFieldChange("relyHeading", e.target.value)}
                          className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-900 text-white font-medium placeholder:text-slate-500"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <ImageUploadField
                        label="Rely Feature Showcase Image"
                        value={localContent.relyImage || ""}
                        onChange={(val) => handleFieldChange("relyImage", val)}
                      />
                      <div>
                        <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                          CTA Button Label
                        </label>
                        <input
                          type="text"
                          value={localContent.relyButtonText || ""}
                          onChange={(e) => handleFieldChange("relyButtonText", e.target.value)}
                          className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-900 text-white font-medium placeholder:text-slate-500"
                        />
                      </div>
                    </div>

                    <h5 className="text-xs font-bold uppercase tracking-wider text-slate-300 pt-2">
                      4.1 Rely Features (3 Key Values)
                    </h5>
                    <div className="space-y-3">
                      {[1, 2, 3].map((num) => (
                        <div key={num} className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl space-y-2">
                          <span className="text-[10px] font-black uppercase text-primary">Rely Value Feature #{num}</span>
                          <div>
                            <label className="block text-[9px] font-extrabold uppercase text-slate-400">Feature Title</label>
                            <input
                              type="text"
                              value={localContent[`relyFeature${num}Title`] || ""}
                              onChange={(e) => handleFieldChange(`relyFeature${num}Title`, e.target.value)}
                              className="w-full px-3 py-1.5 text-xs border border-slate-700 rounded-lg bg-slate-900 text-white font-medium"
                            />
                          </div>
                          <div>
                            <label className="block text-[9px] font-extrabold uppercase text-slate-400">Feature Description</label>
                            <textarea
                              rows={2}
                              value={localContent[`relyFeature${num}Desc`] || ""}
                              onChange={(e) => handleFieldChange(`relyFeature${num}Desc`, e.target.value)}
                              className="w-full px-3 py-1.5 text-xs border border-slate-700 rounded-lg bg-slate-900 text-white font-medium resize-none"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 5. Work Process Steps Section */}
                  <div className="space-y-4 border-b border-slate-100 pb-5">
                    <h4 className="text-xs font-extrabold uppercase tracking-widest text-primary border-l-2 border-primary pl-2 mb-2">
                      5. Work Process Section (4 Step System)
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">Process Badge</label>
                        <input
                          type="text"
                          value={localContent.processBadge || ""}
                          onChange={(e) => handleFieldChange("processBadge", e.target.value)}
                          className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl bg-slate-900 text-white font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">Process Heading</label>
                        <input
                          type="text"
                          value={localContent.processHeading || ""}
                          onChange={(e) => handleFieldChange("processHeading", e.target.value)}
                          className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl bg-slate-900 text-white font-medium"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">Process Subheading / Intro</label>
                      <textarea
                        rows={2}
                        value={localContent.processSubheading || ""}
                        onChange={(e) => handleFieldChange("processSubheading", e.target.value)}
                        className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl bg-slate-900 text-white font-medium resize-none"
                      />
                    </div>

                    <h5 className="text-xs font-bold uppercase tracking-wider text-slate-300 pt-2">
                      5.1 Process Steps Control (4 Steps)
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[1, 2, 3, 4].map((num) => (
                        <div key={num} className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl space-y-2">
                          <span className="text-[10px] font-black uppercase text-primary">Step {num}</span>
                          <div>
                            <label className="block text-[9px] font-extrabold uppercase text-slate-400">Step {num} Title</label>
                            <input
                              type="text"
                              value={localContent[`processStep${num}Title`] || ""}
                              onChange={(e) => handleFieldChange(`processStep${num}Title`, e.target.value)}
                              className="w-full px-3 py-1.5 text-xs border border-slate-700 rounded-lg bg-slate-900 text-white font-medium"
                            />
                          </div>
                          <div>
                            <label className="block text-[9px] font-extrabold uppercase text-slate-400">Step {num} Description</label>
                            <textarea
                              rows={2}
                              value={localContent[`processStep${num}Desc`] || ""}
                              onChange={(e) => handleFieldChange(`processStep${num}Desc`, e.target.value)}
                              className="w-full px-3 py-1.5 text-xs border border-slate-700 rounded-lg bg-slate-900 text-white font-medium resize-none"
                            />
                          </div>
                          <ImageUploadField
                            label={`Step ${num} Graphic Image`}
                            value={localContent[`processStep${num}Image`] || ""}
                            onChange={(val) => handleFieldChange(`processStep${num}Image`, val)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4 border-b border-slate-100 pb-5">
                    <h4 className="text-xs font-extrabold uppercase tracking-widest text-primary border-l-2 border-primary pl-2 mb-2">
                      6. Callback Request Section
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                          Callback Title
                        </label>
                        <input
                          type="text"
                          value={localContent.callbackHeading || ""}
                          onChange={(e) => handleFieldChange("callbackHeading", e.target.value)}
                          className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-900 text-white font-medium placeholder:text-slate-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                          Callback Subtitle
                        </label>
                        <input
                          type="text"
                          value={localContent.callbackSubheading || ""}
                          onChange={(e) => handleFieldChange("callbackSubheading", e.target.value)}
                          className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-900 text-white font-medium placeholder:text-slate-500"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <ImageUploadField
                        label="Callback Banner Background Image"
                        value={localContent.callbackBgImage || ""}
                        onChange={(val) => handleFieldChange("callbackBgImage", val)}
                      />
                      <ImageUploadField
                        label="Call Support Mascot Graphic Image"
                        value={localContent.callbackSupportImage || ""}
                        onChange={(val) => handleFieldChange("callbackSupportImage", val)}
                      />
                    </div>
                  </div>

                  {/* 7. Video Testimonials (Hear out From our clients) Section */}
                  <div className="space-y-4 border-b border-slate-100 pb-5">
                    <h4 className="text-xs font-extrabold uppercase tracking-widest text-primary border-l-2 border-primary pl-2 mb-2">
                      7. Video Testimonials Section (Hear out From our clients)
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                          Section Sub-Badge Label
                        </label>
                        <input
                          type="text"
                          value={localContent.testimonialBadge || ""}
                          onChange={(e) => handleFieldChange("testimonialBadge", e.target.value)}
                          className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl bg-slate-900 text-white font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                          Section Heading ("Hear out From our clients")
                        </label>
                        <input
                          type="text"
                          value={localContent.testimonialHeading || ""}
                          onChange={(e) => handleFieldChange("testimonialHeading", e.target.value)}
                          className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl bg-slate-900 text-white font-medium"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                        Section Subtitle / Description
                      </label>
                      <input
                        type="text"
                        value={localContent.testimonialSubheading || ""}
                        onChange={(e) => handleFieldChange("testimonialSubheading", e.target.value)}
                        className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl bg-slate-900 text-white font-medium"
                      />
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <h5 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                        7.1 Dynamic Video Testimonials List Manager
                      </h5>
                      <button
                        type="button"
                        onClick={() => {
                          const currentList = Array.isArray(localContent.testimonials) ? [...localContent.testimonials] : [];
                          const newItem = {
                            id: Date.now().toString(),
                            name: "New Client Name",
                            role: "Client Role / Company",
                            project: "Project Title",
                            quote: "Write client testimonial review quote here...",
                            thumbnail: "/images/home/projects/project-waterproofing.png",
                            videoId: "A2y8jK-iGSw",
                          };
                          handleFieldChange("testimonials", [...currentList, newItem]);
                        }}
                        className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold bg-primary hover:bg-primary/90 text-white rounded-xl transition-all duration-300 shadow-md cursor-pointer active:scale-95"
                      >
                        <span>+ Add New Testimonial</span>
                      </button>
                    </div>

                    <div className="space-y-4">
                      {(Array.isArray(localContent.testimonials) ? localContent.testimonials : []).map((item: any, idx: number) => {
                        const updateTestimonialItem = (field: string, val: string) => {
                          const currentList = Array.isArray(localContent.testimonials) ? [...localContent.testimonials] : [];
                          const listCopy = [...currentList];
                          listCopy[idx] = { ...listCopy[idx], [field]: val };
                          
                          // Also sync single fields if first item for backward compatibility
                          if (idx === 0) {
                            if (field === "name") handleFieldChange("testimonial1Name", val);
                            if (field === "role") handleFieldChange("testimonial1Role", val);
                            if (field === "project") handleFieldChange("testimonial1Project", val);
                            if (field === "quote") handleFieldChange("testimonial1Quote", val);
                            if (field === "thumbnail") handleFieldChange("testimonial1Thumbnail", val);
                            if (field === "videoId") handleFieldChange("testimonial1VideoId", val);
                          }
                          handleFieldChange("testimonials", listCopy);
                        };

                        const deleteTestimonialItem = () => {
                          const currentList = Array.isArray(localContent.testimonials) ? [...localContent.testimonials] : [];
                          const updatedList = currentList.filter((_, i) => i !== idx);
                          handleFieldChange("testimonials", updatedList);
                        };

                        return (
                          <div key={item.id || idx} className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-3 relative group">
                            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                              <span className="text-xs font-black uppercase text-primary">
                                Testimonial #{idx + 1} - {item.name}
                              </span>
                              <button
                                type="button"
                                onClick={deleteTestimonialItem}
                                className="px-2.5 py-1 text-[10px] font-extrabold bg-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-white rounded-lg transition-colors cursor-pointer"
                              >
                                Delete
                              </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                              <div>
                                <label className="block text-[9px] font-extrabold uppercase text-slate-400">Client Name</label>
                                <input
                                  type="text"
                                  value={item.name || ""}
                                  onChange={(e) => updateTestimonialItem("name", e.target.value)}
                                  className="w-full px-3 py-1.5 text-xs border border-slate-700 rounded-lg bg-slate-900 text-white font-medium"
                                />
                              </div>
                              <div>
                                <label className="block text-[9px] font-extrabold uppercase text-slate-400">Role & Organization</label>
                                <input
                                  type="text"
                                  value={item.role || ""}
                                  onChange={(e) => updateTestimonialItem("role", e.target.value)}
                                  className="w-full px-3 py-1.5 text-xs border border-slate-700 rounded-lg bg-slate-900 text-white font-medium"
                                />
                              </div>
                              <div>
                                <label className="block text-[9px] font-extrabold uppercase text-slate-400">Project Name</label>
                                <input
                                  type="text"
                                  value={item.project || ""}
                                  onChange={(e) => updateTestimonialItem("project", e.target.value)}
                                  className="w-full px-3 py-1.5 text-xs border border-slate-700 rounded-lg bg-slate-900 text-white font-medium"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-[9px] font-extrabold uppercase text-slate-400">Review Quote Text</label>
                              <textarea
                                rows={2}
                                value={item.quote || ""}
                                onChange={(e) => updateTestimonialItem("quote", e.target.value)}
                                className="w-full px-3 py-1.5 text-xs border border-slate-700 rounded-lg bg-slate-900 text-white font-medium resize-none"
                              />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <ImageUploadField
                                label="Video Cover / Thumbnail Image"
                                value={item.thumbnail || ""}
                                onChange={(val) => updateTestimonialItem("thumbnail", val)}
                              />
                              <div>
                                <label className="block text-[9px] font-extrabold uppercase text-slate-400">YouTube Video ID (e.g. A2y8jK-iGSw)</label>
                                <input
                                  type="text"
                                  value={item.videoId || ""}
                                  onChange={(e) => updateTestimonialItem("videoId", e.target.value)}
                                  className="w-full px-3 py-1.5 text-xs border border-slate-700 rounded-lg bg-slate-900 text-white font-medium"
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* 8. Google Customer Reviews (5-Star Happy Customer Reviews) Section */}
                  <div className="space-y-4 border-b border-slate-100 pb-5">
                    <h4 className="text-xs font-extrabold uppercase tracking-widest text-primary border-l-2 border-primary pl-2 mb-2">
                      8. Google Customer Reviews Section (5-Star Happy Customer Reviews)
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                          Section Badge Tag
                        </label>
                        <input
                          type="text"
                          value={localContent.reviewBadge || ""}
                          onChange={(e) => handleFieldChange("reviewBadge", e.target.value)}
                          className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl bg-slate-900 text-white font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                          Section Main Title ("5-Star Happy Customer Reviews")
                        </label>
                        <input
                          type="text"
                          value={localContent.reviewHeading || ""}
                          onChange={(e) => handleFieldChange("reviewHeading", e.target.value)}
                          className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl bg-slate-900 text-white font-medium"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <h5 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                        8.1 Dynamic Google Reviews List Manager
                      </h5>
                      <button
                        type="button"
                        onClick={() => {
                          const currentList = Array.isArray(localContent.googleReviews) ? [...localContent.googleReviews] : [];
                          const newItem = {
                            id: Date.now().toString(),
                            name: "New Customer Name",
                            time: "Just now",
                            stars: 5,
                            avatar: "/images/home/reviews/google-majidul.png",
                            text: "Write customer Google review text here...",
                          };
                          handleFieldChange("googleReviews", [...currentList, newItem]);
                        }}
                        className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold bg-primary hover:bg-primary/90 text-white rounded-xl transition-all duration-300 shadow-md cursor-pointer active:scale-95"
                      >
                        <span>+ Add New Review</span>
                      </button>
                    </div>

                    <div className="space-y-4">
                      {(Array.isArray(localContent.googleReviews) ? localContent.googleReviews : []).map((item: any, idx: number) => {
                        const updateReviewItem = (field: string, val: any) => {
                          const currentList = Array.isArray(localContent.googleReviews) ? [...localContent.googleReviews] : [];
                          const listCopy = [...currentList];
                          listCopy[idx] = { ...listCopy[idx], [field]: val };
                          handleFieldChange("googleReviews", listCopy);
                        };

                        const deleteReviewItem = () => {
                          const currentList = Array.isArray(localContent.googleReviews) ? [...localContent.googleReviews] : [];
                          const updatedList = currentList.filter((_, i) => i !== idx);
                          handleFieldChange("googleReviews", updatedList);
                        };

                        return (
                          <div key={item.id || idx} className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-3 relative group">
                            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                              <span className="text-xs font-black uppercase text-primary">
                                Review #{idx + 1} - {item.name} ({item.stars || 5} Stars)
                              </span>
                              <button
                                type="button"
                                onClick={deleteReviewItem}
                                className="px-2.5 py-1 text-[10px] font-extrabold bg-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-white rounded-lg transition-colors cursor-pointer"
                              >
                                Delete
                              </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                              <div>
                                <label className="block text-[9px] font-extrabold uppercase text-slate-400">Customer Name</label>
                                <input
                                  type="text"
                                  value={item.name || ""}
                                  onChange={(e) => updateReviewItem("name", e.target.value)}
                                  className="w-full px-3 py-1.5 text-xs border border-slate-700 rounded-lg bg-slate-900 text-white font-medium"
                                />
                              </div>
                              <div>
                                <label className="block text-[9px] font-extrabold uppercase text-slate-400">Time Ago String (e.g. 1 year ago)</label>
                                <input
                                  type="text"
                                  value={item.time || ""}
                                  onChange={(e) => updateReviewItem("time", e.target.value)}
                                  className="w-full px-3 py-1.5 text-xs border border-slate-700 rounded-lg bg-slate-900 text-white font-medium"
                                />
                              </div>
                              <div>
                                <label className="block text-[9px] font-extrabold uppercase text-slate-400">Star Rating (1 - 5)</label>
                                <select
                                  value={item.stars || 5}
                                  onChange={(e) => updateReviewItem("stars", Number(e.target.value))}
                                  className="w-full px-3 py-1.5 text-xs border border-slate-700 rounded-lg bg-slate-900 text-white font-medium outline-none"
                                >
                                  <option value={5}>5 Stars ★★★★★</option>
                                  <option value={4}>4 Stars ★★★★☆</option>
                                  <option value={3}>3 Stars ★★★☆☆</option>
                                  <option value={2}>2 Stars ★★☆☆☆</option>
                                  <option value={1}>1 Star ★☆☆☆☆</option>
                                </select>
                              </div>
                            </div>
                            <div>
                              <label className="block text-[9px] font-extrabold uppercase text-slate-400">Review Text Quote</label>
                              <textarea
                                rows={2}
                                value={item.text || ""}
                                onChange={(e) => updateReviewItem("text", e.target.value)}
                                className="w-full px-3 py-1.5 text-xs border border-slate-700 rounded-lg bg-slate-900 text-white font-medium resize-none"
                              />
                            </div>
                            <ImageUploadField
                              label="Customer Profile Avatar Photo"
                              value={item.avatar || ""}
                              onChange={(val) => updateReviewItem("avatar", val)}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* 9. Service Areas Section (Reliable Engineering & Renovation Solutions Near You!) */}
                  <div className="space-y-4 border-b border-slate-100 pb-5">
                    <h4 className="text-xs font-extrabold uppercase tracking-widest text-primary border-l-2 border-primary pl-2 mb-2">
                      9. Service Areas Section (Reliable Engineering & Renovation Solutions Near You!)
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                          Section Badge Tag
                        </label>
                        <input
                          type="text"
                          value={localContent.areaBadge || ""}
                          onChange={(e) => handleFieldChange("areaBadge", e.target.value)}
                          className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl bg-slate-900 text-white font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                          Section Main Heading ("Reliable Engineering & Renovation Solutions Near You!")
                        </label>
                        <input
                          type="text"
                          value={localContent.areaHeading || ""}
                          onChange={(e) => handleFieldChange("areaHeading", e.target.value)}
                          className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl bg-slate-900 text-white font-medium"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                        Section Description Text
                      </label>
                      <textarea
                        rows={2}
                        value={localContent.areaSubheading || ""}
                        onChange={(e) => handleFieldChange("areaSubheading", e.target.value)}
                        className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl bg-slate-900 text-white font-medium resize-none"
                      />
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <h5 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                        9.1 Dynamic Service Regions & Locations Manager
                      </h5>
                      <button
                        type="button"
                        onClick={() => {
                          const currentList = Array.isArray(localContent.regions) ? [...localContent.regions] : [];
                          const newRegion = {
                            name: "New Region Name",
                            areas: ["Location 1", "Location 2", "Location 3"],
                          };
                          handleFieldChange("regions", [...currentList, newRegion]);
                        }}
                        className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold bg-primary hover:bg-primary/90 text-white rounded-xl transition-all duration-300 shadow-md cursor-pointer active:scale-95"
                      >
                        <span>+ Add New Region</span>
                      </button>
                    </div>

                    <div className="space-y-4">
                      {(Array.isArray(localContent.regions) ? localContent.regions : []).map((region: any, idx: number) => {
                        const updateRegion = (field: string, val: any) => {
                          const currentList = Array.isArray(localContent.regions) ? [...localContent.regions] : [];
                          const listCopy = [...currentList];
                          listCopy[idx] = { ...listCopy[idx], [field]: val };
                          handleFieldChange("regions", listCopy);
                        };

                        const deleteRegion = () => {
                          const currentList = Array.isArray(localContent.regions) ? [...localContent.regions] : [];
                          const updatedList = currentList.filter((_, i) => i !== idx);
                          handleFieldChange("regions", updatedList);
                        };

                        const areasString = Array.isArray(region.areas)
                          ? region.areas.join(", ")
                          : typeof region.areas === "string"
                          ? region.areas
                          : "";

                        return (
                          <div key={idx} className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-3 relative group">
                            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                              <span className="text-xs font-black uppercase text-primary">
                                Region #{idx + 1} - {region.name}
                              </span>
                              <button
                                type="button"
                                onClick={deleteRegion}
                                className="px-2.5 py-1 text-[10px] font-extrabold bg-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-white rounded-lg transition-colors cursor-pointer"
                              >
                                Delete Region
                              </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div>
                                <label className="block text-[9px] font-extrabold uppercase text-slate-400">Region Name (e.g. Central, East, North)</label>
                                <input
                                  type="text"
                                  value={region.name || ""}
                                  onChange={(e) => updateRegion("name", e.target.value)}
                                  className="w-full px-3 py-1.5 text-xs border border-slate-700 rounded-lg bg-slate-900 text-white font-medium"
                                />
                              </div>
                              <div>
                                <label className="block text-[9px] font-extrabold uppercase text-slate-400">Service Locations (Comma-separated)</label>
                                <input
                                  type="text"
                                  value={areasString}
                                  onChange={(e) => {
                                    const arrayVal = e.target.value.split(",").map((s) => s.trimStart());
                                    updateRegion("areas", arrayVal);
                                  }}
                                  placeholder="e.g. Orchard Road, Marina Bay, Bugis, Raffles Place"
                                  className="w-full px-3 py-1.5 text-xs border border-slate-700 rounded-lg bg-slate-900 text-white font-medium"
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* --- ABOUT PAGE SECTIONS --- */}
              {pageId === "about" && (
                <div className="space-y-6">
                  <div className="space-y-4 border-b border-slate-100 pb-5">
                    <h4 className="text-xs font-extrabold uppercase tracking-widest text-primary border-l-2 border-primary pl-2 mb-2">
                      2. Company History & Overview Section
                    </h4>
                    <div>
                      <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                        Overview Heading
                      </label>
                      <input
                        type="text"
                        value={localContent.overviewHeading || ""}
                        onChange={(e) => handleFieldChange("overviewHeading", e.target.value)}
                        className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-900 text-white font-medium placeholder:text-slate-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                        Overview Detailed Narrative Body
                      </label>
                      <textarea
                        rows={4}
                        value={localContent.overviewText || ""}
                        onChange={(e) => handleFieldChange("overviewText", e.target.value)}
                        className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-900 text-white font-medium resize-none placeholder:text-slate-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-xs font-extrabold uppercase tracking-widest text-primary border-l-2 border-primary pl-2 mb-2">
                      3. EHS Workplace Safety Policy Section
                    </h4>
                    <div>
                      <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                        Safety Policy Title
                      </label>
                      <input
                        type="text"
                        value={localContent.ehsHeading || ""}
                        onChange={(e) => handleFieldChange("ehsHeading", e.target.value)}
                        className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-900 text-white font-medium placeholder:text-slate-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                        Safety Policy Details
                      </label>
                      <textarea
                        rows={3}
                        value={localContent.ehsText || ""}
                        onChange={(e) => handleFieldChange("ehsText", e.target.value)}
                        className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-900 text-white font-medium resize-none placeholder:text-slate-500"
                      />
                    </div>
                    <ImageUploadField
                      label="EHS Safety Showcase Image"
                      value={localContent.ehsImage || ""}
                      onChange={(val) => handleFieldChange("ehsImage", val)}
                    />
                  </div>

                  {/* --- FAQ SECTION --- */}
                  <div className="space-y-4 pt-5 border-t border-slate-800">
                    <h4 className="text-xs font-extrabold uppercase tracking-widest text-primary border-l-2 border-primary pl-2 mb-2">
                      4. Frequently Asked Questions (FAQ) Section
                    </h4>
                    <div>
                      <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                        FAQ Section Title
                      </label>
                      <input
                        type="text"
                        value={localContent.faqHeading || ""}
                        onChange={(e) => handleFieldChange("faqHeading", e.target.value)}
                        className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-900 text-white font-medium placeholder:text-slate-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                        FAQ Section Subheading
                      </label>
                      <textarea
                        rows={2}
                        value={localContent.faqSubheading || ""}
                        onChange={(e) => handleFieldChange("faqSubheading", e.target.value)}
                        className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-900 text-white font-medium resize-none placeholder:text-slate-500"
                      />
                    </div>

                    {/* FAQ Items List Editor */}
                    <div className="space-y-3 pt-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                          FAQ Q&A List
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            let list = [];
                            try { list = JSON.parse(localContent.faqsJson || "[]"); } catch {}
                            const newList = [...list, { question: "New Question?", answer: "New Answer text..." }];
                            handleFieldChange("faqsJson", JSON.stringify(newList));
                          }}
                          className="text-[10px] font-extrabold text-primary hover:underline inline-flex items-center gap-1"
                        >
                          + Add FAQ Item
                        </button>
                      </div>

                      {(() => {
                        let list = [];
                        try {
                          list = JSON.parse(localContent.faqsJson || "[]");
                        } catch {}
                        
                        if (list.length === 0) {
                          return (
                            <div className="text-center py-4 bg-slate-950/20 border border-dashed border-slate-800 rounded-xl p-3">
                              <span className="text-xs text-slate-500">No FAQ items defined yet. Click above to add.</span>
                            </div>
                          );
                        }

                        return list.map((faq: any, idx: number) => (
                          <div key={idx} className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 space-y-2 relative">
                            <div className="flex justify-between items-center">
                              <span className="text-[9px] font-extrabold text-slate-400 uppercase">FAQ Item #{idx + 1}</span>
                              <button
                                type="button"
                                onClick={() => {
                                  const newList = list.filter((_: any, i: number) => i !== idx);
                                  handleFieldChange("faqsJson", JSON.stringify(newList));
                                }}
                                className="text-[10px] font-bold text-red-400 hover:text-red-300"
                              >
                                Remove
                              </button>
                            </div>
                            <div className="space-y-2">
                              <div>
                                <label className="block text-[9px] font-extrabold uppercase text-slate-400 mb-0.5">Question</label>
                                <input
                                  type="text"
                                  value={faq.question || ""}
                                  onChange={(e) => {
                                    const newList = [...list];
                                    newList[idx] = { ...newList[idx], question: e.target.value };
                                    handleFieldChange("faqsJson", JSON.stringify(newList));
                                  }}
                                  className="w-full px-3 py-1.5 text-xs border border-slate-700 rounded-lg outline-none bg-slate-900 text-white font-medium"
                                />
                              </div>
                              <div>
                                <label className="block text-[9px] font-extrabold uppercase text-slate-400 mb-0.5">Answer</label>
                                <textarea
                                  rows={2}
                                  value={faq.answer || ""}
                                  onChange={(e) => {
                                    const newList = [...list];
                                    newList[idx] = { ...newList[idx], answer: e.target.value };
                                    handleFieldChange("faqsJson", JSON.stringify(newList));
                                  }}
                                  className="w-full px-3 py-1.5 text-xs border border-slate-700 rounded-lg outline-none bg-slate-900 text-white font-medium resize-none"
                                />
                              </div>
                            </div>
                          </div>
                        ));
                      })()}
                    </div>
                  </div>
                </div>
              )}

              {/* --- SERVICES PAGE SECTIONS --- */}
              {pageId === "services" && (
                <div className="space-y-4">
                  <h4 className="text-xs font-extrabold uppercase tracking-widest text-primary border-l-2 border-primary pl-2 mb-2">
                    2. Service Capability Description
                  </h4>
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                      Services Listing Header
                    </label>
                    <input
                      type="text"
                      value={localContent.servicesHeading || ""}
                      onChange={(e) => handleFieldChange("servicesHeading", e.target.value)}
                      className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-900 text-white font-medium placeholder:text-slate-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                      Services Listing Subtitle
                    </label>
                    <input
                      type="text"
                      value={localContent.servicesSubheading || ""}
                      onChange={(e) => handleFieldChange("servicesSubheading", e.target.value)}
                      className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-900 text-white font-medium placeholder:text-slate-500"
                    />
                  </div>
                </div>
              )}

              {/* --- PROJECTS PAGE SECTIONS --- */}
              {pageId === "projects" && (
                <div className="space-y-4">
                  <h4 className="text-xs font-extrabold uppercase tracking-widest text-primary border-l-2 border-primary pl-2 mb-2">
                    2. Featured Works Showcase Header
                  </h4>
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                      Portfolio Section Title
                    </label>
                    <input
                      type="text"
                      value={localContent.portfolioHeading || ""}
                      onChange={(e) => handleFieldChange("portfolioHeading", e.target.value)}
                      className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-900 text-white font-medium placeholder:text-slate-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                      Portfolio Section Subtitle
                    </label>
                    <input
                      type="text"
                      value={localContent.portfolioSubheading || ""}
                      onChange={(e) => handleFieldChange("portfolioSubheading", e.target.value)}
                      className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-900 text-white font-medium placeholder:text-slate-500"
                    />
                  </div>
                </div>
              )}

              {/* --- BLOG PAGE SECTIONS --- */}
              {pageId === "blog" && (
                <div className="space-y-4">
                  <h4 className="text-xs font-extrabold uppercase tracking-widest text-primary border-l-2 border-primary pl-2 mb-2">
                    2. Blog Listing Intro
                  </h4>
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                      Blog Catalog Title
                    </label>
                    <input
                      type="text"
                      value={localContent.blogHeading || ""}
                      onChange={(e) => handleFieldChange("blogHeading", e.target.value)}
                      className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-900 text-white font-medium placeholder:text-slate-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                      Blog Catalog Subtitle / Summary
                    </label>
                    <input
                      type="text"
                      value={localContent.blogSubheading || ""}
                      onChange={(e) => handleFieldChange("blogSubheading", e.target.value)}
                      className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-900 text-white font-medium placeholder:text-slate-500"
                    />
                  </div>
                </div>
              )}

              {/* --- CONTACT PAGE SECTIONS --- */}
              {pageId === "contact" && (
                <div className="space-y-4">
                  <h4 className="text-xs font-extrabold uppercase tracking-widest text-primary border-l-2 border-primary pl-2 mb-2">
                    2. Official Office Contact Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                        Office Physical Address
                      </label>
                      <input
                        type="text"
                        value={localContent.contactAddress || ""}
                        onChange={(e) => handleFieldChange("contactAddress", e.target.value)}
                        className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-900 text-white font-medium placeholder:text-slate-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                        Official Phone Number
                      </label>
                      <input
                        type="text"
                        value={localContent.contactPhone || ""}
                        onChange={(e) => handleFieldChange("contactPhone", e.target.value)}
                        className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-900 text-white font-medium placeholder:text-slate-500"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                        Official Support Email Address
                      </label>
                      <input
                        type="text"
                        value={localContent.contactEmail || ""}
                        onChange={(e) => handleFieldChange("contactEmail", e.target.value)}
                        className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-900 text-white font-medium font-mono text-xs placeholder:text-slate-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                        Office Operation Hours
                      </label>
                      <input
                        type="text"
                        value={localContent.contactHours || ""}
                        onChange={(e) => handleFieldChange("contactHours", e.target.value)}
                        className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-900 text-white font-medium placeholder:text-slate-500"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* SEO & SCHEMA FORM FIELDS */
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                    Meta Page Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. UA Engineering | BCA Certified Plumber"
                    value={localSeo.metaTitle}
                    onChange={(e) => handleSeoChange("metaTitle", e.target.value)}
                    className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-900 text-white font-medium placeholder:text-slate-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                    Meta Keywords
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. engineering, substation, plumbing"
                    value={localSeo.metaKeywords}
                    onChange={(e) => handleSeoChange("metaKeywords", e.target.value)}
                    className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-900 text-white font-medium placeholder:text-slate-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                  Meta Description
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. UA Engineering provides..."
                  value={localSeo.metaDescription}
                  onChange={(e) => handleSeoChange("metaDescription", e.target.value)}
                  className="w-full px-4 py-2.5 text-sm border border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-slate-900 text-white font-medium resize-none placeholder:text-slate-500"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    Schema.org Structured Data (JSON-LD)
                  </label>
                  {jsonError && (
                    <span className="text-[10px] font-bold text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> Schema Syntax Error
                    </span>
                  )}
                </div>
                <textarea
                  rows={6}
                  placeholder={`{\n  "@context": "https://schema.org",\n  "@type": "LocalBusiness"\n}`}
                  value={localSeo.schemaJson}
                  onChange={(e) => handleSeoChange("schemaJson", e.target.value)}
                  className={`w-full px-4 py-3 text-xs border rounded-xl outline-none font-mono resize-none bg-slate-900 text-white font-medium placeholder:text-slate-500 focus:ring-1 ${
                    jsonError
                      ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                      : "border-slate-700 focus:border-primary focus:ring-primary"
                  }`}
                />
                {jsonError && (
                  <p className="mt-1.5 text-[10px] text-red-600 font-mono">
                    Error: {jsonError}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Form Actions Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <span className="text-[10px] text-slate-400 font-bold">
              Updates sync to Database & Website dynamically
            </span>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-xl shadow-md text-xs font-bold transition-colors"
            >
              <Save className="w-4 h-4 text-accent" />
              <span>Save & Publish Section</span>
            </button>
          </div>
        </form>
      </div>

      {/* BEAUTIFUL CUSTOM SUCCESS MODAL OVERLAY */}
      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm z-50 animate-fade-in">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl p-8 max-w-sm w-full mx-4 text-center space-y-6 animate-scale-up">
            
            {/* Animated Check Circle Container */}
            <div className="mx-auto w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100 flex items-center justify-center shadow-inner relative">
              <CheckCircle className="w-10 h-10 animate-pulse" />
            </div>

            {/* Content Details */}
            <div className="space-y-2">
              <h3 className="text-lg font-black text-secondary font-display">
                Publish Successful!
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                All changes have been successfully saved, updated, and synchronized to your Database & Website.
              </p>
            </div>

            {/* Action Dismiss Button */}
            <button
              onClick={() => setShowSuccessModal(false)}
              className="w-full py-3 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl shadow-md transition-all active:scale-95"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      )}

      {/* BEAUTIFUL CUSTOM FAILURE MODAL OVERLAY */}
      {showFailureModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm z-50 animate-fade-in">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl p-8 max-w-sm w-full mx-4 text-center space-y-6 animate-scale-up">
            
            {/* Animated Warning Icon Container */}
            <div className="mx-auto w-16 h-16 bg-rose-50 text-rose-600 rounded-full border border-rose-100 flex items-center justify-center shadow-inner relative">
              <AlertCircle className="w-10 h-10 animate-bounce" />
            </div>

            {/* Content Details */}
            <div className="space-y-2">
              <h3 className="text-lg font-black text-secondary font-display">
                Publish Failed!
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                We encountered an error while communicating with the server. Please check your backend connection.
              </p>
            </div>

            {/* Action Dismiss Button */}
            <button
              onClick={() => setShowFailureModal(false)}
              className="w-full py-3 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-xl shadow-md transition-all active:scale-95"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
