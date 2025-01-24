import React from 'react';
import { Lock, Eye, Server, Cookie, Bell } from 'lucide-react';

interface PrivacyProps {
  isDarkMode?: boolean;
}

const Privacy: React.FC<PrivacyProps> = ({ isDarkMode = false }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
          Privacy Policy
        </h1>
        <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
          Your privacy is important to us. This policy outlines how we handle your data.
        </p>
      </div>

      <div className="space-y-8">
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
              <Lock className="h-6 w-6 text-blue-500" />
            </div>
            <h2 className={`text-2xl font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              Data Collection
            </h2>
          </div>
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
              We do not collect or store any personal information. All image processing is done locally in your browser.
            </p>
            <ul className={`list-disc pl-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} space-y-2`}>
              <li>Your images are never uploaded to any server</li>
              <li>No personal data is collected or tracked</li>
              <li>No cookies are used for tracking purposes</li>
            </ul>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-purple-900/20' : 'bg-purple-50'}`}>
              <Server className="h-6 w-6 text-purple-500" />
            </div>
            <h2 className={`text-2xl font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              Data Storage
            </h2>
          </div>
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
              All processing is done client-side, meaning:
            </p>
            <ul className={`list-disc pl-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} space-y-2`}>
              <li>Your data never leaves your device</li>
              <li>No server-side storage of images or color data</li>
              <li>No user accounts or profiles are created</li>
            </ul>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-green-900/20' : 'bg-green-50'}`}>
              <Cookie className="h-6 w-6 text-green-500" />
            </div>
            <h2 className={`text-2xl font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              Cookies & Local Storage
            </h2>
          </div>
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
              We use minimal local storage for:
            </p>
            <ul className={`list-disc pl-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} space-y-2`}>
              <li>Remembering your dark/light mode preference</li>
              <li>No third-party cookies are used</li>
              <li>No tracking or analytics cookies</li>
            </ul>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-yellow-900/20' : 'bg-yellow-50'}`}>
              <Eye className="h-6 w-6 text-yellow-500" />
            </div>
            <h2 className={`text-2xl font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              Your Rights
            </h2>
          </div>
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
              Since we don't collect any personal data, you don't need to worry about:
            </p>
            <ul className={`list-disc pl-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} space-y-2`}>
              <li>Requesting data deletion</li>
              <li>Accessing stored personal information</li>
              <li>Data portability</li>
            </ul>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-red-900/20' : 'bg-red-50'}`}>
              <Bell className="h-6 w-6 text-red-500" />
            </div>
            <h2 className={`text-2xl font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              Updates to This Policy
            </h2>
          </div>
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
              We may update this privacy policy from time to time. We will notify you of any changes by:
            </p>
            <ul className={`list-disc pl-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} space-y-2`}>
              <li>Posting the new policy on this page</li>
              <li>Updating the "last updated" date at the top of this policy</li>
              <li>Providing a notice on our homepage</li>
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

export default Privacy; 