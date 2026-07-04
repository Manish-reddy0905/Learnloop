import { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { FileText, Save, X } from 'lucide-react';
import { api } from '../lib/api';

interface LessonNotesProps {
  courseId: string;
  lessonId: string;
}

export default function LessonNotes({ courseId, lessonId }: LessonNotesProps) {
  const { currentUser, theme, setUser } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Load existing notes when component mounts
  useEffect(() => {
    if (currentUser?.notes) {
      const existingNote = currentUser.notes.find(
        (note: any) => note.courseId === courseId && note.lessonId === lessonId
      );
      if (existingNote) {
        setContent(existingNote.content);
      }
    }
  }, [currentUser?.notes, courseId, lessonId]);

  const handleSave = async () => {
    if (!currentUser?.clerkId) return;

    setIsSaving(true);
    try {
      // Update notes array
      const existingNotes = currentUser.notes || [];
      const noteIndex = existingNotes.findIndex(
        (note: any) => note.courseId === courseId && note.lessonId === lessonId
      );

      let updatedNotes;
      if (noteIndex >= 0) {
        // Update existing note
        updatedNotes = [...existingNotes];
        updatedNotes[noteIndex] = {
          ...updatedNotes[noteIndex],
          content,
          updatedAt: new Date().toISOString()
        };
      } else {
        // Add new note
        updatedNotes = [
          ...existingNotes,
          {
            courseId,
            lessonId,
            content,
            updatedAt: new Date().toISOString()
          }
        ];
      }

      // Update backend
      await api.updateUser(currentUser.clerkId, { notes: updatedNotes });

      // Update local state
      setUser({
        ...currentUser,
        notes: updatedNotes
      } as any);

      alert('Notes saved successfully!');
    } catch (error) {
      console.error('Error saving notes:', error);
      alert('Failed to save notes. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 rounded-full shadow-lg transition-all ${
          theme === 'dark' 
            ? 'bg-purple-600 hover:bg-purple-700 text-white' 
            : 'bg-purple-500 hover:bg-purple-600 text-white'
        }`}
        title="Open Notes"
      >
        <FileText className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className={`fixed bottom-0 right-0 w-full md:w-96 h-96 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-2xl border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} flex flex-col`}>
      {/* Header */}
      <div className={`p-4 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} flex items-center justify-between`}>
        <div className="flex items-center gap-2">
          <FileText className={`w-5 h-5 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
          <h3 className="font-semibold">Lesson Notes</h3>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className={`p-1 rounded ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 p-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your notes here..."
          className={`w-full h-full resize-none p-3 rounded-lg border ${
            theme === 'dark'
              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500'
              : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:border-purple-500'
          } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
        />
      </div>

      {/* Footer */}
      <div className={`p-4 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className={`w-full py-2 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
            isSaving
              ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white'
          }`}
        >
          <Save className="w-4 h-4" />
          {isSaving ? 'Saving...' : 'Save Notes'}
        </button>
      </div>
    </div>
  );
}
