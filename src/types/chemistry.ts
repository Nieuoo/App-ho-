export type ElementCategory =
  | 'alkali-metal'
  | 'alkaline-earth'
  | 'transition-metal'
  | 'post-transition-metal'
  | 'metalloid'
  | 'reactive-nonmetal'
  | 'halogen'
  | 'noble-gas'
  | 'lanthanide'
  | 'actinide';

export interface ChemicalElement {
  z: number;
  symbol: string;
  nameVi: string;
  nameIupac: string;
  atomicMass: number;
  period: number;
  group: number; // 1-18
  groupLabel: string; // IA, IIA, etc.
  category: ElementCategory;
  electronConfig: string;
  electronegativity?: number; // Pauling
  atomicRadius?: number; // pm
  metallicCharacter: 'Kim loại mạnh' | 'Kim loại' | 'Kim loại yếu' | 'Á kim' | 'Phi kim' | 'Phi kim mạnh' | 'Khí hiếm';
  highestOxide: string;
  oxideNature: string;
  highestHydroxide: string;
  hydroxideNature: string;
  applications: string;
  funFact?: string;
  colorScheme: {
    bg: string;
    border: string;
    text: string;
    glow: string;
  };
}

export interface StudentProfile {
  fullName: string;
  className: string;
  studentNo: string;
  loginTime: string;
}

export interface RegisteredStudent {
  fullName: string;
  className: string;
  studentNo: string;
  pin: string;
  registeredAt: string;
  lastLoginAt?: string;
  maxMcCorrect?: number;
  maxTfCorrect?: number;
  maxSaCorrect?: number;
  maxTestScore10?: number;
  maxTestRawScore?: number;
}

export interface ExerciseScoreRecord {
  timestamp: string;
  fullName: string;
  className: string;
  studentNo: string;
  exerciseType: 'Trắc nghiệm' | 'Đúng / Sai' | 'Trả lời ngắn';
  correctCount: number;
  totalQuestions: number;
  percentage: number;
  score10: number;
}

export interface MiniTestScoreRecord {
  timestamp: string;
  fullName: string;
  className: string;
  studentNo: string;
  score10: number;
  rawScore: number;
  mcCorrect: number;
  tfStatementsCorrect: number;
  saCorrect: number;
  timeSpent: string;
}

export interface GoogleSheetsConfig {
  spreadsheetId: string;
  spreadsheetName: string;
  spreadsheetUrl: string;
  connectedAt?: string;
}

export type ExerciseType = 'multiple-choice' | 'true-false' | 'short-answer' | 'essay';

export interface MultipleChoiceQuestion {
  id: string;
  type: 'multiple-choice';
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  hint?: string;
}

export interface TrueFalseStatement {
  statement: string;
  isCorrect: boolean;
  explanation: string;
}

export interface TrueFalseQuestion {
  id: string;
  type: 'true-false';
  context: string;
  statements: TrueFalseStatement[];
  explanation: string;
}

export interface ShortAnswerQuestion {
  id: string;
  type: 'short-answer';
  question: string;
  acceptedAnswers: string[]; // e.g. ["P2O5", "P₂O₅"], ["31", "31 g/mol"]
  unit?: string;
  explanation: string;
  hint?: string;
}

export interface EssayQuestion {
  id: string;
  type: 'essay';
  question: string;
  suggestedAnswer: string;
  gradingCriteria: {
    criterion: string;
    points: number;
  }[];
  explanation: string;
}

export type ExerciseQuestion =
  | MultipleChoiceQuestion
  | TrueFalseQuestion
  | ShortAnswerQuestion
  | EssayQuestion;

export interface TestSession {
  questions: ExerciseQuestion[];
  userAnswers: Record<string, any>;
  startedAt: number;
  durationSeconds: number;
  isFinished: boolean;
  score?: number;
  submittedAt?: number;
}
