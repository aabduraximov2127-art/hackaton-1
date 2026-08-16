import React, { useState, useEffect } from 'react';
import { User, Course, Topic, LevelCode, UserRole, LanguageCode } from './types';
import { OsonStorageService } from './services/storage';
import { soundFX } from './services/audio';

// Common Components
import { Sidebar } from './components/common/Sidebar';
import { Footer } from './components/common/Footer';
import { AdminContactModal } from './components/common/AdminContactModal';

// Views
import { LandingPage } from './components/landing/LandingPage';
import { DashboardHome } from './components/dashboard/DashboardHome';
import { CourseCatalog } from './components/courses/CourseCatalog';
import { CourseDetail } from './components/courses/CourseDetail';
import { TopicView } from './components/courses/TopicView';
import { QuizArena } from './components/quiz/QuizArena';
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
  const [activeLanguage, setActiveLanguage] = useState<LanguageCode>('en');
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

  const handleSelectLanguage = (lang: LanguageCode) => {
    setActiveLanguage(lang);
    soundFX.playXP();
  };

  const handleLogout = () => {
    OsonStorageService.setCurrentUser(null);
    setCurrentUser(null);
    setActiveTab('landing');
  };

  return (
    <div className="min-h-screen bg-[#0b0c10] text-[#f1f0ee] font-['Manrope',sans-serif] selection:bg-[#ff6b4a] selection:text-[#0c0e14]">
      
      {/* SIDEBAR (YON MENYU / SITE BAR) */}
      <Sidebar
        currentUser={currentUser}
        activeTab={activeTab}
        activeLanguage={activeLanguage}
        onSelectTab={handleSelectTab}
        onSelectLanguage={handleSelectLanguage}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenStreakModal={() => setIsStreakOpen(true)}
        onOpenXPModal={() => setIsXPOpen(true)}
        onLogout={handleLogout}
      />

      {/* MAIN APP CONTENT CONTAINER (Margin left for desktop sidebar) */}
      <div className="lg:pl-72 flex flex-col min-h-screen">
        
        {/* Main Content View */}
        <main className="flex-1 w-full max-w-[1140px] mx-auto px-4 sm:px-8 pt-20 lg:pt-8 pb-12">
          
          {/* LANDING PAGE (If not logged in or activeTab === 'landing') */}
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

          {/* QUIZZES ARENA */}
          {currentUser && activeTab === 'quizzes' && (
            <QuizArena
              onStartQuiz={(qId) => {
                setActiveQuizId(qId);
                setActiveTab('quiz-player');
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

          {/* SPEAKING STUDIO */}
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
            <div className="space-y-8">
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
      </div>

      {/* MODALS */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          if (user.role === 'ADMIN') {
            setActiveTab('admin');
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
              onLevelPassed={() => {
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
