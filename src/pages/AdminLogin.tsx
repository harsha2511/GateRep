import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Book, ArrowLeft, Shield, Lock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate admin authentication
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check credentials
      if (username === 'harshakumari1125@gmail.com' && password === 'Harsha@123') {
        toast({
          title: "Success",
          description: "Admin login successful!"
        });
        
        // Store admin session
        localStorage.setItem('adminLoggedIn', 'true');
        navigate('/admin-dashboard');
      } else {
        toast({
          title: "Error",
          description: "Invalid admin credentials",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Login failed. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-lg px-6 py-4 border-b-2 border-blue-200">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Book className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-800">GATE Mock Test - Admin Panel</h1>
          </Link>
          <Link to="/" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </nav>

      <div className="flex items-center justify-center py-16 px-4">
        <Card className="w-full max-w-lg shadow-2xl">
          <CardHeader className="text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
            <div className="w-20 h-20 mx-auto mb-4 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <Shield className="h-10 w-10 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold">Admin Login</CardTitle>
            <p className="text-blue-100 mt-2">Administrative Access Portal</p>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-lg font-medium">Admin Email</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="username"
                    type="email"
                    placeholder="Enter admin email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-12 h-12 text-lg border-2 border-gray-300 focus:border-blue-500"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-lg font-medium">Admin Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter admin password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-12 h-12 text-lg border-2 border-gray-300 focus:border-blue-500"
                    required
                  />
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full h-12 text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg"
                disabled={isLoading}
              >
                {isLoading ? "Signing In..." : "Admin Login"}
              </Button>
            </form>
            
            <div className="mt-8 text-center">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 font-medium mb-2">Demo Credentials:</p>
                <p className="text-xs text-gray-500">Email: harshakumari1125@gmail.com</p>
                <p className="text-xs text-gray-500">Password: Harsha@123</p>
              </div>
              <div className="mt-6 pt-4 border-t">
                <p className="text-sm text-gray-600">
                  Student Login?{' '}
                  <Link to="/student-login" className="text-blue-600 hover:underline font-medium">
                    Click here
                  </Link>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin;