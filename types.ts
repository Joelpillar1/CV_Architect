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
  atHandle?: string;
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
  currentTag?: string; // For tagging saved templates
}

export interface SavedTemplate {
  id: string;
  tag: string;
  baseTemplate: TemplateType;
  data: ResumeData;
}

// Add 'vanguard' and remove the deleted templates for now.
export type TemplateType = 'vanguard';

export const INITIAL_DATA: ResumeData = {
  fullName: "Joel Olamilekan Opowoye",
  jobTitle: "UIUX Designer",
  email: "joelpillar51@gmail.com",
  phone: "+123-456-7890", // Kept for other templates, used as placeholder
  atHandle: "@johnsmith",
  linkedin: "linkedin.com/in/johnsmith",
  location: "San Francisco, CA",
  summary: "Creative UI/UX Designer specializing in crafting modern, intuitive interfaces for mobile and web applications. Adept at using user research, design thinking, and rapid prototyping to solve real user problems. Experienced in building design systems, delivering polished visuals, and collaborating with engineers to bring products to life. Dedicated to shipping beautiful, functional products that users love.",
  experience: [
    {
      id: '1',
      company: "TechCorp Inc.",
      role: "Software Engineer",
      startDate: "2024-05",
      endDate: "2025-01",
      description: "• Designed and delivered intuitive web and mobile interfaces by translating user research, business goals, and product requirements into wireframes, prototypes, and high-fidelity designs.\n• Collaborated with product managers, developers, and stakeholders to refine user flows, create scalable design systems, and ensure consistent, high-quality user experiences across all platforms.\n• Conducted usability testing and iterative improvements to optimize conversion, reduce friction in user journeys, and enhance overall product performance."
    },
    {
      id: '2',
      company: "Amigo",
      role: "Software Engineer",
      startDate: "2025-02",
      endDate: "Present",
      description: "• Designed and delivered intuitive web and mobile interfaces by translating user research, business goals, and product requirements into wireframes, prototypes, and high-fidelity designs.\n• Collaborated with product managers, developers, and stakeholders to refine user flows, create scalable design systems, and ensure consistent, high-quality user experiences across all platforms."
    }
  ],
  education: [
    {
      id: '1',
      school: "University of California • Berkeley, CA",
      degree: "Bachelor of Science in Computer Science",
      year: "Feb 2025"
    }
  ],
  skills: "Graphic design, Prototyping, Wireframing, Product management, HTML, CSS, User Experience, Communication",
  certifications: "Google UX Design Certificate - Google, 2022",
  keyAchievements: "• Redesigned a mobile onboarding flow that increased user engagement by 45% and reduced drop-off rate by 30%.\n• Redesigned a mobile onboarding flow that increased user engagement by 45% and reduced drop-off rate by 30%.",
  font: 'Helvetica, Arial, sans-serif',
  fontSize: 12.5,
  currentTag: 'Software Engineer Role',
};