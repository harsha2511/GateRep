import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Book, LogOut, Upload, Eye, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface StudentAttempt {
  name: string;
  marksScored: number;
}

const AdminBranch = () => {
  const { branchId } = useParams();
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [mockTestNumber, setMockTestNumber] = useState('');
  const [selectedMockTest, setSelectedMockTest] = useState<number | null>(null);

  const handleLogout = () => {
    navigate('/');
  };

  const handleBackToDashboard = () => {
    navigate('/admin-dashboard');
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/json') {
      setSelectedFile(file);
    } else {
      alert('Please select a valid JSON file');
    }
  };

  const handleUpload = () => {
    if (!selectedFile || !mockTestNumber) {
      alert('Please select a file and enter mock test number');
      return;
    }
    alert(`Questions uploaded successfully for Mock Test ${mockTestNumber}`);
    setSelectedFile(null);
    setMockTestNumber('');
  };

  const handlePreview = () => {
    if (!selectedFile) {
      alert('Please select a JSON file first');
      return;
    }
    navigate(`/admin/preview/${branchId}/${mockTestNumber}`);
  };

  const handleMockTestClick = (testNumber: number) => {
    setSelectedMockTest(testNumber);
  };

  const handleBackToBranch = () => {
    setSelectedMockTest(null);
  };

  // Mock data for student attempts
  const studentAttempts: Record<string, StudentAttempt[]> = {
    '1': [
      { name: 'John Doe', marksScored: 85 },
      { name: 'Jane Smith', marksScored: 92 },
      { name: 'Mike Johnson', marksScored: 78 },
      { name: 'Sarah Wilson', marksScored: 88 }
    ],
    '2': [
      { name: 'Alice Johnson', marksScored: 88 },
      { name: 'Bob Wilson', marksScored: 76 }
    ],
    '3': [
      { name: 'Charlie Brown', marksScored: 91 }
    ]
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

  const getMaxMarks = (attempts: StudentAttempt[]) => {
    return attempts.length > 0 ? Math.max(...attempts.map(a => a.marksScored)) : 0;
  };

  // If a mock test is selected, show the mock test management view (Image 3)
  if (selectedMockTest) {
    const attempts = studentAttempts[selectedMockTest.toString()] || [];
    
    return (
      <div className="min-h-screen bg-slate-100">
        {/* Navigation Bar */}
        <nav className="bg-white shadow-sm px-6 py-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-medium text-gray-800">Nav bar</h1>
            </div>
            <Button 
              onClick={handleLogout}
              variant="ghost" 
              className="text-gray-600 hover:text-gray-800"
            >
              logout
            </Button>
          </div>
        </nav>

        <div className="flex h-[calc(100vh-80px)]">
          {/* Left Sidebar */}
          <div className="w-80 bg-slate-200 p-4">
            <div className="space-y-3">
              <Button
                onClick={handleBackToBranch}
                className="w-full h-12 bg-blue-200 hover:bg-blue-300 text-gray-800 font-medium rounded-lg border-0"
              >
                {getBranchName(branchId || '')}
              </Button>
              
              <Button
                onClick={() => handleBackToDashboard()}
                className="w-full h-12 bg-blue-200 hover:bg-blue-300 text-gray-800 font-medium rounded-lg border-0"
              >
                Electrical Engineering
              </Button>
              
              <Button
                className="w-full h-12 bg-blue-200 hover:bg-blue-300 text-gray-800 font-medium rounded-lg border-0"
              >
                Electronics Communication
              </Button>
              
              <Button
                className="w-full h-12 bg-blue-200 hover:bg-blue-300 text-gray-800 font-medium rounded-lg border-0"
              >
                Mechanical
              </Button>
              
              <Button
                className="w-full h-12 bg-blue-200 hover:bg-blue-300 text-gray-800 font-medium rounded-lg border-0"
              >
                Civil
              </Button>

              {/* Mock Tests */}
              {[1, 2, 3, 4, 5].map((testNumber) => (
                <Button
                  key={testNumber}
                  onClick={() => handleMockTestClick(testNumber)}
                  className={`w-full h-12 font-medium rounded-lg border-0 ${
                    selectedMockTest === testNumber 
                      ? 'bg-blue-300 text-gray-800' 
                      : 'bg-blue-200 hover:bg-blue-250 text-gray-800'
                  }`}
                >
                  Mock test {testNumber}
                </Button>
              ))}
            </div>
          </div>

          {/* Right Content Area */}
          <div className="flex-1 p-6">
            {/* Upload Section */}
            <div className="bg-slate-200 rounded-lg p-6 mb-6">
              <div className="text-center mb-6">
                <h2 className="text-xl font-medium text-gray-800">Upload here</h2>
              </div>

              <div className="space-y-4 mb-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700">Mock Test Number</Label>
                  <Input
                    placeholder="Enter test number (1-9)"
                    value={mockTestNumber}
                    onChange={(e) => setMockTestNumber(e.target.value)}
                    className="mt-1 bg-white border border-gray-300"
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700">JSON Question File</Label>
                  <Input
                    type="file"
                    accept=".json"
                    onChange={handleFileChange}
                    className="mt-1 bg-white border border-gray-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button 
                  onClick={handlePreview}
                  className="bg-blue-300 hover:bg-blue-400 text-gray-800 border-0"
                >
                  Preview
                </Button>
                <Button 
                  onClick={handleUpload}
                  className="bg-blue-300 hover:bg-blue-400 text-gray-800 border-0"
                >
                  Submit
                </Button>
              </div>
            </div>

            {/* Statistics Section */}
            <div className="bg-slate-200 rounded-lg p-6">
              <div className="mb-4">
                <p className="text-lg font-medium text-gray-800">No of students attempted:- {attempts.length}</p>
              </div>

              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-800">Total</span>
                <span className="text-gray-800">marks:- 100</span>
              </div>
              
              <div className="mb-4">
                <span className="text-gray-800">Maximum marks Score:- {getMaxMarks(attempts)} marks</span>
              </div>

              {/* Student Results Table */}
              <div className="bg-blue-200 rounded-lg overflow-hidden">
                <div className="grid grid-cols-2 bg-blue-300">
                  <div className="p-3 font-medium text-gray-800">Student name</div>
                  <div className="p-3 font-medium text-gray-800">Marks scored</div>
                </div>
                {attempts.map((attempt, index) => (
                  <div key={index} className="grid grid-cols-2 border-t border-blue-300">
                    <div className="p-3 text-gray-800 bg-white">{attempt.name}</div>
                    <div className="p-3 text-gray-800 bg-white">{attempt.marksScored}</div>
                  </div>
                ))}
                <div className="p-3 bg-white">
                  <Button className="w-full bg-blue-300 hover:bg-blue-400 text-gray-800 border-0">
                    View Profile
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default view - Branch with mock tests grid (Image 2)
  return (
    <div className="min-h-screen bg-slate-100">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-medium text-gray-800">Nav bar</h1>
          </div>
          <Button 
            onClick={handleLogout}
            variant="ghost" 
            className="text-gray-600 hover:text-gray-800"
          >
            logout
          </Button>
        </div>
      </nav>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Sidebar */}
        <div className="w-80 bg-slate-200 p-4">
          <div className="space-y-3">
            <Button
              onClick={handleBackToDashboard}
              className="w-full h-12 bg-blue-200 hover:bg-blue-300 text-gray-800 font-medium rounded-lg border-0"
            >
              {getBranchName(branchId || '')}
            </Button>
            
            <Button
              className="w-full h-12 bg-blue-200 hover:bg-blue-300 text-gray-800 font-medium rounded-lg border-0"
            >
              Electrical Engineering
            </Button>
            
            <Button
              className="w-full h-12 bg-blue-200 hover:bg-blue-300 text-gray-800 font-medium rounded-lg border-0"
            >
              Electronics Communication
            </Button>
            
            <Button
              className="w-full h-12 bg-blue-200 hover:bg-blue-300 text-gray-800 font-medium rounded-lg border-0"
            >
              Mechanical
            </Button>
            
            <Button
              className="w-full h-12 bg-blue-200 hover:bg-blue-300 text-gray-800 font-medium rounded-lg border-0"
            >
              Civil
            </Button>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 p-6">
          <div className="bg-slate-200 rounded-lg p-6 h-full">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-medium text-gray-800">{getBranchName(branchId || '')}</h2>
            </div>

            {/* Mock Tests Grid */}
            <div className="grid grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((testNumber) => (
                <Button
                  key={testNumber}
                  onClick={() => handleMockTestClick(testNumber)}
                  className="h-24 text-lg font-medium bg-blue-200 hover:bg-blue-300 text-gray-800 rounded-lg border-0 transition-all duration-200"
                >
                  Mock test {testNumber}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBranch;