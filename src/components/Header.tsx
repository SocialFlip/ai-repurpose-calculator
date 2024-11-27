import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

export default function Header() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 
                     backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <span className="text-xl font-bold gradient-text">SocialFlip.io</span>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 
                       transition-colors duration-300"
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <FiSun className="w-5 h-5 hover:text-yellow-400 transition-colors" />
              ) : (
                <FiMoon className="w-5 h-5 hover:text-blue-400 transition-colors" />
              )}
            </button>
            
            <a
              href="https://socialflip.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Visit Website
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}