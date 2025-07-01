export interface User {
  id: string;
  email: string;
  mobile?: string;
  firstName: string;
  lastName: string;
  grade: number;
  avatar: string;
  subjects: Subject[];
  learningGoals: string[];
  createdAt: Date;
  lastLogin: Date;
}

export interface Subject {
  id: string;
  name: string;
  icon: string;
  color: string;
  progress: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedAt?: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}