import { useState} from 'react';
import { useTheme } from '../contexts/ThemeContext';
import {  FiBarChart2, FiCalendar, FiMail, FiMenu, FiX } from 'react-icons/fi';

 const ProviderDashboard = () => {
  const { theme } = useTheme()
   const [sidebarOpen, setSidebarOpen] = useState(false)
   const [activeTab, setActiveTab] = useState('dashboard')

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
          <nav>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => {
                    setActiveTab('dashboard');
                    setSidebarOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 rounded flex items-center cursor-pointer ${activeTab === 'dashboard' ? 'bg-indigo-900 text-white' : theme === 'dark' ? 'hover:bg-blue-500' : 'hover:bg-gray-100'}`}
                >
                  <FiBarChart2 className="mr-2" /> Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('services');
                    setSidebarOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 rounded flex items-center cursor-pointer ${activeTab === 'services' ? 'bg-indigo-900 text-white' : theme === 'dark' ? 'hover:bg-blue-500' : 'hover:bg-gray-100'}`}
                >
                  <FiBarChart2 className="mr-2" /> My Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('bookings');
                    setSidebarOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 rounded flex items-center cursor-pointer ${activeTab === 'bookings' ? 'bg-indigo-900 text-white' : theme === 'dark' ? 'hover:bg-blue-500' : 'hover:bg-gray-100'}`}
                >
                  <FiCalendar className="mr-2" /> Bookings
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('messages');
                    setSidebarOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 rounded flex items-center cursor-pointer ${activeTab === 'messages' ? 'bg-indigo-900 text-white' : theme === 'dark' ? 'hover:bg-blue-500' : 'hover:bg-gray-100'}`}
                >
                  <FiMail className="mr-2" /> Messages
                </button>
              </li>
            </ul>
          </nav>
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