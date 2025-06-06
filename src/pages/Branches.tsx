
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Book, ArrowLeft, Cpu, Zap, Cog, Building, Wrench, FlaskConical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const branches = [
  {
    id: 'cs',
    name: 'Computer Science',
    code: 'CS',
    icon: Cpu,
    color: 'bg-blue-500',
    description: 'Data Structures, Algorithms, Database Systems, Computer Networks'
  },
  {
    id: 'ch',
    name: 'Chemical Engineering',
    code: 'CH',
    icon: FlaskConical,
    color: 'bg-red-500',
    description: 'Mass Transfer, Heat Transfer, Reaction Engineering'
  },
  {
    id: 'ce',
    name: 'Civil Engineering',
    code: 'CE',
    icon: Building,
    color: 'bg-orange-500',
    description: 'Structural Engineering, Geotechnical, Transportation'
  },
  {
    id: 'ee',
    name: 'Electrical Engineering',
    code: 'EE',
    icon: Zap,
    color: 'bg-yellow-500',
    description: 'Power Systems, Control Systems, Electric Machines'
  },
  {
    id: 'ece',
    name: 'Electronics & Communication',
    code: 'ECE',
    icon: Zap,
    color: 'bg-purple-500',
    description: 'Digital Electronics, Signal Processing, Communication Systems'
  },
  {
    id: 'me',
    name: 'Mechanical Engineering',
    code: 'ME',
    icon: Cog,
    color: 'bg-green-500',
    description: 'Thermodynamics, Fluid Mechanics, Machine Design'
  }
];

const Branches = () => {
  const navigate = useNavigate();

  const handleBranchSelect = (branchId: string) => {
    navigate(`/dashboard/${branchId}`);
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
          <Link to="/" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Select Your Branch</h2>
          <p className="text-gray-600 text-lg">Choose your engineering discipline to access relevant mock tests</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {branches.map((branch) => {
            const IconComponent = branch.icon;
            return (
              <Card 
                key={branch.id} 
                className="hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-blue-200 group"
                onClick={() => handleBranchSelect(branch.id)}
              >
                <CardContent className="p-8 text-center">
                  <div className={`w-20 h-20 mx-auto mb-6 ${branch.color} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{branch.name}</h3>
                  <div className="text-sm font-semibold text-gray-500 mb-4">({branch.code})</div>
                  <p className="text-gray-600 mb-6">{branch.description}</p>
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700 group-hover:bg-blue-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBranchSelect(branch.id);
                    }}
                  >
                    Select Branch
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Branches;
