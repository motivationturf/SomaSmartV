import React, { useState, useEffect } from 'react';
import { lamService } from '../../services/lamService';
import { Grade, Subject, Topic } from '../../types/lam';

interface TopicSelectorProps {
  selectedTopic: Topic | null;
  onTopicChange: (topic: Topic | null) => void;
  selectedGrade: Grade | null;
  selectedSubject: Subject | null;
}

export function TopicSelector({ selectedTopic, onTopicChange, selectedGrade, selectedSubject }: TopicSelectorProps) {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedGrade && selectedSubject) {
      loadTopics();
    } else {
      setTopics([]);
      onTopicChange(null);
    }
  }, [selectedGrade, selectedSubject]);

  const loadTopics = async () => {
    if (!selectedGrade || !selectedSubject) return;

    try {
      setIsLoading(true);
      setError(null);
      const fetchedTopics = await lamService.getTopics({
        grade_id: selectedGrade.id,
        subject_id: selectedSubject.id
      });
      setTopics(fetchedTopics);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load topics');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTopicChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const topicId = event.target.value;
    if (topicId === '') {
      onTopicChange(null);
    } else {
      const topic = topics.find(t => t.id === topicId);
      onTopicChange(topic || null);
    }
  };

  return (
    <div className="space-y-2">
      <label htmlFor="topic-select" className="block text-sm font-medium text-gray-700">
        Topic
      </label>
      <select
        id="topic-select"
        value={selectedTopic?.id || ''}
        onChange={handleTopicChange}
        disabled={!selectedGrade || !selectedSubject || isLoading}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
      >
        <option value="">
          {selectedGrade && selectedSubject 
            ? 'Select a topic' 
            : !selectedGrade 
              ? 'Select a grade first' 
              : 'Select a subject first'
          }
        </option>
        {topics.map((topic) => (
          <option key={topic.id} value={topic.id}>
            {topic.name}
          </option>
        ))}
      </select>
      
      {isLoading && (
        <p className="text-sm text-gray-500">Loading topics...</p>
      )}
      
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
} 