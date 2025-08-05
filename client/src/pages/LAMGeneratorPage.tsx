import React, { useState, useEffect } from 'react';
import { GradeSelector } from '../components/lam/GradeSelector';
import { SubjectSelector } from '../components/lam/SubjectSelector';
import { TopicSelector } from '../components/lam/TopicSelector';
import { GenerateLessonButton } from '../components/lam/GenerateLessonButton';
import { LessonPreviewModal } from '../components/lam/LessonPreviewModal';
import { QuizPreview } from '../components/lam/QuizPreview';
import { lamService } from '../services/lamService';
import { Grade, Subject, Topic, Lesson, Question } from '../types/lam';

interface LAMGeneratorPageProps {
  // Add any props if needed
}

export default function LAMGeneratorPage({}: LAMGeneratorPageProps) {
  // State management
  const [selectedGrade, setSelectedGrade] = useState<Grade | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [generatedLesson, setGeneratedLesson] = useState<Lesson | null>(null);
  const [generatedQuiz, setGeneratedQuiz] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Reset subject and topic when grade changes
  useEffect(() => {
    if (selectedGrade) {
      setSelectedSubject(null);
      setSelectedTopic(null);
    }
  }, [selectedGrade]);

  // Reset topic when subject changes
  useEffect(() => {
    if (selectedSubject) {
      setSelectedTopic(null);
    }
  }, [selectedSubject]);

  // Clear generated content when selections change
  useEffect(() => {
    setGeneratedLesson(null);
    setGeneratedQuiz([]);
    setError(null);
  }, [selectedGrade, selectedSubject, selectedTopic]);

  const handleGenerateContent = async () => {
    if (!selectedTopic) {
      setError('Please select a topic first');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // This will be implemented to call AI API
      const result = await fetchGeneratedLesson(selectedTopic.id);
      setGeneratedLesson(result.lesson);
      setGeneratedQuiz(result.questions);
      setShowPreviewModal(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate content');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveToCurriculum = async () => {
    if (!generatedLesson || !selectedTopic) return;

    setIsLoading(true);
    try {
      // Save lesson
      const savedLesson = await lamService.createLesson({
        ...generatedLesson,
        topic_id: selectedTopic.id
      });

      // Save questions
      const savedQuestions = await Promise.all(
        generatedQuiz.map(question => 
          lamService.createQuestion({
            ...question,
            lesson_id: savedLesson.id
          })
        )
      );

      // Close modal and show success
      setShowPreviewModal(false);
      setGeneratedLesson(null);
      setGeneratedQuiz([]);
      // You can add a toast notification here
      alert('Lesson and quiz saved successfully!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save content');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Learning Assistance Module
          </h1>
          <p className="text-gray-600">
            Generate AI-powered lessons and quizzes for your curriculum
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {/* Selection Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <GradeSelector
              selectedGrade={selectedGrade}
              onGradeChange={setSelectedGrade}
            />
            <SubjectSelector
              selectedSubject={selectedSubject}
              onSubjectChange={setSelectedSubject}
              selectedGrade={selectedGrade}
            />
            <TopicSelector
              selectedTopic={selectedTopic}
              onTopicChange={setSelectedTopic}
              selectedGrade={selectedGrade}
              selectedSubject={selectedSubject}
            />
          </div>

          {/* Generate Button */}
          <div className="flex justify-center mb-8">
            <GenerateLessonButton
              onGenerate={handleGenerateContent}
              isLoading={isLoading}
              disabled={!selectedTopic}
            />
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          {/* Generated Content Preview */}
          {generatedLesson && (
            <div className="space-y-6">
              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Generated Content Preview
                </h2>
                
                {/* Lesson Preview */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">
                    Lesson: {generatedLesson.title}
                  </h3>
                  <div className="prose max-w-none bg-gray-50 p-4 rounded-md">
                    <div dangerouslySetInnerHTML={{ __html: generatedLesson.content }} />
                  </div>
                </div>

                {/* Quiz Preview */}
                {generatedQuiz.length > 0 && (
                  <QuizPreview questions={generatedQuiz} />
                )}
              </div>
            </div>
          )}
        </div>

        {/* Preview Modal */}
        {showPreviewModal && generatedLesson && (
          <LessonPreviewModal
            lesson={generatedLesson}
            questions={generatedQuiz}
            onSave={handleSaveToCurriculum}
            onCancel={() => setShowPreviewModal(false)}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
}

// Mock AI generation function - replace with actual AI API call
async function fetchGeneratedLesson(topicId: string): Promise<{
  lesson: Lesson;
  questions: Question[];
}> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Mock data - replace with actual AI API integration
  const mockLesson: Lesson = {
    id: `lesson-${Date.now()}`,
    title: 'Introduction to Algebra',
    content: `
      <h2>Introduction to Algebra</h2>
      <p>Algebra is a branch of mathematics that deals with symbols and the rules for manipulating these symbols.</p>
      <h3>Key Concepts:</h3>
      <ul>
        <li>Variables and constants</li>
        <li>Linear equations</li>
        <li>Solving for unknown values</li>
      </ul>
      <p>In this lesson, we will explore the fundamental principles of algebra and learn how to solve basic equations.</p>
    `,
    topic_id: topicId,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  const mockQuestions: Question[] = [
    {
      id: `question-${Date.now()}-1`,
      lesson_id: mockLesson.id,
      question_text: 'What is a variable in algebra?',
      question_type: 'multiple_choice',
      options: [
        'A number that never changes',
        'A symbol that represents an unknown value',
        'A mathematical operation',
        'A type of equation'
      ],
      correct_answer: 'A symbol that represents an unknown value',
      explanation: 'A variable is a symbol (usually a letter) that represents an unknown value in an equation.',
      difficulty_level: 'beginner',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: `question-${Date.now()}-2`,
      lesson_id: mockLesson.id,
      question_text: 'Solve for x: 2x + 3 = 7',
      question_type: 'multiple_choice',
      options: ['x = 1', 'x = 2', 'x = 3', 'x = 4'],
      correct_answer: 'x = 2',
      explanation: 'Subtract 3 from both sides: 2x = 4. Then divide by 2: x = 2.',
      difficulty_level: 'beginner',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ];

  return {
    lesson: mockLesson,
    questions: mockQuestions
  };
} 