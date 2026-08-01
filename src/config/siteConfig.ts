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
    name: "Brand Studio",
    heroTitleLine1: "Creative",
    heroTitleLine2: "Studio",
    tagline: "Elevating digital presence through strategy and design.",
    description: "Connecting visionary brands with engaging audience experiences.",
    aboutHeading: "A modern digital agency designed for influence and growth.",
    aboutDescription: "We engineer impactful campaigns and digital products. By combining creative direction and strategic positioning, we help brands reach new heights.",
    logoUrl: "/logo.svg"
  },
  contact: {
    email: "contact@example.com",
    location: "GLOBAL / REMOTE",
    formActionUrl: "https://formsubmit.co/ajax/contact@example.com"
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
      description: "Bespoke strategy and guidance for creators and brands. From partnership management to creative direction.",
      features: [
        "Partnership Strategy",
        "Creative Direction",
        "Brand Alignment",
        "Media Strategy"
      ]
    },
    {
      slug: "brand-campaigns",
      title: "Brand Campaigns",
      tagline: "Engaging campaigns engineered for impact.",
      description: "Data-backed multi-platform campaigns designed to captivate audiences and deliver real value.",
      features: [
        "Campaign Strategy",
        "Creative Direction",
        "Analytics & Performance",
        "Multi-Channel Reach"
      ]
    },
    {
      slug: "campaign-strategy",
      title: "Campaign Strategy",
      tagline: "Data-driven positioning and storytelling.",
      description: "End-to-end launch strategies that build authentic connection and maximize brand reach.",
      features: [
        "Audience Insights",
        "Strategic Positioning",
        "Distribution Planning",
        "Growth Optimization"
      ]
    }
  ]
};
