import React, { useState } from 'react';
import { AvatarSelection } from './AvatarSelection';
import { SubjectSelection } from './SubjectSelection';
import { LearningGoals } from './LearningGoals';
import { WelcomeComplete } from './WelcomeComplete';

interface OnboardingFlowProps {
  onComplete: (data: OnboardingData) => void;
}

export interface OnboardingData {
  avatar: string;
  subjects: string[];
  learningGoals: string[];
}

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    avatar: '',
    subjects: [],
    learningGoals: []
  });

  const updateData = (update: Partial<OnboardingData>) => {
    setOnboardingData(prev => ({ ...prev, ...update }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete(onboardingData);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const steps = [
    {
      component: AvatarSelection,
      props: {
        selectedAvatar: onboardingData.avatar,
        onSelect: (avatar: string) => updateData({ avatar }),
        onNext: nextStep
      }
    },
    {
      component: SubjectSelection,
      props: {
        selectedSubjects: onboardingData.subjects,
        onSelect: (subjects: string[]) => updateData({ subjects }),
        onNext: nextStep,
        onBack: prevStep
      }
    },
    {
      component: LearningGoals,
      props: {
        selectedGoals: onboardingData.learningGoals,
        onSelect: (learningGoals: string[]) => updateData({ learningGoals }),
        onNext: nextStep,
        onBack: prevStep
      }
    },
    {
      component: WelcomeComplete,
      props: {
        onComplete: () => onComplete(onboardingData)
      }
    }
  ];

  const CurrentStepComponent = steps[currentStep].component;
  const stepProps = steps[currentStep].props;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-orange-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {steps.slice(0, -1).map((_, index) => (
              <React.Fragment key={index}>
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-colors
                  ${index <= currentStep 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                  }
                `}>
                  {index + 1}
                </div>
                {index < steps.length - 2 && (
                  <div className={`
                    w-12 h-1 rounded transition-colors
                    ${index < currentStep ? 'bg-green-600' : 'bg-gray-200'}
                  `} />
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Step {currentStep + 1} of {steps.length}
            </p>
          </div>
        </div>

        <CurrentStepComponent {...stepProps} />
      </div>
    </div>
  );
}