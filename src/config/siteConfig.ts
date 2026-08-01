export interface SiteConfig {
  brand: {
    name: string;
    heroTitleLine1: string;
    heroTitleLine2: string;
    tagline: string;
    description: string;
    aboutHeading: string;
    aboutDescription: string;
    logoUrl: string;
  };
  contact: {
    email: string;
    location: string;
    formActionUrl: string;
  };
  socialLinks: {
    instagram?: string;
    tiktok?: string;
    linkedin?: string;
    twitter?: string;
    youtube?: string;
  };
  navLinks: Array<{ label: string; href: string }>;
  expertise: Array<{
    slug: string;
    title: string;
    tagline: string;
    description: string;
    features: string[];
  }>;
}

export const siteConfig: SiteConfig = {
  brand: {
    name: "TQ Media",
    heroTitleLine1: "WHERE BRANDS",
    heroTitleLine2: "MEET VOICES.",
    tagline: "Connecting visionary brands with culture-shifting voices.",
    description: "",
    aboutHeading: "Where strategic brand partnerships meet influential voices.",
    aboutDescription: "TQ Media is a premier influencer and talent management agency. We orchestrate authentic brand collaborations and execute high-converting media campaigns across global platforms.",
    logoUrl: "/logo.png"
  },
  contact: {
    email: "partnerships@tqmedia.co.uk",
    location: "LONDON / GLOBAL",
    formActionUrl: "https://formsubmit.co/ajax/partnerships@tqmedia.co.uk"
  },
  socialLinks: {
    instagram: "https://instagram.com",
    tiktok: "https://tiktok.com",
    linkedin: "https://linkedin.com"
  },
  navLinks: [
    { label: "Agency", href: "/#about" },
    { label: "Expertise", href: "/#services" },
    { label: "Partnership", href: "/signup" }
  ],
  expertise: [
    {
      slug: "talent-management",
      title: "Talent Management",
      tagline: "Strategic representation and career direction.",
      description: "Bespoke strategy and guidance for top-tier creators and voices. From high-value brand partnerships to long-term career growth.",
      features: [
        "Partnership Strategy",
        "Creator Representation",
        "Brand Alignment",
        "Media Strategy"
      ]
    },
    {
      slug: "brand-campaigns",
      title: "Brand Campaigns",
      tagline: "High-converting multi-channel campaigns.",
      description: "Data-driven influencer marketing campaigns designed to engage target audiences and deliver maximum return on ad spend.",
      features: [
        "Campaign Strategy",
        "Creative Direction",
        "Performance Analytics",
        "Multi-Platform Reach"
      ]
    },
    {
      slug: "campaign-strategy",
      title: "Strategic Positioning",
      tagline: "Data-backed distribution and launch strategy.",
      description: "End-to-end launch and campaign positioning that builds authentic connections between brands and key decision makers.",
      features: [
        "Audience Insights",
        "Market Positioning",
        "Distribution Planning",
        "Growth Optimization"
      ]
    }
  ]
};
