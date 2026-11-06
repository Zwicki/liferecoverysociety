export interface SiteConfig {
  name: string;
  shortName: string;
  tagline: string;
  mission: string;
  vision: string;
  domain: string;
  url: string;
  contact: {
    email: string;
    phone: string;
    phoneFormatted: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    zip: string;
    crisisLine: string;
    crisisText: string;
    ohioCareLine: string;
  };
  communityResources: {
    name: string;
    url: string;
    domain: string;
    description: string;
  };
  standards: {
    narrLevel: string;
    narrDescription: string;
    orhLevel: string;
    orhDescription: string;
  };
  firstHome: {
    name: string;
    tagline: string;
    level: string;
    residenceTracks: string[];
    description: string;
    features: string[];
    workModelHighlights: string[];
  };
  fourRs: Array<{
    title: string;
    subtitle: string;
    description: string;
    icon: string;
  }>;
}

export const siteConfig: SiteConfig = {
  name: "Life Recovery Society",
  shortName: "LRS",
  tagline: "Rescuing Addicts • Reconnecting Families • Repairing Brokenness • Restoring Communities",
  domain: "liferecoverysociety.org",
  url: "https://liferecoverysociety.org",
  
  mission:
    "At Life Recovery Society, our mission is to help those struggling with addiction and mental health overcome barriers, provide a safe, sober, spiritual, homelike environment and a flexible way to earn an income, while inspiring, educating, and equipping them to develop a quality, meaningful, and purpose-filled life.",

  vision:
    "At Life Recovery Society, our vision is to create a replicable, self-sustaining Biblical model of shared vision, partnership, and collaboration between non-profit, for-profit, churches, government, and communities to rescue addicts, reconnect families, repair brokenness, and restore communities.",

  contact: {
    email: "info@liferecoverysociety.org",
    phone: "1-614-200-2139",
    phoneFormatted: "(614) 200-2139",
    addressLine1: "Made for More Residence",
    addressLine2: "Chillicothe & Ross County Region",
    city: "Chillicothe",
    state: "OH",
    zip: "45601",
    crisisLine: "988 (National Suicide & Crisis Lifeline)",
    crisisText: "Text 'HOME' to 741741",
    ohioCareLine: "1-800-720-9616 (Ohio CareLine 24/7)",
  },

  communityResources: {
    name: "Chillicothe & Ross County Community Resources",
    url: "https://chillicothecommunityresources.org",
    domain: "chillicothecommunityresources.org",
    description:
      "A comprehensive directory of community services, emergency shelters, food pantries, medical clinics, addiction treatment, and social services throughout Chillicothe and Ross County, Ohio.",
  },

  standards: {
    narrLevel: "NARR Level II: Monitored Recovery Residence",
    narrDescription:
      "Complies with all National Alliance for Recovery Residences (NARR) Standard 3.0 requirements: certified safety and physical environment, resident governance, senior peer leadership, structured community meetings, mandatory recovery plan, and sober accountability.",
    orhLevel: "Ohio Recovery Housing (ORH) Level II Certified",
    orhDescription:
      "Meets all Ohio Recovery Housing quality standards and Ohio Department of Mental Health and Addiction Services (OhioMHAS) guidelines, providing an alcohol- and illicit-drug-free home environment with peer support and structured community life.",
  },

  firstHome: {
    name: "Made for More",
    tagline: "Dedicated Level II Sober Living for Men & Women",
    level: "Level II Monitored Recovery Residence",
    residenceTracks: [
      "Separate Men's Sober Living Wing & Community",
      "Separate Women's Sober Living Wing & Community",
    ],
    description:
      "Our premier sober living home, 'Made for More', offers a dignified, historic brick residence designed to feel like a warm, supportive home rather than an institution. Operating under both separate Men's and Women's housing tracks, Made for More combines spiritual renewal, rigorous peer accountability, and flexible vocational opportunities.",
    features: [
      "Separate dedicated living quarters & accommodations for men and women",
      "Live-in house manager & trained peer recovery leaders",
      "Safe, structured, drug- and alcohol-free spiritual sanctuary",
      "Regular random toxicology screenings to ensure accountability",
      "Daily community chores, family-style dinners, and weekly house meetings",
      "Active engagement in 12-step or faith-based recovery meetings",
      "Quiet reflection spaces, study rooms, and community fellowship areas",
    ],
    workModelHighlights: [
      "Flexible schedule coordination so work never compromises recovery or meetings",
      "Partnerships with local ethical employers and Christian business networks",
      "Financial literacy, budgeting, and savings escrow guidance",
      "Resume building, interview coaching, and vocational skills development",
      "Earn-while-you-heal model fostering dignity and independent sustainability",
    ],
  },

  fourRs: [
    {
      title: "Rescue Addicts",
      subtitle: "Immediate Sanctuary",
      description:
        "Providing immediate refuge from the trap of substance use and despair through safe, structured, Christ-centered sober living.",
      icon: "ShieldAlert",
    },
    {
      title: "Reconnect Families",
      subtitle: "Relational Healing",
      description:
        "Mending broken bonds between parents, children, and spouses as residents regain trust, emotional stability, and spiritual integrity.",
      icon: "Users",
    },
    {
      title: "Repair Brokenness",
      subtitle: "Holistic Restoration",
      description:
        "Addressing the root trauma, mental health barriers, and spiritual wounds through trauma-informed care and peer brotherhood/sisterhood.",
      icon: "HeartHandshake",
    },
    {
      title: "Restore Communities",
      subtitle: "Self-Sustaining Impact",
      description:
        "Equipping transformed men and women to become productive citizens, faithful mentors, and active leaders throughout Ohio.",
      icon: "Building2",
    },
  ],
};
