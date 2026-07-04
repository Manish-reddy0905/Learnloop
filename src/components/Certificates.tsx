import { useStore } from '../store/useStore';
import { Award, Download, Calendar, CheckCircle, ExternalLink } from 'lucide-react';

export default function Certificates() {
  const { navigate, userProgress, courses, currentUser } = useStore();

  // Get earned certificates from user progress
  const earnedCertificates = courses
    .filter(course => userProgress[course.id]?.certificateEarned)
    .map(course => ({
      id: course.id,
      courseName: course.title,
      issueDate: userProgress[course.id]?.lastAccessed || new Date().toISOString().split('T')[0],
      score: userProgress[course.id]?.quizScore || 0,
      status: 'earned' as const,
      certificateId: `LL-${course.id.toUpperCase()}-${new Date().getFullYear()}-${currentUser?.id?.slice(-6) || '000000'}`
    }));

  // Get in-progress courses
  const inProgressCourses = courses
    .filter(course => userProgress[course.id] && !userProgress[course.id]?.certificateEarned)
    .map(course => ({
      id: course.id,
      courseName: course.title,
      issueDate: null,
      score: null,
      status: 'in-progress' as const,
      certificateId: null,
      progress: userProgress[course.id]?.percentage || 0
    }));

  const allCertificates = [...earnedCertificates, ...inProgressCourses];

  const earnedCount = earnedCertificates.length;
  const inProgressCount = inProgressCourses.length;
  const avgScore = earnedCount > 0 
    ? Math.round(earnedCertificates.reduce((sum, cert) => sum + cert.score, 0) / earnedCount)
    : 0;

  return (
    <div className="flex-1 overflow-y-auto bg-[#0a0a1a] min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Award className="w-8 h-8 text-yellow-400" />
            <h1 className="text-3xl font-black text-white" style={{ fontFamily: 'Space Grotesk' }}>
              My Certificates
            </h1>
          </div>
          <p className="text-gray-400 text-sm">View and download your earned certificates</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="p-6 bg-gradient-to-br from-green-600/20 to-emerald-600/20 border border-green-500/30 rounded-2xl text-center">
            <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-3" />
            <div className="text-2xl font-black text-white mb-1">{earnedCount}</div>
            <div className="text-sm text-gray-400">Certificates Earned</div>
          </div>
          <div className="p-6 bg-gradient-to-br from-purple-600/20 to-indigo-600/20 border border-purple-500/30 rounded-2xl text-center">
            <Award className="w-8 h-8 text-purple-400 mx-auto mb-3" />
            <div className="text-2xl font-black text-white mb-1">{avgScore}%</div>
            <div className="text-sm text-gray-400">Average Score</div>
          </div>
          <div className="p-6 bg-gradient-to-br from-orange-600/20 to-red-600/20 border border-orange-500/30 rounded-2xl text-center">
            <Calendar className="w-8 h-8 text-orange-400 mx-auto mb-3" />
            <div className="text-2xl font-black text-white mb-1">{inProgressCount}</div>
            <div className="text-sm text-gray-400">In Progress</div>
          </div>
        </div>

        {/* Certificates List */}
        <div className="space-y-4">
          {allCertificates.length === 0 ? (
            <div className="p-8 bg-white/3 border border-white/10 rounded-2xl text-center">
              <Award className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">No certificates yet</h3>
              <p className="text-sm text-gray-400">Complete course quizzes to earn your first certificate</p>
            </div>
          ) : (
            allCertificates.map((cert: any) => (
            <div
              key={cert.id}
              className={`p-6 rounded-2xl border transition-all ${
                cert.status === 'earned'
                  ? 'bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border-yellow-500/30'
                  : 'bg-white/3 border-white/10'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    cert.status === 'earned'
                      ? 'bg-gradient-to-br from-yellow-500 to-amber-600'
                      : 'bg-white/10'
                  }`}>
                    <Award className="w-8 h-8 text-white" />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-2">{cert.courseName}</h3>
                    
                    {cert.status === 'earned' ? (
                      <div className="space-y-2">
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-gray-400">Certificate ID:</span>
                          <span className="text-white font-mono">{cert.certificateId}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-gray-400">Issued:</span>
                          <span className="text-white">{cert.issueDate}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-gray-400">Score:</span>
                          <span className="text-green-400 font-bold">{cert.score}%</span>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-orange-400">
                          <Calendar className="w-4 h-4" />
                          <span>In Progress - Complete the course quiz to earn certificate</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full" style={{ width: `${cert.progress}%` }} />
                          </div>
                          <span className="text-sm text-gray-400">{cert.progress}%</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {cert.status === 'earned' && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate('certificate', cert.id)}
                      className="p-3 bg-white/10 border border-white/20 rounded-xl text-white hover:bg-white/20 transition-colors"
                      title="View Certificate"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </button>
                    <button
                      className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl text-white hover:opacity-90 transition-colors"
                      title="Download Certificate"
                    >
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )))}
        </div>

        {/* Info Section */}
        <div className="mt-8 p-6 bg-blue-500/10 border border-blue-500/20 rounded-2xl">
          <div className="flex items-start gap-4">
            <Award className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-white mb-2">About Certificates</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Earn certificates by scoring 70% or higher on course quizzes</li>
                <li>• Certificates include your name, course name, completion date, and unique ID</li>
                <li>• Download and share your certificates on LinkedIn and other platforms</li>
                <li>• Each certificate is verifiable using the unique certificate ID</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
