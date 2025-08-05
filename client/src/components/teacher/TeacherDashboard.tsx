import React, { useState, useContext, useEffect, useRef } from 'react';
import { GradeSelector } from './GradeSelector';
import { SubjectSelector } from './SubjectSelector';
import { TopicPreviewCard } from './TopicPreviewCard';
import { UserContext } from '../../context/UserContext';
import { useEffect } from 'react';
import jsPDF from 'jspdf';
import PptxGenJS from 'pptxgenjs';

// Toast component for microinteraction feedback
function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 2500);
    return () => clearTimeout(t);
  }, [onClose]);
  return (
    <div className="fixed bottom-6 right-6 z-50 bg-green-700 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in">
      <span role="img" aria-label="Celebration">🎉</span>
      <span>{message}</span>
    </div>
  );
}

const TABS = [
  { id: 'home', label: 'Dashboard Home' },
  { id: 'curriculum', label: 'Curriculum & Lessons' },
  { id: 'challenges', label: 'My Challenges' },
  { id: 'progress', label: 'Student Progress (Coming Soon)' },
];

// Mock data
const SUBJECTS = [
  { id: 'math', name: 'Mathematics' },
  { id: 'science', name: 'Science' },
  { id: 'cs', name: 'Computer Studies' },
  { id: 're', name: 'Religious Education' },
];

const TOPICS = [
  { id: 'algebra', name: 'Algebra', subjectId: 'math', grade: 'FORM1', curriculum: 'Zambian' },
  { id: 'geometry', name: 'Geometry', subjectId: 'math', grade: 9, curriculum: 'Zambian' },
  { id: 'biology', name: 'Biology', subjectId: 'science', grade: 'FORM1', curriculum: 'Zambian' },
  { id: 'chemistry', name: 'Chemistry', subjectId: 'science', grade: 10, curriculum: 'Zambian' },
  { id: 'programming', name: 'Programming Basics', subjectId: 'cs', grade: 'FORM1', curriculum: 'Zambian' },
  { id: 'ethics', name: 'Ethics', subjectId: 're', grade: 9, curriculum: 'Zambian' },
  // Add more topics as needed
];

const LESSONS: Record<string, { title: string; content: string }> = {
  algebra: {
    title: 'Algebra - FORM1',
    content: 'This is the lesson content for Algebra (FORM1). Includes examples, explanations, and diagrams.',
  },
  geometry: {
    title: 'Geometry - Grade 9',
    content: 'This is the lesson content for Geometry (Grade 9).',
  },
  biology: {
    title: 'Biology - FORM1',
    content: 'This is the lesson content for Biology (FORM1).',
  },
  chemistry: {
    title: 'Chemistry - Grade 10',
    content: 'This is the lesson content for Chemistry (Grade 10).',
  },
  programming: {
    title: 'Programming Basics - FORM1',
    content: 'This is the lesson content for Programming Basics (FORM1).',
  },
  ethics: {
    title: 'Ethics - Grade 9',
    content: 'This is the lesson content for Ethics (Grade 9).',
  },
};

function downloadLessonAsPDF({ lesson, grade, subject, topic }: { lesson: { title: string; content: string }, grade: string | number, subject: string, topic: string }) {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  // SomaSmart branding
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.text('SomaSmart EduHub', 40, 60);
  // Logo (optional, if available as base64)
  // doc.addImage(logoBase64, 'PNG', 400, 30, 120, 40);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'normal');
  doc.text(`Grade: ${grade}    Subject: ${subject}`, 40, 90);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text(lesson.title, 40, 120);
  doc.setFontSize(13);
  doc.setFont('helvetica', 'normal');
  // Split content into paragraphs
  const paragraphs = lesson.content.split(/\n{2,}/g).map(s => s.trim()).filter(Boolean);
  let y = 150;
  paragraphs.forEach((para, idx) => {
    const lines = doc.splitTextToSize(para, 500);
    if (y + lines.length * 18 > 780) {
      doc.addPage();
      y = 60;
    }
    doc.text(lines, 40, y);
    y += lines.length * 18 + 18;
  });
  // Footer
  doc.setFontSize(10);
  doc.setTextColor(120);
  doc.text('Generated with SomaSmart EduHub', 40, 820);
  // Download
  const safeTopic = topic.replace(/[^a-zA-Z0-9]/g, '_');
  const safeSubject = subject.replace(/[^a-zA-Z0-9]/g, '_');
  const safeGrade = typeof grade === 'string' ? grade : `Grade${grade}`;
  doc.save(`${safeGrade}_${safeSubject}_${safeTopic}.pdf`);
}

