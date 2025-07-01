import React, { useState } from 'react';
import { Mail, Smartphone, UserCheck, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card, CardContent } from '../ui/Card';

interface LoginFormProps {
  onLogin: (email: string, password: string) => Promise<void>;
  onSwitchToRegister: () => void;
  onForgotPassword: () => void;
  onGuestMode: () => void;
  isLoading?: boolean;
  error?: string;
  onBackToLanding?: () => void;
}

export function LoginForm({ 
  onLogin, 
  onSwitchToRegister, 
  onForgotPassword, 
  onGuestMode,
  isLoading = false,
  error = '',
  onBackToLanding
}: LoginFormProps) {
  const [loginMethod, setLoginMethod] = useState<'email' | 'mobile'>('email');
  const [formData, setFormData] = useState({
    email: '',
    mobile: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (loginMethod === 'email') {
      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    } else {
      if (!formData.mobile) {
        newErrors.mobile = 'Mobile number is required';
      } else if (!/^(\+260|0)[0-9]{9}$/.test(formData.mobile)) {
        newErrors.mobile = 'Please enter a valid Zambian mobile number';
      }
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setValidationErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      await onLogin(
        loginMethod === 'email' ? formData.email : formData.mobile,
        formData.password
      );
    } catch (error) {
      // Error is handled by parent component
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <Card className="shadow-2xl border-0">
      <CardContent className="space-y-6 p-8">
        {/* Demo Credentials Info */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-medium text-blue-900 mb-2">Demo Credentials</h3>
          <div className="text-sm text-blue-800 space-y-1">
            <p><strong>Email:</strong> john.mwansa@example.com</p>
            <p><strong>Password:</strong> Password123!</p>
            <p className="text-xs text-blue-600 mt-2">Or try creating a new account!</p>
          </div>
        </div>

        {/* Guest Mode Option */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <UserCheck className="h-5 w-5 text-green-600" />
              <div>
                <h3 className="font-medium text-green-900">Try Without Registration</h3>
                <p className="text-sm text-green-700">Explore the platform as a guest</p>
              </div>
            </div>
            <Button
              onClick={onGuestMode}
              variant="outline"
              size="sm"
              className="border-green-300 text-green-700 hover:bg-green-50"
              disabled={isLoading}
            >
              Guest Mode
            </Button>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-red-900">Sign In Failed</h4>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Login Method Toggle */}
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            type="button"
            onClick={() => setLoginMethod('email')}
            disabled={isLoading}
            className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              loginMethod === 'email'
                ? 'bg-white text-green-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Mail className="h-4 w-4 mr-2" />
            Email
          </button>
          <button
            type="button"
            onClick={() => setLoginMethod('mobile')}
            disabled={isLoading}
            className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              loginMethod === 'mobile'
                ? 'bg-white text-green-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Smartphone className="h-4 w-4 mr-2" />
            Mobile
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {loginMethod === 'email' ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                disabled={isLoading}
                className={`block w-full px-3 py-2 border rounded-lg shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                  validationErrors.email ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                }`}
              />
              {validationErrors.email && (
                <p className="text-sm text-red-600 mt-1">{validationErrors.email}</p>
              )}
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mobile Number
              </label>
              <input
                type="tel"
                placeholder="+260 XXX XXXXXX"
                value={formData.mobile}
                onChange={(e) => handleInputChange('mobile', e.target.value)}
                disabled={isLoading}
                className={`block w-full px-3 py-2 border rounded-lg shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                  validationErrors.mobile ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                }`}
              />
              {validationErrors.mobile && (
                <p className="text-sm text-red-600 mt-1">{validationErrors.mobile}</p>
              )}
              <p className="text-sm text-gray-500 mt-1">Format: +260XXXXXXXXX or 0XXXXXXXXX</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                disabled={isLoading}
                className={`block w-full px-3 py-2 pr-10 border rounded-lg shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                  validationErrors.password ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                }`}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
              </button>
            </div>
            {validationErrors.password && (
              <p className="text-sm text-red-600 mt-1">{validationErrors.password}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            size="lg"
            isLoading={isLoading}
            disabled={isLoading}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </Button>
        </form>

        <div className="text-center">
          <button
            type="button"
            onClick={onForgotPassword}
            disabled={isLoading}
            className="text-sm text-green-600 hover:text-green-700 font-medium transition-colors duration-200 disabled:opacity-50"
          >
            Forgot your password?
          </button>
        </div>

        <div className="text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={onSwitchToRegister}
            disabled={isLoading}
            className="text-green-600 hover:text-green-700 font-medium transition-colors duration-200 disabled:opacity-50"
          >
            Sign up here
          </button>
        </div>

        <div className="flex justify-center mt-4">
          <Button
            type="button"
            variant="ghost"
            className="text-green-600 hover:underline"
            onClick={() => (typeof onBackToLanding === 'function' ? onBackToLanding() : window.location.assign('/'))}
          >
            ← Back to Landing Page
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}