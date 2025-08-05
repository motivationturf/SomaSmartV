import React from 'react';

interface TopicPreviewCardProps {
  topic: { id: string; name: string; curriculum: string };
  onViewLesson: (topicId: string) => void;
  onCreateChallenge: (topicId: string) => void;
}

export const TopicPreviewCard: React.FC<TopicPreviewCardProps> = ({ topic, onViewLesson, onCreateChallenge }) => (
  <div className="bg-white rounded-lg shadow p-4 flex flex-col gap-2 border border-gray-100">
    <div className="flex items-center gap-2">
      <span className="font-semibold text-lg text-gray-800">{topic.name}</span>
      <span className="ml-2 px-2 py-0.5 text-xs rounded bg-green-100 text-green-700 font-medium">{topic.curriculum}</span>
    </div>
    <div className="flex gap-2 mt-2">
      <button
        className="px-3 py-1 rounded bg-green-600 text-white font-medium hover:bg-green-700 transition"
        onClick={() => onViewLesson(topic.id)}
      >
        View Lesson
      </button>
      <button
        className="px-3 py-1 rounded bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
        onClick={() => onCreateChallenge(topic.id)}
      >
        Create Challenge
      </button>
    </div>
  </div>
); 