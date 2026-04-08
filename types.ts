
export enum UserRole {
  STUDENT = 'STUDENT',
  ADMIN = 'ADMIN'
}

export interface SubjectMark {
  subject: string;
  score: number;
}

export interface StudentProfile {
  fullName: string;
  email: string;
  marks: SubjectMark[];
  interests: string[];
  skills: string[];
  stream: 'Science' | 'Commerce' | 'Arts';
  completionPercentage: number;
}

export interface AptitudeResult {
  logical: number;
  verbal: number;
  numerical: number;
  creative: number;
  technical: number;
  science: number; // Added Science
  timestamp: string;
}

export interface CareerRecommendation {
  id: string;
  title: string;
  matchPercentage: number;
  description: string;
  whyFits: string;
  scope: string;
  avgSalary: string;
  requiredSkills: string[];
  suggestedColleges: string[];
  entranceExams: string[];
}

export interface RoadmapStep {
  title: string;
  description: string;
  duration: string;
  resources: { name: string; url: string }[];
}

export interface CareerRoadmap {
  careerId: string;
  steps: RoadmapStep[];
  improvementTips: string[];
}

export interface Feedback {
  id: string;
  studentId: string;
  careerId: string;
  rating: number; // 1-5
  isUseful: boolean;
  comment: string;
  timestamp: string;
}