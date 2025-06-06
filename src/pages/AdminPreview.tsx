import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Book, LogOut, ArrowLeft, Clock, CheckCircle, Square, Hash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { questionsData } from '@/data/questionsData';

const AdminPreview = () => {
  const { branchId, testNumber } = useParams();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  const handleBack = () => {
    navigate(`/admin/branch/${branchId}`);
  };

  const getBranchName = (id: string) => {
    const branches: Record<string, string> = {
      'computer-science': 'Computer Science',
      'electrical-engineering': 'Electrical Engineering',
      'electronics-communication': 'Electronics Communication',
      'mechanical': 'Mechanical',
      'civil': 'Civil'
    };
    return branches[id] || id;
  };

  const renderQuestion = (question: any, index: number) => {
    const getQuestionIcon = (type: string) => {
      switch (type) {
        case 'single':
          return <CheckCircle className="h-4 w-4 text-blue-600" />;
        case 'multiple':
          return <Square className="h-4 w-4 text-purple-600" />;
        case 'numerical':
          return <Hash className="h-4 w-4 text-green-600" />;
        default:
          return <CheckCircle className="h-4 w-4 text-blue-600" />;
      }
    };

    const getQuestionTypeLabel = (type: string) => {
      switch (type) {
        case 'single':
          return 'Single Choice';
        case 'multiple':
          return 'Multiple Choice';
        case 'numerical':
          return 'Numerical';
        default:
          return 'Single Choice';
      }
    };

    return (
      <Card key={question.id} className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-lg">Q{index + 1}:</span>
              {getQuestionIcon(question.type)}
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                question.type === 'single' ? 'bg-blue-100 text-blue-800' :
                question.type === 'multiple' ? 'bg-purple-100 text-purple-800' :
                'bg-green-100 text-green-800'
              }`}>
                {getQuestionTypeLabel(question.type)}
              </span>
            </div>
            <span className="text-sm text-gray-500">
              Section: {question.section === 'general' ? 'General Aptitude' : 'Subject'}
            </span>
          </div>
          
          <p className="text-gray-800 mb-4 whitespace-pre-line">{question.question}</p>
          
          {question.image && (
            <div className="w-full flex justify-center mb-4">
              <img 
                src={question.image} 
                alt="Question illustration" 
                className="max-w-full h-auto rounded-lg border shadow-sm"
                style={{ maxHeight: '300px' }}
              />
            </div>
          )}
          
          {question.options && (
            <div className="grid grid-cols-1 gap-2 mb-4">
              {question.options.map((option: string, optIndex: number) => (
                <div key={optIndex} className="flex items-center space-x-2 p-2 rounded border">
                  <span className="font-medium">{String.fromCharCode(65 + optIndex)})</span>
                  <span>{option}</span>
                </div>
              ))}
            </div>
          )}
          
          <div className="mt-4 p-3 bg-green-50 rounded border">
            <span className="font-medium text-green-800">Correct Answer: </span>
            <span className="text-green-700">
              {Array.isArray(question.correctAnswer) 
                ? question.correctAnswer.join(', ') 
                : question.correctAnswer}
            </span>
          </div>
        </CardContent>
      </Card>
    );
  };

  const generalQuestions = questionsData.filter(q => q.section === 'general');
  const subjectQuestions = questionsData.filter(q => q.section === 'subjects');

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md px-6 py-4 border-b-2 border-gray-200">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Book className="h-6 w-6 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-800">Admin Preview - {getBranchName(branchId || '')}</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button 
              onClick={handleBack}
              variant="outline" 
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </Button>
            <Button 
              onClick={handleLogout}
              variant="outline" 
              className="flex items-center space-x-2"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <Card className="mb-8">
          <CardHeader className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Clock className="h-6 w-6" />
              <span className="font-mono text-lg">03:00:00</span>
            </div>
            <CardTitle className="text-2xl">Mock Test {testNumber} Preview</CardTitle>
            <p className="text-blue-100 mt-2">{getBranchName(branchId || '')} Engineering</p>
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-center space-y-2">
              <p className="text-gray-700">
                <span className="font-semibold">Total Questions:</span> {questionsData.length}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Duration:</span> 180 minutes
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Marking Scheme:</span> +4 for correct, +2 for partial (multiple choice), -1 for wrong, 0 for unattempted
              </p>
            </div>
          </CardContent>
        </Card>

        {/* General Aptitude Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-blue-200">
            Section A: General Aptitude (10 Questions)
          </h2>
          {generalQuestions.map((question, index) => renderQuestion(question, index))}
        </div>

        {/* Subject Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-purple-200">
            Section B: {getBranchName(branchId || '')} (10 Questions)
          </h2>
          {subjectQuestions.map((question, index) => renderQuestion(question, index + 10))}
        </div>
      </div>
    </div>
  );
};

export default AdminPreview;