import React from 'react';
import { Palette, Heart, Users, Code, Globe, Award } from 'lucide-react';

interface AboutUsProps {
  isDarkMode?: boolean;
}

const AboutUs: React.FC<AboutUsProps> = ({ isDarkMode = false }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
          About Hex Image
        </h1>
        <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
          Empowering creators with powerful color extraction tools since 2024
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-lg`}>
          <div className="flex items-center mb-4">
            <Palette className="h-6 w-6 text-blue-500 mr-3" />
            <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>Our Mission</h2>
          </div>
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            To provide designers, developers, and artists with the most intuitive and powerful color extraction tools, making color discovery and palette creation effortless and enjoyable.
          </p>
        </div>

        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-lg`}>
          <div className="flex items-center mb-4">
            <Heart className="h-6 w-6 text-red-500 mr-3" />
            <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>Our Values</h2>
          </div>
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            We believe in user privacy, open-source collaboration, and creating tools that inspire creativity while maintaining simplicity and efficiency.
          </p>
        </div>
      </div>

      <div className="space-y-12 mb-16">
        <h2 className={`text-3xl font-bold text-center mb-8 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>Why Choose Hex Image?</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className={`${isDarkMode ? 'bg-blue-900/20' : 'bg-blue-50'} p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center`}>
              <Globe className="h-8 w-8 text-blue-500" />
            </div>
            <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>Privacy First</h3>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              All image processing happens locally in your browser. Your images never leave your device.
            </p>
          </div>

          <div className="text-center">
            <div className={`${isDarkMode ? 'bg-purple-900/20' : 'bg-purple-50'} p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center`}>
              <Code className="h-8 w-8 text-purple-500" />
            </div>
            <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>Advanced Technology</h3>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Powered by cutting-edge color extraction algorithms for accurate and reliable results.
            </p>
          </div>

          <div className="text-center">
            <div className={`${isDarkMode ? 'bg-green-900/20' : 'bg-green-50'} p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center`}>
              <Users className="h-8 w-8 text-green-500" />
            </div>
            <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>Community Driven</h3>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Built with feedback from designers and developers worldwide.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <div className="inline-flex items-center justify-center mb-4">
          <Award className="h-8 w-8 text-yellow-500 mr-2" />
          <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>Our Achievements</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg shadow`}>
            <div className="text-3xl font-bold text-blue-500">100K+</div>
            <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Active Users</div>
          </div>
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg shadow`}>
            <div className="text-3xl font-bold text-purple-500">1M+</div>
            <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Colors Extracted</div>
          </div>
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg shadow`}>
            <div className="text-3xl font-bold text-green-500">50K+</div>
            <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Palettes Created</div>
          </div>
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg shadow`}>
            <div className="text-3xl font-bold text-yellow-500">4.9/5</div>
            <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>User Rating</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs; 