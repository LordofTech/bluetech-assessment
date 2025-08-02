import React from 'react';
import { Settings } from 'lucide-react';

// Step 3 Component: Preferences
const Step3 = ({ formData, updateFormData, errors }) => {
  return (
    <div className="space-y-6">
      {/* Header with icon and title */}
      <div className="text-center">
        <Settings className="mx-auto h-12 w-12 text-blue-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Set Your Preferences</h2>
        <p className="text-gray-600">Customize your experience</p>
      </div>
      
      {/* Form fields */}
      <div className="space-y-4">
        <div>
          <label htmlFor="theme" className="block text-sm font-medium text-gray-700 mb-1">
            Theme Selection *
          </label>
          <select
            id="theme"
            value={formData.theme}
            onChange={(e) => updateFormData('theme', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.theme ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select your theme</option>
            <option value="Light">Light</option>
            <option value="Dark">Dark</option>
          </select>
          {errors.theme && (
            <p className="text-red-500 text-sm mt-1">{errors.theme}</p>
          )}
        </div>
        
        {/* Newsletter checkbox */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="newsletter"
            checked={formData.newsletter}
            onChange={(e) => updateFormData('newsletter', e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="newsletter" className="ml-2 block text-sm text-gray-700">
            Subscribe to newsletter for updates
          </label>
        </div>
      </div>
    </div>
  );
};

export default Step3;