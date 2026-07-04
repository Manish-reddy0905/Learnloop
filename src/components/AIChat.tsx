import { useState, useRef, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { X, Send, Bot, User, Sparkles, RefreshCw } from 'lucide-react';

const getAIResponse = (message: string, enrolledCourses: string[], userProgress: Record<string, { percentage: number }>, currentUser: { name: string; streak: number; totalXP: number; level: number } | null, courses: any[]): string => {
  const msg = message.toLowerCase();
  
  // Greetings
  if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey') || msg.includes('good morning') || msg.includes('good evening')) {
    return `Hey ${currentUser?.name?.split(' ')[0] || 'there'}! 👋 I'm your AI learning tutor powered by LearnLoop's intelligence engine. I can help you with:\n\n• 📚 Course recommendations\n• 🗺️ Learning path guidance\n• 💡 Concept explanations\n• 🎯 Study tips\n• 📊 Progress analysis\n• ❓ Any questions about programming, databases, or learning\n\nWhat would you like to explore today?`;
  }
  
  // Recommendations
  if (msg.includes('recommend') || msg.includes('what should') || msg.includes('next course') || msg.includes('suggest')) {
    const enrolled = enrolledCourses;
    const completed = enrolled.filter(id => userProgress[id]?.percentage === 100);
    
    if (completed.includes('java-basics') && !enrolled.includes('dsa')) {
      return `Based on your Java progress, I recommend **Data Structures & Algorithms** next! 🌳\n\nHere's why:\n• You've mastered Java basics — DSA builds on exactly those skills\n• DSA is essential for technical interviews at FAANG companies\n• It'll make you a 10x better programmer\n\n**Recommended Learning Path:**\n☕ Java Basics (done!) → 🌳 DSA → 🍃 Spring Boot → 🍃 MongoDB\n\nStart DSA today and complete it in 4-6 weeks with 1-2 hours daily! 🚀`;
    }
    
    if (completed.includes('dsa') && !enrolled.includes('spring-boot')) {
      return `Excellent DSA skills! Now I recommend **Spring Boot & Microservices** 🍃\n\nYour path:\n✅ Java Basics → ✅ DSA → **Spring Boot** → MongoDB\n\nSpring Boot will teach you to build production-grade REST APIs, which combines perfectly with your Java + DSA foundation. You'll be backend-ready! 💪`;
    }
    
    if (!enrolled.length) {
      return `For beginners, I recommend starting with **Java Programming Fundamentals** ☕\n\nJava is:\n• 🏆 #1 most used enterprise language\n• 💼 Required for 65% of backend jobs\n• 🎓 Perfect foundation for DSA and Spring Boot\n\nAfter Java → DSA → Spring Boot → MongoDB = Full Backend Developer in 6 months! 🚀`;
    }
    
    const nonEnrolled = courses.filter(c => !enrolled.includes(c.id));
    if (nonEnrolled.length > 0) {
      const rec = nonEnrolled[0];
      return `I recommend exploring **${rec.title}** ${rec.icon}\n\n${rec.description}\n\n📊 ${rec.totalStudents.toLocaleString()} students enrolled · ⭐ ${rec.rating} rating\n\nThis fits well with your current learning journey!`;
    }
    
    return `You're crushing it! Consider:\n\n1. **Python for Data Science** 🐍 — AI/ML path\n2. **React Development** ⚛️ — Frontend mastery\n3. **MongoDB Complete Guide** 🍃 — Database expertise\n\nAll are free and certificate-equipped!`;
  }
  
  // Java questions - broader matching
  if (msg.includes('java')) {
    if (msg.includes('what') || msg.includes('explain') || msg.includes('how') || msg.includes('why')) {
      return `**Java** is a high-level, object-oriented programming language! ☕\n\n**Key concepts:**\n\n\`\`\`java\n// Your first Java program!\npublic class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("Hello, LearnLoop!");\n    }\n}\n\`\`\`\n\n**Core pillars of Java:**\n• 🔒 **Encapsulation** — Hide data inside classes\n• 🧬 **Inheritance** — Reuse code via parent-child classes\n• 🔄 **Polymorphism** — One interface, many forms\n• 📦 **Abstraction** — Show only what's necessary\n\nJava runs on the JVM (Java Virtual Machine), making it platform-independent — "Write Once, Run Anywhere"! 🌍`;
    }
    return `**Java** ☕ — I can help with any Java questions!\n\nAsk me about:\n• "Explain Java classes and objects"\n• "How does inheritance work?"\n• "What is the JVM?"\n• "Java vs other languages"\n• "Java best practices"\n\nI'm here to help you master Java! 💪`;
  }
  
  // DSA questions - broader matching
  if (msg.includes('dsa') || msg.includes('data structure') || msg.includes('algorithm') || msg.includes('linked list') || msg.includes('binary tree') || msg.includes('sorting') || msg.includes('searching')) {
    return `**Data Structures & Algorithms** 🌳 — the backbone of computer science!\n\n**Essential Data Structures:**\n• 📋 **Arrays** — O(1) access, O(n) insert\n• 🔗 **Linked Lists** — O(1) insert, O(n) access\n• 📦 **Stack (LIFO)** — push/pop in O(1)\n• 🎫 **Queue (FIFO)** — enqueue/dequeue in O(1)\n• 🌳 **Binary Trees** — O(log n) operations\n• #️⃣ **Hash Tables** — O(1) average lookup\n\n**Interview tip:** Practice 2-3 LeetCode problems daily after completing the DSA course. Consistency > intensity! 💪\n\n**Time Complexity cheatsheet:**\nBinary Search: O(log n)\nBubble Sort: O(n²)\nMerge Sort: O(n log n)\n\nWant me to explain any specific algorithm or data structure?`;
  }
  
  // MongoDB questions - broader matching
  if (msg.includes('mongodb') || msg.includes('nosql') || msg.includes('aggregation') || msg.includes('database') || msg.includes('document')) {
    return `**MongoDB** is a document-oriented NoSQL database! 🍃\n\n**Quick aggregation example:**\n\`\`\`javascript\ndb.students.aggregate([\n  // Match active students\n  { $match: { active: true } },\n  \n  // Group and calculate average\n  { $group: {\n    _id: "$courseId",\n    avgScore: { $avg: "$score" },\n    totalStudents: { $sum: 1 }\n  }},\n  \n  // Sort by popularity\n  { $sort: { totalStudents: -1 }},\n  \n  // Take top 5\n  { $limit: 5 }\n])\n\`\`\`\n\n**Why MongoDB for LearnLoop?**\n• 📄 Flexible document schema for learning data\n• ⚡ Fast aggregation for analytics\n• 🌐 Atlas for global scalability\n• 🔍 Full-text search built-in\n\nAsk me about MongoDB queries, indexing, or schema design!`;
  }
  
  // React questions - broader matching
  if (msg.includes('react') || msg.includes('hooks') || msg.includes('usestate') || msg.includes('component') || msg.includes('jsx')) {
    return `**React** is a JavaScript library for building UIs! ⚛️\n\n**Essential Hooks:**\n\`\`\`jsx\nimport { useState, useEffect } from 'react';\n\nfunction LearningTracker() {\n  const [progress, setProgress] = useState(0);\n  const [lessons, setLessons] = useState([]);\n  \n  useEffect(() => {\n    // Fetch lessons on mount\n    fetchLessons().then(setLessons);\n  }, []);\n  \n  return (\n    <div>\n      <h1>Progress: {progress}%</h1>\n    </div>\n  );\n}\n\`\`\`\n\n**React Golden Rules:**\n• State is immutable — always use setState\n• Keys in lists prevent unnecessary re-renders\n• useEffect for side effects (API calls, timers)\n• useMemo/useCallback for performance optimization\n\nWant to learn more about React hooks, Redux, or Next.js?`;
  }
  
  // Streak/motivation - broader matching
  if (msg.includes('streak') || msg.includes('motivat') || msg.includes('consistent') || msg.includes('habit') || msg.includes('focus') || msg.includes('discipline')) {
    const streak = currentUser?.streak || 0;
    return `🔥 Your current streak: **${streak} days**!\n\n**Building consistent learning habits:**\n\n1. **⏰ Same time daily** — Your brain loves routine. Study at 8 AM or 8 PM, pick one!\n2. **🎯 2-minute rule** — Can't motivate yourself? Just open the app for 2 minutes. You'll keep going.\n3. **📱 Remove friction** — Bookmark LearnLoop. Set a daily reminder.\n4. **🏆 Reward yourself** — After 7 days, treat yourself. After 30 days, celebrate big!\n5. **👥 Accountability** — Share your streak on LinkedIn. Public commitment works!\n\n${streak >= 7 ? '🌟 You\'re a Week Warrior! Amazing consistency!' : `${7 - streak} more days to unlock the Week Warrior badge! 💪`}`;
  }
  
  // Certificate questions - broader matching
  if (msg.includes('certificate') || msg.includes('cert') || msg.includes('credential')) {
    return `🎓 **Earning Certificates on LearnLoop:**\n\n**Steps to get certified:**\n1. ✅ Complete ALL lessons in the course\n2. 🎯 Take the final quiz\n3. 📊 Score **70% or higher** to pass\n4. 🎓 Certificate is automatically generated!\n5. 📥 Download as PDF\n6. 🔗 Share on LinkedIn\n\n**What's on your certificate:**\n• Your full name\n• Course title & instructor\n• Quiz score achieved\n• Unique credential ID\n• LearnLoop verified seal\n\nCertificates are recognized by 200+ tech companies! 🏢`;
  }
  
  // Progress check - broader matching
  if (msg.includes('progress') || msg.includes('how am i doing') || msg.includes('stats') || msg.includes('my stats') || msg.includes('performance')) {
    const enrolled = enrolledCourses.length;
    const xp = currentUser?.totalXP || 0;
    const level = currentUser?.level || 1;
    return `📊 **Your Learning Stats:**\n\n• 📚 Courses enrolled: **${enrolled}**\n• ⚡ Total XP: **${xp.toLocaleString()}**\n• 🏅 Level: **${level}**\n• 🔥 Streak: **${currentUser?.streak || 0} days**\n\n${enrolled === 0 ? '🎯 **Action:** Enroll in your first course!\nI recommend starting with Java Basics ☕' : enrolled < 3 ? '💡 **Tip:** Explore more courses to diversify your skills!' : '🚀 **Excellent!** You\'re building a strong learning portfolio!'}`;
  }
  
  // Python - broader matching
  if (msg.includes('python')) {
    return `**Python** 🐍 — the most versatile programming language!\n\n**Why learn Python?**\n• 🤖 #1 for Machine Learning & AI\n• 📊 Data Science with Pandas & NumPy\n• 🌐 Web dev with Django & Flask\n• 🔬 Scientific computing\n• ⚡ Clean, readable syntax\n\n**Quick Python example:**\n\`\`\`python\n# Python is beautiful!\ndef calculate_avg(scores: list) -> float:\n    return sum(scores) / len(scores)\n\nstudent_scores = [100, 85, 92, 78, 95]\nprint(f"Class Average: {calculate_avg(student_scores):.1f}%")\n# Output: Class Average: 90.0%\n\`\`\`\n\nPython + MongoDB is a power combo for data-driven apps! 🚀\n\nAsk me about Python libraries, frameworks, or specific topics!`;
  }
  
  // General programming questions
  if (msg.includes('programming') || msg.includes('coding') || msg.includes('developer') || msg.includes('software')) {
    return `**Programming & Software Development** 💻\n\n**Key areas to master:**\n• 🎯 **Problem Solving** — Break down complex problems\n• 📚 **Data Structures** — Organize data efficiently\n• 🔄 **Algorithms** — Solve problems systematically\n• 🏗️ **System Design** — Build scalable applications\n• 🧪 **Testing** — Ensure code quality\n\n**Best practices:**\n• Write clean, readable code\n• Use version control (Git)\n• Test your code thoroughly\n• Learn from others' code\n• Stay updated with technologies\n\nWhat specific area would you like to explore?`;
  }
  
  // Career questions
  if (msg.includes('career') || msg.includes('job') || msg.includes('salary') || msg.includes('interview') || msg.includes('hire')) {
    return `**Career in Tech** 🚀\n\n**In-demand roles:**\n• 💻 **Full Stack Developer** — $80K-150K\n• 🤖 **ML Engineer** — $100K-200K\n• 🍃 **Backend Engineer** — $90K-160K\n• ⚛️ **Frontend Engineer** — $75K-140K\n• 🗄️ **Data Engineer** — $85K-150K\n\n**Skills employers want:**\n1. Problem-solving abilities\n2. Strong fundamentals (DSA)\n3. Practical project experience\n4. Communication skills\n5. Continuous learning mindset\n\n**Interview tips:**\n• Practice LeetCode (200+ problems)\n• Build portfolio projects\n• Know your resume inside out\n• Ask thoughtful questions\n\nWhat career path interests you?`;
  }
  
  // Learning tips
  if (msg.includes('learn') || msg.includes('study') || msg.includes('how to') || msg.includes('tips') || msg.includes('advice')) {
    return `**Effective Learning Strategies** 🧠\n\n**Study techniques:**\n• 🎯 **Active Recall** — Test yourself frequently\n• 📝 **Spaced Repetition** — Review at increasing intervals\n• 🔗 **Connect Concepts** — Link new info to existing knowledge\n• 💡 **Teach Others** — Explain to solidify understanding\n\n**Time management:**\n• Use Pomodoro technique (25 min work, 5 min break)\n• Study at the same time daily\n• Remove distractions (phone, notifications)\n• Set specific, achievable goals\n\n**Retention tips:**\n• Code along with tutorials\n• Build real projects\n• Join coding communities\n• Keep a learning journal\n\nWhat topic are you trying to learn?`;
  }
  
  // Help/what can you do
  if (msg.includes('help') || msg.includes('what can you do') || msg.includes('capabilities') || msg.includes('features')) {
    return `**I can help you with:** 🤖\n\n📚 **Course Guidance:**\n• Recommend courses based on your progress\n• Suggest learning paths\n• Explain course prerequisites\n\n💡 **Technical Questions:**\n• Java, Python, React concepts\n• MongoDB & database queries\n• Data structures & algorithms\n• Programming best practices\n\n📊 **Progress & Motivation:**\n• Track your learning stats\n• Streak maintenance tips\n• Study strategies\n• Career advice\n\n🎯 **Specific Topics:**\n• Ask me anything about programming\n• Request code examples\n• Get explanations of concepts\n• Interview preparation tips\n\nJust ask me anything! I'm here to help you succeed! 🚀`;
  }
  
  // Thank you
  if (msg.includes('thank') || msg.includes('thanks') || msg.includes('appreciate')) {
    return `You're welcome! 😊 I'm always here to help you on your learning journey.\n\nKeep up the great work! Remember: consistency beats intensity. Even 15 Minutes daily adds up to big results over time. 💪\n\nIs there anything else you'd like to learn about?`;
  }
  
  // Default response - more helpful
  const responses = [
    `Great question! 🤖\n\nI can help you with:\n• **Technical concepts** — Java, Python, React, MongoDB, DSA\n• **Learning guidance** — Course recommendations, study tips\n• **Career advice** — Job roles, interview prep, salary expectations\n• **Progress tracking** — Your stats, streak maintenance\n• **General programming** — Best practices, problem-solving\n\nTry asking:\n• "Explain how React hooks work"\n• "What's the best way to learn DSA?"\n• "How can I prepare for tech interviews?"\n• "What should I learn after Java?"\n• "Tips for maintaining my learning streak"`,
    `I'm here to help you learn! 🌟\n\nFeel free to ask me about:\n• Any programming concept or language\n• Course recommendations and learning paths\n• Study strategies and motivation\n• Career guidance in tech\n• Your progress and how to improve\n\nSome examples:\n• "What is the difference between SQL and NoSQL?"\n• "How do I prepare for a coding interview?"\n• "Explain recursion with an example"\n• "What's the best way to stay motivated while learning?"\n\nI'll give you clear, practical answers! 💡`,
    `Interesting question! Let me help you with that. 🤖\n\nI specialize in:\n• **Programming** — Java, Python, React, MongoDB, DSA\n• **Learning** — Course recommendations, study techniques\n• **Career** — Job roles, interview prep, industry insights\n• **Motivation** — Streak tips, learning strategies\n\nWhat specific topic would you like to explore? I'm ready to dive deep into any subject! �`,
  ];
  return responses[Math.floor(Math.random() * responses.length)];
};

