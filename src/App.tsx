import React, { useState, useEffect } from 'react';
import { User, Course, Topic, LevelCode, UserRole } from './types';
import { OsonStorageService } from './services/storage';
import { soundFX } from './services/audio';

// Common Components
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { AdminContactModal } from './components/common/AdminContactModal';

// Views
import { LandingPage } from './components/landing/LandingPage';
import { DashboardHome } from './components/dashboard/DashboardHome';
import { CourseCatalog } from './components/courses/CourseCatalog';
import { CourseDetail } from './components/courses/CourseDetail';
import { TopicView } from './components/courses/TopicView';
import { QuizPlayer } from './components/quiz/QuizPlayer';
import { SpeakingStudio } from './components/speaking/SpeakingStudio';
import { AITutorChat } from './components/aiTutor/AITutorChat';
import { FlashcardDeck } from './components/vocabulary/FlashcardDeck';
import { LeaderboardView } from './components/gamification/LeaderboardView';
import { AchievementsGrid } from './components/gamification/AchievementsGrid';
import { XPTransactionsModal } from './components/gamification/XPTransactionsModal';
import { StreakModal } from './components/gamification/StreakModal';
import { LevelTestModal } from './components/levelTest/LevelTestModal';
import { OsonMap } from './components/map/OsonMap';
import { UserProfile } from './components/profile/UserProfile';
import { DoctorDashboard } from './components/doctor/DoctorDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AuthModal } from './components/auth/AuthModal';