function downloadLessonAsPPTX({ lesson, grade, subject, topic }: { lesson: { title: string; content: string }, grade: string | number, subject: string, topic: string }) {
  const pptx = new PptxGenJS();
  // SomaSmart branding colors
  const brandColor = '008000'; // green
  const titleColor = '003300';
  // Title slide
  pptx.addSlide({
    background: { fill: 'FFFFFF' },
  }).addText([
    { text: 'SomaSmart EduHub', options: { fontSize: 28, bold: true, color: brandColor, align: 'center' } },
    { text: `\n${lesson.title}`, options: { fontSize: 22, bold: true, color: titleColor, align: 'center' } },
    { text: `\nGrade: ${grade}    Subject: ${subject}`, options: { fontSize: 18, color: '333333', align: 'center' } },
    { text: '\n', options: { fontSize: 10 } },
    { text: 'Generated with SomaSmart EduHub', options: { fontSize: 12, italic: true, color: '888888', align: 'center' } },
  ], { x: 0.5, y: 1.5, w: 8.5, h: 3, align: 'center' });
  // Content slides
  const paragraphs = lesson.content.split(/\n{2,}/g).map(s => s.trim()).filter(Boolean);
  paragraphs.forEach((para, idx) => {
    pptx.addSlide({ background: { fill: 'FFFFFF' } })
      .addText(lesson.title, { x: 0.5, y: 0.3, fontSize: 20, bold: true, color: brandColor, w: 8.5, h: 0.7, align: 'center' })
      .addText(para.split('\n').map(line => ({ text: line, options: { bullet: true, fontSize: 16, color: '222222' } })),
        { x: 0.7, y: 1.2, w: 8, h: 4, fontSize: 16, color: '222222', bullet: true });
  });
  // Footer on all slides
  pptx.slides.forEach(slide => {
    slide.addText('SomaSmart EduHub', { x: 0.5, y: 6.7, fontSize: 10, color: brandColor, italic: true });
  });
  // Download
  const safeTopic = topic.replace(/[^a-zA-Z0-9]/g, '_');
  const safeSubject = subject.replace(/[^a-zA-Z0-9]/g, '_');
  const safeGrade = typeof grade === 'string' ? grade : `Grade${grade}`;
  pptx.writeFile({ fileName: `${safeGrade}_${safeSubject}_${safeTopic}.pptx` });
}

function LessonViewer({ topicId, onClose, onDownloadPDF, onDownloadPPTX }: { topicId: string; onClose: () => void; onDownloadPDF?: () => void; onDownloadPPTX?: () => void }) {
  const lesson = LESSONS[topicId];
  if (!lesson) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <h3 className="text-2xl font-bold mb-4">{lesson.title}</h3>
        <div className="mb-6 text-gray-800 whitespace-pre-line">{lesson.content}</div>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded bg-green-700 text-white font-semibold hover:bg-green-800 transition">Use as Presentation</button>
          <button
            className="px-4 py-2 rounded bg-blue-700 text-white font-semibold hover:bg-blue-800 transition"
            onClick={onDownloadPDF}
            aria-label="Download as PDF"
            title="Download as PDF"
          >
            📥 Download as PDF
          </button>
          <button
            className="px-4 py-2 rounded bg-purple-700 text-white font-semibold hover:bg-purple-800 transition"
            onClick={onDownloadPPTX}
            aria-label="Export as Presentation"
            title="Export as Presentation"
          >
            📊 Export as Presentation
          </button>
        </div>
      </div>
    </div>
  );
}

