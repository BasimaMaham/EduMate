import { useState, useEffect } from 'react';
import { ThemeProvider } from './contexts/theme-context';
import { Navigation } from './components/navigation';
import { HomeFeed } from './components/home-feed';
import { StudyGroups } from './components/study-groups';
import { TutoringHub } from './components/tutoring-hub';
import { ResourceLibrary } from './components/resource-library';
import { HomeworkHelp } from './components/homework-help';
import { BookExchange } from './components/book-exchange';
import { SubscriptionSharing } from './components/subscription-sharing';
import { Profile } from './components/profile';
import { Login } from './components/auth/login';
import { Register } from './components/auth/register';

export type User = {
  id: string;
  name: string;
  email: string;
  major: string;
  year: string;
  avatar: string;
  karmaPoints: number;
  studyStreak: number;
};

export type StudyGroup = {
  id: string;
  title: string;
  subject: string;
  description: string;
  host: User;
  participants: User[];
  maxParticipants: number;
  type: 'in-person' | 'online';
  privacy: 'public' | 'invite-only' | 'friends-only';
  location?: string;
  coordinates?: { lat: number; lng: number };
  dateTime: string;
  duration: string;
  tags: string[];
};

export type TutorListing = {
  id: string;
  tutor: User;
  subjects: string[];
  hourlyRate: number;
  rating: number;
  reviewCount: number;
  availability: string[];
  description: string;
  verified: boolean;
};

export type Question = {
  id: string;
  author: User;
  title: string;
  content: string;
  subject: string;
  tags: string[];
  timestamp: string;
  answers: Answer[];
  upvotes: number;
  isPaid: boolean;
  bounty?: number;
};

export type Answer = {
  id: string;
  author: User;
  content: string;
  timestamp: string;
  upvotes: number;
  isAccepted: boolean;
};

export type Book = {
  id: string;
  title: string;
  author: string;
  subject: string;
  condition: string;
  price: number;
  seller: User;
  imageUrl: string;
  description: string;
};

export type View = 'feed' | 'groups' | 'tutoring' | 'resources' | 'homework' | 'books' | 'subscriptions' | 'profile';

function AppContent() {
  const [currentView, setCurrentView] = useState<View>('feed');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authView, setAuthView] = useState<'login' | 'register'>('login');
  const [currentUser, setCurrentUser] = useState<User>({
    id: '1',
    name: 'Ahmed Khan',
    email: 'ahmed.khan@formanite.fccollege.edu.pk',
    major: 'Computer Science',
    year: 'Junior',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    karmaPoints: 248,
    studyStreak: 12,
  });

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('edumate_user');
    const loginTime = localStorage.getItem('edumate_login_time');
    
    if (savedUser && loginTime) {
      const now = Date.now();
      const loginTimeMs = parseInt(loginTime);
      const sessionDurationMs = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
      
      if (now - loginTimeMs < sessionDurationMs) {
        // Session is still valid
        setCurrentUser(JSON.parse(savedUser));
        setIsAuthenticated(true);
      } else {
        // Session expired
        localStorage.removeItem('edumate_user');
        localStorage.removeItem('edumate_login_time');
      }
    }
  }, []);

  const handleLogin = (email: string, password: string) => {
    // Mock login - in production, this would call an API
    console.log('Login:', email, password);
    // Save user session to localStorage (7-day expiry)
    localStorage.setItem('edumate_user', JSON.stringify(currentUser));
    localStorage.setItem('edumate_login_time', Date.now().toString());
    setIsAuthenticated(true);
  };

  const handleRegister = (userData: {
    name: string;
    email: string;
    password: string;
    major: string;
    year: string;
  }) => {
    // Mock registration - in production, this would call an API
    console.log('Register:', userData);
    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      major: userData.major,
      year: userData.year,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      karmaPoints: 0,
      studyStreak: 0,
    };
    setCurrentUser(newUser);
    // Save user session to localStorage (7-day expiry)
    localStorage.setItem('edumate_user', JSON.stringify(newUser));
    localStorage.setItem('edumate_login_time', Date.now().toString());
    setIsAuthenticated(true);
  };

  // Show auth screens if not authenticated
  if (!isAuthenticated) {
    if (authView === 'login') {
      return (
        <Login
          onLogin={handleLogin}
          onSwitchToRegister={() => setAuthView('register')}
        />
      );
    } else {
      return (
        <Register
          onRegister={handleRegister}
          onSwitchToLogin={() => setAuthView('login')}
        />
      );
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        currentView={currentView} 
        onViewChange={setCurrentView}
        currentUser={currentUser}
      />
      
      <main>
        {currentView === 'feed' && <HomeFeed currentUser={currentUser} />}
        {currentView === 'groups' && <StudyGroups currentUser={currentUser} />}
        {currentView === 'tutoring' && <TutoringHub currentUser={currentUser} />}
        {currentView === 'resources' && <ResourceLibrary currentUser={currentUser} />}
        {currentView === 'homework' && <HomeworkHelp currentUser={currentUser} />}
        {currentView === 'books' && <BookExchange currentUser={currentUser} />}
        {currentView === 'subscriptions' && <SubscriptionSharing currentUser={currentUser} />}
        {currentView === 'profile' && <Profile currentUser={currentUser} />}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}