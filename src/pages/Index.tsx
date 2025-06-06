import React from 'react';
import { Link } from 'react-router-dom';
import { Book, Users, UserCheck, Clock, Target, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  return (
    <div className="h-screen bg-gray-100 flex flex-col">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm px-6 py-3">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Book className="h-6 w-6 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-800">GATE Mock Test</h1>
          </div>
          <div className="flex space-x-8 text-sm">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Home</Link>
            <Link to="/branches" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Branches</Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">About</Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Contact</Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 max-w-7xl mx-auto px-6 py-4 overflow-hidden">
        <div className="grid grid-cols-12 gap-4 h-full">
          {/* Left Side - GATE Preparation Card */}
          <div className="col-span-3">
            <Card className="bg-white shadow-lg h-full">
              <CardContent className="p-4 flex flex-col items-center text-center h-full">
                <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">GATE Preparation</h3>
                <p className="text-sm text-gray-600 mb-4 flex-grow">
                  Comprehensive mock tests designed to help you excel in GATE examinations.
                </p>

                {/* Placeholder for image */}
                <div className="w-24 h-24 mx-auto mb-3 border-2 border-gray-300 rounded-full flex items-center justify-center bg-gray-50">
                  <span className="text-gray-500 text-xs">image</span>
                </div>

                <h4 className="text-base font-semibold text-gray-800 mb-1">Kaushik</h4>
                <p className="text-xs text-gray-600 mb-3">Paragraph: Backend</p>

                <Link to="/about" className="mt-auto">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 text-sm">
                    View More
                  </Button>
                </Link>
                <div className="w-24 h-24 mx-auto mb-3 border-2 border-gray-300 rounded-full flex items-center justify-center bg-gray-50">
                  <span className="text-gray-500 text-xs">image</span>
                </div>

                <h4 className="text-base font-semibold text-gray-800 mb-1">Harsha</h4>
                <p className="text-xs text-gray-600 mb-3">Paragraph: Front end</p>

                <Link to="/about" className="mt-auto">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 text-sm">
                    View More
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Center - Login Options */}
          <div className="col-span-6">
            <div className="text-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Choose Your Login Type</h2>
              <p className="text-gray-600 text-sm">Select your role to access the appropriate dashboard</p>
            </div>

            {/* Student and Admin Login - Top Row */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              {/* Student Login */}
              <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-5 text-center">
                  <div className="w-12 h-12 mx-auto mb-3 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Student Login</h3>
                  <p className="text-sm text-gray-600 mb-4">Access mock tests and track progress</p>
                  <Link to="/student-login">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 text-sm">
                      Student Login
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Admin Login */}
              <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-5 text-center">
                  <div className="w-12 h-12 mx-auto mb-3 bg-red-100 rounded-full flex items-center justify-center">
                    <UserCheck className="h-6 w-6 text-red-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Admin Login</h3>
                  <p className="text-sm text-gray-600 mb-4">Manage tests and oversee performance</p>
                  <Link to="/admin-login">
                    <Button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 text-sm">
                      Admin Login
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            {/* Guest Login - Bottom Row */}
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow mb-4">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Book className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-gray-800">Guest Login</h3>
                      <p className="text-sm text-gray-600">Try mock tests without registration</p>
                    </div>
                  </div>
                  <Link to="/guest-login">
                    <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 text-sm">
                      Guest Access
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Features Section - Bottom */}
            <div className="grid grid-cols-3 gap-3">
              <Card className="bg-white shadow-sm text-center">
                <CardContent className="p-3">
                  <div className="w-8 h-8 mx-auto mb-2 bg-blue-100 rounded-full flex items-center justify-center">
                    <Clock className="h-4 w-4 text-blue-600" />
                  </div>
                  <h4 className="font-bold text-gray-800 mb-1 text-sm">Timed Tests</h4>
                  <p className="text-xs text-gray-600">180-minute mock tests that simulate real GATE exam conditions</p>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm text-center">
                <CardContent className="p-3">
                  <div className="w-8 h-8 mx-auto mb-2 bg-green-100 rounded-full flex items-center justify-center">
                    <Target className="h-4 w-4 text-green-600" />
                  </div>
                  <h4 className="font-bold text-gray-800 mb-1 text-sm">Instant Results</h4>
                  <p className="text-xs text-gray-600">Get detailed analysis with correct answers and explanations</p>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm text-center">
                <CardContent className="p-3">
                  <div className="w-8 h-8 mx-auto mb-2 bg-purple-100 rounded-full flex items-center justify-center">
                    <Award className="h-4 w-4 text-purple-600" />
                  </div>
                  <h4 className="font-bold text-gray-800 mb-1 text-sm">Rankings</h4>
                  <p className="text-xs text-gray-600">Compare your performance with peers across India</p>
                </CardContent>
              </Card>
            </div>
          </div>
          {/* Right Side - Buttons and Important News - Full Height */}
          <div className="col-span-3 flex flex-col">
            <div className="bg-white rounded-lg shadow-lg p-4 flex-1 flex flex-col min-h-full">
              <div className="flex flex-col space-y-2 mb-4">
                <a
                  href="https://gate2025.iitr.ac.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" className="w-full justify-start hover:bg-gray-50 py-2 text-sm">
                    <Clock className="h-4 w-4 mr-2" />
                    Gate Browser
                  </Button>
                </a>
                <a
                  href="https://gate2025.iitr.ac.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" className="w-full justify-start hover:bg-gray-50 py-2 text-sm">
                    <Clock className="h-4 w-4 mr-2" />
                    Gate PYQ
                  </Button>
                </a>
                <a
                  href="https://gate2025.iitr.ac.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" className="w-full justify-start hover:bg-gray-50 py-2 text-sm">
                    <Clock className="h-4 w-4 mr-2" />
                    Gate Syllabus
                  </Button>
                </a>
              </div>

              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-4 rounded-lg text-center flex-1 flex flex-col justify-center mt-auto">
                <div className="w-12 h-12 mx-auto mb-3 bg-white/20 rounded-full flex items-center justify-center">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-sm font-semibold mb-2">Important News</h3>
                <p className="text-xs mb-3 opacity-90">GATE 2025 - Prepare with confidence using our comprehensive test series</p>
                <Button variant="secondary" className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30 text-sm">
                  View Details
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-2 relative z-10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm">&copy; 2024 GATE Mock Test. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
