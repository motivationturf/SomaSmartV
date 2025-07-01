import React, { useState, useEffect } from 'react';
import { LandingPage } from './components/landing/LandingPage';
import { AuthLayout } from './components/auth/AuthLayout';
import { LoginForm } from './components/auth/LoginForm';
import { RegisterForm } from './components/auth/RegisterForm';
import { ForgotPasswordForm } from './components/auth/ForgotPasswordForm';
import { OnboardingFlow, OnboardingData } from './components/onboarding/OnboardingFlow';
import { Navigation } from './components/navigation/Navigation';
import { EnhancedDashboard } from './components/dashboard/EnhancedDashboard';
import { SubjectCatalog } from './components/subjects/SubjectCatalog';
import { ChallengesPage } from './components/challenges/ChallengesPage';
import { LeaderboardsPage } from './components/leaderboards/LeaderboardsPage';
import { LessonPage } from './components/lessons/LessonPage';
import { QuizPage } from './components/quiz/QuizPage';
import { ProfileForm } from './components/profile/ProfileForm';
import { GuestDashboard } from './components/dashboard/GuestDashboard';
import { GuestToAccountFlow } from './components/auth/GuestToAccountFlow';
import { GameArcade } from './components/arcade/GameArcade';
import ProfilePage from './components/profile/ProfilePage';

type AppState = 'landing' | 'login' | 'register' | 'forgot-password' | 'onboarding' | 'dashboard' | 'subjects' | 'challenges' | 'leaderboards' | 'forum' | 'profile' | 'lesson' | 'quiz' | 'guest-dashboard' | 'guest-to-account' | 'arcade';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile?: string;
  grade: string;
  avatar?: string;
  subjects?: string[];
  learningGoals?: string[];
  isGuest?: boolean;
  guestProgress?: {
    lessonsViewed: string[];
    quizzesCompleted: string[];
    timeSpent: number;
    pointsEarned: number;
  };
  // Additional user properties for full functionality
  totalPoints?: number;
  currentRank?: number;
  learningStreak?: number;
  studyTime?: number;
  achievements?: Achievement[];
  preferences?: UserPreferences;
  createdAt?: string;
  lastLogin?: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedAt?: string;
  category: 'learning' | 'social' | 'achievement' | 'streak';
}

interface UserPreferences {
  notifications: boolean;
  emailUpdates: boolean;
  theme: 'light' | 'dark' | 'auto';
  language: 'en' | 'ny' | 'bem';
  studyReminders: boolean;
}

interface GuestProgress {
  lessonsViewed: string[];
  quizzesCompleted: string[];
  timeSpent: number;
  pointsEarned: number;
  challengesTried: string[];
  subjectsExplored: string[];
}

// Mock user database for demonstration
const mockUsers: Record<string, User> = {
  'john.mwansa@example.com': {
    id: '1',
    firstName: 'John',
    lastName: 'Mwansa',
    email: 'john.mwansa@example.com',
    grade: '11',
    avatar: 'avatar-1',
    subjects: ['computer-studies', 'mathematics'],
    learningGoals: ['improve-grades', 'daily-practice'],
    totalPoints: 2847,
    currentRank: 12,
    learningStreak: 7,
    studyTime: 24,
    achievements: [
      {
        id: '1',
        title: 'First Steps',
        description: 'Completed onboarding',
        icon: '🎯',
        earned: true,
        earnedAt: '2024-01-15',
        category: 'learning'
      },
      {
        id: '2',
        title: 'Math Whiz',
        description: 'Solved 50 math problems',
        icon: '🧮',
        earned: true,
        earnedAt: '2024-01-20',
        category: 'achievement'
      }
    ],
    preferences: {
      notifications: true,
      emailUpdates: true,
      theme: 'light',
      language: 'en',
      studyReminders: true
    },
    createdAt: '2024-01-10',
    lastLogin: new Date().toISOString()
  },
  'sarah.phiri@example.com': {
    id: '2',
    firstName: 'Sarah',
    lastName: 'Phiri',
    email: 'sarah.phiri@example.com',
    grade: '12',
    avatar: 'avatar-2',
    subjects: ['sciences', 'mathematics', 'computer-studies'],
    learningGoals: ['exam-preparation', 'master-concepts'],
    totalPoints: 3456,
    currentRank: 8,
    learningStreak: 12,
    studyTime: 36,
    achievements: [],
    preferences: {
      notifications: true,
      emailUpdates: false,
      theme: 'light',
      language: 'en',
      studyReminders: true
    },
    createdAt: '2024-01-05',
    lastLogin: new Date().toISOString()
  }
};

