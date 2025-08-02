import React from 'react';
import { Lock } from 'lucide-react';

// Step 2 Component: Account Setup
const Step2 = ({ formData, updateFormData, errors }) => {
  return (
    <div className="space-y-6">
      {/* Header with icon and title */}
      <div className="text-center">
        <Lock className="mx-auto h-12 w-12 text-blue-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Account Setup</h2>
        <p className="text-gray-600">Create your account credentials</p>
      </div>
      
      {/* Form fields */}
      <div className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
            Username *
          </label>
          <input
            type="text"
            id="username"
            value={formData.username}
            onChange={(e) => updateFormData('username', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.username ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your username"
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">{errors.username}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password *
          </label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={(e) => updateFormData('password', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Step2;