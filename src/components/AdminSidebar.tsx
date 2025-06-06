import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface TestStats {
  testNumber: number;
  studentsAttempted: number;
  maxMarks: number;
  averageMarks: number;
  uploaded: boolean;
}

interface Branch {
  value: string;
  label: string;
}

interface AdminSidebarProps {
  branches: Branch[];
  testStats: Record<string, TestStats[]>;
  onBranchClick: (branchValue: string) => void;
}

const AdminSidebar = ({ branches, testStats, onBranchClick }: AdminSidebarProps) => {
  return (
    <Card className="shadow-lg border-2 border-gray-200">
      <CardContent className="p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4 text-center bg-purple-100 py-2 rounded border border-purple-300">
          📁 Branch Management
        </h3>
        <div className="space-y-3">
          {branches.map((branch) => {
            const branchStats = testStats[branch.value] || [];
            const uploadedTests = branchStats.filter(test => test.uploaded).length;
            const totalTests = branchStats.length;
            
            return (
              <Button
                key={branch.value}
                onClick={() => onBranchClick(branch.value)}
                variant="outline"
                className="w-full h-auto p-4 border-2 border-gray-300 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
              >
                <div className="w-full">
                  <div className="font-medium text-gray-800 mb-1">{branch.label}</div>
                  <div className="text-xs text-blue-600 font-medium">
                    {uploadedTests} of {totalTests} tests uploaded
                  </div>
                </div>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminSidebar;