import { useStore } from '../store/useStore';
import {
  LayoutDashboard, BookOpen,
  User, Zap, LogOut, Target, MessageCircle, Trophy, Award, Sun, Moon, Heart, TargetIcon, Swords, Menu, X, MessageSquare, Bell
} from 'lucide-react';
import { AppView } from '../types';
import { SignOutButton } from '@clerk/clerk-react';
import { useState } from 'react';
import NotificationCenter from './NotificationCenter';

export default function Sidebar() {
  const { currentUser, currentView, navigate, setChatOpen, chatOpen, logout, userProgress, theme, toggleTheme } = useStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const totalCompleted = Object.values(userProgress).filter(p => p.percentage === 100).length;
  
  const navItems = [
    { icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard', view: 'dashboard' as AppView },
    { icon: <BookOpen className="w-5 h-5" />, label: 'Courses', view: 'courses' as AppView },
    { icon: <Heart className="w-5 h-5" />, label: 'Favorites', view: 'wishlist' as AppView },
    { icon: <MessageSquare className="w-5 h-5" />, label: 'Discussions', view: 'discussion' as AppView },
    { icon: <TargetIcon className="w-5 h-5" />, label: 'Daily Challenges', view: 'daily-challenges' as AppView },
    { icon: <Trophy className="w-5 h-5" />, label: 'Achievements', view: 'achievements' as AppView },
    { icon: <Swords className="w-5 h-5" />, label: 'Competitions', view: 'competitions' as AppView },
    { icon: <Trophy className="w-5 h-5" />, label: 'Leaderboard', view: 'leaderboard' as AppView },
    { icon: <Award className="w-5 h-5" />, label: 'Certificates', view: 'certificates' as AppView },
    { icon: <User className="w-5 h-5" />, label: 'Profile', view: 'profile' as AppView },
  ];

  const xpToNextLevel = ((currentUser?.level || 1) * 500);
  const xpProgress = ((currentUser?.totalXP || 0) % 500) / 500 * 100;

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="fixed top-4 left-4 z-50 md:hidden p-3 bg-purple-600 rounded-xl text-white shadow-lg shadow-purple-500/30 hover:bg-purple-700 transition-colors"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed md:sticky top-0 h-screen z-50 md:z-0 transition-transform duration-300 ease-in-out ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      } w-64 border-r flex flex-col overflow-y-auto ${
        theme === 'dark' ? 'bg-[#0d0d1f] border-white/5' : 'bg-white border-gray-200'
      }`}>
        {/* Mobile Close Button */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <div className="text-sm font-black bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent" style={{ fontFamily: 'Space Grotesk' }}>
              LearnLoop
            </div>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Logo */}
        <div className={`hidden md:flex items-center justify-between p-5 border-b ${theme === 'dark' ? 'border-white/5' : 'border-gray-200'}`}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-sm font-black bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent" style={{ fontFamily: 'Space Grotesk' }}>
                LearnLoop
              </div>
              <div className={`text-xs ${theme === 'dark' ? 'text-gray-600' : 'text-gray-500'}`}>v2.0 — MongoDB Edition</div>
            </div>
          </div>
          <NotificationCenter />
        </div>

      {/* User Card */}
      {currentUser && (
        <div className={`p-4 m-3 rounded-2xl border ${
          theme === 'dark'
            ? 'bg-gradient-to-br from-purple-900/30 to-indigo-900/30 border-purple-500/10'
            : 'bg-purple-50 border-purple-200'
        }`}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-sm font-bold shadow-lg text-white">
              {currentUser.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <div className={`text-sm font-semibold truncate ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{currentUser.name}</div>
              <div className="text-xs text-purple-400">Level {currentUser.level} Learner</div>
            </div>
          </div>

          {/* XP Progress */}
          <div className="mb-2">
            <div className={`flex justify-between text-xs mb-1 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>
              <span>{currentUser.totalXP} XP</span>
              <span>Lvl {currentUser.level + 1}: {xpToNextLevel} XP</span>
            </div>
            <div className={`h-1.5 rounded-full overflow-hidden ${theme === 'dark' ? 'bg-white/5' : 'bg-gray-200'}`}>
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all"
                style={{ width: `${xpProgress}%` }}
              />
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-3 mt-3">
            <div className="flex items-center gap-1 text-xs">
              <Target className="w-3 h-3 text-green-400" />
              <span className="text-green-400 font-bold">{totalCompleted}</span>
              <span className={theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}>courses done</span>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2">
        <div className={`text-xs font-medium uppercase tracking-widest px-2 mb-2 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-500'}`}>Navigation</div>
        {navItems.map(item => (
          <button
            key={item.view}
            onClick={() => {
              navigate(item.view);
              setIsMobileMenuOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium mb-1 transition-all ${
              currentView === item.view
                ? 'bg-gradient-to-r from-purple-600/30 to-indigo-600/30 text-white border border-purple-500/20 shadow-sm'
                : theme === 'dark'
                  ? 'text-gray-400 hover:text-white hover:bg-white/5'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <span className={currentView === item.view ? 'text-purple-400' : ''}>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className={`p-3 border-t space-y-1 ${theme === 'dark' ? 'border-white/5' : 'border-gray-200'}`}>
        <button
          onClick={toggleTheme}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
            theme === 'dark'
              ? 'text-gray-400 hover:text-white hover:bg-white/5'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </button>
        <button
          onClick={() => setChatOpen(!chatOpen)}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
            chatOpen
              ? 'bg-indigo-600/30 text-indigo-300'
              : theme === 'dark'
                ? 'text-gray-400 hover:text-white hover:bg-white/5'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          <MessageCircle className="w-5 h-5" />
          AI Tutor
          <span className="ml-auto text-xs bg-indigo-500/20 text-indigo-400 px-1.5 py-0.5 rounded-md">AI</span>
        </button>
        <SignOutButton>
          <button
            onClick={() => {
              logout();
              setIsMobileMenuOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
              theme === 'dark'
                ? 'text-gray-400 hover:text-red-400 hover:bg-red-500/5'
                : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
            }`}
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </SignOutButton>
      </div>
    </aside>
    </>
  );
}
