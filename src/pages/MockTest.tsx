import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, User, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Question, getQuestionsBySection } from '@/data/questionsData';

const MockTest = () => {
  const { branchId, testNumber } = useParams();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});
  const [timeLeft, setTimeLeft] = useState(180 * 60); // 180 minutes in seconds
  const [visitedQuestions, setVisitedQuestions] = useState<Set<number>>(new Set([1]));
  const [showWarning, setShowWarning] = useState(true);
  const [currentSection, setCurrentSection] = useState<'general' | 'subjects'>('general');
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    setQuestions(getQuestionsBySection(currentSection));
  }, [currentSection]);

  useEffect(() => {
    if (!showWarning) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [showWarning]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleQuestionSelect = (questionId: number) => {
    setCurrentQuestion(questionId);
    setVisitedQuestions(prev => new Set([...prev, questionId]));
  };

  const handleSectionChange = (section: 'general' | 'subjects') => {
    setCurrentSection(section);
    setQuestions(getQuestionsBySection(section));
    const firstQuestion = getQuestionsBySection(section)[0];
    if (firstQuestion) {
        setCurrentQuestion(firstQuestion.id);
        setVisitedQuestions(prev => new Set([...prev, firstQuestion.id]));
    }
  };

  const handleSingleAnswerChange = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: value
    }));
  };

  const handleMultipleAnswerChange = (option: string, checked: boolean) => {
    setAnswers(prev => {
      const currentAnswers = (prev[currentQuestion] as string[]) || [];
      if (checked) {
        return {
          ...prev,
          [currentQuestion]: [...currentAnswers, option]
        };
      } else {
        return {
          ...prev,
          [currentQuestion]: currentAnswers.filter(answer => answer !== option)
        };
      }
    });
  };

  const handleNumericalAnswerChange = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: value
    }));
  };

  const handleNext = () => {
    const currentQuestionIndex = questions.findIndex(q => q.id === currentQuestion);
    if (currentQuestionIndex < questions.length - 1) {
      const nextQuestion = questions[currentQuestionIndex + 1];
      handleQuestionSelect(nextQuestion.id);
    }
  };

  const handleClearResponse = () => {
    setAnswers(prev => {
      const newAnswers = { ...prev };
      delete newAnswers[currentQuestion];
      return newAnswers;
    });
  };

  const handleSubmit = () => {
    navigate(`/result/${branchId}/${testNumber}`, { 
      state: { answers, questions }
    });
  };

  const handleStartTest = () => {
    setShowWarning(false);
  };

  const getQuestionStatus = (questionId: number) => {
    if (answers[questionId]) return 'answered';
    if (visitedQuestions.has(questionId)) return 'visited';
    return 'unvisited';
  };

  const currentQuestionData = questions.find(q => q.id === currentQuestion);

  const renderQuestionContent = (question: Question) => {
    return (
      <div className="space-y-6">
        {/* Question Image - Display prominently if present */}
        {question.image && (
          <div className="w-full flex justify-center mb-6">
            <div className="relative">
              <img 
                src={question.image} 
                alt="Question illustration" 
                className="max-w-full h-auto rounded-lg border-2 border-gray-200 shadow-lg"
                style={{ maxHeight: '500px', minHeight: '200px' }}
                onError={(e) => {
                  // Fallback for missing images
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
              <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-xs">
                Question Image
              </div>
            </div>
          </div>
        )}

        {/* Question Options */}
        <div className="space-y-4">
          {question.type === 'numerical' ? (
            <div className="space-y-3">
              <Input
                type="number"
                placeholder="Enter your numerical answer"
                value={typeof answers[currentQuestion] === 'string' ? answers[currentQuestion] as string : ''}
                onChange={(e) => handleNumericalAnswerChange(e.target.value)}
                className="text-lg p-4 border-2 border-gray-300 focus:border-blue-500"
              />
              <p className="text-sm text-gray-600">
                Note: Enter only the numerical value (integer)
              </p>
            </div>
          ) : question.type === 'multiple' ? (
            <>
              {question.options?.map((option, index) => {
                const selectedAnswers = Array.isArray(answers[currentQuestion]) ? answers[currentQuestion] as string[] : [];
                
                return (
                  <div key={index} className="flex items-center space-x-3 p-4 border-2 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-all">
                    <Checkbox
                      id={`option-${index}`}
                      checked={selectedAnswers.includes(option)}
                      onCheckedChange={(checked) => handleMultipleAnswerChange(option, !!checked)}
                      className="scale-125"
                    />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer text-base">
                      {option}
                    </Label>
                  </div>
                );
              })}
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                <p className="text-sm text-purple-700 font-medium">
                  ⚠️ Note: This question may have multiple correct answers. Select all that apply.
                </p>
                <p className="text-xs text-purple-600 mt-1">
                  Marking: +4 for all correct, +2 for partial correct (no wrong), -1 for any wrong selection
                </p>
              </div>
            </>
          ) : (
            // Single choice questions
            <RadioGroup 
              value={typeof answers[currentQuestion] === 'string' ? answers[currentQuestion] as string : ""} 
              onValueChange={handleSingleAnswerChange}
              className="space-y-4"
            >
              {question.options?.map((option, index) => (
                <div key={index} className="flex items-center space-x-3 p-4 border-2 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all">
                  <RadioGroupItem value={option} id={`option-${index}`} className="scale-125" />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer text-base">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          )}
        </div>
      </div>
    );
  };

  if (showWarning) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Warning Dialog for full screen */}
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <Card className="max-w-md mx-4">
            <CardContent className="p-6 text-center">
              <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-xl font-bold mb-4">Test Environment</h2>
              <p className="text-gray-600 mb-6">
                This test will open in a controlled environment. Do not close the window or navigate away.
                Time limit: 180 minutes
              </p>
              <Button 
                onClick={handleStartTest}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                Start Test
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="grid grid-cols-12 h-screen">
        {/* Left Sidebar - Sections and Question Numbers */}
        <div className="col-span-2 bg-white border-r">
          {/* Section Buttons */}
          <div className="p-4 border-b">
            <h3 className="font-bold text-lg mb-4">Questions</h3>
            <div className="space-y-3">
              <button
                onClick={() => handleSectionChange('general')}
                className={`w-full p-3 rounded-lg text-left font-medium transition-all ${
                  currentSection === 'general' 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                General Aptitude
              </button>
              <button
                onClick={() => handleSectionChange('subjects')}
                className={`w-full p-3 rounded-lg text-left font-medium transition-all ${
                  currentSection === 'subjects' 
                    ? 'bg-orange-600 text-white shadow-md' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Candidate's Subjects
              </button>
            </div>
          </div>

          {/* Question Numbers */}
          <div className="p-4">
            <div className="grid grid-cols-2 gap-2">
              {questions.map((q, index) => {
                const status = getQuestionStatus(q.id);
                let bgColor = 'bg-gray-100 border border-gray-300';
                if (status === 'answered') bgColor = 'bg-green-500 text-white';
                else if (status === 'visited') bgColor = 'bg-orange-500 text-white';
                
                return (
                  <button
                    key={q.id}
                    onClick={() => handleQuestionSelect(q.id)}
                    className={`p-2 rounded text-sm font-medium transition-colors ${bgColor} ${
                      currentQuestion === q.id ? 'ring-2 ring-blue-500' : ''
                    }`}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Center - Question Area */}
        <div className="col-span-8 p-6 overflow-y-auto">
          <Card>
            <CardContent className="p-8">
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">
                  Question {questions.findIndex(q => q.id === currentQuestion) + 1} of {questions.length}
                </h2>
                <p className="text-lg text-gray-800 mb-6">
                  {currentQuestionData?.question}
                </p>
              </div>

              {currentQuestionData && renderQuestionContent(currentQuestionData)}

              <div className="flex justify-between mt-8">
                <Button 
                  variant="outline" 
                  onClick={handleClearResponse}
                  disabled={!answers[currentQuestion]}
                >
                  Clear Response
                </Button>
                <Button 
                  onClick={handleNext}
                  disabled={questions.findIndex(q => q.id === currentQuestion) === questions.length - 1}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Next
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar - Timer and Submit */}
        <div className="col-span-2 bg-white border-l p-4">
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto mb-3 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-blue-600" />
            </div>
            <h4 className="font-semibold">John Doe</h4>
            <p className="text-sm text-gray-600">{branchId?.toUpperCase()}</p>
          </div>

          <Card className="mb-6">
            <CardContent className="p-4 text-center">
              <Clock className="h-8 w-8 mx-auto mb-2 text-red-500" />
              <p className="text-sm text-gray-600 mb-1">Time Remaining</p>
              <p className="text-xl font-bold text-red-600">{formatTime(timeLeft)}</p>
            </CardContent>
          </Card>

          <Button 
            onClick={handleSubmit}
            className="w-full bg-red-600 hover:bg-red-700"
          >
            Submit Test
          </Button>

          <div className="mt-6 text-xs text-gray-600">
            <div className="flex items-center mb-2">
              <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
              <span>Answered</span>
            </div>
            <div className="flex items-center mb-2">
              <div className="w-4 h-4 bg-orange-500 rounded mr-2"></div>
              <span>Visited</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-gray-100 border rounded mr-2"></div>
              <span>Not Visited</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MockTest;
