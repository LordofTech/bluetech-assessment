import React, { useState } from 'react';
import { CheckCircle, ArrowRight, ArrowLeft, X } from 'lucide-react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

// Main Onboarding Modal Component
const OnboardingModal = () => {
  // State to track which step we're currently on (1, 2, or 3)
  const [currentStep, setCurrentStep] = useState(1);
  
  // State to control if the modal is open or closed
  const [isOpen, setIsOpen] = useState(false);
  
  // State to store all form data from all steps
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    username: '',
    password: '',
    theme: '',
    newsletter: false
  });

  // State to store validation errors
  const [errors, setErrors] = useState({});

  // Function to update form data - takes a field name and new value
  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  // Validation functions for each step
  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      // Step 1: Personal Info validation
      if (!formData.fullName.trim()) {
        newErrors.fullName = 'Full name is required';
      }
      
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }
    
    if (step === 2) {
      // Step 2: Account Setup validation
      if (!formData.username.trim()) {
        newErrors.username = 'Username is required';
      } else if (formData.username.length < 3) {
        newErrors.username = 'Username must be at least 3 characters';
      }
      
      if (!formData.password.trim()) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      }
    }
    
    if (step === 3) {
      // Step 3: Preferences validation
      if (!formData.theme) {
        newErrors.theme = 'Please select a theme';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Function to go to the next step (with validation)
  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 3) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  // Function to go back to the previous step
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setErrors({}); // Clear errors when going back
    }
  };

  // Function to handle form submission (final step)
  const handleSubmit = () => {
    if (validateStep(3)) {
      // Here you would typically send data to your backend
      console.log('Form submitted with data:', formData);
      alert('Onboarding completed successfully! Check console for submitted data.');
      setIsOpen(false);
      setCurrentStep(1); // Reset to first step for next time
      setErrors({}); // Clear all errors
      // Reset form data if needed
      setFormData({
        fullName: '',
        email: '',
        username: '',
        password: '',
        theme: '',
        newsletter: false
      });
    }
  };

  // Function to close the modal
  const closeModal = () => {
    setIsOpen(false);
    setCurrentStep(1); // Reset to first step when closing
    setErrors({}); // Clear all errors
  };

  // Function to render the current step component
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 formData={formData} updateFormData={updateFormData} errors={errors} />;
      case 2:
        return <Step2 formData={formData} updateFormData={updateFormData} errors={errors} />;
      case 3:
        return <Step3 formData={formData} updateFormData={updateFormData} errors={errors} />;
      default:
        return <Step1 formData={formData} updateFormData={updateFormData} errors={errors} />;
    }
  };

  // Function to handle tab navigation (bonus feature)
  const goToStep = (step) => {
    // Only allow going to previous steps or current step
    if (step <= currentStep) {
      setCurrentStep(step);
      setErrors({}); // Clear errors when switching tabs
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      {/* Button to open the modal */}
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
      >
        Start Onboarding Process
      </button>

      {/* Modal Overlay - only shows when isOpen is true */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in">
          {/* Modal Container */}
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[95vh] overflow-hidden animate-slide-up">
            {/* Modal Header with tabs and close button */}
            <div className="p-6 border-b border-gray-200 bg-gray-50">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl font-bold text-gray-900">Account Setup</h1>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              {/* Tab Navigation */}
              <div className="flex space-x-1 bg-gray-200 p-1 rounded-lg">
                {[
                  { num: 1, label: 'Personal' },
                  { num: 2, label: 'Account' },
                  { num: 3, label: 'Preferences' }
                ].map((tab) => (
                  <button
                    key={tab.num}
                    onClick={() => goToStep(tab.num)}
                    disabled={tab.num > currentStep}
                    className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all duration-200 ${
                      currentStep === tab.num
                        ? 'bg-white text-blue-600 shadow-sm'
                        : tab.num < currentStep
                          ? 'text-green-600 hover:bg-gray-100 cursor-pointer'
                          : 'text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <span className="flex items-center justify-center space-x-1">
                      {tab.num < currentStep && <CheckCircle className="h-4 w-4" />}
                      <span>Step {tab.num}: {tab.label}</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Modal Body - renders the current step */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {renderCurrentStep()}
            </div>

            {/* Modal Footer with navigation buttons */}
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex justify-between">
                {/* Back Button - only show if not on first step */}
                <button
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  className={`flex items-center px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                    currentStep === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300 transform hover:scale-105'
                  }`}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </button>

                {/* Next/Submit Button */}
                {currentStep < 3 ? (
                  <button
                    onClick={handleNext}
                    className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 shadow-md"
                  >
                    Next
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="flex items-center px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-all duration-200 transform hover:scale-105 shadow-md"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Complete Setup
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OnboardingModal;