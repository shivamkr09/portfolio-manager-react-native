import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PortfolioState, AboutMe, Skill, Experience, Project } from '../types/portfolio';

const initialState: PortfolioState = {
  aboutMe: {
    description: 'Software Engineer with 1.7 years of experience in Full-stack development',
    location: 'Noida',
  },
  skills: [],
  experiences: [],
  projects: [],
  isLoading: false,
  error: null,
};

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    updateAboutMe: (state, action: PayloadAction<AboutMe>) => {
      state.aboutMe = action.payload;
    },
    addSkill: (state, action: PayloadAction<Skill>) => {
      state.skills.push(action.payload);
    },
    removeSkill: (state, action: PayloadAction<string>) => {
      state.skills = state.skills.filter(skill => skill.name !== action.payload);
    },
    updateExperience: (state, action: PayloadAction<Experience[]>) => {
      state.experiences = action.payload;
    },
    updateProjects: (state, action: PayloadAction<Project[]>) => {
      state.projects = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  updateAboutMe,
  addSkill,
  removeSkill,
  updateExperience,
  updateProjects,
  setLoading,
  setError,
} = portfolioSlice.actions;

export default portfolioSlice.reducer;