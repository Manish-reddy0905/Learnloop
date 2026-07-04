import { motion } from 'framer-motion';

export default function LearningBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden -z-10" style={{
      background: 'linear-gradient(135deg, #0a0a1a 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #1a1a2e 100%)'
    }}>
      {/* Animated Gradient Blob 1 */}
      <motion.div
        className="absolute rounded-full bg-gradient-to-br from-purple-600/60 to-indigo-600/60 blur-3xl"
        style={{
          left: '20%',
          top: '30%',
          width: 400,
          height: 400,
          marginLeft: -200,
          marginTop: -200,
        }}
        animate={{
          x: [0, 30, -30, 0],
          y: [0, -30, 30, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Animated Gradient Blob 2 */}
      <motion.div
        className="absolute rounded-full bg-gradient-to-br from-blue-600/50 to-cyan-600/50 blur-3xl"
        style={{
          left: '80%',
          top: '20%',
          width: 350,
          height: 350,
          marginLeft: -175,
          marginTop: -175,
        }}
        animate={{
          x: [0, -30, 30, 0],
          y: [0, 30, -30, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Animated Gradient Blob 3 */}
      <motion.div
        className="absolute rounded-full bg-gradient-to-br from-indigo-600/50 to-purple-600/50 blur-3xl"
        style={{
          left: '50%',
          top: '70%',
          width: 450,
          height: 450,
          marginLeft: -225,
          marginTop: -225,
        }}
        animate={{
          x: [0, 20, -20, 0],
          y: [0, -20, 20, 0],
          scale: [1, 1.2, 0.8, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-purple-400/60"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: Math.random() * 4 + 2,
            height: Math.random() * 4 + 2,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0.6, 1, 0.6],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
}

