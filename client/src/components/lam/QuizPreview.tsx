import React from 'react';
import { Question } from '../../types/lam';

interface QuizPreviewProps {
  questions: Question[];
}

export function QuizPreview({ questions }: QuizPreviewProps) {
  if (questions.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Quiz Questions ({questions.length})
      </h3>
      
      <div className="space-y-4">
        {questions.map((question, index) => (
          <div key={question.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <h4 className="font-medium text-gray-900 mb-3">
              Question {index + 1}: {question.question_text}
            </h4>
            
            {question.question_type === 'multiple_choice' && question.options && (
              <div className="space-y-2 mb-3">
                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="flex items-center">
                    <span className="w-4 h-4 rounded-full border-2 border-gray-300 mr-3 flex-shrink-0"></span>
                    <span className={`text-sm ${
                      option === question.correct_answer 
                        ? 'text-green-600 font-medium' 
                        : 'text-gray-700'
                    }`}>
                      {option}
                      {option === question.correct_answer && (
                        <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                          Correct Answer
                        </span>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            )}
            
            {question.explanation && (
              <div className="p-3 bg-blue-50 rounded-md">
                <p className="text-sm text-blue-800">
                  <strong>Explanation:</strong> {question.explanation}
                </p>
              </div>
            )}
            
            <div className="mt-2 text-xs text-gray-500">
              Difficulty: {question.difficulty_level}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 