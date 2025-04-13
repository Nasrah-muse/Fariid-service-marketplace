import { FiMoon, FiSave, FiSun } from 'react-icons/fi';
import { useTheme } from '../contexts/ThemeContext.jsx';
import { CiSun } from 'react-icons/ci';

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-full transition-all ${className} ${
        theme === 'dark' 
          ? 'bg-gray-400 text-white hover:bg-gray-600' 
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      }`}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
    </button>
  );
}