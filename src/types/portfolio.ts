export interface Skill {
  name: string;
  category: 'Frontend Development' | 'Backend Development' | 'Languages' | 'Cloud/Databases';
}

export interface Experience {
  title: string;
  company: string;
  duration: string;
  description: string;
  achievements: string[];
}

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  image?: string;
  githubUrl?: string;
  demoUrl?: string;
}

export interface AboutMe {
  description: string;
  location: string;
}

export interface PortfolioState {
  aboutMe: AboutMe;
  skills: Skill[];
  experiences: Experience[];
  projects: Project[];
  isLoading: boolean;
  error: string | null;
}