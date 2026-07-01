export interface PageSeo {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  schemaJson: string;
}

export interface HomeContent {
  heroHeading: string;
  heroSubheading: string;
  heroImage: string;
  heroImageAlt: string;
  aboutHeading: string;
  aboutSubheading: string;
  aboutImage: string;
  aboutImageAlt: string;
  aboutExperience: string;
  callbackHeading: string;
  callbackSubheading: string;
  relyHeading: string;
  relySubheading: string;
}

export interface AboutContent {
  heroHeading: string;
  heroSubheading: string;
  heroImage: string;
  heroImageAlt: string;
  overviewHeading: string;
  overviewText: string;
  ehsHeading: string;
  ehsText: string;
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
  home: { content: HomeContent; seo: PageSeo };
  about: { content: AboutContent; seo: PageSeo };
  services: { content: ServicesContent; seo: PageSeo };
  projects: { content: ProjectsContent; seo: PageSeo };
  blog: { content: BlogContent; seo: PageSeo };
  contact: { content: ContactContent; seo: PageSeo };
}

export const initialCmsData: CmsDatabase = {
  home: {
    content: {
      heroHeading: "From Renovation to Painting, Roofing, Electrical, Plumbing and Steel Works.",
      heroSubheading: "We handle it all with expertise, reliability, and guaranteed quality.",
      heroImage: "/images/home/hero/hero-bg.png",
      heroImageAlt: "UA Engineering Renovation and Steel Fabrications Banner",
      aboutHeading: "Your Trusted Partner for High Quality Renovation & Upgrading Services.",
      aboutSubheading: "At UA ENGINEERING PTE. LTD. we deliver reliable Renovation & Upgrading solutions grounded in integrity, expertise, and precision. Our team ensures every project meets high standards of safety, durability, and quality workmanship.",
      aboutImage: "/images/home/about/about-main.jpg",
      aboutImageAlt: "UA Engineering Upgrading Worksite Inspections Team",
      aboutExperience: "15",
      callbackHeading: "Let's Get Started on Your Next Engineering Project",
      callbackSubheading: "Call us today to schedule a site inspection, structural audit, or customized renovation quotation.",
      relyHeading: "Why Property Owners Rely on UA Engineering",
      relySubheading: "We blend quality craftsmanship with safety protocols and BCA standards to deliver long-lasting engineering solutions in Singapore.",
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
      heroImage: "/images/about/about-bg.jpg",
      heroImageAlt: "UA Engineering Commercial Facility Builders",
      overviewHeading: "Company History & Core Values",
      overviewText: "Founded in Singapore, UA Engineering has grown into a leading contractor offering mechanical, electrical, plumbing, waterproofing, and steel fabrication works. Integrity, safety, and client satisfaction drive our operations.",
      ehsHeading: "EHS Safety Policy & Environmental Compliance",
      ehsText: "We maintain a Zero-Accident policy across all site operations. Our EHS compliance officers inspect structural rigs, high-voltage lines, and confined space setups daily to protect our workers and clients.",
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
