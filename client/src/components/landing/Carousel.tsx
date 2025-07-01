import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

interface CarouselSlide {
  id: number;
  headline: string;
  description: string;
  visual: string;
  bgGradient: string;
  textColor: string;
}

interface CarouselProps {
  onExploreArcade: () => void;
}

export function Carousel({ onExploreArcade }: CarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const slides: CarouselSlide[] = [
    {
      id: 1,
      headline: "Gamify Your Learning Journey",
      description: "Interactive quizzes. Fun games. Serious learning.",
      visual: "🎮",
      bgGradient: "from-purple-600 via-blue-600 to-cyan-500",
      textColor: "text-white"
    },
    {
      id: 2,
      headline: "Brain Buster Mode",
      description: "Challenge yourself with subject-based multiple-choice questions and instant feedback.",
      visual: "🧠",
      bgGradient: "from-green-500 via-emerald-500 to-teal-500",
      textColor: "text-white"
    },
    {
      id: 3,
      headline: "Time Challenge",
      description: "Speed up your thinking – answer as many questions as you can in 60 seconds!",
      visual: "⏱️",
      bgGradient: "from-orange-500 via-red-500 to-pink-500",
      textColor: "text-white"
    },
    {
      id: 4,
      headline: "Jumble Master Game",
      description: "Unscramble words or formulas to test your memory and logic skills.",
      visual: "🧩",
      bgGradient: "from-indigo-500 via-purple-500 to-pink-500",
      textColor: "text-white"
    },
    {
      id: 5,
      headline: "Progress + Badges",
      description: "Track your scores, earn rewards, and unlock badges as you level up.",
      visual: "🏆",
      bgGradient: "from-yellow-500 via-orange-500 to-red-500",
      textColor: "text-white"
    },
    {
      id: 6,
      headline: "Proudly Zambian, Globally Smart",
      description: "Inspired by Zambia's culture, built for modern students.",
      visual: "🇿🇲",
      bgGradient: "from-green-600 via-orange-500 to-red-600",
      textColor: "text-white"
    }
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying || isPaused) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 6000); // 6 seconds per slide

    return () => clearInterval(interval);
  }, [isPlaying, isPaused, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        prevSlide();
      } else if (event.key === 'ArrowRight') {
        nextSlide();
      } else if (event.key === ' ') {
        event.preventDefault();
        togglePlayPause();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const currentSlideData = slides[currentSlide];

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      {/* Section Header */}
      <div className="text-center mb-8">
        <div className="text-4xl mb-3">🦅</div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Experience Learning Like Never Before
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover the exciting features that make SomaSmart EduHub the perfect learning companion for Zambian students.
        </p>
      </div>

      {/* Carousel Container */}
      <div 
        className="relative rounded-3xl overflow-hidden shadow-2xl max-w-4xl mx-auto"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        role="region"
        aria-label="Feature carousel"
        tabIndex={0}
      >
        {/* Slide Content */}
        <div className={`relative bg-gradient-to-br ${currentSlideData.bgGradient} min-h-[400px] md:min-h-[350px] flex items-center justify-center overflow-hidden`}>
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-32 -translate-y-32"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-48 translate-y-48"></div>
            <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 text-center px-6 md:px-12 py-8">
            <div className="mb-6">
              <div className="text-6xl md:text-7xl mb-4 animate-bounce">
                {currentSlideData.visual}
              </div>
              <h3 className={`text-2xl md:text-4xl font-bold mb-4 ${currentSlideData.textColor} leading-tight`}>
                {currentSlideData.headline}
              </h3>
              <p className={`text-base md:text-lg ${currentSlideData.textColor} opacity-90 max-w-xl mx-auto leading-relaxed`}>
                {currentSlideData.description}
              </p>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </button>

          {/* Play/Pause Button */}
          <button
            onClick={togglePlayPause}
            className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
          >
            {isPlaying ? (
              <Pause className="h-5 w-5 text-white" />
            ) : (
              <Play className="h-5 w-5 text-white ml-0.5" />
            )}
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 ${
                index === currentSlide
                  ? 'bg-white scale-125 shadow-lg'
                  : 'bg-white/50 hover:bg-white/75 hover:scale-110'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
          <div 
            className="h-full bg-white transition-all duration-300 ease-linear"
            style={{ 
              width: `${((currentSlide + 1) / slides.length) * 100}%` 
            }}
          />
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center mt-8">
        <div className="mb-4">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
            Ready to Start Your Adventure?
          </h3>
          <p className="text-gray-600 max-w-xl mx-auto text-sm md:text-base">
            Join thousands of Zambian students who are already experiencing the future of learning with our interactive game arcade.
          </p>
        </div>
        
        <button
          onClick={onExploreArcade}
          className="inline-flex items-center px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          <span className="text-xl md:text-2xl mr-2 md:mr-3">🎮</span>
          Explore the Arcade
          <ChevronRight className="h-4 w-4 md:h-5 md:w-5 ml-2" />
        </button>
        
        <div className="mt-4 flex items-center justify-center space-x-4 md:space-x-6 text-xs md:text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Free to Start</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span>No Downloads</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
            <span>Works on All Devices</span>
          </div>
        </div>
      </div>

      {/* Accessibility Instructions */}
      <div className="mt-6 text-center text-xs md:text-sm text-gray-500">
        <p>Use arrow keys to navigate slides, spacebar to pause/play</p>
      </div>
    </div>
  );
}