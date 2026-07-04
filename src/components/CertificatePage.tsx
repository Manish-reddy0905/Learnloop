import { useRef, useState } from 'react';
import { useStore } from '../store/useStore';
import { Download, ArrowLeft, Award, Share2, X } from 'lucide-react';
import { api } from '../lib/api';

export default function CertificatePage() {
  const { selectedCourseId, currentUser, userProgress, navigate, courses } = useStore();
  const certRef = useRef<HTMLDivElement>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  
  const course = courses.find(c => c.id === selectedCourseId);
  const progress = userProgress[selectedCourseId || ''];

  if (!course || !currentUser || !progress?.certificateEarned) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#0a0a1a]">
        <div className="text-center">
          <div className="text-4xl mb-4">🔒</div>
          <p className="text-white font-semibold mb-2">Certificate not earned yet</p>
          <p className="text-gray-400 text-sm mb-4">Complete the course and pass the quiz to earn your certificate</p>
          <button onClick={() => navigate('courses')} className="px-6 py-2 bg-purple-600 rounded-xl text-sm text-white">Browse Courses</button>
        </div>
      </div>
    );
  }

  const issueDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const certId = `LL-${course.id.toUpperCase()}-${currentUser.clerkId.slice(0, 6).toUpperCase()}`;

  const shareText = `I just completed the ${course.title} course on LearnLoop and earned my certificate! 🎓`;
  const shareUrl = window.location.href;

  const handleShare = async (platform: string) => {
    const urls: Record<string, string> = {
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    };

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'LearnLoop Certificate',
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        console.log('Share canceled');
      }
    } else if (urls[platform]) {
      window.open(urls[platform], '_blank', 'width=600,height=400');
    }
    setShowShareModal(false);
  };

  const sendEmailNotification = async () => {
    try {
      await api.sendCertificateEmail(currentUser.clerkId, course.id, currentUser.name, currentUser.email, course.title);
      setEmailSent(true);
      setTimeout(() => setEmailSent(false), 3000);
    } catch (error) {
      console.error('Failed to send email:', error);
    }
  };

  const downloadCertificate = () => {
    const content = certRef.current;
    if (!content) return;
    
    console.log('Starting certificate download...');
    
    // Create print-friendly version
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      console.error('Failed to open print window - popup blocker may be active');
      alert('Please allow popups to download the certificate');
      return;
    }
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>LearnLoop Certificate - ${currentUser.name}</title>
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700;900&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: 'Inter', sans-serif; background: #fff; }
          .cert { width: 900px; height: 640px; margin: 0 auto; background: linear-gradient(135deg, #0a0a1a 0%, #1a0a2e 50%, #0a1a1a 100%); display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 50px; border: 4px solid #7c3aed; position: relative; }
          .cert::before { content: ''; position: absolute; inset: 8px; border: 1px solid rgba(124,58,237,0.3); pointer-events: none; }
          .logo { font-family: 'Space Grotesk', sans-serif; font-size: 24px; font-weight: 900; color: #a78bfa; margin-bottom: 20px; }
          .title { font-size: 14px; color: #9ca3af; letter-spacing: 4px; text-transform: uppercase; margin-bottom: 16px; }
          .recipient-label { font-size: 16px; color: #6b7280; margin-bottom: 8px; }
          .recipient-name { font-family: 'Space Grotesk', sans-serif; font-size: 52px; font-weight: 900; color: #fff; margin-bottom: 20px; }
          .completed-text { font-size: 14px; color: #9ca3af; margin-bottom: 8px; }
          .course-name { font-family: 'Space Grotesk', sans-serif; font-size: 28px; font-weight: 700; color: #c4b5fd; margin-bottom: 30px; }
          .meta { display: flex; gap: 60px; margin-top: 20px; }
          .meta-item { text-align: center; }
          .meta-label { font-size: 11px; color: #6b7280; margin-bottom: 4px; }
          .meta-value { font-size: 14px; color: #d1d5db; font-weight: 600; }
          .trophy { font-size: 48px; margin-bottom: 16px; }
          .score-badge { background: linear-gradient(135deg, #7c3aed, #4f46e5); padding: 8px 24px; border-radius: 50px; font-size: 16px; color: #fff; font-weight: 700; margin-bottom: 20px; }
          @media print {
            body { margin: 0; }
            .cert { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          }
        </style>
      </head>
      <body>
        <div class="cert">
          <div class="logo">⚡ LearnLoop</div>
          <div class="title">Certificate of Completion</div>
          <div class="trophy">🏆</div>
          <div class="recipient-label">This certifies that</div>
          <div class="recipient-name">${currentUser.name}</div>
          <div class="completed-text">has successfully completed</div>
          <div class="course-name">${course.title}</div>
          <div class="meta">
            <div class="meta-item"><div class="meta-label">COMPLETION</div><div class="meta-value">${progress.percentage}%</div></div>
            <div class="meta-item"><div class="meta-label">LESSONS</div><div class="meta-value">${progress.completedLessons.length}</div></div>
            <div class="meta-item"><div class="meta-label">ISSUE DATE</div><div class="meta-value">${issueDate}</div></div>
            <div class="meta-item"><div class="meta-label">CREDENTIAL ID</div><div class="meta-value">${certId}</div></div>
          </div>
        </div>
        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
              window.onafterprint = function() {
                window.close();
              };
            }, 500);
          };
        </script>
      </body>
      </html>
    `);
    printWindow.document.close();
    
    // Send email notification after successful download
    sendEmailNotification();
    
    console.log('Certificate download initiated');
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#0a0a1a] min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => navigate('course-detail', course.id)} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Course
          </button>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowShareModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-all"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
            <button
              onClick={downloadCertificate}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl text-sm text-white font-medium hover:opacity-90 transition-all shadow-lg shadow-purple-500/20"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </button>
          </div>
        </div>

        {/* Share Modal */}
        {showShareModal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-[#0d1117] border border-white/10 rounded-2xl p-6 max-w-md w-full">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Share Certificate</h3>
                <button onClick={() => setShowShareModal(false)} className="text-gray-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-3">
                <button
                  onClick={() => handleShare('linkedin')}
                  className="w-full flex items-center gap-3 p-3 bg-[#0077b5]/10 border border-[#0077b5]/30 rounded-xl hover:bg-[#0077b5]/20 transition-all"
                >
                  <div className="w-10 h-10 bg-[#0077b5] rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">in</span>
                  </div>
                  <span className="text-white font-medium">Share on LinkedIn</span>
                </button>
                
                <button
                  onClick={() => handleShare('twitter')}
                  className="w-full flex items-center gap-3 p-3 bg-[#1da1f2]/10 border border-[#1da1f2]/30 rounded-xl hover:bg-[#1da1f2]/20 transition-all"
                >
                  <div className="w-10 h-10 bg-[#1da1f2] rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">𝕏</span>
                  </div>
                  <span className="text-white font-medium">Share on X (Twitter)</span>
                </button>
                
                <button
                  onClick={() => handleShare('facebook')}
                  className="w-full flex items-center gap-3 p-3 bg-[#1877f2]/10 border border-[#1877f2]/30 rounded-xl hover:bg-[#1877f2]/20 transition-all"
                >
                  <div className="w-10 h-10 bg-[#1877f2] rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">f</span>
                  </div>
                  <span className="text-white font-medium">Share on Facebook</span>
                </button>
              </div>

              {emailSent && (
                <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-xl">
                  <p className="text-green-400 text-sm text-center">Email notification sent to {currentUser.email}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Certificate Design */}
        <div ref={certRef} className="relative bg-gradient-to-br from-[#0a0a1a] via-[#1a0a2e] to-[#0a1a1a] rounded-3xl overflow-hidden shadow-2xl">
          {/* Border decoration */}
          <div className="absolute inset-0 border-4 border-purple-600/40 rounded-3xl" />
          <div className="absolute inset-3 border border-purple-500/20 rounded-2xl" />
          
          {/* Corner decorations */}
          <div className="absolute top-6 left-6 w-16 h-16 border-l-2 border-t-2 border-yellow-400/60 rounded-tl-xl" />
          <div className="absolute top-6 right-6 w-16 h-16 border-r-2 border-t-2 border-yellow-400/60 rounded-tr-xl" />
          <div className="absolute bottom-6 left-6 w-16 h-16 border-l-2 border-b-2 border-yellow-400/60 rounded-bl-xl" />
          <div className="absolute bottom-6 right-6 w-16 h-16 border-r-2 border-b-2 border-yellow-400/60 rounded-br-xl" />

          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="absolute w-48 h-48 rounded-full bg-purple-500" style={{
                top: `${(i * 37) % 100}%`,
                left: `${(i * 43) % 100}%`,
                transform: 'translate(-50%, -50%)',
                filter: 'blur(40px)',
              }} />
            ))}
          </div>

          <div className="relative px-16 py-14 text-center">
            {/* Header */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                <span className="text-white text-lg">⚡</span>
              </div>
              <span className="text-2xl font-black bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent" style={{ fontFamily: 'Space Grotesk' }}>
                LearnLoop
              </span>
            </div>

            <div className="text-xs font-medium text-gray-500 uppercase tracking-[0.3em] mb-8 flex items-center justify-center gap-3">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-purple-500/50" />
              Certificate of Completion
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-purple-500/50" />
            </div>

            <div className="text-6xl mb-6">🏆</div>

            <div className="text-sm text-gray-400 mb-3">This is to certify that</div>
            <h1 className="text-5xl font-black text-white mb-4 leading-tight" style={{ fontFamily: 'Space Grotesk' }}>
              {currentUser.name}
            </h1>

            <div className="w-48 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto mb-4" />

            <div className="text-sm text-gray-400 mb-3">has successfully completed</div>
            <h2 className="text-2xl font-black text-transparent bg-gradient-to-r from-purple-300 to-indigo-300 bg-clip-text mb-6" style={{ fontFamily: 'Space Grotesk' }}>
              {course.title}
            </h2>

            {progress.quizScore !== undefined && (
              <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full mb-8 shadow-lg shadow-purple-500/30">
                <Award className="w-4 h-4 text-white" />
                <span className="text-white text-sm font-bold">Quiz Score: {progress.quizScore}%</span>
              </div>
            )}

            <div className="grid grid-cols-3 gap-8 mt-8 pt-8 border-t border-white/10">
              <div>
                <div className="text-xs text-gray-600 uppercase tracking-widest mb-1">Issue Date</div>
                <div className="text-white font-semibold text-sm">{issueDate}</div>
              </div>
              <div>
                <div className="text-xs text-gray-600 uppercase tracking-widest mb-1">Credential ID</div>
                <div className="text-purple-400 font-mono text-sm">{certId}</div>
              </div>
              <div>
                <div className="text-xs text-gray-600 uppercase tracking-widest mb-1">Instructor</div>
                <div className="text-white font-semibold text-sm">{course.instructorAvatar} {course.instructor}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 mt-6 pt-6 border-t border-white/10">
              <div>
                <div className="text-xs text-gray-600 uppercase tracking-widest mb-1">Completion Percentage</div>
                <div className="text-white font-semibold text-sm">{progress.percentage}%</div>
              </div>
              <div>
                <div className="text-xs text-gray-600 uppercase tracking-widest mb-1">Lessons Completed</div>
                <div className="text-white font-semibold text-sm">{progress.completedLessons.length} lessons</div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-600">
              <div className="w-2 h-2 bg-green-400 rounded-full" />
              Verified by LearnLoop · Powered by MongoDB Atlas
            </div>
          </div>
        </div>

        {/* Actions below */}
        <div className="mt-6 grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-white/3 border border-white/10 rounded-2xl text-center">
            <div className="text-2xl mb-2">📤</div>
            <div className="text-sm font-medium text-white mb-1">Add to LinkedIn</div>
            <div className="text-xs text-gray-500">Showcase your achievement</div>
          </div>
          <div className="p-4 bg-white/3 border border-white/10 rounded-2xl text-center cursor-pointer hover:bg-white/6 transition-all" onClick={() => navigate('courses')}>
            <div className="text-2xl mb-2">📚</div>
            <div className="text-sm font-medium text-white mb-1">Learn More</div>
            <div className="text-xs text-gray-500">Continue your journey</div>
          </div>
          <div className="p-4 bg-white/3 border border-white/10 rounded-2xl text-center cursor-pointer hover:bg-white/6 transition-all" onClick={() => navigate('leaderboard')}>
            <div className="text-2xl mb-2">🏅</div>
            <div className="text-sm font-medium text-white mb-1">Leaderboard</div>
            <div className="text-xs text-gray-500">See your ranking</div>
          </div>
        </div>
      </div>
    </div>
  );
}
