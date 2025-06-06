import React from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Award, CheckCircle, XCircle, Clock, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { questionsData } from '@/data/questionsData';

const TestResult = () => {
  const { branchId, testNumber } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { answers } = location.state || {};

  // Get all questions from the data file - both sections
  const generalAptitudeQuestions = questionsData.filter(q => q.section === 'general');
  const subjectQuestions = questionsData.filter(q => q.section === 'subjects');
  const allQuestions = [...generalAptitudeQuestions, ...subjectQuestions];

  console.log('General Aptitude Questions:', generalAptitudeQuestions.length);
  console.log('Subject Questions:', subjectQuestions.length);
  console.log('Total Questions:', allQuestions.length);
  console.log('Answers received:', answers);

  const calculateResults = () => {
    let correct = 0;
    let wrong = 0;
    let unattempted = 0;

    allQuestions.forEach((question) => {
      const userAnswer = answers?.[question.id];
      if (!userAnswer || (Array.isArray(userAnswer) && userAnswer.length === 0)) {
        unattempted++;
      } else if (Array.isArray(question.correctAnswer)) {
        // Handle multiple choice questions
        const userAnswers = Array.isArray(userAnswer) ? userAnswer : [userAnswer];
        const correctAnswers = question.correctAnswer;
        
        if (userAnswers.length === correctAnswers.length && 
            userAnswers.every((ans: string) => correctAnswers.includes(ans))) {
          correct++;
        } else {
          wrong++;
        }
      } else {
        // Handle single choice and numerical questions
        if (userAnswer === question.correctAnswer) {
          correct++;
        } else {
          wrong++;
        }
      }
    });

    const totalMarks = correct * 4 - wrong * 1;
    return { correct, wrong, unattempted, totalMarks };
  };

  const results = calculateResults();

  const handleBackToDashboard = () => {
    navigate(`/dashboard/${branchId}`);
  };

  const renderQuestionAnalysis = (sectionQuestions: any[], sectionTitle: string) => {
    if (!sectionQuestions || sectionQuestions.length === 0) {
      return (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b-2 border-blue-500 pb-2">
            {sectionTitle}
          </h2>
          <p className="text-gray-600">No questions found for this section.</p>
        </div>
      );
    }

    return (
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b-2 border-blue-500 pb-2">
          {sectionTitle}
        </h2>
        <div className="space-y-6">
          {sectionQuestions.map((question, index) => {
            const userAnswer = answers?.[question.id];
            let isCorrect = false;
            let isAttempted = !!(userAnswer && (Array.isArray(userAnswer) ? userAnswer.length > 0 : true));
            
            if (isAttempted) {
              if (Array.isArray(question.correctAnswer)) {
                // Handle multiple choice questions
                const userAnswers = Array.isArray(userAnswer) ? userAnswer : [userAnswer];
                const correctAnswers = question.correctAnswer;
                isCorrect = userAnswers.length === correctAnswers.length && 
                           userAnswers.every((ans: string) => correctAnswers.includes(ans));
              } else {
                // Handle single choice and numerical questions
                isCorrect = userAnswer === question.correctAnswer;
              }
            }
            
            let bgColor = 'bg-gray-50';
            let borderColor = 'border-gray-200';
            if (isAttempted) {
              if (isCorrect) {
                bgColor = 'bg-green-50';
                borderColor = 'border-green-200';
              } else {
                bgColor = 'bg-red-50';
                borderColor = 'border-red-200';
              }
            }

            const formatAnswer = (answer: any) => {
              if (!answer || (Array.isArray(answer) && answer.length === 0)) return 'Not attempted';
              if (Array.isArray(answer)) {
                return answer.join(', ');
              }
              return answer;
            };

            const formatCorrectAnswer = (correctAnswer: any) => {
              if (Array.isArray(correctAnswer)) {
                return correctAnswer.join(', ');
              }
              return correctAnswer;
            };

            return (
              <div key={question.id} className={`p-6 rounded-lg border-2 ${bgColor} ${borderColor} shadow-sm`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-lg font-bold text-blue-600">Question {index + 1}:</span>
                    {isAttempted ? (
                      isCorrect ? (
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      ) : (
                        <XCircle className="h-6 w-6 text-red-600" />
                      )
                    ) : (
                      <Clock className="h-6 w-6 text-gray-500" />
                    )}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                    isAttempted 
                      ? isCorrect 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {isAttempted ? (isCorrect ? '+4' : '-1') : '0'}
                  </span>
                </div>
                
                <div className="mb-4">
                  <p className="text-gray-800 text-base leading-relaxed font-medium">{question.question}</p>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg border">
                    <span className="font-semibold text-gray-700">Your Answer: </span>
                    <span className={`font-medium ${userAnswer ? (isCorrect ? 'text-green-600' : 'text-red-600') : 'text-gray-500'}`}>
                      {formatAnswer(userAnswer)}
                    </span>
                  </div>
                  <div className="bg-white p-4 rounded-lg border">
                    <span className="font-semibold text-gray-700">Correct Answer: </span>
                    <span className="text-green-600 font-medium">{formatCorrectAnswer(question.correctAnswer)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Test Results</h1>
          <p className="text-xl text-gray-600">Mock Test {testNumber} - {branchId?.toUpperCase()} Engineering</p>
        </div>

        {/* Score Summary */}
        <Card className="mb-8 shadow-xl">
          <CardHeader className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
            <Award className="h-16 w-16 mx-auto mb-4" />
            <CardTitle className="text-3xl">Your Score</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              <div className="bg-green-50 p-6 rounded-lg border-2 border-green-200">
                <div className="text-4xl font-bold text-green-600 mb-2">{results.correct}</div>
                <div className="text-lg text-gray-600 font-medium">Correct</div>
              </div>
              <div className="bg-red-50 p-6 rounded-lg border-2 border-red-200">
                <div className="text-4xl font-bold text-red-600 mb-2">{results.wrong}</div>
                <div className="text-lg text-gray-600 font-medium">Wrong</div>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200">
                <div className="text-4xl font-bold text-gray-500 mb-2">{results.unattempted}</div>
                <div className="text-lg text-gray-600 font-medium">Unattempted</div>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
                <div className="text-4xl font-bold text-blue-600 mb-2">{results.totalMarks}</div>
                <div className="text-lg text-gray-600 font-medium">Total Marks</div>
              </div>
            </div>
            
            <div className="mt-8 text-center bg-gradient-to-r from-blue-100 to-purple-100 p-6 rounded-lg">
              <p className="text-2xl text-gray-700 mb-2">
                <span className="font-bold">Final Score:</span> {results.totalMarks} out of 80
              </p>
              <p className="text-lg text-gray-600">
                Marking Scheme: +4 for correct, -1 for wrong, 0 for unattempted
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Analysis */}
        <Card className="mb-8 shadow-xl">
          <CardHeader className="bg-gray-50 border-b">
            <CardTitle className="text-2xl text-gray-800">Detailed Question Analysis</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            {/* General Aptitude Section */}
            {renderQuestionAnalysis(generalAptitudeQuestions, "General Aptitude")}
            
            {/* Candidate's Subject Section */}
            {renderQuestionAnalysis(subjectQuestions, "Candidate's Subject")}
          </CardContent>
        </Card>

        {/* Back to Dashboard */}
        <div className="text-center">
          <Button 
            onClick={handleBackToDashboard}
            className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TestResult;