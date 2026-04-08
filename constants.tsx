import React from 'react';
import { StudentProfile } from './types';

export const SUBJECTS = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Computer Science', 'Accounts', 'Economics', 'History'];

export const STREAMS = ['Science', 'Commerce', 'Arts'] as const;

export const INITIAL_STUDENT_PROFILE: StudentProfile = {
  fullName: 'Guest Student',
  email: 'student@example.com',
  marks: [
    { subject: 'Mathematics', score: 85 },
    { subject: 'Physics', score: 78 },
    { subject: 'Chemistry', score: 82 },
    { subject: 'English', score: 90 }
  ],
  interests: ['Technology', 'Problem Solving', 'Design'],
  skills: ['Basic Coding', 'Public Speaking'],
  stream: 'Science' as const,
  completionPercentage: 0 // Will be calculated immediately
};

/**
 * Calculates the profile completion percentage.
 * Breakdown:
 * - Full Name (10%)
 * - Stream Selection (10%)
 * - Academic Marks (40% - 10% per subject, max 4)
 * - Interests (20% - 5% per interest, max 4)
 * - Skills (20% - 10% per skill, max 2)
 */
export const calculateProfileCompletion = (profile: StudentProfile): number => {
  let score = 0;
  
  if (profile.fullName && profile.fullName !== 'Guest Student' && profile.fullName.trim().length > 2) {
    score += 10;
  }
  
  if (profile.stream) {
    score += 10;
  }
  
  const marksWithScores = profile.marks.filter(m => m.score > 0).length;
  score += Math.min(marksWithScores * 10, 40);
  
  score += Math.min(profile.interests.length * 5, 20);
  
  score += Math.min(profile.skills.length * 10, 20);
  
  return score;
};

export type CategoryType = 'verbal' | 'numerical' | 'technical' | 'logical' | 'science';

export interface Question {
  id: number;
  category: CategoryType;
  question: string;
  options: string[];
  correct: number;
}

const generateQuestions = (): Question[] => {
  const categories: CategoryType[] = ['verbal', 'numerical', 'technical', 'logical', 'science'];
  const questions: Question[] = [];
  let globalId = 1;

  categories.forEach(cat => {
    for (let i = 1; i <= 25; i++) {
      let qText = "";
      let opts = ["Option A", "Option B", "Option C", "Option D"];
      
      if (cat === 'verbal') qText = `[English Q${i}] Which word is most nearly opposite to the meaning of "Profound"?`;
      else if (cat === 'numerical') qText = `[Aptitude Q${i}] Solve: If a train travels 300km in 4 hours, what is its speed in m/s?`;
      else if (cat === 'technical') qText = `[Technical Q${i}] In a basic circuit, if resistance is doubled and voltage is constant, current is...`;
      else if (cat === 'logical') qText = `[Logical Q${i}] Complete the series: 2, 6, 12, 20, 30, ...`;
      else if (cat === 'science') qText = `[Science Q${i}] What is the primary function of Mitochondria in a eukaryotic cell?`;

      questions.push({
        id: globalId++,
        category: cat,
        question: qText,
        options: opts,
        correct: Math.floor(Math.random() * 4)
      });
    }
  });
  return questions;
};

export const APTITUDE_QUESTIONS = generateQuestions();

export const SECTIONS = [
  { id: 'verbal', title: 'Section 1: English Language', count: 25 },
  { id: 'numerical', title: 'Section 2: Aptitude & Numerical', count: 25 },
  { id: 'technical', title: 'Section 3: Technical Skills', count: 25 },
  { id: 'logical', title: 'Section 4: Logical Reasoning', count: 25 },
  { id: 'science', title: 'Section 5: Science', count: 25 }
];