// Mock password storage (in real app, this would be hashed and stored securely)
const mockPasswords: Record<string, string> = {
  'john.mwansa@example.com': 'Password123!',
  'sarah.phiri@example.com': 'SecurePass456!'
};

function App() {
  const [currentState, setCurrentState] = useState<AppState>('landing');
  const [user, setUser] = useState<User | null>(null);
  const [currentSubject, setCurrentSubject] = useState<string>('');
  const [currentTopic, setCurrentTopic] = useState<string>('');
  const [authError, setAuthError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [guestProgress, setGuestProgress] = useState<GuestProgress>({
    lessonsViewed: [],
    quizzesCompleted: [],
    timeSpent: 0,
    pointsEarned: 0,
    challengesTried: [],
    subjectsExplored: []
  });

  // Scroll to top when guest mode is activated
  useEffect(() => {
    if (currentState === 'guest-dashboard') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentState]);

  // Utility function to validate email
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Utility function to validate Zambian mobile number
  const isValidZambianMobile = (mobile: string): boolean => {
    const mobileRegex = /^(\+260|0)[0-9]{9}$/;
    return mobileRegex.test(mobile);
  };

  // Utility function to validate password strength
  const isValidPassword = (password: string): boolean => {
    // At least 8 characters, one uppercase, one lowercase, one number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  };

  // Generate authentication token (in real app, this would be JWT from server)
  const generateAuthToken = (userId: string): string => {
    return btoa(`${userId}:${Date.now()}:${Math.random()}`);
  };

  // Save user session
  const saveUserSession = (userData: User, token: string) => {
    localStorage.setItem('somasmart_user', JSON.stringify(userData));
    localStorage.setItem('somasmart_auth_token', token);
  };

  // Clear user session
  const clearUserSession = () => {
    localStorage.removeItem('somasmart_user');
    localStorage.removeItem('somasmart_auth_token');
  };

  // Enhanced login function with proper validation
  const handleLogin = async (identifier: string, password: string) => {
    setIsLoading(true);
    setAuthError('');

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Validate input
      if (!identifier || !password) {
        throw new Error('Please enter both email/mobile and password');
      }

      // Determine if identifier is email or mobile
      let email = identifier;
      if (!isValidEmail(identifier)) {
        // If not email, check if it's a valid mobile number
        if (isValidZambianMobile(identifier)) {
          // In real app, you'd look up email by mobile number
          // For demo, we'll use a mock conversion
          if (identifier === '+260977123456' || identifier === '0977123456') {
            email = 'john.mwansa@example.com';
          } else {
            throw new Error('Mobile number not found in our records');
          }
        } else {
          throw new Error('Please enter a valid email address or Zambian mobile number');
        }
      }

      // Check if user exists
      const userData = mockUsers[email];
      if (!userData) {
        throw new Error('Account not found. Please check your credentials or sign up.');
      }

      // Verify password
      const storedPassword = mockPasswords[email];
      if (password !== storedPassword) {
        throw new Error('Incorrect password. Please try again.');
      }

      // Update last login
      const updatedUser = {
        ...userData,
        lastLogin: new Date().toISOString()
      };

      // Generate auth token and save session
      const authToken = generateAuthToken(userData.id);
      saveUserSession(updatedUser, authToken);

      setUser(updatedUser);

      // Check if user needs onboarding
      if (!updatedUser.avatar || !updatedUser.subjects || !updatedUser.learningGoals) {
        setCurrentState('onboarding');
      } else {
        setCurrentState('dashboard');
      }

    } catch (error) {
      setAuthError(error instanceof Error ? error.message : 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Enhanced registration function
  const handleRegister = async (userData: any) => {
    setIsLoading(true);
    setAuthError('');

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Validate required fields
      if (!userData.firstName?.trim()) {
        throw new Error('First name is required');
      }
      if (!userData.lastName?.trim()) {
        throw new Error('Last name is required');
      }
      if (!userData.email) {
        throw new Error('Email address is required');
      }
      if (!isValidEmail(userData.email)) {
        throw new Error('Please enter a valid email address');
      }
      if (userData.mobile && !isValidZambianMobile(userData.mobile)) {
        throw new Error('Please enter a valid Zambian mobile number (+260XXXXXXXXX or 0XXXXXXXXX)');
      }
      if (!userData.password) {
        throw new Error('Password is required');
      }
      if (!isValidPassword(userData.password)) {
        throw new Error('Password must be at least 8 characters with uppercase, lowercase, and number');
      }
      if (userData.password !== userData.confirmPassword) {
        throw new Error('Passwords do not match');
      }
      if (!userData.grade) {
        throw new Error('Please select your grade level');
      }

      // Check if user already exists
      if (mockUsers[userData.email]) {
        throw new Error('An account with this email already exists. Please sign in instead.');
      }

      // Create new user
      const newUser: User = {
        id: Date.now().toString(),
        firstName: userData.firstName.trim(),
        lastName: userData.lastName.trim(),
        email: userData.email.toLowerCase(),
        mobile: userData.mobile || undefined,
        grade: userData.grade,
        totalPoints: 0,
        currentRank: 0,
        learningStreak: 0,
        studyTime: 0,
        achievements: [
          {
            id: 'welcome',
            title: 'Welcome to SomaSmart!',
            description: 'Successfully created your account',
            icon: '🎉',
            earned: true,
            earnedAt: new Date().toISOString(),
            category: 'learning'
          }
        ],
        preferences: {
          notifications: true,
          emailUpdates: true,
          theme: 'light',
          language: 'en',
          studyReminders: true
        },
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        isGuest: false
      };

      // Save to mock database
      mockUsers[userData.email] = newUser;
      mockPasswords[userData.email] = userData.password;

      // Generate auth token and save session
      const authToken = generateAuthToken(newUser.id);
      saveUserSession(newUser, authToken);

      setUser(newUser);
      setCurrentState('onboarding');

    } catch (error) {
      setAuthError(error instanceof Error ? error.message : 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Guest mode function
  const handleGuestMode = () => {
    // Create a guest user
    const guestUser: User = {
      id: 'guest',
      firstName: 'Guest',
      lastName: 'User',
      email: 'guest@example.com',
      grade: '10',
      avatar: 'avatar-1',
      subjects: ['computer-studies', 'mathematics', 'sciences', 'religious-education'],
      learningGoals: ['explore-platform'],
      isGuest: true,
      guestProgress: guestProgress,
      totalPoints: 0,
      currentRank: 0,
      learningStreak: 0,
      studyTime: 0
    };
    
    setUser(guestUser);
    setCurrentState('guest-dashboard');
  };

  // Guest to account conversion
  const handleGuestToAccountRegister = async (userData: any) => {
    setIsLoading(true);
    setAuthError('');

    try {
      // Simulate API call to create account and transfer progress
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Validate input (same as regular registration)
      if (!userData.firstName?.trim()) {
        throw new Error('First name is required');
      }
      if (!userData.lastName?.trim()) {
        throw new Error('Last name is required');
      }
      if (!userData.email) {
        throw new Error('Email address is required');
      }
      if (!isValidEmail(userData.email)) {
        throw new Error('Please enter a valid email address');
      }
      if (userData.mobile && !isValidZambianMobile(userData.mobile)) {
        throw new Error('Please enter a valid Zambian mobile number');
      }
      if (!userData.password) {
        throw new Error('Password is required');
      }
      if (!isValidPassword(userData.password)) {
        throw new Error('Password must be at least 8 characters with uppercase, lowercase, and number');
      }
      if (userData.password !== userData.confirmPassword) {
        throw new Error('Passwords do not match');
      }
      if (!userData.grade) {
        throw new Error('Please select your grade level');
      }

      // Check if user already exists
      if (mockUsers[userData.email]) {
        throw new Error('An account with this email already exists. Please sign in instead.');
      }

      // Create new user with guest progress transferred
      const newUser: User = {
        id: Date.now().toString(),
        firstName: userData.firstName.trim(),
        lastName: userData.lastName.trim(),
        email: userData.email.toLowerCase(),
        mobile: userData.mobile || undefined,
        grade: userData.grade,
        isGuest: false,
        guestProgress: guestProgress, // Transfer guest progress
        totalPoints: guestProgress.pointsEarned,
        currentRank: 0,
        learningStreak: 0,
        studyTime: Math.floor(guestProgress.timeSpent / 60),
        achievements: [
          {
            id: 'guest-graduate',
            title: 'Guest Graduate',
            description: 'Successfully converted from guest to full account',
            icon: '🎓',
            earned: true,
            earnedAt: new Date().toISOString(),
            category: 'achievement'
          }
        ],
        preferences: {
          notifications: true,
          emailUpdates: true,
          theme: 'light',
          language: 'en',
          studyReminders: true
        },
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      };

      // Save to mock database
      mockUsers[userData.email] = newUser;
      mockPasswords[userData.email] = userData.password;

      // Generate auth token and save session
      const authToken = generateAuthToken(newUser.id);
      saveUserSession(newUser, authToken);

      setUser(newUser);
      setCurrentState('onboarding');

    } catch (error) {
      setAuthError(error instanceof Error ? error.message : 'Account creation failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Forgot password function
  const handleForgotPassword = async (identifier: string) => {
    setIsLoading(true);
    setAuthError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (!identifier) {
        throw new Error('Please enter your email address or mobile number');
      }

      // Validate identifier
      let email = identifier;
      if (!isValidEmail(identifier)) {
        if (isValidZambianMobile(identifier)) {
          // Mock mobile to email conversion
          if (identifier === '+260977123456' || identifier === '0977123456') {
            email = 'john.mwansa@example.com';
          } else {
            throw new Error('Mobile number not found in our records');
          }
        } else {
          throw new Error('Please enter a valid email address or mobile number');
        }
      }

      // Check if user exists
      if (!mockUsers[email]) {
        throw new Error('No account found with this email address');
      }

      // In real app, send password reset email/SMS
      console.log(`Password reset sent to: ${email}`);

    } catch (error) {
      setAuthError(error instanceof Error ? error.message : 'Password reset failed. Please try again.');
      throw error; // Re-throw to be handled by the form component
    } finally {
      setIsLoading(false);
    }
  };

  // Onboarding completion
  const handleOnboardingComplete = (onboardingData: OnboardingData) => {
    if (user) {
      const updatedUser = {
        ...user,
        avatar: onboardingData.avatar,
        subjects: onboardingData.subjects,
        learningGoals: onboardingData.learningGoals
      };

      // Update mock database
      if (!user.isGuest) {
        mockUsers[user.email] = updatedUser;
        // Update saved session
        const authToken = localStorage.getItem('somasmart_auth_token');
        if (authToken) {
          saveUserSession(updatedUser, authToken);
        }
      }

      setUser(updatedUser);
    }
    setCurrentState('dashboard');
  };

  // Profile update function
  const handleProfileUpdate = async (profileData: any) => {
    setIsLoading(true);
    setAuthError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (!user || user.isGuest) {
        throw new Error('Please sign in to update your profile');
      }

      // Validate input
      if (!profileData.firstName?.trim()) {
        throw new Error('First name is required');
      }
      if (!profileData.lastName?.trim()) {
        throw new Error('Last name is required');
      }
      if (!profileData.email) {
        throw new Error('Email address is required');
      }
      if (!isValidEmail(profileData.email)) {
        throw new Error('Please enter a valid email address');
      }
      if (profileData.mobile && !isValidZambianMobile(profileData.mobile)) {
        throw new Error('Please enter a valid Zambian mobile number');
      }
      if (!profileData.grade) {
        throw new Error('Please select your grade level');
      }

      // Check if email is being changed and if new email already exists
      if (profileData.email !== user.email && mockUsers[profileData.email]) {
        throw new Error('An account with this email already exists');
      }

      const updatedUser = {
        ...user,
        firstName: profileData.firstName.trim(),
        lastName: profileData.lastName.trim(),
        email: profileData.email.toLowerCase(),
        mobile: profileData.mobile || undefined,
        grade: profileData.grade
      };

      // Update mock database
      if (profileData.email !== user.email) {
        // Email changed - update database keys
        delete mockUsers[user.email];
        const password = mockPasswords[user.email];
        delete mockPasswords[user.email];
        
        mockUsers[profileData.email] = updatedUser;
        mockPasswords[profileData.email] = password;
      } else {
        mockUsers[user.email] = updatedUser;
      }

      // Update saved session
      const authToken = localStorage.getItem('somasmart_auth_token');
      if (authToken) {
        saveUserSession(updatedUser, authToken);
      }

      setUser(updatedUser);

    } catch (error) {
      setAuthError(error instanceof Error ? error.message : 'Profile update failed. Please try again.');
      throw error; // Re-throw to be handled by the form component
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const handleLogout = () => {
    clearUserSession();
    setUser(null);
    setGuestProgress({
      lessonsViewed: [],
      quizzesCompleted: [],
      timeSpent: 0,
      pointsEarned: 0,
      challengesTried: [],
      subjectsExplored: []
    });
    setCurrentState('landing');
    setAuthError('');
  };

  // Navigation function
  const handleNavigate = (view: string, subjectId?: string, topicId?: string) => {
    if (subjectId) {
      setCurrentSubject(subjectId);
    }
    if (topicId) {
      setCurrentTopic(topicId);
    }
    setCurrentState(view as AppState);
    setAuthError(''); // Clear any auth errors when navigating
  };

  // Guest upgrade function
  const handleUpgradeFromGuest = () => {
    setCurrentState('guest-to-account');
  };

  // Guest progress update
  const updateGuestProgress = (update: Partial<GuestProgress>) => {
    setGuestProgress(prev => ({ ...prev, ...update }));
    if (user?.isGuest) {
      setUser({
        ...user,
        guestProgress: { ...guestProgress, ...update }
      });
    }
  };

  // Clear auth error when switching between auth states
  useEffect(() => {
    if (['login', 'register', 'forgot-password', 'guest-to-account'].includes(currentState)) {
      setAuthError('');
    }
  }, [currentState]);

  const handleExploreSubject = (subjectId: string) => {
    setCurrentSubject(subjectId);
    setCurrentState('subjects');
  };

  // Handler for 'Explore the Arcade' button
  const handleExploreArcade = () => {
    // If already a guest, just go to arcade
    if (user?.isGuest) {
      setCurrentState('arcade');
      return;
    }
    // Otherwise, set guest user and go to arcade
    const guestUser: User = {
      id: 'guest',
      firstName: 'Guest',
      lastName: 'User',
      email: 'guest@example.com',
      grade: '10',
      avatar: 'avatar-1',
      subjects: ['computer-studies', 'mathematics', 'sciences', 'religious-education'],
      learningGoals: ['explore-platform'],
      isGuest: true,
      guestProgress: guestProgress,
      totalPoints: 0,
      currentRank: 0,
      learningStreak: 0,
      studyTime: 0
    };
    setUser(guestUser);
    setCurrentState('arcade');
  };

  // Render current state
  switch (currentState) {
    case 'landing':
      return (
        <LandingPage
          onGetStarted={() => setCurrentState('register')}
          onGuestMode={handleGuestMode}
          onLogin={() => setCurrentState('login')}
          onExploreSubject={handleExploreSubject}
          onNavigate={handleNavigate}
          onExploreArcade={handleExploreArcade}
        />
      );

    case 'login':
      return (
        <AuthLayout 
          title="Welcome Back!" 
          subtitle="Sign in to continue your learning journey"
        >
          <LoginForm
            onLogin={handleLogin}
            onSwitchToRegister={() => setCurrentState('register')}
            onForgotPassword={() => setCurrentState('forgot-password')}
            onGuestMode={handleGuestMode}
            isLoading={isLoading}
            error={authError}
          />
        </AuthLayout>
      );

    case 'register':
      return (
        <AuthLayout 
          title="Join SomaSmart EduHub" 
          subtitle="Create your account and start learning"
        >
          <RegisterForm
            onRegister={handleRegister}
            onSwitchToLogin={() => setCurrentState('login')}
            onGuestMode={handleGuestMode}
            isLoading={isLoading}
            error={authError}
          />
        </AuthLayout>
      );

    case 'guest-to-account':
      return (
        <AuthLayout 
          title="Create Your Account" 
          subtitle="Keep your progress and unlock all features"
        >
          <GuestToAccountFlow
            guestProgress={guestProgress}
            onRegister={handleGuestToAccountRegister}
            onBackToGuest={() => setCurrentState('guest-dashboard')}
            isLoading={isLoading}
            error={authError}
          />
        </AuthLayout>
      );

    case 'forgot-password':
      return (
        <AuthLayout 
          title="Reset Password" 
          subtitle="We'll help you get back to learning"
        >
          <ForgotPasswordForm
            onResetPassword={handleForgotPassword}
            onBackToLogin={() => setCurrentState('login')}
            isLoading={isLoading}
            error={authError}
          />
        </AuthLayout>
      );

    case 'onboarding':
      return (
        <OnboardingFlow
          onComplete={handleOnboardingComplete}
        />
      );

    case 'guest-dashboard':
      return (
        <div className="min-h-screen bg-gray-50">
          <Navigation 
            currentView="dashboard" 
            onNavigate={handleNavigate} 
            user={user}
            isGuest={true}
            onLogout={handleLogout}
          />
          <GuestDashboard
            user={user}
            guestProgress={guestProgress}
            onNavigate={handleNavigate}
            onUpgrade={handleUpgradeFromGuest}
            onUpdateProgress={updateGuestProgress}
          />
        </div>
      );

    case 'dashboard':
      return (
        <div className="min-h-screen bg-gray-50">
          <Navigation 
            currentView={currentState} 
            onNavigate={handleNavigate} 
            user={user}
            onLogout={handleLogout}
          />
          <EnhancedDashboard
            user={user}
            onNavigate={handleNavigate}
          />
        </div>
      );

    case 'subjects':
      return (
        <div className="min-h-screen bg-gray-50">
          <Navigation 
            currentView={currentState} 
            onNavigate={handleNavigate} 
            user={user}
            onLogout={handleLogout}
          />
          <SubjectCatalog 
            onNavigate={handleNavigate} 
            isGuest={user?.isGuest}
            onUpdateProgress={updateGuestProgress}
            initialSubjectId={currentSubject}
          />
        </div>
      );

    case 'challenges':
      return (
        <div className="min-h-screen bg-gray-50">
          <Navigation 
            currentView={currentState} 
            onNavigate={handleNavigate} 
            user={user}
            onLogout={handleLogout}
          />
          <ChallengesPage 
            onNavigate={handleNavigate} 
            isGuest={user?.isGuest}
            onUpdateProgress={updateGuestProgress}
          />
        </div>
      );

    case 'leaderboards':
      return (
        <div className="min-h-screen bg-gray-50">
          <Navigation 
            currentView={currentState} 
            onNavigate={handleNavigate} 
            user={user}
            onLogout={handleLogout}
          />
          <LeaderboardsPage user={user} isGuest={user?.isGuest} />
        </div>
      );

    case 'arcade':
      return (
        <div className="min-h-screen bg-gray-50">
          <Navigation 
            currentView={currentState} 
            onNavigate={handleNavigate} 
            user={user}
            onLogout={handleLogout}
          />
          <GameArcade 
            onNavigate={handleNavigate} 
            isGuest={user?.isGuest}
            onUpdateProgress={updateGuestProgress}
          />
        </div>
      );

    case 'lesson':
      return (
        <div className="min-h-screen bg-gray-50">
          <Navigation 
            currentView={currentState} 
            onNavigate={handleNavigate} 
            user={user}
            onLogout={handleLogout}
          />
          <LessonPage 
            subjectId={currentSubject} 
            topicId={currentTopic}
            onNavigate={handleNavigate}
            isGuest={user?.isGuest}
            onUpdateProgress={updateGuestProgress}
          />
        </div>
      );

    case 'quiz':
      return (
        <div className="min-h-screen bg-gray-50">
          <Navigation 
            currentView={currentState} 
            onNavigate={handleNavigate} 
            user={user}
            onLogout={handleLogout}
          />
          <QuizPage 
            onNavigate={handleNavigate} 
            isGuest={user?.isGuest}
            onUpdateProgress={updateGuestProgress}
          />
        </div>
      );

    case 'forum':
      return (
        <div className="min-h-screen bg-gray-50">
          <Navigation 
            currentView={currentState} 
            onNavigate={handleNavigate} 
            user={user}
            onLogout={handleLogout}
          />
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="text-center py-12">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Forum</h1>
              {user?.isGuest ? (
                <div className="space-y-4">
                  <p className="text-gray-600">Join our community discussions and connect with classmates!</p>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto">
                    <p className="text-blue-800 text-sm mb-3">
                      Create an account to participate in forum discussions and connect with other students.
                    </p>
                    <button
                      onClick={handleUpgradeFromGuest}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                      Create Account
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-600">Coming soon! Connect and discuss with your classmates.</p>
              )}
            </div>
          </div>
        </div>
      );

    case 'profile':
      if (user?.isGuest) {
        return (
          <div className="min-h-screen bg-gray-50">
            <Navigation 
              currentView={currentState} 
              onNavigate={handleNavigate} 
              user={user}
              isGuest={true}
              onLogout={handleLogout}
            />
            <div className="max-w-2xl mx-auto px-4 py-6">
              <div className="text-center py-12">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Profile Settings</h1>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-md mx-auto">
                  <p className="text-blue-800 mb-4">
                    Create an account to save your progress, customize your profile, and unlock all features.
                  </p>
                  <button
                    onClick={handleUpgradeFromGuest}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Create Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      }
      
      return (
        <div className="min-h-screen bg-gray-50">
          <Navigation 
            currentView={currentState} 
            onNavigate={handleNavigate} 
            user={user}
            onLogout={handleLogout}
          />
          <div className="max-w-3xl mx-auto px-4 py-6">
            <ProfilePage
              user={user}
              onUpdate={handleProfileUpdate}
              isLoading={isLoading}
              error={authError}
            />
          </div>
        </div>
      );

    default:
      return null;
  }
}

export default App;