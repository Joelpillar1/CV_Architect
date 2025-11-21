export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  year: string;
}

export interface ResumeData {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  linkedin: string;
  location: string;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: string; // Comma separated for simplicity in editing
  certifications: string; // Comma separated
  keyAchievements?: string; // New field for the Achievements tab
  jobDescription?: string; // New field for Job Match tab
  font?: string;
  fontSize?: number;
}

export type TemplateType = 'modern' | 'classic' | 'academic' | 'executive' | 'minimal';

export const INITIAL_DATA: ResumeData = {
  fullName: "Abdullahi Aishat",
  jobTitle: "Business Developer | KOL Affiliate Manager",
  email: "aishataabdullahi595@gmail.com",
  phone: "+234 70 5375 3968",
  linkedin: "linkedin.com/abdullahi-a-isha",
  location: "Lagos, Nigeria",
  summary: "I bring 4 years of experience in business development, KOL management, and growth strategy, helping Web3 and fintech companies scale. I specialize in managing influencer and affiliate networks, launching user acquisition funnels, and executing growth strategies that boost engagement and retention.",
  experience: [
    {
      id: '1',
      company: "MEXC",
      role: "Business Development Manager",
      startDate: "Contract",
      endDate: "",
      description: "• Led KOL and affiliate-driven campaigns, collaborating with influencers to drive adoption.\n• Coordinated user acquisition initiatives through AMAs and workshops.\n• Negotiated and structured collaborations aligned with DAO growth objectives."
    },
    {
      id: '2',
      company: "Bantu Exchange",
      role: "Business Development Manager",
      startDate: "2023",
      endDate: "2024",
      description: "• Supported exchange growth initiatives by coordinating user acquisition efforts.\n• Collaborated with marketing teams to align campaigns with compliance goals.\n• Managed reporting and performance tracking across BD and marketing."
    }
  ],
  education: [
    {
      id: '1',
      school: "Kogi State University",
      degree: "B.Sc. Chemistry",
      year: "2015 - 2019"
    }
  ],
  skills: "Business Development, KOL Management, Blockchain Technology, Market Analysis, Team Leadership, Data Analysis Tools (Excel)",
  certifications: "Google Data Analytics Certificate, Coursera Business Management",
  keyAchievements: "• Built and managed partnership pipelines that consistently drove trading activity and improved campaign ROI.\n• Strengthened brand visibility by coordinating over 5+ offline events and educational seminars across major cities.\n• Drove affiliate growth at Bybit, onboarding high-value partners and boosting trading volume through targeted campaign management.",
  font: 'Helvetica, Arial, sans-serif',
  fontSize: 12.5
};