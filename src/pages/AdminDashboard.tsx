
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Book, Upload, Users, Trophy, Eye, ArrowLeft, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import AdminSidebar from '@/components/AdminSidebar.tsx';

interface TestStats {
  testNumber: number;
  studentsAttempted: number;
  maxMarks: number;
  averageMarks: number;
  uploaded: boolean;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedTestNumber, setSelectedTestNumber] = useState('');
  const [jsonFile, setJsonFile] = useState<File | null>(null);
  const [showBranchStats, setShowBranchStats] = useState(false);

  // Mock data for demonstration
  const [testStats, setTestStats] = useState<Record<string, TestStats[]>>({
    'cse': [
      { testNumber: 1, studentsAttempted: 67, maxMarks: 164, averageMarks: 125, uploaded: true },
      { testNumber: 2, studentsAttempted: 59, maxMarks: 152, averageMarks: 122, uploaded: true },
      { testNumber: 3, studentsAttempted: 0, maxMarks: 0, averageMarks: 0, uploaded: false },
      { testNumber: 4, studentsAttempted: 0, maxMarks: 0, averageMarks: 0, uploaded: false },
      { testNumber: 5, studentsAttempted: 0, maxMarks: 0, averageMarks: 0, uploaded: false },
      { testNumber: 6, studentsAttempted: 0, maxMarks: 0, averageMarks: 0, uploaded: false },
    ],
    'ece': [
      { testNumber: 1, studentsAttempted: 45, maxMarks: 156, averageMarks: 120, uploaded: true },
      { testNumber: 2, studentsAttempted: 38, maxMarks: 142, averageMarks: 115, uploaded: true },
      { testNumber: 3, studentsAttempted: 0, maxMarks: 0, averageMarks: 0, uploaded: false },
      { testNumber: 4, studentsAttempted: 0, maxMarks: 0, averageMarks: 0, uploaded: false },
      { testNumber: 5, studentsAttempted: 0, maxMarks: 0, averageMarks: 0, uploaded: false },
      { testNumber: 6, studentsAttempted: 0, maxMarks: 0, averageMarks: 0, uploaded: false },
    ],
    'eee': [
      { testNumber: 1, studentsAttempted: 32, maxMarks: 148, averageMarks: 118, uploaded: true },
      { testNumber: 2, studentsAttempted: 28, maxMarks: 134, averageMarks: 108, uploaded: true },
      { testNumber: 3, studentsAttempted: 0, maxMarks: 0, averageMarks: 0, uploaded: false },
      { testNumber: 4, studentsAttempted: 0, maxMarks: 0, averageMarks: 0, uploaded: false },
      { testNumber: 5, studentsAttempted: 0, maxMarks: 0, averageMarks: 0, uploaded: false },
      { testNumber: 6, studentsAttempted: 0, maxMarks: 0, averageMarks: 0, uploaded: false },
    ],
    'me': [
      { testNumber: 1, studentsAttempted: 23, maxMarks: 140, averageMarks: 112, uploaded: true },
      { testNumber: 2, studentsAttempted: 0, maxMarks: 0, averageMarks: 0, uploaded: false },
      { testNumber: 3, studentsAttempted: 0, maxMarks: 0, averageMarks: 0, uploaded: false },
      { testNumber: 4, studentsAttempted: 0, maxMarks: 0, averageMarks: 0, uploaded: false },
      { testNumber: 5, studentsAttempted: 0, maxMarks: 0, averageMarks: 0, uploaded: false },
      { testNumber: 6, studentsAttempted: 0, maxMarks: 0, averageMarks: 0, uploaded: false },
    ],
    'ce': [
      { testNumber: 1, studentsAttempted: 18, maxMarks: 136, averageMarks: 108, uploaded: true },
      { testNumber: 2, studentsAttempted: 0, maxMarks: 0, averageMarks: 0, uploaded: false },
      { testNumber: 3, studentsAttempted: 0, maxMarks: 0, averageMarks: 0, uploaded: false },
      { testNumber: 4, studentsAttempted: 0, maxMarks: 0, averageMarks: 0, uploaded: false },
      { testNumber: 5, studentsAttempted: 0, maxMarks: 0, averageMarks: 0, uploaded: false },
      { testNumber: 6, studentsAttempted: 0, maxMarks: 0, averageMarks: 0, uploaded: false },
    ],
  });

  const branches = [
    { value: 'cse', label: 'Computer Science Engineering' },
    { value: 'ece', label: 'Electronics & Communication Engineering' },
    { value: 'eee', label: 'Electrical & Electronics Engineering' },
    { value: 'me', label: 'Mechanical Engineering' },
    { value: 'ce', label: 'Civil Engineering' },
  ];

  const handleLogout = () => {
    navigate('/');
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, testNumber: number) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/json') {
      setJsonFile(file);
    } else {
      toast({
        title: "Error",
        description: "Please select a valid JSON file",
        variant: "destructive"
      });
    }
  };

  const handleUploadQuestions = (testNumber: number) => {
    if (!jsonFile) {
      toast({
        title: "Error",
        description: "Please upload a JSON file first",
        variant: "destructive"
      });
      return;
    }

    // Simulate upload
    toast({
      title: "Success",
      description: `Questions uploaded successfully for ${selectedBranch.toUpperCase()} Mock Test ${testNumber}`,
    });

    // Update test stats
    setTestStats(prev => ({
      ...prev,
      [selectedBranch]: prev[selectedBranch]?.map(test => 
        test.testNumber === testNumber 
          ? { ...test, uploaded: true }
          : test
      ) || []
    }));

    setJsonFile(null);
  };

  const handlePreviewTest = (testNumber: number) => {
    navigate(`/test/${selectedBranch}/${testNumber}?preview=true`);
  };

  const handleBranchClick = (branchValue: string) => {
    setSelectedBranch(branchValue);
    setShowBranchStats(true);
  };

  const handleBackToBranches = () => {
    setShowBranchStats(false);
    setSelectedBranch('');
  };

  if (showBranchStats && selectedBranch) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <nav className="bg-white shadow-lg px-6 py-4 border-b-2 border-blue-200">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Book className="h-6 w-6 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-800">
                Admin Dashboard - {selectedBranch.toUpperCase()} Engineering
              </h1>
            </div>
            <div className="flex space-x-4">
              <Button onClick={handleBackToBranches} variant="outline" className="border-blue-300 text-blue-600 hover:bg-blue-50">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Branches
              </Button>
              <Button onClick={handleLogout} variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">
                Logout
              </Button>
            </div>
          </div>
        </nav>

        <div className="flex">
          {/* Sidebar */}
          <div className="w-80 p-6">
            <AdminSidebar 
              branches={branches}
              testStats={testStats}
              onBranchClick={handleBranchClick}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {branches.find(b => b.value === selectedBranch)?.label}
              </h2>
              <p className="text-gray-600 text-lg">Mock Test Performance Overview</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {testStats[selectedBranch]?.slice(0, 6).map((test) => (
                <Card key={test.testNumber} className="hover:shadow-xl transition-all duration-300 border-2 border-gray-200 hover:border-blue-300 bg-white">
                  <CardHeader className="pb-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
                    <CardTitle className="flex items-center justify-between">
                      <span className="text-xl font-bold text-gray-800">Mock Test {test.testNumber}</span>
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                        test.uploaded ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-gray-100 text-gray-600 border border-gray-200'
                      }`}>
                        {test.uploaded ? '✓ Uploaded' : '○ Not Uploaded'}
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6 p-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <Users className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                        <div className="text-2xl font-bold text-blue-600">{test.studentsAttempted}</div>
                        <div className="text-xs text-gray-600 font-medium">Students Attempted</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                        <Trophy className="h-6 w-6 mx-auto mb-2 text-green-600" />
                        <div className="text-2xl font-bold text-green-600">{test.maxMarks}</div>
                        <div className="text-xs text-gray-600 font-medium">Maximum Marks</div>
                      </div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
                      <BarChart3 className="h-6 w-6 mx-auto mb-2 text-orange-600" />
                      <div className="text-xl font-bold text-orange-600">{test.averageMarks}</div>
                      <div className="text-xs text-gray-600 font-medium">Average Marks</div>
                    </div>
                    
                    <div className="space-y-3">
                      <Label className="text-sm font-medium">Upload JSON File</Label>
                      <Input
                        type="file"
                        accept=".json"
                        onChange={(e) => handleFileUpload(e, test.testNumber)}
                        className="cursor-pointer text-sm border-2 border-gray-300 focus:border-blue-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Button 
                        onClick={() => handleUploadQuestions(test.testNumber)}
                        className="bg-green-600 hover:bg-green-700 text-white text-sm"
                        size="sm"
                      >
                        <Upload className="h-4 w-4 mr-1" />
                        Upload Questions
                      </Button>
                      <Button 
                        onClick={() => handlePreviewTest(test.testNumber)}
                        variant="outline" 
                        className="border-blue-300 text-blue-600 hover:bg-blue-50 text-sm"
                        size="sm"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Preview Test
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <nav className="bg-white shadow-lg px-6 py-4 border-b-2 border-blue-200">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Book className="h-6 w-6 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-800">GATE Mock Test - Admin Dashboard</h1>
          </div>
          <Button onClick={handleLogout} variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">
            Logout
          </Button>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-80 p-6">
          <AdminSidebar 
            branches={branches}
            testStats={testStats}
            onBranchClick={handleBranchClick}
          />
        </div>

        {/* Main Content - Upload Section */}
        <div className="flex-1 p-6">
          <Card className="max-w-2xl mx-auto shadow-xl border-2 border-gray-200">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg">
              <CardTitle className="flex items-center space-x-2 text-2xl">
                <Upload className="h-6 w-6 text-green-600" />
                <span>Upload Question Paper</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-8">
              <div className="space-y-3">
                <Label htmlFor="branch" className="text-lg font-medium">Select Branch</Label>
                <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                  <SelectTrigger className="h-12 text-lg border-2 border-gray-300 focus:border-blue-500">
                    <SelectValue placeholder="Choose a branch" />
                  </SelectTrigger>
                  <SelectContent>
                    {branches.map((branch) => (
                      <SelectItem key={branch.value} value={branch.value} className="text-lg">
                        {branch.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label htmlFor="testNumber" className="text-lg font-medium">Mock Test Number</Label>
                <Select value={selectedTestNumber} onValueChange={setSelectedTestNumber}>
                  <SelectTrigger className="h-12 text-lg border-2 border-gray-300 focus:border-blue-500">
                    <SelectValue placeholder="Select test number" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                      <SelectItem key={num} value={num.toString()} className="text-lg">
                        Mock Test {num}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label htmlFor="jsonFile" className="text-lg font-medium">Upload JSON File</Label>
                <Input
                  id="jsonFile"
                  type="file"
                  accept=".json"
                  onChange={(e) => setJsonFile(e.target.files?.[0] || null)}
                  className="cursor-pointer h-12 text-lg border-2 border-gray-300 focus:border-blue-500"
                />
                {jsonFile && (
                  <p className="text-sm text-green-600 font-medium bg-green-50 p-2 rounded">
                    ✓ Selected: {jsonFile.name}
                  </p>
                )}
              </div>

              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h4 className="font-bold text-blue-800 mb-3 text-lg">JSON Format Requirements:</h4>
                <ul className="text-sm text-blue-700 space-y-2">
                  <li>• Array of question objects</li>
                  <li>• Each question must have: id, question, type, options (if applicable), correctAnswer</li>
                  <li>• Types: "single", "multiple", or "numerical"</li>
                  <li>• Optional: image field for question illustrations</li>
                  <li>• Section: "general" or "subjects" (10 questions each)</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;