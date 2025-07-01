import React, { useState } from 'react';
import { Mail, Smartphone, ArrowLeft, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card, CardContent } from '../ui/Card';

interface ForgotPasswordFormProps {
  onResetPassword: (identifier: string) => Promise<void>;
  onBackToLogin: () => void;
  isLoading?: boolean;
  error?: string;
  onBackToLanding?: () => void;
}

export function ForgotPasswordForm({ 
  onResetPassword, 
  onBackToLogin,
  isLoading = false,
  error = '',
  onBackToLanding
}: ForgotPasswordFormProps) {
  const [resetMethod, setResetMethod] = useState<'email' | 'mobile'>('email');
  const [formData, setFormData] = useState({
    email: '',
    mobile: ''
  });
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (resetMethod === 'email') {
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
    
    setValidationErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      await onResetPassword(
        resetMethod === 'email' ? formData.email : formData.mobile
      );
      setIsSuccess(true);
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

  if (isSuccess) {
    return (
      <Card className="shadow-2xl border-0">
        <CardContent className="text-center space-y-6 p-8">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Reset Instructions Sent
            </h3>
            <p className="text-gray-600">
              We've sent password reset instructions to your {resetMethod}. 
              Please check and follow the instructions to reset your password.
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">What's Next?</h4>
            <ul className="text-sm text-blue-800 space-y-1 text-left">
              <li>• Check your {resetMethod === 'email' ? 'email inbox' : 'SMS messages'}</li>
              <li>• Look for a message from SomaSmart EduHub</li>
              <li>• Click the reset link or follow the instructions</li>
              <li>• Create a new secure password</li>
            </ul>
          </div>

          <Button onClick={onBackToLogin} variant="outline" className="w-full">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Login
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-2xl border-0">
      <CardContent className="space-y-6 p-8">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Reset Your Password
          </h3>
          <p className="text-gray-600 text-sm">
            Enter your email or mobile number and we'll send you instructions to reset your password.
          </p>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-red-900">Reset Failed</h4>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Reset Method Toggle */}
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            type="button"
            onClick={() => setResetMethod('email')}
            disabled={isLoading}
            className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              resetMethod === 'email'
                ? 'bg-white text-green-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Mail className="h-4 w-4 mr-2" />
            Email
          </button>
          <button
            type="button"
            onClick={() => setResetMethod('mobile')}
            disabled={isLoading}
            className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              resetMethod === 'mobile'
                ? 'bg-white text-green-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Smartphone className="h-4 w-4 mr-2" />
            Mobile
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {resetMethod === 'email' ? (
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

          <Button
            type="submit"
            className="w-full"
            size="lg"
            isLoading={isLoading}
            disabled={isLoading}
          >
            {isLoading ? 'Sending Instructions...' : 'Send Reset Instructions'}
          </Button>
        </form>

        <Button onClick={onBackToLogin} variant="ghost" className="w-full" disabled={isLoading}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Login
        </Button>

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