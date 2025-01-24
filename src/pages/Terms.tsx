import React from 'react';
import { FileText, Scale, Shield, AlertCircle, Ban, HelpCircle } from 'lucide-react';

interface TermsProps {
  isDarkMode?: boolean;
}

const Terms: React.FC<TermsProps> = ({ isDarkMode = false }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
          Terms of Service
        </h1>
        <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
          Please read these terms carefully before using our service.
        </p>
      </div>

      <div className="space-y-8">
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
              <FileText className="h-6 w-6 text-blue-500" />
            </div>
            <h2 className={`text-2xl font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              Agreement to Terms
            </h2>
          </div>
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
              By accessing or using Hex Image, you agree to be bound by these Terms of Service and all applicable laws and regulations.
            </p>
            <ul className={`list-disc pl-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} space-y-2`}>
              <li>You must be at least 13 years old to use this service</li>
              <li>You agree to use the service for lawful purposes only</li>
              <li>You accept our Privacy Policy and Cookie Policy</li>
            </ul>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-purple-900/20' : 'bg-purple-50'}`}>
              <Scale className="h-6 w-6 text-purple-500" />
            </div>
            <h2 className={`text-2xl font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              Intellectual Property
            </h2>
          </div>
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
              The service and its original content, features, and functionality are owned by Hex Image and are protected by:
            </p>
            <ul className={`list-disc pl-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} space-y-2`}>
              <li>International copyright laws</li>
              <li>Trademark laws</li>
              <li>Other intellectual property rights</li>
            </ul>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-green-900/20' : 'bg-green-50'}`}>
              <Shield className="h-6 w-6 text-green-500" />
            </div>
            <h2 className={`text-2xl font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              User Responsibilities
            </h2>
          </div>
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
              When using our service, you agree to:
            </p>
            <ul className={`list-disc pl-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} space-y-2`}>
              <li>Not violate any laws or regulations</li>
              <li>Not infringe on others' intellectual property rights</li>
              <li>Not upload malicious content or files</li>
              <li>Not attempt to breach or test our security measures</li>
            </ul>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-yellow-900/20' : 'bg-yellow-50'}`}>
              <AlertCircle className="h-6 w-6 text-yellow-500" />
            </div>
            <h2 className={`text-2xl font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              Disclaimer
            </h2>
          </div>
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
              Our service is provided "as is" without any warranties:
            </p>
            <ul className={`list-disc pl-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} space-y-2`}>
              <li>We don't guarantee uninterrupted or error-free service</li>
              <li>We're not responsible for any processing errors</li>
              <li>Results may vary based on your device and browser</li>
            </ul>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-red-900/20' : 'bg-red-50'}`}>
              <Ban className="h-6 w-6 text-red-500" />
            </div>
            <h2 className={`text-2xl font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              Limitation of Liability
            </h2>
          </div>
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
              We shall not be liable for:
            </p>
            <ul className={`list-disc pl-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} space-y-2`}>
              <li>Any indirect, incidental, or consequential damages</li>
              <li>Loss of data or privacy breaches during transmission</li>
              <li>Any business losses or lost profits</li>
            </ul>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-indigo-900/20' : 'bg-indigo-50'}`}>
              <HelpCircle className="h-6 w-6 text-indigo-500" />
            </div>
            <h2 className={`text-2xl font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              Changes to Terms
            </h2>
          </div>
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
              We reserve the right to modify these terms at any time:
            </p>
            <ul className={`list-disc pl-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} space-y-2`}>
              <li>Changes will be effective immediately upon posting</li>
              <li>Continued use constitutes acceptance of changes</li>
              <li>Major changes will be notified via our homepage</li>
            </ul>
          </div>
        </section>

        <div className={`mt-8 text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-sm`}>
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default Terms; 