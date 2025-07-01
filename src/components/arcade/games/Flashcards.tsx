import React, { useState } from 'react';
import { 
  Shuffle, 
  ArrowLeft, 
  ArrowRight, 
  RotateCcw, 
  CheckCircle,
  XCircle,
  Lightbulb,
  Trophy,
  Target,
  Star,
  Sparkles
} from 'lucide-react';
import { Card, CardContent } from '../../ui/Card';
import { Button } from '../../ui/Button';

interface FlashcardsProps {
  config: {
    subject: string;
    topic: string;
    questionCount: number;
  };
  onBack: () => void;
  isGuest?: boolean;
  onUpdateProgress?: (update: any) => void;
}

export function Flashcards({ config, onBack, isGuest = false, onUpdateProgress }: FlashcardsProps) {
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredCards, setMasteredCards] = useState<Set<number>>(new Set());
  const [reviewCards, setReviewCards] = useState<Set<number>>(new Set());
  const [gameComplete, setGameComplete] = useState(false);

  // Subject-specific flashcards with colorful gradients
  const flashcardSets = {
    mathematics: [
      {
        front: "What is the Pythagorean Theorem?",
        back: "a² + b² = c²\n\nIn a right triangle, the square of the hypotenuse equals the sum of squares of the other two sides.",
        eagleTip: "🦅 This theorem helps you find missing sides in right triangles - very useful in construction!",
        frontGradient: "from-blue-600 via-purple-600 to-pink-600",
        backGradient: "from-blue-50 via-purple-50 to-pink-50",
        backBorder: "border-blue-300",
        iconColor: "text-blue-700",
        category: "Geometry",
        categoryBg: "bg-blue-100"
      },
      {
        front: "What is the quadratic formula?",
        back: "x = (-b ± √(b² - 4ac)) / 2a\n\nUsed to solve equations of the form ax² + bx + c = 0",
        eagleTip: "🦅 This is like a mathematical song!",
        frontGradient: "from-green-600 via-emerald-600 to-teal-600",
        backGradient: "from-green-50 via-emerald-50 to-teal-50",
        backBorder: "border-green-300",
        iconColor: "text-green-700",
        category: "Algebra",
        categoryBg: "bg-green-100"
      },
      {
        front: "What is the area of a triangle?",
        back: "Area = ½ × base × height\n\nMultiply base by height, then divide by 2",
        eagleTip: "🦅 Think of it as half a rectangle - that's why we divide by 2!",
        frontGradient: "from-orange-600 via-red-600 to-pink-600",
        backGradient: "from-orange-50 via-red-50 to-pink-50",
        backBorder: "border-orange-300",
        iconColor: "text-orange-700",
        category: "Geometry",
        categoryBg: "bg-orange-100"
      },
      {
        front: "What is the slope formula?",
        back: "m = (y₂ - y₁) / (x₂ - x₁)\n\nSlope measures how steep a line is",
        eagleTip: "🦅 Rise over run - like climbing a mountain, how much up for each step forward!",
        frontGradient: "from-purple-600 via-pink-600 to-rose-600",
        backGradient: "from-purple-50 via-pink-50 to-rose-50",
        backBorder: "border-purple-300",
        iconColor: "text-purple-700",
        category: "Coordinate Geometry",
        categoryBg: "bg-purple-100"
      }
    ],
    'computer-studies': [
      {
        front: "What is a variable in programming?",
        back: "A container that stores data values\n\nLike a labeled box that can hold different items",
        eagleTip: "🦅 Variables are like containers - you can put different things in them and change the contents!",
        frontGradient: "from-cyan-600 via-blue-600 to-indigo-600",
        backGradient: "from-cyan-50 via-blue-50 to-indigo-50",
        backBorder: "border-cyan-300",
        iconColor: "text-cyan-700",
        category: "Programming Basics",
        categoryBg: "bg-cyan-100"
      },
      {
        front: "What is a loop in programming?",
        back: "A structure that repeats code multiple times\n\nCommon types: for, while, do-while",
        eagleTip: "🦅 Loops save time - instead of writing the same code 100 times, write it once and loop it!",
        frontGradient: "from-indigo-600 via-purple-600 to-violet-600",
        backGradient: "from-indigo-50 via-purple-50 to-violet-50",
        backBorder: "border-indigo-300",
        iconColor: "text-indigo-700",
        category: "Control Structures",
        categoryBg: "bg-indigo-100"
      },
      {
        front: "What does HTML stand for?",
        back: "HyperText Markup Language\n\nThe standard language for creating web pages",
        eagleTip: "🦅 HTML is like the skeleton of a webpage - it gives structure to everything!",
        frontGradient: "from-emerald-600 via-green-600 to-lime-600",
        backGradient: "from-emerald-50 via-green-50 to-lime-50",
        backBorder: "border-emerald-300",
        iconColor: "text-emerald-700",
        category: "Web Development",
        categoryBg: "bg-emerald-100"
      },
      {
        front: "What is binary code?",
        back: "A number system using only 0s and 1s\n\nComputers use binary to process all information",
        eagleTip: "🦅 Binary is the language computers speak - everything is either on (1) or off (0)!",
        frontGradient: "from-blue-600 via-cyan-600 to-teal-600",
        backGradient: "from-blue-50 via-cyan-50 to-teal-50",
        backBorder: "border-blue-300",
        iconColor: "text-blue-700",
        category: "Computer Fundamentals",
        categoryBg: "bg-blue-100"
      }
    ],
    sciences: [
      {
        front: "What is photosynthesis?",
        back: "The process plants use to make food from sunlight\n\n6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂",
        eagleTip: "🦅 Plants are like solar panels - they capture sunlight and turn it into energy!",
        frontGradient: "from-green-600 via-lime-600 to-yellow-600",
        backGradient: "from-green-50 via-lime-50 to-yellow-50",
        backBorder: "border-green-300",
        iconColor: "text-green-700",
        category: "Biology",
        categoryBg: "bg-green-100"
      },
      {
        front: "What is Newton's First Law?",
        back: "An object at rest stays at rest, an object in motion stays in motion\n\nUnless acted upon by an external force",
        eagleTip: "🦅 This is why you slide forward when a car stops suddenly - your body wants to keep moving!",
        frontGradient: "from-violet-600 via-purple-600 to-fuchsia-600",
        backGradient: "from-violet-50 via-purple-50 to-fuchsia-50",
        backBorder: "border-violet-300",
        iconColor: "text-violet-700",
        category: "Physics",
        categoryBg: "bg-violet-100"
      },
      {
        front: "What is the periodic table?",
        back: "A chart organizing all chemical elements\n\nArranged by atomic number and properties",
        eagleTip: "🦅 It's like a giant recipe book for the universe - every element has its place!",
        frontGradient: "from-amber-600 via-orange-600 to-red-600",
        backGradient: "from-amber-50 via-orange-50 to-red-50",
        backBorder: "border-amber-300",
        iconColor: "text-amber-700",
        category: "Chemistry",
        categoryBg: "bg-amber-100"
      },
      {
        front: "What is gravity?",
        back: "A force that attracts objects toward each other\n\nEarth's gravity pulls everything toward its center",
        eagleTip: "🦅 Gravity is what I have to overcome every time I spread my wings and soar!",
        frontGradient: "from-purple-600 via-blue-600 to-cyan-600",
        backGradient: "from-purple-50 via-blue-50 to-cyan-50",
        backBorder: "border-purple-300",
        iconColor: "text-purple-700",
        category: "Physics",
        categoryBg: "bg-purple-100"
      }
    ],
    'religious-education': [
      {
        front: "What is the Golden Rule?",
        back: "Treat others as you would like to be treated\n\nFound in many world religions and ethical systems",
        eagleTip: "🦅 This wise principle helps create harmony - like how eagles respect each other's territory!",
        frontGradient: "from-yellow-600 via-orange-600 to-red-600",
        backGradient: "from-yellow-50 via-orange-50 to-red-50",
        backBorder: "border-yellow-300",
        iconColor: "text-yellow-700",
        category: "Ethics",
        categoryBg: "bg-yellow-100"
      },
      {
        front: "What is meditation?",
        back: "A practice of focused attention and mindfulness\n\nUsed in many religions for spiritual growth",
        eagleTip: "🦅 Meditation is like when I soar quietly, focused and peaceful, observing the world below!",
        frontGradient: "from-indigo-600 via-purple-600 to-pink-600",
        backGradient: "from-indigo-50 via-purple-50 to-pink-50",
        backBorder: "border-indigo-300",
        iconColor: "text-indigo-700",
        category: "Spiritual Practices",
        categoryBg: "bg-indigo-100"
      },
      {
        front: "What is compassion?",
        back: "Feeling concern for others' suffering and wanting to help\n\nA core value in most world religions",
        eagleTip: "🦅 Compassion is like how eagles care for their young - protecting and nurturing with love!",
        frontGradient: "from-rose-600 via-pink-600 to-purple-600",
        backGradient: "from-rose-50 via-pink-50 to-purple-50",
        backBorder: "border-rose-300",
        iconColor: "text-rose-700",
        category: "Values",
        categoryBg: "bg-rose-100"
      },
      {
        front: "What is pilgrimage?",
        back: "A spiritual journey to a sacred place\n\nPracticed in many religions for spiritual growth",
        eagleTip: "🦅 Pilgrimage is like my long migrations - a meaningful journey with a sacred purpose!",
        frontGradient: "from-teal-600 via-cyan-600 to-blue-600",
        backGradient: "from-teal-50 via-cyan-50 to-blue-50",
        backBorder: "border-teal-300",
        iconColor: "text-teal-700",
        category: "Religious Practices",
        categoryBg: "bg-teal-100"
      }
    ]
  };

  const cards = flashcardSets[config.subject as keyof typeof flashcardSets] || flashcardSets.mathematics;
  const currentCardData = cards[currentCard];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleMastered = () => {
    const newMastered = new Set(masteredCards);
    newMastered.add(currentCard);
    setMasteredCards(newMastered);
    
    if (newMastered.size === cards.length) {
      setGameComplete(true);
      if (isGuest && onUpdateProgress) {
        onUpdateProgress({
          timeSpent: 10,
          pointsEarned: cards.length * 5
        });
      }
    } else {
      nextCard();
    }
  };

  const handleNeedReview = () => {
    const newReview = new Set(reviewCards);
    newReview.add(currentCard);
    setReviewCards(newReview);
    nextCard();
  };

  const nextCard = () => {
    setIsFlipped(false);
    if (currentCard < cards.length - 1) {
      setCurrentCard(currentCard + 1);
    } else {
      setCurrentCard(0);
    }
  };

  const prevCard = () => {
    setIsFlipped(false);
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1);
    } else {
      setCurrentCard(cards.length - 1);
    }
  };

  const resetGame = () => {
    setCurrentCard(0);
    setIsFlipped(false);
    setMasteredCards(new Set());
    setReviewCards(new Set());
    setGameComplete(false);
  };

  if (gameComplete) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-6">
        <Card className="text-center overflow-hidden">
          <div className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 p-8 text-white">
            <div className="text-6xl mb-4">🦅</div>
            <Trophy className="h-16 w-16 text-white mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-2">All Cards Mastered!</h2>
            <p className="text-yellow-100">Chisomo the Eagle is impressed with your dedication!</p>
          </div>
          
          <CardContent className="p-8">
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-green-50 to-emerald-100 border border-green-200 rounded-xl p-6">
                <div className="text-3xl font-bold text-green-600 mb-2">{masteredCards.size}</div>
                <p className="text-green-700 font-medium">Cards Mastered</p>
                <Sparkles className="h-6 w-6 text-green-500 mx-auto mt-2" />
              </div>
              <div className="bg-gradient-to-br from-yellow-50 to-amber-100 border border-yellow-200 rounded-xl p-6">
                <div className="text-3xl font-bold text-yellow-600 mb-2">{reviewCards.size}</div>
                <p className="text-yellow-700 font-medium">Need Review</p>
                <Star className="h-6 w-6 text-yellow-500 mx-auto mt-2" />
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-violet-100 border border-purple-200 rounded-xl p-6">
                <div className="text-3xl font-bold text-purple-600 mb-2">{isGuest ? '0' : cards.length * 5}</div>
                <p className="text-purple-700 font-medium">Points Earned</p>
                <Trophy className="h-6 w-6 text-purple-500 mx-auto mt-2" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-amber-50 to-orange-100 border border-amber-200 rounded-xl p-6 mb-8">
              <div className="flex items-start space-x-3">
                <div className="text-3xl">🦅</div>
                <div className="text-left">
                  <h4 className="font-semibold text-amber-900 mb-2">Chisomo's Wisdom</h4>
                  <p className="text-amber-800">
                    Excellent work! You've mastered all the flashcards. Regular review is the key to long-term retention. 
                    Like an eagle's keen eyesight, your knowledge will stay sharp with practice!
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <Button onClick={onBack} className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Arcade
              </Button>
              <Button variant="outline" onClick={resetGame} className="border-2 border-purple-300 text-purple-700 hover:bg-purple-50">
                <RotateCcw className="h-4 w-4 mr-2" />
                Study Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Arcade
        </Button>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <Shuffle className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Colorful Flashcards
              </h1>
              <p className="text-gray-600">{config.subject.charAt(0).toUpperCase() + config.subject.slice(1).replace('-', ' ')}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="text-lg font-bold text-blue-600">
                {currentCard + 1}/{cards.length}
              </div>
              <p className="text-xs text-gray-600">Cards</p>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">{masteredCards.size}</div>
              <p className="text-xs text-gray-600">Mastered</p>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-yellow-600">{reviewCards.size}</div>
              <p className="text-xs text-gray-600">Review</p>
            </div>
          </div>
        </div>

        {/* Colorful Progress Bar */}
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${(masteredCards.size / cards.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Colorful Flashcard with Gradient Backgrounds */}
      <div className="mb-6 perspective-1000">
        <div 
          className={`relative w-full h-96 transition-transform duration-700 transform-style-preserve-3d cursor-pointer ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
          onClick={handleFlip}
        >
          {/* Front of card - Colorful gradient background */}
          <Card className={`absolute inset-0 backface-hidden overflow-hidden ${
            masteredCards.has(currentCard) ? 'ring-4 ring-green-400 shadow-2xl' :
            reviewCards.has(currentCard) ? 'ring-4 ring-yellow-400 shadow-2xl' :
            'shadow-xl hover:shadow-2xl'
          }`}>
            <div className={`bg-gradient-to-br ${currentCardData.frontGradient} p-8 text-white relative overflow-hidden h-full`}>
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
              
              <div className="relative z-10 h-full flex flex-col justify-center">
                <div className="text-center">
                  <div className="flex items-center justify-between mb-6">
                    <Target className="h-8 w-8 text-white" />
                    <span className={`px-3 py-1 ${currentCardData.categoryBg} rounded-full text-sm font-medium text-gray-800`}>
                      {currentCardData.category}
                    </span>
                  </div>
                  <div className="text-sm font-medium mb-4 text-white/90">Question</div>
                  <h3 className="text-2xl font-bold mb-8 leading-tight text-white">
                    {currentCardData.front}
                  </h3>
                  <div className="flex items-center justify-center space-x-2 text-white/80">
                    <Sparkles className="h-4 w-4" />
                    <span className="text-sm">Click to reveal answer</span>
                    <Sparkles className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Back of card - Light gradient background with excellent contrast */}
          <Card className={`absolute inset-0 backface-hidden rotate-y-180 overflow-hidden shadow-2xl border-2 ${currentCardData.backBorder}`}>
            <div className={`bg-gradient-to-br ${currentCardData.backGradient} p-8 h-full relative`}>
              <div className="relative z-10 h-full flex flex-col justify-center">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-6">
                    <div className="p-3 bg-white rounded-xl shadow-lg border-2 border-gray-200">
                      <Lightbulb className={`h-6 w-6 ${currentCardData.iconColor}`} />
                    </div>
                  </div>
                  <div className="text-sm font-medium text-gray-600 mb-4">Answer</div>
                  <div className="text-lg text-gray-900 mb-6 whitespace-pre-line font-medium leading-relaxed bg-white/90 backdrop-blur-sm rounded-xl p-6 border border-gray-200 shadow-sm">
                    {currentCardData.back}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Eagle Tip with Gradient */}
      {isFlipped && (
        <Card className="mb-6 overflow-hidden border-2 border-amber-200">
          <div className="bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 p-6">
            <div className="flex items-start space-x-4">
              <div className="text-4xl">🦅</div>
              <div className="text-white">
                <h4 className="font-bold text-lg mb-2">Eagle Wisdom</h4>
                <p className="text-amber-100">{currentCardData.eagleTip}</p>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Colorful Controls */}
      <div className="flex items-center justify-between">
        <Button 
          variant="outline" 
          onClick={prevCard}
          className="border-2 border-blue-300 text-blue-700 hover:bg-blue-50 hover:border-blue-400"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>

        {isFlipped && (
          <div className="flex space-x-3">
            <Button 
              variant="outline" 
              onClick={handleNeedReview} 
              className="border-2 border-yellow-400 text-yellow-700 hover:bg-yellow-50 bg-gradient-to-r from-yellow-50 to-amber-50"
            >
              <XCircle className="h-4 w-4 mr-2" />
              Need Review
            </Button>
            <Button 
              onClick={handleMastered} 
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Mastered
            </Button>
          </div>
        )}

        <Button 
          variant="outline" 
          onClick={nextCard}
          className="border-2 border-purple-300 text-purple-700 hover:bg-purple-50 hover:border-purple-400"
        >
          Next
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>

      {/* Colorful Card Status Indicators */}
      <div className="mt-6 flex justify-center space-x-2">
        {cards.map((_, index) => (
          <div
            key={index}
            className={`w-4 h-4 rounded-full transition-all duration-300 ${
              index === currentCard ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 scale-125 shadow-lg' :
              masteredCards.has(index) ? 'bg-gradient-to-r from-green-400 to-emerald-500' :
              reviewCards.has(index) ? 'bg-gradient-to-r from-yellow-400 to-orange-500' :
              'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
}