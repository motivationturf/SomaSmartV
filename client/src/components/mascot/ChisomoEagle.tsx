import React, { useState, useEffect } from 'react';
import { Lightbulb, Star, Trophy, Target, Heart } from 'lucide-react';

interface ChisomoEagleProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  mood?: 'happy' | 'encouraging' | 'proud' | 'wise' | 'excited';
  showBubble?: boolean;
  animated?: boolean;
  className?: string;
}

export function ChisomoEagle({ 
  message = "Keep soaring high, young learner!", 
  size = 'md',
  mood = 'happy',
  showBubble = true,
  animated = true,
  className = ""
}: ChisomoEagleProps) {
  const [currentEagle, setCurrentEagle] = useState('🦅');
  const [isVisible, setIsVisible] = useState(false);

  // Eagle expressions based on mood
  const eagleExpressions = {
    happy: '🦅',
    encouraging: '🦅',
    proud: '🦅',
    wise: '🦅',
    excited: '🦅'
  };

  // Size configurations
  const sizeConfig = {
    sm: { eagle: 'text-2xl', bubble: 'text-xs p-2', container: 'w-16' },
    md: { eagle: 'text-4xl', bubble: 'text-sm p-3', container: 'w-20' },
    lg: { eagle: 'text-6xl', bubble: 'text-base p-4', container: 'w-24' },
    xl: { eagle: 'text-8xl', bubble: 'text-lg p-5', container: 'w-32' }
  };

  // Mood-based messages
  const moodMessages = {
    happy: [
      "You're doing great! Keep learning!",
      "Every question makes you stronger!",
      "Learning is like flying - the more you practice, the higher you soar!"
    ],
    encouraging: [
      "Don't give up! Eagles never quit!",
      "Every expert was once a beginner!",
      "You've got this! I believe in you!"
    ],
    proud: [
      "Amazing work! You're soaring to new heights!",
      "I'm proud of your progress!",
      "You're becoming a true learning eagle!"
    ],
    wise: [
      "Remember: Knowledge is power, but wisdom is knowing how to use it.",
      "The best time to plant a tree was 20 years ago. The second best time is now.",
      "Success is not final, failure is not fatal - it's courage that counts!"
    ],
    excited: [
      "This is so exciting! Let's learn together!",
      "Ready for an adventure in learning?",
      "Learning is the best treasure you can find!"
    ]
  };

  // Get random message based on mood if no specific message provided
  useEffect(() => {
    if (!message || message === "Keep soaring high, young learner!") {
      const messages = moodMessages[mood];
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      // You could set this to state if you want random messages
    }
  }, [mood]);

  // Entrance animation
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Mood icon component
  const MoodIcon = () => {
    const iconProps = { className: "h-4 w-4 text-amber-600" };
    switch (mood) {
      case 'proud':
        return <Trophy {...iconProps} />;
      case 'wise':
        return <Lightbulb {...iconProps} />;
      case 'excited':
        return <Star {...iconProps} />;
      case 'encouraging':
        return <Heart {...iconProps} />;
      default:
        return <Target {...iconProps} />;
    }
  };

  return (
    <div className={`relative ${sizeConfig[size].container} ${className}`}>
      {/* Main Eagle */}
      <div 
        className={`
          ${sizeConfig[size].eagle}
          eagle-mascot
          ${animated ? 'animate-float' : ''}
          ${isVisible ? 'animate-scale-in' : 'opacity-0'}
          cursor-pointer
          select-none
          transition-all duration-300
        `}
        onClick={() => {
          // Add click interaction - could trigger sound or animation
          const eagle = document.querySelector('.eagle-mascot');
          eagle?.classList.add('animate-pulse');
          setTimeout(() => eagle?.classList.remove('animate-pulse'), 600);
        }}
      >
        {currentEagle}
      </div>

      {/* Speech Bubble */}
      {showBubble && message && (
        <div 
          className={`
            absolute top-0 left-full ml-4 z-10
            eagle-speech-bubble
            ${sizeConfig[size].bubble}
            ${isVisible ? 'animate-slide-in-left' : 'opacity-0'}
            max-w-xs
            transition-all duration-500
          `}
          style={{ animationDelay: '0.3s' }}
        >
          <div className="flex items-start gap-2">
            <MoodIcon />
            <div>
              <p className="text-amber-900 font-medium leading-relaxed">
                {message}
              </p>
              <div className="text-xs text-amber-700 mt-1 font-semibold">
                - Chisomo the Eagle
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sparkles effect for excited mood */}
      {mood === 'excited' && animated && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-2 -right-1 text-yellow-400 animate-ping">✨</div>
          <div className="absolute -bottom-1 -left-1 text-yellow-400 animate-ping" style={{ animationDelay: '0.5s' }}>⭐</div>
          <div className="absolute top-1/2 -right-2 text-yellow-400 animate-ping" style={{ animationDelay: '1s' }}>💫</div>
        </div>
      )}
    </div>
  );
}

// Preset configurations for common use cases
export const ChisomoPresets = {
  Welcome: (props: Partial<ChisomoEagleProps>) => (
    <ChisomoEagle 
      mood="excited" 
      message="Welcome to SomaSmart! Ready to soar to new heights?" 
      size="lg"
      {...props} 
    />
  ),
  
  GameComplete: (props: Partial<ChisomoEagleProps>) => (
    <ChisomoEagle 
      mood="proud" 
      message="Outstanding! You've mastered this challenge like a true eagle!" 
      size="md"
      {...props} 
    />
  ),
  
  Encouragement: (props: Partial<ChisomoEagleProps>) => (
    <ChisomoEagle 
      mood="encouraging" 
      message="Don't worry about mistakes - that's how eagles learn to fly!" 
      size="md"
      {...props} 
    />
  ),
  
  Wisdom: (props: Partial<ChisomoEagleProps>) => (
    <ChisomoEagle 
      mood="wise" 
      message="Remember: The eagle that soars highest has learned from every wind." 
      size="md"
      {...props} 
    />
  ),
  
  Hint: (props: Partial<ChisomoEagleProps>) => (
    <ChisomoEagle 
      mood="happy" 
      message="Here's a tip from high above the clouds..." 
      size="sm"
      {...props} 
    />
  )
};

// Hook for managing Chisomo's state across the app
export function useChisomo() {
  const [mood, setMood] = useState<ChisomoEagleProps['mood']>('happy');
  const [message, setMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const showChisomo = (newMood: ChisomoEagleProps['mood'], newMessage: string, duration = 5000) => {
    setMood(newMood);
    setMessage(newMessage);
    setIsVisible(true);
    
    if (duration > 0) {
      setTimeout(() => setIsVisible(false), duration);
    }
  };

  const hideChisomo = () => {
    setIsVisible(false);
  };

  return {
    mood,
    message,
    isVisible,
    showChisomo,
    hideChisomo
  };
}