import React from 'react';
import { Link } from 'react-router-dom';
import { Book, ArrowLeft, Calendar, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const News = () => {
  const newsItems = [
    {
      id: 1,
      title: "GATE 2025 Registration Opens",
      date: "December 15, 2024",
      content: "The registration process for GATE 2025 has officially begun. Candidates can apply online through the official GATE website.",
      isImportant: true
    },
    {
      id: 2,
      title: "New Mock Test Series Released",
      date: "December 10, 2024",
      content: "We've released our latest series of GATE mock tests covering all engineering disciplines with updated question patterns.",
      isImportant: false
    },
    {
      id: 3,
      title: "GATE 2025 Exam Dates Announced",
      date: "December 5, 2024",
      content: "GATE 2025 examinations will be conducted on February 1, 2, 15 & 16, 2025. Plan your preparation accordingly.",
      isImportant: true
    },
    {
      id: 4,
      title: "Study Material Updates",
      date: "November 28, 2024",
      content: "Updated study materials and previous year questions are now available for all GATE subjects.",
      isImportant: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-md px-6 py-3">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Book className="h-6 w-6 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-800">GATE Mock Test - News</h1>
          </div>
          <Link to="/" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Latest News & Updates</h2>
          <p className="text-gray-600">Stay updated with the latest GATE examination news and announcements</p>
        </div>

        <div className="space-y-6">
          {newsItems.map((item) => (
            <Card key={item.id} className={`hover:shadow-lg transition-shadow ${item.isImportant ? 'border-l-4 border-l-red-500' : ''}`}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className={`text-xl ${item.isImportant ? 'text-red-700' : 'text-gray-800'}`}>
                    {item.title}
                    {item.isImportant && (
                      <span className="ml-2 px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                        Important
                      </span>
                    )}
                  </CardTitle>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    {item.date}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">{item.content}</p>
                <Button variant="outline" size="sm" className="flex items-center space-x-2">
                  <span>Read More</span>
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Stay Connected</h3>
              <p className="mb-6">Subscribe to our newsletter for the latest GATE updates and preparation tips</p>
              <Button className="bg-white text-blue-600 hover:bg-gray-100">
                Subscribe Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default News;