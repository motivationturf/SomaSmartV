import React, { useState, useEffect } from 'react';
import { lamService } from '../../services/lamService';
import { Grade, Subject } from '../../types/lam';

interface SubjectSelectorProps {
  selectedSubject: Subject | null;
  onSubjectChange: (subject: Subject | null) => void;
  selectedGrade: Grade | null;
}

export function SubjectSelector({ selectedSubject, onSubjectChange, selectedGrade }: SubjectSelectorProps) {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedGrade) {
      loadSubjects();
    } else {
      setSubjects([]);
      onSubjectChange(null);
    }
  }, [selectedGrade]);

  const loadSubjects = async () => {
    if (!selectedGrade) return;

    try {
      setIsLoading(true);
      setError(null);
      const fetchedSubjects = await lamService.getSubjects();
      setSubjects(fetchedSubjects);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load subjects');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubjectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const subjectId = event.target.value;
    if (subjectId === '') {
      onSubjectChange(null);
    } else {
      const subject = subjects.find(s => s.id === subjectId);
      onSubjectChange(subject || null);
    }
  };

  return (
    <div className="space-y-2">
      <label htmlFor="subject-select" className="block text-sm font-medium text-gray-700">
        Subject
      </label>
      <select
        id="subject-select"
        value={selectedSubject?.id || ''}
        onChange={handleSubjectChange}
        disabled={!selectedGrade || isLoading}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
      >
        <option value="">
          {selectedGrade ? 'Select a subject' : 'Select a grade first'}
        </option>
        {subjects.map((subject) => (
          <option key={subject.id} value={subject.id}>
            {subject.name}
          </option>
        ))}
      </select>
      
      {isLoading && (
        <p className="text-sm text-gray-500">Loading subjects...</p>
      )}
      
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
} 