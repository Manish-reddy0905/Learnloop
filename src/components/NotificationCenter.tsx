import { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { Bell, X, Check, Trash2, BookOpen, Trophy, Award, MessageSquare, Zap, Flame } from 'lucide-react';

export interface Notification {
  id: string;
  type: 'course' | 'achievement' | 'discussion' | 'xp' | 'streak' | 'system';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  actionUrl?: string;
}

export default function NotificationCenter() {
  const { currentUser, theme, addToast } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Mock notifications - in production, fetch from backend
    const mockNotifications: Notification[] = [
      {
        id: '1',
        type: 'achievement',
        title: 'Achievement Unlocked! 🎉',
        message: 'You earned the "First Step" badge for enrolling in your first course.',
        read: false,
        createdAt: new Date(Date.now() - 3600000).toISOString()
      },
      {
        id: '2',
        type: 'xp',
        title: 'XP Milestone Reached',
        message: 'You earned 500 XP! Keep up the great work.',
        read: false,
        createdAt: new Date(Date.now() - 86400000).toISOString()
      },
      {
        id: '3',
        type: 'course',
        title: 'New Course Available',
        message: 'Check out "Advanced React Patterns" - now available in the catalog.',
        read: true,
        createdAt: new Date(Date.now() - 172800000).toISOString(),
        actionUrl: 'courses'
      },
      {
        id: '4',
        type: 'streak',
        title: 'Streak Warning 🔥',
        message: 'Don\'t forget to complete a lesson today to maintain your streak!',
        read: true,
        createdAt: new Date(Date.now() - 259200000).toISOString()
      }
    ];
    setNotifications(mockNotifications);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    addToast({ type: 'success', message: 'All notifications marked as read' });
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
    addToast({ type: 'success', message: 'All notifications cleared' });
  };

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'course': return <BookOpen className="w-4 h-4 text-blue-400" />;
      case 'achievement': return <Award className="w-4 h-4 text-yellow-400" />;
      case 'discussion': return <MessageSquare className="w-4 h-4 text-purple-400" />;
      case 'xp': return <Zap className="w-4 h-4 text-purple-400" />;
      case 'streak': return <Flame className="w-4 h-4 text-orange-400" />;
      default: return <Bell className="w-4 h-4 text-gray-400" />;
    }
  };

  const timeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 hover:bg-white/10 rounded-lg transition-colors"
      >
        <Bell className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        )}
      </button>

      {isOpen && (
        <>
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-40"
          />
          <div className={`absolute right-0 top-12 w-80 max-h-96 overflow-y-auto rounded-2xl border shadow-2xl z-50 ${theme === 'dark' ? 'bg-[#0d1117] border-white/10' : 'bg-white border-gray-200'}`}>
            {/* Header */}
            <div className={`flex items-center justify-between p-4 border-b ${theme === 'dark' ? 'border-white/10' : 'border-gray-200'}`}>
              <h3 className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Notifications</h3>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-xs text-purple-400 hover:text-purple-300"
                  >
                    Mark all read
                  </button>
                )}
                {notifications.length > 0 && (
                  <button
                    onClick={clearAll}
                    className="text-xs text-red-400 hover:text-red-300"
                  >
                    Clear all
                  </button>
                )}
              </div>
            </div>

            {/* Notifications List */}
            {notifications.length === 0 ? (
              <div className="p-8 text-center">
                <Bell className={`w-12 h-12 mx-auto mb-3 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`} />
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>No notifications</p>
              </div>
            ) : (
              <div className="divide-y" style={{ borderColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}>
                {notifications.map(notification => (
                  <div
                    key={notification.id}
                    className={`p-4 hover:bg-white/5 transition-colors ${!notification.read ? (theme === 'dark' ? 'bg-purple-500/5' : 'bg-purple-50') : ''}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-white/10' : 'bg-gray-100'}`}>
                        {getIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className={`text-sm font-medium ${!notification.read ? (theme === 'dark' ? 'text-white' : 'text-gray-900') : (theme === 'dark' ? 'text-gray-400' : 'text-gray-600')}`}>
                            {notification.title}
                          </h4>
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="flex-shrink-0"
                            >
                              <Check className="w-4 h-4 text-purple-400 hover:text-purple-300" />
                            </button>
                          )}
                        </div>
                        <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          {notification.message}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                            {timeAgo(notification.createdAt)}
                          </span>
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="w-3 h-3 text-gray-500 hover:text-red-400" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