export const App: React.FC = () => {
  // Initialize storage
  useEffect(() => {
    OsonStorageService.init();
  }, []);

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    OsonStorageService.init();
    return OsonStorageService.getCurrentUser();
  });

  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [activeQuizId, setActiveQuizId] = useState<string>('quiz-a1-1');
  const [speakingTopicTitle, setSpeakingTopicTitle] = useState<string | undefined>(undefined);

  // Modals state
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isXPOpen, setIsXPOpen] = useState(false);
  const [isStreakOpen, setIsStreakOpen] = useState(false);
  const [levelTestCode, setLevelTestCode] = useState<LevelCode | null>(null);

  // Auto-switch tabs if role changes to DOCTOR or ADMIN
  const handleSwitchRole = (role: UserRole) => {
    const allUsers = OsonStorageService.getAllUsers();
    let target = allUsers.find(u => u.role === role);
    if (!target) {
      target = { ...allUsers[0], role: role };
    }
    OsonStorageService.setCurrentUser(target);
    setCurrentUser(target);
    soundFX.playCorrect();

    if (role === 'ADMIN') {
      setActiveTab('admin');
    } else if (role === 'DOCTOR') {
      setActiveTab('doctor');
    } else {
      setActiveTab('dashboard');
    }
  };

  const handleSelectTab = (tab: string, extraData?: unknown) => {
    soundFX.playClick();
    if (tab === 'course-detail' && extraData) {
      setSelectedCourse(extraData as Course);
    }
    if (tab === 'topic-view' && extraData) {
      setSelectedTopic(extraData as Topic);
    }
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    OsonStorageService.setCurrentUser(null);
    setCurrentUser(null);
    setActiveTab('landing');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0f19] text-slate-100 font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* Top Navbar */}
      <Navbar
        currentUser={currentUser}
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
        onOpenXPModal={() => setIsXPOpen(true)}
        onOpenStreakModal={() => setIsStreakOpen(true)}
        onSwitchRole={handleSwitchRole}
        onLogout={handleLogout}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        
        {/* LANDING PAGE */}
        {(!currentUser || activeTab === 'landing') && (
          <LandingPage
            onStart={() => {
              if (currentUser) {
                setActiveTab('dashboard');
              } else {
                setIsAuthOpen(true);
              }
            }}
            onOpenAuth={() => setIsAuthOpen(true)}
            onTrySpeaking={() => {
              if (currentUser) {
                setActiveTab('speaking');
              } else {
                setIsAuthOpen(true);
              }
            }}
            onTryAI={() => {
              if (currentUser) {
                setActiveTab('ai-tutor');
              } else {
                setIsAuthOpen(true);
              }
            }}
          />
        )}

        {/* DASHBOARD HOME */}
        {currentUser && activeTab === 'dashboard' && (
          <DashboardHome
            currentUser={currentUser}
            onSelectTab={handleSelectTab}
            onOpenLevelTest={(lvl) => setLevelTestCode(lvl as LevelCode)}
            onOpenXPModal={() => setIsXPOpen(true)}
            onOpenStreakModal={() => setIsStreakOpen(true)}
          />
        )}

        {/* COURSES CATALOG */}
        {currentUser && activeTab === 'courses' && (
          <CourseCatalog
            onSelectCourse={(c) => {
              setSelectedCourse(c);
              setActiveTab('course-detail');
            }}
          />
        )}

        {/* COURSE DETAIL */}
        {currentUser && activeTab === 'course-detail' && selectedCourse && (
          <CourseDetail
            course={selectedCourse}
            onBack={() => setActiveTab('courses')}
            onSelectTopic={(t) => {
              setSelectedTopic(t);
              setActiveTab('topic-view');
            }}
          />
        )}

        {/* TOPIC VIEW */}
        {currentUser && activeTab === 'topic-view' && selectedTopic && (
          <TopicView
            topic={selectedTopic}
            onBack={() => setActiveTab('course-detail')}
            onOpenSpeakingStudio={(title) => {
              setSpeakingTopicTitle(title);
              setActiveTab('speaking');
            }}
            onOpenQuizPlayer={(qId) => {
              setActiveQuizId(qId);
              setActiveTab('quiz-player');
            }}
          />
        )}

        {/* QUIZ PLAYER */}
        {currentUser && activeTab === 'quiz-player' && (
          <QuizPlayer
            quizId={activeQuizId}
            currentUser={currentUser}
            onBack={() => {
              if (selectedTopic) {
                setActiveTab('topic-view');
              } else {
                setActiveTab('dashboard');
              }
            }}
          />
        )}

        {/* SPEAKING STUDIO (WOW FEATURE) */}
        {currentUser && activeTab === 'speaking' && (
          <SpeakingStudio
            currentUser={currentUser}
            initialTopicTitle={speakingTopicTitle}
            onBack={() => setActiveTab('dashboard')}
          />
        )}

        {/* AI TUTOR CHAT */}
        {currentUser && activeTab === 'ai-tutor' && (
          <AITutorChat currentUser={currentUser} />
        )}

        {/* VOCABULARY & FLASHCARDS */}
        {currentUser && activeTab === 'vocabulary' && (
          <FlashcardDeck />
        )}

        {/* LEADERBOARD */}
        {currentUser && activeTab === 'leaderboard' && (
          <div className="space-y-12">
            <LeaderboardView currentUser={currentUser} />
            <AchievementsGrid currentUser={currentUser} />
          </div>
        )}

        {/* MAP */}
        {currentUser && activeTab === 'map' && (
          <OsonMap />
        )}

        {/* USER PROFILE */}
        {currentUser && activeTab === 'profile' && (
          <UserProfile
            currentUser={currentUser}
            onUpdateUser={(updated) => setCurrentUser(updated)}
          />
        )}

        {/* DOCTOR PANEL */}
        {currentUser && activeTab === 'doctor' && (
          <DoctorDashboard currentUser={currentUser} />
        )}

        {/* ADMIN PANEL */}
        {currentUser && activeTab === 'admin' && (
          <AdminDashboard currentUser={currentUser} />
        )}

      </main>

      {/* Footer */}
      <Footer
        onOpenContact={() => setIsContactOpen(true)}
        onSelectTab={handleSelectTab}
      />

      {/* MODALS */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          if (user.role === 'ADMIN') {
            setActiveTab('admin');
          } else if (user.role === 'DOCTOR') {
            setActiveTab('doctor');
          } else {
            setActiveTab('dashboard');
          }
        }}
      />

      <AdminContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        userEmail={currentUser?.email}
      />

      {currentUser && (
        <>
          <XPTransactionsModal
            isOpen={isXPOpen}
            onClose={() => setIsXPOpen(false)}
            currentUser={currentUser}
          />

          <StreakModal
            isOpen={isStreakOpen}
            onClose={() => setIsStreakOpen(false)}
            currentUser={currentUser}
          />

          {levelTestCode && (
            <LevelTestModal
              isOpen={!!levelTestCode}
              onClose={() => setLevelTestCode(null)}
              levelCode={levelTestCode}
              currentUser={currentUser}
              onLevelPassed={(newLevel) => {
                const refreshed = OsonStorageService.getCurrentUser();
                if (refreshed) setCurrentUser(refreshed);
              }}
            />
          )}
        </>
      )}

    </div>
  );
};

export default App;
