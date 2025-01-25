import React from 'react';
import { Link } from 'react-router-dom';
import { Pipette, Sun, Moon } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, isDarkMode, setIsDarkMode }) => {
  return (
    <div className={`min-h-screen relative ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {isDarkMode && (
        <>
          {/* Spotlight effect for header */}
          <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-purple-500/10 blur-[100px] pointer-events-none" />
          
          {/* Background ambient lights */}
          <div className="absolute top-[40%] left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />
          <div className="absolute top-2/3 right-1/3 w-72 h-72 bg-indigo-500/5 rounded-full blur-3xl" />
        </>
      )}

      <header className={`sticky top-0 z-10 ${isDarkMode ? 'bg-gray-800/60' : 'bg-white/80'} backdrop-blur-sm border-b ${isDarkMode ? 'border-gray-700/50' : 'border-gray-200'} shadow-sm`}>
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link 
              to="/"
              className="flex items-center space-x-3 group"
            >
              <div className={`p-2 rounded-lg ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-gray-700/50 to-gray-600/50 ring-1 ring-white/10 group-hover:from-gray-700 group-hover:to-gray-600' 
                  : 'bg-blue-50 ring-1 ring-blue-100 group-hover:bg-blue-100'
              } shadow-sm backdrop-blur-sm transition-all`}>
                <Pipette className={`h-4 w-4 ${isDarkMode ? 'text-blue-400' : 'text-blue-500'} filter drop-shadow`} />
              </div>
              <div className="flex flex-col">
                <h1 className={`text-lg font-bold ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400' 
                    : 'bg-gradient-to-r from-blue-500 to-indigo-600'
                } text-transparent bg-clip-text filter drop-shadow group-hover:opacity-80 transition-opacity`}>
                  Image Hex
                </h1>
                <span className={`text-[10px] ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Free Online Image Color Picker Tool
                </span>
              </div>
            </Link>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-lg transition-colors shadow-sm ${
                  isDarkMode 
                    ? 'bg-gradient-to-br from-gray-700/50 to-gray-600/50 text-yellow-400 hover:from-gray-700 hover:to-gray-600 ring-1 ring-white/10' 
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 ring-1 ring-gray-200'
                }`}
              >
                {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-4">
        {children}
      </main>

      <footer className={`mt-4 border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-100'}`}>
        <div className="max-w-3xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className={`text-sm font-semibold mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>About</h3>
              <ul className="space-y-2">
                <li>
                  <Link 
                    to="/about" 
                    className={`text-sm ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
                  >
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className={`text-sm font-semibold mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>Help</h3>
              <ul className="space-y-2">
                <li>
                  <Link 
                    to="/support" 
                    className={`text-sm ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
                  >
                    Support
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/#faq" 
                    className={`text-sm ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
                  >
                    FAQs
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className={`text-sm font-semibold mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link 
                    to="/privacy" 
                    className={`text-sm ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/terms" 
                    className={`text-sm ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className={`border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'} pt-8`}>
            <div className={`flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              <div className="flex items-center space-x-2 text-sm">
                <span>Made with</span>
                <span className="text-red-500 animate-pulse text-lg">❤️</span>
              </div>
              
              <div className="text-sm">
                <p>© {new Date().getFullYear()} Image Hex. All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout; 