export default function AIChat() {
  const { chatMessages, addChatMessage, setChatOpen, currentUser, userProgress, courses } = useStore();
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const enrolledCourses = currentUser?.enrolledCourses || [];

  const progressMap: Record<string, { percentage: number }> = {};
  Object.entries(userProgress).forEach(([key, val]) => {
    progressMap[key] = { percentage: val.percentage };
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isTyping]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = {
      id: Date.now().toString(),
      role: 'user' as const,
      content: input,
      timestamp: new Date().toISOString(),
    };

    addChatMessage(userMsg);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking
    await new Promise(r => setTimeout(r, 800 + Math.random() * 800));

    const aiResponse = getAIResponse(input, enrolledCourses, progressMap, currentUser ? {
      name: currentUser.name,
      streak: currentUser.currentStreak,
      totalXP: currentUser.totalXP,
      level: currentUser.level,
    } : null, courses);

    addChatMessage({
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: aiResponse,
      timestamp: new Date().toISOString(),
    });
    setIsTyping(false);
  };

  const suggestedQuestions = [
    '🎯 Recommend my next course',
    '💡 Explain Java basics',
    '🍃 MongoDB aggregation',
    '🔥 How to maintain my streak?',
  ];

  const formatMessage = (content: string) => {
    return content.split('\n').map((line, i) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return <p key={i} className="font-bold text-white">{line.slice(2, -2)}</p>;
      }
      if (line.includes('```')) return null;
      const formatted = line
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/`([^`]+)`/g, '<code class="bg-black/30 px-1 py-0.5 rounded text-green-300 text-xs">$1</code>');
      return <p key={i} dangerouslySetInnerHTML={{ __html: formatted }} className="leading-relaxed" />;
    });
  };

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[560px] bg-[#0d0d1f] border border-white/10 rounded-2xl shadow-2xl shadow-black/50 flex flex-col overflow-hidden z-50">
      {/* Header */}
      <div className="px-4 py-3 bg-gradient-to-r from-indigo-900/60 to-purple-900/60 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-sm font-bold text-white flex items-center gap-1.5">
              AI Tutor
              <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
            </div>
            <div className="text-xs text-green-400 flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              Online · Ready to help
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (chatMessages.length > 0) {
                // Clear messages - just close and reopen
              }
            }}
            className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
            title="New conversation"
          >
            <RefreshCw className="w-4 h-4 text-gray-400" />
          </button>
          <button onClick={() => setChatOpen(false)} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatMessages.length === 0 && (
          <div className="text-center py-4">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-3 shadow-lg">
              🤖
            </div>
            <p className="text-white font-semibold text-sm mb-1">Hi {currentUser?.name?.split(' ')[0] || 'there'}! I'm your AI Tutor</p>
            <p className="text-gray-400 text-xs mb-4">Ask me anything about your courses, learning paths, or concepts!</p>
            <div className="space-y-2">
              {suggestedQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => { setInput(q.replace(/^[^ ]+ /, '')); }}
                  className="w-full text-left px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-gray-300 hover:bg-white/10 hover:border-purple-500/30 transition-all"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {chatMessages.map(msg => (
          <div key={msg.id} className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs ${
              msg.role === 'assistant'
                ? 'bg-gradient-to-br from-indigo-500 to-purple-600'
                : 'bg-gradient-to-br from-purple-500 to-pink-500'
            }`}>
              {msg.role === 'assistant' ? <Bot className="w-4 h-4 text-white" /> : <User className="w-4 h-4 text-white" />}
            </div>
            <div className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed space-y-1 ${
              msg.role === 'user'
                ? 'bg-gradient-to-br from-purple-600 to-indigo-600 text-white rounded-tr-sm'
                : 'bg-white/5 border border-white/5 text-gray-300 rounded-tl-sm'
            }`}>
              {msg.role === 'assistant' ? formatMessage(msg.content) : <p>{msg.content}</p>}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="p-3 bg-white/5 border border-white/5 rounded-2xl rounded-tl-sm">
              <div className="flex items-center gap-1">
                {[0, 1, 2].map(i => (
                  <div key={i} className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 150}ms` }} />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t border-white/5">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
            placeholder="Ask anything..."
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-purple-500 transition-colors"
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim()}
            className="p-2.5 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl hover:opacity-90 transition-all disabled:opacity-40 shadow-lg"
          >
            <Send className="w-4 h-4 text-white" />
          </button>
        </div>
        <p className="text-center text-xs text-gray-600 mt-2">Powered by LearnLoop AI · Not real GPT</p>
      </div>
    </div>
  );
}
