import React, { useState, useEffect } from 'react';
import { lamService } from '../../services/lamService';
import { Grade } from '../../types/lam';

interface GradeSelectorProps {
  selectedGrade: Grade | null;
  onGradeChange: (grade: Grade | null) => void;
}

export function GradeSelector({ selectedGrade, onGradeChange }: GradeSelectorProps) {
  const [grades, setGrades] = useState<Grade[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadGrades();
  }, []);

  const loadGrades = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const fetchedGrades = await lamService.getGrades();
      setGrades(fetchedGrades);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load grades');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGradeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const gradeId = event.target.value;
    if (gradeId === '') {
      onGradeChange(null);
    } else {
      const grade = grades.find(g => g.id === gradeId);
      onGradeChange(grade || null);
    }
  };

  return (
    <div className="space-y-2">
      <label htmlFor="grade-select" className="block text-sm font-medium text-gray-700">
        Grade Level
      </label>
      <select
        id="grade-select"
        value={selectedGrade?.id || ''}
        onChange={handleGradeChange}
        disabled={isLoading}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
      >
        <option value="">Select a grade</option>
        {grades.map((grade) => (
          <option key={grade.id} value={grade.id}>
            {grade.name} - {grade.description}
          </option>
        ))}
      </select>
      
      {isLoading && (
        <p className="text-sm text-gray-500">Loading grades...</p>
      )}
      
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
} 