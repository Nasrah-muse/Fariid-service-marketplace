import { useState} from 'react';
import { useTheme } from '../contexts/ThemeContext';
import {  FiMenu, FiX } from 'react-icons/fi';

 const ProviderDashboard = () => {
  const { theme } = useTheme()
   const [sidebarOpen, setSidebarOpen] = useState(false)

   return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-indigo-900' : 'bg-gray-100'} mt-20`}>
       <div className={`lg:hidden fixed top-25 left-0 right-0 h-12 flex items-center justify-between px-4 ${theme === 'dark' ? 'bg-indigo-600' : 'bg-white'} shadow z-40 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-md focus:outline-none cursor-pointer"
        >
          {sidebarOpen ? (
            <FiX className={`w-5 h-5 ${theme === 'dark' ? 'text-white' : 'text-indigo-900'}`} />
          ) : (
            <FiMenu className={`w-5 h-5 ${theme === 'dark' ? 'text-white' : 'text-indigo-900'}`} />
          )}
        </button>
      </div>

      <div className="flex pt-20 lg:pt-0">
        {/* Sidebar */}
        <div className={`
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
          fixed lg:static
          w-64 min-h-screen p-4
          ${theme === 'dark' ? 'bg-sky-200' : 'bg-white'}
          shadow z-10
          transition-transform duration-300 ease-in-out
        `}>
          <h2 className="text-2xl font-bold mb-8 text-indigo-900">Service Provider</h2>
        </div>

        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-0 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

      </div>
    </div>
   )
 }
 
 export default ProviderDashboard