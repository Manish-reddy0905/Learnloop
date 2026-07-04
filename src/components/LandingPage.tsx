import { useStore } from '../store/useStore';
import { SignedOut, UserButton } from '@clerk/clerk-react';
import { Zap, ArrowRight, BookOpen, Trophy, Target, Sparkles, Code, Database, Brain, ChevronRight, Play, Users, Award, Flame } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function LandingPage() {
  const { navigate, theme } = useStore();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const floatingElements = [
    { icon: <Code className="w-8 h-8" />, delay: 0, x: -100, y: -50 },
    { icon: <Database className="w-8 h-8" />, delay: 0.2, x: 100, y: -100 },
    { icon: <Brain className="w-8 h-8" />, delay: 0.4, x: -50, y: 100 },
    { icon: <Sparkles className="w-8 h-8" />, delay: 0.6, x: 150, y: 50 },
  ];

  const features = [
    {
      icon: <Target className="w-6 h-6" />,
      title: 'AI-Powered Learning',
      description: 'Personalized course recommendations based on your learning style and goals',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      icon: <Flame className="w-6 h-6" />,
      title: 'Gamified Streaks',
      description: 'Build consistent learning habits with daily streaks and rewards',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: 'Achievements System',
      description: 'Unlock badges and certificates as you complete milestones',
      color: 'from-yellow-500 to-amber-500'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Community Learning',
      description: 'Compete with learners worldwide and join study groups',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: '200+ Expert Courses',
      description: 'Learn from industry experts with hands-on projects',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Industry Certificates',
      description: 'Earn recognized certificates to boost your career',
      color: 'from-pink-500 to-rose-500'
    },
  ];

  return (
    <div className={`min-h-screen overflow-x-hidden relative ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
      {/* Animated Colorful Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-pink-900/20 to-cyan-900/30" />
        
        {/* Animated gradient orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute w-[600px] h-[600px] bg-gradient-to-br from-purple-500/40 via-pink-500/30 to-red-500/20 rounded-full blur-3xl"
          style={{
            left: '-200px',
            top: '-200px',
          }}
        />
        
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute w-[500px] h-[500px] bg-gradient-to-br from-blue-500/40 via-cyan-500/30 to-teal-500/20 rounded-full blur-3xl"
          style={{
            right: '-150px',
            top: '20%',
          }}
        />
        
        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            x: [0, 50, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute w-[400px] h-[400px] bg-gradient-to-br from-green-500/30 via-emerald-500/20 to-teal-500/30 rounded-full blur-3xl"
          style={{
            left: '30%',
            bottom: '-100px',
          }}
        />
        
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -50, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute w-[350px] h-[350px] bg-gradient-to-br from-yellow-500/30 via-orange-500/20 to-red-500/30 rounded-full blur-3xl"
          style={{
            right: '20%',
            bottom: '10%',
          }}
        />
        
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            x: [0, 80, 0],
            y: [0, -80, 0],
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute w-[450px] h-[450px] bg-gradient-to-br from-indigo-500/30 via-purple-500/20 to-pink-500/30 rounded-full blur-3xl"
          style={{
            left: '10%',
            top: '40%',
          }}
        />

        {/* Mouse-following gradient */}
        <motion.div
          animate={{
            x: mousePosition.x * 0.03,
            y: mousePosition.y * 0.03,
          }}
          transition={{ type: "spring", damping: 20, stiffness: 100 }}
          className="absolute w-[300px] h-[300px] bg-gradient-to-br from-pink-500/40 to-purple-500/40 rounded-full blur-2xl"
          style={{
            left: mousePosition.x - 150,
            top: mousePosition.y - 150,
          }}
        />

        {/* Animated particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `hsl(${Math.random() * 360}, 70%, 60%)`,
            }}
          />
        ))}

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }} />
      </div>

      {/* Floating Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {floatingElements.map((element, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.2, 1],
              x: [element.x, element.x + 20, element.x],
              y: [element.y, element.y - 20, element.y],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: element.delay,
              ease: "easeInOut"
            }}
            className="absolute text-purple-400/30"
            style={{
              left: `calc(50% + ${element.x}px)`,
              top: `calc(50% + ${element.y}px)`,
            }}
          >
            {element.icon}
          </motion.div>
        ))}
      </div>

      {/* Navbar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 w-full z-50 backdrop-blur-xl border-b ${theme === 'dark' ? 'bg-[#0a0a1a]/80 border-white/10' : 'bg-white/80 border-gray-200'}`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3"
          >
            <motion.div
              whileHover={{ rotate: 180, scale: 1.1 }}
              transition={{ duration: 0.3 }}
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center"
            >
              <Zap className="w-5 h-5 text-white" />
            </motion.div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent" style={{ fontFamily: 'Space Grotesk' }}>
              LearnLoop
            </span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-3"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('instructor-login')}
              className={`px-4 py-2 text-sm transition-colors ${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Instructor Portal
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('student-login')}
              className={`px-4 py-2 text-sm transition-colors ${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Student Portal
            </motion.button>
            <SignedOut>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(147, 51, 234, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-2 text-sm bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl font-medium hover:opacity-90 transition-opacity shadow-lg shadow-purple-500/25 text-white"
              >
                Get Started Free
              </motion.button>
            </SignedOut>
            <UserButton afterSignOutUrl="/" />
          </motion.div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20">
        <div className="relative max-w-7xl mx-auto px-6 py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-8"
            >
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-purple-400">AI-Powered Learning Platform</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight" style={{ fontFamily: 'Space Grotesk' }}>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className={`bg-gradient-to-r bg-clip-text text-transparent ${theme === 'dark' ? 'from-white via-purple-200 to-indigo-300' : 'from-gray-900 via-purple-600 to-indigo-600'}`}
              >
                Learn Smarter.
              </motion.span>
              <br />
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent"
              >
                Track Better.
              </motion.span>
              <br />
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className={`bg-gradient-to-r bg-clip-text text-transparent ${theme === 'dark' ? 'from-white to-gray-300' : 'from-gray-700 to-gray-900'}`}
              >
                Grow Faster.
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className={`text-xl max-w-3xl mx-auto mb-10 leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}
            >
              LearnLoop is the world's most intelligent adaptive learning platform. Master programming,
              DSA, databases and more with AI-powered recommendations, gamified streaks,
              and industry-recognized certificates.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <SignedOut>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(147, 51, 234, 0.6)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('student-login')}
                  className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl text-lg font-semibold hover:opacity-90 transition-all shadow-2xl shadow-purple-500/30"
                >
                  <Play className="w-5 h-5" />
                  Start Learning for Free
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </SignedOut>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-purple-400 uppercase tracking-widest">Platform Features</span>
          <h2 className="text-4xl md:text-5xl font-black mt-3 mb-4" style={{ fontFamily: 'Space Grotesk' }}>
            Built Different. Built Better.
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Every feature is designed to maximize your learning efficiency using cutting-edge technology</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className={`p-6 rounded-2xl ${theme === 'dark' ? 'bg-white/5 border border-white/10' : 'bg-white border border-gray-200'} backdrop-blur-sm group cursor-pointer`}
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
              >
                {feature.icon}
              </motion.div>
              <h3 className={`text-lg font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {feature.title}
              </h3>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="p-12 bg-gradient-to-br from-purple-900/40 to-indigo-900/40 border border-purple-500/20 rounded-3xl backdrop-blur-sm relative overflow-hidden">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                rotate: [360, 180, 0],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute -bottom-20 -left-20 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl"
            />
            
            <div className="relative">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-5xl mb-6"
              >
                🚀
              </motion.div>
              <h2 className="text-4xl font-black mb-4" style={{ fontFamily: 'Space Grotesk' }}>
                Ready to Level Up Your Skills?
              </h2>
              <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                Join 500,000+ learners building their tech careers with LearnLoop's adaptive platform.
                Start free, learn at your pace, earn real certificates.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <SignedOut>
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(147, 51, 234, 0.6)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('student-login')}
                    className="px-10 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl text-lg font-bold hover:opacity-90 transition-all shadow-2xl shadow-purple-500/30 flex items-center gap-2"
                  >
                    🎓 Start Your Journey — It's Free
                    <ChevronRight className="w-5 h-5" />
                  </motion.button>
                </SignedOut>
              </div>
              <p className="text-xs text-gray-500 mt-4">No credit card required • Cancel anytime • 200+ courses</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">LearnLoop</span>
          </motion.div>
          <p className="text-gray-600 text-sm">© 2024 LearnLoop. Built with MongoDB Atlas, React & AI.</p>
          <div className="flex items-center gap-4 text-xs text-gray-600">
            {['Privacy Policy', 'Terms of Service', 'Support'].map((item) => (
              <motion.span
                key={item}
                whileHover={{ scale: 1.1, color: '#a855f7' }}
                className="cursor-pointer transition-colors"
              >
                {item}
              </motion.span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
