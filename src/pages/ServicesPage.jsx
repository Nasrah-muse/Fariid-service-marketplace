import { useState } from "react";
import { useTheme } from "../contexts/ThemeContext"
import { FiSearch } from "react-icons/fi";

 
const ServicesPage = () => {
  const {theme} = useTheme()

  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div  className={`min-h-screen p-6 mt-20 ${theme === 'dark' ? 'bg-indigo-900' : 'bg-gray-50'}`}>
       
      <div className="flex justify-center mb-8">
        <div className="relative w-full max-w-2xl">
          <input
            type="text"
            placeholder="Search for services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full px-4 py-3 rounded-lg text-lg ${
              theme === 'dark'
                ? 'bg-indigo-700 text-white placeholder-gray-300 focus:ring-orange-500'
                : 'bg-white text-indigo-900 placeholder-indigo-800 border border-gray-300 focus:ring-orange-500'
            } focus:outline-none focus:ring-2`}
          />
          <span className={`absolute right-3 top-4 text-xl   ${theme === 'dark'? 'text-sky-200' : 'text-indigo-800'}`}>
          <FiSearch/>
          </span>
        </div>
      </div>

      </div>
  )
}

export default ServicesPage