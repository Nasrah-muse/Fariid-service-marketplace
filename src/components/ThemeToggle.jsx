import { FiMoon, FiSun } from 'react-icons/fi';
import { useTheme } from '../contexts/ThemeContext.jsx';
 
export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme();
  
  return (
   <div className='w-6 flex items-center justify-center '>
     <button
      onClick={toggleTheme}
      className={`px-2 py-2 rounded-full transition-all cursor-pointer ${className} ${
        theme === 'dark' 
          ? 'bg-gray-400 text-white hover:bg-gray-600' 
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      }`}
     >
      {theme === 'dark' ? <FiSun /> : <FiMoon  />}
    </button>
   </div>
  );
}