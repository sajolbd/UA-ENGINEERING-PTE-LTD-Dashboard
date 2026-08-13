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
}

export interface AboutContent {
  heroHeading: string;
  heroSubheading: string;
  heroImage: string;
  aboutImage?: string;
  heroImageAlt: string;
  overviewHeading: string;
  overviewText: string;
  ehsHeading: string;
  ehsText: string;
  ehsImage: string;
  processHeading: string;
  processSubheading: string;
  faqHeading: string;
  faqSubheading: string;
  residentialHeading: string;
  residentialSubheading: string;
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
      siteLogo: "/images/logo.png",
      footerLogo: "/images/footer-logo.png",
      companyName: "UA ENGINEERING PTE. LTD.",
      welcomeMessage: "Welcome to",
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
      whyChooseBadge: "UA ADVANTAGE",
      whyChooseHeading: "Why Choose UA Engineering?",
      relyBadge: "RELIABILITY & TRUST",
      relyHeading: "Why Do You Rely On Us?",
      relyImage: "/images/home/rely/rely-main.png",
      relyButtonText: "Talk to an Expert",
      callbackHeading: "Let Us Call You",
      callbackSubheading: "Need help now? Send a few details - we'll call you shortly.",
      callbackBgImage: "/images/home/call/callback-bg.png",
      callbackSupportImage: "/images/home/call/call-support.png",
      callbackButtonText: "Submit Now",
      reviewsBadge: "CLIENT TESTIMONIALS",
      reviewsHeading: "What Our Clients Say About UA Engineering",
      processBadge: "OUR WORK PROCESS",
      processHeading: "How We Deliver Engineering Excellence"
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
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "10 Anson Road",
          "addressLocality": "Singapore",
          "postalCode": "079903"
        },
        "telephone": "+65 9841 1786"
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
      residentialSubheading: "Providing HDB, Condominium, and Landed Home owners with certified renovation solutions."
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
      contactAddress: "10 Anson Road, Singapore 079903",
      contactPhone: "+65 9841 1786",
      contactEmail: "info@ua-engineering.com",
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
