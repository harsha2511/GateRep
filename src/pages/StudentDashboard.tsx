import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Book, LogOut, Upload, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const StudentDashboard = () => {
  const { branchId } = useParams();
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const mockTests = Array.from({ length: 6 }, (_, i) => i + 1);

  const handleMockTestClick = (testNumber: number) => {
    navigate(`/test/${branchId}/${testNumber}`);
  };

  const handleLogout = () => {
    navigate('/');
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setProfileImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-md px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Book className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-800">GATE Mock Test</h1>
          </Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-8 min-h-[calc(100vh-200px)]">
          {/* Left Side - Student Profile */}
          <div className="col-span-4">
            <Card className="p-6 h-full">
              <div className="text-center mb-6">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <Avatar className="w-24 h-24">
                    {profileImage ? (
                      <AvatarImage src={profileImage} />
                    ) : (
                      <AvatarFallback className="text-2xl bg-gray-200">
                        <User className="h-12 w-12" />
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <label className="absolute -bottom-2 -right-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 cursor-pointer transition-colors">
                    <Upload className="h-4 w-4" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
              
              <div className="space-y-3 text-left mb-8">
                <div>
                  <span className="font-semibold text-gray-800">Student name: </span>
                  <span className="text-gray-600">harsha</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-800">College name: </span>
                  <span className="text-gray-600">MSRIT</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-800">Branch: </span>
                  <span className="text-gray-600">Electrical & electronics engineering</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-800">Email: </span>
                  <span className="text-blue-600 underline">harshakumari1125@gmail.com</span>
                </div>
              </div>

              <div className="space-y-3 mb-8">
                <div>
                  <span className="font-semibold text-gray-800">Rank among college: </span>
                  <span className="text-gray-600">1</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-800">All India Rank: </span>
                  <span className="text-gray-600">1</span>
                </div>
              </div>

              <Button 
                onClick={handleLogout}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </Card>
          </div>

          {/* Right Side - Mock Tests */}
          <div className="col-span-8">
            <div className="grid grid-cols-1 gap-4">
              {mockTests.map((testNumber) => (
                <Card 
                  key={testNumber}
                  className="hover:shadow-lg transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-blue-200"
                  onClick={() => handleMockTestClick(testNumber)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-center">
                      <h3 className="text-xl font-semibold text-gray-800">Mock test {testNumber}</h3>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
