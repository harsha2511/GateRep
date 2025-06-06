import React from 'react';
import { Link } from 'react-router-dom';
import { Book, ArrowLeft, Target, Users, Award, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-md px-6 py-3">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Book className="h-6 w-6 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-800">GATE Mock Test - About Us</h1>
          </div>
          <Link to="/" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">About GATE Mock Test Platform</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your comprehensive preparation partner for GATE examinations, designed to help engineering aspirants achieve their dreams.
          </p>
        </div>

        {/* Mission Section */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                To provide high-quality, comprehensive mock tests that accurately simulate the GATE examination environment, 
                helping students assess their preparation level and improve their performance through detailed analytics and feedback.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="w-12 h-12 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Timed Practice</h4>
              <p className="text-sm text-gray-600">Real exam conditions with 180-minute time limits</p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="w-12 h-12 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <Target className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Instant Results</h4>
              <p className="text-sm text-gray-600">Detailed analysis and performance insights</p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="w-12 h-12 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                <Award className="h-6 w-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">All Branches</h4>
              <p className="text-sm text-gray-600">Coverage for all GATE engineering disciplines</p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="w-12 h-12 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Rankings</h4>
              <p className="text-sm text-gray-600">Compare with peers across India</p>
            </CardContent>
          </Card>
        </div>

        {/* Why Choose Us */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Why Choose Our Platform?</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-lg text-gray-800 mb-3">Comprehensive Coverage</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• All GATE subjects and topics</li>
                  <li>• Updated question patterns</li>
                  <li>• Previous year questions analysis</li>
                  <li>• Subject-wise mock tests</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-lg text-gray-800 mb-3">Advanced Features</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Detailed performance analytics</li>
                  <li>• Weakness identification</li>
                  <li>• Progress tracking</li>
                  <li>• Personalized recommendations</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-center mb-8">Our Impact</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold mb-2">50,000+</div>
                <div className="text-blue-100">Students Trained</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">1,000+</div>
                <div className="text-blue-100">Mock Tests Available</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">95%</div>
                <div className="text-blue-100">Success Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Ready to Start Your GATE Preparation?</h3>
          <p className="text-gray-600 mb-6">Join thousands of successful GATE aspirants who chose our platform</p>
          <Link to="/">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg">
              Get Started Today
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;