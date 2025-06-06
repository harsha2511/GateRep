
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Book, Upload, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const AdminBranchManagement = () => {
  const { branchName } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [mockTestNumber, setMockTestNumber] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [selectedMockTest, setSelectedMockTest] = useState<number | null>(null);
  const [showMockTestGrid, setShowMockTestGrid] = useState(false);

  useEffect(() => {
    // Check if admin is logged in
    const adminLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!adminLoggedIn) {
      navigate('/admin-login');
    }
  }, [navigate]);

  // Mock data for demonstration
  const branches = [
    'Computer Science',
    'Electrical Engineering', 
    'Electronics Communication',
    'Mechanical',
    'Civil'
  ];

  const mockTests = Array.from({ length: 9 }, (_, i) => ({
    number: i + 1,
    attempted: Math.floor(Math.random() * 100) + 1,
    maxScore: Math.floor(Math.random() * 100) + 60,
    hasQuestions: Math.random() > 0.5,
    maxScoreStudent: `Student${Math.floor(Math.random() * 100) + 1}`
  }));

  // Mock student data for selected test
  const studentData = [
    { name: "John Doe", marks: 85 },
    { name: "Jane Smith", marks: 92 },
    { name: "Mike Johnson", marks: 78 },
    { name: "Sarah Wilson", marks: 88 }
  ];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === 'application/json') {
        setSelectedFile(file);
      } else {
        toast({
          title: "Error",
          description: "Please select a JSON file",
          variant: "destructive"
        });
      }
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !mockTestNumber) {
      toast({
        title: "Error",
        description: "Please select a file and mock test number",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);
    try {
      // Simulate upload process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Store the uploaded file info in localStorage for demo
      const uploadKey = `${branchName}_test_${mockTestNumber}`;
      localStorage.setItem(uploadKey, 'uploaded');
      
      toast({
        title: "Success",
        description: `Questions uploaded for Mock Test ${mockTestNumber}`,
      });
      
      setSelectedFile(null);
      setMockTestNumber('');
      
      // Reset file input
      const fileInput = document.getElementById('file-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Upload failed. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handlePreview = (testNumber: number) => {
    // Store current context for return navigation
    localStorage.setItem('adminReturnContext', JSON.stringify({
      branch: branchName,
      testNumber: testNumber
    }));
    
    navigate(`/test/${encodeURIComponent(branchName!)}/${testNumber}?preview=true`);
  };

  const handleBranchClick = (branch: string) => {
    navigate(`/admin/branch/${encodeURIComponent(branch)}`);
    setShowMockTestGrid(true);
  };

  const handleMockTestClick = (testNumber: number) => {
    setSelectedMockTest(testNumber);
    setShowMockTestGrid(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm px-6 py-4 border-b">
        <div className="max-w-full mx-auto flex justify-between items-center">
          <div className="flex items-center justify-center flex-1">
            <h1 className="text-xl font-medium text-gray-800">Nav bar</h1>
          </div>
          <Button 
            onClick={() => navigate('/admin-dashboard')} 
            variant="outline" 
            className="px-6"
          >
            logout
          </Button>
        </div>
      </nav>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Sidebar */}
        <div className="w-80 bg-blue-100 p-4 border-r-2 border-blue-300">
          {/* Branches */}
          <div className="space-y-3">
            {branches.map((branch) => (
              <Button
                key={branch}
                variant={branch === branchName ? "default" : "outline"}
                className="w-full h-12 text-left justify-center bg-blue-200 hover:bg-blue-300 border-gray-400"
                onClick={() => handleBranchClick(branch)}
              >
                {branch}
              </Button>
            ))}
          </div>

          {/* Mock Tests for Selected Branch - Only show if not in grid mode */}
          {branchName && !showMockTestGrid && (
            <div className="mt-6 space-y-3">
              {mockTests.slice(0, 5).map((test) => (
                <Button
                  key={test.number}
                  variant={selectedMockTest === test.number ? "default" : "outline"}
                  className="w-full h-12 text-left justify-center bg-blue-200 hover:bg-blue-300 border-gray-400"
                  onClick={() => handleMockTestClick(test.number)}
                >
                  Mock test {test.number}
                </Button>
              ))}
            </div>
          )}
        </div>

        {/* Main Content Area */}
        <div className="flex-1 bg-blue-50">
          {showMockTestGrid && branchName ? (
            // Mock Test Grid View (Image 2)
            <div className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-medium bg-blue-200 py-4 border border-gray-400">
                  {branchName}
                </h2>
              </div>
              
              <div className="grid grid-cols-3 gap-6 max-w-4xl mx-auto">
                {mockTests.map((test) => (
                  <Button
                    key={test.number}
                    variant="outline"
                    className="h-24 text-lg bg-blue-200 hover:bg-blue-300 border-gray-400"
                    onClick={() => handleMockTestClick(test.number)}
                  >
                    Mock test {test.number}
                  </Button>
                ))}
              </div>
            </div>
          ) : (
            // Upload Section and Statistics (Image 1)
            <div className="p-8">
              {/* Upload Section */}
              <div className="bg-blue-100 p-6 border border-gray-400 mb-8">
                <h3 className="text-xl font-medium text-center mb-6">Upload here</h3>
                
                <div className="space-y-4 max-w-md mx-auto">
                  <div>
                    <Label htmlFor="mock-test-number">Mock Test Number</Label>
                    <Input
                      id="mock-test-number"
                      type="number"
                      min="1"
                      max="9"
                      placeholder="Enter test number (1-9)"
                      value={mockTestNumber}
                      onChange={(e) => setMockTestNumber(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="file-upload">JSON Question File</Label>
                    <Input
                      id="file-upload"
                      type="file"
                      accept=".json"
                      onChange={handleFileSelect}
                      className="mt-1"
                    />
                    {selectedFile && (
                      <p className="text-sm text-green-600 mt-1">
                        Selected: {selectedFile.name}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex space-x-4 pt-4">
                    <Button
                      onClick={() => selectedMockTest && handlePreview(selectedMockTest)}
                      variant="outline"
                      disabled={!selectedMockTest}
                      className="flex-1 bg-blue-200 hover:bg-blue-300"
                    >
                      Preview
                    </Button>
                    <Button
                      onClick={handleUpload}
                      disabled={!selectedFile || !mockTestNumber || isUploading}
                      className="flex-1 bg-blue-200 hover:bg-blue-300"
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              </div>

              {/* Statistics Section */}
              {selectedMockTest && (
                <div className="bg-blue-100 p-6 border border-gray-400">
                  <div className="space-y-4">
                    <div className="text-lg">
                      <span className="font-medium">No of students attempted:- </span>
                      <span>{mockTests[selectedMockTest - 1]?.attempted}</span>
                    </div>
                    
                    <div className="flex justify-between text-lg">
                      <span><span className="font-medium">Total</span></span>
                      <span><span className="font-medium">marks:- </span>100</span>
                    </div>
                    
                    <div className="text-lg">
                      <span className="font-medium">Maximum marks Score:- </span>
                      <span>{mockTests[selectedMockTest - 1]?.maxScore} marks</span>
                    </div>
                    
                    <div className="mt-6">
                      <Table className="border border-gray-400">
                        <TableHeader>
                          <TableRow className="bg-blue-200">
                            <TableHead className="border border-gray-400 text-center font-medium text-black">Student name</TableHead>
                            <TableHead className="border border-gray-400 text-center font-medium text-black">Marks scored</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {studentData.map((student, index) => (
                            <TableRow key={index} className="bg-white">
                              <TableCell className="border border-gray-400 text-center">{student.name}</TableCell>
                              <TableCell className="border border-gray-400 text-center">{student.marks}</TableCell>
                            </TableRow>
                          ))}
                          <TableRow className="bg-white">
                            <TableCell colSpan={2} className="border border-gray-400 text-center">
                              <Button variant="outline" size="sm" className="bg-blue-200 hover:bg-blue-300">
                                View Profile
                              </Button>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminBranchManagement;