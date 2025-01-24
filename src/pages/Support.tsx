import React from 'react';
import { Coffee, Heart, Star } from 'lucide-react';

interface SupportProps {
  isDarkMode?: boolean;
}

const Support: React.FC<SupportProps> = ({ isDarkMode = false }) => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
          Support Our Project
        </h1>
        <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto mb-6`}>
          Help us keep Hex Image free and open source for everyone
        </p>
      </div>

      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-8 rounded-xl shadow-lg mb-8`}>
        <div className="flex flex-col items-center mb-6">
          <div className={`p-4 rounded-full ${isDarkMode ? 'bg-blue-900/20' : 'bg-blue-50'} mb-4`}>
            <Coffee className="h-8 w-8 text-blue-500" />
          </div>
          <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'} mb-4`}>
            Buy Us a Coffee
          </h2>
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-center max-w-xl mb-6`}>
            If you find Hex Image useful in your work or daily projects, consider supporting us with a small donation. Every contribution helps us maintain and improve the tool.
          </p>
        </div>

        <div className={`${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'} p-6 rounded-lg mb-8`}>
          <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'} mb-4 flex items-center`}>
            <Star className="h-5 w-5 text-yellow-500 mr-2" />
            What Your Support Enables:
          </h3>
          <ul className={`space-y-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            <li className="flex items-center">
              <Heart className="h-4 w-4 text-red-500 mr-2" />
              Keeping the tool free and accessible for everyone
            </li>
            <li className="flex items-center">
              <Heart className="h-4 w-4 text-red-500 mr-2" />
              Adding new features and improvements
            </li>
            <li className="flex items-center">
              <Heart className="h-4 w-4 text-red-500 mr-2" />
              Maintaining fast and reliable performance
            </li>
            <li className="flex items-center">
              <Heart className="h-4 w-4 text-red-500 mr-2" />
              Supporting open-source development
            </li>
          </ul>
        </div>

        <div className="text-center">
          <a
            href="https://ko-fi.com/heximage"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 rounded-lg bg-[#29abe0] hover:bg-[#228db8] transition-colors text-white font-semibold"
          >
            <Coffee className="h-5 w-5 mr-2" />
            Support on Ko-fi
          </a>
          <p className={`mt-4 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            All donations are processed securely through Ko-fi
          </p>
        </div>
      </div>

      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-lg text-center`}>
        <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
          Thank you for considering supporting our project. Your contribution, no matter the size, makes a real difference in helping us maintain and improve Hex Image.
        </p>
        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Hex Image will always remain free and open source ❤️
        </p>
      </div>
    </div>
  );
};

export default Support; 