function ChallengeCreator({ topicId, onClose }: { topicId: string; onClose: () => void }) {
  const [numQuestions, setNumQuestions] = useState(5);
  const [questionType, setQuestionType] = useState('MCQ');
  const [timer, setTimer] = useState(60);
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      alert('Challenge created (mock)!');
      onClose();
    }, 1000);
  };

  React.useEffect(() => {
    if (!topicId) {
      setNumQuestions(5);
      setQuestionType('MCQ');
      setTimer(60);
      setSaving(false);
    }
  }, [topicId]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <h3 className="text-xl font-bold mb-4">Create Challenge for Topic</h3>
        <div className="mb-4">
          <label htmlFor="num-questions" className="block text-sm font-medium mb-1">Number of Questions</label>
          <input
            id="num-questions"
            type="number"
            min={1}
            max={50}
            value={numQuestions}
            onChange={e => setNumQuestions(Number(e.target.value))}
            className="w-full border rounded px-3 py-2"
            title="Number of Questions"
            placeholder="Enter number of questions"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="question-type" className="block text-sm font-medium mb-1">Question Type</label>
          <select
            id="question-type"
            value={questionType}
            onChange={e => setQuestionType(e.target.value)}
            className="w-full border rounded px-3 py-2"
            title="Question Type"
          >
            <option value="MCQ">Multiple Choice (MCQ)</option>
            <option value="Fill">Fill-in-the-Blank</option>
            <option value="Jumble">Jumble</option>
          </select>
        </div>
        <div className="mb-6">
          <label htmlFor="timer" className="block text-sm font-medium mb-1">Timer (seconds per question)</label>
          <input
            id="timer"
            type="number"
            min={10}
            max={600}
            value={timer}
            onChange={e => setTimer(Number(e.target.value))}
            className="w-full border rounded px-3 py-2"
            title="Timer in seconds per question"
            placeholder="Enter timer in seconds"
          />
        </div>
        <div className="flex gap-2">
          <button
            className="px-4 py-2 rounded bg-green-700 text-white font-semibold hover:bg-green-800 transition"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save Challenge'}
          </button>
          <button
            className="px-4 py-2 rounded bg-gray-300 text-gray-800 font-semibold hover:bg-gray-400 transition"
            onClick={onClose}
            disabled={saving}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

function PresentationModal({ lesson, onClose, onDownloadPDF, onDownloadPPTX }: { lesson: { title: string; content: string }; onClose: () => void; onDownloadPDF?: () => void; onDownloadPPTX?: () => void }) {
  // Split content into pages (for demo, split by paragraphs)
  const pages = lesson.content.split(/\n{2,}/g).map(s => s.trim()).filter(Boolean);
  const [page, setPage] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);

  // Keyboard navigation
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        setPage(p => Math.min(p + 1, pages.length - 1));
      } else if (e.key === 'ArrowLeft') {
        setPage(p => Math.max(p - 1, 0));
      } else if (e.key === 'Escape') {
        onClose();
      }
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [pages.length, onClose]);

  // Focus trap for accessibility
  useEffect(() => {
    modalRef.current?.focus();
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
      tabIndex={-1}
      ref={modalRef}
      aria-modal="true"
      role="dialog"
      style={{ outline: 'none' }}
    >
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="max-w-3xl w-full bg-white rounded-lg shadow-lg p-8 flex flex-col items-center relative" style={{ minHeight: 400 }}>
          <button
            className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-gray-700 focus:outline-none"
            onClick={onClose}
            aria-label="Exit Presentation"
            title="Exit Presentation"
          >
            ×
          </button>
          <h2 className="text-3xl font-bold mb-6 text-green-800 text-center" style={{ fontSize: '2.5rem' }}>{lesson.title}</h2>
          <div className="flex-1 w-full flex items-center justify-center">
            <div className="text-2xl md:text-3xl text-gray-900 leading-relaxed text-center" style={{ minHeight: 200 }}>
              {pages[page]}
            </div>
          </div>
          <div className="flex items-center justify-between w-full mt-8">
            <button
              className="px-6 py-3 rounded bg-green-700 text-white font-semibold text-lg hover:bg-green-800 transition disabled:opacity-50"
              onClick={() => setPage(p => Math.max(p - 1, 0))}
              disabled={page === 0}
              aria-label="Previous Slide"
              title="Previous Slide"
            >
              ◀ Previous
            </button>
            <span className="text-lg text-gray-700">Page {page + 1} of {pages.length}</span>
            <button
              className="px-6 py-3 rounded bg-green-700 text-white font-semibold text-lg hover:bg-green-800 transition disabled:opacity-50"
              onClick={() => setPage(p => Math.min(p + 1, pages.length - 1))}
              disabled={page === pages.length - 1}
              aria-label="Next Slide"
              title="Next Slide"
            >
              Next ▶
            </button>
            <button
              className="ml-6 px-4 py-2 rounded bg-blue-700 text-white font-semibold hover:bg-blue-800 transition"
              onClick={onDownloadPDF}
              aria-label="Download as PDF"
              title="Download as PDF"
            >
              📥 Download as PDF
            </button>
            <button
              className="ml-2 px-4 py-2 rounded bg-purple-700 text-white font-semibold hover:bg-purple-800 transition"
              onClick={onDownloadPPTX}
              aria-label="Export as Presentation"
              title="Export as Presentation"
            >
              📊 Export as Presentation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TeacherDashboard() {
  // Enforce teacher-only access for dashboard features
  const { user } = React.useContext(UserContext);
  if (!user || user.role !== 'teacher') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <h2 className="text-2xl font-bold mb-2 text-red-700">Access Denied</h2>
          <p className="text-gray-700">You must be logged in as a teacher to access this page.</p>
        </div>
      </div>
    );
  }

  const [activeTab, setActiveTab] = useState('home');
  const [selectedGrade, setSelectedGrade] = useState<string | number | null>(null);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);
  const [viewingLessonId, setViewingLessonId] = useState<string | null>(null);
  const [creatingChallengeId, setCreatingChallengeId] = useState<string | null>(null);
  const [challenges, setChallenges] = useState([
    {
      id: 'c1',
      topic: 'Algebra',
      subject: 'Mathematics',
      code: 'XJ92K',
      participants: 12,
      createdAt: '2024-06-10',
      analytics: { avgScore: 78, attempts: 15 },
    },
    {
      id: 'c2',
      topic: 'Biology',
      subject: 'Science',
      code: 'QW8PL',
      participants: 8,
      createdAt: '2024-06-09',
      analytics: { avgScore: 65, attempts: 10 },
    },
    // Add more mock challenges as needed
  ]);
  const [showToast, setShowToast] = useState(false);
  const [firstVisit, setFirstVisit] = useState(() => {
    // Mock: use localStorage to persist first-visit state
    if (typeof window !== 'undefined') {
      const seen = localStorage.getItem('teacher_first_visit');
      if (!seen) {
        localStorage.setItem('teacher_first_visit', '1');
        return true;
      }
    }
    return false;
  });
  const [presentingLessonId, setPresentingLessonId] = useState<string | null>(null);

  // Filter topics by selected grade and subject
  const filteredTopics = TOPICS.filter(
    t =>
      (selectedGrade ? t.grade === selectedGrade : true) &&
      (selectedSubjectId ? t.subjectId === selectedSubjectId : true)
  );

  // Handlers
  const handleViewLesson = (topicId: string) => {
    setViewingLessonId(topicId);
  };
  const handleCreateChallenge = (topicId: string) => {
    setCreatingChallengeId(topicId);
  };
  const handleDeleteChallenge = (challengeId: string) => {
    if (window.confirm('Are you sure you want to delete this challenge?')) {
      setChallenges(prev => prev.filter(c => c.id !== challengeId));
    }
  };
  // Toast on challenge creation
  const handleChallengeCreated = () => {
    setShowToast(true);
    setCreatingChallengeId(null);
  };

  // Handler for PDF download
  const handleDownloadPDF = (topicId: string) => {
    const topic = TOPICS.find(t => t.id === topicId);
    if (!topic) return;
    downloadLessonAsPDF({
      lesson: LESSONS[topicId],
      grade: topic.grade,
      subject: SUBJECTS.find(s => s.id === topic.subjectId)?.name || topic.subjectId,
      topic: topic.name,
    });
  };

  // Handler for PPTX download
  const handleDownloadPPTX = (topicId: string) => {
    const topic = TOPICS.find(t => t.id === topicId);
    if (!topic) return;
    downloadLessonAsPPTX({
      lesson: LESSONS[topicId],
      grade: topic.grade,
      subject: SUBJECTS.find(s => s.id === topic.subjectId)?.name || topic.subjectId,
      topic: topic.name,
    });
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r shadow-sm flex-shrink-0">
        <div className="p-6 border-b flex items-center justify-between">
          <h1 className="text-2xl font-bold text-green-700">Teacher Dashboard</h1>
          <a
            href="https://somasmart.help/teacher-quickstart" // Placeholder help link
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 text-green-700 hover:text-green-900"
            title="Open Teacher Quickstart Guide"
            aria-label="Help"
          >
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10" strokeWidth="2" /><path strokeWidth="2" d="M12 16v-2m0-4h.01M12 8a4 4 0 1 1 0 8" /></svg>
          </a>
        </div>
        <nav className="flex flex-col gap-2 p-4">
          {TABS.map(tab => (
            <button
              key={tab.id}
              className={`text-left px-4 py-2 rounded-lg transition-colors font-medium ${activeTab === tab.id ? 'bg-green-100 text-green-800' : 'hover:bg-green-50 text-gray-700'}`}
              onClick={() => setActiveTab(tab.id)}
              title={tab.label}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-6">
        {firstVisit && (
          <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-400 rounded flex items-center gap-3 animate-fade-in">
            <span role="img" aria-label="Wave" className="text-2xl">👋</span>
            <div>
              <div className="font-semibold text-green-800">Welcome, {user.firstName || 'Teacher'}!</div>
              <div className="text-green-700 text-sm">Tip: Use the sidebar to browse curriculum, view lessons, and create classroom challenges. Click the <span className='font-bold'>?</span> for a quickstart guide.</div>
            </div>
          </div>
        )}
        {activeTab === 'home' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Welcome, Teacher!</h2>
            <p className="text-gray-700">Use the sidebar to browse curriculum, view lessons, and manage your classroom challenges.</p>
          </div>
        )}
        {activeTab === 'curriculum' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Curriculum & Lessons</h2>
            <div className="mb-4 flex flex-col md:flex-row gap-4">
              <div>
                <span className="block text-sm font-medium mb-1">Select Grade</span>
                <GradeSelector selectedGrade={selectedGrade} onChange={setSelectedGrade} />
              </div>
              <div>
                <span className="block text-sm font-medium mb-1">Select Subject</span>
                <SubjectSelector subjects={SUBJECTS} selectedSubjectId={selectedSubjectId} onChange={setSelectedSubjectId} />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              {filteredTopics.length === 0 ? (
                <div className="col-span-full text-gray-500">No topics found for the selected grade and subject. Try a different filter.</div>
              ) : (
                filteredTopics.map(topic => (
                  <TopicPreviewCard
                    key={topic.id}
                    topic={topic}
                    onViewLesson={handleViewLesson}
                    onCreateChallenge={handleCreateChallenge}
                    // Tooltips for action buttons
                    viewLessonTooltip="Preview lesson content and project to class"
                    createChallengeTooltip="Generate a classroom challenge for this topic"
                    presentationTooltip="Present this lesson in full-screen mode"
                    onPresentLesson={() => setPresentingLessonId(topic.id)}
                  />
                ))
              )}
            </div>
            {viewingLessonId && (
              <LessonViewer
                topicId={viewingLessonId}
                onClose={() => setViewingLessonId(null)}
                onDownloadPDF={() => handleDownloadPDF(viewingLessonId)}
                onDownloadPPTX={() => handleDownloadPPTX(viewingLessonId)}
              />
            )}
            {creatingChallengeId && (
              <ChallengeCreator topicId={creatingChallengeId} onClose={handleChallengeCreated} />
            )}
            {presentingLessonId && LESSONS[presentingLessonId] && (
              <PresentationModal
                lesson={LESSONS[presentingLessonId]}
                onClose={() => setPresentingLessonId(null)}
                onDownloadPDF={() => handleDownloadPDF(presentingLessonId)}
                onDownloadPPTX={() => handleDownloadPPTX(presentingLessonId)}
              />
            )}
          </div>
        )}
        {activeTab === 'challenges' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">My Challenges</h2>
            {challenges.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-6 text-gray-500">No challenges created yet.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg shadow">
                  <thead>
                    <tr className="bg-green-100 text-green-900">
                      <th className="px-4 py-2 text-left">Topic</th>
                      <th className="px-4 py-2 text-left">Subject</th>
                      <th className="px-4 py-2 text-left">Code</th>
                      <th className="px-4 py-2 text-left">Participants</th>
                      <th className="px-4 py-2 text-left">Avg. Score</th>
                      <th className="px-4 py-2 text-left">Attempts</th>
                      <th className="px-4 py-2 text-left">Created</th>
                      <th className="px-4 py-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {challenges.map(challenge => (
                      <tr key={challenge.id} className="border-b last:border-b-0">
                        <td className="px-4 py-2">{challenge.topic}</td>
                        <td className="px-4 py-2">{challenge.subject}</td>
                        <td className="px-4 py-2 font-mono">{challenge.code}</td>
                        <td className="px-4 py-2">{challenge.participants}</td>
                        <td className="px-4 py-2">{challenge.analytics.avgScore}%</td>
                        <td className="px-4 py-2">{challenge.analytics.attempts}</td>
                        <td className="px-4 py-2">{challenge.createdAt}</td>
                        <td className="px-4 py-2">
                          <button
                            className="text-red-600 hover:underline text-sm"
                            onClick={() => handleDeleteChallenge(challenge.id)}
                            title="Delete this challenge"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
        {activeTab === 'progress' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Student Progress</h2>
            <div className="bg-white rounded-lg shadow p-6 text-gray-400">Feature coming soon.</div>
          </div>
        )}
        {showToast && <Toast message="Challenge created! 🎉" onClose={() => setShowToast(false)} />}
      </main>
    </div>
  );
} 