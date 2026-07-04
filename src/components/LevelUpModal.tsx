import { useEffect, useState } from 'react';
import { X, Sparkles, Star, Zap } from 'lucide-react';

interface LevelUpModalProps {
  show: boolean;
  onClose: () => void;
  newLevel: number;
  rewards: {
    xp: number;
    coins: number;
  };
}

export default function LevelUpModal({ show, onClose, newLevel, rewards }: LevelUpModalProps) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (show) {
      setAnimate(true);
      const timer = setTimeout(() => {
        setAnimate(false);
        setTimeout(onClose, 3000);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className={`relative max-w-md w-full mx-4 p-8 bg-gradient-to-br from-purple-900/90 to-indigo-900/90 border-2 border-purple-500/30 rounded-3xl text-center transform transition-all duration-500 ${
        animate ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
      }`}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Celebration Animation */}
        <div className="relative mb-6">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl shadow-yellow-500/50">
            <Sparkles className="w-12 h-12 text-white" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
            <Star className="w-4 h-4 text-white" />
          </div>
          <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-purple-400 rounded-full flex items-center justify-center animate-bounce" style={{ animationDelay: '0.5s' }}>
            <Zap className="w-4 h-4 text-white" />
          </div>
        </div>

        <h2 className="text-4xl font-black text-white mb-2" style={{ fontFamily: 'Space Grotesk' }}>
          LEVEL UP!
        </h2>
        <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400 mb-4" style={{ fontFamily: 'Space Grotesk' }}>
          {newLevel}
        </div>
        <p className="text-gray-300 mb-6">Congratulations on reaching a new milestone!</p>

        {/* Rewards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-white/10 rounded-xl">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="text-2xl font-bold text-white">{rewards.xp}</span>
            </div>
            <div className="text-sm text-gray-400">XP Bonus</div>
          </div>
          <div className="p-4 bg-white/10 rounded-xl">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Zap className="w-5 h-5 text-green-400" />
              <span className="text-2xl font-bold text-white">{rewards.coins}</span>
            </div>
            <div className="text-sm text-gray-400">Coins</div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-xl text-white font-bold transition-all"
        >
          Continue Learning
        </button>
      </div>
    </div>
  );
}
